import PageContent from '../models/PageContent.js';
import ActivityLog from '../models/ActivityLog.js';
import { DEFAULT_PAGE_SECTIONS } from '../defaultData.js';

// @desc    Get Page Sections
// @route   GET /api/content/:pageSlug
// @access  Public
export const getPageContent = async (req, res, next) => {
  try {
    const pageSlug = req.params.pageSlug || 'about';
    let doc = await PageContent.findOne({ pageSlug });

    if (!doc) {
      doc = await PageContent.create({
        pageSlug,
        sections: DEFAULT_PAGE_SECTIONS,
        lastUpdatedBy: 'System'
      });
    }

    res.json({
      success: true,
      data: doc.sections
    });
  } catch (error) {
    // Return default sections if DB error or offline
    res.json({
      success: true,
      data: DEFAULT_PAGE_SECTIONS,
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

    let doc = await PageContent.findOne({ pageSlug });
    if (!doc) {
      doc = new PageContent({ pageSlug, sections: DEFAULT_PAGE_SECTIONS });
    }

    doc.sections = sections;
    doc.lastUpdatedBy = req.user?.name || 'Admin';
    await doc.save();

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
    const { sectionKey } = req.body;

    let doc = await PageContent.findOne({ pageSlug });
    if (!doc) {
      doc = new PageContent({ pageSlug, sections: DEFAULT_PAGE_SECTIONS });
    }

    const currentSections = { ...(doc.sections || DEFAULT_PAGE_SECTIONS) };
    if (currentSections[sectionKey]) {
      const draft = currentSections[sectionKey].draft_content;
      if (draft) {
        currentSections[sectionKey].content = {
          ...(currentSections[sectionKey].content || {}),
          ...draft
        };
      }
      currentSections[sectionKey].has_unpublished_changes = false;
      currentSections[sectionKey].draft_content = null;
      currentSections[sectionKey].last_published_at = new Date().toISOString();
      currentSections[sectionKey].published_by = req.user?.email || 'admin@blackgrapessoftech.com';
    }

    doc.sections = currentSections;
    doc.markModified('sections');
    doc.lastUpdatedBy = req.user?.name || 'Admin';
    await doc.save();

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
