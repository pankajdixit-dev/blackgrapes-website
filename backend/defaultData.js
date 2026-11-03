const foundersImg = '/images/founders.jpg';
const aboutHeroImg = '/images/about-hero.jpg';
const workspaceImg = '/images/workspace.jpg';
const logoImg = '/bgst-logo.png';
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

export const DEFAULT_HOME_SECTIONS = {
  home_hero: {
    id: 'sec-home-hero',
    page: 'home',
    section_key: 'home_hero',
    section_name: 'Home Hero & Headline',
    order_index: 1,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      eyebrowBadge: '10+ Years of Proven IT Excellence • Indore, India',
      prefix: 'Innovate. Integrate. Elevate.',
      title: 'And Digitalize Your Ideas into Success via',
      brandHighlight: 'BLACK GRAPES SOFTECH',
      suffix: ', Where Innovation And ideas Meets Excellence.',
      lead: 'Get Free Consultation From Our Industry Experts. We engineer scalable custom software, iOS & Android mobile apps, enterprise CRMs, MLM platforms, and high-conversion websites for ambitious startups and global enterprises.',
      primaryBtnText: 'Request a Demo',
      secondaryBtnText: 'Get the offer',
      linkBtnText: 'View Services',
      stat1Num: '10+',
      stat1Label: 'Years Experience',
      stat2Num: '100+',
      stat2Label: 'Satisfied Clients',
      stat3Num: '150+',
      stat3Label: 'Projects Shipped',
      stat4Num: '25+',
      stat4Label: 'Expert Engineers',
      codeSnippetTitle: 'FullStackApp.tsx',
      codeSnippetTag: 'Live Production'
    }
  },
  home_philosophy: {
    id: 'sec-home-philosophy',
    page: 'home',
    section_key: 'home_philosophy',
    section_name: 'Brand Philosophy & Purposeful Beginnings',
    order_index: 2,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      eyebrow: 'BLACK GRAPES PHILOSOPHY • PURPOSEFUL BEGINNINGS',
      title: 'MORE THAN A SERVICE.',
      titleHighlight: 'A COMMITMENT TO TIME & SCALE.',
      lead: 'Every transformative enterprise starts with a decisive moment. At Black Grapes Group, our approach embodies purposeful beginnings, engineering rigor, and the execution power to turn ambitious visions into enduring realities.',
      mantra1: 'BEGIN WITH PURPOSE',
      mantra2: 'ENGINEER WITH RIGOR',
      mantra3: 'DELIVER ON TIME',
      pillarBadge: '01 / THE TIMELESS PRINCIPLE',
      pillarTitle: 'A MOMENT OF PURPOSE. A BEGINNING OF POSSIBILITIES.'
    }
  },

  home_services: {
    id: 'sec-home-services',
    page: 'home',
    section_key: 'home_services',
    section_name: 'Services Grid Showcase',
    order_index: 3,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'WHAT WE DO',
      title: 'We Provide Best Quality Services & Products At',
      titleHighlight: 'Affordable Price',
      subtitle: 'Here is the list of specialized IT services and scalable digital solutions that we provide to elevate your business.'
    }
  },
  home_about: {
    id: 'sec-home-about',
    page: 'home',
    section_key: 'home_about',
    section_name: 'About Section Showcase',
    order_index: 4,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'ABOUT BLACK GRAPES SOFTECH',
      title: 'Best Website Development Company | Best IT Software Company | Best Mobile App Development Company',
      lead: 'Headquartered in Indore, India, Black Grapes Softech is a premier software engineering & digital transformation agency. We translate complex business hurdles into elegant, high-impact digital products.'
    }
  },
  home_why_us: {
    id: 'sec-home-why-us',
    page: 'home',
    section_key: 'home_why_us',
    section_name: 'Why Choose Us Section',
    order_index: 5,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'WHY CHOOSE US ?',
      title: 'Built On Security, Uncompromising Quality &',
      titleHighlight: 'Lifelong Relationships',
      vision: 'Our commitment is to eliminate technological roadblocks, provide unmatched security, and build software that scales effortlessly with your commercial ambition.',
      pillars: [
        {
          title: 'High Security & Rock-Solid Reliability',
          subtitle: 'Security & Reliability',
          description: 'Every software build incorporates enterprise-grade cryptographic controls, zero-trust protocols, continuous vulnerability scanning, and reliable data pipelines.',
          image: '/images/services-infograph.png',
          points: [
            'Zero-trust access architectures & hardened endpoints',
            'ISO and statutory data compliance safeguards',
            '24/7 proactive monitoring & self-healing cloud nodes'
          ]
        },
        {
          title: 'Unmatched Perfection & Clean Architecture',
          subtitle: 'Pure Perfection',
          description: 'We adhere to clean code principles, test-driven methodologies, and modular microservices to ensure software that never degrades over time.',
          image: '/images/tech-innovation.jpg',
          points: [
            'High test coverage & automated CI/CD pipelines',
            'Sub-second page loads & optimized SQL/NoSQL indexes',
            'Enterprise design systems & accessible interfaces'
          ]
        },
        {
          title: 'Lifelong Partnership & Continuous Evolution',
          subtitle: 'Strategic Evolution',
          description: 'We view ourselves as dedicated technology co-founders. Our commitment extends far past deployment to ongoing modernization and scaling.',
          image: '/images/workspace.jpg',
          points: [
            'Dedicated technical account management',
            'SLA-backed priority engineering support',
            'Quarterly cloud cost optimization & performance tuning'
          ]
        }
      ]
    }
  },
  home_projects: {
    id: 'sec-home-projects',
    page: 'home',
    section_key: 'home_projects',
    section_name: 'Portfolio / Projects Showcase',
    order_index: 6,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'OUR PORTFOLIO',
      title: 'Explore Some of Our Best',
      titleHighlight: 'Development Work',
      subtitle: 'Browse through custom websites, cross-platform mobile apps, enterprise web applications, and e-commerce platforms we have delivered globally.'
    }
  },
  home_testimonials: {
    id: 'sec-home-testimonials',
    page: 'home',
    section_key: 'home_testimonials',
    section_name: 'Client Testimonials Showcase',
    order_index: 7,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'CLIENT TESTIMONIALS',
      title: 'What Global Leaders Say About',
      titleHighlight: 'Our Partnership',
      subtitle: 'Direct feedback from startup founders and enterprise CTOs who trusted us to engineer their flagship software products.'
    }
  },
  home_industries: {
    id: 'sec-home-industries',
    page: 'home',
    section_key: 'home_industries',
    section_name: 'Industries We Serve',
    order_index: 8,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'INDUSTRIES',
      title: 'Tailored IT Solutions Across',
      titleHighlight: 'High-Growth Industries',
      subtitle: 'From regulated healthcare ecosystems to high-velocity on-demand logistics, we engineer software built for specific market dynamics.',
      industries: [
        { name: 'Healthcare', desc: 'HIPAA-ready telemedicine, patient portals, and automated diagnostic workflows.' },
        { name: 'Food Delivery', desc: 'Real-time GPS dispatch, restaurant partner dashboards, and multi-currency checkouts.' },
        { name: 'E-Commerce', desc: 'Headless storefronts, custom CRM integration, and high-concurrency payment engines.' },
        { name: 'Taxi and Transportation', desc: 'Live ride hailing, driver telemetry, dynamic surge pricing, and fleet tracking.' },
        { name: 'Home Services', desc: 'On-demand service booking, verified technician scheduling, and instant escrow billing.' },
        { name: 'Education', desc: 'Interactive LMS suites, live virtual classrooms, proctored exams, and student analytics.' },
        { name: 'Real Estate', desc: 'Virtual 3D property tours, MLS feeds, agent CRM platforms, and escrow agreements.' },
        { name: 'FinTech & Banking', desc: 'Multi-tiered wallet engines, automated compliance checks, and micro-lending portals.' }
      ]
    }
  },
  home_cta: {
    id: 'sec-home-cta',
    page: 'home',
    section_key: 'home_cta',
    section_name: 'Bottom CTA Banner',
    order_index: 3,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'GET STARTED WITH BLACK GRAPES SOFTECH',
      title: 'Assess Your Business Potentials Now & Find',
      titleHighlight: 'Take Care of What Matters Most!',
      subtitle: 'Speak directly with our senior architects. Whether you need a full enterprise software build, high-conversion mobile app, or modern web platform, we deliver excellence on time and on budget.',
      primaryBtnText: 'Get Started Now!',
      secondaryBtnText: 'Get Free Consultation'
    }
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
    canonical_url: 'https://blackgrapessoftech.com/contact',
    og_image: ''
  },
  {
    id: 'seo-7',
    page_route: '/it-staffing',
    meta_title: 'IT Staffing & Contractual Hiring | Black Grapes Softech',
    meta_description: 'Deploy pre-vetted senior software engineers, technical squads, and bulk contractual staff across 28 Indian states.',
    meta_keywords: 'it staffing, contractual hiring, technical manpower, dev staffing indore',
    canonical_url: 'https://blackgrapessoftech.com/it-staffing',
    og_image: '/it-staffing/staffing-hero.jpg'
  },
  {
    id: 'seo-8',
    page_route: '/ecommerce',
    meta_title: 'Naya Purana Bazaar | Black Grapes Softech Online Marketplace',
    meta_description: 'An online marketplace platform by Black Grapes Softech for buying and selling new and used products.',
    meta_keywords: 'nayapuranabazaar, ecommerce marketplace, buy sell products, indore ecommerce',
    canonical_url: 'https://blackgrapessoftech.com/ecommerce',
    og_image: ''
  },
  {
    id: 'seo-9',
    page_route: '/partnership',
    meta_title: 'Partnership Program | Black Grapes Softech Development Centre',
    meta_description: 'Cultivating long-term strategic relationships and delivering high-velocity offshore technology development in India.',
    meta_keywords: 'offshore development centre, software partnership, it outsourcing partner india',
    canonical_url: 'https://blackgrapessoftech.com/partnership',
    og_image: '/partners/partner_with_us.webp'
  },
  {
    id: 'seo-10',
    page_route: '/business-partners',
    meta_title: 'Our Business Partners | Black Grapes Softech Alliances',
    meta_description: 'Forging strategic alliances, distribution networks, and scalable tech integrations across global enterprise platforms.',
    meta_keywords: 'business partners, strategic alliances, distribution networks, tech integrations',
    canonical_url: 'https://blackgrapessoftech.com/business-partners',
    og_image: ''
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


export const DEFAULT_SERVICES_PAGE_SECTIONS = {
  services_hero: {
    id: 'sec-services-hero',
    page: 'services',
    section_key: 'services_hero',
    section_name: 'Services Hero Banner',
    order_index: 1,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      eyebrow: 'ENTERPRISE TECH STACK',
      title: 'Specialized IT Services & High-Yield Solutions',
      titleHighlight: 'For Ambitious Enterprises',
      subtitle: 'From bespoke ERPs and CRM engines to native mobile apps and scalable cloud architectures.',
      stat1Num: '50+',
      stat1Label: 'Specialized Services',
      stat2Num: '99.9%',
      stat2Label: 'SLA Reliability',
      stat3Num: '24/7',
      stat3Label: 'Architecture Support'
    }
  },
  services_intro: {
    id: 'sec-services-intro',
    page: 'services',
    section_key: 'services_intro',
    section_name: 'Services Group Overview',
    order_index: 2,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'WHAT WE DO',
      title: 'Empowering Modern Enterprises with Transformational Tech',
      description: 'Explore our multi-disciplinary engineering hubs designed for high conversion, compliance, and enterprise scalability.'
    }
  },
  services_cta: {
    id: 'sec-services-cta',
    page: 'services',
    section_key: 'services_cta',
    section_name: 'Services Inquiry Callout',
    order_index: 3,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      title: 'Need a Custom Technology Architecture?',
      subtitle: 'Speak directly with our principal architects for sprint estimates and tech stack advisory.',
      btnText: 'Request Technical Discovery'
    }
  }
};

export const DEFAULT_PRODUCTS_PAGE_SECTIONS = {
  products_hero: {
    id: 'sec-products-hero',
    page: 'products',
    section_key: 'products_hero',
    section_name: 'Products Hero Showcase',
    order_index: 1,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      eyebrow: 'PROPRIETARY PLATFORMS',
      title: 'Turnkey Enterprise Software Solutions',
      titleHighlight: 'Ready for Deployment',
      subtitle: 'Battle-tested CRM suites, MLM architectures, multi-vendor marketplaces, and ERP solutions built for high concurrency.',
      ctaBtnText: 'Explore Catalog',
      demoBtnText: 'Request Live Demo'
    }
  },
  products_video: {
    id: 'sec-products-video',
    page: 'products',
    section_key: 'products_video',
    section_name: 'Product Demonstration Video',
    order_index: 2,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'LIVE DEMO',
      title: 'Experience Our Platforms in Action',
      subtitle: 'Interactive walk-through of the administrative dashboard, high-concurrency payment engine, and analytics.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  }
};

export const DEFAULT_CLIENTS_PAGE_SECTIONS = {
  clients_hero: {
    id: 'sec-clients-hero',
    page: 'clients',
    section_key: 'clients_hero',
    section_name: 'Clients Hero Banner',
    order_index: 1,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      eyebrow: 'GLOBAL IMPACT & PARTNERSHIPS',
      title: 'Trusted By Ambitious Enterprises',
      titleHighlight: 'Across 15+ Countries',
      subtitle: 'From disruptive startups to Fortune-caliber institutions, discover how our software engineering accelerates market leadership.',
      stat1Num: '150+',
      stat1Label: 'Deployments',
      stat2Num: '15+',
      stat2Label: 'Countries',
      stat3Num: '99%',
      stat3Label: 'Retention'
    }
  }
};

export const DEFAULT_STAFFING_PAGE_SECTIONS = {
  staffing_hero: {
    id: 'sec-staffing-hero',
    page: 'it-staffing',
    section_key: 'staffing_hero',
    section_name: 'IT Staffing Hero & Lead Form',
    order_index: 1,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      eyebrow: 'CONTRACT & DEDICATED IT TALENT',
      title: 'High-Velocity Contract & Permanent',
      titleHighlight: 'Staffing Solutions',
      subtitle: 'Pre-vetted software engineers, full-stack developers, cloud architects, and tech leaders ready to deploy within 48 to 72 hours.',
      stat1Num: '25,000+',
      stat1Label: 'Active on Payroll',
      stat2Num: '28 States',
      stat2Label: 'Pan-India Reach',
      stat3Num: '48 Hours',
      stat3Label: 'Rapid Deployment SLA',
      stat4Num: '100%',
      stat4Label: 'Statutory Compliant'
    }
  }
};

export const DEFAULT_ECOMMERCE_PAGE_SECTIONS = {
  ecommerce_hero: {
    id: 'sec-ecommerce-hero',
    page: 'ecommerce',
    section_key: 'ecommerce_hero',
    section_name: 'E-Commerce Platform Hero',
    order_index: 1,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      eyebrow: 'NEXT-GEN MULTI-VENDOR MARKETPLACE',
      title: 'Empowering India’s New & Pre-Owned',
      titleHighlight: 'Trade Ecosystem',
      subtitle: 'An end-to-end scalable marketplace platform connecting verified buyers and sellers nationwide with instant escrow.',
      domainUrl: 'https://www.nayapuranabazaar.com',
      waitlistBtnText: 'Join Seller Waitlist'
    }
  }
};

export const DEFAULT_CONTACT_PAGE_SECTIONS = {
  contact_hero: {
    id: 'sec-contact-hero',
    page: 'contact',
    section_key: 'contact_hero',
    section_name: 'Contact Header & Coordinates',
    order_index: 1,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      eyebrow: 'GET IN TOUCH',
      title: 'Let’s Engineer Something Extraordinary',
      titleHighlight: 'Together',
      subtitle: 'Reach out to our principal consultants in Indore, India. We are ready to translate your hurdles into robust digital engines.',
      address: '252-F/H, Scheme No 54, PU 4, Commercial, Vijay Nagar, Indore, Madhya Pradesh 452010',
      phone: '+91 7470997884',
      email: 'info@blackgrapessoftech.com',
      hours: 'Monday - Saturday: 10:00 AM - 7:00 PM IST',
      mapUrl: 'https://maps.google.com'
    }
  }
};

export const DEFAULT_PARTNERSHIP_PAGE_SECTIONS = {
  partnership_hero: {
    id: 'sec-partnership-hero',
    page: 'partnership',
    section_key: 'partnership_hero',
    section_name: 'Partnership Program Hero',
    order_index: 1,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      eyebrow: 'GLOBAL STRATEGIC ALLIANCES',
      title: 'Build High-Yield Tech Partnerships with',
      titleHighlight: 'Black Grapes Softech',
      subtitle: 'We act as your dedicated offshore engineering arm, technology incubator, and scalable co-founding team.',
      btnText: 'Submit Alliance Proposal'
    }
  }
};

export const DEFAULT_BUSINESS_PARTNERS_PAGE_SECTIONS = {
  bp_hero: {
    id: 'sec-bp-hero',
    page: 'business-partners',
    section_key: 'bp_hero',
    section_name: 'Business Partners Hero',
    order_index: 1,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      eyebrow: 'ENTERPRISE TIE-UPS',
      title: 'Our Strategic Business Partners &',
      titleHighlight: 'Alliance Ecosystem',
      subtitle: 'Forging deep integrations with global cloud networks, enterprise ERPs, and specialized technology ecosystems.'
    }
  }
};

export const ALL_PAGE_DEFINITIONS = [
  { slug: 'home', name: 'Home Page', path: '/' },
  { slug: 'about', name: 'About Us', path: '/about' },
  { slug: 'services', name: 'Services Hub', path: '/services' },
  { slug: 'products', name: 'Products & Platforms', path: '/products' },
  { slug: 'clients', name: 'Clients & Portfolio', path: '/clients' },
  { slug: 'it-staffing', name: 'IT Staffing Solutions', path: '/it-staffing' },
  { slug: 'ecommerce', name: 'E-Commerce Solutions', path: '/ecommerce' },
  { slug: 'contact', name: 'Contact & Coordinates', path: '/contact' },
  { slug: 'partnership', name: 'Partnership Program', path: '/partnership' },
  { slug: 'business-partners', name: 'Business Partners', path: '/business-partners' }
];

export function getPageDefaultSections(pageSlug) {
  switch (pageSlug) {
    case 'home':
      return DEFAULT_HOME_SECTIONS;
    case 'about':
      return DEFAULT_PAGE_SECTIONS;
    case 'services':
      return DEFAULT_SERVICES_PAGE_SECTIONS;
    case 'products':
      return DEFAULT_PRODUCTS_PAGE_SECTIONS;
    case 'clients':
      return DEFAULT_CLIENTS_PAGE_SECTIONS;
    case 'it-staffing':
      return DEFAULT_STAFFING_PAGE_SECTIONS;
    case 'ecommerce':
      return DEFAULT_ECOMMERCE_PAGE_SECTIONS;
    case 'contact':
      return DEFAULT_CONTACT_PAGE_SECTIONS;
    case 'partnership':
      return DEFAULT_PARTNERSHIP_PAGE_SECTIONS;
    case 'business-partners':
      return DEFAULT_BUSINESS_PARTNERS_PAGE_SECTIONS;
    default:
      return {};
  }
}
