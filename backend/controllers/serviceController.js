import Service from '../models/Service.js';

// Seed dataset of official 6 Group Services + 9 Softech Tech Services
const initialServicesSeed = [
  // Core 6 Group Companies
  {
    title: 'Black Grapes Associates',
    tagline: 'Consultancy & Advisory',
    description: 'Associate is a leading firm dedicated to providing innovative and customized solutions for municipal approvals, Indore Nagar Nigam Naksha Pass, and corporate licensing.',
    category: 'associates',
    categoryLabel: 'Associates',
    accentColor: '#f86200',
    url: 'http://www.blackgrapesassociates.com',
    image: '/services-logos/associates.webp',
    keyDeliverables: ['Municipal (Naksha Pass) Sanctions', 'Commercial Licensing (FSSAI/Drug)', 'Land Diversion & Title Search'],
    order: 1,
    isActive: true,
  },
  {
    title: 'Black Grapes Softech',
    tagline: 'IT & Digital Solutions',
    description: 'Softech is a dynamic IT solutions company dedicated to transforming businesses with cutting-edge ERPs, mobile apps, custom MLM software, and cloud portals.',
    category: 'softech',
    categoryLabel: 'IT & Softech',
    accentColor: '#a855f7',
    url: 'https://blackgrapessoftech.com/',
    image: '/services-logos/softech.png',
    keyDeliverables: ['Custom ERP & CRM Suites', 'MLM & Direct Sales Systems', 'Cross-Platform Mobile Apps'],
    order: 2,
    isActive: true,
  },
  {
    title: 'Black Grapes Real Estate',
    tagline: 'Property & Infrastructure',
    description: 'Black Grapes Real Estate is a trusted name in the real estate industry, dedicated to providing exceptional commercial property broking and industrial land aggregation.',
    category: 'realestate',
    categoryLabel: 'Real Estate',
    accentColor: '#10b981',
    url: 'https://blackgrapesrealestate.com/',
    image: '/services-logos/realestate.jpg',
    keyDeliverables: ['Commercial Property Broking', 'High-Yield Pre-Leased Assets', 'Turnkey Industrial Land Aggregation'],
    order: 3,
    isActive: true,
  },
  {
    title: 'Black Grapes Investment & Securities',
    tagline: 'Financial & Investment Services',
    description: 'Black Grapes Investment Pvt. Ltd. is a trusted and reliable financial services company specializing in wealth management, corporate advisory, and investment strategies.',
    category: 'investment',
    categoryLabel: 'Investment & Securities',
    accentColor: '#3b82f6',
    url: 'https://blackgrapesinvestments.com/',
    image: '/services-logos/investment.jpg',
    keyDeliverables: ['Corporate Capital Structuring', 'Mutual Fund & Equity Advisory', 'Risk-Hedging Investment Portfolios'],
    order: 4,
    isActive: true,
  },
  {
    title: 'Black Grapes Valuers & Engineers',
    tagline: 'Valuation & Structural Consultancy',
    description: 'Black Grapes Valuers and Engineers is a reputed firm specializing in property valuation, plant & machinery valuation, and Chartered Engineer CE certifications.',
    category: 'valuers',
    categoryLabel: 'Valuers & Engineers',
    accentColor: '#06b6d4',
    url: 'https://www.blackgrapesvaluers.com/',
    image: '/services-logos/valuers.webp',
    keyDeliverables: ['Bank Collateral Valuations', 'Plant & Industrial Machinery', 'Chartered Engineer Certifications'],
    order: 5,
    isActive: true,
  },
  {
    title: 'Black Grapes Insurance Surveyors & Loss Assessors',
    tagline: 'Insurance Survey & Loss Assessment',
    description: 'A trusted name in the insurance industry, specializing in providing accurate, unbiased, and professional survey and loss assessment services for industrial enterprises.',
    category: 'insurance',
    categoryLabel: 'Insurance Surveyors',
    accentColor: '#f43f5e',
    url: 'https://www.blackgrapesgroup.com/aso',
    image: '/services-logos/insurance.jpg',
    keyDeliverables: ['Fire & Engineering Claim Surveys', 'Marine Cargo Loss Assessment', 'Statutory Solvency Inspections'],
    order: 6,
    isActive: true,
  },
  // Softech Deep IT Services
  {
    title: 'Website Designing and Development',
    tagline: 'High-Speed Modern Web Applications & Portals',
    description: 'We architect and build hyper-performant web applications, corporate web portals, and enterprise SaaS platforms with modern MERN architecture, responsive UI/UX, and sub-second load times.',
    category: 'web',
    categoryLabel: 'Web & Cloud',
    accentColor: '#f86200',
    badge: 'Popular',
    url: 'https://blackgrapessoftech.com/services/web-designing-and-development/',
    image: '/softech-services/web.jpg',
    keyDeliverables: [
      'Custom React, Next.js & Full-Stack MERN engineering',
      'Ultra-responsive UI/UX designed with mobile-first principles',
      'SEO-optimized semantic code adhering to Core Web Vitals < 1s',
      'REST & GraphQL API integration with cloud-native caching'
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'MongoDB', 'AWS'],
    timeline: '3 - 6 Weeks',
    clientTypes: 'Startups, SMEs, E-Commerce Brands, Corporate Enterprises',
    order: 7,
    isActive: true,
  },
  {
    title: 'Mobile Application Development',
    tagline: 'Native iOS & Android and Cross-Platform Apps',
    description: 'Turnkey mobile application development delivering smooth 60fps performance, offline sync, real-time push notifications, payment gateways, and biometric security for Android and iOS.',
    category: 'mobile',
    categoryLabel: 'Mobile Apps',
    accentColor: '#8b5cf6',
    badge: 'Trending',
    url: 'https://blackgrapessoftech.com/services/mobile-app-development/',
    image: '/softech-services/app.jpg',
    keyDeliverables: [
      'Cross-platform Flutter & React Native app engineering',
      'Native Swift (iOS) & Kotlin (Android) architecture',
      'Real-time WebSocket notifications & cloud database sync',
      'End-to-end App Store & Google Play publishing compliance'
    ],
    techStack: ['Flutter', 'React Native', 'Kotlin', 'Swift', 'Firebase', 'GraphQL'],
    timeline: '4 - 10 Weeks',
    clientTypes: 'Fintech, Healthcare, On-Demand Delivery, EdTech',
    order: 8,
    isActive: true,
  },
  {
    title: 'Custom Software Development',
    tagline: 'Tailored Enterprise Automation & Microservices',
    description: 'Bespoke enterprise software designed to automate complex operations, connect fragmented workflows, and eliminate manual bottlenecks with secure microservices and robust database architectures.',
    category: 'software',
    categoryLabel: 'Custom Software',
    accentColor: '#06b6d4',
    badge: 'Enterprise',
    url: 'https://blackgrapessoftech.com/services/software-development-2/',
    image: '/softech-services/software.jpg',
    keyDeliverables: [
      'Custom workflow automation engines & business logic layers',
      'High-throughput microservices built on Node.js and Python',
      'Enterprise database architecture with automated failover',
      'Role-based access control (RBAC) and immutable audit logging'
    ],
    techStack: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'Redis', 'Kubernetes'],
    timeline: '6 - 14 Weeks',
    clientTypes: 'Manufacturing, Distributors, Multi-Branch Businesses',
    order: 9,
    isActive: true,
  }
];

let fallbackServices = [...initialServicesSeed.map((s, idx) => ({ ...s, _id: `srv-${idx + 1}` }))];

// Seed services on first startup if empty
export const seedServicesIfEmpty = async () => {
  try {
    const count = await Service.countDocuments();
    if (count === 0) {
      await Service.insertMany(initialServicesSeed);
      console.log('🌱 [Seeder] Seeded default Black Grapes services into database.');
    }
  } catch (err) {
    // DB not ready yet, fallbackServices ready
  }
};

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    const { category, search, all } = req.query;
    const filter = {};

    // By default, public API only returns active services unless `all=true` (admin view)
    if (!all || all !== 'true') {
      filter.isActive = true;
    }

    if (category && category !== 'all') {
      filter.category = category.toLowerCase();
    }

    if (search) {
      const q = search.trim();
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tagline: { $regex: q, $options: 'i' } },
      ];
    }

    try {
      const services = await Service.find(filter).sort({ order: 1, createdAt: -1 });
      return res.json({
        success: true,
        count: services.length,
        data: services,
      });
    } catch {
      let results = [...fallbackServices];
      if (!all || all !== 'true') {
        results = results.filter((s) => s.isActive !== false);
      }
      if (category && category !== 'all') {
        results = results.filter((s) => s.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        results = results.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q)
        );
      }
      return res.json({
        success: true,
        count: results.length,
        data: results,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    let service = null;

    try {
      service = await Service.findById(id);
    } catch {
      service = fallbackServices.find((s) => s._id === id);
    }

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Protected
export const createService = async (req, res) => {
  try {
    const { title, tagline, category, categoryLabel, description, keyDeliverables, techStack, image, url, accentColor, badge, timeline, clientTypes, order, isActive } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and description are required.',
      });
    }

    const newServiceData = {
      title: title.trim(),
      tagline: tagline || '',
      category: category.toLowerCase().trim(),
      categoryLabel: categoryLabel || category,
      description: description.trim(),
      keyDeliverables: Array.isArray(keyDeliverables) ? keyDeliverables : (keyDeliverables ? keyDeliverables.split(',').map(s => s.trim()) : []),
      techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map(s => s.trim()) : []),
      image: image || '',
      url: url || '',
      accentColor: accentColor || '#ff6b00',
      badge: badge || '',
      timeline: timeline || '',
      clientTypes: clientTypes || '',
      order: order !== undefined ? Number(order) : 0,
      isActive: isActive !== undefined ? isActive : true,
    };

    let created = null;
    try {
      created = await Service.create(newServiceData);
    } catch {
      created = { ...newServiceData, _id: `srv-${Date.now()}` };
      fallbackServices.push(created);
    }

    res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      data: created,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update existing service
// @route   PUT /api/services/:id
// @access  Protected
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    let updated = null;

    try {
      updated = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (updated) {
        return res.json({ success: true, message: 'Service updated successfully.', data: updated });
      }
    } catch {}

    const index = fallbackServices.findIndex((s) => s._id === id);
    if (index !== -1) {
      fallbackServices[index] = { ...fallbackServices[index], ...req.body };
      return res.json({ success: true, message: 'Service updated successfully.', data: fallbackServices[index] });
    }

    return res.status(404).json({ success: false, message: 'Service not found.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Protected
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      const deleted = await Service.findByIdAndDelete(id);
      if (deleted) {
        return res.json({ success: true, message: 'Service deleted successfully.' });
      }
    } catch {}

    const index = fallbackServices.findIndex((s) => s._id === id);
    if (index !== -1) {
      fallbackServices.splice(index, 1);
      return res.json({ success: true, message: 'Service deleted successfully.' });
    }

    return res.status(404).json({ success: false, message: 'Service not found.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

