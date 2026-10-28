import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  Award, 
  Phone, 
  Mail, 
  UserCheck, 
  GraduationCap, 
  Send, 
  FileText, 
  Building2, 
  Quote, 
  Check, 
  X,
  MessageCircle,
  Layers,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Star,
  Zap,
  Globe,
  Flame
} from 'lucide-react';
import '../Styles/CyberServices.css';

export default function ITStaffingPage({ onOpenContact }) {
  // Hero Lead Form State
  const [heroForm, setHeroForm] = useState({
    fullName: '',
    companyName: '',
    companyEmail: '',
    mobileNumber: '',
    service: 'IT/Technical Hiring',
    mandates: '10-50'
  });
  const [heroFormSubmitting, setHeroFormSubmitting] = useState(false);
  const [heroFormSuccess, setHeroFormSuccess] = useState(false);

  // Modal Inquiry Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Enquiry'); // 'Enquiry', 'Request a Demo', 'Get the offer'
  const [modalForm, setModalForm] = useState({
    name: '',
    email: '',
    contact: '',
    requirement: 'IT/Technical Hiring',
    message: ''
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  // Interactive Testimonial Carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const staffingServices = [
    'NAPS/Apprenticeship Hiring',
    'Bulk Hiring',
    'Diversity Hiring',
    'Gig Hiring/Flexi Staffing',
    'General Staffing/Payroll Management',
    'IT/Technical Hiring'
  ];

  const mandateOptions = ['1-10', '10-50', '51-100', '101+'];

  const testimonials = [
    {
      name: 'Subodh Bhandari',
      role: 'Businessman',
      company: 'Enterprise Partner',
      rating: 5,
      quote: 'I have had the pleasure of working with Black Grapes Softech Company for the past few years, and I can confidently say that they have significantly transformed our business operations. Their software solutions have not only streamlined our processes but also boosted our efficiency and productivity to new heights.'
    },
    {
      name: 'Kartik Mali',
      role: 'Gym Owner',
      company: 'Fitness Enterprise',
      rating: 5,
      quote: 'From the moment we engaged with Black Grapes Softech, their team demonstrated a deep understanding of our unique business needs. They took the time to listen to our challenges, goals, and aspirations and then tailored their software solutions to meet our specific requirements. The level of customization and flexibility they provided was truly impressive.'
    }
  ];

  const handleHeroFormSubmit = (e) => {
    e.preventDefault();
    setHeroFormSubmitting(true);
    setTimeout(() => {
      setHeroFormSubmitting(false);
      setHeroFormSuccess(true);
    }, 700);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setModalSubmitting(true);
    setTimeout(() => {
      setModalSubmitting(false);
      setModalSuccess(true);
    }, 700);
  };

  const openInquiryModal = (type = 'Enquiry') => {
    setModalType(type);
    setModalSuccess(false);
    setModalOpen(true);
  };

  const scrollToHeroForm = () => {
    const el = document.getElementById('hero-staffing-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      openInquiryModal('Contact Staffing Team');
    }
  };

  return (
    <main className="staffing-page-main cyber-grape-theme">
      {/* Background Cyber Ambient Radial Glows */}
      <div className="cyber-ambient-glow glow-flame-top" />
      <div className="cyber-ambient-glow glow-grape-right" />
      <div className="cyber-ambient-glow glow-cyan-left" />

      {/* Cyber Grape Theme Indicator Banner */}
      <div className="cyber-theme-badge-bar">
        <div className="content-wrapper theme-badge-inner">
          <div className="cyber-status-pill">
            <span className="pulsing-cyber-dot" />
            <span className="theme-tech-name">CYBER GRAPE & NEON FLAME</span>
            <span className="theme-tech-sep">•</span>
            <span className="theme-tech-sub">Dark High-Tech Glassmorphism</span>
          </div>

          <div className="cyber-metrics-mini">
            <span className="cyber-metric-chip">
              <span className="chip-dot" style={{ background: '#f86200' }} />
              <span>Neon Flame</span>
            </span>
            <span className="cyber-metric-chip">
              <span className="chip-dot" style={{ background: '#9333ea' }} />
              <span>Cyber Grape</span>
            </span>
            <span className="cyber-metric-chip">
              <span className="chip-dot" style={{ background: '#38bdf8' }} />
              <span>Cyan Blue</span>
            </span>
            <span className="cyber-metric-chip">
              <span className="chip-dot" style={{ background: '#10b981' }} />
              <span>Emerald</span>
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          HERO SECTION (2-Column High-Tech Glassmorphism Layout)
          ========================================================================= */}
      <section className="staffing-hero-v2">
        <div className="content-wrapper">
          <div className="hero-grid-v2">
            
            {/* Left Column: Authentic Title, Subtitle, Silhouette Hero Image, Key Highlights */}
            <div className="hero-left-v2">
              <div className="hero-badge-wrap" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                <span className="hero-top-pill cyber-pill-flame">
                  <Flame size={14} color="#f86200" />
                  <span>BLACK GRAPES SOFTECH • IT STAFFING & MANPOWER SOLUTIONS</span>
                </span>
              </div>

              {/* Exact H1 from https://blackgrapessoftech.com/it-staffing/ */}
              <h1 className="staffing-h1">
                Stay on course with growth plans by{' '}
                <span className="neon-flame-text">hiring contractual staff</span>
              </h1>

              {/* Exact Subtitle from original site */}
              <p className="staffing-lead-text">
                Outsource your manpower needs with prompt.
              </p>

              <p className="staffing-sub-desc">
                Deploy pre-vetted senior software engineers, technical squads, and bulk contractual staff across 28 Indian states with full statutory compliance, zero long-term liabilities, and guaranteed rapid onboarding.
              </p>

              {/* Authentic Business Image with Cyber Grape High-Tech Frame & Floating Stats */}
              <div className="hero-image-showcase">
                <div className="hero-image-wrapper cyber-glass-border">
                  <img 
                    src="/it-staffing/staffing-hero.jpg" 
                    alt="Black Grapes Softech Contractual Staffing" 
                    className="hero-staffing-img"
                  />
                  <div className="hero-image-overlay-glow" />
                  
                  {/* Floating Glass Badges */}
                  <div className="floating-stat-badge badge-top-right cyber-glass-pill">
                    <ShieldCheck size={18} color="#10b981" />
                    <div>
                      <div className="badge-bold">28 States</div>
                      <div className="badge-sub">100% Compliant</div>
                    </div>
                  </div>

                  <div className="floating-stat-badge badge-bottom-left cyber-glass-pill">
                    <Users size={18} color="#f86200" />
                    <div>
                      <div className="badge-bold">25,000+ Staff</div>
                      <div className="badge-sub">Active on Payroll</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Lead Generation Form in Glassmorphic Card */}
            <div className="hero-right-v2" id="hero-staffing-form">
              <div className="hero-form-card translucent-glass-panel">
                <div className="form-header-badge cyber-glass-badge">
                  <Sparkles size={16} color="#f86200" />
                  <span>Direct Staffing Mandate Form</span>
                </div>

                <h3 className="hero-form-title">
                  Outsource Your Manpower Needs
                </h3>
                <p className="hero-form-subtitle">
                  Get a tailored contract staffing quotation with SLA confirmation in 2 business hours.
                </p>

                {!heroFormSuccess ? (
                  <form onSubmit={handleHeroFormSubmit} className="hero-actual-form">
                    {/* Full Name */}
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input 
                        type="text"
                        required
                        placeholder="Full Name"
                        value={heroForm.fullName}
                        onChange={(e) => setHeroForm({ ...heroForm, fullName: e.target.value })}
                        className="form-input cyber-input"
                      />
                    </div>

                    {/* Company Name */}
                    <div className="form-group">
                      <label className="form-label">Company Name *</label>
                      <input 
                        type="text"
                        required
                        placeholder="Company Name"
                        value={heroForm.companyName}
                        onChange={(e) => setHeroForm({ ...heroForm, companyName: e.target.value })}
                        className="form-input cyber-input"
                      />
                    </div>

                    {/* Company Email & Mobile Number Grid */}
                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label">Company Email *</label>
                        <input 
                          type="email"
                          required
                          placeholder="Company Email"
                          value={heroForm.companyEmail}
                          onChange={(e) => setHeroForm({ ...heroForm, companyEmail: e.target.value })}
                          className="form-input cyber-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Mobile Number *</label>
                        <input 
                          type="tel"
                          required
                          placeholder="Mobile Number"
                          pattern="[0-9()#&amp;+*-=.]+"
                          value={heroForm.mobileNumber}
                          onChange={(e) => setHeroForm({ ...heroForm, mobileNumber: e.target.value })}
                          className="form-input cyber-input"
                        />
                      </div>
                    </div>

                    {/* Services Dropdown (All 6 Options from Original Site) */}
                    <div className="form-group">
                      <label className="form-label">Services *</label>
                      <select
                        required
                        value={heroForm.service}
                        onChange={(e) => setHeroForm({ ...heroForm, service: e.target.value })}
                        className="form-select cyber-input"
                      >
                        {staffingServices.map((service, idx) => (
                          <option key={idx} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    {/* Number of Hiring Mandates (All 4 Options from Original Site) */}
                    <div className="form-group">
                      <label className="form-label">Number of Hiring Mandates *</label>
                      <select
                        required
                        value={heroForm.mandates}
                        onChange={(e) => setHeroForm({ ...heroForm, mandates: e.target.value })}
                        className="form-select cyber-input"
                      >
                        {mandateOptions.map((opt, idx) => (
                          <option key={idx} value={opt}>{opt} Staff</option>
                        ))}
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      className="hero-submit-btn neon-flame-btn"
                      disabled={heroFormSubmitting}
                    >
                      {heroFormSubmitting ? (
                        <span>Processing Mandate...</span>
                      ) : (
                        <>
                          <span>Send Staffing Inquiry</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>

                    <div className="form-footer-privacy">
                      <ShieldCheck size={14} color="#10b981" />
                      <span>100% Confidential • Zero Commitment Required • NDA Protected</span>
                    </div>
                  </form>
                ) : (
                  <div className="form-success-box">
                    <div className="success-icon-wrap cyber-emerald-glow">
                      <Check size={32} color="#10b981" />
                    </div>
                    <h4>Inquiry Received Successfully!</h4>
                    <p>
                      Thank you, <strong>{heroForm.fullName || 'Valued Partner'}</strong>. Your inquiry for <strong>{heroForm.mandates}</strong> contractual staff under <strong>{heroForm.service}</strong> has been assigned to our senior recruitment director.
                    </p>
                    <div className="success-contact-confirm cyber-grape-box">
                      We will contact you at <strong>{heroForm.mobileNumber}</strong> or <strong>{heroForm.companyEmail}</strong> within 2 hours.
                    </div>
                    <button
                      type="button"
                      className="reset-form-btn cyber-btn-subtle"
                      onClick={() => {
                        setHeroFormSuccess(false);
                        setHeroForm({
                          fullName: '',
                          companyName: '',
                          companyEmail: '',
                          mobileNumber: '',
                          service: 'IT/Technical Hiring',
                          mandates: '10-50'
                        });
                      }}
                    >
                      Submit Another Mandate
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY NUMBERS STRIP (Cyber Grape Glass Cards)
          ========================================================================= */}
      <section className="content-wrapper" style={{ marginBottom: '4rem' }}>
        <div className="staffing-stats-strip-v2">
          <div className="stat-card-v2 translucent-glass-card">
            <div className="stat-card-num neon-flame-text">25,000+</div>
            <div className="stat-card-title">Contract Staff Deployed</div>
            <div className="stat-card-desc">Active workforce deployed across PAN-India client locations</div>
          </div>
          <div className="stat-card-v2 translucent-glass-card">
            <div className="stat-card-num cyber-grape-text">28 States</div>
            <div className="stat-card-title">Full Statutory Compliance</div>
            <div className="stat-card-desc">Complete PF, ESIC, Professional Tax & state labour laws adherence</div>
          </div>
          <div className="stat-card-v2 translucent-glass-card">
            <div className="stat-card-num cyan-blue-text">48-72h</div>
            <div className="stat-card-title">Rapid Onboarding SLA</div>
            <div className="stat-card-desc">Swift talent turnaround from requirement mandate to active kickoff</div>
          </div>
          <div className="stat-card-v2 translucent-glass-card">
            <div className="stat-card-num emerald-green-text">98.4%</div>
            <div className="stat-card-title">Client Retention Rate</div>
            <div className="stat-card-desc">Trusted by leading Fortune enterprises, MNCs & Indian startups</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: How does your company address new Manpower staffing requirements as it expands?
          ========================================================================= */}
      <section className="content-wrapper" style={{ marginBottom: '5rem' }}>
        <div className="expansion-card-v2 translucent-glass-panel">
          <div className="section-header-centered">
            <span className="hero-top-pill cyber-pill-grape">
              <Briefcase size={13} color="#c084fc" />
              <span>THE EXPANSION CHALLENGE</span>
            </span>
            <h2 className="section-title-large">
              How does your company address new{' '}
              <span className="neon-flame-text">Manpower staffing requirements</span> as it expands?
            </h2>
            <p className="section-subtitle-large">
              Balancing talent management with rapid business growth in new locations poses challenges. If you’re aiming for expansion, you probably face the following scenarios:
            </p>
          </div>

          <div className="scenarios-grid">
            {/* Scenario 1 */}
            <div className="scenario-item-card translucent-glass-card">
              <div className="scenario-icon-wrapper flame-icon-glow">
                <Clock size={24} color="#f86200" />
              </div>
              <h4 className="scenario-card-title">Tight Deployment Deadlines</h4>
              <p className="scenario-card-desc">
                Your expansion timeline hinges on quickly deploying contract staff onsite, often with tight deadlines and high performance stakes.
              </p>
              <div className="scenario-bullet-pill neon-flame-text">
                <span>Critical Scenario 01</span>
              </div>
            </div>

            {/* Scenario 2 */}
            <div className="scenario-item-card translucent-glass-card">
              <div className="scenario-icon-wrapper grape-icon-glow">
                <Users size={24} color="#c084fc" />
              </div>
              <h4 className="scenario-card-title">HR Time & Bandwidth Drain</h4>
              <p className="scenario-card-desc">
                Your HR department consistently requires contract staff, leading to significant time spent on sourcing, training, and onboarding.
              </p>
              <div className="scenario-bullet-pill cyber-grape-text">
                <span>Critical Scenario 02</span>
              </div>
            </div>

            {/* Support Box */}
            <div className="scenario-item-card support-highlight-card flame-gradient-card">
              <div className="scenario-icon-wrapper support-icon">
                <Award size={24} color="#ffffff" />
              </div>
              <h4 className="scenario-card-title" style={{ color: '#ffffff' }}>Full HR Assistance</h4>
              <p className="scenario-card-desc" style={{ color: 'rgba(255,255,255,0.92)' }}>
                You might require additional HR assistance. <strong>This is where we can offer support!</strong> We take over sourcing, background checks, and payroll management.
              </p>
              <button 
                type="button" 
                className="scenario-action-btn"
                onClick={() => openInquiryModal('Expansion HR Support')}
              >
                <span>Request HR Support</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: As Prompt Personnel, we're the top choice for staffing and HR solutions...
          Here are 3 ways through which we can offer assistance:
          ========================================================================= */}
      <section className="content-wrapper" style={{ marginBottom: '5rem' }}>
        <div className="section-header-centered">
          <span className="hero-top-pill cyber-pill-flame">
            <Award size={13} color="#f86200" />
            <span>PROVEN STRATEGIC VALUE</span>
          </span>
          <h2 className="section-title-large">
            As Prompt Personnel, we're the top choice for staffing and HR solutions among leading MNCs and Indian businesses.
          </h2>
          <p className="section-subtitle-large">
            Here are 3 ways through which we can offer assistance:
          </p>
        </div>

        <div className="three-ways-grid">
          {/* Way 1 */}
          <div className="three-way-card translucent-glass-card">
            <div className="way-number-watermark">01</div>
            <div className="way-icon-container flame-icon-glow">
              <UserCheck size={26} color="#f86200" />
            </div>
            <h3 className="way-title">
              Bulk Hiring of Contractual Staff for your Company
            </h3>
            <p className="way-desc">
              Rapid multi-city deployment of technical squads, developers, QA engineers, and operations staff. Pre-screened talent pools ready for immediate onsite or remote integration.
            </p>
            <div className="way-card-action">
              <button 
                type="button" 
                className="way-learn-more"
                onClick={() => openInquiryModal('Bulk Hiring Assistance')}
              >
                <span>Learn More About Bulk Hiring</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Way 2 */}
          <div className="three-way-card translucent-glass-card">
            <div className="way-number-watermark">02</div>
            <div className="way-icon-container grape-icon-glow">
              <FileText size={26} color="#c084fc" />
            </div>
            <h3 className="way-title">
              Managing End to End Payroll Operations
            </h3>
            <p className="way-desc">
              Comprehensive payroll processing, salary disbursement, digital employee self-service slips, TDS calculations, and full monthly statutory filings with zero compliance slip-ups.
            </p>
            <div className="way-card-action">
              <button 
                type="button" 
                className="way-learn-more"
                onClick={() => openInquiryModal('Payroll Operations Assistance')}
              >
                <span>Learn More About Payroll Management</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Way 3 */}
          <div className="three-way-card translucent-glass-card">
            <div className="way-number-watermark">03</div>
            <div className="way-icon-container cyan-icon-glow">
              <TrendingUp size={26} color="#38bdf8" />
            </div>
            <h3 className="way-title">
              Allowing You to Focus on Core Competencies
            </h3>
            <p className="way-desc">
              Relieve leadership and core department heads from staffing friction. Focus 100% on product development, client acquisition, and core business growth while we manage human capital.
            </p>
            <div className="way-card-action">
              <button 
                type="button" 
                className="way-learn-more"
                onClick={() => openInquiryModal('Strategic Staffing Partnership')}
              >
                <span>Learn More About Core Focus</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* CTA Banner: Enquire Now */}
        <div className="enquire-now-banner translucent-glass-panel">
          <div className="enquire-banner-text">
            <h4>Ready to discuss your contractual staff requirements?</h4>
            <p>Our talent advisors will configure an agile staffing model custom tailored to your timelines.</p>
          </div>
          <button 
            type="button" 
            className="enquire-cta-btn neon-flame-btn"
            onClick={() => openInquiryModal('Enquire Now')}
          >
            <span>Enquire Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: How Contingent Staffing Firm can help you stay focused on Growth?
          ========================================================================= */}
      <section className="content-wrapper" style={{ marginBottom: '5rem' }}>
        <div className="contingent-growth-section translucent-glass-panel">
          <div className="section-header-centered">
            <span className="hero-top-pill cyber-pill-cyan">
              <TrendingUp size={13} color="#38bdf8" />
              <span>STRATEGIC ADVANTAGE</span>
            </span>
            <h2 className="section-title-large">
              How Contingent Staffing Firm can help you{' '}
              <span className="neon-flame-text">stay focused on Growth?</span>
            </h2>
          </div>

          <div className="growth-pillars-grid-v2">
            {/* Pillar 1 */}
            <div className="growth-pillar-card-v2 translucent-glass-card">
              <div className="pillar-num-badge flame-badge">Pillar 01</div>
              <h3 className="pillar-heading">
                1. Mitigate incorrect hiring risks.
              </h3>
              <p className="pillar-description">
                Incorrect permanent hires cost significant severance, recruitment fees, and team momentum. Contingent staffing lets you evaluate engineers on real-world milestones with complete agility and zero long-term termination liability.
              </p>
              <div className="pillar-perk">
                <CheckCircle2 size={16} color="#10b981" />
                <span>Zero severance or permanent liability</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="growth-pillar-card-v2 translucent-glass-card">
              <div className="pillar-num-badge grape-badge">Pillar 02</div>
              <h3 className="pillar-heading">
                2. Reduce operations costs, improve toplines.
              </h3>
              <p className="pillar-description">
                Replace heavy fixed annual compensation overheads with flexible, project-based operational expenditure. Scale headcount strictly when revenue-generating mandates require it, protecting margins and bottom lines.
              </p>
              <div className="pillar-perk">
                <CheckCircle2 size={16} color="#10b981" />
                <span>Optimize operational cash flows & margins</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="growth-pillar-card-v2 translucent-glass-card">
              <div className="pillar-num-badge cyan-badge">Pillar 03</div>
              <h3 className="pillar-heading">
                3. Improve scalability, increase alignment with strategy.
              </h3>
              <p className="pillar-description">
                Seamlessly adapt workforce size in response to sudden product releases, client surges, or geographic expansions. Align team capacity directly with corporate quarterly strategy without recruiting bottlenecks.
              </p>
              <div className="pillar-perk">
                <CheckCircle2 size={16} color="#10b981" />
                <span>Instant ramp-up and ramp-down flexibility</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: What does our Flexible Staffing Services include: Our Process
          ========================================================================= */}
      <section className="content-wrapper" style={{ marginBottom: '5rem' }}>
        <div className="section-header-centered">
          <span className="hero-top-pill cyber-pill-grape">
            <Layers size={13} color="#c084fc" />
            <span>SYSTEMATIC METHODOLOGY</span>
          </span>
          <h2 className="section-title-large">
            What does our Flexible Staffing Services include:{' '}
            <span className="neon-flame-text">Our Process</span>
          </h2>
          <p className="section-subtitle-large">
            A battle-tested 3-stage delivery pipeline ensuring pre-vetted, high-performance talent deployed seamlessly to your organization.
          </p>
        </div>

        <div className="process-pipeline-grid">
          {/* Step 1 */}
          <div className="process-stage-card translucent-glass-card">
            <div className="stage-header-row">
              <div className="stage-step-tag flame-step-tag">Step 01</div>
              <div className="stage-icon-box flame-icon-glow">
                <Users size={22} color="#f86200" />
              </div>
            </div>
            <h3 className="stage-title">1. Source</h3>
            <p className="stage-body">
              Accessing appropriate channels is crucial for candidate sourcing. We engage with specific demographics to ensure the recruitment of suitable individuals.
            </p>
            <div className="stage-key-metrics">
              <div className="metric-pill">• Multi-channel sourcing networks</div>
              <div className="metric-pill">• Technical & behavioral pre-screening</div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="process-stage-card translucent-glass-card">
            <div className="stage-header-row">
              <div className="stage-step-tag grape-step-tag">Step 02</div>
              <div className="stage-icon-box grape-icon-glow">
                <GraduationCap size={22} color="#c084fc" />
              </div>
            </div>
            <h3 className="stage-title">2. Train</h3>
            <p className="stage-body">
              Training aligned with organizational development objectives is essential for enhancing their job effectiveness.
            </p>
            <div className="stage-key-metrics">
              <div className="metric-pill">• Customized domain skill orientation</div>
              <div className="metric-pill">• Compliance & operational workflow alignment</div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="process-stage-card translucent-glass-card">
            <div className="stage-header-row">
              <div className="stage-step-tag cyan-step-tag">Step 03</div>
              <div className="stage-icon-box cyan-icon-glow">
                <Send size={22} color="#38bdf8" />
              </div>
            </div>
            <h3 className="stage-title">3. Deploy</h3>
            <p className="stage-body">
              With over 25,000 contractual staff on our payroll, we are in a great position to deploy anywhere across India.
            </p>
            <div className="stage-key-metrics">
              <div className="metric-pill">• PAN-India physical & remote deployment</div>
              <div className="metric-pill">• Centralized compliance & daily governance</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: What do our clients say about us: (Testimonials Carousel)
          ========================================================================= */}
      <section className="content-wrapper" style={{ marginBottom: '5rem' }}>
        <div className="section-header-centered">
          <span className="hero-top-pill cyber-pill-flame">
            <Quote size={13} color="#f86200" />
            <span>VERIFIED CLIENT SUCCESS</span>
          </span>
          <h2 className="section-title-large">
            What do our clients <span className="neon-flame-text">say about us:</span>
          </h2>
        </div>

        <div className="testimonials-carousel-wrapper">
          <div className="testimonial-display-card translucent-glass-panel">
            <div className="testimonial-quote-icon">
              <Quote size={40} color="#f86200" />
            </div>

            {/* Stars */}
            <div className="testimonial-stars-row">
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} size={18} fill="#fba721" color="#fba721" />
              ))}
            </div>

            {/* Quote Body */}
            <blockquote className="testimonial-quote-content">
              "{testimonials[activeTestimonial].quote}"
            </blockquote>

            {/* Author Footer */}
            <div className="testimonial-footer-wrap">
              <div className="testimonial-avatar-initials flame-gradient-bg">
                {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="testimonial-author-meta">
                <div className="author-name-bold">{testimonials[activeTestimonial].name}</div>
                <div className="author-title-sub">
                  {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].company}
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="carousel-controls-bar">
            <button
              type="button"
              className="carousel-nav-btn cyber-glass-pill"
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>

            <div className="carousel-dots-row">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`carousel-dot ${activeTestimonial === idx ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="carousel-nav-btn cyber-glass-pill"
              onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              aria-label="Next Testimonial"
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* SECTION 7 CTA Button: Contact Now */}
        <div className="contact-now-action-row">
          <button 
            type="button" 
            className="contact-now-btn neon-flame-btn"
            onClick={scrollToHeroForm}
          >
            <span>Contact Now</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: Why Prompt should be your go-to-partner in Manpower Staffing
          28 States Compliance Expertise.
          ========================================================================= */}
      <section className="content-wrapper" style={{ marginBottom: '5rem' }}>
        <div className="compliance-expert-card translucent-glass-panel">
          <div className="compliance-header-group">
            <span className="hero-top-pill cyber-pill-emerald">
              <ShieldCheck size={14} color="#10b981" />
              <span>NATIONWIDE COMPLIANCE NETWORK</span>
            </span>
            <h2 className="compliance-heading-title">
              Why Prompt should be your go-to-partner in Manpower Staffing <br />
              <span className="neon-flame-text">28 States Compliance Expertise.</span>
            </h2>
            <p className="compliance-lead-desc">
              Managing contingent workforces across multiple state boundaries demands rigorous compliance with fluctuating local Minimum Wage notifications, Shops & Commercial Establishment Acts, and statutory filing calendars.
            </p>
          </div>

          {/* Interactive Compliance Metrics Grid */}
          <div className="compliance-stat-highlights-grid">
            <div className="compliance-metric-box translucent-glass-card">
              <div className="compliance-stat-val neon-flame-text">25+</div>
              <div className="compliance-stat-label">Years of Staffing Excellence</div>
            </div>
            <div className="compliance-metric-box translucent-glass-card">
              <div className="compliance-stat-val cyber-grape-text">2200+</div>
              <div className="compliance-stat-label">Service Locations Nationwide</div>
            </div>
            <div className="compliance-metric-box translucent-glass-card">
              <div className="compliance-stat-val cyan-blue-text">08</div>
              <div className="compliance-stat-label">Branch Network Cities</div>
            </div>
            <div className="compliance-metric-box translucent-glass-card highlight-metric">
              <div className="compliance-stat-val neon-flame-text">29</div>
              <div className="compliance-stat-label">States Compliance Expertise</div>
            </div>
            <div className="compliance-metric-box translucent-glass-card">
              <div className="compliance-stat-val emerald-green-text">05</div>
              <div className="compliance-stat-label">Union Territories Compliance</div>
            </div>
          </div>

          {/* Map Graphic Presentation Card */}
          <div className="compliance-graphic-frame">
            <div className="compliance-img-container">
              <img 
                src="/it-staffing/staffing-compliance.png" 
                alt="28 States Compliance Expertise Black Grapes Softech" 
                className="compliance-showcase-img"
              />
            </div>
            <div className="compliance-checklist-strip">
              <span className="comp-tag cyber-tag-flame">✓ Employees' Provident Fund (EPF)</span>
              <span className="comp-tag cyber-tag-grape">✓ Employees' State Insurance (ESIC)</span>
              <span className="comp-tag cyber-tag-cyan">✓ Professional Tax (PT) in 28 States</span>
              <span className="comp-tag cyber-tag-emerald">✓ Labour Welfare Fund (LWF)</span>
              <span className="comp-tag cyber-tag-amber">✓ Gratuity & Bonus Act Compliance</span>
              <span className="comp-tag cyber-tag-flame">✓ Contract Labour (Regulation & Abolition) Act</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DIRECT CONTACT & HELPLINE BAR
          ========================================================================= */}
      <section className="content-wrapper" style={{ paddingBottom: '5rem' }}>
        <div className="direct-helpline-box translucent-glass-panel">
          <div className="helpline-info">
            <div className="helpline-badge cyber-glass-badge">Direct Staffing Helpline</div>
            <h3 className="helpline-heading">Ready to hire contractual staff for your company?</h3>
            <div className="helpline-contact-row">
              <a href="tel:+917470997884" className="helpline-link">
                <Phone size={16} color="#f86200" />
                <span>+91 7470997884</span>
              </a>
              <span className="helpline-sep">•</span>
              <a href="tel:+916262414463" className="helpline-link">
                <Phone size={16} color="#f86200" />
                <span>+91 6262414463</span>
              </a>
              <span className="helpline-sep">•</span>
              <a href="mailto:info@blackgrapessoftech.com" className="helpline-link">
                <Mail size={16} color="#c084fc" />
                <span>info@blackgrapessoftech.com</span>
              </a>
            </div>
          </div>

          <div className="helpline-actions">
            <button
              type="button"
              className="helpline-cta-btn neon-flame-btn"
              onClick={() => openInquiryModal('Direct Staffing Helpline')}
            >
              <span>Contact Staffing Team</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          AUTHENTIC INQUIRY MODAL (Request a Demo / Enquiry / Get the Offer)
          ========================================================================= */}
      {modalOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-container-card translucent-glass-panel" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="modal-close-trigger" 
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {!modalSuccess ? (
              <>
                <div className="modal-top-strip flame-gradient-bg" />
                <div className="modal-header-block">
                  <div className="modal-category-tag cyber-glass-badge">
                    <Sparkles size={14} color="#f86200" />
                    <span>{modalType}</span>
                  </div>
                  <h3 className="modal-heading-title">{modalType}</h3>
                  <p className="modal-heading-sub">
                    Fill out your staffing requirements below and our HR director will connect with you.
                  </p>
                </div>

                <form onSubmit={handleModalSubmit} className="modal-form-body">
                  <div className="modal-input-group">
                    <label className="modal-label">Your Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Your name"
                      value={modalForm.name}
                      onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                      className="modal-text-input cyber-input"
                    />
                  </div>

                  <div className="modal-input-group">
                    <label className="modal-label">Your Email *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="Your email"
                      value={modalForm.email}
                      onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                      className="modal-text-input cyber-input"
                    />
                  </div>

                  <div className="modal-input-group">
                    <label className="modal-label">Your Contact Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Your Contact"
                      value={modalForm.contact}
                      onChange={(e) => setModalForm({ ...modalForm, contact: e.target.value })}
                      className="modal-text-input cyber-input"
                    />
                  </div>

                  <div className="modal-input-group">
                    <label className="modal-label">Your Requirement *</label>
                    <select
                      value={modalForm.requirement}
                      onChange={(e) => setModalForm({ ...modalForm, requirement: e.target.value })}
                      className="modal-select-input cyber-input"
                    >
                      <option value="IT/Technical Hiring">IT/Technical Hiring</option>
                      <option value="Bulk Hiring">Bulk Hiring</option>
                      <option value="General Staffing/Payroll Management">General Staffing/Payroll Management</option>
                      <option value="Gig Hiring/Flexi Staffing">Gig Hiring/Flexi Staffing</option>
                      <option value="NAPS/Apprenticeship Hiring">NAPS/Apprenticeship Hiring</option>
                      <option value="Diversity Hiring">Diversity Hiring</option>
                      <option value="Software Development">Software Development</option>
                      <option value="CRM Software Development">CRM Software Development</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="modal-input-group">
                    <label className="modal-label">Your Message</label>
                    <textarea
                      rows={3}
                      placeholder="Your message / specific project requirements"
                      value={modalForm.message}
                      onChange={(e) => setModalForm({ ...modalForm, message: e.target.value })}
                      className="modal-textarea-input cyber-input"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="modal-submit-btn neon-flame-btn"
                    disabled={modalSubmitting}
                  >
                    {modalSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              </>
            ) : (
              <div className="modal-success-screen">
                <div className="modal-success-icon-wrap cyber-emerald-glow">
                  <Check size={36} color="#10b981" />
                </div>
                <h3>Request Submitted!</h3>
                <p>
                  Thank you, <strong>{modalForm.name || 'Valued Client'}</strong>! We have received your request for <strong>{modalForm.requirement}</strong>. Our senior executive will call you at <strong>{modalForm.contact}</strong> promptly.
                </p>
                <button
                  type="button"
                  className="modal-close-action-btn cyber-btn-subtle"
                  onClick={() => setModalOpen(false)}
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          FLOATING WHATSAPP BUTTON (Authentic Widget)
          ========================================================================= */}
      <a 
        href="https://wa.me/917470997884?text=Hello%20Black%20Grapes%20Softech,%20I%20want%20to%20inquire%20about%20IT%20Staffing%20Services"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-widget"
        title="Chat on WhatsApp (+91 7470997884)"
      >
        <MessageCircle size={22} />
        <span className="whatsapp-label">WhatsApp Us</span>
      </a>
    </main>
  );
}
