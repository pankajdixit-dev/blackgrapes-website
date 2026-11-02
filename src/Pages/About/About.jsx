import React, { useState } from 'react';
import {
  Sparkles,
  Rocket,
  Target,
  Code2,
  Users,
  Award,
  Globe,
  Clock,
  CheckCircle,
  Cpu,
  Layers,
  ArrowRight,
  Shield,
  Lightbulb,
  Building2,
  Calendar,
  Zap,
  Quote
} from 'lucide-react';
import foundersImg from '../../assets/founders.jpg';
import aboutHeroImg from '../../assets/about-hero.jpg';
import workspaceImg from '../../assets/workspace.jpg';
import { usePageSections, useSeo } from '../../services/useContent';
import './About.css';

export default function About({ onOpenDemoModal }) {
  // SEO Meta injection
  useSeo('/about');

  // Dynamic Content Subscription
  const { sections } = usePageSections('about');

  // Active tab state for Mission/Vision/Philosophy interactive viewer
  const [activeTab, setActiveTab] = useState('vision');

  // Hero Section Data
  const hero = sections.about_hero?.content || {};
  const heroBadge = hero.badge || 'ABOUT BLACK GRAPES SOFTECH';
  const heroTitle = hero.title || 'We Don’t Just Write Code — ';
  const heroTitleHighlight = hero.titleHighlight || 'We Engineer The Digital Future.';
  const heroLead = hero.lead ||
    'Headquartered in Indore, India, Black Grapes Softech is a premier software engineering & digital transformation agency. We translate complex business hurdles into elegant, high-impact digital products.';
  const heroPrimaryBtn = hero.primaryBtnText || 'Partner With Us';
  const heroSecondaryBtn = hero.secondaryBtnText || 'Meet Our Leadership';
  const heroImage = hero.image || aboutHeroImg;
  const floatingStat1Num = hero.floatingStat1Num || '250+ Projects';
  const floatingStat1Sub = hero.floatingStat1Sub || 'Shipped Globally';
  const floatingStat2Num = hero.floatingStat2Num || '15+ Nations';
  const floatingStat2Sub = hero.floatingStat2Sub || 'Active Client Base';
  const microBadges = hero.microBadges || ['Certified Developers', 'Full Cycle Development', '24/7 Dedicated Support'];

  // Stats Data
  const defaultStats = [
    { number: '10+', label: 'Years of Innovation', icon: Calendar, highlight: 'Since 2014' },
    { number: '250+', label: 'Projects Completed', icon: Code2, highlight: 'Global Scale' },
    { number: '150+', label: 'Satisfied Clients', icon: Users, highlight: '15+ Countries' },
    { number: '99%', label: 'Client Retention', icon: Award, highlight: 'Industry Best' }
  ];
  const dynamicStats = sections.stats_strip?.content?.stats;
  const stats = (dynamicStats && dynamicStats.length > 0)
    ? dynamicStats.map((s, idx) => ({
        ...s,
        icon: defaultStats[idx]?.icon || Calendar
      }))
    : defaultStats;

  // Vision / Mission / Philosophy Data
  const vmSection = sections.vision_mission?.content || {};
  const vmBadge = vmSection.badge || 'PURPOSE & PRINCIPLES';
  const vmTitle = vmSection.title || 'The Guiding Pillars Behind Our Growth';
  const vmSubtitle = vmSection.subtitle ||
    'Every system we engineer is backed by our relentless commitment to excellence and transformative technology.';

  const visionData = vmSection.vision || {
    tag: 'Strategic Vision',
    heading: 'Empowering Tomorrow Through',
    headingHighlight: 'Innovative Code',
    p1: 'At Black Grapes Softech, our vision is to lead the way in software development, using innovation and creativity to shape the future of technology.',
    p2: 'We envision a world where every software solution we architect empowers individuals, businesses, and communities to thrive, automate, and excel in the digital-first economy.',
    points: [
      'Pioneering intelligent, scalable cloud and web infrastructures.',
      'Cultivating technological self-reliance and commercial success for clients.',
      'Constantly innovating ahead of emerging market trends.'
    ],
    quote: '"Technology should not just automate tasks; it should multiply human potential and drive real-world transformation."',
    quoteAuthor: '— Black Grapes Softech Leadership'
  };

  const missionData = vmSection.mission || {
    tag: 'Execution & Commitment',
    heading: 'Crafting Excellence,',
    headingHighlight: 'One Line of Code at a Time',
    p1: 'Our mission is to provide exceptional software development services tailored to our clients’ unique business requirements. We are dedicated to delivering top-notch, cutting-edge solutions while fostering a culture of collaboration, growth, and continuous innovation.',
    p2: 'At Black Grapes Softech, we don’t just write code; we build the solid architectural foundation for a better, smarter, and more connected digital world.',
    points: [
      'High-velocity development with bulletproof security & QA.',
      'Transparent communication and milestone visibility at all times.',
      'Tailored solutions engineered precisely for client ROI.'
    ],
    quote: '"We don’t settle for \'good enough\'. We build digital products designed to dominate their industry."',
    quoteAuthor: '— Engineering Philosophy'
  };

  const philosophyData = vmSection.philosophy || {
    tag: 'Architectural Integrity',
    heading: 'Engineering For',
    headingHighlight: 'Infinite Scale & Speed',
    p1: 'Software isn\'t merely lines of script — it is the digital nervous system of your business. Our philosophy emphasizes clean code, microservices scalability, robust security protocols, and human-centered design.',
    p2: 'Whether developing custom MLM platforms, enterprise CRM systems, or high-throughput SaaS engines, our engineering principles guarantee longevity and seamless scalability.',
    points: [
      'Modularity and maintainability baked in from Day 1.',
      'Lightning-fast user interfaces with modern reactive frameworks.',
      'Zero technical debt tolerance through strict code reviews.'
    ],
    quote: '"Great code is invisible; what users experience is flawless speed, intuition, and undeniable value."',
    quoteAuthor: '— Core Tech Standard'
  };

  // Founders Data
  const founders = sections.founders?.content || {};
  const foundersBadge = founders.badge || 'LEADERSHIP & VISION';
  const foundersTitle = founders.title || 'Meet the Visionaries Behind Black Grapes';
  const foundersSubtitle = founders.subtitle || 'Passionate innovators dedicated to redefining software engineering standards.';
  const foundersPhoto = founders.photo || foundersImg;
  const photoTagName = founders.photoTagName || 'Mr. Arpit Jain & Mrs. Deepika Jain';
  const photoTagRole = founders.photoTagRole || 'Founders & Executive Directors';
  const foundersHeading = founders.heading || 'Driven By Innovation, Grounded In Excellence';
  const foundersIntro = founders.intro || 'Behind Black Grapes Softech stand two visionary leaders with an unquenchable passion for digital advancement.';
  const founder1Name = founders.founder1Name || 'Mr. Arpit Jain — Founder & Chief Architect';
  const founder1Bio = founders.founder1Bio ||
    'The driving force behind our software development journey. With a wealth of architectural experience and an instinctive knack for staying ahead of technological curves, he has pioneered cutting-edge solutions that have redefined client operations across industries.';
  const founder2Name = founders.founder2Name || 'Mrs. Deepika Jain — Co-Founder & Strategic Director';
  const founder2Bio = founders.founder2Bio ||
    'Deepika Jain doesn’t just see challenges; she envisions opportunities. Her boundless creativity, strategic acumen, and people-first leadership have shaped our company’s culture of relentless innovation and customer delight.';

  // Core Values Data
  const defaultValues = [
    {
      icon: Lightbulb,
      title: 'Innovation-First Mindset',
      desc: 'We explore modern architectures and pioneering technologies to give our clients an unbeatable competitive advantage.'
    },
    {
      icon: Shield,
      title: 'Uncompromised Quality',
      desc: 'Every piece of code is rigorously tested, clean, documented, and built to scale effortlessly under intense enterprise load.'
    },
    {
      icon: Zap,
      title: 'Agile & Rapid Delivery',
      desc: 'Short iterative sprints, continuous feedback loops, and transparent milestones ensure on-time and on-budget delivery.'
    },
    {
      icon: Users,
      title: 'Client-Centric Synergy',
      desc: 'We do not view ourselves merely as vendors; we act as dedicated tech co-founders and growth partners in your journey.'
    }
  ];
  const dynamicValues = sections.core_values?.content?.values;
  const coreValues = (dynamicValues && dynamicValues.length > 0)
    ? dynamicValues.map((v, idx) => ({
        ...v,
        icon: defaultValues[idx]?.icon || Shield
      }))
    : defaultValues;

  // Technical Domains Data
  const techDomains = sections.technical_expertise?.content?.domains || [
    'CRM Software Systems',
    'MLM Architecture',
    'Full-Stack Web Apps',
    'iOS & Android Native/Flutter',
    'Cloud & DevOps (AWS/Azure)',
    'UI/UX Design Systems',
    'Enterprise ERP Solutions',
    'Interactive Game Development'
  ];

  // Milestones Data
  const milestones = sections.milestones?.content?.milestones || [
    {
      year: '2014',
      title: 'The Foundation',
      desc: 'Black Grapes Softech was founded in Indore with a vision to deliver world-class software development.'
    },
    {
      year: '2017',
      title: 'Specialized Enterprise Solutions',
      desc: 'Expanded into specialized CRM, MLM platforms, and high-performance cross-platform mobile apps.'
    },
    {
      year: '2021',
      title: 'Global Footprint Expansion',
      desc: 'Reached 150+ international deployments spanning North America, Europe, the Middle East, and Asia.'
    },
    {
      year: '2024 - 2026',
      title: 'AI, Cloud & Next-Gen Ecosystems',
      desc: 'Pioneering intelligent automation, scalable cloud infra, and enterprise-grade web applications.'
    }
  ];

  // Culture & HQ Data
  const culture = sections.culture_hq?.content || {};
  const cultureImage = culture.image || workspaceImg;
  const cultureLocation = culture.locationTag || 'Indore Tech Hub — Madhya Pradesh, India';
  const cultureTitle = culture.title || 'Where Passionate Technologists Thrive';
  const cultureP1 = culture.p1 ||
    'Situated at 252-F/H Scheme No 54, Vijaynagar, Indore, our software development center is where bold ideas turn into robust reality.';
  const cultureP2 = culture.p2 ||
    'We cultivate an open culture of perpetual learning, deep code reviews, creative freedom, and rigorous problem-solving. This energetic environment inspires our engineers to push boundaries and build applications that inspire.';
  const stat1Num = culture.stat1Num || '50+';
  const stat1Label = culture.stat1Label || 'In-House Engineers & Designers';
  const stat2Num = culture.stat2Num || '100%';
  const stat2Label = culture.stat2Label || 'Code Quality & Transparency';

  // Final CTA Data
  const finalCta = sections.final_cta?.content || {};
  const finalCtaTitle = finalCta.title || 'Ready to Accelerate Your Business With Custom Tech?';
  const finalCtaText = finalCta.text ||
    'Speak directly with our technical leadership. Let\'s design, engineer, and deploy your software solution with unmatched precision.';
  const finalCtaBtn = finalCta.buttonText || 'Book a Technical Discovery Session';

  return (
    <div className="about-page">
      {/* ========================================================
          1. HERO SECTION: Sleek Glassmorphism & Visual Powerhouse
          ======================================================== */}
      <section className="about-hero-section">
        <div className="hero-ambient-glow"></div>
        <div className="hero-ambient-glow glow-secondary"></div>

        <div className="container hero-inner-grid">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="badge">
                <Sparkles size={14} /> {heroBadge}
              </span>
            </div>

            <h1 className="hero-title">
              {heroTitle}{' '}
              <span className="text-gradient">{heroTitleHighlight}</span>
            </h1>

            <p className="hero-lead">
              {heroLead}
            </p>

            <div className="hero-cta-group">
              <button onClick={onOpenDemoModal} className="btn btn-primary">
                <span>{heroPrimaryBtn}</span>
                <ArrowRight size={18} />
              </button>
              <a href="#founders" className="btn btn-secondary">
                <span>{heroSecondaryBtn}</span>
              </a>
            </div>

            {/* Quick Micro Badges */}
            <div className="hero-badges-list">
              {microBadges.map((badgeText, idx) => (
                <span key={idx} className="micro-badge">
                  <CheckCircle size={15} className="micro-badge-icon" /> {badgeText}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual-card">
            <div className="visual-image-wrapper">
              <img
                src={heroImage}
                alt="Black Grapes Softech Modern Tech Lab"
                className="hero-main-img"
              />
              <div className="visual-glass-overlay">
                <div className="floating-stat-box floating-elem">
                  <div className="stat-pill-icon">
                    <Rocket size={20} />
                  </div>
                  <div>
                    <span className="stat-pill-title">{floatingStat1Num}</span>
                    <span className="stat-pill-sub">{floatingStat1Sub}</span>
                  </div>
                </div>

                <div className="floating-stat-box box-bottom">
                  <div className="stat-pill-icon purple-icon">
                    <Globe size={20} />
                  </div>
                  <div>
                    <span className="stat-pill-title">{floatingStat2Num}</span>
                    <span className="stat-pill-sub">{floatingStat2Sub}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. KEY IMPACT METRICS BAR
          ======================================================== */}
      <section className="stats-strip-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="stat-card">
                  <div className="stat-icon-wrapper">
                    <Icon size={24} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-tag">{stat.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. VISION, MISSION & PHILOSOPHY (Interactive Bento Switcher)
          ======================================================== */}
      <section className="vision-mission-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-purple">
              <Target size={14} /> {vmBadge}
            </span>
            <h2 className="section-title">
              {vmTitle}
            </h2>
            <p className="section-subtitle">
              {vmSubtitle}
            </p>
          </div>

          {/* Interactive Navigation Pills */}
          <div className="tabs-nav-wrapper">
            <div className="tabs-nav-bar">
              <button
                className={`tab-btn ${activeTab === 'vision' ? 'active' : ''}`}
                onClick={() => setActiveTab('vision')}
              >
                <Lightbulb size={18} />
                <span>Our Vision</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
                onClick={() => setActiveTab('mission')}
              >
                <Rocket size={18} />
                <span>Our Mission</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'philosophy' ? 'active' : ''}`}
                onClick={() => setActiveTab('philosophy')}
              >
                <Code2 size={18} />
                <span>Our Philosophy</span>
              </button>
            </div>
          </div>

          {/* Interactive Tab Panels */}
          <div className="tab-content-area">
            {activeTab === 'vision' && (
              <div className="tab-pane glass-card animate-fade">
                <div className="tab-pane-grid">
                  <div className="tab-text-side">
                    <span className="tab-badge-accent">{visionData.tag}</span>
                    <h3 className="tab-heading">
                      {visionData.heading}{' '}
                      <span className="text-gradient">{visionData.headingHighlight}</span>
                    </h3>
                    <p className="tab-paragraph">
                      {visionData.p1}
                    </p>
                    <p className="tab-paragraph">
                      {visionData.p2}
                    </p>

                    <ul className="tab-points-list">
                      {visionData.points?.map((pt, pIdx) => (
                        <li key={pIdx}><CheckCircle size={18} className="text-orange" /> {pt}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="tab-visual-side">
                    <div className="quote-display-card">
                      <Quote size={40} className="quote-icon" />
                      <p className="quote-text">
                        {visionData.quote}
                      </p>
                      <span className="quote-author">{visionData.quoteAuthor}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="tab-pane glass-card animate-fade">
                <div className="tab-pane-grid">
                  <div className="tab-text-side">
                    <span className="tab-badge-accent">{missionData.tag}</span>
                    <h3 className="tab-heading">
                      {missionData.heading}{' '}
                      <span className="text-gradient">{missionData.headingHighlight}</span>
                    </h3>
                    <p className="tab-paragraph">
                      {missionData.p1}
                    </p>
                    <p className="tab-paragraph">
                      {missionData.p2}
                    </p>

                    <ul className="tab-points-list">
                      {missionData.points?.map((pt, pIdx) => (
                        <li key={pIdx}><CheckCircle size={18} className="text-orange" /> {pt}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="tab-visual-side">
                    <div className="quote-display-card quote-purple">
                      <Quote size={40} className="quote-icon" />
                      <p className="quote-text">
                        {missionData.quote}
                      </p>
                      <span className="quote-author">{missionData.quoteAuthor}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'philosophy' && (
              <div className="tab-pane glass-card animate-fade">
                <div className="tab-pane-grid">
                  <div className="tab-text-side">
                    <span className="tab-badge-accent">{philosophyData.tag}</span>
                    <h3 className="tab-heading">
                      {philosophyData.heading}{' '}
                      <span className="text-gradient">{philosophyData.headingHighlight}</span>
                    </h3>
                    <p className="tab-paragraph">
                      {philosophyData.p1}
                    </p>
                    <p className="tab-paragraph">
                      {philosophyData.p2}
                    </p>

                    <ul className="tab-points-list">
                      {philosophyData.points?.map((pt, pIdx) => (
                        <li key={pIdx}><CheckCircle size={18} className="text-orange" /> {pt}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="tab-visual-side">
                    <div className="quote-display-card quote-cyan">
                      <Quote size={40} className="quote-icon" />
                      <p className="quote-text">
                        {philosophyData.quote}
                      </p>
                      <span className="quote-author">{philosophyData.quoteAuthor}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. MEET THE FOUNDERS & LEADERSHIP
          ======================================================== */}
      <section id="founders" className="founders-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge">
              <Users size={14} /> {foundersBadge}
            </span>
            <h2 className="section-title">
              {foundersTitle}
            </h2>
            <p className="section-subtitle">
              {foundersSubtitle}
            </p>
          </div>

          <div className="founders-card-container">
            <div className="founders-main-card glass-card">
              <div className="founders-grid">
                {/* Founders Real Photo with Cyber Border */}
                <div className="founders-photo-wrap">
                  <div className="photo-frame">
                    <img
                      src={foundersPhoto}
                      alt="Mr. Arpit Jain and Mrs. Deepika Jain - Founders of Black Grapes Softech"
                      className="founders-img"
                    />
                    <div className="founders-photo-tag">
                      <span className="photo-tag-name">{photoTagName}</span>
                      <span className="photo-tag-role">{photoTagRole}</span>
                    </div>
                  </div>
                </div>

                {/* Founders Story and Profile */}
                <div className="founders-story-wrap">
                  <span className="badge badge-purple mb-3">EXECUTIVE LEADERSHIP</span>
                  <h3 className="founders-heading">
                    {foundersHeading}
                  </h3>

                  <p className="founders-text">
                    {foundersIntro}
                  </p>

                  <div className="leader-bio-block">
                    <div className="leader-bio-header">
                      <div className="leader-badge-dot"></div>
                      <h4 className="leader-name">{founder1Name}</h4>
                    </div>
                    <p className="leader-bio-p">
                      {founder1Bio}
                    </p>
                  </div>

                  <div className="leader-bio-block">
                    <div className="leader-bio-header">
                      <div className="leader-badge-dot purple"></div>
                      <h4 className="leader-name">{founder2Name}</h4>
                    </div>
                    <p className="leader-bio-p">
                      {founder2Bio}
                    </p>
                  </div>

                  <div className="founders-footer-cta">
                    <button onClick={onOpenDemoModal} className="btn btn-primary">
                      <span>Schedule a Discussion with Us</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. CORE VALUES (Interactive Cards Grid)
          ======================================================== */}
      <section className="values-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-purple">
              <Shield size={14} /> OUR CORE DNA
            </span>
            <h2 className="section-title">The Values That Fuel Our Work</h2>
            <p className="section-subtitle">
              Every decision we make, line of code we write, and system we deliver is guided by our core values.
            </p>
          </div>

          <div className="values-grid">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="value-card glass-card">
                  <div className="value-card-glow"></div>
                  <div className="value-icon-box">
                    <Icon size={26} />
                  </div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-desc">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. CAPABILITIES & TECHNOLOGICAL MASTERY
          ======================================================== */}
      <section className="domains-section">
        <div className="container">
          <div className="domains-box glass-card">
            <div className="domains-content">
              <span className="badge">
                <Cpu size={14} /> TECHNICAL EXPERTISE
              </span>
              <h2 className="domains-title">
                Versatile Engineering Across Critical Digital Domains
              </h2>
              <p className="domains-sub">
                Our team delivers custom solutions across complex enterprise requirements with precision and high performance.
              </p>
              <div className="domains-tags-grid">
                {techDomains.map((domain, idx) => (
                  <div key={idx} className="domain-tag-item">
                    <Layers size={16} className="text-orange" />
                    <span>{domain}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. OUR JOURNEY & TIMELINE
          ======================================================== */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-purple">
              <Clock size={14} /> OUR MILESTONES
            </span>
            <h2 className="section-title">A Decade of Relentless Evolution</h2>
            <p className="section-subtitle">
              From a dedicated local engineering hub in Indore to an internationally trusted software powerhouse.
            </p>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline-track-line"></div>
            <div className="timeline-events-grid">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="timeline-event-card glass-card">
                  <div className="timeline-year-badge">{milestone.year}</div>
                  <h3 className="timeline-card-title">{milestone.title}</h3>
                  <p className="timeline-card-desc">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. CULTURE & HEADQUARTERS
          ======================================================== */}
      <section className="hq-section">
        <div className="container">
          <div className="hq-grid">
            <div className="hq-image-box">
              <img
                src={cultureImage}
                alt="Black Grapes Softech Office & Engineering Culture"
                className="hq-img"
              />
              <div className="hq-location-tag">
                <Building2 size={16} className="text-orange" />
                <span>{cultureLocation}</span>
              </div>
            </div>

            <div className="hq-text-box">
              <span className="badge">
                <Building2 size={14} /> HEADQUARTERS & CULTURE
              </span>
              <h2 className="hq-title">
                {cultureTitle}
              </h2>
              <p className="hq-paragraph">
                {cultureP1}
              </p>
              <p className="hq-paragraph">
                {cultureP2}
              </p>

              <div className="hq-highlights-grid">
                <div className="hq-item">
                  <span className="hq-item-num">{stat1Num}</span>
                  <span className="hq-item-label">{stat1Label}</span>
                </div>
                <div className="hq-item">
                  <span className="hq-item-num">{stat2Num}</span>
                  <span className="hq-item-label">{stat2Label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. FINAL CALL TO ACTION
          ======================================================== */}
      <section className="about-final-cta">
        <div className="container">
          <div className="final-cta-banner">
            <div className="cta-ambient"></div>
            <h2 className="final-cta-heading">
              {finalCtaTitle}
            </h2>
            <p className="final-cta-text">
              {finalCtaText}
            </p>
            <div className="final-cta-buttons">
              <button onClick={onOpenDemoModal} className="btn btn-primary btn-glow">
                <span>{finalCtaBtn}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
