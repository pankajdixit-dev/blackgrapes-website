# BLACK GRAPES SOFTECH – COMPREHENSIVE PROJECT AUDIT & SYSTEM ARCHITECTURE REPORT

**Date:** November 2026  
**Auditor:** Senior Full-Stack MERN Architect & QA Team  
**Repository:** `blackgrapes-website` (Dual Workspace: root + `frontend/`)  
**Live Production URL:** [https://blackgrapes-website-xj3o.vercel.app](https://blackgrapes-website-xj3o.vercel.app)  
**Database:** MongoDB Atlas (`cluster0.ja99tvf.mongodb.net/blackgrapes`)  

---

## 1. ALL EXISTING WEBSITE PAGES & SECTIONS

From our comprehensive inspection of `src/App.jsx`, `src/pages/`, and `src/components/`, the complete list of public routes, pages, and their underlying sections is:

| Page Route | Page Component | Section Structure |
|---|---|---|
| `/` | `HomePage.jsx` | 1. Hero Showcase (`HeroSection.jsx`)<br>2. Purposeful Beginnings (`ClockPhilosophy.jsx`)<br>3. Services Grid (`ServicesSection.jsx`)<br>4. About Us Preview (`AboutSection.jsx`)<br>5. Why Choose Us (`WhyChooseUs.jsx`)<br>6. Portfolio Showcase (`ProjectsSection.jsx`)<br>7. Testimonials Carousel (`TestimonialsSection.jsx`)<br>8. Industry Solutions (`IndustriesSection.jsx`)<br>9. CTA Conversion Banner (`CtaBanner.jsx`)<br>10. Core Tech Stack Marquee Strip |
| `/about`, `/about-us` | `About.jsx` (`src/Pages/About/About.jsx`) | 1. About Hero Section (`about_hero`)<br>2. Impact Metrics Strip (`stats_strip`)<br>3. Vision & Mission Pillars (`vision_mission`)<br>4. Executive Leadership (`founders`)<br>5. Core Values & DNA (`core_values`)<br>6. Technical Expertise Domains (`technical_expertise`)<br>7. Journey & Milestones History (`milestones`) |
| `/services` | `Services.jsx` | 1. Services Hero Banner (`ServicesHero.jsx`)<br>2. Category Filter & Search (`CategoryFilter.jsx`)<br>3. 4-Category Services Hub Tabs (Group, Softech, IT Staffing, E-Commerce)<br>4. Services Catalog Cards (`ServiceCard.jsx`)<br>5. Consultation & Quote Modal (`InquiryQuoteModal.jsx`) |
| `/softech-services` | `SoftechServices.jsx` | 1. Interactive Dropdown Tech Picker (`SoftechDropdownPicker.jsx`)<br>2. Spotlight Service Card (`SoftechSpotlightCard.jsx`)<br>3. Technical Architecture Matrix (`SoftechTechMatrix.jsx`)<br>4. Scope & Cost Estimator (`SoftechScopeEstimator.jsx`)<br>5. 7 Dedicated Industry Callouts<br>6. Service Detail Modal (`SoftechDetailsModal.jsx`) |
| `/products`, `/our-products` | `OurProducts.jsx` (`src/pages/OurProducts/`) | 1. Proprietary Products Hero (`products_hero`)<br>2. Enterprise Products Catalog (CRM, MLM, ERP, Multi-Vendor)<br>3. Live Interactive Product Estimator (`ProductEstimator.jsx`)<br>4. Video Demonstration Modal (`ProductVideoModal.jsx`) |
| `/clients`, `/our-clients` | `OurClients.jsx` (`src/pages/OurClients/`) | 1. Global Portfolio Hero (`clients_hero`)<br>2. International Deployments Grid (US, UK, UAE, India)<br>3. Client Success Case Studies (`ClientCaseStudyModal.jsx`)<br>4. Client Testimonials Carousel |
| `/it-staffing`, `/staffing` | `ITStaffing.jsx` | 1. Enterprise Staffing Hero with Lead Capture Form<br>2. Real-Time Staffing Metrics Strip (25,000+ staff, 28 states, 99.2% SLA)<br>3. 4 Strategic Hiring Models (Contract, Permanent, C2H, Offshore Dedicated)<br>4. Industry Coverage & Skill Matrix<br>5. Client Testimonials & Compliance Badges<br>6. Staffing FAQ Accordion |
| `/ecommerce` | `Ecommerce.jsx` | 1. E-Commerce Solutions Hero (`nayapuranabazaar.com` launchpad)<br>2. Marketplace Features & Multi-Vendor Engine<br>3. Live Platform Demonstration Preview<br>4. Buyer & Seller Pre-Registration Waitlist Modal |
| `/contact`, `/contact-us` | `Contact.jsx` | 1. Global Coordinates & Office Addresses (Indore HQ)<br>2. Direct Inquiries & RFP Form<br>3. Interactive Google Map / Geographic Visualizer<br>4. Social Media Channel Links<br>5. FAQ Quick Consultation Section |
| `/partnership` | `PartnershipPage.jsx` | 1. Strategic Alliances Hero<br>2. Partnership Proposal Form<br>3. Offshore Collaboration Models |
| `/business-partners` | `BusinessPartnersPage.jsx` | 1. Product Companies Tie-ups (SAP, Microsoft, AWS, Oracle)<br>2. Service Providers Alliances & Certifications |

---

## 2. WHICH PAGES ARE ALREADY CONNECTED TO THE CMS

1. **Home Page (`/`) – Partially Connected:**
   - `HeroSection.jsx` is connected to MongoDB `home_hero` via `getPageSections('home')`.
   - `ClockPhilosophy.jsx` is connected to MongoDB `home_philosophy`.
   - `CtaBanner.jsx` is connected to MongoDB `home_cta`.
   - `ServicesSection.jsx` dynamically loads services from MongoDB `getServices()`.
   - `ProjectsSection.jsx` dynamically loads projects from MongoDB `getProjects()`.
   - `TestimonialsSection.jsx` dynamically loads client reviews from MongoDB `getTestimonials()`.
   - `AboutSection.jsx` (preview on home) connects to `about_hero` and `core_values`.
2. **About Us Page (`/about`, `/about-us`) – Fully Dynamic:**
   - Connected to MongoDB Atlas `pageSlug: 'about'`.
   - Sections dynamically consuming database: `about_hero`, `stats_strip`, `vision_mission`, `founders`, `core_values`, `technical_expertise`, and `milestones`.
   - Real-time updates push via WebSocket (`socket.io`) and `BroadcastChannel` (`bgst_content_updated`).

---

## 3. WHICH PAGES ARE PARTIALLY CONNECTED

1. **Services Page (`/services`):**
   - The card items come from `getServices()`, but the header badge, title, subtitle, and intro banners are hardcoded inside `ServicesHero.jsx`.
2. **Projects Page (`/projects` inside home / standalone):**
   - Project cards come from MongoDB `Project` model, but category tabs, header badges, and descriptive subtitles are hardcoded.
3. **Home Page (`/`):**
   - `WhyChooseUs.jsx` and `IndustriesSection.jsx` are completely hardcoded from `siteData.js`.

---

## 4. WHICH PAGES ARE STILL USING HARDCODED CONTENT

1. **Our Products (`/products`, `/our-products`):**
   - Uses hardcoded `productsData.js` (CRM, MLM, School ERP, E-Commerce, Grocery App). No CMS connection to edit products or video links.
2. **Our Clients (`/clients`, `/our-clients`):**
   - Uses hardcoded `clientsData.js` (150+ international case studies, logos, and metrics).
3. **IT Staffing Solutions (`/it-staffing`, `/staffing`):**
   - 100% hardcoded text, metrics (25,000+ staff), models, and hiring forms inside `ITStaffing.jsx`.
4. **E-Commerce Hub (`/ecommerce`):**
   - 100% hardcoded text, waitlist copy, and domain details in `Ecommerce.jsx`.
5. **Contact Page (`/contact`, `/contact-us`):**
   - Addresses, phone numbers, emails, and office timings are hardcoded inside `Contact.jsx` instead of binding to `SiteSettings` or CMS `contact` sections.
6. **Partnership & Business Partners (`/partnership`, `/business-partners`):**
   - Uses hardcoded text and static lists in `businessPartnersData.js`.
7. **Home Page Sections:**
   - `WhyChooseUs.jsx` (Vision quote and 3 pillars) is hardcoded.
   - `IndustriesSection.jsx` (8 industry cards) is hardcoded.

---

## 5. WHICH ADMIN PANEL MODULES ARE WORKING

| Admin Module | Route | Status | Database Collection |
|---|---|---|---|
| Dashboard | `/admin` | ✅ Working | Aggregates logs, counts, status |
| Home Page Manager | `/admin/home` | ✅ Working | `pagecontents` (`pageSlug: 'home'`) |
| About Page Manager | `/admin/about` | ✅ Working | `pagecontents` (`pageSlug: 'about'`) |
| Services Manager | `/admin/services` | ✅ Working | `services` collection |
| Projects Manager | `/admin/projects` | ✅ Working | `projects` collection |
| Team Manager | `/admin/team` | ✅ Working | `teammembers` collection |
| Testimonials Manager | `/admin/testimonials` | ✅ Working | `testimonials` collection |
| Blog & Insights | `/admin/blog` | ✅ Working | `blogposts` collection |
| Enquiries & Leads | `/admin/enquiries` | ✅ Working | `enquiries` collection |
| Header & Banner | `/admin/header` | ✅ Working | `sitesettings` collection |
| Footer & Links | `/admin/footer` | ✅ Working | `sitesettings` collection |
| Navigation Menus | `/admin/menus` | ✅ Working | `sitesettings` collection |
| Contact Coordinates | `/admin/contact` | ✅ Working | `sitesettings` collection |
| Website Settings | `/admin/settings` | ✅ Working | `sitesettings` collection |
| Admin Users & Roles | `/admin/users` | ✅ Working | `adminusers` collection |
| Activity Audit Logs | `/admin/logs` | ✅ Working | `activitylogs` collection |
| Media Library | `/admin/media` | ⚠️ Partial | `mediaitems` (Local disk only, image only, no Cloudinary, no video) |

---

## 6. WHICH CMS FEATURES ARE MISSING

1. **Page-Wise CMS Modules for Remaining Public Pages:**
   - No CMS editor for **Our Products** (`/products`).
   - No CMS editor for **Our Clients & Case Studies** (`/clients`).
   - No CMS editor for **IT Staffing** (`/it-staffing`).
   - No CMS editor for **E-Commerce** (`/ecommerce`).
   - No CMS editor for **Partnership & Business Partners** (`/partnership`).
   - Home Page sections `Why Choose Us` and `Industries` have no controls in `HomePageManager.jsx`.
2. **Section Reordering & Duplicate Section Controls:**
   - While sections can have visibility toggled, reordering (`order_index`) and section duplication are not exposed in the editor UI.
3. **Live Draft vs. Published Separation:**
   - Frontend currently fetches published or falls back directly. Draft changes need a dedicated draft-preview state before publishing.
4. **Cloudinary Asset Picker in Section Editors:**
   - Content managers cannot pick an uploaded media file from the Media Library inside page section editors—they must type or paste URLs manually.

---

## 7. EXISTING IMAGE & VIDEO STORAGE & RENDERING METHODS

1. **Current Storage:**
   - Stored locally on server disk in `backend/uploads/` using `multer.diskStorage`.
   - In production (e.g. Vercel serverless / ephemeral containers), files written to local disk are wiped on each restart/deployment!
2. **File Types:**
   - Multer middleware only allows `image/` (`jpeg`, `png`, `webp`, `gif`, `svg`).
   - **Videos are rejected** with `Only image files are allowed!`.
3. **Public Access:**
   - Served via static route `app.use('/uploads', express.static(uploadsDir))` on port 5000.
4. **Cloudinary Readiness:**
   - `cloudinary` package is **not installed** in `backend/package.json`.
   - `.env.example` lacks Cloudinary configuration keys (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).

---

## 8. EXISTING MOBILE RESPONSIVENESS PROBLEMS

1. **Horizontal Badge Overflows (Historically):**
   - Floating badges with negative pixel positions (`bottom: -20px; left: -20px`) caused horizontal clipping and text overlap on screens $< 768px$ (fixed in Hero section, but needs universal safeguard).
2. **Tablets ($768px - 1024px$):**
   - Multi-column grids in `OurProducts.jsx` and `ITStaffing.jsx` suffer from cramped widths (e.g., 3-column layouts squishing 200px cards).
3. **Small Devices ($320px - 380px$):**
   - Fixed margins and minimum widths on modal dialogues (`InquiryModal`, `DemoModal`, `ServiceDetailModal`) cause clipping on iPhone SE / Galaxy Fold.
4. **Media Overflow:**
   - Inline code snippets and tech marquee badges need touch scrolling (`-webkit-overflow-scrolling: touch`) and zero scrollbar leakage.

---

## 9. EXISTING BACKEND APIS & DATABASE MODELS

### Database Models (`backend/models/`)
1. `AdminUser.js` – Superadmin and editor credentials (bcrypt, JWT).
2. `PageContent.js` – Flexible dynamic page sections with `pageSlug`, `sections` (Mixed schema), `revisions`, `lastUpdatedBy`.
3. `Service.js` – Full enterprise service catalog.
4. `Project.js` – Portfolio items, categories, tech tags, metrics.
5. `TeamMember.js` – Leadership profiles, designations, social links.
6. `Testimonial.js` – Client reviews, ratings, corporate positions.
7. `BlogPost.js` – Articles, authors, read times, slug.
8. `Enquiry.js` – Leads, consultation requests, contact form submissions.
9. `SiteSettings.js` – Global site info, header, footer, menus, contact coordinates.
10. `MediaItem.js` – Filename, originalName, mimeType, size, url. (Missing Cloudinary `publicId`, `resourceType`).
11. `ActivityLog.js` – Audit trail of admin actions.

### Backend Endpoints (`backend/routes/`)
- `GET/PUT /api/content/:pageSlug` – Page section CMS engine with draft & publish.
- `GET/POST/PUT/DELETE /api/services` – Services CRUD.
- `GET/POST/PUT/DELETE /api/projects` – Portfolio CRUD.
- `GET/POST/PUT/DELETE /api/testimonials` – Testimonials CRUD.
- `GET/POST/PUT/DELETE /api/team` – Team CRUD.
- `GET/POST/PUT/DELETE /api/blogs` – Blogs CRUD.
- `GET/POST/PUT/DELETE /api/media` – Media management (local disk).
- `GET/PUT /api/settings` – Site settings.
- `GET/POST /api/enquiries` – Inbound leads.
- `POST /api/auth/login`, `GET /api/auth/me` – Admin authentication.

---

## 10. SECURITY, PERFORMANCE & CODE-QUALITY ISSUES

1. **Security:**
   - Local token fallback in `backend/dataService.js` (`local_admin_token_active`) used as a placeholder when offline.
   - Cloudinary upload must be protected via authenticated admin routes (`protect` middleware).
   - Validation must restrict video uploads to valid formats (MP4, WebM, MOV) and limit file sizes (e.g. 50MB for video, 10MB for images).
2. **Performance:**
   - Redundant bundle duplication: `src/` and `frontend/src/` exist side-by-side; builds must remain strictly in sync.
   - Vite bundle chunk size: Some chunks exceed 500 kB (can be split or dynamic-imported).
3. **Data Integrity:**
   - Deleting a media asset in the admin library should verify if any page section currently references its URL to avoid broken images.
4. **CMS Scope:**
   - All 10 public pages must be manageable through unique `pageSlug` documents in MongoDB Atlas without hardcoded fallbacks overpowering admin edits.

---

## 11. STRATEGIC EXECUTION PLAN

Following the Phase requirements:
- **Phase 2:** Complete CMS integration across all public pages (`home`, `about`, `services`, `products`, `clients`, `it-staffing`, `ecommerce`, `contact`, `partnership`), with draft/publish workflows, section visibility, and dynamic frontend binding.
- **Phase 3:** Integrate Cloudinary SDK (`cloudinary`) with image & video support, Media Library UI upgrade, asset assignment to pages, and safe deletion checks.
- **Phase 4:** Expand Admin Panel with universal page content manager, section reordering/duplication controls, and media picker.
- **Phase 5:** Full mobile responsive polish across 320px–1920px viewports.
- **Phase 6:** Build verification and GitHub sync.

