import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Tag, 
  Phone, 
  Mail, 
  Store, 
  Users, 
  Lock, 
  Zap, 
  Clock, 
  Check, 
  X,
  MessageCircle,
  Copy
} from 'lucide-react';
import '../Styles/CyberServices.css';

export default function EcommercePage({ onOpenContact }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'new', 'used'
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState(false);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'buyer', // 'buyer', 'seller', 'both'
    productCategory: 'Electronics & Appliances'
  });

  const handleCopyDomain = () => {
    navigator.clipboard.writeText('https://www.nayapuranabazaar.com');
    setCopiedDomain(true);
    setTimeout(() => setCopiedDomain(false), 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setWaitlistSubmitted(true);
  };

  return (
    <main className="ecommerce-page-main">
      {/* Background ambient lighting */}
      <div className="hero-ambient-glow" style={{ background: 'radial-gradient(circle, rgba(147, 51, 234, 0.18) 0%, rgba(248, 98, 0, 0.12) 50%, transparent 70%)' }} />

      {/* Hero Announcement Header */}
      <section className="ecommerce-hero">
        <div className="content-wrapper text-center">
          {/* Top Announcement Pill */}
          <div className="hero-badge-wrap">
            <span className="hero-top-pill" style={{ borderColor: 'rgba(248, 98, 0, 0.4)', background: 'rgba(248, 98, 0, 0.1)' }}>
              <Sparkles size={14} color="#f86200" />
              <span>BLACK GRAPES SOFTECH • OFFICIAL ECOMMERCE PLATFORM</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="black-hero-title">
            Exciting News! <br />
            <span className="hero-title-accent">Naya Purana Bazaar</span> is Coming Soon!
          </h1>

          {/* Subtitle & Official Byline */}
          <div className="ecommerce-byline">
            <span className="byline-tag">An Online Marketplace By Black Grapes Softech</span>
            <button 
              type="button" 
              className="domain-badge-btn" 
              onClick={handleCopyDomain}
              title="Click to copy official website URL"
            >
              <span>www.nayapuranabazaar.com</span>
              {copiedDomain ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            </button>
          </div>

          {/* Authentic Announcement Text from Original Site */}
          <div className="ecommerce-announcement-box">
            <p className="announcement-lead">
              We are thrilled to announce the upcoming launch of <strong>Naya Purana Bazaar</strong>, your future favourite destination for online shopping. Our platform is under development, and we are working hard to bring you a seamless, user-friendly shopping experience with a wide range of <strong>“New And Used Products”</strong>.
            </p>
            <p className="announcement-sub">
              Stay tuned for more updates and be among the first to explore our unique offerings and exclusive deals. Thank you for your patience and support as we prepare to launch. Get ready to redefine your shopping experience with <strong>nayapuranabazaar.com</strong>!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="hero-actions-row">
            <button 
              type="button" 
              className="btn-primary" 
              onClick={() => setWaitlistModalOpen(true)}
              style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}
            >
              <span>Get VIP Launch Offer / Early Access</span>
              <ArrowRight size={16} />
            </button>

            <a 
              href="https://www.nayapuranabazaar.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
              style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}
            >
              <span>Visit nayapuranabazaar.com</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Launch Readiness Metrics */}
      <section className="content-wrapper" style={{ marginBottom: '3.5rem' }}>
        <div className="readiness-strip">
          <div className="readiness-card">
            <div className="readiness-val">100%</div>
            <div className="readiness-title">MERN Cloud Infrastructure</div>
            <div className="readiness-sub">High-concurrency microservices architecture</div>
          </div>
          <div className="readiness-card">
            <div className="readiness-val">100%</div>
            <div className="readiness-title">Verified Seller Onboarding</div>
            <div className="readiness-sub">KYC & multi-point merchant validation</div>
          </div>
          <div className="readiness-card">
            <div className="readiness-val">100%</div>
            <div className="readiness-title">Escrow & Secure Payments</div>
            <div className="readiness-sub">Instant refund & buyer fraud protection</div>
          </div>
          <div className="readiness-card">
            <div className="readiness-val">Q1 2026</div>
            <div className="readiness-title">Official Launch Target</div>
            <div className="readiness-sub">Web portal, Android & iOS apps</div>
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="content-wrapper">
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
            <span className="hero-top-pill">
              <Tag size={13} color="#f86200" />
              <span>MARKETPLACE OFFERINGS</span>
            </span>
          </div>
          <h2 className="black-hero-title" style={{ fontSize: '2.25rem' }}>
            What You Can Buy & Sell on <span className="hero-title-accent">Naya Purana Bazaar</span>
          </h2>
          <p className="black-hero-subtitle" style={{ maxWidth: '650px' }}>
            A unified hybrid marketplace designed to give consumers the freedom of choice between brand-new factory-sealed items and certified pre-owned deals.
          </p>

          <div className="black-filter-scroll" style={{ marginTop: '1.25rem' }}>
            <button
              type="button"
              className={`black-filter-pill ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <span>All Categories</span>
            </button>
            <button
              type="button"
              className={`black-filter-pill ${activeTab === 'new' ? 'active' : ''}`}
              onClick={() => setActiveTab('new')}
            >
              <Sparkles size={14} />
              <span>New Products (Brand New)</span>
            </button>
            <button
              type="button"
              className={`black-filter-pill ${activeTab === 'used' ? 'active' : ''}`}
              onClick={() => setActiveTab('used')}
            >
              <RefreshCw size={14} />
              <span>Used Products (Certified Pre-Owned)</span>
            </button>
          </div>
        </div>

        {/* Dual Pillar Showcase Cards */}
        <div className="dual-products-grid">
          {/* Card 1: New Products */}
          {(activeTab === 'all' || activeTab === 'new') && (
            <div className="product-pillar-card">
              <div className="pillar-image-wrap">
                <img 
                  src="/ecommerce/new-products.jpg" 
                  alt="New Products Household Appliances on Naya Purana Bazaar"
                  className="pillar-image"
                />
                <div className="pillar-badge-overlay new-badge">
                  <Sparkles size={13} color="#ffffff" />
                  <span>NEW PRODUCTS</span>
                </div>
              </div>

              <div className="pillar-card-body">
                <div className="pillar-kicker">100% Factory Sealed • Full Warranty</div>
                <h3 className="pillar-title">New Products Section</h3>
                <p className="pillar-desc">
                  Browse brand-new consumer electronics, smart household appliances, kitchen technology, home comfort devices, and gadgets sourced directly from authorized manufacturers and verified brand distributors.
                </p>

                <div className="pillar-features-list">
                  <div className="pillar-feat-item">
                    <CheckCircle2 size={16} color="#f86200" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>100% Genuine Products:</strong> Sealed boxes with official brand warranty cards and GST invoices.</span>
                  </div>
                  <div className="pillar-feat-item">
                    <CheckCircle2 size={16} color="#f86200" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Direct Manufacturer Deals:</strong> Exclusive pre-launch discount codes and seasonal promotional offers.</span>
                  </div>
                  <div className="pillar-feat-item">
                    <CheckCircle2 size={16} color="#f86200" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Fast Doorstep Express Shipping:</strong> Secure packaging with live tracking to your doorstep.</span>
                  </div>
                  <div className="pillar-feat-item">
                    <CheckCircle2 size={16} color="#f86200" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Zero-Cost EMI & Multi-Payment:</strong> UPI, Credit Cards, Net Banking, and Cash on Delivery.</span>
                  </div>
                </div>

                <div className="pillar-tags-row">
                  <span className="tech-tag-pill">Smart Refrigerators</span>
                  <span className="tech-tag-pill">Washing Machines</span>
                  <span className="tech-tag-pill">Air Conditioners</span>
                  <span className="tech-tag-pill">Smart LED TVs</span>
                  <span className="tech-tag-pill">Microwaves & Kitchenware</span>
                </div>

                <div className="pillar-action-row">
                  <button 
                    type="button" 
                    className="btn-primary" 
                    onClick={() => setWaitlistModalOpen(true)}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <span>Get New Products Launch Alert</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Used Products */}
          {(activeTab === 'all' || activeTab === 'used') && (
            <div className="product-pillar-card">
              <div className="pillar-image-wrap">
                <img 
                  src="/ecommerce/used-products.jpg" 
                  alt="Used Products Certified Pre-Owned on Naya Purana Bazaar"
                  className="pillar-image"
                />
                <div className="pillar-badge-overlay used-badge">
                  <RefreshCw size={13} color="#ffffff" />
                  <span>USED PRODUCTS</span>
                </div>
              </div>

              <div className="pillar-card-body">
                <div className="pillar-kicker" style={{ color: '#10b981' }}>Verified Pre-Owned • Save Up to 60%</div>
                <h3 className="pillar-title">Used Products Section</h3>
                <p className="pillar-desc">
                  Buy and sell gently used consumer electronics, refurbished laptops, pre-owned smartphones, and home goods with total peace of mind. Every product goes through rigorous multi-point verification before listing.
                </p>

                <div className="pillar-features-list">
                  <div className="pillar-feat-item">
                    <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Multi-Point Quality Inspection:</strong> Screen, battery, hardware, and cosmetics graded transparently.</span>
                  </div>
                  <div className="pillar-feat-item">
                    <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Escrow Buyer Protection:</strong> Payment is safely held until you inspect and approve the delivered product.</span>
                  </div>
                  <div className="pillar-feat-item">
                    <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Sell in 3 Easy Steps:</strong> Snap photos, get instant valuation estimate, and schedule doorstep pickup.</span>
                  </div>
                  <div className="pillar-feat-item">
                    <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Affordable Re-Commerce:</strong> Premium flagship smartphones, MacBooks, and gadgets at budget pricing.</span>
                  </div>
                </div>

                <div className="pillar-tags-row">
                  <span className="tech-tag-pill">Refurbished iPhones & Android</span>
                  <span className="tech-tag-pill">Used Laptops & MacBooks</span>
                  <span className="tech-tag-pill">Audio Headphones</span>
                  <span className="tech-tag-pill">Gaming Consoles</span>
                  <span className="tech-tag-pill">Cameras & Accessories</span>
                </div>

                <div className="pillar-action-row">
                  <button 
                    type="button" 
                    className="btn-primary" 
                    onClick={() => setWaitlistModalOpen(true)}
                    style={{ flex: 1, justifyContent: 'center', background: '#10b981' }}
                  >
                    <span>Register to Buy / Sell Used</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Platform Guarantees Section */}
      <section className="content-wrapper" style={{ padding: '4rem 1.5rem 2rem' }}>
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
          <h2 className="black-hero-title" style={{ fontSize: '2rem' }}>
            Engineered for <span className="hero-title-accent">Trust & Simplicity</span>
          </h2>
          <p className="black-hero-subtitle" style={{ maxWidth: '600px' }}>
            Built by Black Grapes Softech with bank-grade security protocols, smart logistics routing, and automated dispute resolution.
          </p>
        </div>

        <div className="marketplace-benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon-wrap">
              <ShieldCheck size={24} color="#f86200" />
            </div>
            <h4 className="benefit-title">100% Escrow Protection</h4>
            <p className="benefit-desc">
              Your money is never released to the seller until you receive the package, inspect it, and confirm it matches description.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-wrap">
              <Truck size={24} color="#f86200" />
            </div>
            <h4 className="benefit-title">Doorstep Pickup & Delivery</h4>
            <p className="benefit-desc">
              Integrated with top pan-India logistics partners for seamless automated pickup from sellers and fast delivery to buyers.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-wrap">
              <Users size={24} color="#f86200" />
            </div>
            <h4 className="benefit-title">Verified Community</h4>
            <p className="benefit-desc">
              Identity verification and phone authentication prevent scams, fake reviews, and counterfeit listings on both sides.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-wrap">
              <Zap size={24} color="#f86200" />
            </div>
            <h4 className="benefit-title">High-Speed Cloud Portal</h4>
            <p className="benefit-desc">
              Sub-second search speeds, instant WhatsApp order updates, and native Android & iOS mobile applications.
            </p>
          </div>
        </div>
      </section>

      {/* Merchant / Vendor Onboarding CTA Banner */}
      <section className="content-wrapper" style={{ padding: '2rem 1.5rem 4rem' }}>
        <div className="merchant-banner-card">
          <div className="merchant-info-col">
            <span className="badge-pill" style={{ background: 'rgba(248, 98, 0, 0.2)', color: '#ff7a1a', border: '1px solid rgba(248, 98, 0, 0.4)', marginBottom: '0.75rem' }}>
              <Store size={13} /> Seller & Merchant Program
            </span>
            <h3 className="merchant-title">Are you a Retailer, Wholesaler or Second-Hand Seller?</h3>
            <p className="merchant-desc">
              Pre-register your store on Naya Purana Bazaar today! Enjoy <strong>0% Marketplace Commission</strong> for the first 3 months of launch, free featured store placement, and dedicated merchant onboarding support from Black Grapes Softech.
            </p>
            <div className="merchant-perks-row">
              <span>✓ 0% Platform Commission (90 Days)</span>
              <span>✓ Priority Product Placement</span>
              <span>✓ Instant Daily Bank Payouts</span>
            </div>
          </div>

          <div className="merchant-cta-col">
            <button 
              type="button" 
              className="btn-primary" 
              onClick={() => {
                setFormData(prev => ({ ...prev, interest: 'seller' }));
                setWaitlistModalOpen(true);
              }}
              style={{ width: '100%', justifyContent: 'center', padding: '0.9rem 1.5rem' }}
            >
              <span>Pre-Register as Seller</span>
              <ArrowRight size={16} />
            </button>
            <a 
              href="tel:+917470997884" 
              className="merchant-call-link"
            >
              <Phone size={14} color="#f86200" />
              <span>Merchant Hotline: +91 7470997884</span>
            </a>
          </div>
        </div>
      </section>

      {/* Direct Contact Bar */}
      <section className="content-wrapper" style={{ paddingBottom: '5rem' }}>
        <div className="services-quick-contact">
          <div className="quick-contact-info">
            <div className="quick-contact-tag">Black Grapes Softech • Ecommerce Division</div>
            <div className="quick-contact-title">Have questions about Naya Purana Bazaar?</div>
            <div className="quick-contact-numbers">
              <a href="tel:+917470997884" className="quick-contact-link">
                <Phone size={15} /> +91 7470997884
              </a>
              <span className="contact-sep">•</span>
              <a href="tel:+916262414463" className="quick-contact-link">
                <Phone size={15} /> +91 6262414463
              </a>
              <span className="contact-sep">•</span>
              <a href="mailto:info@blackgrapessoftech.com" className="quick-contact-link">
                <Mail size={15} /> info@blackgrapessoftech.com
              </a>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={() => setWaitlistModalOpen(true)}
          >
            <span>Request Demo / Launch Offer</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Pre-Launch Waitlist / Get The Offer Modal */}
      {waitlistModalOpen && (
        <div className="modal-overlay" onClick={() => setWaitlistModalOpen(false)}>
          <div className="modal-dialog-black" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={() => setWaitlistModalOpen(false)}
            >
              <X size={20} />
            </button>

            {!waitlistSubmitted ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#f86200', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
                    <Sparkles size={14} /> VIP Launch Access
                  </div>
                  <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                    Get Exclusive Launch Offers
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.5' }}>
                    Be the first to receive VIP discounts, early access alerts, and seller perks when <strong>nayapuranabazaar.com</strong> goes live!
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.35rem' }}>
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Enter your name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="black-search-input"
                      style={{ background: 'rgba(22, 17, 36, 0.72)', border: '1px solid rgba(147, 51, 234, 0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', width: '100%', color: '#ffffff' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.35rem' }}>
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 98765 43210" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="black-search-input"
                        style={{ background: 'rgba(22, 17, 36, 0.72)', border: '1px solid rgba(147, 51, 234, 0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', width: '100%', color: '#ffffff' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.35rem' }}>
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        required 
                        placeholder="you@example.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="black-search-input"
                        style={{ background: 'rgba(22, 17, 36, 0.72)', border: '1px solid rgba(147, 51, 234, 0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', width: '100%', color: '#ffffff' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.35rem' }}>
                      I am interested as:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                      {[
                        { id: 'buyer', label: 'Shopper / Buyer' },
                        { id: 'seller', label: 'Vendor / Seller' },
                        { id: 'both', label: 'Both' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, interest: item.id })}
                          style={{
                            background: formData.interest === item.id ? 'rgba(248, 98, 0, 0.2)' : 'rgba(22, 17, 36, 0.6)',
                            border: formData.interest === item.id ? '1.5px solid #f86200' : '1px solid rgba(147, 51, 234, 0.25)',
                            color: formData.interest === item.id ? '#ffffff' : '#cbd5e1',
                            borderRadius: '0.65rem',
                            padding: '0.6rem 0.5rem',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d4d4d8', marginBottom: '0.35rem' }}>
                      Primary Product Category of Interest
                    </label>
                    <select
                      value={formData.productCategory}
                      onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                      style={{
                        background: '#121218',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#ffffff',
                        borderRadius: '0.75rem',
                        padding: '0.75rem 1rem',
                        width: '100%',
                        fontSize: '0.88rem'
                      }}
                    >
                      <option value="Smart Appliances">New Household Appliances</option>
                      <option value="Mobiles & Smartphones">Used & Refurbished Smartphones</option>
                      <option value="Laptops & Computers">Laptops, MacBooks & Computing</option>
                      <option value="Electronics & Audio">LED TVs, Audio & Gadgets</option>
                      <option value="Merchant Bulk Stock">Merchant / Wholesaler Inquiries</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary" 
                    style={{ justifyContent: 'center', padding: '0.85rem', marginTop: '0.5rem', fontSize: '0.95rem' }}
                  >
                    <span>Claim Launch Pass & Discounts</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '1.5px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <Check size={28} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                  You're On The VIP List!
                </h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.92rem', lineHeight: '1.6', maxWidth: '380px', margin: '0 auto 1.5rem' }}>
                  Thank you, <strong>{formData.name || 'Friend'}</strong>! We have recorded your interest in <strong>{formData.productCategory}</strong>. You will receive an exclusive early-bird voucher code on <strong>{formData.phone || formData.email}</strong> as soon as Naya Purana Bazaar launches!
                </p>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setWaitlistSubmitted(false);
                    setWaitlistModalOpen(false);
                  }}
                  style={{ margin: '0 auto' }}
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating WhatsApp Us Button (Original Website Feature) */}
      <a 
        href="https://wa.me/917470997884?text=Hello%20Black%20Grapes%20Softech,%20I%20want%20to%20inquire%20about%20Naya%20Purana%20Bazaar%20Ecommerce%20Platform"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        title="Chat on WhatsApp (+91 7470997884)"
      >
        <MessageCircle size={18} />
        <span>WhatsApp Us</span>
      </a>
    </main>
  );
}
