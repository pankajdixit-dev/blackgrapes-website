import React from 'react';
import { 
  ShoppingCart, 
  Store, 
  Layers, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  Server, 
  Database,
  BarChart3,
  Truck
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function EcommercePage({ onOpenModal }) {
  const features = [
    {
      icon: <Store className="w-8 h-8 text-orange-500" />,
      title: "Multi-Vendor Marketplaces",
      desc: "Complete Amazon-like multi-vendor platforms with vendor dashboards, commission splits, payout management, and automated catalog sync."
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "Headless E-Commerce",
      desc: "Blazing fast frontend experiences using Next.js & React paired with robust backends like Shopify Plus, Medusa, or custom Node.js engines."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-orange-500" />,
      title: "Global & Domestic Payment Gateways",
      desc: "Seamless integrations with Razorpay, Cashfree, Stripe, PayU, and PhonePe with 1-click checkout, EMI, UPI, and international currency support."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-orange-500" />,
      title: "Mobile Commerce Apps (mCommerce)",
      desc: "Native iOS & Android mobile shopping apps synced in real-time with your store, push notifications for abandoned carts, and fast checkout."
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-500" />,
      title: "Logistics & ERP Integration",
      desc: "Automated integration with Shiprocket, Delhivery, BlueDart, alongside custom warehouse inventory and GST-compliant invoicing."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
      title: "Conversion Rate Optimization (CRO)",
      desc: "High-speed page load (<1.2s), A/B tested checkout flows, intelligent product recommendations, and conversion tracking."
    }
  ];

  const platforms = [
    { name: "Shopify & Shopify Plus", desc: "Custom theme development & private App engineering" },
    { name: "WooCommerce / WordPress", desc: "Custom plugins, high-volume performance tuning" },
    { name: "Custom MERN / Next.js", desc: "100% bespoke architecture for enterprise scaling" },
    { name: "Magento / Adobe Commerce", desc: "B2B wholesale, multi-store, and tiered pricing" }
  ];

  return (
    <div className="ecommerce-page page-container" style={{ padding: '6rem 1.5rem 4rem', maxWidth: '1280px', margin: '0 auto', color: '#f1f5f9' }}>
      {/* Hero Header */}
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="badge-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(248, 98, 0, 0.15)', border: '1px solid rgba(248, 98, 0, 0.4)', padding: '0.4rem 1.1rem', borderRadius: '999px', color: '#ff8c3b', fontSize: '0.88rem', fontWeight: 600, marginBottom: '1.25rem' }}>
          <Sparkles size={16} />
          <span>High-Conversion Digital Stores</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>
          E-Commerce Development & <span style={{ background: 'linear-gradient(135deg, #f86200, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Multi-Vendor Solutions</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '780px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          From direct-to-consumer (D2C) brands to enterprise B2B multi-vendor marketplaces, Black Grapes Softech engineers high-speed, secure, and revenue-maximizing online shopping platforms.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => onOpenModal && onOpenModal('E-Commerce Consultation')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
          >
            <span>Launch Your Store</span>
            <ArrowRight size={18} />
          </button>
          <a
            href="tel:+917470997884"
            className="btn btn-outline btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
          >
            <span>Talk to E-Commerce Architect</span>
          </a>
        </div>
      </div>

      {/* Feature Grid */}
      <div style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2.5rem', fontFamily: 'var(--font-heading)' }}>
          Enterprise Capabilities Built for Scale
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
          {features.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(22, 17, 36, 0.72)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '2rem',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ marginBottom: '1.25rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: '#ffffff' }}>{item.title}</h3>
              <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Platforms */}
      <div style={{ background: 'rgba(13, 10, 23, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '3rem 2rem', marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 700, textAlign: 'center', marginBottom: '2.5rem', fontFamily: 'var(--font-heading)' }}>
          Technology Platforms We Master
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {platforms.map((plat, idx) => (
            <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#ff7a1a', marginBottom: '0.5rem' }}>{plat.name}</div>
              <div style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>{plat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(248, 98, 0, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)', border: '1px solid rgba(248, 98, 0, 0.4)', borderRadius: '20px', padding: '3.5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
          Ready to Skyrocket Your E-Commerce Revenue?
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#e2e8f0', maxWidth: '650px', margin: '0 auto 2rem' }}>
          Schedule a technical discovery session with our senior e-commerce developers and get a free project roadmap & cost estimate.
        </p>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => onOpenModal && onOpenModal('Request E-Commerce Estimate')}
        >
          <span>Get Free Estimate & Blueprint</span>
        </button>
      </div>
    </div>
  );
}
