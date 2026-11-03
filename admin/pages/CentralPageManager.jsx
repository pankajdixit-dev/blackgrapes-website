import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  Home,
  Info,
  Layers,
  Package,
  Building2,
  Briefcase,
  ShoppingBag,
  MapPin,
  Handshake,
  Users,
  Save,
  CheckCircle,
  ExternalLink,
  Eye,
  EyeOff,
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  Check,
  RotateCcw,
  Sliders,
  FileText,
  Plus,
  Trash2
} from 'lucide-react';
import {
  getHomePage,
  updateHomePage,
  getPageSections,
  publishSection,
  updateSectionDraft,
  saveAboutPageSections,
  getServicesPage,
  saveServicesPage,
  getSoftechPage,
  saveSoftechPage,
  getProductsPage,
  saveProductsPage,
  getClientsPage,
  saveClientsPage,
  getITStaffing,
  saveITStaffing,
  getEcommerce,
  saveEcommerce,
  getContactPage,
  saveContactPage,
  getPartnership,
  savePartnership,
  getBusinessPartners,
  saveBusinessPartners,
  saveModuleApi,
  notifyContentUpdated
} from '@backend/dataService';

// All 11 Official Pages Definition
const ALL_PAGES = [
  {
    id: 'home',
    name: 'Home Page',
    route: '/',
    module: 'home_page',
    icon: Home,
    tagline: 'Main landing page, hero animation, clock philosophy, values and showcase',
    sectionsCount: 5,
    dedicatedManager: '/admin/home'
  },
  {
    id: 'about',
    name: 'About Us',
    route: '/about',
    module: 'page_sections',
    icon: Info,
    tagline: 'Founders leadership, vision, metrics, company culture and technical domains',
    sectionsCount: 9,
    dedicatedManager: '/admin/about'
  },
  {
    id: 'services',
    name: 'Services (Group)',
    route: '/services',
    module: 'services_page',
    icon: Layers,
    tagline: 'Group-level multi-entity services catalog hero, search and filter matrix',
    sectionsCount: 3,
    dedicatedManager: '/admin/services'
  },
  {
    id: 'softech',
    name: 'Softech Services',
    route: '/softech-services',
    module: 'softech_page',
    icon: Sparkles,
    tagline: 'Custom software engineering, 7 industry solutions, and technical scope',
    sectionsCount: 4,
    dedicatedManager: '/admin/services'
  },
  {
    id: 'products',
    name: 'Our Products',
    route: '/products',
    module: 'products_page',
    icon: Package,
    tagline: 'Turnkey proprietary software products, metrics counters and catalog',
    sectionsCount: 4,
    dedicatedManager: '/admin/projects'
  },
  {
    id: 'clients',
    name: 'Our Clients',
    route: '/clients',
    module: 'clients_page',
    icon: Building2,
    tagline: 'Client portfolio, 38 global brands, impact metrics and trust indicators',
    sectionsCount: 4,
    dedicatedManager: '/admin/clients'
  },
  {
    id: 'it-staffing',
    name: 'IT Staffing',
    route: '/it-staffing',
    module: 'it_staffing',
    icon: Briefcase,
    tagline: 'Contract developers, technical hiring squads, NAPS apprenticeship and rates',
    sectionsCount: 4,
    dedicatedManager: '/admin/it-staffing'
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Platform',
    route: '/ecommerce',
    module: 'ecommerce_page',
    icon: ShoppingBag,
    tagline: 'Naya Purana Bazaar launch portal, marketplace features and waitlist',
    sectionsCount: 3,
    dedicatedManager: '/admin/ecommerce'
  },
  {
    id: 'contact',
    name: 'Contact Coordinates',
    route: '/contact',
    module: 'contact_page',
    icon: MapPin,
    tagline: 'Office addresses, direct phone lines, support emails and enquiry forms',
    sectionsCount: 3,
    dedicatedManager: '/admin/contact'
  },
  {
    id: 'partnership',
    name: 'Partnership & Alliances',
    route: '/partnership',
    module: 'partnership_page',
    icon: Handshake,
    tagline: 'Offshore ODC partnerships, strategic alliances, models and application',
    sectionsCount: 3,
    dedicatedManager: '/admin/partnership'
  },
  {
    id: 'business-partners',
    name: 'Business Partners',
    route: '/business-partners',
    module: 'business_partners',
    icon: Users,
    tagline: 'Products & service tie-up introductory copy and partner enterprise cards',
    sectionsCount: 3,
    dedicatedManager: '/admin/partnership'
  }
];

export default function CentralPageManager() {
  const [selectedPageId, setSelectedPageId] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Page Data Store
  const [pageData, setPageData] = useState({});
  const [loadingPage, setLoadingPage] = useState(false);

  // Active section tab inside editor
  const [activeSectionKey, setActiveSectionKey] = useState('hero');

  useEffect(() => {
    loadSelectedPageContent(selectedPageId);
  }, [selectedPageId]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const loadSelectedPageContent = async (pageId) => {
    setLoadingPage(true);
    try {
      let data = null;
      if (pageId === 'home') {
        data = await getHomePage();
        setActiveSectionKey('hero');
      } else if (pageId === 'about') {
        data = await getPageSections('about');
        setActiveSectionKey('about_hero');
      } else if (pageId === 'services') {
        data = await getServicesPage();
        setActiveSectionKey('hero');
      } else if (pageId === 'softech') {
        data = await getSoftechPage();
        setActiveSectionKey('hero');
      } else if (pageId === 'products') {
        data = await getProductsPage();
        setActiveSectionKey('hero');
      } else if (pageId === 'clients') {
        data = await getClientsPage();
        setActiveSectionKey('hero');
      } else if (pageId === 'it-staffing') {
        data = await getITStaffing();
        setActiveSectionKey('hero');
      } else if (pageId === 'ecommerce') {
        data = await getEcommerce();
        setActiveSectionKey('hero');
      } else if (pageId === 'contact') {
        data = await getContactPage();
        setActiveSectionKey('hero');
      } else if (pageId === 'partnership') {
        data = await getPartnership();
        setActiveSectionKey('hero');
      } else if (pageId === 'business-partners') {
        data = await getBusinessPartners();
        setActiveSectionKey('products_intro');
      }
      setPageData(data || {});
    } catch (err) {
      console.error('Failed to load page content:', err);
    } finally {
      setLoadingPage(false);
    }
  };

  const handleSavePage = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const activeMeta = ALL_PAGES.find((p) => p.id === selectedPageId);
      if (selectedPageId === 'home') {
        await updateHomePage(pageData);
      } else if (selectedPageId === 'about') {
        // Publish all sections with latest drafts directly to live DB
        const updatedSections = { ...pageData };
        Object.keys(updatedSections).forEach((key) => {
          if (updatedSections[key] && typeof updatedSections[key] === 'object') {
            const draft = updatedSections[key].draft_content || updatedSections[key].content;
            if (draft) {
              updatedSections[key] = {
                ...updatedSections[key],
                content: draft,
                draft_content: draft,
                has_unpublished_changes: false,
                updated_at: new Date().toISOString()
              };
            }
          }
        });
        await saveAboutPageSections(updatedSections);
      } else if (selectedPageId === 'services') {
        await saveServicesPage(pageData);
      } else if (selectedPageId === 'softech') {
        await saveSoftechPage(pageData);
      } else if (selectedPageId === 'products') {
        await saveProductsPage(pageData);
      } else if (selectedPageId === 'clients') {
        await saveClientsPage(pageData);
      } else if (selectedPageId === 'it-staffing') {
        await saveITStaffing(pageData);
      } else if (selectedPageId === 'ecommerce') {
        await saveEcommerce(pageData);
      } else if (selectedPageId === 'contact') {
        await saveContactPage(pageData);
      } else if (selectedPageId === 'partnership') {
        await savePartnership(pageData);
      } else if (selectedPageId === 'business-partners') {
        await saveBusinessPartners(pageData);
      }

      showToast(`Saved & Published live changes for ${activeMeta?.name}! Real-Time WebSocket broadcast emitted.`);
      // Reload fresh data from database
      await loadSelectedPageContent(selectedPageId);
    } catch (err) {
      console.error('Save failed:', err);
      showToast('Error saving changes to database.');
    } finally {
      setSaving(false);
    }
  };

  const activePageMeta = ALL_PAGES.find((p) => p.id === selectedPageId) || ALL_PAGES[0];

  const filteredPages = ALL_PAGES.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Header */}
      <div className="admin-page-header">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              background: 'rgba(255, 107, 0, 0.15)',
              color: '#ff6b00',
              border: '1px solid rgba(255, 107, 0, 0.3)'
            }}>
              <LayoutGrid size={12} />
              <span>CENTRAL PAGE MANAGEMENT HUB</span>
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#10b981',
              border: '1px solid rgba(16, 185, 129, 0.25)'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              <span>11/11 Pages Real-Time Synced</span>
            </span>
          </div>

          <h1 className="admin-page-title">Website Content & Section Studio</h1>
          <p className="admin-page-sub">
            Directly edit headings, descriptions, buttons, images, and metrics across every page. Changes write directly to the database and sync instantly via WebSocket.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href={activePageMeta.route}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview Live Page in new tab"
          >
            <Eye size={15} />
            <span>View Live Page</span>
            <ExternalLink size={12} style={{ opacity: 0.6 }} />
          </a>

          <button
            onClick={handleSavePage}
            disabled={saving || loadingPage}
            className="admin-btn admin-btn-primary"
            style={{ minWidth: '170px', justifyContent: 'center' }}
          >
            <Save size={16} />
            <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Grid of All 11 Pages */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Select Website Page to Edit:</span>
            <span style={{ fontSize: '0.8rem', padding: '0.1rem 0.5rem', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', color: '#94a3b8' }}>
              {filteredPages.length} Pages
            </span>
          </h2>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Filter pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-input"
              style={{ paddingLeft: '2.2rem', fontSize: '0.82rem', height: '36px' }}
            />
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: '0.75rem'
        }}>
          {filteredPages.map((page) => {
            const Icon = page.icon;
            const isSelected = selectedPageId === page.id;
            return (
              <div
                key={page.id}
                onClick={() => setSelectedPageId(page.id)}
                style={{
                  background: isSelected ? 'rgba(255, 107, 0, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid',
                  borderColor: isSelected ? '#ff6b00' : 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isSelected ? '#ff6b00' : 'rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSelected ? '#fff' : '#cbd5e1'
                  }}>
                    <Icon size={16} />
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#94a3b8',
                    fontFamily: 'monospace'
                  }}>
                    {page.route}
                  </span>
                </div>

                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: isSelected ? '#fff' : '#e2e8f0', marginBottom: '0.2rem' }}>
                  {page.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: '1.3' }}>
                  {page.sectionsCount} Sections Connected
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editor Main Canvas */}
      <div className="admin-card" style={{ padding: '1.5rem', border: '1px solid rgba(255, 107, 0, 0.25)' }}>
        {/* Active Page Header Card */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '1.25rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--admin-border)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff6b00, #ff8800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <activePageMeta.icon size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  {activePageMeta.name} Content Editor
                </h2>
                <span style={{ fontSize: '0.75rem', color: '#ff6b00', background: 'rgba(255, 107, 0, 0.12)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace' }}>
                  {activePageMeta.route}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
                {activePageMeta.tagline}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <a
              href={activePageMeta.dedicatedManager}
              className="admin-btn admin-btn-secondary"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
            >
              <Sliders size={14} />
              <span>Deep Manager</span>
            </a>
          </div>
        </div>

        {loadingPage ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            Loading page sections from database...
          </div>
        ) : (
          <div>
            {/* ========================================================
                1. HOME PAGE EDITOR
                ======================================================== */}
            {selectedPageId === 'home' && (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginBottom: '1.5rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.5rem' }}>
                  {[
                    { id: 'hero', label: '1. Hero Section' },
                    { id: 'clock', label: '2. Clock Philosophy' },
                    { id: 'why_us', label: '3. Why Choose Us' },
                    { id: 'cta', label: '4. CTA Banner' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSectionKey(tab.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: activeSectionKey === tab.id ? '#ff6b00' : 'rgba(255,255,255,0.08)',
                        background: activeSectionKey === tab.id ? 'rgba(255, 107, 0, 0.15)' : 'transparent',
                        color: activeSectionKey === tab.id ? '#fff' : '#94a3b8',
                        fontWeight: activeSectionKey === tab.id ? 700 : 500,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {activeSectionKey === 'hero' && (
                  <div>
                    <div className="admin-form-group">
                      <label className="admin-label">Hero Badge / Eyebrow</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={pageData.hero?.eyebrow || ''}
                        onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, eyebrow: e.target.value } })}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="admin-form-group">
                        <label className="admin-label">Hero Main Title (Prefix)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={pageData.hero?.titlePrefix || ''}
                          onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, titlePrefix: e.target.value } })}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Title Highlight (Gradient Accent)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={pageData.hero?.titleHighlight || ''}
                          onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, titleHighlight: e.target.value } })}
                        />
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Hero Description / Subtitle</label>
                      <textarea
                        rows={3}
                        className="admin-textarea"
                        value={pageData.hero?.description || ''}
                        onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, description: e.target.value } })}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="admin-form-group">
                        <label className="admin-label">Primary CTA Button Text</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={pageData.hero?.primaryCtaText || ''}
                          onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, primaryCtaText: e.target.value } })}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Secondary CTA Button Text</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={pageData.hero?.secondaryCtaText || ''}
                          onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, secondaryCtaText: e.target.value } })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSectionKey === 'clock' && (
                  <div>
                    <div className="admin-form-group">
                      <label className="admin-label">Clock Philosophy Eyebrow</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={pageData.clockPhilosophy?.eyebrow || ''}
                        onChange={(e) => setPageData({ ...pageData, clockPhilosophy: { ...pageData.clockPhilosophy, eyebrow: e.target.value } })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Clock Main Heading</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={pageData.clockPhilosophy?.title || ''}
                        onChange={(e) => setPageData({ ...pageData, clockPhilosophy: { ...pageData.clockPhilosophy, title: e.target.value } })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Clock Subtitle</label>
                      <textarea
                        rows={2}
                        className="admin-textarea"
                        value={pageData.clockPhilosophy?.subtitle || ''}
                        onChange={(e) => setPageData({ ...pageData, clockPhilosophy: { ...pageData.clockPhilosophy, subtitle: e.target.value } })}
                      />
                    </div>
                  </div>
                )}

                {activeSectionKey === 'why_us' && (
                  <div>
                    <div className="admin-form-group">
                      <label className="admin-label">Why Choose Us Eyebrow</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={pageData.whyChooseUs?.eyebrow || ''}
                        onChange={(e) => setPageData({ ...pageData, whyChooseUs: { ...pageData.whyChooseUs, eyebrow: e.target.value } })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Why Choose Us Main Heading</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={pageData.whyChooseUs?.heading || ''}
                        onChange={(e) => setPageData({ ...pageData, whyChooseUs: { ...pageData.whyChooseUs, heading: e.target.value } })}
                      />
                    </div>
                  </div>
                )}

                {activeSectionKey === 'cta' && (
                  <div>
                    <div className="admin-form-group">
                      <label className="admin-label">Bottom CTA Banner Heading</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={pageData.ctaBanner?.heading || ''}
                        onChange={(e) => setPageData({ ...pageData, ctaBanner: { ...pageData.ctaBanner, heading: e.target.value } })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">CTA Banner Subtext</label>
                      <textarea
                        rows={2}
                        className="admin-textarea"
                        value={pageData.ctaBanner?.subheading || ''}
                        onChange={(e) => setPageData({ ...pageData, ctaBanner: { ...pageData.ctaBanner, subheading: e.target.value } })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">CTA Action Button Text</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={pageData.ctaBanner?.buttonText || ''}
                        onChange={(e) => setPageData({ ...pageData, ctaBanner: { ...pageData.ctaBanner, buttonText: e.target.value } })}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================
                2. ABOUT US PAGE EDITOR
                ======================================================== */}
            {selectedPageId === 'about' && (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginBottom: '1.5rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.5rem' }}>
                  {[
                    { id: 'about_hero', label: '1. Hero' },
                    { id: 'stats_strip', label: '2. Metrics' },
                    { id: 'vision_mission', label: '3. Vision & Mission' },
                    { id: 'founders', label: '4. Leadership' },
                    { id: 'culture_hq', label: '5. HQ & Culture' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSectionKey(tab.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: activeSectionKey === tab.id ? '#ff6b00' : 'rgba(255,255,255,0.08)',
                        background: activeSectionKey === tab.id ? 'rgba(255, 107, 0, 0.15)' : 'transparent',
                        color: activeSectionKey === tab.id ? '#fff' : '#94a3b8',
                        fontWeight: activeSectionKey === tab.id ? 700 : 500,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* About Hero Section */}
                {activeSectionKey === 'about_hero' && (() => {
                  const content = pageData.about_hero?.content || {};
                  const updateContent = (field, val) => {
                    setPageData({
                      ...pageData,
                      about_hero: {
                        ...pageData.about_hero,
                        content: { ...content, [field]: val },
                        draft_content: { ...content, [field]: val }
                      }
                    });
                  };
                  return (
                    <div>
                      <div className="admin-form-group">
                        <label className="admin-label">About Hero Eyebrow Badge</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={content.badge || ''}
                          onChange={(e) => updateContent('badge', e.target.value)}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="admin-form-group">
                          <label className="admin-label">Main Heading Prefix</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={content.title || ''}
                            onChange={(e) => updateContent('title', e.target.value)}
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Heading Highlight</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={content.titleHighlight || ''}
                            onChange={(e) => updateContent('titleHighlight', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">About Lead Description</label>
                        <textarea
                          rows={3}
                          className="admin-textarea"
                          value={content.lead || ''}
                          onChange={(e) => updateContent('lead', e.target.value)}
                        />
                      </div>
                    </div>
                  );
                })()}

                {/* About Culture HQ */}
                {activeSectionKey === 'culture_hq' && (() => {
                  const content = pageData.culture_hq?.content || {};
                  const updateContent = (field, val) => {
                    setPageData({
                      ...pageData,
                      culture_hq: {
                        ...pageData.culture_hq,
                        content: { ...content, [field]: val },
                        draft_content: { ...content, [field]: val }
                      }
                    });
                  };
                  return (
                    <div>
                      <div className="admin-form-group">
                        <label className="admin-label">Location Tag</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={content.locationTag || ''}
                          onChange={(e) => updateContent('locationTag', e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Culture Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={content.title || ''}
                          onChange={(e) => updateContent('title', e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Description Paragraph 1</label>
                        <textarea
                          rows={3}
                          className="admin-textarea"
                          value={content.p1 || ''}
                          onChange={(e) => updateContent('p1', e.target.value)}
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ========================================================
                3. SERVICES (GROUP) PAGE EDITOR
                ======================================================== */}
            {selectedPageId === 'services' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={16} color="#ff6b00" />
                  <span>Services Page Hero & Search Header</span>
                </h3>

                <div className="admin-form-group">
                  <label className="admin-label">Top Pill Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.badge || ''}
                    onChange={(e) => setPageData({ ...pageData, badge: e.target.value })}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Hero Title (Prefix)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pageData.title || ''}
                      onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Hero Title Accent (Gradient Highlight)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pageData.titleAccent || ''}
                      onChange={(e) => setPageData({ ...pageData, titleAccent: e.target.value })}
                    />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Services Subtitle</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={pageData.subtitle || ''}
                    onChange={(e) => setPageData({ ...pageData, subtitle: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Search Input Placeholder</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.searchPlaceholder || ''}
                    onChange={(e) => setPageData({ ...pageData, searchPlaceholder: e.target.value })}
                  />
                </div>

                <h3 style={{ fontSize: '1.1rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layers size={16} color="#ff6b00" />
                  <span>Top Switcher Navigation Tabs</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Tab 1 Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pageData.tab1Label || ''}
                      onChange={(e) => setPageData({ ...pageData, tab1Label: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Tab 2 Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pageData.tab2Label || ''}
                      onChange={(e) => setPageData({ ...pageData, tab2Label: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Tab 3 Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pageData.tab3Label || ''}
                      onChange={(e) => setPageData({ ...pageData, tab3Label: e.target.value })}
                    />
                  </div>
                </div>

                {/* Group Services Cards Management */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                      Group Companies & Services Cards Directory
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
                      Manage the 6 core company cards displayed on the public /services page.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const current = [...(pageData.group_services || [])];
                      current.push({
                        id: Date.now(),
                        title: 'New Group Entity',
                        tagline: 'Strategic Subsidiary',
                        description: 'Detailed description of business offerings and specialized domain services.',
                        image: '/services-logos/associates.webp',
                        url: 'https://blackgrapesgroup.com',
                        category: 'associates',
                        accentColor: '#f86200'
                      });
                      setPageData({ ...pageData, group_services: current });
                    }}
                    className="admin-btn admin-btn-secondary"
                    style={{ fontSize: '0.8rem' }}
                  >
                    <Plus size={14} />
                    <span>Add New Service Card</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {(pageData.group_services || []).map((srv, idx) => (
                    <div
                      key={srv.id || idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                        padding: '1.25rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '6px',
                            background: srv.accentColor || '#f86200',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.75rem'
                          }}>
                            {idx + 1}
                          </span>
                          <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{srv.title || 'Untitled Service'}</strong>
                          <span style={{ fontSize: '0.72rem', padding: '0.1rem 0.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', color: '#94a3b8' }}>
                            {srv.category}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (pageData.group_services || []).filter((_, i) => i !== idx);
                            setPageData({ ...pageData, group_services: updated });
                          }}
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#ef4444',
                            borderRadius: '6px',
                            padding: '0.35rem 0.65rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontSize: '0.75rem'
                          }}
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="admin-form-group">
                          <label className="admin-label">Service / Company Name</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={srv.title || ''}
                            onChange={(e) => {
                              const updated = [...(pageData.group_services || [])];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setPageData({ ...pageData, group_services: updated });
                            }}
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Tagline / Domain Pill</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={srv.tagline || ''}
                            onChange={(e) => {
                              const updated = [...(pageData.group_services || [])];
                              updated[idx] = { ...updated[idx], tagline: e.target.value };
                              setPageData({ ...pageData, group_services: updated });
                            }}
                          />
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Service Description</label>
                        <textarea
                          rows={2}
                          className="admin-textarea"
                          value={srv.description || ''}
                          onChange={(e) => {
                            const updated = [...(pageData.group_services || [])];
                            updated[idx] = { ...updated[idx], description: e.target.value };
                            setPageData({ ...pageData, group_services: updated });
                          }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                        <div className="admin-form-group">
                          <label className="admin-label">External Website Link URL</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={srv.url || ''}
                            onChange={(e) => {
                              const updated = [...(pageData.group_services || [])];
                              updated[idx] = { ...updated[idx], url: e.target.value };
                              setPageData({ ...pageData, group_services: updated });
                            }}
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Category</label>
                          <select
                            className="admin-input"
                            value={srv.category || 'associates'}
                            onChange={(e) => {
                              const updated = [...(pageData.group_services || [])];
                              updated[idx] = { ...updated[idx], category: e.target.value };
                              setPageData({ ...pageData, group_services: updated });
                            }}
                          >
                            <option value="associates">Associates</option>
                            <option value="softech">IT & Softech</option>
                            <option value="realestate">Real Estate</option>
                            <option value="investment">Investment & Securities</option>
                            <option value="valuers">Valuers & Engineers</option>
                            <option value="insurance">Insurance Surveyors</option>
                          </select>
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Accent Color</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={srv.accentColor || '#f86200'}
                            onChange={(e) => {
                              const updated = [...(pageData.group_services || [])];
                              updated[idx] = { ...updated[idx], accentColor: e.target.value };
                              setPageData({ ...pageData, group_services: updated });
                            }}
                          />
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Logo / Emblem Image Path or URL</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={srv.image || ''}
                          onChange={(e) => {
                            const updated = [...(pageData.group_services || [])];
                            updated[idx] = { ...updated[idx], image: e.target.value };
                            setPageData({ ...pageData, group_services: updated });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================
                4. SOFTECH SERVICES PAGE EDITOR
                ======================================================== */}
            {selectedPageId === 'softech' && (
              <div>
                <div className="admin-form-group">
                  <label className="admin-label">Top Pill Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.badge || ''}
                    onChange={(e) => setPageData({ ...pageData, badge: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Softech Main Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.title || ''}
                    onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Softech Subtitle</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={pageData.subtitle || ''}
                    onChange={(e) => setPageData({ ...pageData, subtitle: e.target.value })}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Primary Quote Button Text</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pageData.primaryCtaText || ''}
                      onChange={(e) => setPageData({ ...pageData, primaryCtaText: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Secondary CTA Text</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pageData.secondaryCtaText || ''}
                      onChange={(e) => setPageData({ ...pageData, secondaryCtaText: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
                5. OUR PRODUCTS PAGE EDITOR
                ======================================================== */}
            {selectedPageId === 'products' && (
              <div>
                <div className="admin-form-group">
                  <label className="admin-label">Hero Eyebrow Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.badge || ''}
                    onChange={(e) => setPageData({ ...pageData, badge: e.target.value })}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Hero Title (Prefix)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pageData.title || ''}
                      onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Title Accent (Gradient)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pageData.titleAccent || ''}
                      onChange={(e) => setPageData({ ...pageData, titleAccent: e.target.value })}
                    />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Hero Description</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={pageData.subtitle || ''}
                    onChange={(e) => setPageData({ ...pageData, subtitle: e.target.value })}
                  />
                </div>

                <h3 style={{ fontSize: '1rem', color: '#fff', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                  4 Metrics Counter Strip
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                  {(pageData.stats || []).map((stat, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Stat {idx + 1} Number</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={stat.metric || ''}
                        onChange={(e) => {
                          const updated = [...(pageData.stats || [])];
                          updated[idx] = { ...updated[idx], metric: e.target.value };
                          setPageData({ ...pageData, stats: updated });
                        }}
                        style={{ marginBottom: '0.5rem' }}
                      />
                      <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Label</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={stat.label || ''}
                        onChange={(e) => {
                          const updated = [...(pageData.stats || [])];
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          setPageData({ ...pageData, stats: updated });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================
                6. OUR CLIENTS PAGE EDITOR
                ======================================================== */}
            {selectedPageId === 'clients' && (
              <div>
                <div className="admin-form-group">
                  <label className="admin-label">Hero Eyebrow Pill</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.heroBadge || ''}
                    onChange={(e) => setPageData({ ...pageData, heroBadge: e.target.value })}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Hero Title (Prefix)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pageData.heroTitle || ''}
                      onChange={(e) => setPageData({ ...pageData, heroTitle: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Title Accent (Gradient)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pageData.heroTitleAccent || ''}
                      onChange={(e) => setPageData({ ...pageData, heroTitleAccent: e.target.value })}
                    />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Hero Subtitle</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={pageData.heroSubtitle || ''}
                    onChange={(e) => setPageData({ ...pageData, heroSubtitle: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* ========================================================
                7. IT STAFFING PAGE EDITOR
                ======================================================== */}
            {selectedPageId === 'it-staffing' && (
              <div>
                <div className="admin-form-group">
                  <label className="admin-label">Hero Eyebrow Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.badge || ''}
                    onChange={(e) => setPageData({ ...pageData, badge: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Main Headline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.headline || ''}
                    onChange={(e) => setPageData({ ...pageData, headline: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Subtitle Description</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={pageData.subtitle || ''}
                    onChange={(e) => setPageData({ ...pageData, subtitle: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* ========================================================
                8. ECOMMERCE PAGE EDITOR
                ======================================================== */}
            {selectedPageId === 'ecommerce' && (
              <div>
                <div className="admin-form-group">
                  <label className="admin-label">Top Eyebrow Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.badge || ''}
                    onChange={(e) => setPageData({ ...pageData, badge: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Platform Announcement Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.title || ''}
                    onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Domain Name URL</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pageData.domain || ''}
                      onChange={(e) => setPageData({ ...pageData, domain: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Target Launch</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pageData.targetLaunch || ''}
                      onChange={(e) => setPageData({ ...pageData, targetLaunch: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
                9. CONTACT PAGE EDITOR
                ======================================================== */}
            {selectedPageId === 'contact' && (
              <div>
                <div className="admin-form-group">
                  <label className="admin-label">Hero Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.heroBadge || ''}
                    onChange={(e) => setPageData({ ...pageData, heroBadge: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Hero Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.heroTitle || ''}
                    onChange={(e) => setPageData({ ...pageData, heroTitle: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={pageData.heroSubtitle || ''}
                    onChange={(e) => setPageData({ ...pageData, heroSubtitle: e.target.value })}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Address 1 (Registered)</label>
                    <textarea
                      rows={2}
                      className="admin-textarea"
                      value={pageData.address1Text || ''}
                      onChange={(e) => setPageData({ ...pageData, address1Text: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Address 2 (Dev Centre)</label>
                    <textarea
                      rows={2}
                      className="admin-textarea"
                      value={pageData.address2Text || ''}
                      onChange={(e) => setPageData({ ...pageData, address2Text: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
                10. PARTNERSHIP PAGE EDITOR
                ======================================================== */}
            {selectedPageId === 'partnership' && (
              <div>
                <div className="admin-form-group">
                  <label className="admin-label">Hero Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.heroBadge || ''}
                    onChange={(e) => setPageData({ ...pageData, heroBadge: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Hero Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.heroTitle || ''}
                    onChange={(e) => setPageData({ ...pageData, heroTitle: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={pageData.heroSubtitle || ''}
                    onChange={(e) => setPageData({ ...pageData, heroSubtitle: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* ========================================================
                11. BUSINESS PARTNERS PAGE EDITOR
                ======================================================== */}
            {selectedPageId === 'business-partners' && (
              <div>
                <div className="admin-form-group">
                  <label className="admin-label">Top Eyebrow Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.badge || ''}
                    onChange={(e) => setPageData({ ...pageData, badge: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Page Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.title || ''}
                    onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Page Subtitle</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={pageData.subtitle || ''}
                    onChange={(e) => setPageData({ ...pageData, subtitle: e.target.value })}
                  />
                </div>

                <h3 style={{ fontSize: '1.05rem', color: '#fff', marginTop: '1.5rem', marginBottom: '1rem' }}>
                  Product Companies Tie-up Intro
                </h3>
                <div className="admin-form-group">
                  <label className="admin-label">Section Heading</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.product_intro?.title || ''}
                    onChange={(e) => setPageData({
                      ...pageData,
                      product_intro: { ...pageData.product_intro, title: e.target.value }
                    })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Intro Paragraphs (Newline Separated)</label>
                  <textarea
                    rows={4}
                    className="admin-textarea"
                    value={(pageData.product_intro?.paragraphs || []).join('\n\n')}
                    onChange={(e) => setPageData({
                      ...pageData,
                      product_intro: {
                        ...pageData.product_intro,
                        paragraphs: e.target.value.split('\n\n').filter(Boolean)
                      }
                    })}
                  />
                </div>

                <h3 style={{ fontSize: '1.05rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>
                  Services Companies Tie-up Intro
                </h3>
                <div className="admin-form-group">
                  <label className="admin-label">Section Heading</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pageData.service_intro?.title || ''}
                    onChange={(e) => setPageData({
                      ...pageData,
                      service_intro: { ...pageData.service_intro, title: e.target.value }
                    })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Intro Paragraphs (Newline Separated)</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={(pageData.service_intro?.paragraphs || []).join('\n\n')}
                    onChange={(e) => setPageData({
                      ...pageData,
                      service_intro: {
                        ...pageData.service_intro,
                        paragraphs: e.target.value.split('\n\n').filter(Boolean)
                      }
                    })}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

