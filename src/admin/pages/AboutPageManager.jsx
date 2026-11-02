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
  History,
  AlertCircle
} from 'lucide-react';
import {
  getPageSections,
  updateSectionDraft,
  publishSection,
  revertSectionDraft,
  getContentRevisions
} from '../../services/dataService';

export default function AboutPageManager() {
  const [sections, setSections] = useState(null);
  const [activeTab, setActiveTab] = useState('about_hero');
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
    setTimeout(() => setToastMessage(''), 3000);
  };

  if (!sections) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading content editor...</div>;
  }

  const currentSection = sections[activeTab];
  const draftContent = currentSection?.draft_content || currentSection?.content || {};

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

  const handleSaveDraft = async () => {
    setSaving(true);
    await updateSectionDraft(activeTab, draftContent);
    setSaving(false);
    showToast('Draft changes saved successfully.');
    await loadSections();
  };

  const handlePublish = async () => {
    setPublishing(true);
    await publishSection(activeTab);
    setPublishing(false);
    showToast(`Published live updates for ${currentSection.section_name}! Website updated.`);
    await loadSections();
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
    { id: 'vision_mission', label: '3. Vision & Mission', icon: Target },
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
          <h1 className="admin-page-title">About Us & Showcase Content Manager</h1>
          <p className="admin-page-sub">
            Edit, preview, and publish all sections on the primary About and Home page.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button onClick={openRevisions} className="admin-btn admin-btn-secondary" title="View Version History">
            <History size={15} />
            <span>Revisions</span>
          </button>

          {currentSection?.has_unpublished_changes && (
            <button onClick={handleRevert} className="admin-btn admin-btn-secondary" title="Discard draft">
              <RotateCcw size={15} />
              <span>Discard Draft</span>
            </button>
          )}

          <button onClick={handleSaveDraft} disabled={saving} className="admin-btn admin-btn-secondary">
            <Save size={15} />
            <span>{saving ? 'Saving...' : 'Save Draft'}</span>
          </button>

          <button onClick={handlePublish} disabled={publishing} className="admin-btn admin-btn-primary">
            <Send size={15} />
            <span>{publishing ? 'Publishing...' : 'Publish to Live Website'}</span>
          </button>
        </div>
      </div>

      {/* Draft Status Strip */}
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
              <strong>Unpublished Draft Changes:</strong> This section has draft modifications not yet visible to public visitors. Click "Publish to Live Website" to release them.
            </span>
          </div>
        </div>
      ) : (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '8px',
            padding: '0.6rem 1.25rem',
            marginBottom: '1.5rem',
            fontSize: '0.8rem',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <CheckCircle size={15} />
          <span>Section is in sync with the live website.</span>
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
              <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem', display: 'block' }}>
                Tip: You can upload a new photo in the Media Library and paste its URL here.
              </span>
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
          </div>
        )}

        {/* ========================================================
            TAB 2: METRICS BAR
            ======================================================== */}
        {activeTab === 'stats_strip' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem' }}>
              Key Impact Metrics Bar
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '1.5rem' }}>
              Manage the 4 key statistical metrics highlighted across the top banner.
            </p>

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
                  gridTemplateColumns: '120px 1fr 1fr',
                  gap: '1rem'
                }}
              >
                <div>
                  <label className="admin-label">Metric Value</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={stat.number}
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
                    value={stat.label}
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
                    value={stat.highlight}
                    onChange={(e) => {
                      const newStats = [...draftContent.stats];
                      newStats[idx].highlight = e.target.value;
                      handleFieldChange('stats', newStats);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================
            TAB 4: FOUNDERS & LEADERSHIP
            ======================================================== */}
        {activeTab === 'founders' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem' }}>
              Founders & Executive Leadership
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Section Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.title || ''}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Founders Photo URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.photo || ''}
                  onChange={(e) => handleFieldChange('photo', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Photo Badge Tag Name</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.photoTagName || ''}
                onChange={(e) => handleFieldChange('photoTagName', e.target.value)}
              />
            </div>

            <div style={{ borderTop: '1px solid var(--admin-border)', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
              <h4 style={{ color: 'var(--admin-orange)', marginBottom: '0.75rem' }}>
                Mr. Arpit Jain (Founder & Chief Architect)
              </h4>
              <div className="admin-form-group">
                <label className="admin-label">Title Line</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.founder1Name || ''}
                  onChange={(e) => handleFieldChange('founder1Name', e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Bio Description</label>
                <textarea
                  rows={3}
                  className="admin-textarea"
                  value={draftContent.founder1Bio || ''}
                  onChange={(e) => handleFieldChange('founder1Bio', e.target.value)}
                />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--admin-border)', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
              <h4 style={{ color: 'var(--admin-purple)', marginBottom: '0.75rem' }}>
                Mrs. Deepika Jain (Co-Founder & Strategic Director)
              </h4>
              <div className="admin-form-group">
                <label className="admin-label">Title Line</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.founder2Name || ''}
                  onChange={(e) => handleFieldChange('founder2Name', e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Bio Description</label>
                <textarea
                  rows={3}
                  className="admin-textarea"
                  value={draftContent.founder2Bio || ''}
                  onChange={(e) => handleFieldChange('founder2Bio', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: VISION, MISSION & PHILOSOPHY
            ======================================================== */}
        {activeTab === 'vision_mission' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem' }}>
              Vision, Mission & Philosophy Bento
            </h3>

            <div className="admin-form-group">
              <label className="admin-label">Section Title</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.title || ''}
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

            {/* Vision Editor */}
            <div style={{ borderTop: '1px solid var(--admin-border)', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
              <h4 style={{ color: 'var(--admin-orange)', marginBottom: '0.75rem' }}>Our Vision Tab</h4>
              <div className="admin-form-group">
                <label className="admin-label">Vision Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.vision?.heading || ''}
                  onChange={(e) => {
                    const newVision = { ...draftContent.vision, heading: e.target.value };
                    handleFieldChange('vision', newVision);
                  }}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Vision Main Paragraph</label>
                <textarea
                  rows={2}
                  className="admin-textarea"
                  value={draftContent.vision?.p1 || ''}
                  onChange={(e) => {
                    const newVision = { ...draftContent.vision, p1: e.target.value };
                    handleFieldChange('vision', newVision);
                  }}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Vision Quote</label>
                <input
                  type="text"
                  className="admin-input"
                  value={draftContent.vision?.quote || ''}
                  onChange={(e) => {
                    const newVision = { ...draftContent.vision, quote: e.target.value };
                    handleFieldChange('vision', newVision);
                  }}
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
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem' }}>
              Core Values Editor
            </h3>

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
                <div className="admin-form-group">
                  <label className="admin-label">Value #{idx + 1} Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={val.title}
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
                    value={val.desc}
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
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem' }}>
              Technical Expertise Domains
            </h3>
            <div className="admin-form-group">
              <label className="admin-label">Domains List (Comma-separated)</label>
              <textarea
                rows={5}
                className="admin-textarea"
                value={(draftContent.domains || []).join('\n')}
                onChange={(e) => {
                  const arr = e.target.value.split('\n').map((s) => s.trim()).filter(Boolean);
                  handleFieldChange('domains', arr);
                }}
              />
              <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem', display: 'block' }}>
                Enter each domain on a new line.
              </span>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 7: MILESTONES
            ======================================================== */}
        {activeTab === 'milestones' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem' }}>
              Company Milestones & Decade Timeline
            </h3>

            {(draftContent.milestones || []).map((m, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--admin-border)',
                  marginBottom: '1rem',
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '1rem'
                }}
              >
                <div>
                  <label className="admin-label">Year</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={m.year}
                    onChange={(e) => {
                      const newM = [...draftContent.milestones];
                      newM[idx].year = e.target.value;
                      handleFieldChange('milestones', newM);
                    }}
                  />
                </div>
                <div>
                  <label className="admin-label">Milestone Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={m.title}
                    onChange={(e) => {
                      const newM = [...draftContent.milestones];
                      newM[idx].title = e.target.value;
                      handleFieldChange('milestones', newM);
                    }}
                    style={{ marginBottom: '0.5rem' }}
                  />
                  <label className="admin-label">Summary</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={m.desc}
                    onChange={(e) => {
                      const newM = [...draftContent.milestones];
                      newM[idx].desc = e.target.value;
                      handleFieldChange('milestones', newM);
                    }}
                  />
                </div>
              </div>
            ))}
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
              <label className="admin-label">Location Tag</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.locationTag || ''}
                onChange={(e) => handleFieldChange('locationTag', e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Headline</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
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
