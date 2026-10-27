import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, PARTNERSHIP_DATA } from '../data/siteData';

export default function PartnershipPage({ onOpenModal }) {
  const [selectedModel, setSelectedModel] = useState('odc');
  const [teamSize, setTeamSize] = useState('Dedicated Squad (3-5 Developers)');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    city: '',
    company: '',
    model: 'Offshore Development Centre (ODC)',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const modelOptions = [
    {
      id: 'odc',
      name: 'Offshore Development Centre (ODC)',
      short: 'Dedicated ODC',
      icon: '🏢',
      badge: 'Most Popular',
      headline: 'Dedicated Extension of Your In-House Tech Team',
      desc: 'Set up an agile, high-velocity engineering squad in India with zero recruitment delay, zero hardware CAPEX, and strict SLA delivery commitments.',
      teamVisual: [
        { role: 'Tech Architect', count: '1 Senior', icon: '🏛️' },
        { role: 'Full Stack Developers', count: '2-5 Mid/Sr', icon: '💻' },
        { role: 'UI/UX Designer', count: '1 Lead', icon: '🎨' },
        { role: 'QA & Automation', count: '1 Specialist', icon: '🧪' },
        { role: 'Scrum Master', count: 'Dedicated', icon: '⚡' }
      ],
      deliverables: [
        'Direct Slack, Git, Jira & CI/CD integration',
        'Overlapping working hours with US/UK/Australia/Gulf',
        '100% intellectual property (IP) & code ownership',
        'Bi-weekly sprint demos & velocity burndown reports'
      ]
    },
    {
      id: 'staff-aug',
      name: 'Resource & Talent Sharing',
      short: 'Staff Augmentation',
      icon: '👥',
      badge: 'Instant Scale',
      headline: 'On-Demand Senior Technical Experts',
      desc: 'Plug vetted senior talent directly into your active sprints within 48 to 72 hours. Scale up for crucial launch deadlines and scale down when ready.',
      teamVisual: [
        { role: 'React / Next.js Seniors', count: '5+ Yrs Exp', icon: '⚛️' },
        { role: 'Flutter / React Native', count: 'Mobile Leads', icon: '📱' },
        { role: 'Python / Node Backends', count: 'Cloud Architects', icon: '🐍' },
        { role: 'DevOps & AWS Cloud', count: 'Certified', icon: '☁️' }
      ],
      deliverables: [
        'Hourly or monthly transparent billing',
        '2-week risk-free pilot trial period',
        'Seamless pairing with your in-house engineering leads',
        'Zero notice-period lock-in overhead'
      ]
    },
    {
      id: 'white-label',
      name: 'White-Label Agency Delivery',
      short: 'White-Label Agency',
      icon: '🛡️',
      badge: '100% Invisible',
      headline: 'The Invisible Tech Muscle Behind Leading Digital Agencies',
      desc: 'You handle the client relationship and billing; our engineering labs handle the end-to-end technical execution under strict bilateral Non-Disclosure Agreements.',
      teamVisual: [
        { role: 'Wholesale Agency Rates', count: 'Up to 50% Margin', icon: '💎' },
        { role: 'Client-Facing Demos', count: 'Under Your Brand', icon: '🏷️' },
        { role: 'Confidentiality', count: 'Strict Legal NDA', icon: '🔒' },
        { role: 'Dedicated PM', count: 'Single Point of Contact', icon: '🎯' }
      ],
      deliverables: [
        'Custom domain emails & branded repo commits',
        'Complete white-label sprint presentations',
        'Guaranteed bug-free post-launch warranty',
        'Volume-based agency discounts and rebates'
      ]
    },
    {
      id: 'tie-up',
      name: 'Product Companies Tie-Up',
      short: 'Product Tie-Up',
      icon: '🤝',
      badge: 'Joint Growth',
      headline: 'Strategic Alliances, Distribution & Co-Innovation',
      desc: 'Collaborate to distribute SaaS, CRM, and enterprise solutions across India and global markets. Leverage shared technology ecosystems and joint go-to-market pipelines.',
      teamVisual: [
        { role: 'Ecosystem Alliances', count: 'Zoho, Salesforce, SAP', icon: '🌐' },
        { role: 'Revenue Sharing', count: 'Predictable MRR', icon: '📈' },
        { role: 'API Connectors', count: 'Custom Middleware', icon: '🔌' },
        { role: 'Channel Marketing', count: 'Co-Branded Funnels', icon: '🚀' }
      ],
      deliverables: [
        'Co-marketing and joint lead-generation campaigns',
        'Localized customer support and regional onboarding',
        'Technical middleware and connector development',
        'Strategic product expansion into the Indian market'
      ]
    }
  ];

  const currentModelData = modelOptions.find((m) => m.id === selectedModel) || modelOptions[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      contact: '',
      city: '',
      company: '',
      model: currentModelData.name,
      message: ''
    });
  };

  return (
    <div className="inner-page partnership-page">
      {/* 1. Futuristic Hero Banner */}
      <section className="page-hero-banner" role="banner">
        <div className="hero-grid-pattern" aria-hidden="true"></div>
        <div className="container">
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">
              <span className="breadcrumb-icon">⌂</span> Home
            </Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Partnership &amp; Alliances</span>
          </nav>

          <div className="page-hero-content">
            <div className="page-hero-badge">
              <span className="badge-pulse-dot"></span>
              <span>{PARTNERSHIP_DATA.badge}</span>
              <span className="badge-highlight-pill">India ODC Hub</span>
            </div>

            <h1 className="page-hero-title">
              Scale Your Software Delivery With India's Premier IT Development Centre
            </h1>

            <p className="page-hero-subtitle">
              Join 100+ global agencies, startups, and product companies who accelerate engineering velocity,
              slash development overhead by 60%, and safeguard 100% intellectual property with Black Grapes Softech.
            </p>

            {/* Glowing Stat Counter Bar */}
            <div className="hero-stat-pills">
              {PARTNERSHIP_DATA.whyPartnerStats.map((stat, i) => (
                <div key={i} className="hero-stat-pill">
                  <div className="stat-pill-inner">
                    <span className="stat-pill-val">{stat.value}</span>
                    <div className="stat-pill-labels">
                      <strong className="stat-pill-lbl">{stat.label}</strong>
                      <span className="stat-pill-desc">{stat.desc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Executive Leadership Direct Connect Strip */}
      <section className="leadership-quick-strip">
        <div className="container">
          <div className="leadership-strip-card">
            <div className="leadership-left">
              <div className="executive-avatars">
                <div className="exec-avatar aj" title="Arpit Jain - Director">
                  <span>AJ</span>
                  <span className="online-beacon"></span>
                </div>
                <div className="exec-avatar dj" title="Deepika Jain - Operations">
                  <span>DJ</span>
                  <span className="online-beacon"></span>
                </div>
              </div>
              <div className="leadership-text">
                <strong className="leadership-title">Director Level Technical Desk Available</strong>
                <p className="leadership-sub">
                  Discuss strategic joint ventures, custom pods, or NDA agreements directly with founder leadership.
                </p>
              </div>
            </div>

            <div className="leadership-actions">
              <a
                href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
                className="btn btn-outline btn-sm leadership-btn"
              >
                <span>📞 Call Director</span>
                <span className="btn-number">{COMPANY_INFO.phones[0]}</span>
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Arpit%20Jain%20%2F%20Deepika%20Jain,%20I%20am%20interested%20in%20exploring%20a%20strategic%20partnership%20with%20Black%20Grapes%20Softech.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm leadership-wa-btn"
              >
                <span>💬 WhatsApp Executive Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Engagement Models Presentation */}
      <section id="models" className="page-section partner-models-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag-glow">COLLABORATION FRAMEWORKS</span>
            <h2 className="section-main-heading">
              Choose the Partnership Model That Fits Your Business
            </h2>
            <p className="section-lead-desc">
              Select an engagement model below to preview dedicated team structures, technical workflows, and deliverables.
            </p>
          </div>

          {/* Interactive Model Tab Selector Bar */}
          <div className="model-tabs-selector">
            {modelOptions.map((model) => (
              <button
                key={model.id}
                type="button"
                className={`model-tab-pill ${selectedModel === model.id ? 'active-pill' : ''}`}
                onClick={() => {
                  setSelectedModel(model.id);
                  setFormData((prev) => ({ ...prev, model: model.name }));
                }}
              >
                <span className="model-tab-icon">{model.icon}</span>
                <span className="model-tab-name">{model.short}</span>
                <span className="model-tab-badge">{model.badge}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Active Model Presentation Display */}
          <div className="active-model-display-card">
            <div className="model-display-left">
              <div className="model-meta-header">
                <span className="model-tag-chip">{currentModelData.badge}</span>
                <span className="model-id-label">Structure: {currentModelData.short}</span>
              </div>

              <h3 className="model-display-headline">{currentModelData.headline}</h3>
              <p className="model-display-desc">{currentModelData.desc}</p>

              <div className="model-deliverables-box">
                <h4 className="deliverables-heading">Key SLA &amp; Operating Guarantees:</h4>
                <ul className="deliverables-list">
                  {currentModelData.deliverables.map((item, idx) => (
                    <li key={idx}>
                      <span className="deliv-check">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="model-action-row">
                <a
                  href="#partner-form"
                  className="btn btn-primary"
                  onClick={() => {
                    const el = document.getElementById('partner-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Apply for this Model</span>
                  <span className="btn-arrow">&rarr;</span>
                </a>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => onOpenModal(`Consultation: ${currentModelData.name}`)}
                >
                  Schedule 1-on-1 Call
                </button>
              </div>
            </div>

            <div className="model-display-right">
              <div className="team-composition-card">
                <div className="team-comp-header">
                  <span className="comp-tag">TYPICAL SQUAD COMPOSITION</span>
                  <h4 className="comp-title">Dedicated Engineering Pod</h4>
                </div>

                <div className="team-visual-list">
                  {currentModelData.teamVisual.map((member, i) => (
                    <div key={i} className="team-member-chip">
                      <span className="member-icon">{member.icon}</span>
                      <div className="member-info">
                        <strong>{member.role}</strong>
                        <span>{member.count}</span>
                      </div>
                      <span className="member-status-dot"></span>
                    </div>
                  ))}
                </div>

                <div className="pod-security-badge">
                  <span className="sec-icon">🔒</span>
                  <div className="sec-text">
                    <strong>100% Confidential IP Protection</strong>
                    <p>Protected under bilateral NDA with direct Git source code commits.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Partner With Us Lead Content & High-Tech Application Intake */}
      <section id="partner-form" className="page-section partner-intro-section">
        <div className="container">
          <div className="partner-intro-grid">
            {/* Left: Authentic Text & Comparative Edge */}
            <div className="partner-intro-info">
              <div className="section-badge-wrap">
                <span className="badge-dot"></span>
                <span className="section-badge-text">GLOBAL EXPANSION</span>
              </div>

              <h2 className="section-heading-gradient">
                Partner With Us &amp; Expand Operations in India
              </h2>

              <p className="intro-lead-paragraph">
                {PARTNERSHIP_DATA.mainParagraph}
              </p>

              {/* Comparative Feature Matrix */}
              <div className="comparison-mini-card">
                <h4 className="comparison-title">Why Global Tech Companies Choose Black Grapes:</h4>
                <div className="comparison-rows">
                  <div className="comp-row">
                    <span className="comp-criterion">Onboarding Time</span>
                    <span className="comp-bgst">⚡ 3-5 Business Days</span>
                    <span className="comp-market">4-8 Weeks (Market Avg)</span>
                  </div>
                  <div className="comp-row">
                    <span className="comp-criterion">Code &amp; IP Ownership</span>
                    <span className="comp-bgst">🛡️ 100% Client Legal IP</span>
                    <span className="comp-market">Often Disputed</span>
                  </div>
                  <div className="comp-row">
                    <span className="comp-criterion">Time-Zone Overlap</span>
                    <span className="comp-bgst">🌐 4-6 Hours Synchronous</span>
                    <span className="comp-market">Asynchronous Delay</span>
                  </div>
                  <div className="comp-row">
                    <span className="comp-criterion">Pricing Advantage</span>
                    <span className="comp-bgst">💰 Up to 60% Savings</span>
                    <span className="comp-market">High Overhead</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: High-Converting Intake Application Card */}
            <div className="partner-form-wrapper">
              <div className="partner-form-card">
                <div className="form-card-header">
                  <span className="card-top-tag">OFFICIAL INTAKE</span>
                  <h3 className="form-card-title">Please tell us a bit about yourself</h3>
                  <p className="form-card-desc">
                    Fill in your details to explore an Offshore Development Center or strategic partnership.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="form-success-card">
                    <div className="success-badge-icon">✓</div>
                    <h4 className="success-heading">Application Received, {formData.name}!</h4>
                    <p className="success-text">
                      Thank you for submitting your partnership inquiry for <strong>{formData.model}</strong>.
                      Our Director of Partnerships will review your specifications and contact you at{' '}
                      <strong>{formData.email}</strong> or <strong>{formData.contact}</strong> within 24 hours.
                    </p>

                    <div className="success-meta-box">
                      <div className="meta-line">
                        <span>Company / Organization:</span>
                        <strong>{formData.company || 'Enterprise Partner'}</strong>
                      </div>
                      <div className="meta-line">
                        <span>Team Requirement:</span>
                        <strong>{teamSize}</strong>
                      </div>
                      <div className="meta-line">
                        <span>Location / City:</span>
                        <strong>{formData.city || 'India / Global'}</strong>
                      </div>
                      <div className="meta-line">
                        <span>Verification Status:</span>
                        <strong className="status-badge">Priority Review Queue</strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline btn-full"
                      onClick={handleReset}
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="partner-actual-form">
                    {/* Visual Model Selector Chips */}
                    <div className="form-group">
                      <label className="form-label">Selected Partnership Model *</label>
                      <div className="form-model-chips">
                        {modelOptions.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            className={`chip-select-btn ${formData.model === opt.name ? 'chip-active' : ''}`}
                            onClick={() => {
                              setSelectedModel(opt.id);
                              setFormData({ ...formData, model: opt.name });
                            }}
                          >
                            <span>{opt.icon}</span>
                            <span>{opt.short}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="partner-name" className="form-label">
                          Your Name *
                        </label>
                        <input
                          id="partner-name"
                          type="text"
                          required
                          className="form-input"
                          placeholder="e.g. Arpit / Deepika Jain"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="partner-company" className="form-label">
                          Company / Agency Name
                        </label>
                        <input
                          id="partner-company"
                          type="text"
                          className="form-input"
                          placeholder="e.g. Acme Tech Solutions"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="partner-email" className="form-label">
                          Business Email *
                        </label>
                        <input
                          id="partner-email"
                          type="email"
                          required
                          className="form-input"
                          placeholder="e.g. partner@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="partner-contact" className="form-label">
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="partner-contact"
                          type="tel"
                          required
                          className="form-input"
                          placeholder="e.g. +91 7470997884"
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="partner-city" className="form-label">
                          Your City &amp; Country *
                        </label>
                        <input
                          id="partner-city"
                          type="text"
                          required
                          className="form-input"
                          placeholder="e.g. Indore, India / London, UK"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="partner-size" className="form-label">
                          Expected Team Capacity
                        </label>
                        <select
                          id="partner-size"
                          className="form-select"
                          value={teamSize}
                          onChange={(e) => setTeamSize(e.target.value)}
                        >
                          <option value="1-2 Senior Developers">1-2 Senior Developers</option>
                          <option value="Dedicated Squad (3-5 Developers)">Dedicated Squad (3-5 Developers)</option>
                          <option value="Enterprise Pod (6-12 Developers)">Enterprise Pod (6-12 Developers)</option>
                          <option value="Full Offshore Centre (15+ Techs)">Full Offshore Centre (15+ Techs)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="partner-message" className="form-label">
                        Project Overview / Tech Requirements
                      </label>
                      <textarea
                        id="partner-message"
                        rows="3"
                        className="form-textarea"
                        placeholder="Briefly describe your tech stack (e.g. React, Flutter, Python, Node), required roles, or partnership objectives..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-full submit-partner-btn"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Securely...</span>
                      ) : (
                        <>
                          <span>Submit Partnership Application</span>
                          <span className="btn-sparkle">✨</span>
                        </>
                      )}
                    </button>

                    <p className="form-security-footnote">
                      🔒 Guaranteed 100% strict confidentiality. Protected by bilateral NDA.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Product Companies Tie-up & Technology Ecosystem */}
      <section id="tie-ups" className="page-section tie-ups-section">
        <div className="container">
          <div className="tie-ups-hero-box">
            <div className="section-badge-wrap">
              <span className="badge-dot"></span>
              <span className="section-badge-text">STRATEGIC ALLIANCES</span>
            </div>

            <h2 className="section-heading-gradient">
              {PARTNERSHIP_DATA.tieUpHeading}
            </h2>

            <p className="tie-up-subheading">
              {PARTNERSHIP_DATA.tieUpSubheading}
            </p>

            <div className="tie-up-text-blocks">
              {PARTNERSHIP_DATA.tieUpParagraphs.map((para, i) => (
                <p key={i} className="tie-up-para">{para}</p>
              ))}
            </div>
          </div>

          {/* Enterprise Ecosystem Showcase */}
          <div className="ecosystem-showcase">
            <div className="ecosystem-header">
              <span className="section-tag-glow">CONNECTED PLATFORMS</span>
              <h3 className="ecosystem-title">Enterprise Ecosystem &amp; Product Tie-Up Partners</h3>
              <p className="ecosystem-desc">
                We engineer scalable connectors, CRM/ERP workflows, cloud architectures, and digital distribution
                alliances with leading global software giants.
              </p>
            </div>

            <div className="ecosystem-grid">
              {PARTNERSHIP_DATA.ecosystemPartners.map((partner, i) => (
                <div key={i} className="ecosystem-card">
                  <div className="ecosystem-card-header">
                    <div className="partner-brand-mark">
                      <span className="partner-emoji">{partner.icon}</span>
                      <strong className="partner-name">{partner.name}</strong>
                    </div>
                    <span className="partner-cat-badge">{partner.category}</span>
                  </div>
                  <p className="partner-card-desc">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Step-by-Step Onboarding Roadmap */}
      <section className="page-section process-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag-glow">STRUCTURED TIMELINE</span>
            <h2 className="section-main-heading">5 Steps to Launch Your Development Pod</h2>
            <p className="section-lead-desc">
              From requirement scoping to Sprint Zero kickoff, our transition framework ensures zero downtime.
            </p>
          </div>

          <div className="process-timeline-grid">
            <div className="process-step-card">
              <div className="step-num-badge">01</div>
              <h4 className="step-title">Initial Scoping Call</h4>
              <p className="step-desc">
                30-minute discovery to understand your tech stack, time-zone preferences, and sprint velocity.
              </p>
              <span className="step-timing-pill">Day 1</span>
            </div>

            <div className="process-step-card">
              <div className="step-num-badge">02</div>
              <h4 className="step-title">Talent Matching</h4>
              <p className="step-desc">
                We present pre-screened senior profiles matching your exact frameworks for interview and review.
              </p>
              <span className="step-timing-pill">Days 2-3</span>
            </div>

            <div className="process-step-card">
              <div className="step-num-badge">03</div>
              <h4 className="step-title">Mutual NDA &amp; SLA</h4>
              <p className="step-desc">
                Execution of bilateral non-disclosure agreement with 100% intellectual property rights assigned.
              </p>
              <span className="step-timing-pill">Day 4</span>
            </div>

            <div className="process-step-card">
              <div className="step-num-badge">04</div>
              <h4 className="step-title">Sprint Zero Setup</h4>
              <p className="step-desc">
                Setup on your private Git, Jira, Slack, CI/CD pipelines, and development sandbox environments.
              </p>
              <span className="step-timing-pill">Day 5</span>
            </div>

            <div className="process-step-card">
              <div className="step-num-badge">05</div>
              <h4 className="step-title">Continuous Velocity</h4>
              <p className="step-desc">
                Daily standups, bi-weekly demos, transparent velocity burndown tracking, and ongoing scale.
              </p>
              <span className="step-timing-pill">Ongoing</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions Accordion */}
      <section className="page-section faqs-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag-glow">TRANSPARENCY FIRST</span>
            <h2 className="section-main-heading">Partnership &amp; ODC Questions</h2>
            <p className="section-lead-desc">
              Everything you need to know about setting up an offshore development center with Black Grapes Softech.
            </p>
          </div>

          <div className="faqs-accordion-list">
            {PARTNERSHIP_DATA.partnershipFaqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-accordion-item ${activeFaq === idx ? 'faq-item-open' : ''}`}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="faq-question-row">
                  <span className="faq-q-text">{faq.q}</span>
                  <span className="faq-toggle-icon">{activeFaq === idx ? '−' : '+'}</span>
                </div>
                {activeFaq === idx && (
                  <div className="faq-answer-block">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Bottom CTA Banner */}
      <section className="page-section partner-bottom-cta">
        <div className="container">
          <div className="bottom-cta-card">
            <div className="bottom-cta-content">
              <span className="bottom-cta-badge">LET'S GROW TOGETHER</span>
              <h3 className="bottom-cta-title">Ready to Launch Your India Development Center?</h3>
              <p className="bottom-cta-desc">
                Book a consultation with our technical directors to explore team capacities, pilot trials, and customized pricing models.
              </p>
            </div>
            <div className="bottom-cta-buttons">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => onOpenModal('Schedule Partnership Consultation')}
              >
                Book Discovery Call &rarr;
              </button>
              <Link to="/contact-us" className="btn btn-outline btn-lg">
                View Contact Hub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
