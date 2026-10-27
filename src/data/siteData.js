// Centralized content data for Black Grapes Softech website
// Preserves 100% of the original content while structuring it for the modern UI

export const COMPANY_INFO = {
  name: "Black Grapes Softech",
  shortName: "BGST",
  tagline: "Innovate. Integrate. Elevate. And Digitalize Your Ideas into Success",
  subTagline: "Where Innovation And ideas Meets Excellence.",
  consultationText: "Get Free Consultation From Our Industry Experts",
  experienceYears: "10+",
  clientsCount: "100+",
  projectsCount: "150+",
  servicesCount: "50+",
  teamMembersCount: "25+",
  emails: [
    "info@blackgrapessoftech.com",
    "blackgrapes.arpitjain@gmail.com",
    "blackgrapes.deepikajain@gmail.com"
  ],
  phones: [
    "+91 7470997884",
    "+91 6262414463"
  ],
  whatsappNumber: "+917470997884",
  address: "252-F/H Scheme No 54, Vijaynagar, Indore - 452010, Madhya Pradesh, India",
  googleMapsUrl: "https://maps.google.com/?q=Vijaynagar,Indore,Madhya+Pradesh,India",
  workingHours: "Mon - Sat: 9:00 AM - 8:00 PM IST",
  copyright: `© ${new Date().getFullYear()} Black Grapes Softech. All Rights Reserved.`
};

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/#about" },
  {
    name: "Services",
    href: "/#services",
    dropdown: [
      { name: "Website Designing and Development", desc: "Responsive, high-conversion web platforms", href: "/#services" },
      { name: "Mobile App Development", desc: "Native iOS, Android & Flutter cross-platform", href: "/#services" },
      { name: "Software Development", desc: "Custom enterprise software & cloud backends", href: "/#services" },
      { name: "CRM Software Development", desc: "Custom lead & relationship tracking tools", href: "/#services" },
      { name: "MLM Software Development", desc: "Binary, matrix, generation plans & digital wallets", href: "/#services" },
      { name: "Digital Marketing", desc: "ROI-driven SEO, SEM, and social growth", href: "/#services" },
      { name: "Graphic Designing", desc: "UI/UX, branding identities & visual media", href: "/#services" },
      { name: "Game Development", desc: "Immersive 2D & 3D gaming experiences", href: "/#services" }
    ]
  },
  {
    name: "Partnership",
    href: "/partnership",
    dropdown: [
      { name: "Partner With Us", desc: "Offshore development centre & resource sharing", href: "/partnership#partner-form" },
      { name: "Business Partners", desc: "Product companies tie-up & alliances", href: "/partnership#tie-ups" },
      { name: "Partnership Models", desc: "Dedicated pods, staff aug & white-label", href: "/partnership#models" }
    ]
  },
  {
    name: "Tendering",
    href: "/#tendering",
    dropdown: [
      { name: "Government Tender Services", desc: "GeM & e-Procurement technical bidding", href: "/#tendering" },
      { name: "Private Tender Services", desc: "Corporate RFP execution & compliance", href: "/#tendering" }
    ]
  },
  { name: "Our Projects", href: "/#projects" },
  { name: "Why Us", href: "/#why-us" },
  { name: "Industries", href: "/#industries" },
  { name: "Contact Us", href: "/contact-us" }
];

export const ABOUT_CONTENT = {
  badge: "ABOUT COMPANY",
  mainTitle: "Best Website Development Company | Best IT Software Company | Best Mobile App Development Company",
  subtitle: "Black Grapes Softech – Best Website Development Company, App Development, MLM Software, Digital Marketing Services in Indore at Affordable price and best services",
  primaryParagraph: "Black Grapes Softech is an IT Company extending its services in the field of Software Development. We’re not just another company; we’re your innovation partner. With a passion for coding and a commitment to excellence, we craft solutions that push the boundaries of what’s possible. Our team of techsavvy wizards brings diverse expertise to the table. From web and mobile apps to cutting-edge AI and IoT solutions, we’ve got it all covered. Our customization prowess knows no bounds. We take your vision and turn it into reality, creating software that aligns perfectly with your goals.",
  secondaryParagraph: "Searching a company/agency for best customized IT solutions at affordable price, then your search ends here. With more than 10+ Years of experience in IT development field with energetic team of IT professionals, we feel privileged to meet our clients' digital needs in the best professional way. Our dedicated developers are always in search for the development by using latest technologies for app and website developing services to present the best product. Our company has served lots of Startups, Small and Big Organizations to build scalable, enterprise-level apps, websites, and software.",
  coreValues: [
    {
      title: "Passionate Craftsmanship",
      desc: "Relentless attention to code quality, modern UX patterns, and zero compromises on software reliability."
    },
    {
      title: "End-to-End Customization",
      desc: "Tailored architecture built specifically around your enterprise workflows rather than cookie-cutter templates."
    },
    {
      title: "Affordable Enterprise Tech",
      desc: "High-grade engineering delivered at competitive rates, giving startups and SMBs an unfair advantage."
    }
  ],
  qaItems: [
    {
      q: "The purpose of life coaching & IT strategy?",
      a: "Strategic alignment between your commercial vision and technical infrastructure. We formulate tech roadmaps that empower teams and maximize business viability."
    },
    {
      q: "Past, present & future digital exercise",
      a: "Reviewing legacy blockers, optimizing current workflows, and future-proofing architectures with cloud scalability and AI readiness."
    },
    {
      q: "How do you perceive value & ROI?",
      a: "Value is measured in operational hours saved, conversions multiplied, and systems that seamlessly scale without compounding overhead."
    }
  ]
};

export const SERVICES = [
  {
    id: "website-development",
    title: "Website Designing and Development",
    shortDesc: "High-speed, responsive, custom websites and enterprise web applications engineered for engagement and conversion.",
    fullDesc: "We build pixel-perfect, modern web applications leveraging React, Next.js, Vue, and modern serverless stacks. From high-converting corporate portals to complex web apps, our solutions are SEO-optimized, mobile-responsive, and blazing fast.",
    image: "/images/Website-Designing.jpg",
    tags: ["React", "Next.js", "SEO Optimized", "Responsive UI", "Custom CMS"],
    color: "#f86200"
  },
  {
    id: "mobile-app",
    title: "Mobile App Development",
    shortDesc: "Native and cross-platform mobile apps for Android and iOS with fluid animations and rock-solid offline support.",
    fullDesc: "Specializing in Flutter, React Native, Swift, and Kotlin, we craft mobile experiences that users love. Whether consumer apps, enterprise utilities, or on-demand delivery portals, we ensure seamless App Store and Play Store approval.",
    image: "/images/app.jpg",
    tags: ["Flutter", "React Native", "iOS / Android", "Firebase", "API Sync"],
    color: "#9333ea"
  },
  {
    id: "software-development",
    title: "Software Development",
    shortDesc: "Custom business software, ERP systems, and automated enterprise workflows built for speed and reliability.",
    fullDesc: "We design robust backends, cloud microservices, and database systems that eliminate manual bottlenecks. Scale operations with custom desktop and cloud software tailored to your specific organizational needs.",
    image: "/images/Software.jpg",
    tags: ["Custom ERP", "Microservices", "Cloud Database", "Python / Node", "API Gateway"],
    color: "#3b82f6"
  },
  {
    id: "crm-software",
    title: "CRM Software Development",
    shortDesc: "Custom CRM platforms to track leads, automate sales pipelines, and empower customer success teams.",
    fullDesc: "Eliminate scattered spreadsheets with unified customer data, automated follow-up workflows, omnichannel messaging, and real-time sales reporting tailored to your sales process.",
    image: "/images/crm-1.png",
    tags: ["Lead Scoring", "Pipeline Automation", "WhatsApp Integration", "Role Access"],
    color: "#10b981"
  },
  {
    id: "mlm-software",
    title: "MLM Software Development",
    shortDesc: "High-performance Multi-Level Marketing software with binary, matrix, unilevel plans and secure digital wallets.",
    fullDesc: "Engineered specifically for MLM and network marketing organizations. Features include automated payout calculation, genealogy tree views, fraud detection, member management, and integrated payment gateways.",
    image: "/images/mlm-software.png",
    tags: ["Binary / Matrix Plans", "Digital Wallet", "Genealogy Tree", "Auto Payouts"],
    color: "#ec4899"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    shortDesc: "Data-backed SEO, Google Ads, Meta campaigns, and growth strategies that generate qualified client leads.",
    fullDesc: "We drive measurable growth. From top-tier organic search rankings to laser-targeted paid advertising and social media engagement, our digital marketing team delivers real ROI for your brand.",
    image: "/images/digital-marketing.jpg",
    tags: ["SEO & SEM", "Social Media", "Lead Funnels", "Google Ads", "Content Growth"],
    color: "#f59e0b"
  },
  {
    id: "graphic-designing",
    title: "Graphic Designing",
    shortDesc: "Impactful brand visual identity, UI/UX prototyping, marketing graphics, and custom illustration assets.",
    fullDesc: "Transform brand perception with sophisticated visual storytelling. We craft modern logos, interactive UI wireframes, social media creatives, brochures, and enterprise design systems.",
    image: "/images/Graphic-Design-Black-Grapes-Softech.jpg",
    tags: ["Figma UI/UX", "Brand Identity", "Vector Graphics", "Social Kits", "3D Art"],
    color: "#8b5cf6"
  },
  {
    id: "game-development",
    title: "Game Development",
    shortDesc: "Captivating 2D & 3D games across mobile, web, and desktop with smooth physics and addictive gameplay.",
    fullDesc: "Using Unity and modern WebGL engines, we build multiplayer and single-player games with immersive audio, vibrant graphics, in-app economies, and fluid cross-platform mechanics.",
    image: "/images/Game-Development.jpg",
    tags: ["Unity 3D", "WebGL", "Cross-Platform", "Physics Engine", "In-Game Store"],
    color: "#06b6d4"
  }
];

export const WHY_CHOOSE_US = {
  vision: "To be the most admired creative and affordable IT solutions company in the world.",
  pillars: [
    {
      title: "Security Assurance",
      subtitle: "Uncompromised Data & Infrastructure Safety",
      description: "We never compromise with security. We use best technology with expert developers to develop your product or service. Never worry about vulnerabilities with our rigorous code audits and encryption protocols.",
      image: "/images/Security-1.jpg",
      points: [
        "End-to-End Data Encryption",
        "Rigorous Code Audits & Pen-testing",
        "OWASP Compliance & Secure Auth",
        "Automated Vulnerability Monitoring"
      ]
    },
    {
      title: "Quality Assurance",
      subtitle: "Software Built Like Modern Craftsmanship",
      description: "We are known for providing best services and developing top notch quality of software in the market. For us maintaining quality of software is same as maintaining yourself in a society.",
      image: "/images/quality.jpg",
      points: [
        "Automated & Manual Regression Testing",
        "Sub-second Response Times & 99.9% Uptime",
        "Clean, Maintainable Architecture",
        "Cross-Browser & Multi-Device Parity"
      ]
    },
    {
      title: "Good Relationship",
      subtitle: "Long-Term Collaborative Technology Partners",
      description: "We are not just fulfilling client’s requirement, we maintain best relationship with our client so that we can work together to grow our businesses. Plan to work together for new ideas.",
      image: "/images/good-business-relationship-2.jpg",
      points: [
        "Dedicated Account & Project Manager",
        "Transparent Sprint Updates & Demos",
        "Continuous Post-Launch Maintenance",
        "Strategic Product Co-Innovation"
      ]
    }
  ]
};

export const PROJECTS = [
  {
    name: "www.borit.com",
    category: "Website",
    type: "Corporate Web Experience",
    desc: "Precision engineering corporate portal with sleek branding and multi-language support.",
    url: "https://www.borit.com"
  },
  {
    name: "blushandbloom.co.in",
    category: "E-Commerce",
    type: "Luxury Cosmetics & Lifestyle",
    desc: "High-conversion D2C cosmetics eCommerce platform with seamless checkout and inventory sync.",
    url: "https://blushandbloom.co.in"
  },
  {
    name: "atonfitness.in",
    category: "Website",
    type: "Health & Fitness Platform",
    desc: "Interactive fitness training, membership management, and workout schedule ecosystem.",
    url: "https://atonfitness.in"
  },
  {
    name: "IOS App - ReadMore",
    category: "Android / IOS - Mobile Apps",
    type: "Digital Reading & E-Book Utility",
    desc: "Feature-rich iOS reader application with personalized annotations, dark mode, and cloud sync.",
    url: "#"
  },
  {
    name: "IOS App - DBT 24/7",
    category: "Android / IOS - Mobile Apps",
    type: "FinTech & Banking Service App",
    desc: "Secure mobile banking utility with biometric login, real-time transfers, and statement generator.",
    url: "#"
  },
  {
    name: "IOS App - Beauty Counter",
    category: "Android / IOS - Mobile Apps",
    type: "Cosmetics Catalog & Consultation",
    desc: "Modern beauty tech iOS app with AR shade finder and scheduled expert consultations.",
    url: "#"
  },
  {
    name: "Android App - Eduvacancy - Teaching Jobs",
    category: "Android / IOS - Mobile Apps",
    type: "Education Recruitment Portal",
    desc: "Scalable Android recruitment app connecting verified educators with top academic institutions.",
    url: "#"
  },
  {
    name: "Android App - HoneyliaEmart",
    category: "Android / IOS - Mobile Apps",
    type: "Hyperlocal E-Commerce & Delivery",
    desc: "Real-time grocery and essentials ordering app with driver GPS tracking and instant wallet pay.",
    url: "#"
  },
  {
    name: "www.jobberman.com",
    category: "Web Apps",
    type: "Enterprise Career Portal",
    desc: "High-volume recruitment engine with algorithmic candidate matching and resume parser.",
    url: "https://www.jobberman.com"
  },
  {
    name: "Stavanger Parkering",
    category: "Web Apps",
    type: "Smart Mobility & Parking System",
    desc: "Intelligent parking reservation, real-time sensor occupancy visualization, and automated billing.",
    url: "#"
  },
  {
    name: "DC Shoes",
    category: "E-Commerce",
    type: "Global Apparel & Footwear Store",
    desc: "Action sports apparel digital storefront with high-traffic seasonal sale infrastructure.",
    url: "#"
  },
  {
    name: "Pikto.com",
    category: "Web Apps",
    type: "Creative Visual Media SaaS",
    desc: "Cloud-based visual editing and asset management suite with real-time browser rendering.",
    url: "https://pikto.com"
  }
];

export const TESTIMONIALS = [
  {
    name: "Subodh Bhandari",
    role: "Enterprise Client",
    rating: 5,
    quote: "I have had the pleasure of working with Black Grapes Softech Company for the past few years, and I can confidently say that they have significantly transformed our business operations. Their software solutions have not only streamlined our processes but also boosted our efficiency and productivity to new heights.",
    avatar: "SB"
  },
  {
    name: "Kartik Mali",
    role: "Business Director",
    rating: 5,
    quote: "From the moment we engaged with Black Grapes Softech, their team demonstrated a deep understanding of our unique business needs. They took the time to listen to our challenges, goals, and aspirations and then tailored their software solutions to meet our specific requirements. The level of customization and flexibility they provided was truly impressive.",
    avatar: "KM"
  },
  {
    name: "Joel Burdine",
    role: "Senior UI/UX Designer",
    rating: 5,
    quote: "Working alongside Black Grapes Softech was seamless. Their engineering team takes Figma designs and elevates them with pixel-perfect attention to detail and fluid micro-animations that deliver world-class digital experiences.",
    avatar: "JB"
  },
  {
    name: "Ashley Hoyt",
    role: "Creative Director",
    rating: 5,
    quote: "Black Grapes Softech delivered our app ahead of schedule with zero major bugs. Their transparent communication and proactive technological guidance made them feel like an in-house tech department.",
    avatar: "AH"
  }
];

export const INDUSTRIES = [
  { name: "Healthcare", desc: "Telemedicine, EHR systems & clinic portals", icon: "activity" },
  { name: "Food Delivery", desc: "Live GPS tracking, menus & restaurant apps", icon: "utensils" },
  { name: "E-Commerce", desc: "D2C storefronts, marketplaces & inventory", icon: "shopping-bag" },
  { name: "Taxi & Transportation", desc: "Fleet booking, driver apps & dispatch logic", icon: "navigation" },
  { name: "Home Services", desc: "On-demand technician booking & scheduling", icon: "tool" },
  { name: "Education", desc: "LMS, interactive classrooms & exam portals", icon: "book-open" },
  { name: "Real Estate", desc: "3D virtual tours, MLS listings & lead CRMs", icon: "home" },
  { name: "FinTech & Banking", desc: "Wallets, payment gateways & compliance tools", icon: "dollar-sign" }
];

export const REQUIREMENT_OPTIONS = [
  "CRM Software Development",
  "MLM Software Development",
  "Software Development",
  "Mobile App Development",
  "Digital Marketing",
  "Graphic Designing",
  "Website Designing and Development",
  "Game Development",
  "Government / Private Tender Consulting",
  "Other Custom IT Requirement"
];

export const PARTNERSHIP_DATA = {
  badge: "STRATEGIC ALLIANCES & GLOBAL COLLABORATION",
  title: "Partner With Us",
  heroSubtitle: "Expand Your Engineering Capabilities With India's Trusted IT Development Centre",
  mainParagraph: "If you are an IT or web software development company and are eager to expand your operations here in India, we are ready to help you as your development centre. Our business community is focused on cultivating long-term relationships with our clients and offers excellent experiences covering the strategic insights. Partnering with us enables you to provide endless growth and development. You can share our resources for your project requirements to work on technical areas that directly affect the growth of the organization.",
  tieUpHeading: "Black Grapes Softech Products Companies Tie-up",
  tieUpSubheading: "Strategic Partnerships That Drive Growth, Innovation, and Market Expansion",
  tieUpParagraphs: [
    "In today's dynamic business landscape, strategic partnerships play a crucial role in driving growth, innovation, and market expansion. Product companies recognize the immense value of collaborating with like-minded organizations to leverage complementary strengths and create mutual opportunities for success. This is where Product Companies Tie-Up Services step in.",
    "These services facilitate strategic partnerships between product companies, enabling them to forge stronger alliances, expand their reach, and unlock new avenues for growth. By joining forces, businesses can tap into new markets, access additional resources, and capitalize on emerging opportunities that may be beyond their reach individually. Through distribution agreements, joint ventures, technology partnerships, or co-branding initiatives, these services empower companies to create synergies and unlock value that benefits all parties involved.",
    "Product Companies Tie-Up Services match companies with compatible partners based on shared goals, complementary capabilities, and strategic fit. They offer ongoing support throughout the partnership lifecycle, from initial discussions and agreement formation to implementation, monitoring, and optimization. By offering strategic guidance, operational assistance, and performance tracking, these services help companies nurture and sustain successful partnerships that drive sustainable growth and competitive advantage."
  ],
  models: [
    {
      id: "odc",
      title: "Offshore Development Centre (ODC)",
      tagline: "Dedicated Extension of Your In-House Tech Team",
      desc: "Set up a high-performance dedicated developer pod in India with full infrastructure, agile project management, and direct cultural alignment. Scale from 2 developers to 30+ within days.",
      features: [
        "100% Dedicated Developers & Architects",
        "Direct Slack/Jira/Git integration",
        "Overlapping time-zone availability (US, UK, AUS, Gulf)",
        "Zero recruitment or hardware overhead"
      ],
      icon: "🏢",
      color: "#f86200"
    },
    {
      id: "resource-sharing",
      title: "Resource & Talent Sharing",
      tagline: "On-Demand Senior Technical Experts",
      desc: "Augment your existing engineering sprint with specialized skill sets—Full Stack Developers, Mobile Engineers (Flutter/React Native), DevOps, and UI/UX designers whenever required.",
      features: [
        "Flexible hourly or monthly billing",
        "Immediate ramp-up and ramp-down",
        "Pre-vetted senior developers (5+ years exp)",
        "Sprint-by-sprint engagement model"
      ],
      icon: "👥",
      color: "#9333ea"
    },
    {
      id: "white-label",
      title: "White-Label Agency Delivery",
      tagline: "Invisible Tech Muscle Behind Your Agency",
      desc: "You sell the digital solutions, handle client accounts, and we execute the engineering under your brand name. Strict NDA protection with zero external attribution.",
      features: [
        "Complete client confidentiality & strict NDA",
        "Branded deliverables under your agency name",
        "Competitive wholesale agency pricing",
        "Dedicated Technical Project Lead"
      ],
      icon: "🛡️",
      color: "#38bdf8"
    },
    {
      id: "tie-up",
      title: "Product Companies Tie-Up",
      tagline: "Joint Ventures & Distribution Alliances",
      desc: "Form strategic product alliances, CRM/ERP distribution partnerships, API co-development, and joint go-to-market initiatives to penetrate emerging regional and global markets.",
      features: [
        "Joint venture & revenue share models",
        "Ecosystem API integration & localization",
        "Channel sales and technical onboarding",
        "Shared marketing and lead pipelines"
      ],
      icon: "🤝",
      color: "#10b981"
    }
  ],
  ecosystemPartners: [
    { name: "Zoho", category: "CRM & Enterprise Cloud Suite", desc: "Advanced cloud CRM, Creator apps & financial workflow integrations.", icon: "⚡" },
    { name: "Salesforce", category: "Enterprise Customer 360", desc: "Sales Cloud, Service Cloud, custom Apex development & Lightning UI.", icon: "☁️" },
    { name: "HubSpot", category: "Inbound Growth & Marketing", desc: "Marketing Hub, CRM automation, lead scoring & conversion funnels.", icon: "🎯" },
    { name: "Microsoft", category: "Cloud & Enterprise Systems", desc: "Azure scalable backends, .NET solutions, Office 365 & Power BI.", icon: "🪟" },
    { name: "SugarCRM", category: "Custom CRM Infrastructure", desc: "Extensible open-architecture CRM workflows & customer intelligence.", icon: "🍬" },
    { name: "Oracle", category: "Database & Cloud Architecture", desc: "High-throughput database design, ERP systems & enterprise cloud.", icon: "🔴" },
    { name: "SAP", category: "ERP & Supply Chain Solutions", desc: "Enterprise resource planning, logistics & financial intelligence.", icon: "🔷" },
    { name: "Sage", category: "Accounting & Business Finance", desc: "Financial payroll systems, accounting integration & audit readiness.", icon: "🌿" },
    { name: "BUSINESSNEXT", category: "Banking & Financial CRM", desc: "Omnichannel customer journeys for BFSI & lending institutions.", icon: "🏛️" },
    { name: "Autodesk", category: "3D Design & Engineering Media", desc: "Computer-aided visual assets, BIM integrations & digital twin pipelines.", icon: "📐" }
  ],
  whyPartnerStats: [
    { value: "10+", label: "Years in Industry", desc: "Proven software delivery track record" },
    { value: "150+", label: "Completed Projects", desc: "Deployed across web, mobile, and enterprise" },
    { value: "100%", label: "IP & Code Protection", desc: "Strict mutual NDAs and secure repositories" },
    { value: "60%", label: "Cost Optimization", desc: "Up to 60% savings compared to onshore teams" }
  ],
  partnershipFaqs: [
    {
      q: "How does the onboarding process work for an offshore development center?",
      a: "Our onboarding begins with an in-depth requirement analysis call. We map out your tech stack, time-zone preferences, and sprint methodology. Within 3-5 business days, we introduce screened candidate profiles. Once you approve the team, we execute the mutual NDA and contract, provide secure VPN/git access, and initiate Sprint Zero."
    },
    {
      q: "Can we hire developers on a trial basis before committing?",
      a: "Yes. We offer a 1-2 week pilot trial for dedicated developer engagements. This allows you to evaluate code hygiene, communication cadence, and agile velocity with zero long-term obligation."
    },
    {
      q: "Who owns the intellectual property (IP) and source code?",
      a: "You retain 100% full legal ownership of all source code, design assets, database structures, and intellectual property developed during the partnership. Everything is committed directly to your private repositories."
    },
    {
      q: "How do your developers handle time-zone differences?",
      a: "Our teams provide 4 to 6 hours of overlapping working hours with North America, Europe, Australia, and the Gulf region to ensure synchronous daily standups, sprint reviews, and live communication."
    }
  ]
};

export const CONTACT_PAGE_DATA = {
  badge: "GET IN TOUCH WITH EXPERTS",
  title: "Contact Us",
  heroSubtitle: "Have an ambitious idea or need enterprise-grade software? Reach out to our consultants and let's craft your digital roadmap together.",
  offices: [
    {
      id: "head-office",
      type: "Registered Head Office",
      name: "Black Grapes Softech - Scheme 54",
      address: "252-F/H Scheme No 54, Vijay Nagar, Indore - 452010, Madhya Pradesh, India",
      mapUrl: "https://maps.app.goo.gl/8CGaCBy9xGM63Ryi7",
      embedQuery: "Black+Grapes+Softech+252-F/H+Scheme+No+54+Vijay+Nagar+Indore",
      icon: "📍",
      badge: "Headquarters"
    },
    {
      id: "corporate-office",
      type: "Corporate Branch Office",
      name: "Black Grapes Softech - Scheme 114",
      address: "Office No. 1141, Scheme No. 114, Part-1, Vijay Nagar, Indore (M.P) - 452010",
      mapUrl: "https://maps.app.goo.gl/cLc1MrNRq74cPSmGA",
      embedQuery: "Office+No.1141+Scheme+No.114+Part-1+Vijay+Nagar+Indore",
      icon: "🏢",
      badge: "Branch Office"
    }
  ],
  directContacts: {
    emails: [
      { email: "info@blackgrapessoftech.com", label: "General & Enterprise Inquiries", isPrimary: true },
      { email: "blackgrapes.arpitjain@gmail.com", label: "Director Technical Desk", isPrimary: false },
      { email: "blackgrapes.deepikajain@gmail.com", label: "Operations & HR Desk", isPrimary: false }
    ],
    phones: [
      { phone: "+91 7470997884", raw: "+917470997884", label: "Direct Call & WhatsApp", isPrimary: true },
      { phone: "+91 6262414463", raw: "+916262414463", label: "Consultation & Support", isPrimary: false }
    ],
    hours: "Monday - Saturday: 9:00 AM - 8:00 PM IST (Sunday by Appointment)"
  },
  contactFaqs: [
    {
      q: "How quickly will I receive a proposal or quote?",
      a: "Our technical team reviews all inquiries within 2 hours during business hours. For standard projects, we provide an initial scope breakdown and estimate within 24 to 48 hours."
    },
    {
      q: "Can we schedule an in-person meeting at your Indore offices?",
      a: "Absolutely! We warmly welcome clients to visit either of our Vijay Nagar offices in Indore. You can coordinate a visit by calling +91 7470997884 or booking a slot via our contact form."
    },
    {
      q: "Do you sign a Non-Disclosure Agreement (NDA) before discussing project details?",
      a: "Yes, confidentiality is paramount. We are happy to execute our bilateral NDA or review your company's mutual NDA before you share sensitive product specifications or business models."
    }
  ]
};
