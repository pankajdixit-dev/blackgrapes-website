// Black Grapes Softech - Comprehensive Enterprise Services Dataset
// Source: https://blackgrapessoftech.com/services/

export const softechCategories = [
  { id: 'all', label: 'All Services', icon: 'Layers' },
  { id: 'web', label: 'Web & Cloud', icon: 'Globe' },
  { id: 'mobile', label: 'Mobile Apps', icon: 'Smartphone' },
  { id: 'software', label: 'Custom Software', icon: 'Code2' },
  { id: 'enterprise', label: 'CRM & MLM ERP', icon: 'Database' },
  { id: 'marketing', label: 'Digital Marketing', icon: 'TrendingUp' },
  { id: 'design', label: 'UI/UX & Branding', icon: 'Palette' },
  { id: 'gaming', label: 'Game Development', icon: 'Gamepad2' },
  { id: 'tenders', label: 'Tenders & Staffing', icon: 'Briefcase' }
];

export const softechServices = [
  {
    id: 'web-development',
    number: '01',
    title: 'Website Designing and Development',
    tagline: 'High-Speed Modern Web Applications & Portals',
    category: 'web',
    categoryLabel: 'Web & Cloud',
    badge: 'Popular',
    image: '/softech-services/web.jpg',
    url: 'https://blackgrapessoftech.com/services/web-designing-and-development/',
    description: 'We architect and build hyper-performant web applications, corporate web portals, and enterprise SaaS platforms with modern MERN architecture, responsive UI/UX, and sub-second load times.',
    keyDeliverables: [
      'Custom React, Next.js & Full-Stack MERN engineering',
      'Ultra-responsive UI/UX designed with mobile-first principles',
      'SEO-optimized semantic code adhering to Core Web Vitals < 1s',
      'REST & GraphQL API integration with cloud-native caching'
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'MongoDB', 'AWS'],
    accentColor: '#f86200',
    timeline: '3 - 6 Weeks',
    clientTypes: 'Startups, SMEs, E-Commerce Brands, Corporate Enterprises'
  },
  {
    id: 'mobile-app-development',
    number: '02',
    title: 'Mobile Application Development',
    tagline: 'Native iOS & Android and Cross-Platform Apps',
    category: 'mobile',
    categoryLabel: 'Mobile Apps',
    badge: 'Trending',
    image: '/softech-services/app.jpg',
    url: 'https://blackgrapessoftech.com/services/mobile-app-development/',
    description: 'Turnkey mobile application development delivering smooth 60fps performance, offline sync, real-time push notifications, payment gateways, and biometric security for Android and iOS.',
    keyDeliverables: [
      'Cross-platform Flutter & React Native app engineering',
      'Native Swift (iOS) & Kotlin (Android) architecture',
      'Real-time WebSocket notifications & cloud database sync',
      'End-to-end App Store & Google Play publishing compliance'
    ],
    techStack: ['Flutter', 'React Native', 'Kotlin', 'Swift', 'Firebase', 'GraphQL'],
    accentColor: '#8b5cf6',
    timeline: '4 - 10 Weeks',
    clientTypes: 'Fintech, Healthcare, On-Demand Delivery, EdTech'
  },
  {
    id: 'software-development',
    number: '03',
    title: 'Custom Software Development',
    tagline: 'Tailored Enterprise Automation & Microservices',
    category: 'software',
    categoryLabel: 'Custom Software',
    badge: 'Enterprise',
    image: '/softech-services/software.jpg',
    url: 'https://blackgrapessoftech.com/services/software-development-2/',
    description: 'Bespoke enterprise software designed to automate complex operations, connect fragmented workflows, and eliminate manual bottlenecks with secure microservices and robust database architectures.',
    keyDeliverables: [
      'Custom workflow automation engines & business logic layers',
      'High-throughput microservices built on Node.js and Python',
      'Enterprise database architecture with automated failover',
      'Role-based access control (RBAC) and immutable audit logging'
    ],
    techStack: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'Redis', 'Kubernetes'],
    accentColor: '#06b6d4',
    timeline: '6 - 14 Weeks',
    clientTypes: 'Manufacturing, Distributors, Multi-Branch Businesses'
  },
  {
    id: 'crm-software-development',
    number: '04',
    title: 'CRM Software Development',
    tagline: 'Intelligent Lead Pipelines & Sales Automation',
    category: 'enterprise',
    categoryLabel: 'CRM & MLM ERP',
    badge: 'High ROI',
    image: '/softech-services/crm.png',
    url: 'https://blackgrapessoftech.com/services/crm-software-development/',
    description: 'Purpose-built Customer Relationship Management systems with real-time sales funnels, automated omnichannel communications (WhatsApp, Email, SMS), role-based permissions, and executive KPI dashboards.',
    keyDeliverables: [
      'Multi-channel lead capture & automated assignment routing',
      'WhatsApp Business API, SMS & Email drip automation triggers',
      'Interactive executive KPI reports & revenue conversion analytics',
      'Complete client interaction timeline & document storage'
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'Meta API'],
    accentColor: '#10b981',
    timeline: '4 - 8 Weeks',
    clientTypes: 'Real Estate Builders, B2B Sales, Financial Consultants'
  },
  {
    id: 'mlm-software-development',
    number: '05',
    title: 'MLM Software Development',
    tagline: 'Automated Binary, Matrix & Generation Plans',
    category: 'enterprise',
    categoryLabel: 'CRM & MLM ERP',
    badge: 'Specialized',
    image: '/softech-services/mlm.png',
    url: 'https://blackgrapessoftech.com/services/mlm-software-development/',
    description: 'High-security Multi-Level Marketing software supporting Binary, Matrix, Unilevel, and Hybrid compensation plans with automated genealogy calculation, instant payout processing, and digital wallets.',
    keyDeliverables: [
      'Visual interactive genealogy tree explorer with zoom navigation',
      'Automated commission calculation engine with multi-tier rules',
      'Multi-wallet member dashboard (Payout, E-Pin, Shopping Wallet)',
      'Bank withdrawal module with automated TDS & GST deduction'
    ],
    techStack: ['Node.js', 'MongoDB', 'React', 'Payment Gateways', 'Encryption'],
    accentColor: '#ec4899',
    timeline: '3 - 6 Weeks',
    clientTypes: 'Direct Selling Enterprises, Product Network Marketers'
  },
  {
    id: 'digital-marketing',
    number: '06',
    title: 'Digital Marketing & Growth',
    tagline: 'High-Intent SEO & Performance Advertising',
    category: 'marketing',
    categoryLabel: 'Digital Marketing',
    badge: 'Growth Engine',
    image: '/softech-services/marketing.jpg',
    url: 'https://blackgrapessoftech.com/services/digital-marketing/',
    description: 'Scale your online brand authority and acquire qualified customer leads through precision Google Ads PPC, high-converting Meta performance campaigns, data-driven technical SEO, and conversion rate optimization.',
    keyDeliverables: [
      'Comprehensive on-page & off-page authoritative SEO roadmap',
      'High-ROI Google Search, Display & Performance Max campaigns',
      'Meta (Facebook & Instagram) ads with hyper-targeted audience funnels',
      'Conversion rate optimization (CRO) & live attribution tracking'
    ],
    techStack: ['Google Ads', 'GA4', 'Meta Ads', 'SEMrush', 'HubSpot', 'Hotjar'],
    accentColor: '#f59e0b',
    timeline: 'Monthly Sprints',
    clientTypes: 'B2B Services, D2C Brands, Real Estate, Healthcare'
  },
  {
    id: 'graphic-designing',
    number: '07',
    title: 'Graphic Designing & Brand Identity',
    tagline: 'Strategic Visual Identity & UI/UX Systems',
    category: 'design',
    categoryLabel: 'UI/UX & Branding',
    badge: 'Creative',
    image: '/softech-services/graphic.jpg',
    url: 'https://blackgrapessoftech.com/services/graphic-designing/',
    description: 'Crafting unforgettable corporate identities that communicate credibility. From logo design kits and marketing creatives to complete Figma UI/UX design systems and interactive prototypes.',
    keyDeliverables: [
      'Corporate logo design, color typography & brand guideline book',
      'High-fidelity web & mobile app UI/UX prototypes in Figma',
      'High-converting social media creatives & promotional campaign assets',
      'Print collateral: business cards, corporate brochures & pitch decks'
    ],
    techStack: ['Figma', 'Adobe Photoshop', 'Illustrator', 'After Effects', 'Canva Pro'],
    accentColor: '#a855f7',
    timeline: '1 - 3 Weeks',
    clientTypes: 'New Ventures, Rebranding Enterprises, Consumer Brands'
  },
  {
    id: 'game-development',
    number: '08',
    title: 'Game & 3D Interactive Development',
    tagline: 'Immersive 2D/3D Games & WebGL Simulations',
    category: 'gaming',
    categoryLabel: 'Game Development',
    badge: 'Immersive',
    image: '/softech-services/game.jpg',
    url: 'https://blackgrapessoftech.com/services/game-development/',
    description: 'Developing captivating casual mobile games, multiplayer platforms, and 3D browser simulations utilizing Unity 3D and WebGL to create memorable interactive brand engagement.',
    keyDeliverables: [
      'Multiplatform casual 2D and 3D game mechanics engineering',
      'Real-time multiplayer server synchronization & leaderboards',
      'Custom 2D/3D sprite modeling, animation, and spatial audio design',
      'In-game monetization, rewards engine, and ad network integration'
    ],
    techStack: ['Unity 3D', 'C#', 'WebGL', 'Three.js', 'Blender', 'Photon Engine'],
    accentColor: '#6366f1',
    timeline: '8 - 16 Weeks',
    clientTypes: 'Gaming Studios, EdTech, Gamified Brand Campaigns'
  },
  {
    id: 'tender-services',
    number: '09',
    title: 'Private & Government Tender Services',
    tagline: 'End-to-End GeM Portal & e-Procurement Bidding',
    category: 'tenders',
    categoryLabel: 'Tenders & Staffing',
    badge: 'Govt Ready',
    image: '/softech-services/tenders.jpg',
    url: 'https://blackgrapessoftech.com/private-tender-service/',
    description: 'Win high-stakes tenders without falling foul of technical disqualifications. We identify lucrative GeM and e-procurement opportunities, draft compliant technical proposals, and manage submissions.',
    keyDeliverables: [
      'GeM (Government e-Marketplace) & CPPP technical bid preparation',
      'Technical proposal drafting, BOQ analysis & compliance matrix',
      'Consortium agreements, EMD and bank guarantee facilitation',
      'Reverse auction monitoring and competitive price positioning'
    ],
    techStack: ['GeM Portal', 'CPPP', 'Bid Analytics', 'Documentation Matrix'],
    accentColor: '#14b8a6',
    timeline: 'Per Tender Schedule',
    clientTypes: 'EPC Contractors, IT Vendors, Industrial Suppliers'
  },
  {
    id: 'it-staffing',
    number: '10',
    title: 'Dedicated IT Staffing & Remote Squads',
    tagline: 'Pre-Vetted Senior Engineers Deployed in 48-72h',
    category: 'tenders',
    categoryLabel: 'Tenders & Staffing',
    badge: 'Flexible',
    image: '/softech-services/staffing.jpg',
    url: 'https://blackgrapessoftech.com/it-staffing/',
    description: 'Scale your engineering bandwidth without recruitment liability. Deploy dedicated full-stack MERN developers, mobile app engineers, DevOps architects, and UI/UX designers who report directly to your team lead.',
    keyDeliverables: [
      'Top 3% pre-screened technical talent ready to onboard in 48-72 hours',
      'Same-timezone availability & fluent sprint standup communication',
      'Zero recruitment liability, zero infrastructure overhead',
      'Instant talent replacement guarantee with flexible monthly contracts'
    ],
    techStack: ['Full-Stack MERN', 'Python', 'DevOps / AWS', 'Flutter', 'QA Automation'],
    accentColor: '#f86200',
    timeline: 'Immediate 48h Deployment',
    clientTypes: 'Tech Startups, Digital Agencies, Global Product Teams'
  }
];

export const techMatrix = [
  {
    category: 'Frontend & UI',
    tools: ['React.js', 'Next.js 15', 'Vue.js', 'Tailwind CSS', 'TypeScript', 'Redux Toolkit', 'Framer Motion']
  },
  {
    category: 'Mobile Frameworks',
    tools: ['Flutter', 'React Native', 'Kotlin (Android)', 'Swift (iOS)', 'Firebase', 'Expo']
  },
  {
    category: 'Backend & APIs',
    tools: ['Node.js', 'Express', 'Python / Django', 'Go', 'NestJS', 'GraphQL', 'REST APIs', 'WebSockets']
  },
  {
    category: 'Databases & Cache',
    tools: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Supabase', 'Elasticsearch']
  },
  {
    category: 'Cloud & DevOps',
    tools: ['AWS (EC2, S3, Lambda)', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Vercel', 'Nginx']
  }
];

export const softechStats = [
  { value: '500+', label: 'Delivered Projects', sub: 'Across 15+ Global Industries' },
  { value: '98.6%', label: 'Client Retention', sub: 'Long-term Technology Partnerships' },
  { value: '48h', label: 'Rapid Deployment', sub: 'Quick Kickoff & Sprint Initiation' },
  { value: '24/7', label: 'Enterprise SLA', sub: 'Dedicated Technical Support' }
];
