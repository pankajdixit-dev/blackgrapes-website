import React from 'react';
import { 
  Package, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Zap, 
  Smartphone,
  ExternalLink
} from 'lucide-react';

export default function ProductsPage({ onOpenModal }) {
  const products = [
    {
      id: "bgst-erp",
      title: "BGST Enterprise ERP & CRM",
      tagline: "End-to-End Business Automation Suite",
      desc: "An all-in-one scalable enterprise suite covering multi-warehouse inventory, GST-ready invoicing, automated lead tracking, employee payroll, and real-time business intelligence.",
      features: ["Multi-branch Inventory & Billing", "GST E-Way & Invoicing APIs", "Role-Based Access Control", "Executive KPI Analytics"],
      status: "Production Ready / Enterprise"
    },
    {
      id: "mlm-engine",
      title: "Smart MLM & Direct Sales Platform",
      tagline: "High-Throughput Commission Engine",
      desc: "Proven network marketing software supporting Binary, Matrix, Generation, and Board plans. Automated instant payout calculation, tamper-proof e-wallets, and live downline visualizers.",
      features: ["Binary & Matrix Tree Visualizer", "Instant Payout & TDS Deductions", "E-Pin & Franchise Management", "Encrypted Member E-Wallets"],
      status: "Flagship FinTech Platform"
    },
    {
      id: "tender-bid",
      title: "TenderDesk & Bid Master",
      tagline: "Government & Private Procurement Suite",
      desc: "Automated tender opportunity discovery, bid document auditing, technical proposal generation, digital signature management, and compliance alignment for GeM and state portals.",
      features: ["GeM Portal Auto-Sync", "Eligibility Feasibility Scoring", "Digital Signature (DSC) Integration", "Compliance Matrix Generator"],
      status: "Specialized Enterprise Suite"
    },
    {
      id: "commerce-hub",
      title: "HyperCommerce D2C Suite",
      tagline: "Headless E-Commerce & Multi-Vendor Engine",
      desc: "Ultra-fast headless commerce platform optimized for Indian payments (UPI, Razorpay, Cashfree) and automated logistics integration (Shiprocket, Delhivery) with sub-second page loads.",
      features: ["Instant 1-Click UPI Checkout", "Multi-vendor Payout Splits", "Real-Time Inventory Sync", "Abandoned Cart WhatsApp Automation"],
      status: "High-Growth Solution"
    }
  ];

  return (
    <div className="products-page page-container" style={{ padding: '6rem 1.5rem 4rem', maxWidth: '1280px', margin: '0 auto', color: '#f1f5f9' }}>
      {/* Header */}
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="badge-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(248, 98, 0, 0.15)', border: '1px solid rgba(248, 98, 0, 0.4)', padding: '0.4rem 1.1rem', borderRadius: '999px', color: '#ff8c3b', fontSize: '0.88rem', fontWeight: 600, marginBottom: '1.25rem' }}>
          <Sparkles size={16} />
          <span>Our Proprietary Software Products</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>
          Battle-Tested Software <span style={{ background: 'linear-gradient(135deg, #f86200, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Platforms & Products</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '800px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Accelerate your digital go-to-market with Black Grapes Softech's pre-architected enterprise products, customizable to your exact operational workflows.
        </p>
      </div>

      {/* Product Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
        {products.map((p, idx) => (
          <div 
            key={idx}
            style={{
              background: 'rgba(22, 17, 36, 0.72)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '2.2rem',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(248, 98, 0, 0.15)', color: '#ff8c3b', fontSize: '0.78rem', fontWeight: 600, padding: '0.25rem 0.7rem', borderRadius: '6px', marginBottom: '1rem' }}>
                {p.status}
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>{p.title}</h3>
              <div style={{ fontSize: '0.9rem', color: '#c084fc', marginBottom: '1rem', fontWeight: 500 }}>{p.tagline}</div>
              <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>{p.desc}</p>
              
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1.25rem', marginBottom: '1.8rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.75rem' }}>Core Highlights:</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {p.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
                      <CheckCircle2 size={15} style={{ color: '#10b981', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onOpenModal && onOpenModal(`Product Demo: ${p.title}`)}
              style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>Schedule Live Demo</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, rgba(248, 98, 0, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)', border: '1px solid rgba(248, 98, 0, 0.4)', borderRadius: '20px', padding: '3.5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
          Need a Custom Tailored Software Product?
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#e2e8f0', maxWidth: '650px', margin: '0 auto 2rem' }}>
          We don't just sell software off the shelf — our architects customize workflows, schemas, and branding to fit your business 100%.
        </p>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => onOpenModal && onOpenModal('Request Custom Product Architecture')}
        >
          <span>Request Custom Architecture</span>
        </button>
      </div>
    </div>
  );
}
