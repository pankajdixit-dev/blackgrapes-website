const fs = require('fs');
let code = fs.readFileSync('admin/pages/ProjectsManager.jsx', 'utf8');

// 1. Add Sparkles and dataService imports
code = code.replace(
  "import {\n  Package,",
  "import {\n  Sparkles,\n  Package,"
);
code = code.replace(
  "import {\r\n  Package,",
  "import {\r\n  Sparkles,\r\n  Package,"
);

code = code.replace(
  "  deleteProject\n} from '@backend/dataService';",
  "  deleteProject,\n  getProductsPage,\n  saveProductsPage\n} from '@backend/dataService';\nimport { DEFAULT_PRODUCTS_PAGE } from '@backend/defaultData';"
);
code = code.replace(
  "  deleteProject\r\n} from '@backend/dataService';",
  "  deleteProject,\r\n  getProductsPage,\r\n  saveProductsPage\r\n} from '@backend/dataService';\r\nimport { DEFAULT_PRODUCTS_PAGE } from '@backend/defaultData';"
);

// 2. State & Handlers
const oldStateStart = "  const [activeTab, setActiveTab] = useState('products'); // 'products', 'projects'";
const newStateStart = `  const [activeTab, setActiveTab] = useState('hero_suite'); // 'hero_suite', 'products', 'projects'
  const [heroData, setHeroData] = useState(DEFAULT_PRODUCTS_PAGE);
  const [savingHero, setSavingHero] = useState(false);`;

code = code.replace(oldStateStart, newStateStart);

const oldLoadAll = `  const loadAll = async () => {
    const [prods, projs] = await Promise.all([getProducts(), getProjects()]);
    setProducts(prods || []);
    setProjects(projs || []);
  };`;

const newLoadAll = `  const loadAll = async () => {
    const [prods, projs, hero] = await Promise.all([
      getProducts(),
      getProjects(),
      getProductsPage()
    ]);
    setProducts(prods || []);
    setProjects(projs || []);
    if (hero) {
      setHeroData({
        ...DEFAULT_PRODUCTS_PAGE,
        ...hero,
        stats: (Array.isArray(hero.stats) && hero.stats.length > 0)
          ? hero.stats
          : DEFAULT_PRODUCTS_PAGE.stats
      });
    }
  };

  const handleSaveHero = async (e) => {
    if (e) e.preventDefault();
    setSavingHero(true);
    try {
      await saveProductsPage(heroData);
      showToast('Products Suite Banner saved and published live to website!');
    } catch (err) {
      console.error('Save failed:', err);
      showToast('Failed to save changes to database.');
    } finally {
      setSavingHero(false);
    }
  };

  const handleHeroField = (field, val) => {
    setHeroData((prev) => ({ ...prev, [field]: val }));
  };

  const handleHeroStatChange = (idx, field, val) => {
    const updated = [...(heroData.stats || [])];
    updated[idx] = { ...updated[idx], [field]: val };
    setHeroData((prev) => ({ ...prev, stats: updated }));
  };

  const handleAddHeroStat = () => {
    const current = Array.isArray(heroData.stats) ? [...heroData.stats] : [];
    setHeroData((prev) => ({
      ...prev,
      stats: [...current, { metric: '10+', label: 'New Metric Standard' }]
    }));
  };

  const handleDeleteHeroStat = (idx) => {
    const current = Array.isArray(heroData.stats) ? [...heroData.stats] : [];
    setHeroData((prev) => ({
      ...prev,
      stats: current.filter((_, i) => i !== idx)
    }));
  };`;

code = code.replace(oldLoadAll.replace(/\r?\n/g, '\r\n'), newLoadAll.replace(/\r?\n/g, '\r\n'));

// 3. Header Action buttons & Tabs
const oldHeaderButtons = `        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href={activeTab === 'products' ? '/products' : '/#projects'}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live in new tab"
          >
            <ExternalLink size={16} />
            <span>View Live</span>
          </a>
          <button
            onClick={activeTab === 'products' ? handleOpenCreateProduct : handleOpenCreateProject}
            className="admin-btn admin-btn-primary"
          >
            <Plus size={16} />
            <span>{activeTab === 'products' ? 'Add New Product' : 'Add New Portfolio Project'}</span>
          </button>
        </div>`;

const newHeaderButtons = `        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href={activeTab === 'projects' ? '/#projects' : '/products'}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live in new tab"
          >
            <ExternalLink size={16} />
            <span>View Live</span>
          </a>
          {activeTab === 'hero_suite' ? (
            <button
              onClick={handleSaveHero}
              disabled={savingHero}
              className="admin-btn admin-btn-primary"
              style={{ minWidth: '190px', justifyContent: 'center' }}
            >
              <Save size={16} />
              <span>{savingHero ? 'Publishing...' : 'Save & Publish to Live'}</span>
            </button>
          ) : (
            <button
              onClick={activeTab === 'products' ? handleOpenCreateProduct : handleOpenCreateProject}
              className="admin-btn admin-btn-primary"
            >
              <Plus size={16} />
              <span>{activeTab === 'products' ? 'Add New Product' : 'Add New Portfolio Project'}</span>
            </button>
          )}
        </div>`;

code = code.replace(oldHeaderButtons.replace(/\r?\n/g, '\r\n'), newHeaderButtons.replace(/\r?\n/g, '\r\n'));

const oldTabs = `      {/* Tabs */}
      <div className="admin-tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          className={\`admin-tab \${activeTab === 'products' ? 'active' : ''}\`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={16} />
          <span>Proprietary Turnkey Products ({products.length})</span>
        </button>
        <button
          className={\`admin-tab \${activeTab === 'projects' ? 'active' : ''}\`}
          onClick={() => setActiveTab('projects')}
        >
          <Globe size={16} />
          <span>Home Portfolio Showcase ({projects.length})</span>
        </button>
      </div>`;

const newTabs = `      {/* Tabs */}
      <div className="admin-tabs" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          className={\`admin-tab \${activeTab === 'hero_suite' ? 'active' : ''}\`}
          onClick={() => setActiveTab('hero_suite')}
        >
          <Sparkles size={16} />
          <span>1. Products Hero & Suite Showcase Banner</span>
        </button>
        <button
          className={\`admin-tab \${activeTab === 'products' ? 'active' : ''}\`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={16} />
          <span>2. Proprietary Turnkey Products ({products.length})</span>
        </button>
        <button
          className={\`admin-tab \${activeTab === 'projects' ? 'active' : ''}\`}
          onClick={() => setActiveTab('projects')}
        >
          <Globe size={16} />
          <span>3. Home Portfolio Showcase ({projects.length})</span>
        </button>
      </div>`;

code = code.replace(oldTabs.replace(/\r?\n/g, '\r\n'), newTabs.replace(/\r?\n/g, '\r\n'));

// 4. Wrap Search bar so it only shows for catalog and projects
const oldSearch = `      {/* Search Bar */}
      <div className="admin-card" style={{ marginBottom: '1.25rem', padding: '1rem' }}>
        <div className="admin-search-box">
          <Search size={16} color="#9ca3af" />
          <input
            type="text"
            placeholder={activeTab === 'products' ? 'Search turnkey software products...' : 'Search portfolio deliveries...'}
            className="admin-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>`;

const newSearch = `      {/* TAB 0: HERO & SUITE SHOWCASE BANNER */}
      {activeTab === 'hero_suite' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--admin-border)', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} color="var(--admin-orange)" />
                <span>Our Products Suite Hero Banner & Quick Metrics</span>
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                Modify the eyebrow badge, title, accent gradient, lead narrative, 4 impact metrics, and live visual badge.
              </p>
            </div>
            <button
              onClick={handleSaveHero}
              disabled={savingHero}
              className="admin-btn admin-btn-primary"
              style={{ minWidth: '170px', justifyContent: 'center' }}
            >
              <Save size={16} />
              <span>{savingHero ? 'Publishing...' : 'Save & Publish to Live'}</span>
            </button>
          </div>

          {/* Section 1: Top Eyebrow Badge & Main Title */}
          <div className="admin-form-group">
            <label className="admin-label">Top Eyebrow Badge Text</label>
            <input
              type="text"
              className="admin-input"
              value={heroData.badge || ''}
              placeholder="e.g. BLACK GRAPES SOFTECH PROPRIETARY SUITE"
              onChange={(e) => handleHeroField('badge', e.target.value)}
            />
          </div>

          <div className="admin-grid-2" style={{ marginBottom: '1.25rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Main Title Prefix (White text)</label>
              <input
                type="text"
                className="admin-input"
                value={heroData.title || ''}
                placeholder="e.g. Our Products:"
                onChange={(e) => handleHeroField('title', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Title Highlight (Gradient Text)</label>
              <input
                type="text"
                className="admin-input"
                value={heroData.titleAccent || ''}
                placeholder="e.g. Engineered to Transform Modern Business"
                onChange={(e) => handleHeroField('titleAccent', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="admin-label">Hero Lead Description</label>
            <textarea
              rows={3}
              className="admin-textarea"
              value={heroData.subtitle || ''}
              placeholder="e.g. Explore our cutting-edge software solutions designed to transform the way you work and elevate your business to new heights..."
              onChange={(e) => handleHeroField('subtitle', e.target.value)}
            />
          </div>

          {/* Section 2: Quick Metrics Strip Manager */}
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--admin-border)', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h4 style={{ color: '#fff', margin: 0, fontSize: '1rem', fontWeight: 600 }}>
                  Quick Impact Metrics Counters ({(heroData.stats || []).length})
                </h4>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>
                  Manage the 4 highlighted statistics shown underneath the description.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddHeroStat}
                className="admin-btn admin-btn-primary"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
              >
                <Plus size={14} />
                <span>Add Metric</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.85rem' }}>
              {(heroData.stats || []).map((stat, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    padding: '0.85rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--admin-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--admin-orange)', fontWeight: 700 }}>
                      Metric #{sIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteHeroStat(sIdx)}
                      className="admin-action-btn danger"
                      style={{ padding: '0.35rem', borderRadius: '4px' }}
                      title="Delete Metric"
                    >
                      <Trash2 size={13} color="#ef4444" />
                    </button>
                  </div>
                  <div>
                    <label className="admin-label" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>Number / Stat</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={stat.metric || ''}
                      placeholder="e.g. 12+"
                      onChange={(e) => handleHeroStatChange(sIdx, 'metric', e.target.value)}
                      style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label className="admin-label" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>Metric Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={stat.label || ''}
                      placeholder="e.g. Turnkey Products"
                      onChange={(e) => handleHeroStatChange(sIdx, 'label', e.target.value)}
                      style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: CTA Buttons Labels */}
          <div className="admin-grid-2" style={{ marginBottom: '1.75rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Primary CTA Button Label</label>
              <input
                type="text"
                className="admin-input"
                value={heroData.primaryBtnText || ''}
                placeholder="e.g. Request Live Demo"
                onChange={(e) => handleHeroField('primaryBtnText', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Secondary CTA Button Label</label>
              <input
                type="text"
                className="admin-input"
                value={heroData.secondaryBtnText || ''}
                placeholder="e.g. Browse All Products"
                onChange={(e) => handleHeroField('secondaryBtnText', e.target.value)}
              />
            </div>
          </div>

          {/* Section 4: Right Visual Showcase Tag */}
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
            <h4 style={{ color: '#fff', margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600 }}>
              Visual Showcase Card Floating Details
            </h4>
            <div className="admin-grid-3">
              <div className="admin-form-group">
                <label className="admin-label">Live Tag Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={heroData.pillTitle || ''}
                  placeholder="e.g. Live Production Ready"
                  onChange={(e) => handleHeroField('pillTitle', e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Live Tag Platforms Subtext</label>
                <input
                  type="text"
                  className="admin-input"
                  value={heroData.pillSub || ''}
                  placeholder="e.g. Cloud Native • Web • iOS • Android"
                  onChange={(e) => handleHeroField('pillSub', e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Badge Chip (Right)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={heroData.pillBadge || ''}
                  placeholder="e.g. WHITE-LABEL"
                  onChange={(e) => handleHeroField('pillBadge', e.target.value)}
                />
              </div>
            </div>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label className="admin-label">Custom Hero Image URL (Optional)</label>
              <input
                type="text"
                className="admin-input"
                value={heroData.image || ''}
                placeholder="Leave blank to use default dashboard graphic"
                onChange={(e) => handleHeroField('image', e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSaveHero}
              disabled={savingHero}
              className="admin-btn admin-btn-primary"
              style={{ minWidth: '190px', justifyContent: 'center' }}
            >
              <Save size={16} />
              <span>{savingHero ? 'Publishing...' : 'Save & Publish to Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Search Bar for products & projects */}
      {activeTab !== 'hero_suite' && (
        <div className="admin-card" style={{ marginBottom: '1.25rem', padding: '1rem' }}>
          <div className="admin-search-box">
            <Search size={16} color="#9ca3af" />
            <input
              type="text"
              placeholder={activeTab === 'products' ? 'Search turnkey software products...' : 'Search portfolio deliveries...'}
              className="admin-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}`;

code = code.replace(oldSearch.replace(/\r?\n/g, '\r\n'), newSearch.replace(/\r?\n/g, '\r\n'));

fs.writeFileSync('admin/pages/ProjectsManager.jsx', code, 'utf8');
console.log('Successfully updated ProjectsManager.jsx!');

