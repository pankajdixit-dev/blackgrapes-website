import foundersImg from '../frontend/src/assets/founders.jpg';
import aboutHeroImg from '../frontend/src/assets/about-hero.jpg';
import workspaceImg from '../frontend/src/assets/workspace.jpg';
import logoImg from '../frontend/src/assets/bgst-logo.png';
import { PRODUCTS_LIST } from '../frontend/src/pages/OurProducts/productsData.js';
import { CLIENTS_LIST, CLIENT_CASE_STUDIES, CLIENT_TESTIMONIALS } from '../frontend/src/pages/OurClients/clientsData.js';

export const DEFAULT_SITE_SETTINGS = {
  id: 'settings-1',
  site_name: 'Black Grapes Softech Pvt. Ltd.',
  tagline: 'Empowering Enterprises Worldwide with Next-Gen Tech',
  logo_url: logoImg,
  favicon_url: '/favicon.svg',
  primary_email: 'info@blackgrapessoftech.com',
  support_email: 'support@blackgrapessoftech.com',
  primary_phone: '+91 7470997884',
  secondary_phone: '+91 6262414463',
  office_address: '252-F/H Scheme No 54, Vijaynagar, Indore - 452010, Madhya Pradesh, India',
  top_strip_text: 'Empowering Enterprises Worldwide with Next-Gen Tech',
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
};

export const DEFAULT_MENUS = [
  { id: 'm-1', label: 'Home', path: '/', order_index: 1, is_active: true },
  { id: 'm-2', label: 'About Us', path: '/about', order_index: 2, is_active: true },
  { id: 'm-3', label: 'Services', path: '/services', order_index: 3, is_active: true },
  { id: 'm-4', label: 'Our Products', path: '/products', order_index: 4, is_active: true },
  { id: 'm-5', label: 'Our Clients', path: '/clients', order_index: 5, is_active: true },
  { id: 'm-6', label: 'Contact', path: '/contact', order_index: 6, is_active: true }
];

export const DEFAULT_HOME_PAGE = {
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
};

export const DEFAULT_PAGE_SECTIONS = {
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
      image: aboutHeroImg,
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
      badge: 'PURPOSE & PRINCIPLES',
      title: 'The Guiding Pillars Behind Our Growth',
      subtitle: 'Every system we engineer is backed by our relentless commitment to excellence and transformative technology.',
      vision: {
        tag: 'Strategic Vision',
        heading: 'Empowering Tomorrow Through',
        headingHighlight: 'Innovative Code',
        p1: 'At Black Grapes Softech, our vision is to lead the way in software development, using innovation and creativity to shape the future of technology.',
        p2: 'We envision a world where every software solution we architect empowers individuals, businesses, and communities to thrive, automate, and excel in the digital-first economy.',
        points: [
          'Pioneering intelligent, scalable cloud and web infrastructures.',
          'Cultivating technological self-reliance and commercial success for clients.',
          'Constantly innovating ahead of emerging market trends.'
        ],
        quote: '"Technology should not just automate tasks; it should multiply human potential and drive real-world transformation."',
        quoteAuthor: '— Black Grapes Softech Leadership'
      },
      mission: {
        tag: 'Execution & Commitment',
        heading: 'Crafting Excellence,',
        headingHighlight: 'One Line of Code at a Time',
        p1: 'Our mission is to provide exceptional software development services tailored to our clients’ unique business requirements. We are dedicated to delivering top-notch, cutting-edge solutions while fostering a culture of collaboration, growth, and continuous innovation.',
        p2: 'At Black Grapes Softech, we don’t just write code; we build the solid architectural foundation for a better, smarter, and more connected digital world.',
        points: [
          'High-velocity development with bulletproof security & QA.',
          'Transparent communication and milestone visibility at all times.',
          'Tailored solutions engineered precisely for client ROI.'
        ],
        quote: '"We don’t settle for \'good enough\'. We build digital products designed to dominate their industry."',
        quoteAuthor: '— Engineering Philosophy'
      },
      philosophy: {
        tag: 'Architectural Integrity',
        heading: 'Engineering For',
        headingHighlight: 'Infinite Scale & Speed',
        p1: 'Software isn\'t merely lines of script — it is the digital nervous system of your business. Our philosophy emphasizes clean code, microservices scalability, robust security protocols, and human-centered design.',
        p2: 'Whether developing custom MLM platforms, enterprise CRM systems, or high-throughput SaaS engines, our engineering principles guarantee longevity and seamless scalability.',
        points: [
          'Modularity and maintainability baked in from Day 1.',
          'Lightning-fast user interfaces with modern reactive frameworks.',
          'Zero technical debt tolerance through strict code reviews.'
        ],
        quote: '"Great code is invisible; what users experience is flawless speed, intuition, and undeniable value."',
        quoteAuthor: '— Core Tech Standard'
      }
    }
  },
  founders: {
    id: 'sec-founders',
    page: 'about',
    section_key: 'founders',
    section_name: 'Meet the Founders & Leadership',
    order_index: 4,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'LEADERSHIP & VISION',
      title: 'Meet the Visionaries Behind Black Grapes',
      subtitle: 'Passionate innovators dedicated to redefining software engineering standards.',
      photo: foundersImg,
      photoTagName: 'Mr. Arpit Jain & Mrs. Deepika Jain',
      photoTagRole: 'Founders & Executive Directors',
      heading: 'Driven By Innovation, Grounded In Excellence',
      intro: 'Behind Black Grapes Softech stand two visionary leaders with an unquenchable passion for digital advancement.',
      founder1Name: 'Mr. Arpit Jain — Founder & Chief Architect',
      founder1Bio: 'The driving force behind our software development journey. With a wealth of architectural experience and an instinctive knack for staying ahead of technological curves, he has pioneered cutting-edge solutions that have redefined client operations across industries.',
      founder2Name: 'Mrs. Deepika Jain — Co-Founder & Strategic Director',
      founder2Bio: 'Deepika Jain doesn’t just see challenges; she envisions opportunities. Her boundless creativity, strategic acumen, and people-first leadership have shaped our company’s culture of relentless innovation and customer delight.'
    }
  },
  core_values: {
    id: 'sec-core-values',
    page: 'about',
    section_key: 'core_values',
    section_name: 'Core Values Section',
    order_index: 5,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'OUR CORE DNA',
      title: 'The Values That Fuel Our Work',
      subtitle: 'Every decision we make, line of code we write, and system we deliver is guided by our core values.',
      values: [
        {
          title: 'Innovation-First Mindset',
          desc: 'We explore modern architectures and pioneering technologies to give our clients an unbeatable competitive advantage.'
        },
        {
          title: 'Uncompromised Quality',
          desc: 'Every piece of code is rigorously tested, clean, documented, and built to scale effortlessly under intense enterprise load.'
        },
        {
          title: 'Agile & Rapid Delivery',
          desc: 'Short iterative sprints, continuous feedback loops, and transparent milestones ensure on-time and on-budget delivery.'
        },
        {
          title: 'Client-Centric Synergy',
          desc: 'We do not view ourselves merely as vendors; we act as dedicated tech co-founders and growth partners in your journey.'
        }
      ]
    }
  },
  technical_expertise: {
    id: 'sec-domains',
    page: 'about',
    section_key: 'technical_expertise',
    section_name: 'Technical Expertise & Domains',
    order_index: 6,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'TECHNICAL EXPERTISE',
      title: 'Versatile Engineering Across Critical Digital Domains',
      subtitle: 'Our team delivers custom solutions across complex enterprise requirements with precision and high performance.',
      domains: [
        'CRM Software Systems',
        'MLM Architecture',
        'Full-Stack Web Apps',
        'iOS & Android Native/Flutter',
        'Cloud & DevOps (AWS/Azure)',
        'UI/UX Design Systems',
        'Enterprise ERP Solutions',
        'Interactive Game Development'
      ]
    }
  },
  milestones: {
    id: 'sec-milestones',
    page: 'about',
    section_key: 'milestones',
    section_name: 'Company Milestones & History',
    order_index: 7,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'OUR MILESTONES',
      title: 'A Decade of Relentless Evolution',
      subtitle: 'From a dedicated local engineering hub in Indore to an internationally trusted software powerhouse.',
      milestones: [
        {
          year: '2014',
          title: 'The Foundation',
          desc: 'Black Grapes Softech was founded in Indore with a vision to deliver world-class software development.'
        },
        {
          year: '2017',
          title: 'Specialized Enterprise Solutions',
          desc: 'Expanded into specialized CRM, MLM platforms, and high-performance cross-platform mobile apps.'
        },
        {
          year: '2021',
          title: 'Global Footprint Expansion',
          desc: 'Reached 150+ international deployments spanning North America, Europe, the Middle East, and Asia.'
        },
        {
          year: '2024 - 2026',
          title: 'AI, Cloud & Next-Gen Ecosystems',
          desc: 'Pioneering intelligent automation, scalable cloud infra, and enterprise-grade web applications.'
        }
      ]
    }
  },
  culture_hq: {
    id: 'sec-culture-hq',
    page: 'about',
    section_key: 'culture_hq',
    section_name: 'Headquarters & Culture Section',
    order_index: 8,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'HEADQUARTERS & CULTURE',
      title: 'Where Passionate Technologists Thrive',
      image: workspaceImg,
      locationTag: 'Indore Tech Hub — Madhya Pradesh, India',
      p1: 'Situated at 252-F/H Scheme No 54, Vijaynagar, Indore, our software development center is where bold ideas turn into robust reality.',
      p2: 'We cultivate an open culture of perpetual learning, deep code reviews, creative freedom, and rigorous problem-solving. This energetic environment inspires our engineers to push boundaries and build applications that inspire.',
      stat1Num: '50+',
      stat1Label: 'In-House Engineers & Designers',
      stat2Num: '100%',
      stat2Label: 'Code Quality & Transparency'
    }
  },
  final_cta: {
    id: 'sec-final-cta',
    page: 'about',
    section_key: 'final_cta',
    section_name: 'About Final CTA Banner',
    order_index: 9,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      title: 'Ready to Accelerate Your Business With Custom Tech?',
      text: 'Speak directly with our technical leadership. Let\'s design, engineer, and deploy your software solution with unmatched precision.',
      buttonText: 'Book a Technical Discovery Session'
    }
  }
};

export const DEFAULT_SERVICES = [
  {
    id: 'srv-1',
    title: 'Web App Architecture',
    slug: 'web-architecture',
    short_desc: 'Next-gen reactive web applications engineered with React, Next.js, and cloud backends.',
    full_desc: 'We build ultra-scalable, responsive, SEO-ready web applications with enterprise security and sub-second load times.',
    icon_name: 'Layers',
    category: 'Engineering',
    order_index: 1,
    status: 'published'
  },
  {
    id: 'srv-2',
    title: 'Mobile App Development (iOS/Android)',
    slug: 'mobile-apps',
    short_desc: 'High-performance native and cross-platform Flutter/React Native mobile applications.',
    full_desc: 'From concept to App Store / Google Play deployment, we deliver sleek, engaging mobile apps that users love.',
    icon_name: 'Smartphone',
    category: 'Engineering',
    order_index: 2,
    status: 'published'
  },
  {
    id: 'srv-3',
    title: 'Enterprise CRM Solutions',
    slug: 'enterprise-crm',
    short_desc: 'Tailor-made Customer Relationship Management platforms tailored to your sales funnel.',
    full_desc: 'Automate lead scoring, pipeline management, client communications, and real-time sales reporting.',
    icon_name: 'Building',
    category: 'Enterprise',
    order_index: 3,
    status: 'published'
  },
  {
    id: 'srv-4',
    title: 'MLM Software Systems',
    slug: 'mlm-software',
    short_desc: 'Robust multi-level marketing matrix, binary, generation, and commission calculation software.',
    full_desc: 'Secure, fraud-proof transaction handling with real-time wallet sync and instant payout calculations.',
    icon_name: 'Zap',
    category: 'Enterprise',
    order_index: 4,
    status: 'published'
  },
  {
    id: 'srv-5',
    title: 'Digital Growth & SEO',
    slug: 'digital-marketing',
    short_desc: 'Data-driven search engine optimization, performance marketing, and conversion growth.',
    full_desc: 'Dominating search rankings and driving targeted customer acquisition for your brand.',
    icon_name: 'TrendingUp',
    category: 'Marketing',
    order_index: 5,
    status: 'published'
  },
  {
    id: 'srv-6',
    title: 'UI/UX & Brand Identity',
    slug: 'ui-ux-design',
    short_desc: 'Human-centered user experience design, wireframing, high-fidelity prototypes, and design systems.',
    full_desc: 'Crafting captivating digital experiences that turn visitors into loyal paying customers.',
    icon_name: 'Palette',
    category: 'Design',
    order_index: 6,
    status: 'published'
  },
  {
    id: 'srv-7',
    title: 'Interactive Game Development',
    slug: 'game-development',
    short_desc: 'Engaging 2D/3D mobile and web games with real-time multiplayer logic and monetization.',
    full_desc: 'Built with Unity, WebGL, and high-performance server architectures.',
    icon_name: 'Award',
    category: 'Gaming',
    order_index: 7,
    status: 'published'
  },
  {
    id: 'srv-8',
    title: 'Cloud & DevOps (AWS/Azure)',
    slug: 'cloud-devops',
    short_desc: 'Zero-downtime CI/CD pipelines, Docker containerization, Kubernetes, and serverless architectures.',
    full_desc: 'Maximizing infrastructure reliability, security compliance, and cost efficiency.',
    icon_name: 'CloudLightning',
    category: 'DevOps',
    order_index: 8,
    status: 'published'
  }
];

export const DEFAULT_PROJECTS = PRODUCTS_LIST.map((prod, idx) => ({
  id: prod.id,
  product_key: prod.id,
  title: prod.title,
  subtitle: prod.subtitle,
  category: prod.category,
  industry: prod.industry,
  badge: prod.badge,
  badge_color: prod.badgeColor || 'orange',
  youtube_id: prod.youtubeId,
  deployment_days: prod.deploymentDays,
  rating: prod.rating,
  summary: prod.summary,
  key_features: prod.keyFeatures || [],
  tech_stack: prod.techStack || [],
  highlights: prod.highlights || [],
  order_index: idx + 1,
  status: 'published'
}));

export const DEFAULT_CLIENTS = CLIENTS_LIST.map((client, idx) => ({
  id: client.id,
  client_key: client.id,
  name: client.name,
  category: client.category,
  industry: client.industry,
  region: client.region,
  logo_url: client.logo,
  badge: client.badge,
  badge_color: client.badgeColor || 'orange',
  services: client.services,
  impact: client.impact,
  order_index: idx + 1,
  status: 'published'
}));

export const DEFAULT_CASE_STUDIES = CLIENT_CASE_STUDIES.map((cs, idx) => ({
  id: cs.id,
  client_name: cs.client,
  industry: cs.industry,
  title: cs.title,
  description: cs.desc,
  metrics: cs.metrics || [],
  tech_stack: cs.tech || [],
  order_index: idx + 1,
  status: 'published'
}));

export const DEFAULT_TESTIMONIALS = CLIENT_TESTIMONIALS.map((t, idx) => ({
  id: `testi-${idx + 1}`,
  quote: t.quote,
  author: t.author,
  role: t.role,
  company: t.company,
  country: t.country,
  rating: t.rating || 5,
  order_index: idx + 1,
  status: 'published'
}));

export const DEFAULT_TEAM_MEMBERS = [
  {
    id: 'team-1',
    name: 'Mr. Arpit Jain',
    role: 'Founder & Chief Architect',
    bio: 'The driving force behind our software development journey. With architectural mastery and modern cloud expertise, he has spearheaded 250+ enterprise rollouts globally.',
    photo_url: foundersImg,
    badge_tag: 'Founder',
    is_leadership: true,
    order_index: 1,
    status: 'published'
  },
  {
    id: 'team-2',
    name: 'Mrs. Deepika Jain',
    role: 'Co-Founder & Strategic Director',
    bio: 'Deepika Jain doesn’t just see challenges; she envisions opportunities. Her boundless creativity, strategic acumen, and people-first leadership have shaped our company’s culture of relentless innovation and customer delight.',
    photo_url: foundersImg,
    badge_tag: 'Co-Founder',
    is_leadership: true,
    order_index: 2,
    status: 'published'
  }
];

export const DEFAULT_BLOG_CATEGORIES = [
  { id: 'cat-1', name: 'Software Architecture', slug: 'software-architecture' },
  { id: 'cat-2', name: 'AI & Automation', slug: 'ai-automation' },
  { id: 'cat-3', name: 'Cloud & DevOps', slug: 'cloud-devops' },
  { id: 'cat-4', name: 'Product Engineering', slug: 'product-engineering' }
];

export const DEFAULT_BLOG_POSTS = [
  {
    id: 'blog-1',
    title: 'Architecting Scalable Microservices for High-Volume Enterprise Platforms',
    slug: 'architecting-scalable-microservices-enterprise',
    excerpt: 'How Black Grapes Softech designs resilient cloud backends capable of processing tens of thousands of requests per second without latency degradation.',
    content: 'In modern distributed computing, monolithic architectures frequently fail under unpredictable traffic spikes. In this article, our Chief Architect discusses event-driven architecture using Kafka, Redis clustering, and containerized microservices.',
    category_id: 'cat-1',
    cover_image: aboutHeroImg,
    author_name: 'Mr. Arpit Jain',
    read_time: '6 min read',
    tags: ['Architecture', 'Cloud', 'PostgreSQL', 'Microservices'],
    status: 'published',
    published_at: '2026-02-15T10:00:00.000Z'
  },
  {
    id: 'blog-2',
    title: 'The Future of Clinical EHR & Hospital Management in 2026',
    slug: 'future-clinical-ehr-hospital-management-2026',
    excerpt: 'Exploring how AI-assisted diagnostics and real-time OPD/IPD synchronization are transforming patient outcomes in modern hospitals.',
    content: 'Smart Operate healthcare ERP streamlines clinical documentation, insurance pre-authorizations, and pharmacy inventory. Learn about the technological shifts empowering healthcare providers today.',
    category_id: 'cat-4',
    cover_image: workspaceImg,
    author_name: 'Engineering Team',
    read_time: '5 min read',
    tags: ['Healthcare', 'ERP', 'EHR', 'AI'],
    status: 'published',
    published_at: '2026-03-01T12:30:00.000Z'
  }
];

export const DEFAULT_ENQUIRIES = [
  {
    id: 'enq-101',
    name: 'Vikram Mehta',
    email: 'vikram.mehta@zenithcorp.in',
    phone: '+91 9826012345',
    requirement: 'Enterprise CRM Solutions',
    message: 'We are seeking a customized CRM solution with multi-branch sales tracking and WhatsApp API automation for our 200+ sales agents.',
    source_page: 'Demo Modal',
    status: 'new',
    admin_notes: 'High-priority enterprise lead. Requires custom demo of sales pipeline automation.',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'enq-102',
    name: 'Emily Davis',
    email: 'emily@apexmobility.io',
    phone: '+1 415 890 2314',
    requirement: 'Mobile App Development (iOS/Android)',
    message: 'Interested in white-label deployment of your Taxi Booking & Ride Dispatch (RideWave) product for our European market pilot.',
    source_page: 'Product Estimator',
    status: 'contacted',
    admin_notes: 'Sent initial pricing brochure and scheduled discovery call for Thursday.',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

export const DEFAULT_SEO_METADATA = [
  {
    id: 'seo-1',
    page_route: '/',
    meta_title: 'About Us | Black Grapes Softech - Leading Software & Tech Agency',
    meta_description: 'Discover Black Grapes Softech - visionary software development agency empowering businesses worldwide with custom web, mobile, CRM, and cloud solutions.',
    meta_keywords: 'software company indore, custom web development, mobile app agency, crm development',
    canonical_url: 'https://blackgrapessoftech.com/'
  },
  {
    id: 'seo-2',
    page_route: '/about',
    meta_title: 'About Us | Black Grapes Softech - Leading Software & Tech Agency',
    meta_description: 'Discover Black Grapes Softech - visionary software development agency empowering businesses worldwide with custom web, mobile, CRM, and cloud solutions.',
    meta_keywords: 'about black grapes, software team, indore software engineering',
    canonical_url: 'https://blackgrapessoftech.com/about'
  },
  {
    id: 'seo-3',
    page_route: '/products',
    meta_title: 'Proprietary Software Catalog | Black Grapes Softech',
    meta_description: 'Explore 12+ enterprise turnkey products with instant video demos, ratings and turnkey delivery.',
    meta_keywords: 'school software, hospital erp, gym management, turnkey software',
    canonical_url: 'https://blackgrapessoftech.com/our-products'
  },
  {
    id: 'seo-4',
    page_route: '/clients',
    meta_title: 'Global Client Portfolio | Black Grapes Softech',
    meta_description: 'Trusted by 150+ international clients across 15+ nations including Alphabet, Mastercard, Fujitsu.',
    meta_keywords: 'black grapes clients, portfolio, case studies',
    canonical_url: 'https://blackgrapessoftech.com/our-clients'
  },
  {
    id: 'seo-5',
    page_route: '/services',
    meta_title: 'Services & Solutions Hub | Black Grapes Softech',
    meta_description: 'Enterprise software, mobile apps, CRM, MLM, cloud architectures and digital marketing.',
    meta_keywords: 'web services, flutter apps, crm development, mlm platform',
    canonical_url: 'https://blackgrapessoftech.com/services'
  },
  {
    id: 'seo-6',
    page_route: '/contact',
    meta_title: 'Contact Us | Black Grapes Softech - Indore Office',
    meta_description: 'Direct line: +91 7470997884. Office: 252-F/H Scheme No 54, Vijaynagar, Indore-452010.',
    meta_keywords: 'contact black grapes, indore office, it company phone',
    canonical_url: 'https://blackgrapessoftech.com/contact'
  }
];

export const DEFAULT_ADMIN_USERS = [
  {
    id: 'usr-1',
    email: 'admin@blackgrapessoftech.com',
    full_name: 'Black Grapes Super Admin',
    role: 'super_admin',
    is_active: true,
    last_login_at: new Date().toISOString()
  },
  {
    id: 'usr-2',
    email: 'editor@blackgrapessoftech.com',
    full_name: 'Content Operations Manager',
    role: 'editor',
    is_active: true,
    last_login_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

export const DEFAULT_ACTIVITY_LOGS = [
  {
    id: 'act-1',
    admin_email: 'admin@blackgrapessoftech.com',
    action: 'System Initialized',
    module: 'System',
    record_id: 'sys-init',
    description: 'Black Grapes Softech CMS & Admin Architecture initialized with default datasets and schema.',
    created_at: new Date().toISOString()
  }
];

export const DEFAULT_IT_STAFFING = {
  badge: 'FAST-TRACK IT & TECHNICAL STAFFING',
  headline: 'Hire Top 1% Pre-Vetted Tech Talent & Accelerate Engineering',
  subtitle: 'Scalable dedicated engineering squads, contract developers, and executive tech hires ready to deploy within 48 hours.',
  stats: [
    { label: 'Deployment Time', value: '48 Hours', sub: 'Ready-to-code talent' },
    { label: 'Vetting Standard', value: 'Top 1%', sub: 'Rigorous technical screens' },
    { label: 'Replacement Guarantee', value: '100%', sub: 'Zero-risk trial' },
    { label: 'Client Retention', value: '98.5%', sub: 'Long-term contracts' }
  ],
  mandateOptions: ['1-10', '10-50', '51-100', '101+'],
  staffingServices: [
    'NAPS/Apprenticeship Hiring',
    'Bulk Hiring',
    'Diversity Hiring',
    'Gig Hiring/Flexi Staffing',
    'General Staffing/Payroll Management',
    'IT/Technical Hiring'
  ],
  guaranteePoints: [
    '48-Hour Talent Deployment to your Slack or Jira',
    'Risk-Free 2-Week Trial Period',
    'Strict NDAs & Complete IP Transfer',
    'Transparent Hourly or Monthly Retainer Pricing'
  ],
  models: [
    { id: 'm-1', title: 'Dedicated Developers', desc: 'Full-time senior software engineers integrated into your sprint cycles.', rate: 'From $18/hr', bestFor: 'Scaling product teams' },
    { id: 'm-2', title: 'Managed Engineering Squads', desc: 'Autonomous squads complete with Tech Lead, QA, and Scrum Master.', rate: 'Custom Scope', bestFor: 'Turnkey feature builds' },
    { id: 'm-3', title: 'Contract & Flexi Staffing', desc: 'On-demand niche talent for specific project deliverables without long-term overhead.', rate: 'Flexible', bestFor: 'Spike workloads & MVPs' }
  ],
  testimonials: [
    {
      id: 't-1',
      name: 'Subodh Bhandari',
      role: 'Businessman',
      company: 'Enterprise Partner',
      rating: 5,
      quote: 'I have had the pleasure of working with Black Grapes Softech Company for the past few years, and I can confidently say that they have significantly transformed our business operations. Their software solutions have not only streamlined our processes but also boosted our efficiency and productivity to new heights.'
    }
  ]
};

export const DEFAULT_ECOMMERCE = {
  badge: 'BLACK GRAPES SOFTECH • OFFICIAL ECOMMERCE PLATFORM',
  title: 'Exciting News! Naya Purana Bazaar is Coming Soon!',
  byline: 'An Online Marketplace By Black Grapes Softech',
  domain: 'https://www.nayapuranabazaar.com',
  domainDisplay: 'nayapuranabazaar.com',
  targetLaunch: 'Q2 2026',
  summary: "India's next-generation hybrid marketplace connecting buyers and verified sellers for certified new and pre-owned goods with escrow security, fast courier logistics, and verified buyer protection.",
  categories: [
    { id: 'electronics', name: 'Electronics & Appliances', count: '120+ Listings Pending', icon: 'Cpu' },
    { id: 'vehicles', name: 'Two Wheelers & Cars', count: '85+ Listings Pending', icon: 'Car' },
    { id: 'furniture', name: 'Home & Office Furniture', count: '60+ Listings Pending', icon: 'Home' },
    { id: 'fashion', name: 'Fashion & Lifestyle', count: '200+ Listings Pending', icon: 'ShoppingBag' }
  ],
  buyerPerks: [
    '100% Escrow Payment Protection',
    'Doorstep Quality Verification',
    '7-Day Easy Return Policy',
    'Direct WhatsApp Chat with Sellers'
  ],
  sellerPerks: [
    '0% Listing Fee for First 100 Products',
    'Instant Payment Settlements to Bank',
    'Free Integrated Logistics & Pickup',
    'Automated Inventory & Invoicing Portal'
  ],
  waitlist_count: 450
};

export const DEFAULT_PARTNERSHIP = {
  heroBadge: 'PARTNERSHIP & ALLIANCES',
  heroTitle: 'Strategic Technology Alliances & Offshore Development',
  heroSubtitle: 'Cultivating long-term strategic relationships and delivering high-velocity offshore technology development.',
  partnerWithUsTitle: 'Partner With Us',
  partnerWithUsText: 'If you are an IT or web software development company and are eager to expand your operations here in India, we are ready to help you as your development centre. Our business community is focused on cultivating long-term relationships with our clients and offers excellent experiences covering the strategic insights. Partnering with us enables you to provide endless growth and development. You can share our resources for your project requirements to work on technical areas that directly affect the growth of the organization.',
  partnerImage: '/partners/partner_with_us.webp',
  benefits: [
    'Dedicated Offshore Development Center (ODC) setup in Indore tech corridor',
    'Seamless collaboration across global time zones (US, UK, UAE, Australia)',
    'Transparent billing, daily standups, and dedicated engineering leadership',
    'Strict intellectual property protection and confidentiality agreements'
  ],
  productPartnersTitle: 'Products Companies Tie-up',
  productPartnersIntro: 'Facilitating strategic alliances between product companies to expand reach, unlock mutual growth, and integrate complementary cloud platforms.',
  servicePartnersTitle: 'Services Companies Tie-up',
  servicePartnersIntro: 'Strategic collaborations between service enterprises to expand offerings, share cross-domain expertise, and co-deliver complex client mandates.'
};

export const DEFAULT_CONTACT_PAGE = {
  heroBadge: 'BLACK GRAPES GROUP',
  heroTitle: 'Get in Touch',
  heroSubtitle: 'We are here to help and answer any questions you might have. We look forward to hearing from you.',
  address1Label: 'Registered Office (Address 1)',
  address1Text: '252-F/H, Scheme No 54, Vijay Nagar, Indore-452010, Madhya Pradesh, India.',
  address1MapUrl: 'https://maps.app.goo.gl/qJcKNw9DMo4JVWrv8',
  address2Label: 'Development Centre (Address 2)',
  address2Text: 'Office No.1141, Scheme No.114, Part-1, Vijay Nagar, Indore-452010, Madhya Pradesh, India.',
  address2MapUrl: 'https://maps.app.goo.gl/yahxDsm7BLK652mA8',
  directPhones: [
    { name: 'Arpit Jain', phones: ['+91 9039397884', '+91 7470997884'] },
    { name: 'Support Desk', phones: ['+91 6262414463'] }
  ],
  emails: [
    { department: 'General Inquiries', email: 'info@blackgrapessoftech.com' },
    { department: 'Technical Support', email: 'support@blackgrapessoftech.com' }
  ],
  workingHours: 'Monday – Saturday: 10:00 AM – 7:30 PM (IST)'
};

export const DEFAULT_CLIENTS_PAGE = {
  heroBadge: 'TRUSTED BY 150+ GLOBAL ENTERPRISES',
  heroTitle: 'Our Clients:',
  heroTitleAccent: 'Powering Leaders Across 15+ Nations',
  heroSubtitle: 'At Black Grapes Softech, we take pride in our diverse and dynamic client portfolio. Our clients span various industries including finance, healthcare, e-commerce, education, and technology. We partner with both high-velocity startups and Fortune 500 enterprises to deliver innovative software solutions tailored to their unique needs.',
  primaryBtnText: 'Partner With Us',
  secondaryBtnText: 'Explore Client Brands',
  metrics: [
    { number: '150+', label: 'Enterprise Clients', highlight: 'Global Scale' },
    { number: '15+', label: 'Countries Served', highlight: 'Worldwide Reach' },
    { number: '99%', label: 'Client Retention', highlight: 'Long-term Trust' },
    { number: '$50M+', label: 'Value Generated', highlight: 'Measurable ROI' }
  ]
};

export const DEFAULT_SERVICES_PAGE = {
  badge: 'BLACK GRAPES GROUP',
  title: 'Services Built Specifically',
  titleAccent: ' For Your Business',
  subtitle: 'Empowering businesses with tailored solutions to meet your unique needs.',
  searchPlaceholder: 'Search services (Softech, Real Estate, Valuers, Investment, Insurance)...',
  tab1Label: 'Group Companies (6 Core)',
  tab2Label: 'IT Staffing Solutions',
  tab3Label: 'E-Commerce (Naya Purana Bazaar)',
  isVisible: true
};

export const DEFAULT_SOFTECH_PAGE = {
  badge: 'BLACK GRAPES SOFTECH • WHAT WE DO',
  title: 'Engineering High-Impact Custom Software & Digital Products',
  subtitle: 'From bespoke web platforms and native mobile apps to AI-powered enterprise automation, we build scalable software designed to lead your market.',
  primaryCtaText: 'Request Technical Quote',
  secondaryCtaText: 'Schedule Consultation',
  industriesBadge: 'CROSS-INDUSTRY EXPERTISE',
  industriesTitle: 'Software Tailored for Real-World Business Vertical Demands',
  isVisible: true
};

export const DEFAULT_PRODUCTS_PAGE = {
  badge: 'BLACK GRAPES SOFTECH PROPRIETARY SUITE',
  title: 'Our Products:',
  titleAccent: 'Engineered to Transform Modern Business',
  subtitle: 'Explore our cutting-edge software solutions designed to transform the way you work and elevate your business to new heights. Our Products showcase a diverse range of powerful and user-friendly software applications tailored to meet the unique needs of modern businesses.',
  stats: [
    { metric: '12+', label: 'Turnkey Products' },
    { metric: '100%', label: 'Source Code Ownership' },
    { metric: '7+', label: 'Core Industries' },
    { metric: '5-7', label: 'Days Deployment' }
  ],
  primaryBtnText: 'Request Live Demo',
  secondaryBtnText: 'Browse All Products',
  pillTitle: 'Live Production Ready',
  pillSub: 'Cloud Native • Web • iOS • Android',
  pillBadge: 'WHITE-LABEL',
  isVisible: true
};


