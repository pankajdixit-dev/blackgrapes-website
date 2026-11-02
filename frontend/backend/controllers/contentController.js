import PageContent from '../models/PageContent.js';
import ActivityLog from '../models/ActivityLog.js';
import { getPageDefaultSections, ALL_PAGE_DEFINITIONS } from '../defaultData.js';

function getDefaultSections(pageSlug) {
  return getPageDefaultSections(pageSlug) || {};
}

// @desc    Get summary list of all manageable pages
// @route   GET /api/content/all-pages
// @access  Public / Admin
export const getAllPagesSummary = async (req, res, next) => {
  try {
    let docs = [];
    try {
      docs = await PageContent.find({}, 'pageSlug sections updatedAt lastUpdatedBy').maxTimeMS(2500).lean();
    } catch (e) {
      docs = [];
    }
    const docMap = {};
    (docs || []).forEach((d) => {
      docMap[d.pageSlug] = d;
    });

    const pages = ALL_PAGE_DEFINITIONS.map((def) => {
      const doc = docMap[def.slug];
      const sections = doc?.sections || getDefaultSections(def.slug);
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
    const fallbackDefaults = getDefaultSections(pageSlug);

    let doc = await PageContent.findOne({ pageSlug });

    if (!doc) {
      doc = await PageContent.create({
        pageSlug,
        sections: fallbackDefaults,
        lastUpdatedBy: 'System'
      });
    }

    // If request does not have admin credentials, sanitize draft content
    const isAdmin = Boolean(req.user || req.headers.authorization);
    let returnedSections = { ...(doc.sections || fallbackDefaults) };
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
    const fallbackDefaults = getDefaultSections(pageSlug);

    let doc = await PageContent.findOne({ pageSlug });
    if (!doc) {
      doc = new PageContent({ pageSlug, sections: fallbackDefaults });
    }

    if (sections && typeof sections === 'object') {
      doc.sections = sections;
    } else if (draftSectionKey && draftContent) {
      const currentSections = { ...(doc.sections || fallbackDefaults) };
      if (currentSections[draftSectionKey]) {
        currentSections[draftSectionKey].draft_content = draftContent;
        currentSections[draftSectionKey].has_unpublished_changes = true;
        currentSections[draftSectionKey].last_draft_at = new Date().toISOString();
      }
      doc.sections = currentSections;
    }

    doc.markModified('sections');
    doc.lastUpdatedBy = req.user?.name || 'Admin';
    await doc.save();

    // Broadcast WebSocket event
    const io = req.app.get('io');
    if (io) {
      io.emit('content_updated', {
        pageSlug,
        sections: doc.sections,
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
      data: doc.sections
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Publish a Specific Section or All Sections
// @route   POST /api/content/:pageSlug/publish
// @access  Private (Admin)
export const publishSectionContent = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'home';
    const { sectionKey, content, sections } = req.body;
    const fallbackDefaults = getDefaultSections(pageSlug);

    let doc = await PageContent.findOne({ pageSlug });
    if (!doc) {
      doc = new PageContent({ pageSlug, sections: fallbackDefaults });
    }

    if (sections && typeof sections === 'object' && Object.keys(sections).length > 0) {
      doc.sections = sections;
    } else {
      const currentSections = { ...(doc.sections || fallbackDefaults) };
      if (currentSections[sectionKey]) {
        if (content) {
          currentSections[sectionKey].content = content;
        } else if (currentSections[sectionKey].draft_content) {
          currentSections[sectionKey].content = {
            ...(currentSections[sectionKey].content || {}),
            ...currentSections[sectionKey].draft_content
          };
        }
        currentSections[sectionKey].has_unpublished_changes = false;
        currentSections[sectionKey].draft_content = null;
        currentSections[sectionKey].last_published_at = new Date().toISOString();
        currentSections[sectionKey].published_by = req.user?.email || 'admin@blackgrapessoftech.com';
      }
      doc.sections = currentSections;
    }

    doc.markModified('sections');
    doc.lastUpdatedBy = req.user?.name || 'Admin';
    await doc.save();

    // Broadcast live WebSocket event to public visitors and admin clients
    const io = req.app.get('io');
    if (io) {
      io.emit('content_updated', {
        pageSlug,
        sectionKey,
        sections: doc.sections,
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
      message: `Section ${sectionKey || 'All'} published successfully to live website`,
      data: doc.sections
    });
  } catch (error) {
    next(error);
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
    const fallbackDefaults = getDefaultSections(pageSlug);

    let doc = await PageContent.findOne({ pageSlug });
    if (!doc) {
      doc = new PageContent({ pageSlug, sections: fallbackDefaults });
    }

    const currentSections = { ...(doc.sections || fallbackDefaults) };
    const orderIndex = Object.keys(currentSections).length + 1;

    currentSections[sanitizedKey] = {
      id: `sec-${pageSlug}-${sanitizedKey}-${Date.now()}`,
      page: pageSlug,
      section_key: sanitizedKey,
      section_name: sectionName,
      order_index: orderIndex,
      is_visible: true,
      has_unpublished_changes: false,
      content: content || { title: sectionName, subtitle: '', description: '' }
    };

    doc.sections = currentSections;
    doc.markModified('sections');
    doc.lastUpdatedBy = req.user?.name || 'Admin';
    await doc.save();

    res.status(201).json({
      success: true,
      message: `New section "${sectionName}" added successfully to ${pageSlug} page`,
      data: doc.sections
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a Section from a Page
// @route   DELETE /api/content/:pageSlug/section/:sectionKey
// @access  Private (Admin)
export const deletePageSection = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'home';
    const sectionKey = req.params.sectionKey;

    let doc = await PageContent.findOne({ pageSlug });
    if (!doc || !doc.sections || !doc.sections[sectionKey]) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    const currentSections = { ...doc.sections };
    delete currentSections[sectionKey];

    doc.sections = currentSections;
    doc.markModified('sections');
    doc.lastUpdatedBy = req.user?.name || 'Admin';
    await doc.save();

    const io = req.app.get('io');
    if (io) {
      io.emit('content_updated', {
        pageSlug,
        action: 'section_delete',
        sections: doc.sections,
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      message: `Section "${sectionKey}" removed from ${pageSlug} page`,
      data: doc.sections
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Duplicate an existing Section
// @route   POST /api/content/:pageSlug/duplicate/:sectionKey
// @access  Private (Admin)
export const duplicatePageSection = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'home';
    const sectionKey = req.params.sectionKey;

    let doc = await PageContent.findOne({ pageSlug });
    if (!doc || !doc.sections || !doc.sections[sectionKey]) {
      return res.status(404).json({ success: false, message: 'Section to duplicate not found' });
    }

    const currentSections = { ...doc.sections };
    const sourceSection = currentSections[sectionKey];
    const newKey = `${sectionKey}_copy_${Date.now().toString().slice(-4)}`;

    currentSections[newKey] = {
      ...JSON.parse(JSON.stringify(sourceSection)),
      id: `sec-${pageSlug}-${newKey}`,
      section_key: newKey,
      section_name: `${sourceSection.section_name || sectionKey} (Copy)`,
      order_index: (sourceSection.order_index || 1) + 1,
      has_unpublished_changes: true
    };

    doc.sections = currentSections;
    doc.markModified('sections');
    doc.lastUpdatedBy = req.user?.name || 'Admin';
    await doc.save();

    res.status(201).json({
      success: true,
      message: `Section "${sectionKey}" duplicated successfully as "${newKey}"`,
      data: doc.sections
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reorder Sections on a Page
// @route   POST /api/content/:pageSlug/reorder
// @access  Private (Admin)
export const reorderPageSections = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'home';
    const { orderedKeys } = req.body; // Array of section keys in desired order

    if (!Array.isArray(orderedKeys)) {
      return res.status(400).json({ success: false, message: 'orderedKeys array is required' });
    }

    let doc = await PageContent.findOne({ pageSlug });
    if (!doc || !doc.sections) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }

    const currentSections = { ...doc.sections };
    orderedKeys.forEach((key, index) => {
      if (currentSections[key]) {
        currentSections[key].order_index = index + 1;
      }
    });

    doc.sections = currentSections;
    doc.markModified('sections');
    doc.lastUpdatedBy = req.user?.name || 'Admin';
    await doc.save();

    res.json({
      success: true,
      message: `Sections reordered successfully on ${pageSlug} page`,
      data: doc.sections
    });
  } catch (error) {
    next(error);
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

    let doc = await PageContent.findOne({ pageSlug });
    if (!doc || !doc.sections || !doc.sections[sectionKey]) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    const currentSections = { ...doc.sections };
    const currentVis = currentSections[sectionKey].is_visible !== false;
    currentSections[sectionKey].is_visible = typeof isVisible === 'boolean' ? isVisible : !currentVis;

    doc.sections = currentSections;
    doc.markModified('sections');
    doc.lastUpdatedBy = req.user?.name || 'Admin';
    await doc.save();

    const io = req.app.get('io');
    if (io) {
      io.emit('content_updated', {
        pageSlug,
        sectionKey,
        sections: doc.sections,
        action: 'visibility_toggle',
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      message: `Section "${sectionKey}" visibility set to ${currentSections[sectionKey].is_visible ? 'Visible' : 'Hidden'}`,
      data: doc.sections
    });
  } catch (error) {
    next(error);
  }
};
