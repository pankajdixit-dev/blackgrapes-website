-- ==============================================================================
-- BLACK GRAPES SOFTECH - INITIAL DATABASE SEED DATA
-- Populates all existing website data into Supabase PostgreSQL
-- ==============================================================================

-- 1. SITE SETTINGS
INSERT INTO site_settings (
    id, site_name, tagline, logo_url, primary_email, primary_phone, secondary_phone, office_address,
    top_strip_text, top_strip_enabled, social_linkedin, social_twitter, social_instagram, social_youtube,
    footer_about_text, footer_trust_badge, copyright_text
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Black Grapes Softech Pvt. Ltd.',
    'Empowering Enterprises Worldwide with Next-Gen Tech',
    '/src/assets/bgst-logo.png',
    'info@blackgrapessoftech.com',
    '+91 7470997884',
    '+91 6262414463',
    '252-F/H Scheme No 54, Vijaynagar, Indore - 452010, Madhya Pradesh, India',
    'Empowering Enterprises Worldwide with Next-Gen Tech',
    true,
    'https://www.linkedin.com/in/black-grapes-softech/',
    'https://twitter.com/grapessoftech',
    'https://www.instagram.com/blackgrapessoftech/',
    'https://www.youtube.com/channel/UC3gJA06Uxb0D82-PVJl0SbQ',
    'We are an innovative IT solutions & custom software development company based in Indore, India. Empowering businesses across the globe with robust, scalable, and tailored digital products.',
    'ISO & Quality Assured Development Standards',
    '© 2026 Black Grapes Softech Pvt. Ltd. All rights reserved.'
) ON CONFLICT (id) DO NOTHING;

-- 2. MENUS / NAVIGATION
INSERT INTO menus (label, path, order_index, is_active) VALUES
('Home', '/', 1, true),
('About Us', '/about', 2, true),
('Services', '/services', 3, true),
('Our Products', '/products', 4, true),
('Our Clients', '/clients', 5, true),
('Contact', '/contact', 6, true);

-- 3. PAGES
INSERT INTO pages (id, slug, title, meta_title, meta_description, is_published) VALUES
('10000000-0000-0000-0000-000000000001', 'home', 'Home | Black Grapes Softech', 'About Us | Black Grapes Softech - Leading Software & Tech Agency', 'Discover Black Grapes Softech - visionary software development agency empowering businesses worldwide with custom web, mobile, CRM, and cloud solutions.', true),
('10000000-0000-0000-0000-000000000002', 'about', 'About Us | Black Grapes Softech', 'About Us | Black Grapes Softech - Leading Software & Tech Agency', 'Discover Black Grapes Softech - visionary software development agency empowering businesses worldwide with custom web, mobile, CRM, and cloud solutions.', true),
('10000000-0000-0000-0000-000000000003', 'products', 'Our Products | Black Grapes Softech', 'Proprietary Software Catalog | Black Grapes Softech', 'Explore 12+ enterprise turnkey products with instant video demos, ratings and turnkey delivery.', true),
('10000000-0000-0000-0000-000000000004', 'clients', 'Our Clients | Black Grapes Softech', 'Global Client Portfolio | Black Grapes Softech', 'Trusted by 150+ international clients across 15+ nations including Alphabet, Mastercard, Fujitsu.', true),
('10000000-0000-0000-0000-000000000005', 'services', 'Services & Solutions Hub | Black Grapes Softech', 'Custom Software Development & Tech Services | Black Grapes Softech', 'Enterprise software, mobile apps, CRM, MLM, cloud architectures and digital marketing.', true),
('10000000-0000-0000-0000-000000000006', 'contact', 'Contact Us | Black Grapes Softech', 'Contact Black Grapes Softech | Indore Office', 'Direct line: +91 7470997884. Office: 252-F/H Scheme No 54, Vijaynagar, Indore-452010.', true);

-- 4. PAGE SECTIONS (For About / Home Page)
INSERT INTO page_sections (page_id, section_key, section_name, order_index, is_visible, content_published, content_draft) VALUES
(
    '10000000-0000-0000-0000-000000000002',
    'about_hero',
    'About Hero Banner',
    1,
    true,
    '{
        "badge": "ABOUT BLACK GRAPES SOFTECH",
        "title": "We Don’t Just Write Code —",
        "titleHighlight": "We Engineer The Digital Future.",
        "lead": "Headquartered in Indore, India, Black Grapes Softech is a premier software engineering & digital transformation agency. We translate complex business hurdles into elegant, high-impact digital products.",
        "primaryBtnText": "Partner With Us",
        "secondaryBtnText": "Meet Our Leadership",
        "secondaryBtnLink": "#founders",
        "image": "/src/assets/about-hero.jpg",
        "floatingStat1Num": "250+ Projects",
        "floatingStat1Sub": "Shipped Globally",
        "floatingStat2Num": "15+ Nations",
        "floatingStat2Sub": "Active Client Base",
        "microBadges": ["Certified Developers", "Full Cycle Development", "24/7 Dedicated Support"]
    }'::jsonb,
    '{
        "badge": "ABOUT BLACK GRAPES SOFTECH",
        "title": "We Don’t Just Write Code —",
        "titleHighlight": "We Engineer The Digital Future.",
        "lead": "Headquartered in Indore, India, Black Grapes Softech is a premier software engineering & digital transformation agency. We translate complex business hurdles into elegant, high-impact digital products.",
        "primaryBtnText": "Partner With Us",
        "secondaryBtnText": "Meet Our Leadership",
        "secondaryBtnLink": "#founders",
        "image": "/src/assets/about-hero.jpg",
        "floatingStat1Num": "250+ Projects",
        "floatingStat1Sub": "Shipped Globally",
        "floatingStat2Num": "15+ Nations",
        "floatingStat2Sub": "Active Client Base",
        "microBadges": ["Certified Developers", "Full Cycle Development", "24/7 Dedicated Support"]
    }'::jsonb
),
(
    '10000000-0000-0000-0000-000000000002',
    'stats_strip',
    'Key Impact Metrics Bar',
    2,
    true,
    '{
        "stats": [
            { "number": "10+", "label": "Years of Innovation", "highlight": "Since 2014" },
            { "number": "250+", "label": "Projects Completed", "highlight": "Global Scale" },
            { "number": "150+", "label": "Satisfied Clients", "highlight": "15+ Countries" },
            { "number": "99%", "label": "Client Retention", "highlight": "Industry Best" }
        ]
    }'::jsonb,
    '{
        "stats": [
            { "number": "10+", "label": "Years of Innovation", "highlight": "Since 2014" },
            { "number": "250+", "label": "Projects Completed", "highlight": "Global Scale" },
            { "number": "150+", "label": "Satisfied Clients", "highlight": "15+ Countries" },
            { "number": "99%", "label": "Client Retention", "highlight": "Industry Best" }
        ]
    }'::jsonb
),
(
    '10000000-0000-0000-0000-000000000002',
    'founders',
    'Founders & Leadership',
    3,
    true,
    '{
        "badge": "LEADERSHIP & VISION",
        "title": "Meet the Visionaries Behind Black Grapes",
        "subtitle": "Passionate innovators dedicated to redefining software engineering standards.",
        "photo": "/src/assets/founders.jpg",
        "photoTagName": "Mr. Arpit Jain & Mrs. Deepika Jain",
        "photoTagRole": "Founders & Executive Directors",
        "heading": "Driven By Innovation, Grounded In Excellence",
        "intro": "Behind Black Grapes Softech stand two visionary leaders with an unquenchable passion for digital advancement.",
        "founder1Name": "Mr. Arpit Jain — Founder & Chief Architect",
        "founder1Bio": "The driving force behind our software development journey. With a wealth of architectural experience and an instinctive knack for staying ahead of technological curves, he has pioneered cutting-edge solutions that have redefined client operations across industries.",
        "founder2Name": "Mrs. Deepika Jain — Co-Founder & Strategic Director",
        "founder2Bio": "Deepika Jain doesn’t just see challenges; she envisions opportunities. Her boundless creativity, strategic acumen, and people-first leadership have shaped our company’s culture of relentless innovation and customer delight."
    }'::jsonb,
    '{
        "badge": "LEADERSHIP & VISION",
        "title": "Meet the Visionaries Behind Black Grapes",
        "subtitle": "Passionate innovators dedicated to redefining software engineering standards.",
        "photo": "/src/assets/founders.jpg",
        "photoTagName": "Mr. Arpit Jain & Mrs. Deepika Jain",
        "photoTagRole": "Founders & Executive Directors",
        "heading": "Driven By Innovation, Grounded In Excellence",
        "intro": "Behind Black Grapes Softech stand two visionary leaders with an unquenchable passion for digital advancement.",
        "founder1Name": "Mr. Arpit Jain — Founder & Chief Architect",
        "founder1Bio": "The driving force behind our software development journey. With a wealth of architectural experience and an instinctive knack for staying ahead of technological curves, he has pioneered cutting-edge solutions that have redefined client operations across industries.",
        "founder2Name": "Mrs. Deepika Jain — Co-Founder & Strategic Director",
        "founder2Bio": "Deepika Jain doesn’t just see challenges; she envisions opportunities. Her boundless creativity, strategic acumen, and people-first leadership have shaped our company’s culture of relentless innovation and customer delight."
    }'::jsonb
);

-- 5. TEAM MEMBERS (Founders)
INSERT INTO team_members (name, role, bio, photo_url, badge_tag, is_leadership, order_index, status) VALUES
('Mr. Arpit Jain', 'Founder & Chief Architect', 'The driving force behind our software development journey. With architectural mastery and modern cloud expertise, he has spearheaded 250+ enterprise rollouts globally.', '/src/assets/founders.jpg', 'Founder', true, 1, 'published'),
('Mrs. Deepika Jain', 'Co-Founder & Strategic Director', 'Visionary operational strategist cultivating client excellence, human-centered culture, and international strategic partnerships.', '/src/assets/founders.jpg', 'Co-Founder', true, 2, 'published');

-- 6. TESTIMONIALS
INSERT INTO testimonials (quote, author, role, company, country, rating, order_index, status) VALUES
('Black Grapes Softech transformed our legacy systems into a lightning-fast cloud architecture. Their engineers in Indore operate with the precision and caliber of Silicon Valley leaders.', 'David Thorne', 'VP of Engineering', 'Fintech Solutions UK', 'United Kingdom', 5, 1, 'published'),
('The dedication and agility of the Black Grapes team is unmatched. They delivered our multi-tenant SaaS application two weeks ahead of schedule with flawless code quality.', 'Kenji Takahashi', 'Managing Director', 'Tokyo Digital Commerce', 'Japan', 5, 2, 'published'),
('We have collaborated with software agencies across the globe, but Black Grapes Softech stands out for transparency, communication, and real ownership of the business vision.', 'Sarah Jenkins', 'Chief Product Officer', 'HealthFlow AI', 'United States', 5, 3, 'published');

-- 7. SERVICES
INSERT INTO services (title, slug, short_desc, full_desc, icon_name, category, order_index, status) VALUES
('Web App Architecture', 'web-architecture', 'Next-gen reactive web applications engineered with React, Next.js, and cloud backends.', 'We build ultra-scalable, responsive, SEO-ready web applications with enterprise security and speed.', 'Layers', 'Engineering', 1, 'published'),
('Mobile App Development (iOS/Android)', 'mobile-apps', 'High-performance native and cross-platform Flutter/React Native mobile applications.', 'From concept to App Store / Google Play deployment, we deliver mobile apps that users love.', 'Smartphone', 'Engineering', 2, 'published'),
('Enterprise CRM Solutions', 'enterprise-crm', 'Tailor-made Customer Relationship Management platforms tailored to your sales funnel.', 'Automate lead scoring, pipeline management, client communications, and real-time sales reporting.', 'Building', 'Enterprise', 3, 'published'),
('MLM Software Systems', 'mlm-software', 'Robust multi-level marketing matrix, binary, generation, and commission calculation software.', 'Secure, fraud-proof transaction handling with real-time wallet sync and payout calculations.', 'Zap', 'Enterprise', 4, 'published'),
('Digital Growth & SEO', 'digital-marketing', 'Data-driven search engine optimization, performance marketing, and conversion growth.', 'Dominating search rankings and driving targeted customer acquisition for your brand.', 'TrendingUp', 'Marketing', 5, 'published'),
('UI/UX & Brand Identity', 'ui-ux-design', 'Human-centered user experience design, wireframing, high-fidelity prototypes, and design systems.', 'Crafting captivating digital experiences that turn visitors into loyal paying customers.', 'Palette', 'Design', 6, 'published'),
('Interactive Game Development', 'game-development', 'Engaging 2D/3D mobile and web games with real-time multiplayer logic and monetization.', 'Built with Unity, WebGL, and high-performance server architectures.', 'Award', 'Gaming', 7, 'published'),
('Cloud & DevOps (AWS/Azure)', 'cloud-devops', 'Zero-downtime CI/CD pipelines, Docker containerization, Kubernetes, and serverless architectures.', 'Maximizing infrastructure reliability, security compliance, and cost efficiency.', 'CloudLightning', 'DevOps', 8, 'published');

-- 8. PROPRIETARY PRODUCTS / PROJECTS (First 4 sample seeds, remaining synced dynamically)
INSERT INTO projects (product_key, title, subtitle, category, industry, badge, badge_color, youtube_id, deployment_days, rating, summary, key_features, tech_stack, highlights, order_index, status) VALUES
(
    'school-management-software',
    'School Management Software',
    'Next-Gen Smart Campus & Academic ERP',
    'education',
    'Education',
    'Flagship ERP',
    'orange',
    'GPuZ0QpRypw',
    '3 - 5 Days',
    '4.9/5 (180+ Institutes)',
    'A unified campus administration platform engineered for schools, colleges, and coaching academies. Automates admissions, fee management, student attendance, exams, and parent-teacher communication in real time.',
    '["Automated Student Attendance & RFID/Biometric Integration", "Smart Fee Management with Online Payment Gateway & Invoicing", "Digital Gradebook, Exam Schedules & Report Card Generator", "Parent-Teacher Dedicated Mobile Apps (iOS & Android)", "Library, Transport Tracking & Hostel Room Allocation", "Staff Payroll & Teacher Workload Allocation"]'::jsonb,
    '["React", "Node.js", "PostgreSQL", "Flutter (iOS/Android)", "AWS Cloud"]'::jsonb,
    '["Multi-Branch Support", "100% White Label", "CBSE/ICSE/State Board Ready"]'::jsonb,
    1,
    'published'
),
(
    'hospital-management-software',
    'Hospital Management Software - Smart Operate',
    'Comprehensive Healthcare ERP & Clinical EHR Suite',
    'healthcare',
    'Healthcare',
    'Enterprise Choice',
    'purple',
    'lXassfBY2Bw',
    '5 - 7 Days',
    '4.95/5 (85+ Hospitals)',
    'Smart Operate is an all-in-one clinical administration software connecting OPD, IPD, doctor consultations, electronic health records (EHR), lab diagnostic reporting, and central hospital billing.',
    '["OPD & IPD Admission, Bed Allocation & Discharge Summaries", "Doctor Appointment Scheduling & Digital Prescription Writer", "Pathology & Radiology Diagnostic Lab Integration", "Integrated Pharmacy Sync & Automated Drug Inventory Tracking", "NABH & HIPAA Compliant Data Security & Encryption", "TPA / Health Insurance Claim Settlement Workflow"]'::jsonb,
    '["Next.js", "Python FastAPI", "MySQL Enterprise", "React Native", "Docker"]'::jsonb,
    '["NABH Compliant", "Multi-Specialty Ready", "Doctor Mobile App"]'::jsonb,
    2,
    'published'
),
(
    'gymzy-management-software',
    'Gymzy - Gym & Fitness Center Software',
    'Revolutionize Your Fitness Club & Gym Operations',
    'lifestyle',
    'Home Services',
    'Trending App',
    'orange',
    'oYGAvul_2aM',
    '2 - 4 Days',
    '4.85/5 (240+ Gyms)',
    'Gymzy empowers gym owners and fitness studios with biometric access turnstile sync, automated membership renewal alerts, personal trainer workout assigners, and member diet logs.',
    '["Biometric & RFID Turnstile / Door Access Sync", "Automated Membership Subscriptions & WhatsApp Renewal Alerts", "Trainer Shift Management & Client Workout Assignment", "Dietary Plans, Body Measurement & BMI Tracking Charts", "POS for Supplement Sales & Gym Merchandise Billing", "Interactive Member Mobile App for Workout & Attendance"]'::jsonb,
    '["React.js", "Node.js", "MongoDB", "Flutter", "Cloud IoT"]'::jsonb,
    '["Biometric Hardware Sync", "WhatsApp API Ready", "Member App Included"]'::jsonb,
    3,
    'published'
),
(
    'hr-management-software',
    'HR Management Software (HRPulse)',
    'Automated Employee Lifecycle, Payroll & Attendance',
    'enterprise',
    'Home Services',
    'Corporate Standard',
    'cyan',
    '35gZx2m_CPU',
    '3 - 5 Days',
    '4.9/5 (120+ Enterprises)',
    'Enterprise HRMS engineered to eliminate administrative bottlenecks. Provides one-click salary generation, biometric time-tracking, leave management, appraisal scorecards, and statutory tax compliance.',
    '["One-Click Automated Payroll, Salary Slips & Tax Deductions (PF/ESI/TDS)", "Geo-Fenced & Biometric Remote Employee Attendance", "Employee Self-Service (ESS) Mobile & Web Portal", "Performance Appraisals, OKRs & Goal Tracking Matrices", "Recruitment Pipeline & Candidate Onboarding Management", "Automated Compliance & Statutory Reports Generator"]'::jsonb,
    '["Vue.js / React", "Spring Boot / Node", "PostgreSQL", "AWS S3", "Microservices"]'::jsonb,
    '["Automated Payroll", "Remote Geo-Fencing", "Tax & PF Compliant"]'::jsonb,
    4,
    'published'
);

-- 9. SEO METADATA
INSERT INTO seo_metadata (page_route, meta_title, meta_description, meta_keywords) VALUES
('/', 'Black Grapes Softech | Leading Software & Tech Agency', 'Premier software development agency empowering businesses worldwide with custom web, mobile, CRM, and cloud solutions.', 'software company indore, custom web development, mobile app agency, crm development'),
('/about', 'About Us | Black Grapes Softech - Leading Software & Tech Agency', 'Discover Black Grapes Softech - visionary software development agency empowering businesses worldwide with custom web, mobile, CRM, and cloud solutions.', 'about black grapes, software team, indore software engineering'),
('/products', 'Proprietary Software Catalog | Black Grapes Softech', 'Explore 12+ enterprise turnkey products with instant video demos, ratings and turnkey delivery.', 'school software, hospital erp, gym management, turnkey software'),
('/clients', 'Global Client Portfolio | Black Grapes Softech', 'Trusted by 150+ international clients across 15+ nations including Alphabet, Mastercard, Fujitsu.', 'black grapes clients, portfolio, case studies'),
('/services', 'Services & Solutions Hub | Black Grapes Softech', 'Enterprise software, mobile apps, CRM, MLM, cloud architectures and digital marketing.', 'web services, flutter apps, crm development, mlm platform'),
('/contact', 'Contact Us | Black Grapes Softech - Indore Office', 'Direct line: +91 7470997884. Office: 252-F/H Scheme No 54, Vijaynagar, Indore-452010.', 'contact black grapes, indore office, it company phone');

-- 10. ADMIN USERS (Initial Super Admin)
INSERT INTO admin_users (email, full_name, role, is_active) VALUES
('admin@blackgrapessoftech.com', 'Black Grapes Super Admin', 'super_admin', true);

