import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  Sliders,
  Send,
  Save,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Code,
  Flame,
  Clock,
  Compass,
  ShieldCheck,
  Target,
  Package,
  Users,
  MessageSquareQuote,
  Globe
} from 'lucide-react';
import {
  getPageSections,
  updateSectionDraft,
  publishSection,
  revertSectionDraft,
  uploadMediaItem
} from '@backend/dataService';
import {
  getPageDefaultSections,
  DEFAULT_HOME_SECTIONS
} from '@backend/defaultData';

const getInitialHomeSections = () => {
  const fallback = (typeof getPageDefaultSections === 'function' ? getPageDefaultSections('home') : null) || DEFAULT_HOME_SECTIONS || {};
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('bg_page_sections_home');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
          return { ...fallback, ...parsed };
        }
      }
    }
  } catch (e) {}
  return fallback;
};

export default function HomePageManager() {
  const [sections, setSections] = useState(getInitialHomeSections);
  const [activeTab, setActiveTab] = useState('home_hero');
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadSections();
  }, []);

  const handleImageUpload = async (key, file) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await uploadMediaItem(file);
      if (res.success && res.data?.url) {
        handleFieldChange(key, res.data.url);
        showToast('Photo uploaded successfully.');
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          handleFieldChange(key, reader.result);
          showToast('Photo loaded.');
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      showToast('Error uploading photo.');
    } finally {
      setUploadingImage(false);
    }
  };

  const loadSections = async () => {
    try {
      const data = await getPageSections('home');
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        setSections((prev) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.warn('Could not refresh home sections from server:', err);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const currentSection = (sections && sections[activeTab]) || getInitialHomeSections()[activeTab] || {};
  const draftContent = currentSection?.draft_content || currentSection?.content || {};

  const handleFieldChange = (key, val) => {
    const updatedDraft = { ...draftContent, [key]: val };
    setSections((prev) => ({
      ...(prev || {}),
      [activeTab]: {
        ...((prev && prev[activeTab]) || currentSection),
        draft_content: updatedDraft,
        has_unpublished_changes: true
      }
    }));
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    await updateSectionDraft(activeTab, draftContent, 'home');
    setSaving(false);
    showToast('Draft changes saved successfully.');
    await loadSections();
  };

  const handlePublish = async () => {
    setPublishing(true);
    await updateSectionDraft(activeTab, draftContent, 'home');
    await publishSection(activeTab, 'admin@blackgrapessoftech.com', 'home', draftContent);
    setPublishing(false);
    showToast(`Published live updates for ${currentSection.section_name || activeTab}! Website updated.`);
    await loadSections();
  };

  const handleRevert = async () => {
    if (window.confirm('Discard all unsaved draft changes and revert to published version?')) {
      await revertSectionDraft(activeTab, 'home');
      showToast('Reverted to published version.');
      await loadSections();
    }
  };

  const tabList = [
    { id: 'home_hero', label: '1. Hero & Headline Banner', icon: Sparkles },
    { id: 'home_philosophy', label: '2. Brand Philosophy', icon: Compass },
    { id: 'home_why_us', label: '3. Why Choose Us', icon: ShieldCheck },
    { id: 'home_industries', label: '4. Industries Served', icon: Layers },
    { id: 'home_cta', label: '5. Bottom CTA Banner', icon: Flame }
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

      {/* Header Bar */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.1), rgba(139, 92, 246, 0.1))',
          border: '1px solid var(--admin-border)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--admin-orange)', letterSpacing: '0.05em' }}>
            PUBLIC HOME ROUTE (/)
          </span>
          <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: '0.2rem 0' }}>
            Home Page Content Manager
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: 0 }}>
            Live content management for the public Home Page (/). Edits published here reflect instantly via WebSockets.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link to="/admin/header" className="admin-btn admin-btn-secondary">
            <Sliders size={15} />
            <span>Top Header Strip</span>
          </Link>
          <a href="/" target="_blank" rel="noreferrer" className="admin-btn admin-btn-secondary">
            <span>View Home</span>
            <ExternalLink size={15} />
          </a>
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
            fontSize: '0.85rem',
            color: '#fbbf24',
            gap: '0.5rem'
          }}
        >
          <AlertCircle size={16} />
          <span>
            <strong>Unpublished Draft Changes:</strong> This section has draft modifications not yet visible to public visitors. Click "Publish to Live Website" to release them.
          </span>
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

      {/* Horizontal Tab Navigation */}
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
                background: isSelected ? 'rgba(255, 107, 0, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: isSelected ? '#fff' : '#9ca3af',
                fontSize: '0.85rem',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
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

      {/* Tab 1: Home Hero */}
      {activeTab === 'home_hero' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem' }}>
            Home Hero Headline & Showcase
          </h3>

          <div className="admin-form-group">
            <label className="admin-label">Top Eyebrow Badge</label>
            <input
              type="text"
              className="admin-input"
              placeholder="10+ Years of Proven IT Excellence • Indore, India"
              value={draftContent.eyebrowBadge || ''}
              onChange={(e) => handleFieldChange('eyebrowBadge', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Headline Prefix (Small text above)</label>
              <input
                type="text"
                className="admin-input"
                placeholder="Innovate. Integrate. Elevate."
                value={draftContent.prefix || ''}
                onChange={(e) => handleFieldChange('prefix', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Main Headline Lead</label>
              <input
                type="text"
                className="admin-input"
                placeholder="And Digitalize Your Ideas into Success via"
                value={draftContent.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Brand Highlight (Gradient Glow)</label>
              <input
                type="text"
                className="admin-input"
                placeholder="BLACK GRAPES SOFTECH"
                value={draftContent.brandHighlight || ''}
                onChange={(e) => handleFieldChange('brandHighlight', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Headline Suffix (Ending phrase)</label>
              <input
                type="text"
                className="admin-input"
                placeholder=", Where Innovation And ideas Meets Excellence."
                value={draftContent.suffix || ''}
                onChange={(e) => handleFieldChange('suffix', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Hero Lead Description Paragraph</label>
            <textarea
              rows={3}
              className="admin-textarea"
              placeholder="Get Free Consultation From Our Industry Experts..."
              value={draftContent.lead || ''}
              onChange={(e) => handleFieldChange('lead', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Primary CTA Button</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.primaryBtnText || ''}
                onChange={(e) => handleFieldChange('primaryBtnText', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Secondary CTA Button</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.secondaryBtnText || ''}
                onChange={(e) => handleFieldChange('secondaryBtnText', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Third Link Text</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.linkBtnText || ''}
                onChange={(e) => handleFieldChange('linkBtnText', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group" style={{ marginTop: '1.25rem' }}>
            <label className="admin-label">Hero Section Image / Showcase Banner (Optional Custom Picture)</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.6rem' }}>
              {draftContent.customImage && (
                <img
                  src={draftContent.customImage}
                  alt="Custom Hero Preview"
                  style={{ width: '80px', height: '55px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--admin-border)' }}
                />
              )}
              <label className="admin-btn admin-btn-secondary" style={{ cursor: 'pointer', fontSize: '0.8rem', padding: '0.45rem 0.9rem' }}>
                <span>{uploadingImage ? 'Uploading Picture...' : '📁 Choose & Upload New Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleImageUpload('customImage', e.target.files[0])}
                />
              </label>
            </div>
            <input
              type="text"
              className="admin-input"
              placeholder="Or paste an image URL directly"
              value={draftContent.customImage || ''}
              onChange={(e) => handleFieldChange('customImage', e.target.value)}
            />
          </div>

          <h4 style={{ color: '#fff', fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
            Hero Metrics Bar
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Metric 1</label>
              <input
                type="text"
                className="admin-input"
                placeholder="10+"
                value={draftContent.stat1Num || ''}
                onChange={(e) => handleFieldChange('stat1Num', e.target.value)}
                style={{ marginBottom: '0.4rem' }}
              />
              <input
                type="text"
                className="admin-input"
                placeholder="Years Experience"
                value={draftContent.stat1Label || ''}
                onChange={(e) => handleFieldChange('stat1Label', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Metric 2</label>
              <input
                type="text"
                className="admin-input"
                placeholder="100+"
                value={draftContent.stat2Num || ''}
                onChange={(e) => handleFieldChange('stat2Num', e.target.value)}
                style={{ marginBottom: '0.4rem' }}
              />
              <input
                type="text"
                className="admin-input"
                placeholder="Satisfied Clients"
                value={draftContent.stat2Label || ''}
                onChange={(e) => handleFieldChange('stat2Label', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Metric 3</label>
              <input
                type="text"
                className="admin-input"
                placeholder="150+"
                value={draftContent.stat3Num || ''}
                onChange={(e) => handleFieldChange('stat3Num', e.target.value)}
                style={{ marginBottom: '0.4rem' }}
              />
              <input
                type="text"
                className="admin-input"
                placeholder="Projects Shipped"
                value={draftContent.stat3Label || ''}
                onChange={(e) => handleFieldChange('stat3Label', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Metric 4</label>
              <input
                type="text"
                className="admin-input"
                placeholder="25+"
                value={draftContent.stat4Num || ''}
                onChange={(e) => handleFieldChange('stat4Num', e.target.value)}
                style={{ marginBottom: '0.4rem' }}
              />
              <input
                type="text"
                className="admin-input"
                placeholder="Expert Engineers"
                value={draftContent.stat4Label || ''}
                onChange={(e) => handleFieldChange('stat4Label', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Brand Philosophy */}
      {activeTab === 'home_philosophy' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem' }}>
            Brand Philosophy Section Settings
          </h3>

          <div className="admin-form-group">
            <label className="admin-label">Eyebrow Pill</label>
            <input
              type="text"
              className="admin-input"
              value={draftContent.eyebrow || ''}
              onChange={(e) => handleFieldChange('eyebrow', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Title Prefix</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Title Highlight (Gold text)</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.titleHighlight || ''}
                onChange={(e) => handleFieldChange('titleHighlight', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea
              rows={3}
              className="admin-textarea"
              value={draftContent.lead || ''}
              onChange={(e) => handleFieldChange('lead', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Mantra 1</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.mantra1 || ''}
                onChange={(e) => handleFieldChange('mantra1', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Mantra 2</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.mantra2 || ''}
                onChange={(e) => handleFieldChange('mantra2', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Mantra 3</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.mantra3 || ''}
                onChange={(e) => handleFieldChange('mantra3', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Why Choose Us */}
      {activeTab === 'home_why_us' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem' }}>
            Why Choose Us Section Settings
          </h3>

          <div className="admin-form-group">
            <label className="admin-label">Section Eyebrow Badge</label>
            <input
              type="text"
              className="admin-input"
              value={draftContent.badge || ''}
              placeholder="WHY CHOOSE US ?"
              onChange={(e) => handleFieldChange('badge', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Main Heading</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.title || ''}
                placeholder="Built On Security, Uncompromising Quality &"
                onChange={(e) => handleFieldChange('title', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Heading Highlight (Orange glow)</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.titleHighlight || ''}
                placeholder="Lifelong Relationships"
                onChange={(e) => handleFieldChange('titleHighlight', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Vision & Overview Statement</label>
            <textarea
              rows={3}
              className="admin-textarea"
              value={draftContent.vision || ''}
              placeholder="Our commitment is to eliminate technological roadblocks..."
              onChange={(e) => handleFieldChange('vision', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Tab 4: Industries Served */}
      {activeTab === 'home_industries' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem' }}>
            Industries We Serve Section Settings
          </h3>

          <div className="admin-form-group">
            <label className="admin-label">Eyebrow Badge</label>
            <input
              type="text"
              className="admin-input"
              value={draftContent.badge || ''}
              placeholder="INDUSTRIES"
              onChange={(e) => handleFieldChange('badge', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Section Title</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.title || ''}
                placeholder="Tailored IT Solutions Across"
                onChange={(e) => handleFieldChange('title', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Title Highlight</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.titleHighlight || ''}
                placeholder="High-Growth Industries"
                onChange={(e) => handleFieldChange('titleHighlight', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Subtitle Description</label>
            <textarea
              rows={3}
              className="admin-textarea"
              value={draftContent.subtitle || ''}
              placeholder="From regulated healthcare ecosystems to high-velocity on-demand logistics..."
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Tab 3: Bottom CTA Banner */}
      {activeTab === 'home_cta' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem' }}>
            Bottom CTA Banner Settings
          </h3>

          <div className="admin-form-group">
            <label className="admin-label">Badge</label>
            <input
              type="text"
              className="admin-input"
              value={draftContent.badge || ''}
              onChange={(e) => handleFieldChange('badge', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Main Title</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Highlight Title</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.titleHighlight || ''}
                onChange={(e) => handleFieldChange('titleHighlight', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Subtitle</label>
            <textarea
              rows={3}
              className="admin-textarea"
              value={draftContent.subtitle || ''}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Primary Button Text</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.primaryBtnText || ''}
                onChange={(e) => handleFieldChange('primaryBtnText', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Secondary Button Text</label>
              <input
                type="text"
                className="admin-input"
                value={draftContent.secondaryBtnText || ''}
                onChange={(e) => handleFieldChange('secondaryBtnText', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Linked Home Modules Nav Bar */}
      <div
        className="admin-card"
        style={{
          marginTop: '1.5rem',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px dashed var(--admin-border)'
        }}
      >
        <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={16} color="var(--admin-orange)" />
          <span>Other Dynamic Sections On Home Page</span>
        </h4>
        <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '1rem' }}>
          Services, portfolio projects, client testimonials, and section reordering can also be managed directly from their specialized editors:
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link to="/admin/services" className="admin-btn admin-btn-secondary" style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}>
            <Layers size={14} />
            <span>Manage Services ({'>'})</span>
          </Link>
          <Link to="/admin/projects" className="admin-btn admin-btn-secondary" style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}>
            <Package size={14} />
            <span>Manage Projects & Portfolio ({'>'})</span>
          </Link>
          <Link to="/admin/testimonials" className="admin-btn admin-btn-secondary" style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}>
            <MessageSquareQuote size={14} />
            <span>Manage Testimonials ({'>'})</span>
          </Link>
          <Link to="/admin/pages/home" className="admin-btn admin-btn-secondary" style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem', color: 'var(--admin-orange)', borderColor: 'rgba(255,107,0,0.3)' }}>
            <Globe size={14} />
            <span>Universal Home CMS & Section Reorder ({'>'})</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
