import React, { useState } from 'react';
import { 
  Building2, 
  CreditCard, 
  Cpu, 
  ShoppingBag, 
  Stethoscope, 
  Truck, 
  Factory, 
  GraduationCap, 
  Wheat, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import '../styles/Honeycomb.css';

export default function HoneycombIndustries({ onOpenInquiry }) {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  // 3 interlocking rows matching 4 O'Clock layout
  const honeycombRows = [
    // Row 1: 4 Hexagons
    [
      {
        id: 'IND-01',
        name: 'FinTech & Banking',
        shortName: 'FinTech',
        icon: <CreditCard size={28} />,
        variant: 'accent',
        description: 'Secure, high-concurrency banking software, automated payment gateway integration, loan management suites, and bank collateral asset valuation reports.',
        solutions: [
          'Core Banking & Non-Banking Financial (NBFC) Automation Software',
          'Automated EMI & Payment Gateway API Reconciliation',
          'IBBI & RBI Compliant Solvency & Valuation Certifications',
          'Bank Mortgage Collateral Appraisal & Field Title Searches'
        ]
      },
      {
        id: 'IND-02',
        name: 'Real Estate & PropTech',
        shortName: 'PropTech',
        icon: <Building2 size={28} />,
        variant: 'white',
        description: 'End-to-end commercial property broking, 3D architectural rendering portals, municipal Naksha Pass approvals, and 30-year revenue title verification.',
        solutions: [
          'Indore Nagar Nigam Building Map Sanctions & IDA Lease Clearance',
          'Commercial Property Broking & High-Yield Rental Scouting',
          'Agricultural to Commercial Land Diversion Orders',
          'PropTech Listing Portals & CRM Lead Automation'
        ]
      },
      {
        id: 'IND-03',
        name: 'Manufacturing & Industrial',
        shortName: 'Industry',
        icon: <Factory size={28} />,
        variant: 'dark',
        description: 'Heavy machinery and plant technical valuation, Chartered Engineer certificates for customs EPCG, Factory Act licensing, and industrial land procurement.',
        solutions: [
          'Plant & Industrial Machinery Valuation Reports under IBC 2016',
          'Chartered Engineer Capital Goods & Customs Import Clearance',
          'MPPCB Pollution NOC & Factory Act Operating Licenses',
          'MPIDC Industrial Plot Aggregation (Pithampur / Sanwer Road)'
        ]
      },
      {
        id: 'IND-04',
        name: 'E-Commerce & Retail',
        shortName: 'E-Commerce',
        icon: <ShoppingBag size={28} />,
        variant: 'accent',
        description: 'High-speed headless e-commerce platforms, multi-branch point-of-sale (POS) billing, automated inventory management, and FSSAI commercial food licensing.',
        solutions: [
          'Omnichannel POS, Inventory & GST Billing Software',
          'Custom Headless Marketplaces & Payment Settlement Flows',
          'Central & State FSSAI Food Licenses & Trade Permits',
          'Warehouse Logistics Architecture & Delivery Integration'
        ]
      }
    ],

    // Row 2: 3 Hexagons (Interlocked)
    [
      {
        id: 'IND-05',
        name: 'Healthcare & Pharma',
        shortName: 'Healthcare',
        icon: <Stethoscope size={28} />,
        variant: 'white',
        description: 'Hospital management ERP systems, Drug & Cosmetic wholesale/retail licensing, medical diagnostic clinic valuation, and biomedical waste compliance.',
        solutions: [
          'Hospital Information Management Systems (HIMS) & Patient Portals',
          'State Drug & Pharma Retail / Wholesale License Procurement',
          'Medical Equipment & Hospital Infrastructure Appraisal',
          'Bio-Medical Pollution Clearances & Fire Safety NOC'
        ]
      },
      {
        id: 'IND-06',
        name: 'Logistics & Supply Chain',
        shortName: 'Logistics',
        icon: <Truck size={28} />,
        variant: 'accent',
        description: 'Fleet tracking telematics, multi-warehouse logistics software, turnkey warehousing land aggregation, and commercial transport licensing.',
        solutions: [
          'Real-Time GPS Fleet Tracking & Consignment Dispatch ERP',
          'Multi-Acre Logistics Park Land Procurement & Demarcation',
          'Commercial Vehicle Fleet Technical Valuation & Appraisal',
          'Private Tender Bidding for Government & Corporate Freight'
        ]
      },
      {
        id: 'IND-07',
        name: 'Government & Civic Bodies',
        shortName: 'Govt & Civic',
        icon: <ShieldCheck size={28} />,
        variant: 'dark',
        description: 'Private tender and bid processing on GeM, municipal liaisoning, town planning regularizations, and public works departmental compliance.',
        solutions: [
          'GeM Portal Tender Discovery & Technical Bid Formulation',
          'Class 3 Digital Signature Certificate (DSC) & Token Setup',
          'Indore Municipal Corporation (IMC) Liaison & Colony Cell Clearance',
          'Techno-Economic Viability (TEV) Reports for Public Infra'
        ]
      }
    ],

    // Row 3: 4 Hexagons
    [
      {
        id: 'IND-08',
        name: 'EdTech & Institutions',
        shortName: 'EdTech',
        icon: <GraduationCap size={28} />,
        variant: 'dark',
        description: 'School, college and university campus management ERPs, educational society/trust 12A/80G registrations, and campus asset valuations.',
        solutions: [
          'Integrated Student, Fee & Exam Examination Management ERP',
          'Educational Trust & Society Registration & 80G Approvals',
          'School & University Campus Building & Asset Valuation',
          'Online Learning Portals & High-Concurrency Video Streaming'
        ]
      },
      {
        id: 'IND-09',
        name: 'Direct Selling & MLM Networks',
        shortName: 'Direct Sales',
        icon: <Users size={28} />,
        variant: 'accent',
        description: 'Market-leading binary, matrix, generation, and board plan MLM software, automated TDS deductions, member e-wallets, and anti-fraud downline tracking.',
        solutions: [
          'Turnkey MLM Multi-Plan Software with Live Genealogy Trees',
          'Automated Banking Payouts with TDS & Admin Deductions',
          'Franchise, Product Stockist & E-Pin Distribution Modules',
          'Direct Selling Statutory Guidelines Legal Compliance'
        ]
      },
      {
        id: 'IND-10',
        name: 'Agriculture & Agro-Tech',
        shortName: 'Agro-Tech',
        icon: <Wheat size={28} />,
        variant: 'white',
        description: 'Agricultural to industrial land diversion orders, mandee trading software, cold storage facility valuations, and mandi tax compliance.',
        solutions: [
          'Agricultural Land Diversion (SDM Orders) & Nazul Clearance',
          'Grain Mandi Accounting & Trader Billing Software',
          'Cold Storage & Agro-Processing Plant Technical Valuation',
          'Organic Certification & FSSAI Agro-Processing Compliance'
        ]
      },
      {
        id: 'IND-11',
        name: 'Enterprise SaaS & Cloud',
        shortName: 'Cloud SaaS',
        icon: <Cpu size={28} />,
        variant: 'accent',
        description: 'Multi-tenant cloud SaaS platforms, automated microservices, Stripe subscription billing, and cloud infrastructure DevOps pipelines.',
        solutions: [
          'Multi-Tenant SaaS Architectures & Automated Tenant Provisioning',
          'Zero-Downtime AWS CI/CD DevOps & Docker Containerization',
          'High-Throughput Microservices & Sub-Second API Gateways',
          'SOC 2 Type II Architecture & Data Encryption Auditing'
        ]
      }
    ]
  ];

  return (
    <section className="honeycomb-section" id="industries">
      <div className="honeycomb-bg-overlay"></div>
      <div className="honeycomb-map-pattern"></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="honeycomb-head">
          <span className="honeycomb-tag">INDUSTRIES WE SERVE &bull; 04 O'CLOCK MATRIX</span>
          <h2 className="honeycomb-title">
            Tailored Solutions Across <span className="gradient-gold-text">Industry Sectors</span>
          </h2>
          <p className="honeycomb-subtitle">
            Engineered enterprise digital platforms, statutory engineering valuations, and corporate clearances specialized for high-growth economic domains.
          </p>
        </div>

        {/* Honeycomb Hexagon Matrix */}
        <div className="honeycomb-matrix">
          {honeycombRows.map((row, rowIdx) => (
            <div key={`row-${rowIdx}`} className="honeycomb-row">
              {row.map((item) => {
                const variantClass = item.variant ? `variant-${item.variant}` : 'variant-dark';
                return (
                  <div
                    key={item.id}
                    className={`hex-outer ${variantClass}`}
                    onClick={() => setSelectedIndustry(item)}
                    title={`Click to explore ${item.name} capabilities`}
                  >
                    <div className="hex-inner">
                      <div className="hex-icon">{item.icon}</div>
                      <div className="hex-label">{item.shortName}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="honeycomb-caption">
          <span>Click any industry domain hexagon to inspect specific deliverables &amp; capabilities</span>
        </div>
      </div>

      {/* Honeycomb Detail Modal */}
      {selectedIndustry && (
        <div className="honeycomb-modal-backdrop" onClick={() => setSelectedIndustry(null)}>
          <div className="honeycomb-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="honeycomb-modal-close" 
              onClick={() => setSelectedIndustry(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="honeycomb-modal-header">
              <div className="honeycomb-modal-icon-box">
                {selectedIndustry.icon}
              </div>
              <div>
                <span className="honeycomb-modal-tag">{selectedIndustry.id} &bull; INDUSTRY SECTOR</span>
                <h3 className="honeycomb-modal-title">{selectedIndustry.name}</h3>
              </div>
            </div>

            <p className="honeycomb-modal-desc">{selectedIndustry.description}</p>

            <div className="honeycomb-modal-solutions">
              <h4 className="honeycomb-solutions-heading">Key Capabilities &amp; Deliverables:</h4>
              <ul className="honeycomb-solutions-list">
                {selectedIndustry.solutions.map((item, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} className="honeycomb-check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="honeycomb-modal-actions">
              <button 
                type="button" 
                className="btn-primary w-full"
                onClick={() => {
                  const indName = selectedIndustry.name;
                  setSelectedIndustry(null);
                  if (onOpenInquiry) onOpenInquiry(`Industry Consultation: ${indName}`);
                }}
              >
                <span>Discuss {selectedIndustry.shortName} Project</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
