import mongoose from 'mongoose';
import PageContent from '../models/PageContent.js';
import ActivityLog from '../models/ActivityLog.js';
import { getPageDefaultSections, ALL_PAGE_DEFINITIONS } from '../defaultData.js';
import { getServerStoredSections, saveServerStoredSections, getAllStoredPages } from '../utils/contentStore.js';

function getDefaultSections(pageSlug) {
  return getPageDefaultSections(pageSlug) || {};
}

// Helper to get active sections across MongoDB, Local Server File Store, and Defaults
async function resolvePageSections(pageSlug) {
  const defaults = getDefaultSections(pageSlug);
  const stored = getServerStoredSections(pageSlug);

  if (mongoose.connection.readyState === 1) {
    try {
      const doc = await PageContent.findOne({ pageSlug }).maxTimeMS(2000).lean();
      if (doc && doc.sections && Object.keys(doc.sections).length > 0) {
        // Sync Mongo doc into local file store cache
        saveServerStoredSections(pageSlug, doc.sections);
        return { sections: doc.sections, doc };
      }
    } catch (e) {
      console.warn(`[ContentController] Mongo read warning for ${pageSlug}:`, e.message);
    }
  }

  // Fallback to local server persistent file store
  if (stored && Object.keys(stored).length > 0) {
    return { sections: stored, doc: null };
  }

  // Fallback to default hardcoded sections
  return { sections: defaults, doc: null };
}

// Helper to persist sections across Local Server File Store and MongoDB
async function persistPageSections(pageSlug, sections, user) {
  // 1. Always save to local server file store (works offline & in sandbox)
  saveServerStoredSections(pageSlug, sections);

  // 2. If MongoDB Atlas is connected, also persist to MongoDB
  if (mongoose.connection.readyState === 1) {
    try {
      await PageContent.findOneAndUpdate(
        { pageSlug },
        {
          pageSlug,
          sections,
          lastUpdatedBy: user?.name || user?.email || 'Admin'
        },
        { upsert: true, new: true, runValidators: false }
      ).maxTimeMS(2500);
    } catch (err) {
      console.warn(`[ContentController] Mongo write warning for ${pageSlug}:`, err.message);
    }
  }
}

// @desc    Get summary list of all manageable pages
// @route   GET /api/content/all-pages
// @access  Public / Admin
export const getAllPagesSummary = async (req, res, next) => {
  try {
    let docMap = {};
    if (mongoose.connection.readyState === 1) {
      try {
        const docs = await PageContent.find({}, 'pageSlug sections updatedAt lastUpdatedBy').maxTimeMS(2500).lean();
        (docs || []).forEach((d) => {
          docMap[d.pageSlug] = d;
        });
      } catch (e) {}
    }

    const pages = ALL_PAGE_DEFINITIONS.map((def) => {
      const doc = docMap[def.slug];
      const stored = getServerStoredSections(def.slug);
      const sections = doc?.sections || stored || getDefaultSections(def.slug);
      const sectionKeys = Object.keys(sections || {});
      const visibleCount = sectionKeys.filter((k) => sections[k]?.is_visible !== false).length;
      const unpublishedCount = sectionKeys.filter((k) => sections[k]?.has_unpublished_changes).length;

      return {
        slug: def.slug,
        name: def.name,
        path: def.path,
        totalSections: sectionKeys.length,
        visibleSections: visibleCount,
        hasUnpublished: unpublishedCount > 0,
        lastUpdatedBy: doc?.lastUpdatedBy || 'System',
        updatedAt: doc?.updatedAt || null
      };
    });

    res.json({
      success: true,
      count: pages.length,
      data: pages
    });
  } catch (error) {
    const fallbackPages = ALL_PAGE_DEFINITIONS.map((def) => {
      const sections = getDefaultSections(def.slug);
      const sectionKeys = Object.keys(sections || {});
      return {
        slug: def.slug,
        name: def.name,
        path: def.path,
        totalSections: sectionKeys.length,
        visibleSections: sectionKeys.length,
        hasUnpublished: false,
        lastUpdatedBy: 'System',
        updatedAt: null
      };
    });
    res.json({
      success: true,
      count: fallbackPages.length,
      data: fallbackPages,
      fallback: true
    });
  }
};

// @desc    Get Page Sections for public or admin view
// @route   GET /api/content/:pageSlug
// @access  Public
export const getPageContent = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'home';
    const { sections } = await resolvePageSections(pageSlug);

    // If request does not have admin credentials, sanitize draft content
    const isAdmin = Boolean(req.user || req.headers.authorization);
    let returnedSections = { ...sections };

    if (!isAdmin) {
      Object.keys(returnedSections).forEach((key) => {
        if (returnedSections[key] && typeof returnedSections[key] === 'object') {
          const { draft_content, ...publicSection } = returnedSections[key];
          returnedSections[key] = publicSection;
        }
      });
    }

    res.json({
      success: true,
      pageSlug,
      data: returnedSections
    });
  } catch (error) {
    const pageSlug = req.params.pageSlug || 'home';
    res.json({
      success: true,
      pageSlug,
      data: getDefaultSections(pageSlug),
      fallback: true
    });
  }
};

// @desc    Save/Update Draft or All Sections
// @route   PUT /api/content/:pageSlug
// @access  Private (Admin)
export const savePageContent = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'home';
    const { sections, draftSectionKey, draftContent } = req.body;
    const { sections: currentSections } = await resolvePageSections(pageSlug);

    let targetSections = sections ? { ...sections } : { ...currentSections };

    if (draftSectionKey && draftContent) {
      if (!targetSections[draftSectionKey]) {
        targetSections[draftSectionKey] = {
          id: `sec-${pageSlug}-${draftSectionKey}`,
          page: pageSlug,
          section_key: draftSectionKey,
          section_name: draftSectionKey,
          content: {}
        };
      }
      targetSections[draftSectionKey] = {
        ...targetSections[draftSectionKey],
        draft_content: draftContent,
        has_unpublished_changes: true,
        last_draft_at: new Date().toISOString()
      };
    }

    // Persist to local file store and MongoDB
    await persistPageSections(pageSlug, targetSections, req.user);

    // Broadcast WebSocket event
    const io = req.app.get('io');
    if (io) {
      io.emit('content_updated', {
        pageSlug,
        sections: targetSections,
        action: 'draft_save',
        timestamp: new Date().toISOString()
      });
    }

    await ActivityLog.create({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'DRAFT_SAVE',
      module: 'PAGE_CONTENT',
      details: `Saved draft for ${pageSlug} page`,
      ipAddress: req.ip || ''
    }).catch(() => {});

    res.json({
      success: true,
      message: 'Page draft saved successfully',
      data: targetSections
    });
  } catch (error) {
    console.error('[SaveDraft Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Publish a Specific Section or All Sections
// @route   POST /api/content/:pageSlug/publish
// @access  Private (Admin)
export const publishSectionContent = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'home';
    const { sectionKey, content, sections } = req.body;
    const { sections: currentSections } = await resolvePageSections(pageSlug);

    let targetSections = sections ? { ...sections } : { ...currentSections };

    if (sectionKey) {
      if (!targetSections[sectionKey]) {
        targetSections[sectionKey] = {
          id: `sec-${pageSlug}-${sectionKey}`,
          page: pageSlug,
          section_key: sectionKey,
          section_name: sectionKey,
          content: {}
        };
      }

      const publishedContent = content || targetSections[sectionKey].draft_content || targetSections[sectionKey].content || {};
      targetSections[sectionKey] = {
        ...targetSections[sectionKey],
        content: publishedContent,
        draft_content: null,
        has_unpublished_changes: false,
        last_published_at: new Date().toISOString(),
        published_by: req.user?.email || 'admin@blackgrapessoftech.com'
      };
    } else {
      // If no specific sectionKey, publish all draft changes on the page
      Object.keys(targetSections).forEach((key) => {
        if (targetSections[key] && targetSections[key].draft_content) {
          targetSections[key].content = {
            ...(targetSections[key].content || {}),
            ...targetSections[key].draft_content
          };
          targetSections[key].draft_content = null;
          targetSections[key].has_unpublished_changes = false;
        }
      });
    }

    // Persist to local file store and MongoDB
    await persistPageSections(pageSlug, targetSections, req.user);

    // Broadcast live WebSocket event to public visitors and admin clients
    const io = req.app.get('io');
    if (io) {
      io.emit('content_updated', {
        pageSlug,
        sectionKey: sectionKey || 'all',
        sections: targetSections,
        action: 'publish',
        timestamp: new Date().toISOString()
      });
    }

    await ActivityLog.create({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'PUBLISH',
      module: 'PAGE_CONTENT',
      details: `Published section "${sectionKey || 'All'}" on "${pageSlug}" page`,
      ipAddress: req.ip || ''
    }).catch(() => {});

    res.json({
      success: true,
      message: `Section "${sectionKey || 'All'}" published successfully to live website`,
      data: targetSections
    });
  } catch (error) {
    console.error('[Publish Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Revert Draft changes to published content
// @route   POST /api/content/:pageSlug/revert/:sectionKey
// @access  Private (Admin)
export const revertSectionDraftContent = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'home';
    const sectionKey = req.params.sectionKey;
    const { sections: currentSections } = await resolvePageSections(pageSlug);

    const targetSections = { ...currentSections };
    if (targetSections[sectionKey]) {
      targetSections[sectionKey] = {
        ...targetSections[sectionKey],
        draft_content: null,
        has_unpublished_changes: false
      };
    }

    await persistPageSections(pageSlug, targetSections, req.user);

    const io = req.app.get('io');
    if (io) {
      io.emit('content_updated', {
        pageSlug,
        sectionKey,
        sections: targetSections,
        action: 'revert',
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      message: `Reverted draft changes for "${sectionKey}"`,
      data: targetSections
    });
  } catch (error) {
    console.error('[Revert Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add a New Section to a Page
// @route   POST /api/content/:pageSlug/section
// @access  Private (Admin)
export const addPageSection = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'home';
    const { sectionKey, sectionName, content } = req.body;

    if (!sectionKey || !sectionName) {
      return res.status(400).json({ success: false, message: 'sectionKey and sectionName are required' });
    }

    const sanitizedKey = sectionKey.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    const { sections: currentSections } = await resolvePageSections(pageSlug);
    const targetSections = { ...currentSections };
    const orderIndex = Object.keys(targetSections).length + 1;

    targetSections[sanitizedKey] = {
      id: `sec-${pageSlug}-${sanitizedKey}-${Date.now()}`,
      page: pageSlug,
      section_key: sanitizedKey,
      section_name: sectionName,
      order_index: orderIndex,
      is_visible: true,
      has_unpublished_changes: false,
      content: content || { title: sectionName, subtitle: '', description: '' }
    };

    await persistPageSections(pageSlug, targetSections, req.user);

    const io = req.app.get('io');
    if (io) {
      io.emit('content_updated', {
        pageSlug,
        action: 'section_add',
        sections: targetSections,
        timestamp: new Date().toISOString()
      });
    }

    res.status(201).json({
      success: true,
      message: `New section "${sectionName}" added successfully to ${pageSlug} page`,
      data: targetSections
    });
  } catch (error) {
    console.error('[Add Section Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a Section from a Page
// @route   DELETE /api/content/:pageSlug/section/:sectionKey
// @access  Private (Admin)
export const deletePageSection = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'home';
    const sectionKey = req.params.sectionKey;
    const { sections: currentSections } = await resolvePageSections(pageSlug);

    if (!currentSections || !currentSections[sectionKey]) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    const targetSections = { ...currentSections };
    delete targetSections[sectionKey];

    await persistPageSections(pageSlug, targetSections, req.user);

    const io = req.app.get('io');
    if (io) {
      io.emit('content_updated', {
        pageSlug,
        action: 'section_delete',
        sections: targetSections,
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      message: `Section "${sectionKey}" removed from ${pageSlug} page`,
      data: targetSections
    });
  } catch (error) {
    console.error('[Delete Section Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Duplicate an existing Section
// @route   POST /api/content/:pageSlug/duplicate/:sectionKey
// @access  Private (Admin)
export const duplicatePageSection = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'home';
    const sectionKey = req.params.sectionKey;
    const { sections: currentSections } = await resolvePageSections(pageSlug);

    if (!currentSections || !currentSections[sectionKey]) {
      return res.status(404).json({ success: false, message: 'Section to duplicate not found' });
    }

    const targetSections = { ...currentSections };
    const sourceSection = targetSections[sectionKey];
    const newKey = `${sectionKey}_copy_${Date.now().toString().slice(-4)}`;

    targetSections[newKey] = {
      ...JSON.parse(JSON.stringify(sourceSection)),
      id: `sec-${pageSlug}-${newKey}`,
      section_key: newKey,
      section_name: `${sourceSection.section_name || sectionKey} (Copy)`,
      order_index: (sourceSection.order_index || 1) + 1,
      has_unpublished_changes: true
    };

    await persistPageSections(pageSlug, targetSections, req.user);

    res.status(201).json({
      success: true,
      message: `Section "${sectionKey}" duplicated successfully as "${newKey}"`,
      data: targetSections
    });
  } catch (error) {
    console.error('[Duplicate Section Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reorder Sections on a Page
// @route   POST /api/content/:pageSlug/reorder
// @access  Private (Admin)
export const reorderPageSections = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'home';
    const { orderedKeys } = req.body;

    if (!Array.isArray(orderedKeys)) {
      return res.status(400).json({ success: false, message: 'orderedKeys array is required' });
    }

    const { sections: currentSections } = await resolvePageSections(pageSlug);
    const targetSections = { ...currentSections };

    orderedKeys.forEach((key, index) => {
      if (targetSections[key]) {
        targetSections[key].order_index = index + 1;
      }
    });

    await persistPageSections(pageSlug, targetSections, req.user);

    const io = req.app.get('io');
    if (io) {
      io.emit('content_updated', {
        pageSlug,
        action: 'section_reorder',
        sections: targetSections,
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      message: `Sections reordered successfully on ${pageSlug} page`,
      data: targetSections
    });
  } catch (error) {
    console.error('[Reorder Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle Section Visibility (Show / Hide on live site)
// @route   POST /api/content/:pageSlug/visibility/:sectionKey
// @access  Private (Admin)
export const toggleSectionVisibility = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'home';
    const sectionKey = req.params.sectionKey;
    const { isVisible } = req.body;

    const { sections: currentSections } = await resolvePageSections(pageSlug);
    if (!currentSections || !currentSections[sectionKey]) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    const targetSections = { ...currentSections };
    const currentVis = targetSections[sectionKey].is_visible !== false;
    targetSections[sectionKey].is_visible = typeof isVisible === 'boolean' ? isVisible : !currentVis;

    await persistPageSections(pageSlug, targetSections, req.user);

    const io = req.app.get('io');
    if (io) {
      io.emit('content_updated', {
        pageSlug,
        sectionKey,
        sections: targetSections,
        action: 'visibility_toggle',
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      message: `Section "${sectionKey}" visibility set to ${targetSections[sectionKey].is_visible ? 'Visible' : 'Hidden'}`,
      data: targetSections
    });
  } catch (error) {
    console.error('[Visibility Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
