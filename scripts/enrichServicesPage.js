import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { serviceCategories, servicesData, clientStats, executionProcess, faqList } from '../src/data/servicesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../backend/data/db.json');

const raw = fs.readFileSync(DB_PATH, 'utf-8');
const db = JSON.parse(raw);

db.services_page = {
  badge: 'BLACK GRAPES GROUP',
  title: 'Services Built Specifically',
  titleAccent: ' For Your Business',
  subtitle: 'Empowering businesses with tailored solutions to meet your unique needs.',
  searchPlaceholder: 'Search services (Softech, Real Estate, Valuers, Investment, Insurance)...',
  tab1Label: 'Group Companies (6 Core)',
  tab2Label: 'IT Staffing Solutions',
  tab3Label: 'E-Commerce (Naya Purana Bazaar)',
  serviceCategories: serviceCategories,
  group_services: servicesData,
  clientStats: clientStats,
  executionProcess: executionProcess,
  faqList: faqList,
  isVisible: true,
  updated_at: new Date().toISOString()
};

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
console.log('✅ Safely enriched services_page in db.json with complete authentic data!');

