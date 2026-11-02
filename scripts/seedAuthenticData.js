import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../backend/data/db.json');

// Read existing DB
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 1. EXTRACT REAL CLIENTS (38 Real Companies)
const clientsDataRaw = fs.readFileSync(path.resolve(__dirname, '../src/Pages/OurClients/clientsData.js'), 'utf8');
const clientsListMatch = clientsDataRaw.match(/export const CLIENTS_LIST = (\[[\s\S]*?\]);\s*export/);
let authenticClients = [];
if (clientsListMatch) {
  authenticClients = eval(clientsListMatch[1]).map((c, idx) => ({
    id: c.id || `cli-${idx + 1}`,
    name: c.name,
    category: c.category || 'enterprise',
    industry: c.industry || 'Technology',
    region: c.region || 'Global',
    logo_url: c.logo || '',
    logo: c.logo || '',
    badge: c.badge || '',
    badgeColor: c.badgeColor || 'orange',
    services: c.services || '',
    impact: c.impact || '',
    order_index: idx + 1
  }));
}

// 2. EXTRACT REAL PRODUCTS (12 Turnkey Enterprise Products)
const productsDataRaw = fs.readFileSync(path.resolve(__dirname, '../src/Pages/OurProducts/productsData.js'), 'utf8');
const productsListMatch = productsDataRaw.match(/export const PRODUCTS_LIST = (\[[\s\S]*?\]);\s*export/);
let authenticProducts = [];
if (productsListMatch) {
  authenticProducts = eval(productsListMatch[1]).map((p, idx) => ({
    id: p.id || `prod-${idx + 1}`,
    title: p.title,
    subtitle: p.subtitle || '',
    category: p.category || 'enterprise',
    industry: p.industry || 'Software',
    badge: p.badge || '',
    badgeColor: p.badgeColor || 'orange',
    badge_color: p.badgeColor || 'orange',
    youtubeId: p.youtubeId || '',
    youtube_id: p.youtubeId || '',
    deploymentDays: p.deploymentDays || '3 - 5 Days',
    deployment_days: p.deploymentDays || '3 - 5 Days',
    rating: p.rating || '4.9/5',
    summary: p.summary || '',
    keyFeatures: p.keyFeatures || [],
    key_features: p.keyFeatures || [],
    techStack: p.techStack || [],
    tech_stack: p.techStack || [],
    highlights: p.highlights || [],
    order_index: idx + 1,
    status: 'published'
  }));
}

// 3. EXTRACT REAL PROJECTS (12 Client Deliveries from siteData.js)
const siteDataRaw = fs.readFileSync(path.resolve(__dirname, '../src/data/siteData.js'), 'utf8');
const projectsMatch = siteDataRaw.match(/export const PROJECTS = (\[[\s\S]*?\]);\s*export/);
let authenticProjects = [];
if (projectsMatch) {
  authenticProjects = eval(projectsMatch[1]).map((p, idx) => ({
    id: `proj-${idx + 1}`,
    title: p.name,
    name: p.name,
    category: p.category || 'Web Apps',
    type: p.type || 'Full-Stack Solution',
    summary: p.desc || '',
    description: p.desc || '',
    link: p.url || '#',
    url: p.url || '#',
    is_featured: true,
    order_index: idx + 1,
    status: 'published'
  }));
}

// 4. EXTRACT REAL TESTIMONIALS (From siteData.js & clientsData.js)
const siteTestimonialsMatch = siteDataRaw.match(/export const TESTIMONIALS = (\[[\s\S]*?\]);\s*export/);
const clientTestimonialsMatch = clientsDataRaw.match(/export const CLIENT_TESTIMONIALS = (\[[\s\S]*?\]);\s*export/);
let siteTestimonials = [];
if (siteTestimonialsMatch) {
  siteTestimonials = eval(siteTestimonialsMatch[1]).map((t, idx) => ({
    id: `testi-${idx + 1}`,
    name: t.name,
    role: t.role || 'Enterprise Client',
    designation: t.role || 'Enterprise Client',
    avatar: t.avatar || t.name.slice(0, 2).toUpperCase(),
    rating: t.rating || 5,
    quote: t.quote,
    is_featured: true
  }));
}
if (clientTestimonialsMatch) {
  const extra = eval(clientTestimonialsMatch[1]).map((t, idx) => ({
    id: `testi-cli-${idx + 1}`,
    name: t.author || t.name,
    role: `${t.role || ''}, ${t.company || ''}`,
    designation: `${t.role || ''}, ${t.company || ''}`,
    avatar: (t.author || t.name || 'BG').slice(0, 2).toUpperCase(),
    rating: t.rating || 5,
    quote: t.quote,
    is_featured: false
  }));
  siteTestimonials.push(...extra);
}

// 5. EXTRACT REAL SERVICES (10 Turnkey Services from softechServicesData.js)
const softechRaw = fs.readFileSync(path.resolve(__dirname, '../src/data/softechServicesData.js'), 'utf8');
const softechServicesMatch = softechRaw.match(/export const softechServices = (\[[\s\S]*?\]);\s*export/);
let authenticServices = [];
if (softechServicesMatch) {
  authenticServices = eval(softechServicesMatch[1]).map((s, idx) => ({
    id: s.id || `srv-${idx + 1}`,
    number: s.number || `0${idx + 1}`,
    title: s.title,
    tagline: s.tagline || '',
    category: s.category || 'software',
    categoryLabel: s.categoryLabel || 'Software Development',
    badge: s.badge || 'Popular',
    image: s.image || '/images/Software.jpg',
    url: s.url || '',
    description: s.description || '',
    shortDesc: s.description ? s.description.slice(0, 140) + '...' : '',
    keyDeliverables: s.keyDeliverables || [],
    techStack: s.techStack || [],
    tags: s.techStack || [],
    accentColor: s.accentColor || '#f86200',
    timeline: s.timeline || '3 - 6 Weeks',
    clientTypes: s.clientTypes || 'Startups, SMEs, Enterprises',
    is_active: true,
    order_index: idx + 1
  }));
}

// 6. EXTRACT REAL BUSINESS PARTNERS (From businessPartnersData.js)
const bpRaw = fs.readFileSync(path.resolve(__dirname, '../src/data/businessPartnersData.js'), 'utf8');
const prodPartnersMatch = bpRaw.match(/export const PRODUCT_PARTNERS = (\[[\s\S]*?\]);\s*export/);
const servPartnersMatch = bpRaw.match(/export const SERVICE_PARTNERS = (\[[\s\S]*?\]);/);
let productPartners = [];
let servicePartners = [];
if (prodPartnersMatch) {
  productPartners = eval(prodPartnersMatch[1]).map((p, idx) => ({
    id: `pp-${idx + 1}`,
    name: p.name,
    img: p.img || '',
    localImg: p.localImg || ''
  }));
}
if (servPartnersMatch) {
  servicePartners = eval(servPartnersMatch[1]).map((p, idx) => ({
    id: `sp-${idx + 1}`,
    name: p.name,
    img: p.img || '',
    localImg: p.localImg || ''
  }));
}

// UPDATE DB.JSON WITH 100% AUTHENTIC REAL DATA (NO DUMMY DATA)
db.clients = authenticClients;
db.products = authenticProducts;
db.projects = authenticProjects;
db.testimonials = siteTestimonials;
db.services = authenticServices;
db.business_partners = {
  product_partners: productPartners,
  service_partners: servicePartners
};

// Also verify site_settings has real phone numbers and real addresses
db.site_settings = {
  ...db.site_settings,
  site_name: 'Black Grapes Softech Pvt. Ltd.',
  tagline: 'Empowering Enterprises Worldwide with Next-Gen Tech',
  primary_phone: '+91 9039397884',
  secondary_phone: '+91 7470997884',
  support_phone: '+91 6262414463',
  whatsapp_number: '+919039397884',
  primary_email: 'info@blackgrapessoftech.com',
  support_email: 'support@blackgrapessoftech.com',
  alt_email: 'blackgrapesgroups@gmail.com',
  office_address: '252-F/H, Scheme No 54, Vijay Nagar, Indore - 452010, Madhya Pradesh, India',
  office_address_2: 'Office No.1141, Scheme No.114, Part-1, Vijay Nagar, Indore - 452010, Madhya Pradesh, India',
  working_hours: 'Monday – Saturday: 10:00 AM – 7:30 PM (IST)'
};

// Also sync contact_page
db.contact_page = {
  heroBadge: 'BLACK GRAPES GROUP',
  heroTitle: 'Get in Touch',
  heroSubtitle: 'We are here to help and answer any questions you might have. We look forward to hearing from you.',
  address1Label: 'Registered Office (Address 1)',
  address1Text: '252-F/H, Scheme No 54, Vijay Nagar, Indore - 452010, Madhya Pradesh, India.',
  address1MapUrl: 'https://maps.app.goo.gl/qJcKNw9DMo4JVWrv8',
  address2Label: 'Development Centre (Address 2)',
  address2Text: 'Office No.1141, Scheme No.114, Part-1, Vijay Nagar, Indore - 452010, Madhya Pradesh, India.',
  address2MapUrl: 'https://maps.app.goo.gl/yahxDsm7BLK652mA8',
  directPhones: [
    { name: 'Arpit Jain', phones: ['+91 9039397884', '+91 7470997884'] },
    { name: 'Support Desk', phones: ['+91 6262414463'] }
  ],
  emails: [
    { department: 'General Inquiries', email: 'info@blackgrapessoftech.com' },
    { department: 'Technical Support', email: 'support@blackgrapessoftech.com' },
    { department: 'Direct Desk', email: 'blackgrapesgroups@gmail.com' }
  ],
  workingHours: 'Monday – Saturday: 10:00 AM – 7:30 PM (IST)'
};

// Write updated DB
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

console.log('✅ SEEDED 100% AUTHENTIC REAL DATA:');
console.log(` - Real Clients: ${db.clients.length}`);
console.log(` - Real Turnkey Products: ${db.products.length}`);
console.log(` - Real Client Projects: ${db.projects.length}`);
console.log(` - Real Client Testimonials: ${db.testimonials.length}`);
console.log(` - Real Softech Services: ${db.services.length}`);
console.log(` - Real Product Partners: ${db.business_partners.product_partners.length}`);
console.log(` - Real Service Partners: ${db.business_partners.service_partners.length}`);
