import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Save, 
  CheckCircle, 
  Sparkles, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Sliders,
  Layers,
  Clock,
  ShieldCheck,
  Megaphone
} from 'lucide-react';
import { getHomePage, updateHomePage } from '@backend/dataService';

export default function HomePageManager() {
  const [homeData, setHomeData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState('hero');

  // New badge input state
  const [newBadgeName, setNewBadgeName] = useState('');
  const [newBadgeCategory, setNewBadgeCategory] = useState('');

  useEffect(() => {
    getHomePage().then((res) => {
      setHomeData(res);
    });
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await updateHomePage(homeData);
      showToast('Home Page changes saved & published! Live website updated instantly.');
    } catch {
      showToast('Error saving home page.');
    } finally {
      setSaving(false);
    }
  };

  if (!homeData) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading Home Page configurations...</div>;
  }

  const hero = homeData.hero || {};
  const clock = homeData.clockPhilosophy || {};
  const whyUs = homeData.whyChooseUs || {};
  const cta = homeData.ctaBanner || {};

  const updateHero = (field, val) => {
    setHomeData({
      ...homeData,
      hero: { ...hero, [field]: val }
    });
  };

  const updateClock = (field, val) => {
    setHomeData({
      ...homeData,
      clockPhilosophy: { ...clock, [field]: val }
    });
  };

  const updateWhyUs = (field, val) => {
    setHomeData({
      ...homeData,
      whyChooseUs: { ...whyUs, [field]: val }
    });
  };

  const updateCta = (field, val) => {
    setHomeData({
      ...homeData,
      ctaBanner: { ...cta, [field]: val }
    });
  };

  const addTechBadge = () => {
    if (!newBadgeName.trim()) return;
    const current = hero.techBadges || [];
    const updated = [
      ...current,
      { name: newBadgeName.trim(), category: newBadgeCategory.trim() || 'Technology' }
    ];
    updateHero('techBadges', updated);
    setNewBadgeName('');
    setNewBadgeCategory('');
  };

  const removeTechBadge = (idx) => {
    const current = hero.techBadges || [];
    const updated = current.filter((_, i) => i !== idx);
    updateHero('techBadges', updated);
  };

  return (
    <div>
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Home Page Management</h1>
          <p className="admin-page-sub">
            Directly customize and publish content on the public Home Page (/). Every modification updates the live website in real-time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Open Public Website"
          >
            <span>Preview Live Site</span>
            <ExternalLink size={15} />
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="admin-btn admin-btn-primary"
          >
            <Save size={16} />
            <span>{saving ? 'Publishing...' : 'Save & Publish to Live'}</span>
          </button>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="admin-tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`admin-tab ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          <Sparkles size={16} />
          <span>1. Hero Headline & CTAs</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'clock' ? 'active' : ''}`}
          onClick={() => setActiveTab('clock')}
        >
          <Clock size={16} />
          <span>2. Clock Philosophy</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'why' ? 'active' : ''}`}
          onClick={() => setActiveTab('why')}
        >
          <ShieldCheck size={16} />
          <span>3. Why Choose Us & Metrics</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'cta' ? 'active' : ''}`}
          onClick={() => setActiveTab('cta')}
        >
          <Megaphone size={16} />
          <span>4. Bottom CTA Banner</span>
        </button>
      </div>

      {/* TAB 1: HERO SECTION */}
      {activeTab === 'hero' && (
        <div>
          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
              Hero Top Badge & Headline
            </h3>

            <div className="admin-form-group">
              <label className="admin-label">Top Pill Badge Text</label>
              <input
                type="text"
                className="admin-input"
                value={hero.badge || ''}
                onChange={(e) => updateHero('badge', e.target.value)}
              />
              <span className="admin-hint">
                e.g. 10+ Years of Proven IT Excellence • Indore, India
              </span>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Headline Prefix</label>
                <input
                  type="text"
                  className="admin-input"
                  value={hero.prefix || ''}
                  onChange={(e) => updateHero('prefix', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Headline Break Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={hero.break_text || ''}
                  onChange={(e) => updateHero('break_text', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Highlighted Brand Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={hero.brand_highlight || ''}
                  onChange={(e) => updateHero('brand_highlight', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Headline Suffix</label>
                <input
                  type="text"
                  className="admin-input"
                  value={hero.suffix || ''}
                  onChange={(e) => updateHero('suffix', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Hero Main Description / Consultation Lead</label>
              <textarea
                className="admin-textarea"
                rows="4"
                value={hero.description || ''}
                onChange={(e) => updateHero('description', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
              Call to Action Buttons
            </h3>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Primary Button Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={hero.cta_primary_text || ''}
                  onChange={(e) => updateHero('cta_primary_text', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Secondary Button Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={hero.cta_secondary_text || ''}
                  onChange={(e) => updateHero('cta_secondary_text', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
              Core Technology Stack Marquee Badges
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {(hero.techBadges || []).map((badge, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 107, 0, 0.1)',
                    border: '1px solid rgba(255, 107, 0, 0.3)',
                    borderRadius: '8px',
                    padding: '0.4rem 0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem'
                  }}
                >
                  <strong style={{ color: '#fff' }}>{badge.name}</strong>
                  <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>({badge.category})</span>
                  <button
                    type="button"
                    onClick={() => removeTechBadge(idx)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}
                    title="Remove Badge"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            <div className="admin-grid-2" style={{ alignItems: 'flex-end' }}>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-label">Tech Name</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Next.js, Docker, AI"
                  value={newBadgeName}
                  onChange={(e) => setNewBadgeName(e.target.value)}
                />
              </div>
              <div className="admin-form-group" style={{ marginBottom: 0, display: 'flex', gap: '0.6rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="admin-label">Category</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Cloud, Mobile, AI"
                    value={newBadgeCategory}
                    onChange={(e) => setNewBadgeCategory(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={addTechBadge}
                  className="admin-btn admin-btn-secondary"
                  style={{ alignSelf: 'flex-end', height: '42px' }}
                >
                  <Plus size={15} />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLOCK PHILOSOPHY */}
      {activeTab === 'clock' && (
        <div>
          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
              Clock Philosophy Headline & Narrative
            </h3>

            <div className="admin-form-group">
              <label className="admin-label">Eyebrow Tag</label>
              <input
                type="text"
                className="admin-input"
                value={clock.eyebrow || ''}
                onChange={(e) => updateClock('eyebrow', e.target.value)}
              />
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Title Prefix</label>
                <input
                  type="text"
                  className="admin-input"
                  value={clock.titlePrefix || ''}
                  onChange={(e) => updateClock('titlePrefix', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Title Highlight (Gold text)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={clock.titleHighlight || ''}
                  onChange={(e) => updateClock('titleHighlight', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Hero Description</label>
              <textarea
                className="admin-textarea"
                rows="3"
                value={clock.description || ''}
                onChange={(e) => updateClock('description', e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Pillar 01 Title</label>
              <input
                type="text"
                className="admin-input"
                value={clock.pillarTitle || ''}
                onChange={(e) => updateClock('pillarTitle', e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Pillar Leadership Quote</label>
              <textarea
                className="admin-textarea"
                rows="2"
                value={clock.quoteText || ''}
                onChange={(e) => updateClock('quoteText', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WHY CHOOSE US & METRICS */}
      {activeTab === 'why' && (
        <div>
          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
              Section Header & Vision Quote
            </h3>

            <div className="admin-form-group">
              <label className="admin-label">Badge Label</label>
              <input
                type="text"
                className="admin-input"
                value={whyUs.badge || ''}
                onChange={(e) => updateWhyUs('badge', e.target.value)}
              />
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Title Prefix</label>
                <input
                  type="text"
                  className="admin-input"
                  value={whyUs.titlePrefix || ''}
                  onChange={(e) => updateWhyUs('titlePrefix', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Title Highlight</label>
                <input
                  type="text"
                  className="admin-input"
                  value={whyUs.titleHighlight || ''}
                  onChange={(e) => updateWhyUs('titleHighlight', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Vision Statement Quote</label>
              <textarea
                className="admin-textarea"
                rows="2"
                value={whyUs.visionQuote || ''}
                onChange={(e) => updateWhyUs('visionQuote', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
              Impact Statistics Counters
            </h3>

            <div className="admin-grid-3">
              <div className="admin-form-group">
                <label className="admin-label">Happy Clients Count</label>
                <input
                  type="text"
                  className="admin-input"
                  value={whyUs.clientsCount || ''}
                  onChange={(e) => updateWhyUs('clientsCount', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Projects Delivered Count</label>
                <input
                  type="text"
                  className="admin-input"
                  value={whyUs.projectsCount || ''}
                  onChange={(e) => updateWhyUs('projectsCount', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Years of IT Leadership</label>
                <input
                  type="text"
                  className="admin-input"
                  value={whyUs.experienceYears || ''}
                  onChange={(e) => updateWhyUs('experienceYears', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BOTTOM CTA BANNER */}
      {activeTab === 'cta' && (
        <div>
          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
              Action Conversion Banner
            </h3>

            <div className="admin-form-group">
              <label className="admin-label">Badge Label</label>
              <input
                type="text"
                className="admin-input"
                value={cta.badge || ''}
                onChange={(e) => updateCta('badge', e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Banner Title</label>
              <input
                type="text"
                className="admin-input"
                value={cta.title || ''}
                onChange={(e) => updateCta('title', e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Banner Subtitle / Pitch</label>
              <textarea
                className="admin-textarea"
                rows="3"
                value={cta.subtitle || ''}
                onChange={(e) => updateCta('subtitle', e.target.value)}
              />
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Primary Button Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={cta.primaryBtnText || ''}
                  onChange={(e) => updateCta('primaryBtnText', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Secondary Button Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={cta.secondaryBtnText || ''}
                  onChange={(e) => updateCta('secondaryBtnText', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Save Action Bar */}
      <div
        style={{
          position: 'sticky',
          bottom: '1.5rem',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--admin-border)',
          borderRadius: '12px',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '2rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
        }}
      >
        <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
          Unsaved changes will be written directly to the database file on disk upon saving.
        </span>

        <button
          onClick={handleSave}
          disabled={saving}
          className="admin-btn admin-btn-primary"
        >
          <Save size={16} />
          <span>{saving ? 'Publishing...' : 'Save & Publish Changes'}</span>
        </button>
      </div>
    </div>
  );
}
