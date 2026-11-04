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
  HelpCircle,
  Award,
  X,
  Briefcase,
  MessageSquareQuote
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
  const [activeTab, setActiveTab] = useState('testimonials');

  // New badge input state
  const [newBadgeName, setNewBadgeName] = useState('');
  const [newBadgeCategory, setNewBadgeCategory] = useState('');

  // Clock Philosophy helper state
  const [newMantraPill, setNewMantraPill] = useState('');
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [serviceImagePickerIdx, setServiceImagePickerIdx] = useState(null);
  const [aboutImageField, setAboutImageField] = useState(null);

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
  const servicesSec = homeData.servicesSection || {};
  const about = homeData.aboutSection || {};
  const projectsSec = homeData.projectsSection || {};
  const testimonialsSec = homeData.testimonialsSection || {};
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

  const updateServicesSection = (field, val) => {
    setHomeData({
      ...homeData,
      servicesSection: { ...servicesSec, [field]: val }
    });
  };

  const updateAbout = (field, val) => {
    setHomeData({
      ...homeData,
      aboutSection: { ...about, [field]: val }
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

  // Services dynamic helpers
  const servicesList = Array.isArray(servicesSec.services) ? servicesSec.services : [];

  const handleUpdateService = (idx, field, val) => {
    const list = [...servicesList];
    list[idx] = { ...list[idx], [field]: val };
    updateServicesSection('services', list);
  };

  const handleAddService = () => {
    const newService = {
      id: `service-${Date.now()}`,
      title: 'New Specialized IT Service',
      shortDesc: 'Comprehensive description of deliverables, architecture, and technology stack for this service.',
      image: '/images/software-development-qgntl744xv0yqgpkq1174ayad7qp2f62p90f8mobkw.jpeg',
      tags: ['Custom Engineering', 'Cloud', 'Enterprise']
    };
    const list = [...servicesList, newService];
    updateServicesSection('services', list);
  };

  const handleDeleteService = (idx) => {
    if (!window.confirm(`Are you sure you want to delete "${servicesList[idx]?.title || 'this service'}"?`)) {
      return;
    }
    const list = servicesList.filter((_, i) => i !== idx);
    updateServicesSection('services', list);
  };

  const handleMoveService = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= servicesList.length) return;
    const list = [...servicesList];
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;
    updateServicesSection('services', list);
  };

  const tendering = servicesSec.tendering || {};
  const updateTendering = (field, val) => {
    updateServicesSection('tendering', { ...tendering, [field]: val });
  };

  // About Company dynamic helpers
  const coreValuesList = Array.isArray(about.coreValues) ? about.coreValues : [];

  const handleUpdateCoreValue = (idx, field, val) => {
    const list = [...coreValuesList];
    list[idx] = { ...list[idx], [field]: val };
    updateAbout('coreValues', list);
  };

  const handleAddCoreValue = () => {
    const newValue = {
      title: 'New Innovation Pillar',
      desc: 'Description detailing this engineering standard, client collaboration methodology, or architecture pillar.'
    };
    updateAbout('coreValues', [...coreValuesList, newValue]);
  };

  const handleDeleteCoreValue = (idx) => {
    if (!window.confirm(`Are you sure you want to delete "${coreValuesList[idx]?.title || 'this tab'}"?`)) {
      return;
    }
    const list = coreValuesList.filter((_, i) => i !== idx);
    updateAbout('coreValues', list);
  };

  const handleMoveCoreValue = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= coreValuesList.length) return;
    const list = [...coreValuesList];
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;
    updateAbout('coreValues', list);
  };

  const qaItemsList = Array.isArray(about.qaItems) ? about.qaItems : [];

  const handleUpdateQaItem = (idx, field, val) => {
    const list = [...qaItemsList];
    list[idx] = { ...list[idx], [field]: val };
    updateAbout('qaItems', list);
  };

  const handleAddQaItem = () => {
    const newItem = {
      q: 'Frequently asked strategic consultation question?',
      a: 'In-depth answer outlining our enterprise lifecycle, deliverables, and technical ROI.'
    };
    updateAbout('qaItems', [...qaItemsList, newItem]);
  };

  const handleDeleteQaItem = (idx) => {
    if (!window.confirm(`Are you sure you want to delete question #${idx + 1}?`)) {
      return;
    }
    const list = qaItemsList.filter((_, i) => i !== idx);
    updateAbout('qaItems', list);
  };

  const handleMoveQaItem = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= qaItemsList.length) return;
    const list = [...qaItemsList];
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;
    updateAbout('qaItems', list);
  };

  // Projects & Portfolio Showcase Handlers
  const updateProjectsSec = (field, val) => {
    setHomeData((prev) => ({
      ...prev,
      projectsSection: {
        ...(prev.projectsSection || {}),
        [field]: val
      }
    }));
  };

  const projectList = Array.isArray(projectsSec.projects)
    ? projectsSec.projects
    : [];

  const handleAddProject = () => {
    const newProj = {
      name: 'New Project Domain / Name',
      category: 'Website',
      type: 'Custom Digital & Software Solution',
      desc: 'High-performance digital platform engineered for scale, engagement, and rock-solid enterprise reliability.',
      url: 'https://',
      status: 'Live Production'
    };
    updateProjectsSec('projects', [newProj, ...projectList]);
  };

  const handleUpdateProject = (index, field, value) => {
    const updated = [...projectList];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    updateProjectsSec('projects', updated);
  };

  const handleDeleteProject = (index) => {
    const proj = projectList[index];
    const name = proj?.name || `Project #${index + 1}`;
    if (!window.confirm(`Are you sure you want to remove "${name}" from portfolio showcase?`)) {
      return;
    }
    const updated = projectList.filter((_, i) => i !== index);
    updateProjectsSec('projects', updated);
  };

  const handleMoveProject = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= projectList.length) return;
    const list = [...projectList];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    updateProjectsSec('projects', list);
  };

  const updateProjectBottomCta = (field, val) => {
    updateProjectsSec('bottomCta', {
      ...(projectsSec.bottomCta || {}),
      [field]: val
    });
  };

  // Testimonials Section Handlers
  const updateTestimonialsSec = (field, val) => {
    setHomeData((prev) => ({
      ...prev,
      testimonialsSection: {
        ...(prev.testimonialsSection || {}),
        [field]: val
      }
    }));
  };

  const testimonialList = Array.isArray(testimonialsSec.testimonials)
    ? testimonialsSec.testimonials
    : [];

  const handleAddTestimonial = () => {
    const newTestimonial = {
      name: 'Client Name / Executive',
      role: 'Enterprise Client / Founder',
      rating: 5,
      ratingScore: '5.0 / 5.0 Rating',
      verifiedBadge: '✓ Verified Client',
      quote: 'Exceptional digital engineering delivery from Black Grapes Softech. Their team transformed our business processes with speed, agility, and world-class technical precision.',
      avatar: 'CL'
    };
    updateTestimonialsSec('testimonials', [newTestimonial, ...testimonialList]);
  };

  const handleUpdateTestimonial = (index, field, value) => {
    const updated = [...testimonialList];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    updateTestimonialsSec('testimonials', updated);
  };

  const handleDeleteTestimonial = (index) => {
    const item = testimonialList[index];
    const name = item?.name || `Review #${index + 1}`;
    if (!window.confirm(`Are you sure you want to delete testimonial from "${name}"?`)) {
      return;
    }
    const updated = testimonialList.filter((_, i) => i !== index);
    updateTestimonialsSec('testimonials', updated);
  };

  const handleMoveTestimonial = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= testimonialList.length) return;
    const list = [...testimonialList];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    updateTestimonialsSec('testimonials', list);
  };

  const handleMediaSelected = (item) => {
    if (item && item.url) {
      if (aboutImageField) {
        updateAbout(aboutImageField, item.url);
        setAboutImageField(null);
      } else if (serviceImagePickerIdx !== null) {
        handleUpdateService(serviceImagePickerIdx, 'image', item.url);
        setServiceImagePickerIdx(null);
      } else {
        updateClock('emblemImage', item.url);
      }
    }
    setMediaPickerOpen(false);
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
            href={typeof window !== 'undefined' && window.location.port === '5174' 
              ? `http://localhost:5173/#${activeTab === 'testimonials' ? 'testimonials' : activeTab === 'projects' ? 'projects' : activeTab === 'services' ? 'services' : activeTab === 'clock' ? 'clock-philosophy' : activeTab === 'about' ? 'about' : activeTab === 'why' ? 'why-us' : ''}` 
              : `/#${activeTab === 'testimonials' ? 'testimonials' : activeTab === 'projects' ? 'projects' : activeTab === 'services' ? 'services' : activeTab === 'clock' ? 'clock-philosophy' : activeTab === 'about' ? 'about' : activeTab === 'why' ? 'why-us' : ''}`}
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
      <div className="admin-tabs" style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
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
          className={`admin-tab ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          <Layers size={16} />
          <span>3. Services & Products (What We Do)</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <Award size={16} />
          <span>4. About Company</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <Briefcase size={16} />
          <span>5. Projects & Portfolio Showcase</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'testimonials' ? 'active' : ''}`}
          onClick={() => setActiveTab('testimonials')}
        >
          <MessageSquareQuote size={16} />
          <span>6. Client Testimonials & Reviews</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'why' ? 'active' : ''}`}
          onClick={() => setActiveTab('why')}
        >
          <ShieldCheck size={16} />
          <span>7. Why Choose Us & Metrics</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'cta' ? 'active' : ''}`}
          onClick={() => setActiveTab('cta')}
        >
          <Megaphone size={16} />
          <span>8. Bottom CTA Banner</span>
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
                  onClick={() => {
                    setServiceImagePickerIdx(null);
                    setAboutImageField(null);
                    setMediaPickerOpen(true);
                  }}
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

      {/* TAB 3: SERVICES & PRODUCTS (WHAT WE DO) */}
      {activeTab === 'services' && (
        <div>
          {/* Card 1: Header & Subtitle */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Layers size={20} color="var(--admin-orange)" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Services Section Header & Narrative
              </h3>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Top Eyebrow Badge</label>
              <input
                type="text"
                className="admin-input"
                value={servicesSec.badge || ''}
                placeholder="WHAT WE DO"
                onChange={(e) => updateServicesSection('badge', e.target.value)}
              />
              <span className="admin-hint">e.g. WHAT WE DO</span>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Main Title Prefix</label>
                <input
                  type="text"
                  className="admin-input"
                  value={servicesSec.titlePrefix || ''}
                  placeholder="We Provide Best Quality Services & Products At "
                  onChange={(e) => updateServicesSection('titlePrefix', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Main Title Highlight (Gradient Color)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={servicesSec.titleHighlight || ''}
                  placeholder="Affordable Price"
                  onChange={(e) => updateServicesSection('titleHighlight', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Section Subtitle / Description</label>
              <textarea
                className="admin-textarea"
                rows="2"
                value={servicesSec.subtitle || ''}
                placeholder="Here is the list of specialized IT services and scalable digital solutions that we provide to elevate your business."
                onChange={(e) => updateServicesSection('subtitle', e.target.value)}
              />
            </div>
          </div>

          {/* Card 2: Dynamic Services Grid Cards */}
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                  Services & Digital Solutions List ({servicesList.length})
                </h3>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>
                  Manage the cards displayed on the homepage. Add, edit titles, descriptions, images, tags, reorder, or delete cards.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddService}
                className="admin-btn admin-btn-primary"
                style={{ height: '38px', fontSize: '0.85rem' }}
              >
                <Plus size={15} />
                <span>Add New Service</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {servicesList.map((service, idx) => {
                const tagsStr = Array.isArray(service.tags) ? service.tags.join(', ') : (service.tags || '');
                return (
                  <div
                    key={service.id || idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--admin-border)',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      transition: 'border-color 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{
                          background: 'rgba(255, 107, 0, 0.15)',
                          color: 'var(--admin-orange)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 800
                        }}>
                          #{String(idx + 1).padStart(2, '0')}
                        </span>
                        <strong style={{ color: '#fff', fontSize: '0.95rem' }}>
                          {service.title || 'Untitled Service'}
                        </strong>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <button
                          type="button"
                          onClick={() => handleMoveService(idx, -1)}
                          disabled={idx === 0}
                          className="admin-action-btn"
                          title="Move up"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--admin-border)',
                            borderRadius: '4px',
                            color: idx === 0 ? '#4b5563' : '#d1d5db',
                            cursor: idx === 0 ? 'not-allowed' : 'pointer',
                            padding: '0.3rem 0.5rem',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveService(idx, 1)}
                          disabled={idx === servicesList.length - 1}
                          className="admin-action-btn"
                          title="Move down"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--admin-border)',
                            borderRadius: '4px',
                            color: idx === servicesList.length - 1 ? '#4b5563' : '#d1d5db',
                            cursor: idx === servicesList.length - 1 ? 'not-allowed' : 'pointer',
                            padding: '0.3rem 0.5rem',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteService(idx)}
                          className="admin-action-btn danger"
                          title="Delete service"
                          style={{
                            background: 'rgba(239, 68, 68, 0.12)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '4px',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '0.3rem 0.5rem',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="admin-grid-2">
                      <div className="admin-form-group">
                        <label className="admin-label">Service Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={service.title || ''}
                          onChange={(e) => handleUpdateService(idx, 'title', e.target.value)}
                          placeholder="e.g. Website Designing and Development"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Card Image URL</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <input
                            type="text"
                            className="admin-input"
                            value={service.image || ''}
                            onChange={(e) => handleUpdateService(idx, 'image', e.target.value)}
                            placeholder="/images/Website-Designing.jpg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setServiceImagePickerIdx(idx);
                              setAboutImageField(null);
                              setMediaPickerOpen(true);
                            }}
                            className="admin-btn admin-btn-secondary"
                            style={{ height: '42px', whiteSpace: 'nowrap', padding: '0 0.8rem', fontSize: '0.8rem' }}
                            title="Choose from Media Library"
                          >
                            <ImageIcon size={14} />
                            <span>Media</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">Short Description</label>
                      <textarea
                        className="admin-textarea"
                        rows="2"
                        value={service.shortDesc || ''}
                        onChange={(e) => handleUpdateService(idx, 'shortDesc', e.target.value)}
                        placeholder="Brief summary of service for the card..."
                      />
                    </div>

                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                      <label className="admin-label">Technology & Capability Tags (comma separated)</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={tagsStr}
                        onChange={(e) => handleUpdateService(idx, 'tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        placeholder="e.g. React, Next.js, SEO Optimized, Responsive UI, Custom CMS"
                      />
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                        {(Array.isArray(service.tags) ? service.tags : []).map((t, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '4px',
                              padding: '0.15rem 0.5rem',
                              fontSize: '0.72rem',
                              color: '#9ca3af'
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 3: Government & Private Tenders Callout Card */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <ShieldCheck size={20} color="var(--admin-orange)" />
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                  Government & Private Tenders Banner
                </h3>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>
                  The bottom callout card featured below the service grid on the homepage.
                </p>
              </div>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Tender Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  value={tendering.badge || ''}
                  placeholder="GOVERNMENT & PRIVATE TENDERS"
                  onChange={(e) => updateTendering('badge', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Action Button Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={tendering.btnText || ''}
                  placeholder="Consult Tender Experts"
                  onChange={(e) => updateTendering('btnText', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Tender Banner Title</label>
              <input
                type="text"
                className="admin-input"
                value={tendering.title || ''}
                placeholder="Specialized Tendering & e-Procurement Technical Services"
                onChange={(e) => updateTendering('title', e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Tender Banner Description</label>
              <textarea
                className="admin-textarea"
                rows="2"
                value={tendering.desc || ''}
                placeholder="Black Grapes Softech provides end-to-end technical documentation..."
                onChange={(e) => updateTendering('desc', e.target.value)}
              />
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label className="admin-label">Compliance Highlights / Check Pills (comma separated)</label>
              <input
                type="text"
                className="admin-input"
                value={Array.isArray(tendering.pills) ? tendering.pills.join(', ') : (tendering.pills || '')}
                placeholder="✓ GeM Portal Compliance, ✓ Technical RFP Preparation, ✓ Enterprise Security Certification"
                onChange={(e) => updateTendering('pills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              />
              <span className="admin-hint">Comma separated pills, e.g. ✓ GeM Portal Compliance, ✓ Technical RFP Preparation</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ABOUT COMPANY */}
      {activeTab === 'about' && (
        <div>
          {/* Card 1: Section Header & Narrative Lead */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Award size={20} color="var(--admin-orange)" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                About Company Section Header & Narrative
              </h3>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Section Eyebrow Badge</label>
              <input
                type="text"
                className="admin-input"
                value={about.badge || ''}
                placeholder="ABOUT COMPANY"
                onChange={(e) => updateAbout('badge', e.target.value)}
              />
              <span className="admin-hint">e.g. ABOUT COMPANY</span>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Main Header Title (Use | for separators)</label>
              <input
                type="text"
                className="admin-input"
                value={about.mainTitle || ''}
                placeholder="Best Website Development Company | Best IT Software Company | Best Mobile App Development Company"
                onChange={(e) => updateAbout('mainTitle', e.target.value)}
              />
              <span className="admin-hint">The pipe "|" character creates the stylish gradient divider between titles.</span>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Section Subtitle / Meta Tagline</label>
              <textarea
                className="admin-textarea"
                rows="2"
                value={about.subtitle || ''}
                placeholder="Black Grapes Softech – Best Website Development Company..."
                onChange={(e) => updateAbout('subtitle', e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Right Column Narrative Heading</label>
              <input
                type="text"
                className="admin-input"
                value={about.narrativeHeading || ''}
                placeholder="Transforming Your Boldest Visions Into High-Performance Reality"
                onChange={(e) => updateAbout('narrativeHeading', e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Primary Narrative Paragraph</label>
              <textarea
                className="admin-textarea"
                rows="4"
                value={about.primaryParagraph || ''}
                placeholder="Black Grapes Softech is an IT Company extending its services in the field of Software Development..."
                onChange={(e) => updateAbout('primaryParagraph', e.target.value)}
              />
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label className="admin-label">Secondary Narrative Paragraph</label>
              <textarea
                className="admin-textarea"
                rows="4"
                value={about.secondaryParagraph || ''}
                placeholder="Searching a company/agency for best customized IT solutions at affordable price..."
                onChange={(e) => updateAbout('secondaryParagraph', e.target.value)}
              />
            </div>
          </div>

          {/* Card 2: Interactive Core Values Tabs */}
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                  Interactive Core Values Tabs ({coreValuesList.length})
                </h3>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>
                  The 01, 02, 03 tabs displayed on the website right column. Add, update, reorder or delete tabs.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddCoreValue}
                className="admin-btn admin-btn-primary"
                style={{ height: '36px', fontSize: '0.85rem' }}
              >
                <Plus size={15} />
                <span>Add Value Tab</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {coreValuesList.map((valItem, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--admin-border)',
                    borderRadius: '8px',
                    padding: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--admin-orange)', letterSpacing: '0.5px' }}>
                      Tab #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <button
                        type="button"
                        onClick={() => handleMoveCoreValue(idx, -1)}
                        disabled={idx === 0}
                        className="admin-action-btn"
                        title="Move tab up"
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
                        onClick={() => handleMoveCoreValue(idx, 1)}
                        disabled={idx === coreValuesList.length - 1}
                        className="admin-action-btn"
                        title="Move tab down"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--admin-border)',
                          borderRadius: '4px',
                          color: idx === coreValuesList.length - 1 ? '#4b5563' : '#d1d5db',
                          cursor: idx === coreValuesList.length - 1 ? 'not-allowed' : 'pointer',
                          padding: '0.25rem 0.45rem',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <ArrowDown size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCoreValue(idx)}
                        className="admin-action-btn danger"
                        title="Delete tab"
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

                  <div className="admin-form-group" style={{ marginBottom: '0.65rem' }}>
                    <label className="admin-label">Tab Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={valItem.title || ''}
                      placeholder="e.g. Passionate Craftsmanship"
                      onChange={(e) => handleUpdateCoreValue(idx, 'title', e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group" style={{ marginBottom: 0 }}>
                    <label className="admin-label">Tab Description</label>
                    <textarea
                      className="admin-textarea"
                      rows="2"
                      value={valItem.desc || ''}
                      placeholder="Relentless attention to code quality, modern UX patterns..."
                      onChange={(e) => handleUpdateCoreValue(idx, 'desc', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Strategic Consultation Highlights (Q&A Accordion) */}
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HelpCircle size={18} color="var(--admin-orange)" />
                  <span>Strategic Consultation Highlights ({qaItemsList.length})</span>
                </h3>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>
                  The accordion FAQ questions & answers displayed under Strategic Consultation.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddQaItem}
                className="admin-btn admin-btn-primary"
                style={{ height: '36px', fontSize: '0.85rem' }}
              >
                <Plus size={15} />
                <span>Add Q&A Item</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {qaItemsList.map((qa, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--admin-border)',
                    borderRadius: '8px',
                    padding: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--admin-orange)', letterSpacing: '0.5px' }}>
                      Question #{idx + 1}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <button
                        type="button"
                        onClick={() => handleMoveQaItem(idx, -1)}
                        disabled={idx === 0}
                        className="admin-action-btn"
                        title="Move question up"
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
                        onClick={() => handleMoveQaItem(idx, 1)}
                        disabled={idx === qaItemsList.length - 1}
                        className="admin-action-btn"
                        title="Move question down"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--admin-border)',
                          borderRadius: '4px',
                          color: idx === qaItemsList.length - 1 ? '#4b5563' : '#d1d5db',
                          cursor: idx === qaItemsList.length - 1 ? 'not-allowed' : 'pointer',
                          padding: '0.25rem 0.45rem',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <ArrowDown size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteQaItem(idx)}
                        className="admin-action-btn danger"
                        title="Delete question"
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

                  <div className="admin-form-group" style={{ marginBottom: '0.65rem' }}>
                    <label className="admin-label">Question</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={qa.q || ''}
                      placeholder="e.g. The purpose of life coaching & IT strategy?"
                      onChange={(e) => handleUpdateQaItem(idx, 'q', e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group" style={{ marginBottom: 0 }}>
                    <label className="admin-label">Answer Pane Content</label>
                    <textarea
                      className="admin-textarea"
                      rows="2"
                      value={qa.a || ''}
                      placeholder="Strategic alignment between your commercial vision and technical infrastructure..."
                      onChange={(e) => handleUpdateQaItem(idx, 'a', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Left Column Visual Showcase & Tech Architecture Cards */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <ImageIcon size={20} color="var(--admin-orange)" />
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                  Left Column Visual Cards & Infographics
                </h3>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>
                  The graphic artwork cards displayed on the left column of the About Company section.
                </p>
              </div>
            </div>

            {/* Showcase Card 1 */}
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: '0 0 0.75rem' }}>1. Top Grapes Showcase Card</h4>
              
              <div className="admin-form-group">
                <label className="admin-label">Image URL</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="admin-input"
                    value={about.showcaseImage || '/images/blackgrapes-1.png'}
                    onChange={(e) => updateAbout('showcaseImage', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setAboutImageField('showcaseImage');
                      setServiceImagePickerIdx(null);
                      setMediaPickerOpen(true);
                    }}
                    className="admin-btn admin-btn-secondary"
                    style={{ height: '42px', whiteSpace: 'nowrap' }}
                  >
                    <ImageIcon size={14} />
                    <span>Media</span>
                  </button>
                </div>
              </div>

              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label className="admin-label">Experience Badge Number</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={about.experienceYears || '10+ Years'}
                    onChange={(e) => updateAbout('experienceYears', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Experience Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={about.experienceLabel || 'of IT & Software Innovation'}
                    onChange={(e) => updateAbout('experienceLabel', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Floating Pill Badge Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={about.techBadgeText || 'Web • Mobile • Cloud • AI'}
                    onChange={(e) => updateAbout('techBadgeText', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Showcase Card 2 */}
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: '0 0 0.75rem' }}>2. High-Velocity Software Ecosystems Card</h4>

              <div className="admin-form-group">
                <label className="admin-label">Image URL</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="admin-input"
                    value={about.innovationImage || '/images/tech-innovation.jpg'}
                    onChange={(e) => updateAbout('innovationImage', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setAboutImageField('innovationImage');
                      setServiceImagePickerIdx(null);
                      setMediaPickerOpen(true);
                    }}
                    className="admin-btn admin-btn-secondary"
                    style={{ height: '42px', whiteSpace: 'nowrap' }}
                  >
                    <ImageIcon size={14} />
                    <span>Media</span>
                  </button>
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label">Image Tag</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={about.innovationTag || 'AI & CLOUD ARCHITECTURE'}
                    onChange={(e) => updateAbout('innovationTag', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">KPI Pill Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={about.innovationKpi || '⚡ 99.9% Uptime • Global Data Flow'}
                    onChange={(e) => updateAbout('innovationKpi', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label">Card Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={about.innovationTitle || 'High-Velocity Software Ecosystems'}
                    onChange={(e) => updateAbout('innovationTitle', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Card Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={about.innovationBadge || 'Enterprise Ready'}
                    onChange={(e) => updateAbout('innovationBadge', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Card Description</label>
                <textarea
                  className="admin-textarea"
                  rows="2"
                  value={about.innovationDesc || ''}
                  onChange={(e) => updateAbout('innovationDesc', e.target.value)}
                />
              </div>

              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-label">Technology Chips (comma separated)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={Array.isArray(about.innovationChips) ? about.innovationChips.join(', ') : (about.innovationChips || '')}
                  onChange={(e) => updateAbout('innovationChips', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                />
              </div>
            </div>

            {/* Showcase Card 3 */}
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1rem' }}>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: '0 0 0.75rem' }}>3. Lifecycle Engineering Sub-Card</h4>

              <div className="admin-form-group">
                <label className="admin-label">Card Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={about.lifecycleTitle || 'Full Lifecycle Engineering'}
                  onChange={(e) => updateAbout('lifecycleTitle', e.target.value)}
                />
              </div>

              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-label">Card Description</label>
                <textarea
                  className="admin-textarea"
                  rows="2"
                  value={about.lifecycleDesc || ''}
                  onChange={(e) => updateAbout('lifecycleDesc', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PROJECTS & PORTFOLIO SHOWCASE */}
      {activeTab === 'projects' && (
        <div>
          {/* Card 1: Section Header */}
          <div className="admin-card">
            <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={20} color="var(--admin-orange)" />
              <span>Portfolio Section Header & Subtitle</span>
            </h3>

            <div className="admin-grid-3">
              <div className="admin-form-group">
                <label className="admin-label">Eyebrow Badge Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={projectsSec.badge || 'PORTFOLIO SHOWCASE'}
                  onChange={(e) => updateProjectsSec('badge', e.target.value)}
                  placeholder="e.g. PORTFOLIO SHOWCASE"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Title Prefix (White text)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={projectsSec.titlePrefix !== undefined ? projectsSec.titlePrefix : 'Our Projects & '}
                  onChange={(e) => updateProjectsSec('titlePrefix', e.target.value)}
                  placeholder="e.g. Our Projects & "
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Title Highlight (Gold/Orange text)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={projectsSec.titleHighlight !== undefined ? projectsSec.titleHighlight : 'Proven Deliveries'}
                  onChange={(e) => updateProjectsSec('titleHighlight', e.target.value)}
                  placeholder="e.g. Proven Deliveries"
                />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label className="admin-label">Section Subtitle / Description</label>
              <textarea
                className="admin-textarea"
                rows="2"
                value={projectsSec.subtitle || ''}
                onChange={(e) => updateProjectsSec('subtitle', e.target.value)}
                placeholder="e.g. Explore a selection of successful client products spanning web applications, iOS/Android apps, and eCommerce engines."
              />
            </div>
          </div>

          {/* Card 2: Dynamic Project Cards Manager */}
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span>Portfolio Showcase Cards</span>
                  <span
                    style={{
                      background: 'rgba(248, 98, 0, 0.2)',
                      color: 'var(--admin-orange)',
                      border: '1px solid rgba(248, 98, 0, 0.35)',
                      padding: '0.15rem 0.55rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {projectList.length} Active Items
                  </span>
                </h3>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.825rem', color: '#9ca3af' }}>
                  Manage the cards displayed in the live Portfolio Showcase grid. Add new projects, edit links, reorder positions, or remove outdated entries.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddProject}
                className="admin-btn admin-btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1.1rem' }}
              >
                <Plus size={16} />
                <span>Add New Project</span>
              </button>
            </div>

            {projectList.length === 0 ? (
              <div
                style={{
                  padding: '2.5rem 1rem',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  border: '1px dashed var(--admin-border)'
                }}
              >
                <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
                  No projects currently configured in the showcase.
                </p>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="admin-btn admin-btn-secondary"
                >
                  <Plus size={15} />
                  <span>Create First Project Card</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {projectList.map((proj, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(15, 23, 42, 0.65)',
                      border: '1px solid var(--admin-border)',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      transition: 'border-color 0.2s',
                      position: 'relative'
                    }}
                  >
                    {/* Project Header Row */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                        paddingBottom: '0.75rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            background: 'var(--admin-orange)',
                            color: '#000',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '4px'
                          }}
                        >
                          #{idx + 1}
                        </span>
                        <strong style={{ color: '#fff', fontSize: '1rem' }}>
                          {proj.name || 'Untitled Project'}
                        </strong>
                        {proj.category && (
                          <span
                            style={{
                              background: 'rgba(147, 51, 234, 0.15)',
                              border: '1px solid rgba(147, 51, 234, 0.35)',
                              color: '#c084fc',
                              fontSize: '0.75rem',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '4px'
                            }}
                          >
                            {proj.category}
                          </span>
                        )}
                        {proj.url && proj.url !== '#' ? (
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', textDecoration: 'none' }}
                          >
                            <span>Live Site</span>
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                            [Case Info Modal]
                          </span>
                        )}
                      </div>

                      {/* Reorder and Delete controls */}
                      <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleMoveProject(idx, -1)}
                          disabled={idx === 0}
                          title="Move Up"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--admin-border)',
                            borderRadius: '4px',
                            color: idx === 0 ? '#4b5563' : '#e5e7eb',
                            cursor: idx === 0 ? 'not-allowed' : 'pointer',
                            padding: '0.25rem 0.5rem',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <ArrowUp size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMoveProject(idx, 1)}
                          disabled={idx === projectList.length - 1}
                          title="Move Down"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--admin-border)',
                            borderRadius: '4px',
                            color: idx === projectList.length - 1 ? '#4b5563' : '#e5e7eb',
                            cursor: idx === projectList.length - 1 ? 'not-allowed' : 'pointer',
                            padding: '0.25rem 0.5rem',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <ArrowDown size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteProject(idx)}
                          title="Delete Project"
                          style={{
                            background: 'rgba(239, 68, 68, 0.12)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '4px',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '0.25rem 0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: '0.25rem'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Project Fields Grid */}
                    <div className="admin-grid-2" style={{ marginBottom: '0.75rem' }}>
                      <div className="admin-form-group">
                        <label className="admin-label">Project Name / Domain</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.name || ''}
                          placeholder="e.g. www.borit.com or IOS App - ReadMore"
                          onChange={(e) => handleUpdateProject(idx, 'name', e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Product Type / Subtitle</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.type || ''}
                          placeholder="e.g. Corporate Web Experience or Luxury Cosmetics & Lifestyle"
                          onChange={(e) => handleUpdateProject(idx, 'type', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="admin-grid-2" style={{ marginBottom: '0.75rem' }}>
                      <div className="admin-form-group">
                        <label className="admin-label">
                          Category (Filter Group)
                        </label>
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                          {['Website', 'Android / IOS - Mobile Apps', 'Web Apps', 'E-Commerce'].map((catOpt) => (
                            <button
                              key={catOpt}
                              type="button"
                              onClick={() => handleUpdateProject(idx, 'category', catOpt)}
                              style={{
                                background: proj.category === catOpt ? 'var(--admin-orange)' : 'rgba(255, 255, 255, 0.05)',
                                color: proj.category === catOpt ? '#000' : '#d1d5db',
                                border: '1px solid var(--admin-border)',
                                borderRadius: '4px',
                                padding: '0.15rem 0.5rem',
                                fontSize: '0.72rem',
                                cursor: 'pointer',
                                fontWeight: proj.category === catOpt ? 600 : 400
                              }}
                            >
                              {catOpt}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.category || ''}
                          placeholder="Type or select a category above"
                          onChange={(e) => handleUpdateProject(idx, 'category', e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Status Dot Badge</label>
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                          {['Live Production', 'Enterprise Live', 'Beta Release', 'Client Case Study'].map((stOpt) => (
                            <button
                              key={stOpt}
                              type="button"
                              onClick={() => handleUpdateProject(idx, 'status', stOpt)}
                              style={{
                                background: (proj.status || 'Live Production') === stOpt ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                color: (proj.status || 'Live Production') === stOpt ? '#34d399' : '#9ca3af',
                                border: '1px solid var(--admin-border)',
                                borderRadius: '4px',
                                padding: '0.15rem 0.5rem',
                                fontSize: '0.72rem',
                                cursor: 'pointer',
                                fontWeight: 500
                              }}
                            >
                              {stOpt}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.status || 'Live Production'}
                          placeholder="e.g. Live Production"
                          onChange={(e) => handleUpdateProject(idx, 'status', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="admin-form-group" style={{ marginBottom: '0.75rem' }}>
                      <label className="admin-label">
                        Project URL / Destination Link
                      </label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.url || ''}
                          placeholder="https://example.com or #"
                          onChange={(e) => handleUpdateProject(idx, 'url', e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => handleUpdateProject(idx, 'url', '#')}
                          className="admin-btn admin-btn-secondary"
                          style={{ height: '40px', whiteSpace: 'nowrap', fontSize: '0.75rem' }}
                          title="Set link to modal case inquiry"
                        >
                          Set to '#' Modal
                        </button>
                      </div>
                      <span className="admin-hint">
                        Provide a full URL (e.g. <code>https://www.borit.com</code>) to open the live client website in a new tab, or use <code>#</code> to open the Case Info inquiry popup.
                      </span>
                    </div>

                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                      <label className="admin-label">Project Description</label>
                      <textarea
                        className="admin-textarea"
                        rows="2"
                        value={proj.desc || ''}
                        placeholder="Brief summary of the architecture, key deliverables, and commercial impact..."
                        onChange={(e) => handleUpdateProject(idx, 'desc', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Card 3: Bottom Callout Banner */}
          <div className="admin-card">
            <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Megaphone size={18} color="var(--admin-orange)" />
              <span>Portfolio Bottom Callout Banner</span>
            </h3>

            <div className="admin-form-group">
              <label className="admin-label">Callout Pitch Text</label>
              <textarea
                className="admin-textarea"
                rows="2"
                value={projectsSec.bottomCta?.text || ''}
                onChange={(e) => updateProjectBottomCta('text', e.target.value)}
                placeholder="e.g. Have a project in mind? Let's turn your concept into our next featured success story."
              />
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label className="admin-label">Action Button Label</label>
              <input
                type="text"
                className="admin-input"
                value={projectsSec.bottomCta?.btnText || ''}
                onChange={(e) => updateProjectBottomCta('btnText', e.target.value)}
                placeholder="e.g. Start Your Project With Us"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CLIENT TESTIMONIALS & REVIEWS */}
      {activeTab === 'testimonials' && (
        <div>
          {/* Card 1: Section Header */}
          <div className="admin-card">
            <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquareQuote size={20} color="var(--admin-orange)" />
              <span>Testimonials Section Header & Subtitle</span>
            </h3>

            <div className="admin-grid-3">
              <div className="admin-form-group">
                <label className="admin-label">Eyebrow Badge Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={testimonialsSec.badge || 'WHAT PEOPLE ARE SAYING'}
                  onChange={(e) => updateTestimonialsSec('badge', e.target.value)}
                  placeholder="e.g. WHAT PEOPLE ARE SAYING"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Title Prefix (White text)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={testimonialsSec.titlePrefix !== undefined ? testimonialsSec.titlePrefix : 'Preparing For Your Success • '}
                  onChange={(e) => updateTestimonialsSec('titlePrefix', e.target.value)}
                  placeholder="e.g. Preparing For Your Success • "
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Title Highlight (Orange/Gradient text)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={testimonialsSec.titleHighlight !== undefined ? testimonialsSec.titleHighlight : 'Trusted Source In IT Services'}
                  onChange={(e) => updateTestimonialsSec('titleHighlight', e.target.value)}
                  placeholder="e.g. Trusted Source In IT Services"
                />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label className="admin-label">Section Subtitle / Description</label>
              <textarea
                className="admin-textarea"
                rows="2"
                value={testimonialsSec.subtitle || ''}
                onChange={(e) => updateTestimonialsSec('subtitle', e.target.value)}
                placeholder="e.g. See how Black Grapes Softech delivers real business transformation for leaders and founders."
              />
            </div>
          </div>

          {/* Card 2: Dynamic Testimonials Cards Manager */}
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span>Client Testimonials & Executive Reviews</span>
                  <span
                    style={{
                      background: 'rgba(248, 98, 0, 0.2)',
                      color: 'var(--admin-orange)',
                      border: '1px solid rgba(248, 98, 0, 0.35)',
                      padding: '0.15rem 0.55rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {testimonialList.length} Active Reviews
                  </span>
                </h3>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.825rem', color: '#9ca3af' }}>
                  Manage client review statements, star ratings, roles, and avatar badges shown on the homepage testimonial slider.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddTestimonial}
                className="admin-btn admin-btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1.1rem' }}
              >
                <Plus size={16} />
                <span>Add New Testimonial</span>
              </button>
            </div>

            {testimonialList.length === 0 ? (
              <div
                style={{
                  padding: '2.5rem 1rem',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  border: '1px dashed var(--admin-border)'
                }}
              >
                <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
                  No testimonials currently configured for the homepage.
                </p>
                <button
                  type="button"
                  onClick={handleAddTestimonial}
                  className="admin-btn admin-btn-secondary"
                >
                  <Plus size={15} />
                  <span>Create First Testimonial</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {testimonialList.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(15, 23, 42, 0.65)',
                      border: '1px solid var(--admin-border)',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      transition: 'border-color 0.2s',
                      position: 'relative'
                    }}
                  >
                    {/* Header Row */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                        paddingBottom: '0.75rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            background: 'var(--admin-orange)',
                            color: '#000',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '4px'
                          }}
                        >
                          #{idx + 1}
                        </span>

                        <span
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #f86200, #9333ea)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '0.75rem'
                          }}
                        >
                          {item.avatar || 'CL'}
                        </span>

                        <strong style={{ color: '#fff', fontSize: '1rem' }}>
                          {item.name || 'Untitled Client'}
                        </strong>

                        {item.role && (
                          <span
                            style={{
                              background: 'rgba(147, 51, 234, 0.15)',
                              border: '1px solid rgba(147, 51, 234, 0.35)',
                              color: '#c084fc',
                              fontSize: '0.75rem',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '4px'
                            }}
                          >
                            {item.role}
                          </span>
                        )}

                        <span style={{ color: '#f59e0b', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          ★ {item.rating || 5} Stars
                        </span>
                      </div>

                      {/* Reorder and Delete controls */}
                      <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleMoveTestimonial(idx, -1)}
                          disabled={idx === 0}
                          title="Move Up"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--admin-border)',
                            borderRadius: '4px',
                            color: idx === 0 ? '#4b5563' : '#e5e7eb',
                            cursor: idx === 0 ? 'not-allowed' : 'pointer',
                            padding: '0.25rem 0.5rem',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <ArrowUp size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMoveTestimonial(idx, 1)}
                          disabled={idx === testimonialList.length - 1}
                          title="Move Down"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--admin-border)',
                            borderRadius: '4px',
                            color: idx === testimonialList.length - 1 ? '#4b5563' : '#e5e7eb',
                            cursor: idx === testimonialList.length - 1 ? 'not-allowed' : 'pointer',
                            padding: '0.25rem 0.5rem',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <ArrowDown size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteTestimonial(idx)}
                          title="Delete Testimonial"
                          style={{
                            background: 'rgba(239, 68, 68, 0.12)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '4px',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '0.25rem 0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: '0.25rem'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="admin-grid-2" style={{ marginBottom: '0.75rem' }}>
                      <div className="admin-form-group">
                        <label className="admin-label">Client Name</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={item.name || ''}
                          placeholder="e.g. Subodh Bhandari"
                          onChange={(e) => handleUpdateTestimonial(idx, 'name', e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Role / Designation / Organization</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={item.role || ''}
                          placeholder="e.g. Enterprise Client or Business Director"
                          onChange={(e) => handleUpdateTestimonial(idx, 'role', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="admin-grid-3" style={{ marginBottom: '0.75rem' }}>
                      <div className="admin-form-group">
                        <label className="admin-label">Avatar Initials / Icon</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={item.avatar || ''}
                          placeholder="e.g. SB or KM"
                          maxLength="4"
                          onChange={(e) => handleUpdateTestimonial(idx, 'avatar', e.target.value.toUpperCase())}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Star Rating (1 - 5)</label>
                        <select
                          className="admin-input"
                          value={item.rating || 5}
                          onChange={(e) => handleUpdateTestimonial(idx, 'rating', Number(e.target.value))}
                        >
                          <option value={5}>★★★★★ (5 Stars)</option>
                          <option value={4}>★★★★☆ (4 Stars)</option>
                          <option value={3}>★★★☆☆ (3 Stars)</option>
                          <option value={2}>★★☆☆☆ (2 Stars)</option>
                          <option value={1}>★☆☆☆☆ (1 Star)</option>
                        </select>
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Rating Label</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={item.ratingScore || '5.0 / 5.0 Rating'}
                          placeholder="e.g. 5.0 / 5.0 Rating"
                          onChange={(e) => handleUpdateTestimonial(idx, 'ratingScore', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="admin-form-group" style={{ marginBottom: '0.75rem' }}>
                      <label className="admin-label">Verification Badge Text</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={item.verifiedBadge || '✓ Verified Client'}
                        placeholder="e.g. ✓ Verified Client"
                        onChange={(e) => handleUpdateTestimonial(idx, 'verifiedBadge', e.target.value)}
                      />
                    </div>

                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                      <label className="admin-label">Review / Quote Text</label>
                      <textarea
                        className="admin-textarea"
                        rows="3"
                        value={item.quote || ''}
                        placeholder="Enter the full testimonial quote provided by the client..."
                        onChange={(e) => handleUpdateTestimonial(idx, 'quote', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 7: WHY CHOOSE US & METRICS */}
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

      {/* TAB 8: BOTTOM CTA BANNER */}
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

      {/* Media Picker Modal for Images */}
      {mediaPickerOpen && (
        <MediaPickerModal
          isOpen={mediaPickerOpen}
          onClose={() => {
            setMediaPickerOpen(false);
            setServiceImagePickerIdx(null);
            setAboutImageField(null);
          }}
          onSelectMedia={handleMediaSelected}
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
