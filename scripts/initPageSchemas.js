import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../backend/data/db.json');

const raw = fs.readFileSync(DB_PATH, 'utf-8');
const db = JSON.parse(raw);

let modified = false;

// 1. Services Page Content Schema
if (!db.services_page) {
  db.services_page = {
    badge: 'BLACK GRAPES GROUP',
    title: 'Services Built Specifically',
    titleAccent: ' For Your Business',
    subtitle: 'Empowering businesses with tailored solutions to meet your unique needs.',
    searchPlaceholder: 'Search services (Softech, Real Estate, Valuers, Investment, Insurance)...',
    isVisible: true,
    updated_at: new Date().toISOString()
  };
  modified = true;
  console.log('[Init] Added services_page schema to db.json');
}

// 2. Softech Services Page Content Schema
if (!db.softech_page) {
  db.softech_page = {
    badge: 'BLACK GRAPES SOFTECH • WHAT WE DO',
    title: 'Engineering High-Impact Custom Software & Digital Products',
    subtitle: 'From bespoke web platforms and native mobile apps to AI-powered enterprise automation, we build scalable software designed to lead your market.',
    primaryCtaText: 'Request Technical Quote',
    secondaryCtaText: 'Schedule Consultation',
    industriesBadge: 'CROSS-INDUSTRY EXPERTISE',
    industriesTitle: 'Software Tailored for Real-World Business Vertical Demands',
    isVisible: true,
    updated_at: new Date().toISOString()
  };
  modified = true;
  console.log('[Init] Added softech_page schema to db.json');
}

// 3. Products Page Content Schema
if (!db.products_page) {
  db.products_page = {
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
    isVisible: true,
    updated_at: new Date().toISOString()
  };
  modified = true;
  console.log('[Init] Added products_page schema to db.json');
}

// 4. Enrich Clients Page with Hero Content if missing
if (db.clients_page && !db.clients_page.heroTitle) {
  db.clients_page = {
    heroBadge: 'TRUSTED BY 150+ GLOBAL ENTERPRISES',
    heroTitle: 'Our Clients:',
    heroTitleAccent: 'Powering Leaders Across 15+ Nations',
    heroSubtitle: 'At Black Grapes Softech, we take pride in our diverse and dynamic client portfolio. Our clients span various industries including finance, healthcare, e-commerce, education, and technology. We partner with both high-velocity startups and Fortune 500 enterprises to deliver innovative software solutions tailored to their unique needs.',
    primaryBtnText: 'Partner With Us',
    secondaryBtnText: 'Explore Client Brands',
    metrics: db.clients_page.metrics || [
      { number: '150+', label: 'Enterprise Clients', highlight: 'Global Scale' },
      { number: '15+', label: 'Countries Served', highlight: 'Worldwide Reach' },
      { number: '99%', label: 'Client Retention', highlight: 'Long-term Trust' },
      { number: '$50M+', label: 'Value Generated', highlight: 'Measurable ROI' }
    ],
    isVisible: true,
    updated_at: new Date().toISOString()
  };
  modified = true;
  console.log('[Init] Enriched clients_page schema with hero content in db.json');
}

// 5. Enrich Business Partners with Intros if missing
if (db.business_partners && !db.business_partners.product_intro) {
  db.business_partners.product_intro = {
    title: 'Products Companies Tie-up',
    paragraphs: [
      'Facilitating strategic alliances between product companies to expand reach, unlock mutual growth, and integrate complementary cloud platforms.',
      'Our collaborative framework empowers product businesses to cross-promote solutions, share technical toolsets, and deliver bundled digital value.',
      'Through seamless API integrations and joint go-to-market strategies, we help emerging product innovators scale faster across international markets.'
    ],
    subheading: 'Products Companies Tie-up'
  };
  db.business_partners.service_intro = {
    title: 'Services Companies Tie-up',
    paragraphs: [
      'Strategic collaborations between service enterprises to expand offerings, share cross-domain expertise, and co-deliver complex client mandates.',
      'By uniting specialized consulting, digital marketing, and software engineering capabilities, we create full-spectrum execution squads.'
    ],
    subheading: 'Services Companies Tie-up'
  };
  modified = true;
  console.log('[Init] Enriched business_partners with intros in db.json');
}

if (modified) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  console.log('✅ Safely initialized all page schemas without overwriting existing data.');
} else {
  console.log('ℹ️ All page schemas are already present in db.json.');
}

