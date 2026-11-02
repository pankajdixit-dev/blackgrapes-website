import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'backend/data/db.json');

const initialDb = {
  site_settings: {
    id: 'settings-1',
    site_name: 'Black Grapes Softech Pvt. Ltd.',
    tagline: 'Empowering Enterprises Worldwide with Next-Gen Tech',
    logo_url: '/bgst-logo.png',
    favicon_url: '/favicon.svg',
    primary_email: 'info@blackgrapessoftech.com',
    support_email: 'support@blackgrapessoftech.com',
    primary_phone: '+91 7470997884',
    secondary_phone: '+91 6262414463',
    whatsapp_number: '+917470997884',
    office_address: '252-F/H Scheme No 54, Vijaynagar, Indore - 452010, Madhya Pradesh, India',
    google_maps_url: 'https://maps.google.com/?q=Vijaynagar,Indore,Madhya+Pradesh,India',
    working_hours: 'Mon - Sat: 9:00 AM - 8:00 PM IST',
    top_strip_text: 'Empowering Enterprises Worldwide with Next-Gen Tech • Call: +91 7470997884',
    top_strip_enabled: true,
    social_linkedin: 'https://www.linkedin.com/in/black-grapes-softech/',
    social_twitter: 'https://twitter.com/grapessoftech',
    social_instagram: 'https://www.instagram.com/blackgrapessoftech/',
    social_youtube: 'https://www.youtube.com/channel/UC3gJA06Uxb0D82-PVJl0SbQ',
    footer_about_text: 'We are an innovative IT solutions & custom software development company based in Indore, India. Empowering businesses across the globe with robust, scalable, and tailored digital products.',
    footer_trust_badge: 'ISO & Quality Assured Development Standards',
    copyright_text: `© ${new Date().getFullYear()} Black Grapes Softech Pvt. Ltd. All rights reserved.`,
    maintenance_mode: false,
    google_analytics_id: 'G-XXXXXXXXXX',
    custom_head_scripts: ''
  },

  home_page: {
    hero: {
      badge: '10+ Years of Proven IT Excellence • Indore, India',
      prefix: 'Innovate. Integrate. Elevate.',
      break_text: 'And Digitalize Your Ideas into Success via',
      brand_highlight: 'BLACK GRAPES SOFTECH',
      suffix: ', Where Innovation And ideas Meets Excellence.',
      description: 'Get Free Consultation From Our Industry Experts. We engineer scalable custom software, iOS & Android mobile apps, enterprise CRMs, MLM platforms, and high-conversion websites for ambitious startups and global enterprises.',
      cta_primary_text: 'Request a Demo',
      cta_secondary_text: 'Explore Services',
      techBadges: [
        { name: 'React', category: 'Frontend' },
        { name: 'Flutter', category: 'Mobile' },
        { name: 'Node.js', category: 'Backend' },
        { name: 'Python', category: 'AI & Data' },
        { name: 'Next.js', category: 'Full Stack' },
        { name: 'iOS / Swift', category: 'Native' },
        { name: 'Android / Kotlin', category: 'Native' },
        { name: 'AWS Cloud', category: 'DevOps' },
        { name: 'Custom CRM', category: 'Enterprise' },
        { name: 'MLM Engines', category: 'FinTech' }
      ]
    },
    clockPhilosophy: {
      eyebrow: 'BLACK GRAPES PHILOSOPHY • PURPOSEFUL BEGINNINGS',
      titlePrefix: 'MORE THAN A SERVICE. ',
      titleHighlight: 'A COMMITMENT TO TIME & SCALE.',
      description: 'Every transformative enterprise starts with a decisive moment. At Black Grapes Group, our approach embodies purposeful beginnings, engineering rigor, and the execution power to turn ambitious visions into enduring realities.',
      mantraPills: ['BEGIN WITH PURPOSE', 'ENGINEER WITH RIGOR', 'DELIVER ON TIME'],
      pillarBadge: '01 / THE TIMELESS PRINCIPLE',
      pillarTitle: 'A MOMENT OF PURPOSE. A BEGINNING OF POSSIBILITIES.',
      pillarParagraphs: [
        'In Indian tradition, Shubh Muhurat & Brahma Muhurta symbolizes the peak window of mental clarity, creative power, and spiritual resolve when the groundwork for monumental achievements is laid.',
        'Inspired by this timeless philosophy, our Black Grapes delivery model represents the conviction that every milestone project deserves undivided focus, zero technical shortcuts, and absolute punctuality.',
        'Whether launching a complex ERP system, validating property for a ₹50-crore bank facility, or securing municipal Naksha Pass approvals, we make every second of execution count.'
      ],
      quoteText: 'Every great vision deserves its defining moment. At Black Grapes, we ensure that moment leads to unquestioned market leadership.'
    },
    whyChooseUs: {
      badge: 'WHY CHOOSE US ?',
      titlePrefix: 'Built On Security, Uncompromising Quality & ',
      titleHighlight: 'Lifelong Relationships',
      visionQuote: 'To be the most reliable, visionary IT catalyst for modern businesses by delivering robust code, high ROI, and lifelong partnerships.',
      clientsCount: '100+',
      projectsCount: '150+',
      experienceYears: '10+',
      pillars: [
        {
          subtitle: 'Unmatched Reliability',
          title: 'Enterprise Security & Compliance',
          description: 'Military-grade encryption, OWASP Top 10 mitigation, and ISO-standard coding conventions ensure your product scales without vulnerability.',
          points: ['Zero Data Leak Architecture', 'Strict NDAs & IP Ownership', 'Regular Security Audits']
        },
        {
          subtitle: 'Uncompromising Quality',
          title: 'Precision-Driven Engineering',
          description: 'Clean, modular, thoroughly tested code architectures that minimize technical debt and maximize page speed, uptime, and user adoption.',
          points: ['Automated CI/CD Pipelines', '99.9% Uptime Guarantee', 'Pixel-Perfect UI/UX Execution']
        },
        {
          subtitle: 'Dedicated Partnership',
          title: 'End-to-End Strategic Lifecycle',
          description: 'We don’t stop at deployment. We stand shoulder to shoulder with founders and CIOs as true technology partners from MVP to multi-million user scale.',
          points: ['24/7 Priority Support Desk', 'Dedicated Tech Project Manager', 'Continuous Feature Evolution']
        }
      ]
    },
    ctaBanner: {
      badge: 'GET STARTED WITH BLACK GRAPES SOFTECH',
      title: 'Assess Your Business Potentials Now & Find Take Care of What Matters Most!',
      subtitle: 'Speak directly with our senior architects. Whether you need a full enterprise software build, high-conversion mobile app, or modern web platform, we deliver excellence on time and on budget.',
      primaryBtnText: 'Get Started Now!',
      secondaryBtnText: 'Get Free Consultation'
    }
  },

  page_sections: {
    about_hero: {
      id: 'sec-about-hero',
      page: 'about',
      section_key: 'about_hero',
      section_name: 'About Hero Section',
      order_index: 1,
      is_visible: true,
      has_unpublished_changes: false,
      content: {
        badge: 'ABOUT BLACK GRAPES SOFTECH',
        title: 'We Don’t Just Write Code —',
        titleHighlight: 'We Engineer The Digital Future.',
        lead: 'Headquartered in Indore, India, Black Grapes Softech is a premier software engineering & digital transformation agency. We translate complex business hurdles into elegant, high-impact digital products.',
        primaryBtnText: 'Partner With Us',
        secondaryBtnText: 'Meet Our Leadership',
        secondaryBtnLink: '#founders',
        image: '/images/blackgrapes-1.png',
        floatingStat1Num: '250+ Projects',
        floatingStat1Sub: 'Shipped Globally',
        floatingStat2Num: '15+ Nations',
        floatingStat2Sub: 'Active Client Base',
        microBadges: ['Certified Developers', 'Full Cycle Development', '24/7 Dedicated Support']
      }
    },
    stats_strip: {
      id: 'sec-stats-strip',
      page: 'about',
      section_key: 'stats_strip',
      section_name: 'Key Impact Metrics Bar',
      order_index: 2,
      is_visible: true,
      has_unpublished_changes: false,
      content: {
        stats: [
          { number: '10+', label: 'Years of Innovation', highlight: 'Since 2014' },
          { number: '250+', label: 'Projects Completed', highlight: 'Global Scale' },
          { number: '150+', label: 'Satisfied Clients', highlight: '15+ Countries' },
          { number: '99%', label: 'Client Retention', highlight: 'Industry Best' }
        ]
      }
    },
    vision_mission: {
      id: 'sec-vision-mission',
      page: 'about',
      section_key: 'vision_mission',
      section_name: 'Vision, Mission & Philosophy Bento',
      order_index: 3,
      is_visible: true,
      has_unpublished_changes: false,
      content: {
        badge: 'CORE COMPASS',
        heading: 'Guided by Purpose, Driven by Precision',
        visionTitle: 'Our Strategic Vision',
        visionText: 'To be the most trusted software engineering partner globally, accelerating digital transformation through architectural brilliance, ethical technology practices, and sustainable engineering.',
        missionTitle: 'Our Operational Mission',
        missionText: 'To empower ambitious enterprises with custom-built software, high-performance web platforms, and mobile apps that dramatically improve bottom lines and delight end-users.',
        philosophyTitle: 'The Black Grapes Code',
        philosophyBullets: [
          'Code as a Craft: Clean, test-driven architectures that scale without technical debt.',
          'Radical Transparency: Open sprint backlogs, continuous client demos, and honest roadmaps.',
          'Velocity with Stability: Fast time-to-market without ever compromising system security.'
        ]
      }
    },
    founders_story: {
      id: 'sec-founders-story',
      page: 'about',
      section_key: 'founders_story',
      section_name: 'Founders & Heritage Narrative',
      order_index: 4,
      is_visible: true,
      has_unpublished_changes: false,
      content: {
        badge: 'LEADERSHIP STORY',
        heading: 'Built From The Ground Up with Passion and Technical Grit',
        storyP1: 'Founded with a clear conviction that technology services should be personal, accountable, and deeply technical, Black Grapes Softech began as an agile squad solving complex algorithmic challenges for local enterprises in Madhya Pradesh.',
        storyP2: 'Over the last decade, our leadership team has steered the company into an internationally recognized engineering hub, deploying mission-critical systems across Healthcare, Logistics, FinTech, and Enterprise SaaS.',
        foundersName: 'Arpit Jain & Deepika Jain',
        foundersRole: 'Founders & Managing Directors',
        quote: 'Technology without strategy is overhead. Our goal is to transform code into a dominant business advantage for every client we serve.',
        image: '/images/good-business-relationship-2.jpg'
      }
    },
    culture_values: {
      id: 'sec-culture-values',
      page: 'about',
      section_key: 'culture_values',
      section_name: 'Core Cultural Pillars',
      order_index: 5,
      is_visible: true,
      has_unpublished_changes: false,
      content: {
        badge: 'CULTURAL ANCHORS',
        heading: 'The Principles That Power Our Daily Sprints',
        pillars: [
          { icon: 'Shield', title: 'Absolute Integrity', text: 'We treat our clients IP, customer data, and security with bank-grade diligence and confidentiality.' },
          { icon: 'Zap', title: 'Relentless Innovation', text: 'We invest 15% of engineering bandwidth into researching AI models, modern cloud primitives, and reactive frameworks.' },
          { icon: 'Users', title: 'Empowered Teams', text: 'Flat hierarchy where the best technical idea always wins. We nurture leadership at every engineering level.' },
          { icon: 'Award', title: 'Obsession With Quality', text: 'Rigorous peer reviews, zero-warning lint policies, and comprehensive test suites for every PR merged.' }
        ]
      }
    },
    about_faqs: {
      id: 'sec-about-faqs',
      page: 'about',
      section_key: 'about_faqs',
      section_name: 'Frequently Asked Questions',
      order_index: 6,
      is_visible: true,
      has_unpublished_changes: false,
      content: {
        badge: 'CLARITY FIRST',
        heading: 'Frequently Asked Questions About Partnering With Us',
        faqs: [
          { q: 'What engagement models do you support?', a: 'We offer dedicated team augmentation, milestone-based fixed price projects, and time-and-materials agile sprints depending on your product stage and requirements.' },
          { q: 'How do you handle Intellectual Property (IP) and NDAs?', a: 'Full 100% IP ownership transfers to you upon final invoice settlement. We execute strict bilateral NDAs prior to any technical briefing or architectural review.' },
          { q: 'Can you scale a team on short notice?', a: 'Yes, our bench of pre-vetted engineers allows us to onboard senior React, Flutter, Node.js, and Python developers within 3-7 business days.' },
          { q: 'Do you offer post-launch maintenance & SLA support?', a: 'We provide 24/7 dedicated monitoring, zero-downtime updates, infrastructure patching, and continuous feature roadmapping via customized SLA tiers.' }
        ]
      }
    }
  },

  services: [
    {
      id: 'srv-1',
      title: 'Custom Software Development',
      category: 'Software Development',
      shortDesc: 'Enterprise ERP, CRM, custom automated workflow suites, and scalable microservices architecture built for high performance.',
      image: '/images/Software.jpg',
      tags: ['React', 'Node.js', 'Python', 'AWS', 'PostgreSQL'],
      is_active: true,
      order_index: 1
    },
    {
      id: 'srv-2',
      title: 'Mobile App Development',
      category: 'Mobile Apps',
      shortDesc: 'High-performance cross-platform & native mobile applications with intuitive UI/UX, biometric security, and offline data sync.',
      image: '/images/app.jpg',
      tags: ['Flutter', 'React Native', 'iOS Swift', 'Android Kotlin'],
      is_active: true,
      order_index: 2
    },
    {
      id: 'srv-3',
      title: 'Digital Marketing & SEO',
      category: 'Digital Marketing',
      shortDesc: 'Data-backed search engine optimization, paid performance marketing, social brand awareness, and conversion rate optimization.',
      image: '/images/digital-marketing.jpg',
      tags: ['Technical SEO', 'Google Ads', 'Meta Performance', 'Analytics'],
      is_active: true,
      order_index: 3
    },
    {
      id: 'srv-4',
      title: 'Graphic & UI/UX Designing',
      category: 'Design & Branding',
      shortDesc: 'Human-centric UI/UX design systems, clickable high-fidelity prototypes, brand identities, and high-impact visual media.',
      image: '/images/Graphic-Design-Black-Grapes-Softech.jpg',
      tags: ['Figma', 'Design Systems', 'Micro-Interactions', 'Prototyping'],
      is_active: true,
      order_index: 4
    },
    {
      id: 'srv-5',
      title: 'Web Designing & Development',
      category: 'Web Architecture',
      shortDesc: 'Ultra-fast, responsive web platforms built with modern single-page applications, headless CMS, and SEO best practices.',
      image: '/images/Website-Designing.jpg',
      tags: ['Next.js', 'React', 'Tailwind', 'REST/GraphQL'],
      is_active: true,
      order_index: 5
    },
    {
      id: 'srv-6',
      title: 'CRM Software Development',
      category: 'Enterprise Solutions',
      shortDesc: 'Custom pipeline management, automated lead nurturing, telephony integrations, and customer lifetime value analytics.',
      image: '/images/crm-1.png',
      tags: ['Lead Scoring', 'Workflow Automation', 'Omnichannel', 'Analytics'],
      is_active: true,
      order_index: 6
    },
    {
      id: 'srv-7',
      title: 'MLM Software Development',
      category: 'FinTech Platforms',
      shortDesc: 'Multi-tiered commission distribution engines, binary and matrix compensation plans, digital payout wallets, and tree visualization.',
      image: '/images/mlm-software.png',
      tags: ['Binary Plans', 'Matrix Plans', 'Digital Wallets', 'Tree Analytics'],
      is_active: true,
      order_index: 7
    },
    {
      id: 'srv-8',
      title: 'Game Development',
      category: 'Interactive Media',
      shortDesc: 'Immersive 2D & 3D casual, educational, and multiplayer games engineered for iOS, Android, and web with Unity & Unreal.',
      image: '/images/Game-Development.jpg',
      tags: ['Unity 3D', 'Multiplayer', 'WebGL', 'C# Game Logic'],
      is_active: true,
      order_index: 8
    }
  ],

  projects: [
    {
      id: 'proj-1',
      title: 'School Management ERP',
      category: 'Web Apps',
      summary: 'Complete campus administration system automating admissions, fee collections, exam scheduling, and parent communication.',
      image: '/images/austin-distel-fEedoypsW_U-unsplash-qgntl74b15340mw95449eg068ty9af2yamf46cr91c.jpg',
      tags: ['React', 'Node.js', 'PostgreSQL', 'RFID'],
      link: '#',
      is_featured: true,
      order_index: 1
    },
    {
      id: 'proj-2',
      title: 'Healthcare EHR & Pharmacy Suite',
      category: 'Web Apps',
      summary: 'Hospital clinical management portal featuring electronic health records, doctor appointment scheduling, and automated billing.',
      image: '/images/headway-5QgIuuBxKwM-unsplash.jpg',
      tags: ['React', 'FastAPI', 'HIPAA Compliant', 'AWS'],
      link: '#',
      is_featured: true,
      order_index: 2
    },
    {
      id: 'proj-3',
      title: 'Multi-Vendor E-Commerce Platform',
      category: 'E-Commerce',
      summary: 'Next-gen online shopping marketplace with multi-currency checkout, real-time inventory sync, and intelligent recommendations.',
      image: '/images/jake-fagan-Y7C7F26fzZM-unsplash.jpg',
      tags: ['Next.js', 'Node.js', 'Stripe', 'Redis'],
      link: '#',
      is_featured: true,
      order_index: 3
    },
    {
      id: 'proj-4',
      title: 'Cross-Platform Telemedicine Mobile App',
      category: 'Android / IOS - Mobile Apps',
      summary: 'Video consultation app connecting patients with specialist doctors, featuring digital prescriptions and in-app diagnostics tracking.',
      image: '/images/app.jpg',
      tags: ['Flutter', 'WebRTC', 'Firebase', 'iOS & Android'],
      link: '#',
      is_featured: true,
      order_index: 4
    }
  ],

  clients: [
    { id: 'cli-1', name: 'Microsoft Partner Ecosystem', logo: '/partners/microsoft.png', industry: 'Cloud & Enterprise' },
    { id: 'cli-2', name: 'Oracle Alliance', logo: '/partners/oracle.png', industry: 'Database & Cloud' },
    { id: 'cli-3', name: 'Salesforce Certified', logo: '/partners/salesforce.png', industry: 'CRM & Cloud' },
    { id: 'cli-4', name: 'Adobe Creative Suite', logo: '/partners/adobe.png', industry: 'Media & Design' },
    { id: 'cli-5', name: 'Zoho Advanced Partner', logo: '/partners/zoho.png', industry: 'SaaS Platforms' },
    { id: 'cli-6', name: 'Freshworks Solutions', logo: '/partners/freshworks.png', industry: 'Customer Engagement' }
  ],

  case_studies: [
    {
      id: 'cs-1',
      title: 'Digital Transformation of 120+ Campuses Across India',
      clientName: 'EduGroup India',
      metric: '85% Faster Fee Reconciliation',
      challenge: 'Manual paperwork and error-prone accounting across multi-city schools.',
      solution: 'Deployed custom cloud ERP with automated payment gateways and parent mobile app.',
      result: '100% digital fee compliance and zero cash discrepancy.'
    }
  ],

  testimonials: [
    {
      id: 't-1',
      name: 'Vikramaditya Sharma',
      designation: 'Chief Technology Officer, FinTech Nexus',
      avatar: 'VS',
      rating: 5,
      quote: 'Black Grapes Softech engineered our multi-tenant microservices architecture with remarkable speed and precision. Their team in Indore works as a direct extension of our core engineering department.',
      is_featured: true
    },
    {
      id: 't-2',
      name: 'Rohan Deshmukh',
      designation: 'Founder & CEO, EduVenture Global',
      avatar: 'RD',
      rating: 5,
      quote: 'From UI prototyping to cloud deployment, BGST handled our entire school ERP platform seamlessly. 100+ schools onboarded without a single hiccup. Truly exceptional delivery!',
      is_featured: true
    },
    {
      id: 't-3',
      name: 'Ananya Mehra',
      designation: 'VP Product, OmniRetail Group',
      avatar: 'AM',
      rating: 5,
      quote: 'The Flutter mobile app and custom CRM built by Black Grapes Softech reduced our customer drop-off by 42%. They are definitely our long-term technology development partners.',
      is_featured: true
    }
  ],

  team_members: [
    {
      id: 'tm-1',
      full_name: 'Arpit Jain',
      role: 'Managing Director & Chief Architect',
      bio: 'Visionary technologist with 12+ years directing large-scale enterprise software systems, cloud migrations, and strategic partnerships.',
      image_url: '/images/good-business-relationship-2.jpg',
      linkedin_url: 'https://www.linkedin.com/in/black-grapes-softech/',
      order_index: 1
    },
    {
      id: 'tm-2',
      full_name: 'Deepika Jain',
      role: 'Co-Founder & Director of Operations',
      bio: 'Specialist in organizational agility, client engagement frameworks, and quality delivery governance across global accounts.',
      image_url: '/images/headway-5QgIuuBxKwM-unsplash.jpg',
      linkedin_url: 'https://www.linkedin.com/in/black-grapes-softech/',
      order_index: 2
    }
  ],

  blog_categories: [
    { id: 'cat-1', name: 'Software Architecture', slug: 'software-architecture' },
    { id: 'cat-2', name: 'Mobile Engineering', slug: 'mobile-engineering' },
    { id: 'cat-3', name: 'Enterprise CRM', slug: 'enterprise-crm' },
    { id: 'cat-4', name: 'AI & Cloud', slug: 'ai-and-cloud' }
  ],

  blog_posts: [
    {
      id: 'bp-1',
      title: 'Architecting Scalable Multi-Tenant SaaS in 2026: A Deep Dive',
      slug: 'architecting-scalable-multi-tenant-saas',
      category: 'Software Architecture',
      excerpt: 'Learn the architectural principles behind zero-downtime database partitioning, tenant isolation, and automated cloud deployments.',
      status: 'published',
      published_at: '2026-03-15',
      author: 'Arpit Jain'
    }
  ],

  enquiries: [
    {
      id: 'enq-1',
      ticket_id: 'BG-849201',
      name: 'Rajesh Malhotra',
      email: 'rajesh.m@technovate.com',
      phone: '+91 98200 12345',
      service_required: 'Custom Software Development',
      project_scope: 'Full Enterprise ERP Migration',
      status: 'contacted',
      notes: 'Initial scope call scheduled for Wednesday 3 PM.',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ],

  media_library: [
    { id: 'med-1', name: 'bgst-logo.png', url: '/bgst-logo.png', file_type: 'image/png', file_size: 188221, uploaded_at: new Date().toISOString() },
    { id: 'med-2', name: 'Software.jpg', url: '/images/Software.jpg', file_type: 'image/jpeg', file_size: 450000, uploaded_at: new Date().toISOString() },
    { id: 'med-3', name: 'app.jpg', url: '/images/app.jpg', file_type: 'image/jpeg', file_size: 380000, uploaded_at: new Date().toISOString() }
  ],

  seo_metadata: [
    {
      id: 'seo-1',
      page_path: '/',
      meta_title: 'Black Grapes Softech | Best IT Software & Mobile App Development Company in Indore',
      meta_description: 'Premier custom software, iOS/Android mobile apps, enterprise CRM, MLM solutions, and modern web application development agency in Indore, India.',
      keywords: 'Software Company Indore, Mobile App Development, Custom CRM, MLM Software, IT Solutions India',
      og_title: 'Black Grapes Softech - Innovate. Integrate. Elevate.',
      og_description: 'Transform your vision into high-scale digital reality with our senior engineering architects.'
    },
    {
      id: 'seo-2',
      page_path: '/about',
      meta_title: 'About Us | Black Grapes Softech - 10+ Years of Engineering Excellence',
      meta_description: 'Discover the team, heritage, core values, and leadership behind Black Grapes Softech.',
      keywords: 'About Black Grapes Softech, Arpit Jain, IT Company Indore History, Leadership Team',
      og_title: 'About Black Grapes Softech',
      og_description: 'Engineering the digital future since 2014.'
    }
  ],

  admin_users: [
    {
      id: 'usr-1',
      email: 'admin@blackgrapessoftech.com',
      full_name: 'Lead Administrator',
      role: 'super_admin',
      is_active: true,
      last_login_at: new Date().toISOString()
    },
    {
      id: 'usr-2',
      email: 'arpit@blackgrapessoftech.com',
      full_name: 'Arpit Jain',
      role: 'super_admin',
      is_active: true,
      last_login_at: new Date().toISOString()
    }
  ],

  activity_logs: [
    {
      id: 'log-1',
      action: 'System Initialized',
      module: 'Core System',
      record_id: 'init',
      user_email: 'system',
      description: 'Persistent file database initialized successfully with complete website content.',
      created_at: new Date().toISOString()
    }
  ],

  content_revisions: [],

  menus: [
    { id: 'm-1', label: 'Home', path: '/', order_index: 1, is_active: true },
    { id: 'm-2', label: 'About Us', path: '/about-us', order_index: 2, is_active: true },
    { id: 'm-3', label: 'Services', path: '/services', order_index: 3, is_active: true },
    { id: 'm-4', label: 'Our Products', path: '/our-products', order_index: 4, is_active: true },
    { id: 'm-5', label: 'Ecommerce', path: '/ecommerce', order_index: 5, is_active: true },
    { id: 'm-6', label: 'Our Clients', path: '/our-clients', order_index: 6, is_active: true },
    { id: 'm-7', label: 'IT Staffing', path: '/it-staffing', order_index: 7, is_active: true },
    { id: 'm-8', label: 'Partnership', path: '/partnership', order_index: 8, is_active: true },
    { id: 'm-9', label: 'Contact', path: '/contact', order_index: 9, is_active: true }
  ]
};

fs.writeFileSync(dbPath, JSON.stringify(initialDb, null, 2), 'utf-8');
console.log('Successfully created initial database file at:', dbPath);
