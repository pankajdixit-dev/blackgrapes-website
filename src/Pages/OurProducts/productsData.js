// Complete Proprietary Product Catalog for Black Grapes Softech
// Extracted from official catalog at https://blackgrapessoftech.com/our-products/
// Features all 12 official YouTube demos, real industry mappings, and technical capabilities

export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Products', count: 12 },
  { id: 'education', label: 'Education & Campus', count: 1 },
  { id: 'healthcare', label: 'Healthcare & Pharma', count: 2 },
  { id: 'real-estate', label: 'Real Estate & Rentals', count: 2 },
  { id: 'enterprise', label: 'ERP, HR & Projects', count: 2 },
  { id: 'ecommerce', label: 'E-Commerce & Retail', count: 1 },
  { id: 'mobility', label: 'Mobility & Car Rental', count: 1 },
  { id: 'lifestyle', label: 'Fitness, Dating & Salon', count: 3 }
];

export const PRODUCTS_LIST = [
  {
    id: 'school-management-software',
    title: 'School Management Software',
    subtitle: 'Next-Gen Smart Campus & Academic ERP',
    category: 'education',
    industry: 'Education',
    badge: 'Flagship ERP',
    badgeColor: 'orange',
    youtubeId: 'GPuZ0QpRypw',
    deploymentDays: '3 - 5 Days',
    rating: '4.9/5 (180+ Institutes)',
    summary: 'A unified campus administration platform engineered for schools, colleges, and coaching academies. Automates admissions, fee management, student attendance, exams, and parent-teacher communication in real time.',
    keyFeatures: [
      'Automated Student Attendance & RFID/Biometric Integration',
      'Smart Fee Management with Online Payment Gateway & Invoicing',
      'Digital Gradebook, Exam Schedules & Report Card Generator',
      'Parent-Teacher Dedicated Mobile Apps (iOS & Android)',
      'Library, Transport Tracking & Hostel Room Allocation',
      'Staff Payroll & Teacher Workload Allocation'
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Flutter (iOS/Android)', 'AWS Cloud'],
    highlights: ['Multi-Branch Support', '100% White Label', 'CBSE/ICSE/State Board Ready']
  },
  {
    id: 'hospital-management-software',
    title: 'Hospital Management Software - Smart Operate',
    subtitle: 'Comprehensive Healthcare ERP & Clinical EHR Suite',
    category: 'healthcare',
    industry: 'Healthcare',
    badge: 'Enterprise Choice',
    badgeColor: 'purple',
    youtubeId: 'lXassfBY2Bw',
    deploymentDays: '5 - 7 Days',
    rating: '4.95/5 (85+ Hospitals)',
    summary: 'Smart Operate is an all-in-one clinical administration software connecting OPD, IPD, doctor consultations, electronic health records (EHR), lab diagnostic reporting, and central hospital billing.',
    keyFeatures: [
      'OPD & IPD Admission, Bed Allocation & Discharge Summaries',
      'Doctor Appointment Scheduling & Digital Prescription Writer',
      'Pathology & Radiology Diagnostic Lab Integration',
      'Integrated Pharmacy Sync & Automated Drug Inventory Tracking',
      'NABH & HIPAA Compliant Data Security & Encryption',
      'TPA / Health Insurance Claim Settlement Workflow'
    ],
    techStack: ['Next.js', 'Python FastAPI', 'MySQL Enterprise', 'React Native', 'Docker'],
    highlights: ['NABH Compliant', 'Multi-Specialty Ready', 'Doctor Mobile App']
  },
  {
    id: 'gymzy-management-software',
    title: 'Gymzy - Gym & Fitness Center Software',
    subtitle: 'Revolutionize Your Fitness Club & Gym Operations',
    category: 'lifestyle',
    industry: 'Home Services',
    badge: 'Trending App',
    badgeColor: 'orange',
    youtubeId: 'oYGAvul_2aM',
    deploymentDays: '2 - 4 Days',
    rating: '4.85/5 (240+ Gyms)',
    summary: 'Gymzy empowers gym owners and fitness studios with biometric access turnstile sync, automated membership renewal alerts, personal trainer workout assigners, and member diet logs.',
    keyFeatures: [
      'Biometric & RFID Turnstile / Door Access Sync',
      'Automated Membership Subscriptions & WhatsApp Renewal Alerts',
      'Trainer Shift Management & Client Workout Assignment',
      'Dietary Plans, Body Measurement & BMI Tracking Charts',
      'POS for Supplement Sales & Gym Merchandise Billing',
      'Interactive Member Mobile App for Workout & Attendance'
    ],
    techStack: ['React.js', 'Node.js', 'MongoDB', 'Flutter', 'Cloud IoT'],
    highlights: ['Biometric Hardware Sync', 'WhatsApp API Ready', 'Member App Included']
  },
  {
    id: 'hr-management-software',
    title: 'HR Management Software (HRPulse)',
    subtitle: 'Automated Employee Lifecycle, Payroll & Attendance',
    category: 'enterprise',
    industry: 'Home Services',
    badge: 'Corporate Standard',
    badgeColor: 'cyan',
    youtubeId: '35gZx2m_CPU',
    deploymentDays: '3 - 5 Days',
    rating: '4.9/5 (120+ Enterprises)',
    summary: 'Enterprise HRMS engineered to eliminate administrative bottlenecks. Provides one-click salary generation, biometric time-tracking, leave management, appraisal scorecards, and statutory tax compliance.',
    keyFeatures: [
      'One-Click Automated Payroll, Salary Slips & Tax Deductions (PF/ESI/TDS)',
      'Geo-Fenced & Biometric Remote Employee Attendance',
      'Multi-Tier Leave Approval System & Holiday Calendar',
      'Employee Self-Service (ESS) Mobile & Web Portal',
      'Performance Appraisal, KPI Tracking & 360 Feedback',
      'Asset Management & New Hire Digital Onboarding'
    ],
    techStack: ['Vue.js / React', 'Express.js', 'PostgreSQL', 'Android/iOS ESS App'],
    highlights: ['Statutory Tax Ready', 'Geo-Fencing Clock-In', 'Audit Log Trail']
  },
  {
    id: 'real-estate-listing-software',
    title: 'Real Estate Listing & Brokerage Software',
    subtitle: 'Discover Your Dream Space Platform & Property CRM',
    category: 'real-estate',
    industry: 'Real Estate',
    badge: 'High Conversion',
    badgeColor: 'purple',
    youtubeId: 'Wm2hbgubnZQ',
    deploymentDays: '4 - 6 Days',
    rating: '4.9/5 (90+ Agencies)',
    summary: 'A high-converting real estate marketplace and broker CRM for buying, selling, and renting residential and commercial properties with interactive Google Maps integration and lead capture.',
    keyFeatures: [
      'Interactive Map Search with Geo-radius & Neighborhood Filters',
      'Virtual 360 Tour, Video Walkthrough & High-Res Gallery Support',
      'Broker / Agent Lead Pipeline & Automated Follow-Up Reminders',
      'Multi-Vendor Builder & Property Owner Direct Submissions',
      'EMI & Mortgage Calculator with Instant Inquiry Generation',
      'Automated Property Alert Emails & WhatsApp Notifications'
    ],
    techStack: ['React', 'Next.js SSR', 'Node.js', 'PostgreSQL', 'Google Maps API'],
    highlights: ['Map Integration', 'Virtual Tour Ready', 'Agent Lead CRM']
  },
  {
    id: 'tenant-management-software',
    title: 'Tenant & Rental Property Management Software',
    subtitle: 'Optimize Rental Property Performance & Lease Tracker',
    category: 'real-estate',
    industry: 'Real Estate',
    badge: 'Popular',
    badgeColor: 'orange',
    youtubeId: 'zXJA0mkBgpQ',
    deploymentDays: '3 - 5 Days',
    rating: '4.8/5 (75+ Property Firms)',
    summary: 'Streamline rental property portfolios, manage leases, automate rent invoicing with instant payment links, track maintenance work orders, and maintain complete landlord-tenant transparency.',
    keyFeatures: [
      'Digital Lease Agreements & E-Signature Integration',
      'Automated Monthly Rent Invoicing with Instant UPI/Card Payment Links',
      'Tenant Background Verification & Document Vault',
      'Maintenance Request & Work Order Ticketing System',
      'Unit Occupancy Analytics & Vacancy Loss Calculator',
      'Separate Landlord & Tenant Mobile Portals'
    ],
    techStack: ['React', 'Express', 'MySQL', 'React Native', 'Razorpay/Stripe'],
    highlights: ['E-Sign Support', 'Auto Payment Links', 'Maintenance Ticketing']
  },
  {
    id: 'pharmacy-management-software',
    title: 'Pharmacy Management Software',
    subtitle: 'Smart Inventory, POS Billing & Batch Expiry Tracking',
    category: 'healthcare',
    industry: 'Healthcare',
    badge: 'Retail Tech',
    badgeColor: 'cyan',
    youtubeId: '8u_RKkRxaRQ',
    deploymentDays: '2 - 4 Days',
    rating: '4.9/5 (210+ Pharmacies)',
    summary: 'High-speed POS software designed specifically for retail pharmacies and wholesale medicine distributors. Prevents revenue loss through batch expiry alerts and automated medicine reordering.',
    keyFeatures: [
      'Barcode Scanning POS Billing with Instant GST Invoice Generation',
      'Smart Batch Number & Medicine Expiry Date Alert Warning',
      'Salt/Substitute Composition Medicine Search Engine',
      'Supplier Purchase Orders & Automated Reorder Point Triggers',
      'Doctor Prescription Upload & Customer Order History',
      'Multi-Store Warehouse Sync & Daily Cash Flow Auditing'
    ],
    techStack: ['React', 'Electron (Desktop Offline/Online)', 'Node.js', 'SQLite/PostgreSQL'],
    highlights: ['Offline POS Mode', 'Batch Expiry Shield', 'GST Invoice Ready']
  },
  {
    id: 'dating-website-software',
    title: 'Dating & Matchmaking Solution',
    subtitle: 'Finding Love Made Easy: Next-Gen Dating Platform',
    category: 'lifestyle',
    industry: 'Home Services',
    badge: 'Social Pioneer',
    badgeColor: 'purple',
    youtubeId: 'XKJhoaLEDSI',
    deploymentDays: '5 - 7 Days',
    rating: '4.8/5 (60+ Deployments)',
    summary: 'A modern dating, matchmaking, and matrimonial application packed with smart matching algorithms, swipe gestures, real-time end-to-end chat, voice/video calls, and VIP subscription plans.',
    keyFeatures: [
      'Smart Compatibility & Proximity Geo-Matching Algorithm',
      'Smooth Swipe Right/Left Gesture Interface with Rewind & Superlikes',
      'Real-Time WebSocket Text, Photo & Voice Note Messaging',
      'In-App WebRTC Encrypted Audio & Video Calling',
      'AI Selfie Verification & Fake Profile Detection Guard',
      'VIP Tiered Subscriptions, Coin Wallets & In-App Purchases'
    ],
    techStack: ['React / React Native', 'Node.js', 'Socket.io', 'WebRTC', 'MongoDB'],
    highlights: ['Swipe Interface', 'WebRTC Video Calls', 'VIP Monetization']
  },
  {
    id: 'project-management-software',
    title: 'Project Management Software (TaskOrbit)',
    subtitle: 'Project Management Made Easy & Agile Team Workspace',
    category: 'enterprise',
    industry: 'Home Services',
    badge: 'Productivity',
    badgeColor: 'orange',
    youtubeId: 'CiwkaRqWqZE',
    deploymentDays: '3 - 5 Days',
    rating: '4.85/5 (110+ Companies)',
    summary: 'An intuitive workspace for high-velocity software teams, agencies, and businesses. Features Kanban boards, Gantt timelines, milestone tracking, team worklogs, and sprint burndown charts.',
    keyFeatures: [
      'Interactive Kanban Boards, Agile Sprints & Backlog Management',
      'Interactive Gantt Charts & Critical Path Milestone Timelines',
      'Team Timesheets, Hourly Billable Tracking & Invoicing',
      'Granular Role-Based Permissions (Client, Member, Admin, PM)',
      'Document Collaboration & Task Discussion Comment Threads',
      'Automated Slack, Email & Webhook Notifications'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Redis', 'PostgreSQL'],
    highlights: ['Kanban + Gantt', 'Time Tracking', 'Agile Sprints']
  },
  {
    id: 'salon-management-solution',
    title: 'Salon & Spa Management Solution',
    subtitle: 'The Ultimate Salon Appointment & POS Software',
    category: 'lifestyle',
    industry: 'Home Services',
    badge: 'Client Favorite',
    badgeColor: 'purple',
    youtubeId: 'vRkWDMQctgI',
    deploymentDays: '2 - 4 Days',
    rating: '4.9/5 (190+ Salons)',
    summary: 'Comprehensive software for beauty salons, nail spas, and wellness centers. Manages online appointment bookings, stylist chair schedules, inventory, and customer loyalty rewards.',
    keyFeatures: [
      'Online Customer Appointment Booking via Web & Instagram Link',
      'Stylist Schedule & Service Duration Chair Allocation Matrix',
      'Fast POS Billing with Split Payments, Tips & Gift Cards',
      'Customer Loyalty Points, Birthday Discounts & SMS Reminders',
      'Backbar Cosmetic Products & Retail Stock Control',
      'Daily Revenue, Stylist Commission & Profit Margin Analytics'
    ],
    techStack: ['React', 'Tailwind', 'Express.js', 'MySQL', 'SMS Gateway'],
    highlights: ['Online Booking Widget', 'Loyalty Rewards', 'Stylist Commissions']
  },
  {
    id: 'ecommerce-marketplace-software',
    title: 'E-Commerce Marketplace Website & App',
    subtitle: 'Revolutionize Shopping: High-Performance Multi-Vendor Hub',
    category: 'ecommerce',
    industry: 'E- Commerce',
    badge: 'Scale Ready',
    badgeColor: 'orange',
    youtubeId: 'dNES8Qy8-y8',
    deploymentDays: '4 - 7 Days',
    rating: '4.95/5 (310+ Stores)',
    summary: 'Robust multi-vendor and direct-to-consumer e-commerce suite featuring lightning-fast catalog search, one-click checkout, multiple payment gateways, and automated delivery partner integration.',
    keyFeatures: [
      'Multi-Vendor Merchant Sub-Panels with Automated Commission Splits',
      'Lightning-Fast Elastic Product Search with Filters & Facets',
      'One-Step Checkout with Cash on Delivery & Pre-Paid Gateways',
      'Shiprocket, Delhivery & Bluedart Courier Tracking Webhook Sync',
      'Flash Sale Timer, Coupon Engine & Dynamic Discount Rules',
      'Dedicated iOS & Android Shopper Apps with Push Notifications'
    ],
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'React Native'],
    highlights: ['Multi-Vendor Ready', 'Courier API Sync', 'Flash Sale Engine']
  },
  {
    id: 'car-rental-software',
    title: 'Car Rental & Fleet Management Platform',
    subtitle: 'Maximize Profits & Efficiency: Fleet Booking System',
    category: 'mobility',
    industry: 'Taxi and Transportation',
    badge: 'Fleet Pro',
    badgeColor: 'cyan',
    youtubeId: '2PLJeKPb7jA',
    deploymentDays: '3 - 5 Days',
    rating: '4.85/5 (95+ Rental Operators)',
    summary: 'Complete vehicle rental and self-drive reservation engine. Enables real-time fleet availability lookup, dynamic daily/hourly tariff calculations, driver management, and GPS vehicle tracking.',
    keyFeatures: [
      'Real-Time Vehicle Availability Calendar & Instant Online Booking',
      'Dynamic Tariff Rates (Hourly, Daily, Outstation, Security Deposit)',
      'Digital Driver License & Identity Document Verification',
      'Vehicle Maintenance Schedules, Insurance Expiry & Odometer Logs',
      'Live GPS Tracking Integration & Geo-Fence Boundary Alerts',
      'Customer Mobile App with Keyless Entry & Booking Extension'
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Flutter', 'Google Maps / GPS'],
    highlights: ['Fleet GPS Ready', 'Dynamic Pricing', 'License KYC Scanner']
  }
];

export const OFFICIAL_INDUSTRIES = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: 'Activity',
    description: 'Hospitals, Multi-Specialty Clinics, Diagnostic Centers & Retail Pharmacies.',
    solutions: ['Hospital Management ERP', 'Pharmacy POS & Expiry Tracker', 'Doctor Teleconsultation Apps']
  },
  {
    id: 'education',
    name: 'Education',
    icon: 'GraduationCap',
    description: 'K-12 Schools, Colleges, Higher Education Universities & Coaching Institutes.',
    solutions: ['School Management Software', 'Online Exam & Result Portal', 'Student & Parent Mobile Apps']
  },
  {
    id: 'ecommerce',
    name: 'E- Commerce',
    icon: 'ShoppingBag',
    description: 'B2B/B2C Multi-Vendor Marketplaces, Retail Brands & D2C Storefronts.',
    solutions: ['Multi-Vendor Marketplace', 'Courier & Logistics Sync', 'Mobile Shopping Apps']
  },
  {
    id: 'taxi-transport',
    name: 'Taxi and Transportation',
    icon: 'Car',
    description: 'Fleet Operators, Self-Drive Car Rentals, Logistics Dispatch & Cab Aggregators.',
    solutions: ['Car Rental Software', 'Fleet Tracking & Dispatch', 'Driver & Rider Real-Time Apps']
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: 'Building',
    description: 'Real Estate Brokers, Property Developers, Housing Societies & Tenant Portals.',
    solutions: ['Real Estate Listing Platform', 'Tenant & Lease Management', 'Property CRM & Lead Pipeline']
  },
  {
    id: 'home-services',
    name: 'Home Services',
    icon: 'Wrench',
    description: 'On-Demand Service Platforms, Beauty Salons, Gyms & Enterprise Workforces.',
    solutions: ['Salon & Spa Software', 'Gymzy Fitness Center Suite', 'Task & Project Management']
  },
  {
    id: 'food-delivery',
    name: 'Food Delivery',
    icon: 'UtensilsCrossed',
    description: 'Single & Multi-Restaurant Ordering Systems, Cloud Kitchens & QSR Franchises.',
    solutions: ['Multi-Restaurant Ordering App', 'Kitchen Display System (KDS)', 'Live Delivery Partner Tracking']
  }
];

export const PRODUCT_GUARANTEES = [
  {
    icon: 'Code',
    title: '100% Source Code Ownership',
    desc: 'You receive the entire unencrypted codebase and database schema. Zero vendor lock-in, zero perpetual per-seat license fees.'
  },
  {
    icon: 'Palette',
    title: 'Complete White-Label Customization',
    desc: 'Branded completely with your company logo, custom color theme, domain name, and personalized corporate email servers.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Enterprise Security & Compliance',
    desc: 'Built with industry standard data protection, SSL/TLS encryption, role-based access control, and GDPR/HIPAA/GST compliance.'
  },
  {
    icon: 'CloudLightning',
    title: 'Cloud Ready & Scalable Architecture',
    desc: 'Optimized for AWS, Azure, DigitalOcean or on-premise hardware with Docker containers and automatic load balancing.'
  },
  {
    icon: 'Smartphone',
    title: 'Cross-Platform Native & Web Apps',
    desc: 'Seamless unified experience across Desktop Browsers, Progressive Web Apps (PWA), iOS App Store, and Google Play Store.'
  },
  {
    icon: 'Headphones',
    title: '1 Year Free Maintenance & Tech Support',
    desc: 'Includes server setup, database migration, regular security patches, bug fixes, and continuous technical assistance.'
  }
];
