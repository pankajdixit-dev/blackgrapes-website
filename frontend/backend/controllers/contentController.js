import PageContent from '../models/PageContent.js';
import ActivityLog from '../models/ActivityLog.js';
import { DEFAULT_PAGE_SECTIONS, DEFAULT_HOME_SECTIONS } from '../defaultData.js';

function getDefaultSections(pageSlug) {
  if (pageSlug === 'home') {
    return DEFAULT_HOME_SECTIONS;
  }
  return DEFAULT_PAGE_SECTIONS;
}

// @desc    Get Page Sections
// @route   GET /api/content/:pageSlug
// @access  Public
export const getPageContent = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'about';
    const fallbackDefaults = getDefaultSections(pageSlug);

    let doc = await PageContent.findOne({ pageSlug });

    if (!doc) {
      doc = await PageContent.create({
        pageSlug,
        sections: fallbackDefaults,
        lastUpdatedBy: 'System'
      });
    }

    res.json({
      success: true,
      data: doc.sections
    });
  } catch (error) {
    const pageSlug = req.params.pageSlug || 'about';
    res.json({
      success: true,
      data: getDefaultSections(pageSlug),
      fallback: true
    });
  }
};

// @desc    Save/Update Draft or Published Sections
// @route   PUT /api/content/:pageSlug
// @access  Private (Admin)
export const savePageContent = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'about';
    const { sections } = req.body;
    const fallbackDefaults = getDefaultSections(pageSlug);

    let doc = await PageContent.findOne({ pageSlug });
    if (!doc) {
      doc = new PageContent({ pageSlug, sections: fallbackDefaults });
    }

    doc.sections = sections;
    doc.markModified('sections');
    doc.lastUpdatedBy = req.user?.name || 'Admin';
    await doc.save();

    // Broadcast WebSocket event to all connected clients
    const io = req.app.get('io');
    if (io) {
      io.emit('content_updated', {
        pageSlug,
        sections: doc.sections,
        action: 'draft_save',
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      message: 'Page content saved successfully',
      data: doc.sections
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Publish a Specific Section
// @route   POST /api/content/:pageSlug/publish
// @access  Private (Admin)
export const publishSectionContent = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'about';
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

    // Broadcast WebSocket live update immediately to all connected browsers
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
      details: `Published section ${sectionKey} on ${pageSlug} page`,
      ipAddress: req.ip || ''
    }).catch(() => {});

    res.json({
      success: true,
      message: `Section ${sectionKey} published successfully`,
      data: doc.sections
    });
  } catch (error) {
    next(error);
  }
};
