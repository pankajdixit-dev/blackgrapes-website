import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Code2, 
  Building2, 
  FileCheck2, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Cpu, 
  Zap, 
  HelpCircle,
  ExternalLink,
  Laptop,
  Briefcase
} from 'lucide-react';
import ServicesBranch from '../components/ServicesBranch';
import HoneycombIndustries from '../components/HoneycombIndustries';
import ClockPhilosophy from '../components/ClockPhilosophy';
import ServiceModal from '../components/ServiceModal';
import ServiceEstimator from '../components/ServiceEstimator';
import '../styles/Services.css';

// All Services Data
const servicesData = [
  // Category 1: IT & Softech
  {
    id: 'softech-custom-erp',
    category: 'softech',
    categoryName: 'Black Grapes Softech',
    icon: '💻',
    title: 'Custom Enterprise Software & ERP Systems',
    tagline: 'Streamline operations with tailored, scalable enterprise platforms',
    description: 'We architect and build tailored enterprise resource planning (ERP) platforms, supply chain management systems, multi-branch billing, and workflow automation suites built around your exact business logic.',
    detailedDescription: 'Our software engineering team specializes in replacing clunky legacy workflows with high-velocity, reactive web and desktop enterprise software. From multi-warehouse inventory tracking and automated invoice generation to role-based access control and real-time executive analytics dashboards, Black Grapes Softech builds platforms that scale without license limits.',
    deliverables: [
      'Custom ERP & CRM workflow automation engines',
      'Multi-branch inventory, billing & GST-ready invoicing',
      'Granular Role-Based Access Control (RBAC) & audit logs',
      'High-throughput RESTful / GraphQL API architectures',
      'Interactive executive dashboards with real-time KPI metrics'
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Microservices', 'AWS Cloud'],
    turnaround: '4 - 10 Weeks',
    compliance: 'ISO 27001 & Data Protection Compliant',
    deliverablesCount: 'Full-Scale Enterprise Platform',
    featured: true
  },
  {
    id: 'softech-mlm',
    category: 'softech',
    categoryName: 'Black Grapes Softech',
    icon: '⚡',
    title: 'Specialized MLM & Direct Selling Platform',
    tagline: 'High-security multi-level marketing & network commissions platform',
    description: 'Battle-tested multi-level marketing software supporting Binary, Matrix, Generation, Unilevel, and Board plans with automated payout cycles, secure e-wallet systems, and member genealogy trees.',
    detailedDescription: 'Black Grapes Softech is an acknowledged market leader in custom MLM software development. We design ultra-secure, tamper-proof network marketing platforms with real-time genealogy tree rendering, auto-calculated TDS and admin deductions, member e-wallets, payment gateway integration, and multi-tier fraud prevention.',
    deliverables: [
      'Supports Binary, Matrix, Board, Unilevel & Hybrid commission plans',
      'Dynamic genealogy tree visualizer with real-time member downlines',
      'Automated payout calculation with TDS & service charge deductions',
      'E-Pin generation, franchise management & member KYC processing',
      'Mobile-responsive member dashboard and dedicated administrator back-office'
    ],
    tags: ['MLM Architecture', 'Secure E-Wallet', 'Payment Gateways', 'SMS & WhatsApp APIs'],
    turnaround: '2 - 4 Weeks',
    compliance: 'Direct Selling Guidelines & Cyber Law Compliant',
    deliverablesCount: 'Complete MLM Ecosystem',
    featured: true
  },
  {
    id: 'softech-web-cloud',
    category: 'softech',
    categoryName: 'Black Grapes Softech',
    icon: '🌐',
    title: 'Web & Cloud Platform Engineering',
    tagline: 'Modern, high-conversion web applications & client portals',
    description: 'Bespoke web applications, high-performance customer portals, and headless e-commerce solutions engineered with lightning-fast load speeds, responsive UX, and scalable cloud architectures.',
    detailedDescription: 'We deliver full-stack cloud software crafted to empower digital growth. Whether you are launching a SaaS startup, a consumer portal, or a complex database-driven web application, we guarantee frictionless user journeys, high SEO performance, and modular codebases.',
    deliverables: [
      'Next.js / React single-page & server-rendered applications',
      'Progressive Web Apps (PWA) with offline capabilities',
      'Secure multi-vendor e-commerce & marketplace architectures',
      'Headless CMS integrations & content authoring pipelines',
      'Cloud deployment with automated CI/CD DevOps workflows'
    ],
    tags: ['React 19', 'Next.js', 'Tailwind', 'Cloudflare', 'Docker'],
    turnaround: '3 - 6 Weeks',
    compliance: 'WCAG Accessibility & OWASP Security',
    deliverablesCount: 'Turnkey Web Application'
  },
  {
    id: 'softech-mobile-apps',
    category: 'softech',
    categoryName: 'Black Grapes Softech',
    icon: '📱',
    title: 'Mobile App Development (iOS & Android)',
    tagline: 'Feature-rich native & cross-platform applications',
    description: 'High-performance mobile applications engineered with React Native and Flutter. We blend smooth animations, biometric authentication, offline sync, and frictionless transactional flows.',
    detailedDescription: 'Empower your customers and field workforce with intuitive mobile apps that boast 60fps animations, intuitive navigation, push messaging automation, and secure payment processing. We handle the entire lifecycle from UI/UX wireframing to Google Play Store & Apple App Store approval.',
    deliverables: [
      'Cross-platform iOS and Android builds from a unified code base',
      'Biometric authentication (Fingerprint / Face ID) & encryption',
      'Interactive push notifications & Firebase cloud messaging',
      'Offline data caching & SQLite local synchronization',
      'End-to-end App Store & Play Store publication assistance'
    ],
    tags: ['Flutter', 'React Native', 'Firebase', 'REST APIs', 'App Store SEO'],
    turnaround: '4 - 8 Weeks',
    compliance: 'App Store Review Guidelines & GDPR',
    deliverablesCount: 'Dual OS Production Mobile App'
  },
  {
    id: 'softech-tenders',
    category: 'softech',
    categoryName: 'Black Grapes Softech',
    icon: '📑',
    title: 'Private Tender & Bid Management Services',
    tagline: 'Strategic assistance for e-tendering, proposals & compliance',
    description: 'Comprehensive tender discovery, proposal preparation, technical compliance documentation, digital signature setup, and strategic bid submission for government and private enterprise contracts.',
    detailedDescription: 'Navigating procurement portals and tender bidding requires exact compliance with technical specifications and stringent deadlines. Our dedicated tender consulting wing performs opportunity evaluation, document auditing, technical proposal drafting, and digital submission on GeM (Government e-Marketplace) and private tender portals.',
    deliverables: [
      'Tender opportunity tracking & eligibility feasibility analysis',
      'Technical proposal authoring & compliance matrix alignment',
      'Class 3 Digital Signature Certificate (DSC) support & portal registration',
      'Financial bid optimization & documentation auditing',
      'Pre-bid meeting representation & query formulation'
    ],
    tags: ['GeM Portal', 'E-Procurement', 'Technical Bidding', 'Compliance Matrix'],
    turnaround: '1 - 2 Weeks per Bid',
    compliance: 'Government Procurement Norms',
    deliverablesCount: 'Compliant Bid Submission'
  },
  {
    id: 'softech-seo-branding',
    category: 'softech',
    categoryName: 'Black Grapes Softech',
    icon: '🚀',
    title: 'Digital Marketing & Growth Engine',
    tagline: 'High-intent lead generation, SEO ranking & corporate branding',
    description: 'Performance marketing campaigns, technical SEO audits, social media authority building, and content strategies engineered to drive organic inquiries and revenue growth.',
    detailedDescription: 'Transform your brand into a market leader. We combine deep technical SEO with high-ROI Google Search & Meta ad campaigns, brand identity design, and conversion rate optimization (CRO) to maximize your digital return on investment.',
    deliverables: [
      'Comprehensive on-page, off-page & technical SEO audits',
      'High-conversion Google Search, Display & Performance Max ads',
      'Corporate brand identity, logo design & typography systems',
      'Content marketing & thought leadership distribution',
      'Transparent weekly ROI & analytics attribution reports'
    ],
    tags: ['Technical SEO', 'Google Ads', 'Meta Marketing', 'CRO', 'GA4 Analytics'],
    turnaround: 'Monthly Retainer / 3-Month Sprint',
    compliance: 'Google Webmaster Guidelines',
    deliverablesCount: 'Full Growth Campaign'
  },

  // Category 2: Valuation & Engineering
  {
    id: 'val-property',
    category: 'valuation',
    categoryName: 'Black Grapes Valuers & Engineers',
    icon: '🏢',
    title: 'Immovable Property & Asset Valuation',
    tagline: 'Government-approved valuation for land, commercial & residential assets',
    description: 'Certified asset valuation reports for residential properties, commercial towers, industrial land, and hospitality projects for bank financing, capital gains tax, solvency certificates, and acquisitions.',
    detailedDescription: 'Black Grapes Valuers & Engineers is a prestigious valuation firm with panel empanelments across leading nationalized banks, NBFCs, and financial institutions. We employ internationally recognized valuation methods (Discounted Cash Flow, Cost Approach, Market Comparable Approach) to deliver indisputable, legally sound valuation certificates.',
    deliverables: [
      'Bank finance & mortgage collateral valuation reports',
      'Capital gains tax & income tax assessment valuations',
      'Solvency certificates for visa, immigration & high-net-worth individuals',
      'Fair market value (FMV) & distress sale value (DSV) assessments',
      'Site inspection, boundary verification & GIS geo-tagging'
    ],
    tags: ['IBBI Registered Valuer', 'Bank Panel Approved', 'Income Tax Rule 11UA', 'TEV Studies'],
    turnaround: '3 - 7 Working Days',
    compliance: 'IBBI, Companies Act & Income Tax Act Standards',
    deliverablesCount: 'Official Certified Valuation Report',
    featured: true
  },
  {
    id: 'val-machinery',
    category: 'valuation',
    categoryName: 'Black Grapes Valuers & Engineers',
    icon: '⚙️',
    title: 'Plant, Machinery & Industrial Asset Valuation',
    tagline: 'Engineering assessment of industrial machinery & production lines',
    description: 'Comprehensive physical verification and technical valuation of industrial machinery, manufacturing plants, heavy equipment, and commercial vehicle fleets for insurance, liquidation, and mergers.',
    detailedDescription: 'Our chartered engineers and plant valuers perform exhaustive on-site technical audits, remaining useful life (RUL) estimation, scrap value evaluation, and replacement cost modeling for pharmaceutical, textile, engineering, and automotive plants across Central India and pan-India.',
    deliverables: [
      'Physical verification & inventory tagging of capital assets',
      'Remaining Useful Life (RUL) & depreciation modeling',
      'Reinstatement value calculation for industrial insurance coverage',
      'Asset appraisal for mergers, acquisitions (M&A) & joint ventures',
      'Court liquidation & insolvency valuation under IBC regulations'
    ],
    tags: ['Plant & Machinery', 'Chartered Engineer Audit', 'IBC 2016 Compliant', 'Asset Depreciation'],
    turnaround: '5 - 12 Working Days',
    compliance: 'Royal Institution of Chartered Surveyors (RICS) & IBBI',
    deliverablesCount: 'Technical Asset Appraisal Report'
  },
  {
    id: 'val-chartered-eng',
    category: 'valuation',
    categoryName: 'Black Grapes Valuers & Engineers',
    icon: '📜',
    title: 'Chartered Engineer (CE) Certifications & TEV',
    tagline: 'Statutory engineering certificates for customs, banks & audits',
    description: 'Chartered Engineer certificates for import/export of capital goods, EPCG authorization, structural stability reports, and Techno-Economic Viability (TEV) studies for project funding.',
    detailedDescription: 'Possessing authoritative Chartered Engineer credentials from the Institution of Engineers (India), we provide statutory certificates required by Indian Customs, DGFT, pollution control boards, and commercial banks evaluating multimillion-rupee project finances.',
    deliverables: [
      'Customs clearance certificates for imported second-hand machinery',
      'EPCG scheme fulfillment & project import validation',
      'Techno-Economic Viability (TEV) reports for consortium bank loans',
      'Industrial building structural stability & factory inspection certificates',
      'Physical completion & project progress certification for fund release'
    ],
    tags: ['Chartered Engineer', 'IEI Certified', 'DGFT & Customs', 'TEV Feasibility'],
    turnaround: '3 - 5 Working Days',
    compliance: 'Statutory IEI & Ministry of Commerce Regulations',
    deliverablesCount: 'Statutory Signed & Sealed Certificate'
  },

  // Category 3: Corporate, Legal & Municipal Advisory
  {
    id: 'adv-municipal',
    category: 'advisory',
    categoryName: 'Black Grapes Associates',
    icon: '🏛️',
    title: 'Municipal & IDA Sanctions (Naksha Pass)',
    tagline: 'Building map approvals, lease renewals & regularizations',
    description: 'Hassle-free architectural map sanctioning with Indore Municipal Corporation (Nagar Nigam), IDA lease deed renewals, colony cell regularizations, and development permissions.',
    detailedDescription: 'Black Grapes Associates represents businesses and property owners before local civic authorities. We eliminate bureaucratic red tape by handling structural drawings approval, FAR/FSI calculations, fire safety NOCs, Indore Development Authority (IDA) leasehold-to-freehold transfers, and colony layout regularizations.',
    deliverables: [
      'Indore Nagar Nigam building map sanction (Online / Offline Naksha Pass)',
      'IDA lease renewals, name transfer & ownership endorsements',
      'Colony cell file clearance & layout regularization (Vaidhikaran)',
      'Fire NOC & environmental clearance liaison',
      'Building completion certificate (CC) & occupancy certificate (OC)'
    ],
    tags: ['Nagar Nigam Indore', 'IDA Compliant', 'Bhoomi Vikas Niyam', 'Fire Safety NOC'],
    turnaround: '2 - 4 Weeks',
    compliance: 'Madhya Pradesh Nagar Palika Adhiniyam & IDA Norms',
    deliverablesCount: 'Authorized Sanction Order',
    featured: true
  },
  {
    id: 'adv-licensing',
    category: 'advisory',
    categoryName: 'Black Grapes Associates',
    icon: '📋',
    title: 'Industrial Licensing & Trade Compliance',
    tagline: 'One-stop corporate licensing for factories, pharma & food businesses',
    description: 'Procurement of vital business operating licenses including FSSAI food licenses, Factory Act approvals, Drug & Cosmetic licenses, MPPCB pollution consent, and Gumasta trade permits.',
    detailedDescription: 'Launch and run your enterprise without regulatory bottlenecks. We manage documentation, on-site inspection readiness, laboratory test report compliance, and legal filings for all primary state and central statutory operating licenses.',
    deliverables: [
      'Food Safety (FSSAI) State & Central license procurement',
      'Drug & Cosmetic wholesale/retail pharmacy licenses',
      'Factory Act registration & industrial safety plans approval',
      'MPPCB Consent to Establish (CTE) & Consent to Operate (CTO)',
      'Shops and Establishments (Gumasta) & MSME Udyam registration'
    ],
    tags: ['FSSAI', 'MPPCB Pollution NOC', 'Factory License', 'Gumasta Registration'],
    turnaround: '10 - 20 Working Days',
    compliance: 'State & Central Industrial Licensing Acts',
    deliverablesCount: 'Government Licensed Certificate'
  },
  {
    id: 'adv-revenue',
    category: 'advisory',
    categoryName: 'Black Grapes Associates',
    icon: '📑',
    title: 'Land Diversion, Registry & Title Verification',
    tagline: 'Comprehensive property documentation & land revenue legalities',
    description: 'Sub-Divisional Magistrate (SDM) land diversion orders, Nazul clearance, 30-year property title search reports, registry drafting, stamp duty vending, and collectorate documentation.',
    detailedDescription: 'Secure your real estate investments against litigation and revenue encumbrances. Our legal and revenue specialists examine 30-year revenue records, khasra-khatoni documents, diversion orders for agricultural to commercial conversion, and oversee hassle-free registry execution.',
    deliverables: [
      'Agricultural to Commercial/Residential land diversion orders',
      '30-year comprehensive property title search & non-encumbrance reports',
      'Property sale deed, lease agreement drafting & electronic stamp vending',
      'Mutation (Naamantran) in revenue records and municipal registers',
      'Collectorate office certificate processing (Income, Caste, Domicile)'
    ],
    tags: ['Revenue Code', 'MPLR Code 1959', 'Land Diversion', 'Title Search'],
    turnaround: '2 - 3 Weeks',
    compliance: 'Registration Act 1908 & MP Land Revenue Code',
    deliverablesCount: 'Clear Title & Registered Deed'
  },

  // Category 4: Real Estate & Investments
  {
    id: 're-commercial',
    category: 'realestate',
    categoryName: 'Black Grapes Real Estate',
    icon: '🏙️',
    title: 'Commercial Real Estate Advisory & Broking',
    tagline: 'Prime office spaces, retail showrooms & commercial investments',
    description: 'End-to-end commercial property advisory across Indore’s high-growth corridors (Vijay Nagar, AB Road, Super Corridor, Bypass). We assist corporates and investors with acquisition, leasing, and high-yield asset scouting.',
    detailedDescription: 'Black Grapes Real Estate delivers unmatched localized insights into Indore and Central India commercial properties. We help corporate tenants identify optimal workspaces and guide high-net-worth investors toward rental-yielding commercial shops, office floors, and corporate plots with clear titles.',
    deliverables: [
      'Corporate office space leasing & retail showroom acquisition',
      'High-yield pre-leased commercial property investment portfolios',
      'Tenant representation, lease contract structuring & price negotiation',
      'Due diligence on builder reputations, RERA registrations & sanction status',
      'Comprehensive market appreciation and return on investment (ROI) forecasts'
    ],
    tags: ['RERA Compliant', 'Commercial Leasing', 'Indore Real Estate', 'High Yield Assets'],
    turnaround: 'Active Portfolio Scouting',
    compliance: 'RERA (Real Estate Regulatory Authority) Compliant',
    deliverablesCount: 'Transaction & Closing Advisory'
  },
  {
    id: 're-land',
    category: 'realestate',
    categoryName: 'Black Grapes Real Estate',
    icon: '🗺️',
    title: 'Strategic Land Acquisition & Industrial Estates',
    tagline: 'Large parcels for warehousing, logistics parks & township development',
    description: 'Turnkey land aggregation, industrial plot procurement in Pithampur, Sanwer Road, and Super Corridor, combined with complete regulatory clearance and infrastructure feasibility.',
    detailedDescription: 'For developers, manufacturers, and logistics giants expanding in Central India, Black Grapes Real Estate manages complex land parcel scouting, title aggregation, farmer settlements, and infrastructure connectivity analysis to ensure zero post-acquisition legal hurdles.',
    deliverables: [
      'Multi-acre land aggregation for logistics parks & township projects',
      'Industrial plots in MPIDC hubs (Pithampur, Kheda, Smart Industrial Park)',
      'Topographical survey, water, power & highway connectivity assessment',
      'Complete title verification and settlement negotiations with landowners',
      'Post-purchase mutation and boundary demarcation management'
    ],
    tags: ['Land Aggregation', 'Industrial Corridor', 'MPIDC Plots', 'Warehousing'],
    turnaround: 'Project-Specific Timeline',
    compliance: 'MPIDC & Industrial Land Allocation Norms',
    deliverablesCount: 'Turnkey Land Acquisition'
  }
];

// FAQs Data
const faqsData = [
  {
    question: 'How is Black Grapes structured like the 04 O\'Clock technology model?',
    answer: 'Just like 04 O\'Clock Technologies, we combine deep domain specialization with cross-functional execution. From bespoke software engineering and cloud infrastructure to statutory IBBI asset valuations and municipal clearance, our integrated architecture eliminates vendor disconnects and delivers zero technical debt.'
  },
  {
    question: 'Are your valuation reports accepted by nationalized and private banks?',
    answer: 'Yes, absolutely. Black Grapes Valuers & Engineers are registered with the Insolvency and Bankruptcy Board of India (IBBI) and the Institution of Valuers. Our valuation certificates and Techno-Economic Viability (TEV) reports are accepted by major public sector banks, private banks, NBFCs, and judicial bodies across India.'
  },
  {
    question: 'How does Black Grapes Softech handle custom software and MLM platforms?',
    answer: 'Our software engineering follows rigorous modern standards. Every project starts with a detailed Business Requirement Document (BRD) and UI/UX wireframing. For MLM platforms, we implement bank-grade encryption, automated payout logic with tax deductions, real-time downline genealogy visualizers, and anti-fraud mechanics.'
  },
  {
    question: 'Can you assist with Municipal Naksha Pass and IDA sanctions in Indore?',
    answer: 'Yes! Black Grapes Associates specializes in navigating municipal processes in Indore. We manage Indore Municipal Corporation (IMC / Nagar Nigam) online map sanctions, IDA lease renewals and endorsements, colony cell regularizations, and town planning permissions.'
  },
  {
    question: 'How quickly can I receive a project proposal or quotation?',
    answer: 'For standard valuations and statutory licensing, our team typically provides an initial quote and documentation checklist within 2 to 4 business hours. For custom software engineering, ERPs, and large-scale advisory, our solutions architects prepare a detailed proposal and scope breakdown within 24 to 48 hours.'
  },
  {
    question: 'Do you provide services outside of Indore / Madhya Pradesh?',
    answer: 'Yes. Our IT & Softech wing operates globally serving domestic and international clients. Our Valuation, TEV, and Chartered Engineering services cover pan-India mandates, while our property broking and municipal sanctions specifically anchor Central India and Madhya Pradesh.'
  }
];

export default function ServicesPage({ onOpenInquiry }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Sync category param with URL
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Filtered services for the full directory
  const filteredServices = useMemo(() => {
    return servicesData.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query)) ||
        item.categoryName.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Handle service selection from 4 O'Clock branch component
  const handleSelectFromBranch = (serviceTitle) => {
    const match = servicesData.find(s => s.title.toLowerCase().includes(serviceTitle.toLowerCase()) || serviceTitle.toLowerCase().includes(s.title.toLowerCase()));
    if (match) {
      setSelectedService(match);
    } else if (onOpenInquiry) {
      onOpenInquiry(serviceTitle);
    }
  };

  return (
    <div className="services-page-root animate-fade-in">
      {/* 4 O'Clock Signature Page Hero Section */}
      <section className="services-hero-section">
        <div className="container services-hero-container">
          <div className="services-hero-badge">
            <span className="badge-pill">ENTERPRISE SERVICES &bull; 04 O'CLOCK NETWORK</span>
          </div>

          <h1 className="services-hero-title">
            TECHNOLOGY SOLUTIONS BUILT FOR <span className="gradient-gold-text">WHAT'S NEXT</span>
          </h1>

          <p className="services-hero-desc">
            From web &amp; mobile software engineering to specialized MLM platforms, bank-empaneled asset valuations, and statutory municipal clearances, we deliver high-value technology solutions tailored for business scale.
          </p>

          <div className="services-hero-actions">
            <a href="#branch-network" className="btn-primary">
              <Sparkles size={18} />
              <span>Explore Capability Network</span>
              <ArrowRight size={18} />
            </a>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => onOpenInquiry && onOpenInquiry('General Architecture Consultation')}
            >
              <span>Schedule Strategy Call</span>
            </button>
          </div>

          {/* Unique Feature Highlight Badges */}
          <div className="hero-feature-chips">
            <span className="hero-chip">
              <Zap size={14} className="chip-icon" />
              <span>Interactive SVG Network</span>
            </span>
            <span className="hero-chip">
              <Layers size={14} className="chip-icon" />
              <span>11 Industry Domains</span>
            </span>
            <span className="hero-chip">
              <ShieldCheck size={14} className="chip-icon" />
              <span>IBBI &amp; ISO 27001 Certified</span>
            </span>
            <span className="hero-chip">
              <Clock size={14} className="chip-icon" />
              <span>Punctual Turnarounds</span>
            </span>
          </div>

          {/* Floating Section Quick-Bar */}
          <div className="floating-quick-bar">
            <a href="#branch-network" className="quick-pill-link">
              <span className="quick-pill-dot"></span>
              <span>Hub Network</span>
            </a>
            <a href="#industries" className="quick-pill-link">
              <span>Industries</span>
            </a>
            <a href="#brand-philosophy" className="quick-pill-link">
              <span>Philosophy</span>
            </a>
            <a href="#estimator" className="quick-pill-link">
              <span>Squad Estimator</span>
            </a>
            <a href="#services-grid" className="quick-pill-link">
              <span>All 12 Services</span>
            </a>
          </div>

          {/* Metrics Counter Bar */}
          <div className="services-stats-bar">
            <div className="stat-box">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years of Group Legacy</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-number">1,200+</span>
              <span className="stat-label">Successful Deliverables</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-number">99.4%</span>
              <span className="stat-label">Client Retention &amp; Trust</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-number">50+</span>
              <span className="stat-label">Engineers &amp; Empaneled Valuers</span>
            </div>
          </div>
        </div>
      </section>

      {/* 1. SIGNATURE 04 O'CLOCK RADIAL BRANCH NETWORK */}
      <div id="branch-network">
        <ServicesBranch 
          onSelectService={handleSelectFromBranch}
          onOpenInquiry={onOpenInquiry}
        />
      </div>

      {/* 2. SIGNATURE 04 O'CLOCK INTERLOCKING HONEYCOMB MATRIX ("INDUSTRIES WE SERVE") */}
      <HoneycombIndustries 
        onOpenInquiry={onOpenInquiry}
      />

      {/* 3. SIGNATURE 04 O'CLOCK LUXURY CLOCK PHILOSOPHY SECTION */}
      <ClockPhilosophy />

      {/* 4. COMPREHENSIVE FULL SERVICE DIRECTORY WITH SEARCH & FILTER TABS */}
      <section className="services-explorer-section" id="services-grid">
        <div className="container">
          <div className="section-head text-center" style={{ marginBottom: '2.5rem' }}>
            <span className="badge-pill">COMPREHENSIVE DIRECTORY</span>
            <h2 className="section-title">
              Granular Service <span className="gradient-gold-text">Specifications &amp; Scope</span>
            </h2>
            <p className="section-desc">
              Filter by department or search specific technologies, certifications, and deliverables.
            </p>
          </div>

          {/* Controls Bar: Search + Category Tabs */}
          <div className="services-controls-card glass-card">
            {/* Search Input */}
            <div className="services-search-wrapper">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search services (e.g. ERP, Valuation, MLM, Naksha Pass, Mobile App, Tender)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="category-tabs-group">
              <button 
                type="button" 
                className={`category-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('all')}
              >
                <span>All Capabilities</span>
                <span className="category-counter">{servicesData.length}</span>
              </button>

              <button 
                type="button" 
                className={`category-tab-btn ${activeCategory === 'softech' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('softech')}
              >
                <Code2 size={16} />
                <span>IT &amp; Softech</span>
                <span className="category-counter">
                  {servicesData.filter(s => s.category === 'softech').length}
                </span>
              </button>

              <button 
                type="button" 
                className={`category-tab-btn ${activeCategory === 'valuation' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('valuation')}
              >
                <Building2 size={16} />
                <span>Valuation &amp; Engg</span>
                <span className="category-counter">
                  {servicesData.filter(s => s.category === 'valuation').length}
                </span>
              </button>

              <button 
                type="button" 
                className={`category-tab-btn ${activeCategory === 'advisory' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('advisory')}
              >
                <FileCheck2 size={16} />
                <span>Advisory &amp; Legal</span>
                <span className="category-counter">
                  {servicesData.filter(s => s.category === 'advisory').length}
                </span>
              </button>

              <button 
                type="button" 
                className={`category-tab-btn ${activeCategory === 'realestate' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('realestate')}
              >
                <TrendingUp size={16} />
                <span>Real Estate</span>
                <span className="category-counter">
                  {servicesData.filter(s => s.category === 'realestate').length}
                </span>
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="results-meta-bar">
            <span>Showing <strong>{filteredServices.length}</strong> specialized services</span>
            {searchQuery && (
              <span className="active-filter-badge">
                Filtering by: "{searchQuery}"
              </span>
            )}
          </div>

          {/* Services Cards Grid */}
          {filteredServices.length === 0 ? (
            <div className="empty-results-box glass-card">
              <p>No services matched your search criteria. Try a different keyword or reset filters.</p>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('all');
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="services-cards-grid">
              {filteredServices.map((service) => (
                <div 
                  key={service.id} 
                  className={`service-card glass-card ${service.featured ? 'featured-card' : ''}`}
                >
                  {service.featured && (
                    <div className="featured-ribbon">
                      <Sparkles size={13} />
                      <span>Top Mandate</span>
                    </div>
                  )}

                  <div className="card-top">
                    <div className="card-icon-bubble">
                      <span>{service.icon}</span>
                    </div>
                    <div className="card-dept-meta">
                      <span className="card-dept-badge">{service.categoryName}</span>
                      <span className="card-live-pill">
                        <span className="live-dot-ping"></span>
                        <span>{service.turnaround}</span>
                      </span>
                    </div>
                  </div>

                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-tagline">{service.tagline}</p>
                  <p className="card-desc">{service.description}</p>

                  {/* Bullet Highlights */}
                  <div className="card-bullets">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="card-bullet-row">
                        <CheckCircle2 size={15} className="bullet-check" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="card-tags-row">
                    {service.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="mini-tag">{tag}</span>
                    ))}
                    {service.tags.length > 3 && (
                      <span className="mini-tag-more">+{service.tags.length - 3}</span>
                    )}
                  </div>

                  {/* Card Action Buttons */}
                  <div className="card-actions-row">
                    <button 
                      type="button" 
                      className="btn-secondary card-details-btn"
                      onClick={() => setSelectedService(service)}
                    >
                      <span>Explore Details</span>
                      <ExternalLink size={14} />
                    </button>
                    <button 
                      type="button" 
                      className="btn-primary card-inquire-btn"
                      onClick={() => onOpenInquiry && onOpenInquiry(service.title)}
                    >
                      <span>Enquire</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. INTERACTIVE PROJECT SCOPE & TURNAROUND ESTIMATOR */}
      <section className="services-estimator-section">
        <div className="container">
          <ServiceEstimator 
            onInquireEstimate={(summary) => {
              if (onOpenInquiry) {
                onOpenInquiry(`Configured Scope: ${summary}`);
              }
            }} 
          />
        </div>
      </section>

      {/* 6. FAQ ACCORDION SECTION */}
      <section className="faqs-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="badge-pill">❓ COMMON QUESTIONS</span>
            <h2 className="section-title">
              Frequently Asked <span className="gradient-gold-text">Questions</span>
            </h2>
            <p className="section-desc">
              Everything you need to know about our technology, valuation, and municipal deliverables.
            </p>
          </div>

          <div className="faqs-accordion-list">
            {faqsData.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className={`faq-card glass-card ${isOpen ? 'open' : ''}`}
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                >
                  <div className="faq-question-row">
                    <span className="faq-q-text">{faq.question}</span>
                    <button type="button" className="faq-toggle-icon" aria-label="Toggle answer">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  {isOpen && (
                    <div className="faq-answer-row animate-fade-in">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. SIGNATURE 04 O'CLOCK CTA BANNER */}
      <section className="services-bottom-cta">
        <div className="container">
          <div className="cta-banner glass-card">
            <div className="cta-banner-inner">
              <span className="badge-pill">🚀 TIME TO TRANSFORM</span>
              <h3>Need a Custom Solution for Your Business?</h3>
              <p>
                Contact our engineering and advisory team to map out a clear technical proposal, architecture blueprint, or valuation timeline.
              </p>
              <button 
                type="button" 
                className="btn-primary cta-action-btn"
                onClick={() => onOpenInquiry && onOpenInquiry('Custom Solution Request')}
              >
                <span>Start a Project with 04 O'Clock Standards</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Modal (When user clicks Explore Details) */}
      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)}
          onSelectForInquiry={(serviceName) => {
            if (onOpenInquiry) onOpenInquiry(serviceName);
          }}
        />
      )}
    </div>
  );
}
