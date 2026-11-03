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
  Megaphone,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  FileText,
  X
} from 'lucide-react';
import { getHomePage, updateHomePage } from '@backend/dataService';
import MediaPickerModal from '../components/MediaPickerModal';

const DEFAULT_TECH_BADGES = [
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'AI & Data' },
  { name: 'Next.js', category: 'Full Stack' },
  { name: 'iOS / Swift', category: 'Native' },
  { name: 'Android / Kotlin', category: 'Native' },
  { name: 'AWS Cloud', category: 'DevOps' },
  { name: 'Custom CRM', category: 'Enterprise' },
  { name: 'MLM Engines', category: 'FinTech' }
];

const DEFAULT_CLOCK_PARAGRAPHS = [
  'In Indian tradition, Shubh Muhurat & Brahma Muhurta symbolizes the peak window of mental clarity, creative power, and spiritual resolve when the groundwork for monumental achievements is laid.',
  'Inspired by this timeless philosophy, our Black Grapes delivery model represents the conviction that every milestone project deserves undivided focus, zero technical shortcuts, and absolute punctuality.',
  'Whether launching a complex ERP system, validating property for a ₹50-crore bank facility, or securing municipal Naksha Pass approvals, we make every second of execution count.'
];

const DEFAULT_MANTRA_PILLS = [
  'BEGIN WITH PURPOSE',
  'ENGINEER WITH RIGOR',
  'DELIVER ON TIME'
];

export default function HomePageManager() {
  const [homeData, setHomeData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState('hero');

  // New badge input state
  const [newBadgeName, setNewBadgeName] = useState('');
  const [newBadgeCategory, setNewBadgeCategory] = useState('');

  // Clock Philosophy helper state
  const [newMantraPill, setNewMantraPill] = useState('');
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

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

  // Clock Philosophy dynamic helpers
  const clockParagraphs = Array.isArray(clock.pillarParagraphs) && clock.pillarParagraphs.length > 0
    ? clock.pillarParagraphs
    : DEFAULT_CLOCK_PARAGRAPHS;

  const clockMantraPills = Array.isArray(clock.mantraPills) && clock.mantraPills.length > 0
    ? clock.mantraPills
    : DEFAULT_MANTRA_PILLS;

  const handleUpdateParagraph = (idx, text) => {
    const list = [...clockParagraphs];
    list[idx] = text;
    updateClock('pillarParagraphs', list);
  };

  const handleAddParagraph = () => {
    const list = [...clockParagraphs, ''];
    updateClock('pillarParagraphs', list);
  };

  const handleDeleteParagraph = (idx) => {
    if (clockParagraphs.length <= 1) {
      if (!window.confirm('Deleting this will leave 0 paragraphs in this section. Continue?')) {
        return;
      }
    }
    const list = clockParagraphs.filter((_, i) => i !== idx);
    updateClock('pillarParagraphs', list);
  };

  const handleMoveParagraph = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= clockParagraphs.length) return;
    const list = [...clockParagraphs];
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;
    updateClock('pillarParagraphs', list);
  };

  const handleAddMantraPill = () => {
    if (!newMantraPill.trim()) return;
    const list = [...clockMantraPills, newMantraPill.trim()];
    updateClock('mantraPills', list);
    setNewMantraPill('');
  };

  const handleDeleteMantraPill = (idx) => {
    const list = clockMantraPills.filter((_, i) => i !== idx);
    updateClock('mantraPills', list);
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
            href={typeof window !== 'undefined' && window.location.port === '5174' ? 'http://localhost:5173/#brand-philosophy' : '/#brand-philosophy'}
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
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem' }}>
              Core Technology Stack Marquee Badges
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '1rem', columnGap: '0.65rem', marginBottom: '1.5rem', marginTop: '0.5rem' }}>
              {((hero.techBadges && hero.techBadges.length > 0) ? hero.techBadges : DEFAULT_TECH_BADGES).map((badge, idx) => (
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
          {/* Card 1: Top Hero Headline & Narrative */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Clock size={20} color="var(--admin-orange)" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Clock Philosophy — Top Headline & Narrative
              </h3>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Eyebrow Tag</label>
              <input
                type="text"
                className="admin-input"
                value={clock.eyebrow || ''}
                onChange={(e) => updateClock('eyebrow', e.target.value)}
                placeholder="e.g. BLACK GRAPES PHILOSOPHY • PURPOSEFUL BEGINNINGS"
              />
              <span className="admin-hint">Top pill badge displayed in the section header</span>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Title Prefix</label>
                <input
                  type="text"
                  className="admin-input"
                  value={clock.titlePrefix || ''}
                  onChange={(e) => updateClock('titlePrefix', e.target.value)}
                  placeholder="e.g. MORE THAN A SERVICE. "
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Title Highlight (Gold text)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={clock.titleHighlight || ''}
                  onChange={(e) => updateClock('titleHighlight', e.target.value)}
                  placeholder="e.g. A COMMITMENT TO TIME & SCALE."
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
                placeholder="Narrative lead description explaining the philosophy..."
              />
            </div>

            {/* Mantra Badges / Pills */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--admin-border)' }}>
              <label className="admin-label" style={{ marginBottom: '0.6rem' }}>
                Mantra Core Highlights (Pills)
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {clockMantraPills.map((pill, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255, 107, 0, 0.12)',
                      border: '1px solid rgba(255, 107, 0, 0.35)',
                      borderRadius: '999px',
                      padding: '0.35rem 0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.8rem',
                      color: '#fff',
                      fontWeight: 600
                    }}
                  >
                    <span>{pill}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteMantraPill(idx)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0, display: 'flex' }}
                      title="Remove Pill"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', maxWidth: '480px' }}>
                <input
                  type="text"
                  className="admin-input"
                  style={{ height: '38px', fontSize: '0.85rem' }}
                  placeholder="e.g. DELIVER ON TIME"
                  value={newMantraPill}
                  onChange={(e) => setNewMantraPill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddMantraPill();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddMantraPill}
                  className="admin-btn admin-btn-secondary"
                  style={{ height: '38px', padding: '0 1rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                >
                  <Plus size={14} />
                  <span>Add Pill</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Pillar 01 Card - The Timeless Principle & Dynamic Paragraphs */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Layers size={20} color="var(--admin-orange)" />
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                    Pillar Card Content & Narrative Paragraphs
                  </h3>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>
                    Main philosophy card containing the principle headline, leadership quote, and dynamic paragraphs.
                  </p>
                </div>
              </div>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Pillar Eyebrow / Number Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  value={clock.pillarBadge || ''}
                  placeholder="01 / THE TIMELESS PRINCIPLE"
                  onChange={(e) => updateClock('pillarBadge', e.target.value)}
                />
                <span className="admin-hint">Badge text at the top of the card (e.g. 01 / THE TIMELESS PRINCIPLE)</span>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Pillar Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={clock.pillarTitle || ''}
                  placeholder="A MOMENT OF PURPOSE. A BEGINNING OF POSSIBILITIES."
                  onChange={(e) => updateClock('pillarTitle', e.target.value)}
                />
                <span className="admin-hint">Main principle heading</span>
              </div>
            </div>

            {/* Dynamic Paragraphs Section */}
            <div style={{ marginTop: '1rem', marginBottom: '1.5rem', background: 'rgba(0, 0, 0, 0.25)', border: '1px solid var(--admin-border)', borderRadius: '10px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h4 style={{ margin: 0, color: '#fff', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={16} color="var(--admin-orange)" />
                    <span>Dynamic Philosophy Paragraphs ({clockParagraphs.length})</span>
                  </h4>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#9ca3af' }}>
                    Add, edit, reorder, or delete the narrative paragraphs displayed in this section.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddParagraph}
                  className="admin-btn admin-btn-secondary"
                  style={{ height: '36px', fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                >
                  <Plus size={14} />
                  <span>Add New Paragraph</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {clockParagraphs.map((paraText, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '0.85rem',
                      transition: 'border-color 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--admin-orange)', letterSpacing: '0.5px' }}>
                        Paragraph #{idx + 1}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <button
                          type="button"
                          onClick={() => handleMoveParagraph(idx, -1)}
                          disabled={idx === 0}
                          className="admin-action-btn"
                          title="Move paragraph up"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--admin-border)',
                            borderRadius: '4px',
                            color: idx === 0 ? '#4b5563' : '#d1d5db',
                            cursor: idx === 0 ? 'not-allowed' : 'pointer',
                            padding: '0.25rem 0.45rem',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <ArrowUp size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveParagraph(idx, 1)}
                          disabled={idx === clockParagraphs.length - 1}
                          className="admin-action-btn"
                          title="Move paragraph down"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--admin-border)',
                            borderRadius: '4px',
                            color: idx === clockParagraphs.length - 1 ? '#4b5563' : '#d1d5db',
                            cursor: idx === clockParagraphs.length - 1 ? 'not-allowed' : 'pointer',
                            padding: '0.25rem 0.45rem',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <ArrowDown size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteParagraph(idx)}
                          className="admin-action-btn danger"
                          title="Delete paragraph"
                          style={{
                            background: 'rgba(239, 68, 68, 0.12)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '4px',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '0.25rem 0.45rem',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <textarea
                      className="admin-textarea"
                      rows={3}
                      style={{ fontSize: '0.875rem', lineHeight: '1.5' }}
                      value={paraText}
                      placeholder={`Enter text for paragraph #${idx + 1}...`}
                      onChange={(e) => handleUpdateParagraph(idx, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Pillar Leadership Quote</label>
              <textarea
                className="admin-textarea"
                rows="2"
                value={clock.quoteText || ''}
                placeholder="Every great vision deserves its defining moment..."
                onChange={(e) => updateClock('quoteText', e.target.value)}
              />
              <span className="admin-hint">Highlighted quotation box inside the pillar card</span>
            </div>
          </div>

          {/* Card 3: Luxury Visual Emblem (Right Column Artwork) */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <ImageIcon size={20} color="var(--admin-orange)" />
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                  Luxury Visual Emblem (Right Graphic & Badges)
                </h3>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>
                  The right-side glowing luxury circular visualizer artwork and badge labels.
                </p>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Emblem Image Source URL</label>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <input
                  type="text"
                  className="admin-input"
                  value={clock.emblemImage || '/images/black_grapes_emblem.jpg'}
                  onChange={(e) => updateClock('emblemImage', e.target.value)}
                  placeholder="/images/black_grapes_emblem.jpg"
                />
                <button
                  type="button"
                  onClick={() => setMediaPickerOpen(true)}
                  className="admin-btn admin-btn-secondary"
                  style={{ height: '42px', whiteSpace: 'nowrap', fontSize: '0.85rem' }}
                >
                  <ImageIcon size={14} />
                  <span>Choose Media</span>
                </button>
              </div>
              <span className="admin-hint">Default: /images/black_grapes_emblem.jpg or select from Media Library</span>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Emblem Badge Brand Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={clock.emblemTitle || 'BLACK GRAPES'}
                  onChange={(e) => updateClock('emblemTitle', e.target.value)}
                  placeholder="BLACK GRAPES"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Emblem Badge Subtitle / Tagline</label>
                <input
                  type="text"
                  className="admin-input"
                  value={clock.emblemSubtitle || 'PRECISION • INNOVATION • SCALE'}
                  onChange={(e) => updateClock('emblemSubtitle', e.target.value)}
                  placeholder="PRECISION • INNOVATION • SCALE"
                />
              </div>
            </div>

            {/* Preview of visual card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', padding: '0.75rem', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
              <img
                src={clock.emblemImage || '/images/black_grapes_emblem.jpg'}
                alt="Emblem Preview"
                style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '50%', border: '1px solid var(--admin-orange)' }}
                onError={(e) => { e.target.src = '/images/black_grapes_emblem.jpg'; }}
              />
              <div>
                <strong style={{ color: '#fff', fontSize: '0.9rem', display: 'block' }}>{clock.emblemTitle || 'BLACK GRAPES'}</strong>
                <span style={{ color: 'var(--admin-orange)', fontSize: '0.75rem', letterSpacing: '1px' }}>{clock.emblemSubtitle || 'PRECISION • INNOVATION • SCALE'}</span>
              </div>
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

      {/* Media Picker Modal for Emblem Image */}
      {mediaPickerOpen && (
        <MediaPickerModal
          isOpen={mediaPickerOpen}
          onClose={() => setMediaPickerOpen(false)}
          onSelectMedia={(item) => {
            if (item && item.url) {
              updateClock('emblemImage', item.url);
            }
            setMediaPickerOpen(false);
          }}
          mediaType="image"
        />
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
