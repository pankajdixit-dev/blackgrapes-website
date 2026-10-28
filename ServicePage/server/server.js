import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory store for inquiries/leads
const inquiriesDatabase = [];

// Exact services of Black Grapes Group (https://www.blackgrapesgroup.com/services)
const services = [
  {
    id: 1,
    title: "Black Grapes Associates",
    tagline: "Consultancy & Advisory",
    description: " Associate is a leading firm dedicated to providing innovative and customized solutions",
    url: "http://www.blackgrapesassociates.com",
    category: "associates"
  },
  {
    id: 2,
    title: "Black Grapes Softech",
    tagline: "IT & Digital Solutions",
    description: "Softech is a dynamic IT solutions company dedicated to transforming businesses",
    url: "https://blackgrapessoftech.com/",
    category: "softech"
  },
  {
    id: 3,
    title: "Black Grapes Real Estate",
    tagline: "Property & Infrastructure",
    description: "Black Grapes Real Estate is a trusted name in the real estate industry, dedicated to providing exceptional property",
    url: "https://blackgrapesrealestate.com/",
    category: "realestate"
  },
  {
    id: 4,
    title: "Black Grapes Investment & Securities",
    tagline: "Financial & Investment Services",
    description: "Black Grapes Investment Pvt. Ltd. is a trusted and reliable financial services company specializing in investment managemen.",
    url: "https://blackgrapesinvestments.com/",
    category: "investment"
  },
  {
    id: 5,
    title: "Black Grapes Valuers & Engineers",
    tagline: "Valuation & Structural Consultancy",
    description: "Black Grapes Valuers and Engineers is a reputed firm specializing in property valuation, structural engineering, and technical consultancy",
    url: "https://www.blackgrapesvaluers.com/",
    category: "valuers"
  },
  {
    id: 6,
    title: "Black Grapes Insurance Surveyors & Loss Assessors",
    tagline: "Insurance Survey & Loss Assessment",
    description: "This is a trusted name in the insurance industry, specializing in providing accurate, unbiased, and professional survey and loss assessment services.",
    url: "https://www.blackgrapesgroup.com/aso",
    category: "insurance"
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Black Grapes Group Services API'
  });
});

// GET /api/services
app.get('/api/services', (req, res) => {
  const { category, search } = req.query;
  let result = [...services];

  if (category && category !== 'all') {
    result = result.filter(s => s.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: result.length,
    data: result
  });
});

// GET /api/services/:id
app.get('/api/services/:id', (req, res) => {
  const service = services.find(s => String(s.id) === String(req.params.id));
  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' });
  }
  res.json({ success: true, data: service });
});

// POST /api/inquiries
app.post('/api/inquiries', (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and phone number are required.'
    });
  }

  const ticketId = `BG-${Math.floor(100000 + Math.random() * 900000)}`;
  const newInquiry = {
    ticketId,
    name,
    email,
    phone,
    service: service || 'General Inquiry',
    message: message || '',
    createdAt: new Date().toISOString(),
    status: 'Received'
  };

  inquiriesDatabase.push(newInquiry);
  console.log(`[Black Grapes API] New Lead Received #${ticketId} for ${name} (${phone})`);

  res.status(201).json({
    success: true,
    message: 'Inquiry successfully submitted.',
    ticketId,
    data: newInquiry
  });
});

// GET /api/inquiries
app.get('/api/inquiries', (req, res) => {
  res.json({
    success: true,
    count: inquiriesDatabase.length,
    data: inquiriesDatabase
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Black Grapes Services API running at http://localhost:${PORT}`);
});
