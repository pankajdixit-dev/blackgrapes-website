import React, { useState, useEffect } from 'react';
import {
  Save,
  Send,
  RotateCcw,
  Sparkles,
  Layers,
  Users,
  Target,
  Clock,
  Building2,
  CheckCircle,
  Eye,
  ExternalLink,
  History,
  AlertCircle,
  Plus,
  Trash2,
  Lightbulb,
  Rocket,
  Code2
} from 'lucide-react';
import {
  getPageSections,
  updateSectionDraft,
  publishSection,
  revertSectionDraft,
  getContentRevisions
} from '@backend/dataService';
import { DEFAULT_PAGE_SECTIONS } from '@backend/defaultData';

export default function AboutPageManager() {
  const [sections, setSections] = useState(null);
  const [activeTab, setActiveTab] = useState('vision_mission');
  const [vmSubTab, setVmSubTab] = useState('vision'); // 'vision' | 'mission' | 'philosophy'
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [revisions, setRevisions] = useState([]);
  const [showRevisionsModal, setShowRevisionsModal] = useState(false);

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    const data = await getPageSections('about');
    setSections(data);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  if (!sections) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading content editor...</div>;
  }

  const currentSection = sections[activeTab] || {};
  const defaultSecContent = DEFAULT_PAGE_SECTIONS[activeTab]?.content || {};
  const rawDraft = currentSection?.draft_content || currentSection?.content || {};

  // Deep-merge defaults so that no fields are ever blank/undefined
  const draftContent = {
    ...defaultSecContent,
    ...rawDraft
  };

  if (activeTab === 'vision_mission') {
    draftContent.vision = {
      ...(defaultSecContent.vision || {}),
      ...(rawDraft.vision || {})
    };
    draftContent.mission = {
      ...(defaultSecContent.mission || {}),
      ...(rawDraft.mission || {})
    };
    draftContent.philosophy = {
      ...(defaultSecContent.philosophy || {}),
      ...(rawDraft.philosophy || {})
    };
  }

  if (activeTab === 'founders') {
    draftContent.badge = draftContent.badge || defaultSecContent.badge || 'LEADERSHIP & VISION';
    draftContent.title = draftContent.title || defaultSecContent.title || 'Meet the Visionaries Behind Black Grapes';
    draftContent.subtitle = draftContent.subtitle || defaultSecContent.subtitle || 'Passionate innovators dedicated to redefining software engineering standards.';
    draftContent.photo = draftContent.photo !== undefined ? draftContent.photo : (defaultSecContent.photo || '');
    draftContent.photoTagName = draftContent.photoTagName || defaultSecContent.photoTagName || 'Mr. Arpit Jain & Mrs. Deepika Jain';
    draftContent.photoTagRole = draftContent.photoTagRole || defaultSecContent.photoTagRole || 'Founders & Executive Directors';
    draftContent.execBadge = draftContent.execBadge || defaultSecContent.execBadge || 'EXECUTIVE LEADERSHIP';
    draftContent.heading = draftContent.heading || defaultSecContent.heading || 'Driven By Innovation, Grounded In Excellence';
    draftContent.intro = draftContent.intro || defaultSecContent.intro || 'Behind Black Grapes Softech stand two visionary leaders with an unquenchable passion for digital advancement.';
    draftContent.founder1Name = draftContent.founder1Name || defaultSecContent.founder1Name || 'Mr. Arpit Jain — Founder & Chief Architect';
    draftContent.founder1Bio = draftContent.founder1Bio || defaultSecContent.founder1Bio || 'The driving force behind our software development journey. With a wealth of architectural experience and an instinctive knack for staying ahead of technological curves, he has pioneered cutting-edge solutions that have redefined client operations across industries.';
    draftContent.founder2Name = draftContent.founder2Name || defaultSecContent.founder2Name || 'Mrs. Deepika Jain — Co-Founder & Strategic Director';
    draftContent.founder2Bio = draftContent.founder2Bio || defaultSecContent.founder2Bio || 'Deepika Jain doesn’t just see challenges; she envisions opportunities. Her boundless creativity, strategic acumen, and people-first leadership have shaped our company’s culture of relentless innovation and customer delight.';
    draftContent.ctaText = draftContent.ctaText || defaultSecContent.ctaText || 'Schedule a Discussion with Us';
  }

  if (activeTab === 'technical_expertise') {
    draftContent.badge = draftContent.badge || defaultSecContent.badge || 'TECHNICAL EXPERTISE';
    draftContent.title = draftContent.title || defaultSecContent.title || 'Versatile Engineering Across Critical Digital Domains';
    draftContent.subtitle = draftContent.subtitle || defaultSecContent.subtitle || 'Our team delivers custom solutions across complex enterprise requirements with precision and high performance.';
    draftContent.domains = (Array.isArray(draftContent.domains) && draftContent.domains.length > 0)
      ? draftContent.domains
      : (defaultSecContent.domains || [
          'CRM Software Systems',
          'MLM Architecture',
          'Full-Stack Web Apps',
          'iOS & Android Native/Flutter',
          'Cloud & DevOps (AWS/Azure)',
          'UI/UX Design Systems',
          'Enterprise ERP Solutions',
          'Interactive Game Development'
        ]);
  }

  if (activeTab === 'milestones') {
    draftContent.badge = draftContent.badge || defaultSecContent.badge || 'OUR MILESTONES';
    draftContent.title = draftContent.title || defaultSecContent.title || 'A Decade of Relentless Evolution';
    draftContent.subtitle = draftContent.subtitle || defaultSecContent.subtitle || 'From a dedicated local engineering hub in Indore to an internationally trusted software powerhouse.';
    draftContent.milestones = (Array.isArray(draftContent.milestones) && draftContent.milestones.length > 0)
      ? draftContent.milestones
      : (defaultSecContent.milestones || []);
  }

  if (activeTab === 'core_values') {
    draftContent.badge = draftContent.badge || defaultSecContent.badge || 'CORE VALUES';
    draftContent.title = draftContent.title || defaultSecContent.title || 'The Values That Fuel Our Work';
    draftContent.subtitle = draftContent.subtitle || defaultSecContent.subtitle || 'Every decision we make, line of code we write, and system we deliver is guided by our core values.';
    draftContent.values = (Array.isArray(draftContent.values) && draftContent.values.length > 0)
      ? draftContent.values
      : (defaultSecContent.values || []);
  }

  if (activeTab === 'culture_hq') {
    draftContent.badge = draftContent.badge || defaultSecContent.badge || 'HEADQUARTERS & CULTURE';
    draftContent.title = draftContent.title || defaultSecContent.title || 'Where Passionate Technologists Thrive';
    draftContent.image = draftContent.image !== undefined ? draftContent.image : (defaultSecContent.image || '');
    draftContent.locationTag = draftContent.locationTag || defaultSecContent.locationTag || 'Indore Innovation Campus (HQ)';
    draftContent.p1 = draftContent.p1 || defaultSecContent.p1 || 'Our engineering studio in Indore is built for high-focus collaboration, continuous learning, and rapid problem-solving.';
    draftContent.p2 = draftContent.p2 || defaultSecContent.p2 || 'Every desk, whiteboard, and deployment sprint reflects our obsession with quality and craftsmanship.';
    draftContent.stat1Num = draftContent.stat1Num || defaultSecContent.stat1Num || '10,000+';
    draftContent.stat1Label = draftContent.stat1Label || defaultSecContent.stat1Label || 'Sq. Ft Modern Engineering Space';
    draftContent.stat2Num = draftContent.stat2Num || defaultSecContent.stat2Num || '100% In-House';
    draftContent.stat2Label = draftContent.stat2Label || defaultSecContent.stat2Label || 'Zero Outsourced Code';
  }

  if (activeTab === 'final_cta') {
    draftContent.title = draftContent.title || defaultSecContent.title || 'Ready to Build Something Extraordinary?';
    draftContent.text = draftContent.text || defaultSecContent.text || "Speak directly with our technical leadership. Let's design, engineer, and deploy your software solution with unmatched precision.";
    draftContent.buttonText = draftContent.buttonText || defaultSecContent.buttonText || 'Book a Technical Discovery Session';
  }

  const handleFieldChange = (key, val) => {
    const updatedDraft = { ...draftContent, [key]: val };
    setSections({
      ...sections,
      [activeTab]: {
        ...currentSection,
        draft_content: updatedDraft,
        has_unpublished_changes: true
      }
    });
  };

  // Helper for Vision / Mission / Philosophy nested pillars
  const updateVmPillar = (pillarKey, field, val) => {
    const pillarData = draftContent[pillarKey] || defaultSecContent[pillarKey] || {};
    const updatedPillar = { ...pillarData, [field]: val };
    handleFieldChange(pillarKey, updatedPillar);
  };

  const handleAddVmPoint = (pillarKey) => {
    const pillarData = draftContent[pillarKey] || defaultSecContent[pillarKey] || {};
    const pointsList = Array.isArray(pillarData.points) ? [...pillarData.points] : [];
    pointsList.push('New strategic deliverable, technology capability, or architecture milestone.');
    updateVmPillar(pillarKey, 'points', pointsList);
  };

  const handleUpdateVmPoint = (pillarKey, idx, val) => {
    const pillarData = draftContent[pillarKey] || defaultSecContent[pillarKey] || {};
    const pointsList = Array.isArray(pillarData.points) ? [...pillarData.points] : [];
    pointsList[idx] = val;
    updateVmPillar(pillarKey, 'points', pointsList);
  };

  const handleDeleteVmPoint = (pillarKey, idx) => {
    const pillarData = draftContent[pillarKey] || defaultSecContent[pillarKey] || {};
    const pointsList = Array.isArray(pillarData.points) ? [...pillarData.points] : [];
    const updatedPoints = pointsList.filter((_, i) => i !== idx);
    updateVmPillar(pillarKey, 'points', updatedPoints);
  };

  const handlePublish = async (e) => {
    if (e) e.preventDefault();
    setPublishing(true);
    try {
      await publishSection(activeTab, draftContent);
      showToast(`About Us (${currentSection?.section_name || activeTab}) saved & published! Live website updated instantly.`);
      await loadSections();
    } catch (err) {
      console.error('Publish failed:', err);
      showToast('Error saving changes to database.');
    } finally {
      setPublishing(false);
    }
  };

  const handleSaveDraft = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await publishSection(activeTab, draftContent);
      showToast('About Us changes saved and published live to website!');
      await loadSections();
    } catch (err) {
      console.error('Save failed:', err);
      showToast('Error saving changes to database.');
    } finally {
      setSaving(false);
    }
  };

  const handleRevert = async () => {
    if (window.confirm('Discard all unsaved draft changes and revert to published version?')) {
      await revertSectionDraft(activeTab);
      showToast('Reverted to published version.');
      await loadSections();
    }
  };

  const openRevisions = async () => {
    const revs = await getContentRevisions(activeTab);
    setRevisions(revs);
    setShowRevisionsModal(true);
  };

  const tabList = [
    { id: 'about_hero', label: '1. Hero Banner', icon: Sparkles },
    { id: 'stats_strip', label: '2. Metrics Bar', icon: Layers },
    { id: 'vision_mission', label: '3. Vision, Mission & Philosophy', icon: Target },
    { id: 'founders', label: '4. Founders & Leadership', icon: Users },
    { id: 'core_values', label: '5. Core Values', icon: Target },
    { id: 'technical_expertise', label: '6. Tech Domains', icon: Layers },
    { id: 'milestones', label: '7. Milestones & History', icon: Clock },
    { id: 'culture_hq', label: '8. Culture & HQ', icon: Building2 },
    { id: 'final_cta', label: '9. Final CTA', icon: Sparkles }
  ];

  return (
    <div>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">About Us Content & Bento Manager</h1>
          <p className="admin-page-sub">
            Add, update, or delete live content across the primary About page and its interactive components.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/about"
            target="_blank"
            rel="noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview Live Website"
          >
            <span>Preview Live Site</span>
            <ExternalLink size={15} />
          </a>

          <button onClick={openRevisions} className="admin-btn admin-btn-secondary" title="View Version History">
            <History size={15} />
            <span>Revisions</span>
          </button>

          <button
            onClick={handlePublish}
            disabled={publishing || saving}
            className="admin-btn admin-btn-primary"
            style={{ minWidth: '190px', justifyContent: 'center' }}
          >
            <Save size={16} />
            <span>{publishing ? 'Publishing...' : 'Save & Publish to Live'}</span>
          </button>
        </div>
      </div>

      {/* Live Status Strip */}
      {currentSection?.has_unpublished_changes ? (
        <div
          style={{
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '8px',
            padding: '0.75rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.85rem',
            color: '#fbbf24'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16} />
            <span>
              <strong>Unpublished Draft Changes:</strong> Click "Save & Publish to Live" to update the live website immediately.
            </span>
          </div>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="admin-btn admin-btn-primary"
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
          >
            <span>Publish Now</span>
          </button>
        </div>
      ) : (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '8px',
            padding: '0.65rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            color: '#34d399'
          }}
        >
          <CheckCircle size={16} />
          <span>
            <strong>Live Website Synced:</strong> All current modifications are active and visible on the public website.
          </span>
        </div>
      )}

      {/* Horizontal Section Navigator */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--admin-border)'
        }}
      >
        {tabList.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          const hasChanges = sections[tab.id]?.has_unpublished_changes;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: isSelected ? 'var(--admin-orange)' : 'var(--admin-border)',
                background: isSelected
                  ? 'rgba(255, 107, 0, 0.15)'
                  : 'rgba(255, 255, 255, 0.03)',
                color: isSelected ? '#fff' : '#9ca3af',
                fontSize: '0.85rem',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              <Icon size={15} color={isSelected ? 'var(--admin-orange)' : '#9ca3af'} />
              <span>{tab.label}</span>
              {hasChanges && (
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#f59e0b',
                    display: 'inline-block'
                  }}
                  title="Unpublished Draft"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Editor Body */}
      <div className="admin-card">
        {/* ========================================================
            TAB 1: ABOUT HERO SECTION
            ======================================================== */}
        {activeTab === 'about_hero' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem' }}>
              Hero Section Settings
            </h3>

            <div className="admin-form-group">
              <label className="admin-label">Top Eyebrow Badge</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.badge || ''}
                onChange={(e) => handleFieldChange('badge', e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Main Heading Prefix</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.title || ''}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Heading Highlight (Gradient Text)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.titleHighlight || ''}
                  onChange={(e) => handleFieldChange('titleHighlight', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Hero Lead Description</label>
              <textarea
                rows={3}
                className="admin-textarea"
                value={draftContent.lead || ''}
                onChange={(e) => handleFieldChange('lead', e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Primary CTA Button Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.primaryBtnText || ''}
                  onChange={(e) => handleFieldChange('primaryBtnText', e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Secondary CTA Button Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.secondaryBtnText || ''}
                  onChange={(e) => handleFieldChange('secondaryBtnText', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Hero Image URL or Asset Path</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.image || ''}
                onChange={(e) => handleFieldChange('image', e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Floating Stat 1</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Number (e.g. 250+ Projects)"
                  value={draftContent.floatingStat1Num || ''}
                  onChange={(e) => handleFieldChange('floatingStat1Num', e.target.value)}
                  style={{ marginBottom: '0.5rem' }}
                />
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Subtext (e.g. Shipped Globally)"
                  value={draftContent.floatingStat1Sub || ''}
                  onChange={(e) => handleFieldChange('floatingStat1Sub', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Floating Stat 2</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Number (e.g. 15+ Nations)"
                  value={draftContent.floatingStat2Num || ''}
                  onChange={(e) => handleFieldChange('floatingStat2Num', e.target.value)}
                  style={{ marginBottom: '0.5rem' }}
                />
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Subtext (e.g. Active Client Base)"
                  value={draftContent.floatingStat2Sub || ''}
                  onChange={(e) => handleFieldChange('floatingStat2Sub', e.target.value)}
                />
              </div>
            </div>

            {/* Micro Badges Dynamic Manager */}
            <div style={{ borderTop: '1px solid var(--admin-border)', paddingTop: '1.25rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <label className="admin-label" style={{ margin: 0 }}>Micro Badges ({(draftContent.microBadges || []).length})</label>
                <button
                  type="button"
                  onClick={() => {
                    const current = Array.isArray(draftContent.microBadges) ? [...draftContent.microBadges] : [];
                    handleFieldChange('microBadges', [...current, 'New Engineering Advantage']);
                  }}
                  className="admin-btn admin-btn-secondary"
                  style={{ padding: '0.25rem 0.6rem', fontSize: '0.78rem' }}
                >
                  <Plus size={13} />
                  <span>Add Badge</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(draftContent.microBadges || []).map((mb, mIdx) => (
                  <div key={mIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      className="admin-input"
                      value={mb}
                      onChange={(e) => {
                        const updated = [...draftContent.microBadges];
                        updated[mIdx] = e.target.value;
                        handleFieldChange('microBadges', updated);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = draftContent.microBadges.filter((_, i) => i !== mIdx);
                        handleFieldChange('microBadges', updated);
                      }}
                      className="admin-action-btn danger"
                      style={{ padding: '0.45rem', borderRadius: '4px' }}
                      title="Delete Badge"
                    >
                      <Trash2 size={14} color="#ef4444" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: METRICS BAR
            ======================================================== */}
        {activeTab === 'stats_strip' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>
                  Key Impact Metrics Bar ({(draftContent.stats || []).length})
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                  Manage the statistical counters highlighted across the about page.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const current = Array.isArray(draftContent.stats) ? [...draftContent.stats] : [];
                  handleFieldChange('stats', [...current, { number: '100+', label: 'New Metric', highlight: 'Industry Standard' }]);
                }}
                className="admin-btn admin-btn-primary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
              >
                <Plus size={14} />
                <span>Add Metric</span>
              </button>
            </div>

            {(draftContent.stats || []).map((stat, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--admin-border)',
                  marginBottom: '1rem',
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr 1fr auto',
                  gap: '1rem',
                  alignItems: 'end'
                }}
              >
                <div>
                  <label className="admin-label">Metric Value</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={stat.number || ''}
                    onChange={(e) => {
                      const newStats = [...draftContent.stats];
                      newStats[idx].number = e.target.value;
                      handleFieldChange('stats', newStats);
                    }}
                  />
                </div>
                <div>
                  <label className="admin-label">Metric Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={stat.label || ''}
                    onChange={(e) => {
                      const newStats = [...draftContent.stats];
                      newStats[idx].label = e.target.value;
                      handleFieldChange('stats', newStats);
                    }}
                  />
                </div>
                <div>
                  <label className="admin-label">Tag / Highlight</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={stat.highlight || ''}
                    onChange={(e) => {
                      const newStats = [...draftContent.stats];
                      newStats[idx].highlight = e.target.value;
                      handleFieldChange('stats', newStats);
                    }}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      const newStats = draftContent.stats.filter((_, i) => i !== idx);
                      handleFieldChange('stats', newStats);
                    }}
                    className="admin-action-btn danger"
                    style={{ padding: '0.55rem', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.15)' }}
                    title="Delete Metric"
                  >
                    <Trash2 size={15} color="#ef4444" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================
            TAB 3: VISION, MISSION & PHILOSOPHY (Comprehensive Bento)
            ======================================================== */}
        {activeTab === 'vision_mission' && (
          <div>
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--admin-border)' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>
                Vision, Mission & Philosophy Bento Editor
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: 0 }}>
                Manage all three core pillars (Our Vision, Our Mission, and Our Philosophy) shown on the live website.
              </p>
            </div>

            {/* Section Header Controls */}
            <div className="admin-grid-3" style={{ marginBottom: '1.5rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Eyebrow Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.badge || 'PURPOSE & PRINCIPLES'}
                  placeholder="PURPOSE & PRINCIPLES"
                  onChange={(e) => handleFieldChange('badge', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Section Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.title || 'The Guiding Pillars Behind Our Growth'}
                  placeholder="The Guiding Pillars Behind Our Growth"
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Section Subtitle</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.subtitle || ''}
                  placeholder="Every system we engineer is backed by our relentless commitment..."
                  onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                />
              </div>
            </div>

            {/* Sub-Tab Navigation for the 3 Pillars */}
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', padding: '0.4rem', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
              <button
                type="button"
                onClick={() => setVmSubTab('vision')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  borderRadius: '7px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  background: vmSubTab === 'vision' ? 'var(--admin-orange)' : 'transparent',
                  color: vmSubTab === 'vision' ? '#fff' : '#9ca3af',
                  transition: 'all 0.2s'
                }}
              >
                <Lightbulb size={16} />
                <span>1. Our Vision Tab</span>
              </button>

              <button
                type="button"
                onClick={() => setVmSubTab('mission')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  borderRadius: '7px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  background: vmSubTab === 'mission' ? 'var(--admin-purple)' : 'transparent',
                  color: vmSubTab === 'mission' ? '#fff' : '#9ca3af',
                  transition: 'all 0.2s'
                }}
              >
                <Rocket size={16} />
                <span>2. Our Mission Tab</span>
              </button>

              <button
                type="button"
                onClick={() => setVmSubTab('philosophy')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  borderRadius: '7px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  background: vmSubTab === 'philosophy' ? '#06b6d4' : 'transparent',
                  color: vmSubTab === 'philosophy' ? '#fff' : '#9ca3af',
                  transition: 'all 0.2s'
                }}
              >
                <Code2 size={16} />
                <span>3. Our Philosophy Tab</span>
              </button>
            </div>

            {/* Active Pillar Editor Card */}
            {['vision', 'mission', 'philosophy'].map((pillarKey) => {
              if (vmSubTab !== pillarKey) return null;
              const pillar = draftContent[pillarKey] || defaultSecContent[pillarKey] || {};
              const pillarTitle = pillarKey === 'vision' ? 'Our Vision' : pillarKey === 'mission' ? 'Our Mission' : 'Our Philosophy';
              const accentColor = pillarKey === 'vision' ? 'var(--admin-orange)' : pillarKey === 'mission' ? 'var(--admin-purple)' : '#06b6d4';

              return (
                <div
                  key={pillarKey}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--admin-border)',
                    borderRadius: '12px',
                    padding: '1.5rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: accentColor }}></div>
                    <h4 style={{ color: '#fff', margin: 0, fontSize: '1.1rem' }}>
                      {pillarTitle} Configuration
                    </h4>
                  </div>

                  <div className="admin-grid-3">
                    <div className="admin-form-group">
                      <label className="admin-label">Tag / Eyebrow Badge</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={pillar.tag || ''}
                        placeholder={pillarKey === 'vision' ? 'Strategic Vision' : pillarKey === 'mission' ? 'Execution & Commitment' : 'Architectural Integrity'}
                        onChange={(e) => updateVmPillar(pillarKey, 'tag', e.target.value)}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">Main Heading Prefix</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={pillar.heading || ''}
                        placeholder={pillarKey === 'vision' ? 'Empowering Tomorrow Through' : pillarKey === 'mission' ? 'Crafting Excellence,' : 'Engineering For'}
                        onChange={(e) => updateVmPillar(pillarKey, 'heading', e.target.value)}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">Heading Highlight (Gradient Text)</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={pillar.headingHighlight || ''}
                        placeholder={pillarKey === 'vision' ? 'Innovative Code' : pillarKey === 'mission' ? 'One Line of Code at a Time' : 'Infinite Scale & Speed'}
                        onChange={(e) => updateVmPillar(pillarKey, 'headingHighlight', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Primary Narrative Paragraph (p1)</label>
                    <textarea
                      rows={3}
                      className="admin-textarea"
                      value={pillar.p1 || ''}
                      placeholder="Detailed statement defining this core pillar..."
                      onChange={(e) => updateVmPillar(pillarKey, 'p1', e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Secondary Narrative Paragraph (p2)</label>
                    <textarea
                      rows={3}
                      className="admin-textarea"
                      value={pillar.p2 || ''}
                      placeholder="Reinforcing context and broader impact..."
                      onChange={(e) => updateVmPillar(pillarKey, 'p2', e.target.value)}
                    />
                  </div>

                  {/* Dynamic Checklist Points Manager */}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1.25rem', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <label className="admin-label" style={{ margin: 0 }}>
                        Strategic Checklist Highlights ({(pillar.points || []).length})
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddVmPoint(pillarKey)}
                        className="admin-btn admin-btn-secondary"
                        style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}
                      >
                        <Plus size={14} />
                        <span>Add Checklist Point</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {(pillar.points || []).map((pt, ptIdx) => (
                        <div key={ptIdx} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                          <span style={{ color: 'var(--admin-orange)', fontSize: '0.85rem', fontWeight: 700 }}>
                            ✓
                          </span>
                          <input
                            type="text"
                            className="admin-input"
                            value={pt}
                            onChange={(e) => handleUpdateVmPoint(pillarKey, ptIdx, e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteVmPoint(pillarKey, ptIdx)}
                            className="admin-action-btn danger"
                            style={{ padding: '0.5rem', borderRadius: '4px' }}
                            title="Delete Point"
                          >
                            <Trash2 size={14} color="#ef4444" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quote Box Manager */}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
                    <h5 style={{ color: '#d1d5db', margin: '0 0 0.85rem', fontSize: '0.95rem' }}>
                      Featured Quote Card
                    </h5>
                    <div className="admin-grid-2">
                      <div className="admin-form-group">
                        <label className="admin-label">Quote Statement</label>
                        <textarea
                          rows={2}
                          className="admin-textarea"
                          value={pillar.quote || ''}
                          placeholder="Memorable quote from tech leadership..."
                          onChange={(e) => updateVmPillar(pillarKey, 'quote', e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Quote Author / Attribution</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={pillar.quoteAuthor || ''}
                          placeholder="— Black Grapes Softech Leadership"
                          onChange={(e) => updateVmPillar(pillarKey, 'quoteAuthor', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================
            TAB 4: FOUNDERS & LEADERSHIP (LEADERSHIP & VISION)
            ======================================================== */}
        {activeTab === 'founders' && (
          <div>
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--admin-border)' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: '0 0 0.5rem' }}>
                Leadership & Vision (Founders Section) Editor
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: 0 }}>
                Manage the leadership section, founders photo, executive narrative, and bios displayed on the About page.
              </p>
            </div>

            {/* Card 1: Section Header (SS 1) */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--admin-border)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem' }}>
              <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 1rem' }}>Section Header</h4>
              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label className="admin-label">Eyebrow Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={draftContent.badge || 'LEADERSHIP & VISION'}
                    placeholder="LEADERSHIP & VISION"
                    onChange={(e) => handleFieldChange('badge', e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Section Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={draftContent.title || 'Meet the Visionaries Behind Black Grapes'}
                    placeholder="Meet the Visionaries Behind Black Grapes"
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Section Subtitle (SS 1)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={draftContent.subtitle || ''}
                    placeholder="Passionate innovators dedicated to redefining software engineering standards."
                    onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Founders Photo & Cyber Badge */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--admin-border)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem' }}>
              <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 1rem' }}>Founders Photo & Overlay Cyber Tag</h4>
              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label className="admin-label">Photo Image URL / Asset Path</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={draftContent.photo || ''}
                    placeholder="/images/founders.jpg"
                    onChange={(e) => handleFieldChange('photo', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Photo Tag Name</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={draftContent.photoTagName || ''}
                    placeholder="Mr. Arpit Jain & Mrs. Deepika Jain"
                    onChange={(e) => handleFieldChange('photoTagName', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Photo Tag Role / Designation</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={draftContent.photoTagRole || ''}
                    placeholder="Founders & Executive Directors"
                    onChange={(e) => handleFieldChange('photoTagRole', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Executive Leadership Narrative (SS 2) */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--admin-border)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem' }}>
              <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 1rem' }}>Executive Leadership Narrative (Right Column)</h4>
              
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label">Eyebrow Pill Badge (SS 2)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={draftContent.execBadge || 'EXECUTIVE LEADERSHIP'}
                    placeholder="EXECUTIVE LEADERSHIP"
                    onChange={(e) => handleFieldChange('execBadge', e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Narrative Heading (SS 2)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={draftContent.heading || ''}
                    placeholder="Driven By Innovation, Grounded In Excellence"
                    onChange={(e) => handleFieldChange('heading', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-label">Narrative Intro Paragraph (SS 2)</label>
                <textarea
                  rows={3}
                  className="admin-textarea"
                  value={draftContent.intro || ''}
                  placeholder="Behind Black Grapes Softech stand two visionary leaders with an unquenchable passion for digital advancement."
                  onChange={(e) => handleFieldChange('intro', e.target.value)}
                />
              </div>
            </div>

            {/* Card 4: Individual Leader Profiles */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              {/* Founder 1 */}
              <div style={{ background: 'rgba(255, 107, 0, 0.03)', border: '1px solid rgba(255, 107, 0, 0.2)', borderRadius: '10px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--admin-orange)' }}></div>
                  <h4 style={{ color: 'var(--admin-orange)', margin: 0, fontSize: '0.98rem' }}>
                    Leader 1 Profile (Founder & Chief Architect)
                  </h4>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Name & Designation Line</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={draftContent.founder1Name || ''}
                    placeholder="Mr. Arpit Jain — Founder & Chief Architect"
                    onChange={(e) => handleFieldChange('founder1Name', e.target.value)}
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-label">Bio Description</label>
                  <textarea
                    rows={4}
                    className="admin-textarea"
                    value={draftContent.founder1Bio || ''}
                    placeholder="The driving force behind our software development journey..."
                    onChange={(e) => handleFieldChange('founder1Bio', e.target.value)}
                  />
                </div>
              </div>

              {/* Founder 2 */}
              <div style={{ background: 'rgba(168, 85, 247, 0.03)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '10px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--admin-purple)' }}></div>
                  <h4 style={{ color: 'var(--admin-purple)', margin: 0, fontSize: '0.98rem' }}>
                    Leader 2 Profile (Co-Founder & Strategic Director)
                  </h4>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Name & Designation Line</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={draftContent.founder2Name || ''}
                    placeholder="Mrs. Deepika Jain — Co-Founder & Strategic Director"
                    onChange={(e) => handleFieldChange('founder2Name', e.target.value)}
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-label">Bio Description</label>
                  <textarea
                    rows={4}
                    className="admin-textarea"
                    value={draftContent.founder2Bio || ''}
                    placeholder="Deepika Jain doesn’t just see challenges; she envisions opportunities..."
                    onChange={(e) => handleFieldChange('founder2Bio', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Card 5: Bottom CTA Action */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--admin-border)', borderRadius: '10px', padding: '1.25rem' }}>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-label">Leadership Footer CTA Button Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.ctaText || 'Schedule a Discussion with Us'}
                  placeholder="Schedule a Discussion with Us"
                  onChange={(e) => handleFieldChange('ctaText', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: CORE VALUES
            ======================================================== */}
        {activeTab === 'core_values' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>
                  Core Values ({(draftContent.values || []).length})
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                  Manage the core principles displayed on the interactive values grid.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const current = Array.isArray(draftContent.values) ? [...draftContent.values] : [];
                  handleFieldChange('values', [...current, { title: 'New Core Value', desc: 'Description of the engineering standard.' }]);
                }}
                className="admin-btn admin-btn-primary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
              >
                <Plus size={14} />
                <span>Add Core Value</span>
              </button>
            </div>

            <div className="admin-grid-3" style={{ marginBottom: '1.25rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Eyebrow Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.badge || 'CORE VALUES'}
                  onChange={(e) => handleFieldChange('badge', e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Section Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.title || 'The Values That Fuel Our Work'}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Section Subtitle</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.subtitle || ''}
                  onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                />
              </div>
            </div>

            {(draftContent.values || []).map((val, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--admin-border)',
                  marginBottom: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--admin-orange)', fontWeight: 700, fontSize: '0.88rem' }}>
                    Core Value #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = draftContent.values.filter((_, i) => i !== idx);
                      handleFieldChange('values', updated);
                    }}
                    className="admin-action-btn danger"
                    style={{ padding: '0.4rem', borderRadius: '4px' }}
                    title="Delete Value"
                  >
                    <Trash2 size={14} color="#ef4444" />
                  </button>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={val.title || ''}
                    onChange={(e) => {
                      const newVals = [...draftContent.values];
                      newVals[idx].title = e.target.value;
                      handleFieldChange('values', newVals);
                    }}
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-label">Description</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={val.desc || ''}
                    onChange={(e) => {
                      const newVals = [...draftContent.values];
                      newVals[idx].desc = e.target.value;
                      handleFieldChange('values', newVals);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================
            TAB 6: TECH DOMAINS
            ======================================================== */}
        {activeTab === 'technical_expertise' && (
          <div>
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--admin-border)' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>
                Technical Expertise & Domains Settings
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: 0 }}>
                Manage the eyebrow badge, section title, description subtitle, and dynamic capability pills shown on the live website.
              </p>
            </div>

            {/* Section Header Controls */}
            <div className="admin-grid-2" style={{ marginBottom: '1.25rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Eyebrow Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.badge || ''}
                  placeholder="e.g. TECHNICAL EXPERTISE"
                  onChange={(e) => handleFieldChange('badge', e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Section Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.title || ''}
                  placeholder="e.g. Versatile Engineering Across Critical Digital Domains"
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="admin-label">Section Subtitle / Description</label>
              <textarea
                rows={2}
                className="admin-textarea"
                value={draftContent.subtitle || ''}
                placeholder="e.g. Our team delivers custom solutions across complex enterprise requirements with precision and high performance."
                onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              />
            </div>

            {/* Dynamic Domain Pills Manager */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '1rem', fontWeight: 600 }}>
                    Dynamic Domain Pills ({(draftContent.domains || []).length})
                  </h4>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>
                    Each pill renders with an icon chip in the tech capabilities section on the website.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const current = Array.isArray(draftContent.domains) ? [...draftContent.domains] : [];
                    handleFieldChange('domains', [...current, 'New Domain / Technical Specialization']);
                  }}
                  className="admin-btn admin-btn-primary"
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
                >
                  <Plus size={14} />
                  <span>Add Domain Pill</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '0.75rem' }}>
                {(draftContent.domains || []).map((domain, dIdx) => (
                  <div
                    key={dIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--admin-border)',
                      borderRadius: '8px',
                      padding: '0.5rem 0.75rem'
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: 'var(--admin-orange)', fontWeight: 700, minWidth: '22px' }}>
                      #{dIdx + 1}
                    </span>
                    <input
                      type="text"
                      className="admin-input"
                      value={domain}
                      placeholder="e.g. CRM Software Systems"
                      onChange={(e) => {
                        const updated = [...draftContent.domains];
                        updated[dIdx] = e.target.value;
                        handleFieldChange('domains', updated);
                      }}
                      style={{ flex: 1, padding: '0.45rem 0.65rem', fontSize: '0.85rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = draftContent.domains.filter((_, i) => i !== dIdx);
                        handleFieldChange('domains', updated);
                      }}
                      className="admin-action-btn danger"
                      style={{ padding: '0.45rem', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.15)' }}
                      title="Delete Domain Pill"
                    >
                      <Trash2 size={14} color="#ef4444" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 7: MILESTONES & HISTORY
            ======================================================== */}
        {activeTab === 'milestones' && (
          <div>
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--admin-border)' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>
                Company Milestones & Decade Timeline
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: 0 }}>
                Manage the eyebrow badge, section title, description subtitle, and timeline events of Black Grapes Softech.
              </p>
            </div>

            {/* Section Header Controls */}
            <div className="admin-grid-2" style={{ marginBottom: '1.25rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Eyebrow Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.badge || ''}
                  placeholder="e.g. OUR MILESTONES"
                  onChange={(e) => handleFieldChange('badge', e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Section Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.title || ''}
                  placeholder="e.g. A Decade of Relentless Evolution"
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="admin-label">Section Subtitle / Description</label>
              <textarea
                rows={2}
                className="admin-textarea"
                value={draftContent.subtitle || ''}
                placeholder="e.g. From a dedicated local engineering hub in Indore to an internationally trusted software powerhouse."
                onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              />
            </div>

            {/* Timeline Milestones Cards */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '1rem', fontWeight: 600 }}>
                    Timeline Milestone Events ({(draftContent.milestones || []).length})
                  </h4>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>
                    Add, edit, or remove milestone events displayed sequentially along the timeline.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const current = Array.isArray(draftContent.milestones) ? [...draftContent.milestones] : [];
                    handleFieldChange('milestones', [
                      ...current,
                      { year: '2026+', title: 'New Strategic Frontier', desc: 'Accelerating AI-first solutions, enterprise deployments, and global product scale.' }
                    ]);
                  }}
                  className="admin-btn admin-btn-primary"
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
                >
                  <Plus size={14} />
                  <span>Add Milestone</span>
                </button>
              </div>

              {(draftContent.milestones || []).map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.15rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--admin-border)',
                    marginBottom: '1rem',
                    display: 'grid',
                    gridTemplateColumns: '140px 1fr auto',
                    gap: '1rem',
                    alignItems: 'start'
                  }}
                >
                  <div>
                    <label className="admin-label">Year / Era</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={m.year || ''}
                      placeholder="e.g. 2014"
                      onChange={(e) => {
                        const newM = [...draftContent.milestones];
                        newM[idx].year = e.target.value;
                        handleFieldChange('milestones', newM);
                      }}
                    />
                  </div>
                  <div>
                    <div className="admin-form-group" style={{ marginBottom: '0.5rem' }}>
                      <label className="admin-label">Milestone Title</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={m.title || ''}
                        placeholder="e.g. The Foundation"
                        onChange={(e) => {
                          const newM = [...draftContent.milestones];
                          newM[idx].title = e.target.value;
                          handleFieldChange('milestones', newM);
                        }}
                      />
                    </div>
                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                      <label className="admin-label">Description / Summary</label>
                      <textarea
                        rows={2}
                        className="admin-textarea"
                        value={m.desc || ''}
                        placeholder="Brief summary of what was accomplished during this milestone..."
                        onChange={(e) => {
                          const newM = [...draftContent.milestones];
                          newM[idx].desc = e.target.value;
                          handleFieldChange('milestones', newM);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        const newM = draftContent.milestones.filter((_, i) => i !== idx);
                        handleFieldChange('milestones', newM);
                      }}
                      className="admin-action-btn danger"
                      style={{ padding: '0.55rem', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.15)', marginTop: '1.4rem' }}
                      title="Delete Milestone"
                    >
                      <Trash2 size={15} color="#ef4444" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 8: CULTURE & HQ
            ======================================================== */}
        {activeTab === 'culture_hq' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem' }}>
              Culture & Indore Headquarters
            </h3>

            <div className="admin-grid-2" style={{ marginBottom: '1.25rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Eyebrow Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.badge || 'HEADQUARTERS & CULTURE'}
                  placeholder="e.g. HEADQUARTERS & CULTURE"
                  onChange={(e) => handleFieldChange('badge', e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Location Tag</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.locationTag || ''}
                  placeholder="e.g. Indore Innovation Campus (HQ)"
                  onChange={(e) => handleFieldChange('locationTag', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Headline</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.title || ''}
                placeholder="e.g. Where Passionate Technologists Thrive"
                onChange={(e) => handleFieldChange('title', e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">HQ Office Image URL</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.image || ''}
                onChange={(e) => handleFieldChange('image', e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Paragraph 1</label>
              <textarea
                rows={2}
                className="admin-textarea"
                value={draftContent.p1 || ''}
                onChange={(e) => handleFieldChange('p1', e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Paragraph 2</label>
              <textarea
                rows={2}
                className="admin-textarea"
                value={draftContent.p2 || ''}
                onChange={(e) => handleFieldChange('p2', e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="admin-label">Highlight Stat 1 Number & Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.stat1Num || ''}
                  onChange={(e) => handleFieldChange('stat1Num', e.target.value)}
                  style={{ marginBottom: '0.4rem' }}
                />
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.stat1Label || ''}
                  onChange={(e) => handleFieldChange('stat1Label', e.target.value)}
                />
              </div>

              <div>
                <label className="admin-label">Highlight Stat 2 Number & Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.stat2Num || ''}
                  onChange={(e) => handleFieldChange('stat2Num', e.target.value)}
                  style={{ marginBottom: '0.4rem' }}
                />
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.stat2Label || ''}
                  onChange={(e) => handleFieldChange('stat2Label', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 9: FINAL CTA
            ======================================================== */}
        {activeTab === 'final_cta' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem' }}>
              Final Conversion Call to Action Banner
            </h3>

            <div className="admin-form-group">
              <label className="admin-label">Heading</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Lead Subtext</label>
              <textarea
                rows={2}
                className="admin-textarea"
                value={draftContent.text || ''}
                onChange={(e) => handleFieldChange('text', e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Button Label</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.buttonText || ''}
                onChange={(e) => handleFieldChange('buttonText', e.target.value)}
              />
            </div>
          </div>
        )}

        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            onClick={handlePublish}
            disabled={publishing || saving}
            className="admin-btn admin-btn-primary"
            style={{ minWidth: '190px', justifyContent: 'center' }}
          >
            <Save size={16} />
            <span>{publishing ? 'Publishing...' : 'Save & Publish to Live'}</span>
          </button>
        </div>
      </div>

      {/* Revision History Modal */}
      {showRevisionsModal && (
        <div className="admin-modal-overlay" onClick={() => setShowRevisionsModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>
                Content Version History & Audit
              </h3>
              <button
                onClick={() => setShowRevisionsModal(false)}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.3rem 0.6rem' }}
              >
                ✕
              </button>
            </div>
            <div className="admin-modal-body">
              {revisions.length === 0 ? (
                <div style={{ color: '#9ca3af', textAlign: 'center', padding: '1rem' }}>
                  No published revisions recorded for this section yet.
                </div>
              ) : (
                revisions.map((rev) => (
                  <div
                    key={rev.id}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--admin-border)',
                      marginBottom: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <strong style={{ color: 'var(--admin-orange)' }}>Version #{rev.version}</strong>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {new Date(rev.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#d1d5db' }}>
                      Published by: <em>{rev.published_by}</em>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="admin-modal-footer">
              <button onClick={() => setShowRevisionsModal(false)} className="admin-btn admin-btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
