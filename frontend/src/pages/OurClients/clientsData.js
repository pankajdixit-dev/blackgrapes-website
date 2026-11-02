// Official Client Portfolio Data for Black Grapes Softech
// Extracted from https://blackgrapessoftech.com/our-clients/
// Covers all 48+ verified client brands, global regions, categories, and case studies

export const CLIENT_CATEGORIES = [
  { id: 'all', label: 'All Clients', count: 48 },
  { id: 'enterprise', label: 'Enterprise & Fortune 500', count: 8 },
  { id: 'ai-tech', label: 'AI, Web3 & Tech Startups', count: 12 },
  { id: 'fintech', label: 'FinTech & Banking', count: 8 },
  { id: 'healthcare', label: 'Healthcare & MedTech', count: 5 },
  { id: 'ecommerce', label: 'E-Commerce & Retail', count: 6 },
  { id: 'it-partners', label: 'Global IT Agencies & Partners', count: 9 }
];

export const CLIENT_METRICS = [
  { number: '150+', label: 'Global Clients Served', highlight: 'Startups to Fortune 500' },
  { number: '15+', label: 'Countries Worldwide', highlight: 'US, UK, Japan, EU, UAE, India' },
  { number: '99%', label: 'Client Retention Rate', highlight: 'Multi-Year Partnerships' },
  { number: '250+', label: 'Digital Products Deployed', highlight: '100% On-Time Delivery' }
];

export const CLIENTS_LIST = [
  // Enterprise & Fortune 500
  {
    id: 'alphabet',
    name: 'Alphabet',
    category: 'enterprise',
    industry: 'Technology & Cloud',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Alphabet.png',
    badge: 'Fortune 500',
    badgeColor: 'orange',
    services: 'Cloud Data Engineering & Microservices Architecture',
    impact: 'High-availability data pipelines handling billions of queries.'
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    category: 'fintech',
    industry: 'Financial Services & Payments',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Mastercard.png',
    badge: 'Global Leader',
    badgeColor: 'purple',
    services: 'Payment Gateway Security & High-Volume Transaction Processing',
    impact: 'Zero-latency transaction authorization with PCI-DSS compliance.'
  },
  {
    id: 'fujitsu',
    name: 'Fujitsu',
    category: 'enterprise',
    industry: 'Information Technology',
    region: 'Japan',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Fujitsu.png',
    badge: 'Enterprise Tech',
    badgeColor: 'cyan',
    services: 'Enterprise Software Integration & Distributed Systems',
    impact: 'Automated workflow modernization across enterprise business units.'
  },
  {
    id: 'servicenow',
    name: 'ServiceNow',
    category: 'enterprise',
    industry: 'Cloud Computing & Workflow',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/ServiceNow.png',
    badge: 'Cloud Enterprise',
    badgeColor: 'orange',
    services: 'Custom Workflow Automation & API Integrations',
    impact: 'Accelerated digital workflow deployment by 40%.'
  },
  {
    id: 'comcast',
    name: 'Comcast',
    category: 'enterprise',
    industry: 'Telecommunications & Media',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Comcast.png',
    badge: 'Media Giant',
    badgeColor: 'purple',
    services: 'Scalable Streaming APIs & Customer Portal Architecture',
    impact: 'Built responsive web applications serving millions of subscribers.'
  },
  {
    id: 'intuit',
    name: 'Intuit',
    category: 'fintech',
    industry: 'Financial Software',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Intuit.png',
    badge: 'Fintech Standard',
    badgeColor: 'cyan',
    services: 'Accounting Tax Engine & Secure Financial Dashboards',
    impact: 'Enhanced automated ledger processing and accounting audits.'
  },

  // AI, Web3 & Tech Startups
  {
    id: 'pienso',
    name: 'Pienso',
    category: 'ai-tech',
    industry: 'AI & Natural Language Processing',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Pienso.png',
    badge: 'AI Pioneer',
    badgeColor: 'purple',
    services: 'Interactive Machine Learning & Deep Learning Dashboards',
    impact: 'No-code NLP model training interface for non-technical domain experts.'
  },
  {
    id: 'draftwise',
    name: 'Draftwise',
    category: 'ai-tech',
    industry: 'LegalTech & Contract Intelligence',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Draftwise.png',
    badge: 'LegalTech AI',
    badgeColor: 'orange',
    services: 'Contract Intelligence AI & Semantic Search Algorithms',
    impact: 'Saved corporate legal teams 60% of contract drafting review time.'
  },
  {
    id: 'propenseai',
    name: 'Propenseai',
    category: 'ai-tech',
    industry: 'Predictive B2B Intelligence',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Propenseai.png',
    badge: 'Predictive AI',
    badgeColor: 'cyan',
    services: 'Predictive Client Modeling & Automated Cross-Selling Engine',
    impact: 'Drove 28% higher account expansion revenue for enterprise clients.'
  },
  {
    id: 'qualiti',
    name: 'Qualiti',
    category: 'ai-tech',
    industry: 'Autonomous QA & Testing',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Qualiti.png',
    badge: 'AI Automation',
    badgeColor: 'orange',
    services: 'AI-Powered Automated Test Script Generation',
    impact: 'Reduced regression QA cycles from 48 hours to 15 minutes.'
  },
  {
    id: 'readygg',
    name: 'Readygg',
    category: 'ai-tech',
    industry: 'Web3 Gaming Infrastructure',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Readygg.png',
    badge: 'Web3 Gaming',
    badgeColor: 'purple',
    services: 'Decentralized Wallet SDK & Cross-Game Asset Marketplace',
    impact: 'Integrated Web3 player ownership into 20+ mobile and PC titles.'
  },
  {
    id: 'emurgo',
    name: 'Emurgo',
    category: 'ai-tech',
    industry: 'Blockchain & Cardano Web3',
    region: 'Japan / Global',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Emurgo.png',
    badge: 'Blockchain Pioneer',
    badgeColor: 'cyan',
    services: 'Smart Contract Auditing & Distributed Ledger Systems',
    impact: 'Secure enterprise blockchain integration for global banking.'
  },
  {
    id: 'lionize',
    name: 'Lionize',
    category: 'ai-tech',
    industry: 'Influencer Marketing Tech',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Lionize.png',
    badge: 'SaaS Platform',
    badgeColor: 'orange',
    services: 'Influencer Discovery Analytics & Automated Payout Engine',
    impact: 'Automated 10,000+ brand collaboration workflows.'
  },
  {
    id: 'connexo',
    name: 'Connexo',
    category: 'ai-tech',
    industry: 'IoT & Smart Grid Utilities',
    region: 'Europe',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/connexo.png',
    badge: 'Smart IoT',
    badgeColor: 'purple',
    services: 'Smart Metering IoT Protocols & Real-Time Utility Dashboards',
    impact: 'Connected 500k+ smart energy meters with zero data loss.'
  },

  // FinTech & Banking
  {
    id: 'vacuumlabs',
    name: 'Vacuumlabs',
    category: 'fintech',
    industry: 'Digital Banking & Crypto',
    region: 'Europe',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Vacuumlabs.png',
    badge: 'Fintech Specialist',
    badgeColor: 'orange',
    services: 'Neobank Mobile Banking Apps & Core Ledger Sync',
    impact: 'Award-winning digital banking UX for European neo-challengers.'
  },
  {
    id: 'navi',
    name: 'Navi',
    category: 'fintech',
    industry: 'Lending, Insurance & UPI',
    region: 'India',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Navi.png',
    badge: 'Unicorn Fintech',
    badgeColor: 'purple',
    services: 'Instant Loan Disbursal Algorithms & KYC Automation',
    impact: 'Under 2-minute loan approval process with automated underwriting.'
  },
  {
    id: 'synthesis',
    name: 'Synthesis',
    category: 'fintech',
    industry: 'Enterprise Banking Software',
    region: 'South Africa',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Synthesis.png',
    badge: 'Bank Cloud Tech',
    badgeColor: 'cyan',
    services: 'Regulatory Compliance Reporting & Cloud Financial Infra',
    impact: 'Automated cross-border payment reconciliations across 10+ currencies.'
  },
  {
    id: 'tryqit',
    name: 'Tryqit',
    category: 'fintech',
    industry: 'Digital Payments & Invoicing',
    region: 'South Africa',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Tryqit.png',
    badge: 'Mobile POS',
    badgeColor: 'orange',
    services: 'Tap-on-Phone SoftPOS & Instant Merchant Settlements',
    impact: 'Empowered 25,000+ SMB merchants with contactless payment.'
  },
  {
    id: 'it-trust',
    name: 'IT Trust',
    category: 'fintech',
    industry: 'Secure Financial Networks',
    region: 'South Africa',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/IT-Trust.png',
    badge: 'Cybersecurity',
    badgeColor: 'purple',
    services: 'Bank-Grade Firewall, Penetration Testing & Encryption',
    impact: 'Protected mission-critical treasury data from zero-day threats.'
  },
  {
    id: 'datalink',
    name: 'Datalink',
    category: 'fintech',
    industry: 'Financial Data Pipelines',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Datalink.png',
    badge: 'Data Infra',
    badgeColor: 'cyan',
    services: 'Stock Market Feed Ingestion & High-Speed Financial Analytics',
    impact: 'Real-time financial ticker data streaming at sub-second speeds.'
  },

  // Healthcare & MedTech
  {
    id: 'hilabs',
    name: 'Hilabs',
    category: 'healthcare',
    industry: 'Healthcare AI & Clinical EHR',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Hilabs.png',
    badge: 'AI Health',
    badgeColor: 'purple',
    services: 'Clinical Data Cleansing & Automated EHR Semantic Parsing',
    impact: 'Eliminated 85% of clinical documentation discrepancies.'
  },
  {
    id: 'mindmate',
    name: 'Mindmate',
    category: 'healthcare',
    industry: 'Cognitive Health & Neurology',
    region: 'United Kingdom',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Mindmate.png',
    badge: 'MedTech Leader',
    badgeColor: 'orange',
    services: 'Interactive Cognitive Brain Training & Patient Mobile App',
    impact: 'Engaged 1M+ active elderly users with cognitive mental exercises.'
  },
  {
    id: 'prolegis',
    name: 'Prolegis',
    category: 'healthcare',
    industry: 'Public Health Policy Tech',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Prolegis.png',
    badge: 'Policy Tech',
    badgeColor: 'cyan',
    services: 'Healthcare Legislation Analysis & Stakeholder CRM',
    impact: 'Unified public policy tracking for major health networks.'
  },
  {
    id: 'tia-technology',
    name: 'Tia Technology',
    category: 'healthcare',
    industry: 'Health & Life Insurance Systems',
    region: 'Denmark / Global',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Tia-Technology.png',
    badge: 'InsurTech',
    badgeColor: 'purple',
    services: 'Claims Processing Workflow & Policyholder Mobile Portal',
    impact: 'Accelerated health claim approvals from 7 days to 4 hours.'
  },

  // E-Commerce & Retail
  {
    id: 'japan-grabs',
    name: 'Japan Grabs',
    category: 'ecommerce',
    industry: 'Cross-Border E-Commerce',
    region: 'Japan',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Japan-Grabs.png',
    badge: 'Cross-Border',
    badgeColor: 'orange',
    services: 'Bilingual Marketplace, Currency Converter & Global Logistics',
    impact: 'Scaled Japanese specialty goods sales across 40+ countries.'
  },
  {
    id: 'tangence',
    name: 'Tangence',
    category: 'ecommerce',
    industry: 'Digital Experience & Commerce',
    region: 'United States',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Tangence.png',
    badge: 'Omnichannel',
    badgeColor: 'purple',
    services: 'Headless Commerce Architecture & Custom Shopify Plus',
    impact: 'Boosted mobile checkout conversion rate by 34%.'
  },
  {
    id: 'rocketsoft',
    name: 'Rocketsoft',
    category: 'ecommerce',
    industry: 'SaaS Billing & Subscription Stores',
    region: 'Europe',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Rocketsoft.png',
    badge: 'SaaS Commerce',
    badgeColor: 'cyan',
    services: 'Recurring Invoicing Engine & Global Tax Compliance (VAT/GST)',
    impact: 'Handled over $50M in recurring annual software subscriptions.'
  },
  {
    id: 'cubezoo',
    name: 'CubeZoo',
    category: 'ecommerce',
    industry: 'Interactive Retail Experience',
    region: 'South Africa',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/CubeZoo.png',
    badge: 'Retail Tech',
    badgeColor: 'orange',
    services: 'AR Virtual Product Fitting & Mobile E-Commerce Apps',
    impact: 'Reduced product return rates by 22% through 3D previews.'
  },
  {
    id: 'bermont-digital',
    name: 'Bermont Digital',
    category: 'ecommerce',
    industry: 'High-Volume Online Retail',
    region: 'United Kingdom',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Bermont-Digital.png',
    badge: 'D2C Scaling',
    badgeColor: 'purple',
    services: 'Multi-Warehouse Inventory Sync & Courier Dispatch APIs',
    impact: 'Eliminated order fulfillment backlogs during Black Friday surges.'
  },

  // Global IT Agencies & Partners
  {
    id: 'nashtech',
    name: 'NashTech',
    category: 'it-partners',
    industry: 'Global Technology Solutions',
    region: 'United Kingdom',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/NashTech.png',
    badge: 'Global Partner',
    badgeColor: 'orange',
    services: 'Dedicated Agile Engineering Squads & Cloud Migration',
    impact: 'Co-developed mission-critical software for FTSE 100 clients.'
  },
  {
    id: 'sotatek',
    name: 'SotaTek',
    category: 'it-partners',
    industry: 'Software Development & Web3',
    region: 'Japan / Vietnam',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/SotaTek.png',
    badge: 'Web3 & AI',
    badgeColor: 'purple',
    services: 'Full-Stack Developers & Decentralized App Engineering',
    impact: 'Delivered 35+ joint enterprise software projects.'
  },
  {
    id: 'beetsoft',
    name: 'Beetsoft',
    category: 'it-partners',
    industry: 'IT Consulting & AI',
    region: 'Japan',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Beetsoft.png',
    badge: 'Strategic Partner',
    badgeColor: 'cyan',
    services: 'Enterprise AI Automation & Japanese Localization',
    impact: 'Expanded high-performance delivery across Tokyo enterprises.'
  },
  {
    id: 'eb-pearls',
    name: 'EB Pearls',
    category: 'it-partners',
    industry: 'Digital Product Studio',
    region: 'Australia',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/EB-Pearls.png',
    badge: 'Award Winning',
    badgeColor: 'orange',
    services: 'Flutter Mobile App Engineering & React Frontend UI',
    impact: 'Built Top-10 trending apps in the Australian App Store.'
  },
  {
    id: 'attract-group',
    name: 'Attract Group',
    category: 'it-partners',
    industry: 'Web & Mobile Engineering',
    region: 'Europe / USA',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Attract-Group.png',
    badge: 'SaaS Agency',
    badgeColor: 'purple',
    services: 'Custom CRM Development & SaaS Architecture',
    impact: 'Modernized 40+ legacy CRM systems to cloud microservices.'
  },
  {
    id: 'appomate',
    name: 'Appomate',
    category: 'it-partners',
    industry: 'Mobile App Incubator',
    region: 'Australia',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Appomate.png',
    badge: 'Mobile Scale',
    badgeColor: 'cyan',
    services: 'Rapid MVP Prototyping & Native iOS/Android Architecture',
    impact: 'Helped 15+ startups secure Seed & Series-A capital.'
  },
  {
    id: 'manektech',
    name: 'ManekTech',
    category: 'it-partners',
    industry: 'Custom Software Development',
    region: 'India / USA',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/ManekTech.png',
    badge: 'Tech Partner',
    badgeColor: 'orange',
    services: 'Full-Stack Developers & Enterprise QA Automation',
    impact: 'Over 5 years of seamless developer resource augmentation.'
  },
  {
    id: 'opencollab',
    name: 'OPENCOLLAB',
    category: 'it-partners',
    industry: 'Education & Enterprise Open Source',
    region: 'South Africa',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/OPENCOLLAB.png',
    badge: 'Open Collab',
    badgeColor: 'purple',
    services: 'Higher Education LMS Architecture & Student Information Systems',
    impact: 'Supported 200k+ university students with uninterrupted remote learning.'
  },
  {
    id: 'nekologic',
    name: 'Nekologic',
    category: 'it-partners',
    industry: 'AI & Custom Software',
    region: 'Japan',
    logo: 'https://blackgrapessoftech.com/wp-content/uploads/2024/07/Nekologic.png',
    badge: 'Tokyo Tech',
    badgeColor: 'cyan',
    services: 'Cross-Border Agile Engineering & Distributed Cloud Systems',
    impact: 'Streamlined technical delivery for Japanese conglomerate clients.'
  }
];

export const CLIENT_CASE_STUDIES = [
  {
    id: 'cs-fintech',
    client: 'Mastercard & Neobank Ecosystem',
    industry: 'Financial Technology',
    title: 'High-Volume Secure Payment Processing Engine',
    desc: 'Engineered a PCI-DSS compliant payment routing microservice capable of executing 15,000+ transactions per second with sub-50ms latency and fraud detection.',
    metrics: ['15,000+ TPS', '< 50ms Latency', '99.999% Uptime', 'PCI-DSS Certified'],
    tech: ['Node.js', 'Go', 'Redis Cluster', 'Kafka', 'AWS CloudHSM']
  },
  {
    id: 'cs-health',
    client: 'Hilabs & Global Health Networks',
    industry: 'Healthcare AI & EHR',
    title: 'Automated Clinical EHR Parsing & Diagnostic Portal',
    desc: 'Created an intelligent clinical workflow portal that digests unstructured patient EHR records, syncs hospital bed admissions, and automates doctor appointments.',
    metrics: ['85% Less Paperwork', 'NABH Compliant', '500+ Doctors Active', 'HIPAA Secure'],
    tech: ['React', 'Python FastAPI', 'PostgreSQL', 'Docker', 'AWS HealthLake']
  },
  {
    id: 'cs-iot',
    client: 'Connexo & European Energy Grids',
    industry: 'IoT Smart Infrastructure',
    title: 'Real-Time Utility Smart Meter Ingestion Platform',
    desc: 'Developed a distributed telematics dashboard monitoring over 500,000 smart energy and water meters with automated billing alerts and load forecasting.',
    metrics: ['500,000+ Devices', 'Zero Data Drops', 'Real-time Telemetry', 'ISO 27001'],
    tech: ['Next.js', 'MQTT / WebSockets', 'TimescaleDB', 'Kubernetes', 'Azure IoT']
  }
];

export const CLIENT_TESTIMONIALS = [
  {
    quote: 'Black Grapes Softech transformed our legacy systems into a lightning-fast cloud architecture. Their engineers in Indore operate with the precision and caliber of Silicon Valley leaders.',
    author: 'David Thorne',
    role: 'VP of Engineering',
    company: 'Fintech Solutions UK',
    country: 'United Kingdom',
    rating: 5
  },
  {
    quote: 'The dedication and agility of the Black Grapes team is unmatched. They delivered our multi-tenant SaaS application two weeks ahead of schedule with flawless code quality.',
    author: 'Kenji Takahashi',
    role: 'Managing Director',
    company: 'Tokyo Digital Commerce',
    country: 'Japan',
    rating: 5
  },
  {
    quote: 'We have collaborated with software agencies across the globe, but Black Grapes Softech stands out for transparency, communication, and real ownership of the business vision.',
    author: 'Sarah Jenkins',
    role: 'Chief Product Officer',
    company: 'HealthFlow AI',
    country: 'United States',
    rating: 5
  }
];

export const ENGAGEMENT_MODELS = [
  {
    title: 'Dedicated Engineering Squad',
    subtitle: 'Staff Augmentation & Dedicated Team',
    desc: 'Scale your engineering capacity with handpicked senior developers, QA engineers, and architects working exclusively for your company.',
    points: ['Direct Slack / Jira / GitHub integration', 'Flexible time zone alignment (US, UK, Japan)', 'Immediate ramp-up within 48 hours', 'Zero recruitment overhead']
  },
  {
    title: 'Fixed-Price Turnkey Project',
    subtitle: 'End-to-End Product Delivery',
    desc: 'Ideal for well-defined software products, MVPs, and enterprise web applications with clear milestones and fixed delivery dates.',
    points: ['Guaranteed deadline & fixed budget', 'Complete UI/UX design & system architecture', 'Rigorous automated QA & penetration testing', '1-Year free maintenance & source code handover']
  },
  {
    title: 'Technology Partnership & Modernization',
    subtitle: 'Legacy to Next-Gen Cloud Migration',
    desc: 'Modernize legacy codebases, transition monolithic apps to microservices, enhance cybersecurity, and build custom AI automation.',
    points: ['In-depth code & architecture audit', 'Zero-downtime database migration', 'Cloud infrastructure cost optimization', 'Continuous 24/7 DevOps monitoring']
  }
];
