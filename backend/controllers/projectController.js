import Project from '../models/Project.js';

const initialProjectsSeed = [
  {
    title: 'Enterprise Manufacturing ERP Platform',
    subtitle: 'Integrated Inventory, Production & Financials',
    category: 'ERP & CRM',
    clientName: 'Central India Steel Manufacturers',
    description: 'Engineered a real-time enterprise ERP connecting multi-facility production lines, automated raw material procurement, batch tracking, and GST e-invoicing.',
    image: '/softech-services/software.jpg',
    projectUrl: 'https://blackgrapessoftech.com/',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'],
    isFeatured: true,
    order: 1,
  },
  {
    title: 'High-Concurrency Direct Selling & MLM Portal',
    subtitle: 'Automated Commission Calculators & Tree Visualizer',
    category: 'MLM Systems',
    clientName: 'Direct Sales Conglomerate',
    description: 'Architected scalable binary, matrix, and unilevel MLM engines with automated instant payout gateways, KYC verification, and dynamic genealogy trees.',
    image: '/softech-services/mlm.png',
    projectUrl: 'https://blackgrapessoftech.com/',
    tags: ['Node.js', 'MongoDB', 'React', 'AWS Microservices'],
    isFeatured: true,
    order: 2,
  },
  {
    title: 'Naya Purana Bazaar Marketplace Portal',
    subtitle: 'Hybrid Re-commerce & Consumer Goods Platform',
    category: 'E-Commerce',
    clientName: 'Black Grapes E-Commerce Wing',
    description: 'Upcoming multi-vendor marketplace supporting new and certified pre-owned items, instant seller verification, escrow payments, and localized courier tracking.',
    image: '/ecommerce/new-products.jpg',
    projectUrl: 'https://www.nayapuranabazaar.com',
    tags: ['React', 'Next.js', 'Stripe & Razorpay', 'Tailwind CSS'],
    isFeatured: true,
    order: 3,
  },
  {
    title: 'Industrial Plant & Machinery Valuation Audit',
    subtitle: '₹85-Crore Solvency & Banking TEV Study',
    category: 'Valuation & Advisory',
    clientName: 'Nationalized Banking Consortium',
    description: 'Conducted comprehensive engineering asset inspection, residual economic life estimation, and IBBI-compliant TEV feasibility reports for credit renewal.',
    image: '/services-logos/valuers.webp',
    projectUrl: 'https://www.blackgrapesvaluers.com/',
    tags: ['IBBI Registered', 'Chartered Engineers', 'Plant Inspection'],
    isFeatured: false,
    order: 4,
  }
];

let fallbackProjects = [...initialProjectsSeed.map((p, idx) => ({ ...p, _id: `proj-${idx + 1}` }))];

export const seedProjectsIfEmpty = async () => {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(initialProjectsSeed);
      console.log('🌱 [Seeder] Seeded default Black Grapes projects portfolio.');
    }
  } catch {}
};

// @desc    Get all portfolio projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    const filter = {};

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    if (search) {
      const q = search.trim();
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { clientName: { $regex: q, $options: 'i' } },
      ];
    }

    try {
      const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
      return res.json({ success: true, count: projects.length, data: projects });
    } catch {
      let results = [...fallbackProjects];
      if (category && category !== 'all') {
        results = results.filter((p) => p.category === category);
      }
      if (featured === 'true') {
        results = results.filter((p) => p.isFeatured === true);
      }
      return res.json({ success: true, count: results.length, data: results });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    let project = null;

    try {
      project = await Project.findById(id);
    } catch {
      project = fallbackProjects.find((p) => p._id === id);
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Protected
export const createProject = async (req, res) => {
  try {
    const { title, subtitle, category, clientName, description, image, projectUrl, tags, isFeatured, order } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ success: false, message: 'Title, category, and description are required.' });
    }

    const newProjectData = {
      title: title.trim(),
      subtitle: subtitle || '',
      category: category.trim(),
      clientName: clientName || 'Confidential Client',
      description: description.trim(),
      image: image || '',
      projectUrl: projectUrl || '',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      isFeatured: Boolean(isFeatured),
      order: order !== undefined ? Number(order) : 0,
    };

    let created = null;
    try {
      created = await Project.create(newProjectData);
    } catch {
      created = { ...newProjectData, _id: `proj-${Date.now()}` };
      fallbackProjects.push(created);
    }

    res.status(201).json({ success: true, message: 'Project added to portfolio.', data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Protected
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    let updated = null;

    try {
      updated = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (updated) {
        return res.json({ success: true, message: 'Project updated.', data: updated });
      }
    } catch {}

    const index = fallbackProjects.findIndex((p) => p._id === id);
    if (index !== -1) {
      fallbackProjects[index] = { ...fallbackProjects[index], ...req.body };
      return res.json({ success: true, message: 'Project updated.', data: fallbackProjects[index] });
    }

    return res.status(404).json({ success: false, message: 'Project not found.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Protected
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      const deleted = await Project.findByIdAndDelete(id);
      if (deleted) {
        return res.json({ success: true, message: 'Project removed.' });
      }
    } catch {}

    const index = fallbackProjects.findIndex((p) => p._id === id);
    if (index !== -1) {
      fallbackProjects.splice(index, 1);
      return res.json({ success: true, message: 'Project removed.' });
    }

    return res.status(404).json({ success: false, message: 'Project not found.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

