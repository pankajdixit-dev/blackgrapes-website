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
import { usePageSections } from '@backend/useContent';
import foundersImg from '../../assets/founders.jpg';
import aboutHeroImg from '../../assets/about-hero.jpg';
import workspaceImg from '../../assets/workspace.jpg';
import './About.css';

const DEFAULT_STATS = [
  { number: '10+', label: 'Years of Innovation', highlight: 'Since 2014' },
  { number: '250+', label: 'Projects Completed', highlight: 'Global Scale' },
  { number: '150+', label: 'Satisfied Clients', highlight: '15+ Countries' },
  { number: '99%', label: 'Client Retention', highlight: 'Industry Best' }
];

const STAT_ICONS = [Calendar, Code2, Users, Award];

const DEFAULT_CORE_VALUES = [
  {
    title: 'Innovation-First Mindset',
    desc: 'We explore modern architectures and pioneering technologies to give our clients an unbeatable competitive advantage.'
  },
  {
    title: 'Uncompromised Quality',
    desc: 'Every piece of code is rigorously tested, clean, documented, and built to scale effortlessly under intense enterprise load.'
  },
  {
    title: 'Agile & Rapid Delivery',
    desc: 'Short iterative sprints, continuous feedback loops, and transparent milestones ensure on-time and on-budget delivery.'
  },
  {
    title: 'Client-Centric Synergy',
    desc: 'We do not view ourselves merely as vendors; we act as dedicated tech co-founders and growth partners in your journey.'
  }
];

const VALUE_ICONS = [Lightbulb, Shield, Zap, Users];

const DEFAULT_MILESTONES = [
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

const DEFAULT_TECH_DOMAINS = [
  'CRM Software Systems',
  'MLM Architecture',
  'Full-Stack Web Apps',
  'iOS & Android Native/Flutter',
  'Cloud & DevOps (AWS/Azure)',
  'UI/UX Design Systems',
  'Enterprise ERP Solutions',
  'Interactive Game Development'
];

export default function About({ onOpenDemoModal }) {
  const [activeTab, setActiveTab] = useState('vision');
  const { sections } = usePageSections('about');

  // Extract Dynamic Section Contents from Database (page_sections)
  const heroSec = sections?.about_hero?.content || {};
  const statsSec = sections?.stats_strip?.content || {};
  const visionMissionSec = sections?.vision_mission?.content || {};
  const foundersSec = sections?.founders?.content || {};
  const coreValuesSec = sections?.core_values?.content || {};
  const techSec = sections?.technical_expertise?.content || {};
  const milestonesSec = sections?.milestones?.content || {};
  const cultureSec = sections?.culture_hq?.content || {};
  const finalCtaSec = sections?.final_cta?.content || {};

  // 1. Hero Content
  const heroBadge = heroSec.badge || 'ABOUT BLACK GRAPES SOFTECH';
  const heroTitle = heroSec.title || 'We Don’t Just Write Code —';
  const heroTitleHighlight = heroSec.titleHighlight || 'We Engineer The Digital Future.';
  const heroLead = heroSec.lead || 'Headquartered in Indore, India, Black Grapes Softech is a premier software engineering & digital transformation agency. We translate complex business hurdles into elegant, high-impact digital products.';
  const heroPrimaryBtn = heroSec.primaryBtnText || 'Partner With Us';
  const heroSecondaryBtn = heroSec.secondaryBtnText || 'Meet Our Leadership';
  const heroSecondaryLink = heroSec.secondaryBtnLink || '#founders';
  const heroImage = heroSec.image || aboutHeroImg;
  const floatingStat1Num = heroSec.floatingStat1Num || '250+ Projects';
  const floatingStat1Sub = heroSec.floatingStat1Sub || 'Shipped Globally';
  const floatingStat2Num = heroSec.floatingStat2Num || '15+ Nations';
  const floatingStat2Sub = heroSec.floatingStat2Sub || 'Active Client Base';
  const microBadges = (Array.isArray(heroSec.microBadges) && heroSec.microBadges.length > 0)
    ? heroSec.microBadges
    : ['Certified Developers', 'Full Cycle Development', '24/7 Dedicated Support'];

  // 2. Stats Strip
  const statsList = (Array.isArray(statsSec.stats) && statsSec.stats.length > 0)
    ? statsSec.stats
    : DEFAULT_STATS;

  // 3. Vision & Mission
  const vmBadge = visionMissionSec.badge || 'PURPOSE & PRINCIPLES';
  const vmTitle = visionMissionSec.title || 'The Guiding Pillars Behind Our Growth';
  const vmSubtitle = visionMissionSec.subtitle || 'Every system we engineer is backed by our relentless commitment to excellence and transformative technology.';
  const vision = visionMissionSec.vision || {};
  const mission = visionMissionSec.mission || {};
  const philosophy = visionMissionSec.philosophy || {};

  // 4. Founders
  const foundersBadge = foundersSec.badge || 'LEADERSHIP & VISION';
  const foundersTitle = foundersSec.title || 'Meet the Visionaries Behind Black Grapes';
  const foundersSubtitle = foundersSec.subtitle || 'Passionate innovators dedicated to redefining software engineering standards.';
  const foundersPhoto = foundersSec.photo || foundersImg;
  const photoTagName = foundersSec.photoTagName || 'Mr. Arpit Jain & Mrs. Deepika Jain';
  const photoTagRole = foundersSec.photoTagRole || 'Founders & Executive Directors';
  const foundersExecBadge = foundersSec.execBadge || 'EXECUTIVE LEADERSHIP';
  const foundersHeading = foundersSec.heading || 'Driven By Innovation, Grounded In Excellence';
  const foundersIntro = foundersSec.intro || 'Behind Black Grapes Softech stand two visionary leaders with an unquenchable passion for digital advancement.';
  const founder1Name = foundersSec.founder1Name || 'Mr. Arpit Jain — Founder & Chief Architect';
  const founder1Bio = foundersSec.founder1Bio || 'The driving force behind our software development journey. With a wealth of architectural experience and an instinctive knack for staying ahead of technological curves, he has pioneered cutting-edge solutions that have redefined client operations across industries.';
  const founder2Name = foundersSec.founder2Name || 'Mrs. Deepika Jain — Co-Founder & Strategic Director';
  const founder2Bio = foundersSec.founder2Bio || 'Deepika Jain doesn’t just see challenges; she envisions opportunities. Her boundless creativity, strategic acumen, and people-first leadership have shaped our company’s culture of relentless innovation and customer delight.';
  const foundersCtaText = foundersSec.ctaText || 'Schedule a Discussion with Us';

  // 5. Core Values
  const cvBadge = coreValuesSec.badge || 'OUR CORE DNA';
  const cvTitle = coreValuesSec.title || 'The Values That Fuel Our Work';
  const cvSubtitle = coreValuesSec.subtitle || 'Every decision we make, line of code we write, and system we deliver is guided by our core values.';
  const coreValuesList = (Array.isArray(coreValuesSec.values) && coreValuesSec.values.length > 0)
    ? coreValuesSec.values
    : DEFAULT_CORE_VALUES;

  // 6. Tech Expertise
  const techBadge = techSec.badge || 'TECHNICAL EXPERTISE';
  const techTitle = techSec.title || 'Versatile Engineering Across Critical Digital Domains';
  const techSubtitle = techSec.subtitle || 'Our team delivers custom solutions across complex enterprise requirements with precision and high performance.';
  const techDomainsList = (Array.isArray(techSec.domains) && techSec.domains.length > 0)
    ? techSec.domains
    : DEFAULT_TECH_DOMAINS;

  // 7. Milestones
  const msBadge = milestonesSec.badge || 'OUR MILESTONES';
  const msTitle = milestonesSec.title || 'A Decade of Relentless Evolution';
  const msSubtitle = milestonesSec.subtitle || 'From a dedicated local engineering hub in Indore to an internationally trusted software powerhouse.';
  const milestonesList = (Array.isArray(milestonesSec.milestones) && milestonesSec.milestones.length > 0)
    ? milestonesSec.milestones
    : DEFAULT_MILESTONES;

  // 8. Culture & HQ
  const hqBadge = cultureSec.badge || 'HEADQUARTERS & CULTURE';
  const hqTitle = cultureSec.title || 'Where Passionate Technologists Thrive';
  const hqImage = cultureSec.image || workspaceImg;
  const hqLocation = cultureSec.locationTag || 'Indore Tech Hub — Madhya Pradesh, India';
  const hqP1 = cultureSec.p1 || 'Situated at 252-F/H Scheme No 54, Vijaynagar, Indore, our software development center is where bold ideas turn into robust reality.';
  const hqP2 = cultureSec.p2 || 'We cultivate an open culture of perpetual learning, deep code reviews, creative freedom, and rigorous problem-solving. This energetic environment inspires our engineers to push boundaries and build applications that inspire.';
  const hqStat1Num = cultureSec.stat1Num || '50+';
  const hqStat1Label = cultureSec.stat1Label || 'In-House Engineers & Designers';
  const hqStat2Num = cultureSec.stat2Num || '100%';
  const hqStat2Label = cultureSec.stat2Label || 'Code Quality & Transparency';

  // 9. Final CTA
  const ctaTitle = finalCtaSec.title || 'Ready to Accelerate Your Business With Custom Tech?';
  const ctaText = finalCtaSec.text || "Speak directly with our technical leadership. Let's design, engineer, and deploy your software solution with unmatched precision.";
  const ctaButtonText = finalCtaSec.buttonText || 'Book a Technical Discovery Session';

  return (
    <div className="about-page">
      {/* ========================================================
          1. HERO SECTION: Dynamic Glassmorphism Hero
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
              <a href={heroSecondaryLink} className="btn btn-secondary">
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
            {statsList.map((stat, idx) => {
              const Icon = STAT_ICONS[idx % STAT_ICONS.length] || Calendar;
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
                    <span className="tab-badge-accent">{vision.tag || 'Strategic Vision'}</span>
                    <h3 className="tab-heading">
                      {vision.heading || 'Empowering Tomorrow Through'}{' '}
                      <span className="text-gradient">{vision.headingHighlight || 'Innovative Code'}</span>
                    </h3>
                    <p className="tab-paragraph">
                      {vision.p1 || 'At Black Grapes Softech, our vision is to lead the way in software development, using innovation and creativity to shape the future of technology.'}
                    </p>
                    <p className="tab-paragraph">
                      {vision.p2 || 'We envision a world where every software solution we architect empowers individuals, businesses, and communities to thrive, automate, and excel in the digital-first economy.'}
                    </p>

                    <ul className="tab-points-list">
                      {(vision.points || [
                        'Pioneering intelligent, scalable cloud and web infrastructures.',
                        'Cultivating technological self-reliance and commercial success for clients.',
                        'Constantly innovating ahead of emerging market trends.'
                      ]).map((pt, pIdx) => (
                        <li key={pIdx}>
                          <CheckCircle size={18} className="text-orange" /> {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="tab-visual-side">
                    <div className="quote-display-card">
                      <Quote size={40} className="quote-icon" />
                      <p className="quote-text">
                        {vision.quote || '"Technology should not just automate tasks; it should multiply human potential and drive real-world transformation."'}
                      </p>
                      <span className="quote-author">{vision.quoteAuthor || '— Black Grapes Softech Leadership'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="tab-pane glass-card animate-fade">
                <div className="tab-pane-grid">
                  <div className="tab-text-side">
                    <span className="tab-badge-accent">{mission.tag || 'Execution & Commitment'}</span>
                    <h3 className="tab-heading">
                      {mission.heading || 'Crafting Excellence,'}{' '}
                      <span className="text-gradient">{mission.headingHighlight || 'One Line of Code at a Time'}</span>
                    </h3>
                    <p className="tab-paragraph">
                      {mission.p1 || 'Our mission is to provide exceptional software development services tailored to our clients’ unique business requirements. We are dedicated to delivering top-notch, cutting-edge solutions while fostering a culture of collaboration, growth, and continuous innovation.'}
                    </p>
                    <p className="tab-paragraph">
                      {mission.p2 || 'At Black Grapes Softech, we don’t just write code; we build the solid architectural foundation for a better, smarter, and more connected digital world.'}
                    </p>

                    <ul className="tab-points-list">
                      {(mission.points || [
                        'High-velocity development with bulletproof security & QA.',
                        'Transparent communication and milestone visibility at all times.',
                        'Tailored solutions engineered precisely for client ROI.'
                      ]).map((pt, pIdx) => (
                        <li key={pIdx}>
                          <CheckCircle size={18} className="text-orange" /> {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="tab-visual-side">
                    <div className="quote-display-card quote-purple">
                      <Quote size={40} className="quote-icon" />
                      <p className="quote-text">
                        {mission.quote || '"We don’t settle for \'good enough\'. We build digital products designed to dominate their industry."'}
                      </p>
                      <span className="quote-author">{mission.quoteAuthor || '— Engineering Philosophy'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'philosophy' && (
              <div className="tab-pane glass-card animate-fade">
                <div className="tab-pane-grid">
                  <div className="tab-text-side">
                    <span className="tab-badge-accent">{philosophy.tag || 'Architectural Integrity'}</span>
                    <h3 className="tab-heading">
                      {philosophy.heading || 'Engineering For'}{' '}
                      <span className="text-gradient">{philosophy.headingHighlight || 'Infinite Scale & Speed'}</span>
                    </h3>
                    <p className="tab-paragraph">
                      {philosophy.p1 || "Software isn't merely lines of script — it is the digital nervous system of your business. Our philosophy emphasizes clean code, microservices scalability, robust security protocols, and human-centered design."}
                    </p>
                    <p className="tab-paragraph">
                      {philosophy.p2 || 'Whether developing custom MLM platforms, enterprise CRM systems, or high-throughput SaaS engines, our engineering principles guarantee longevity and seamless scalability.'}
                    </p>

                    <ul className="tab-points-list">
                      {(philosophy.points || [
                        'Modularity and maintainability baked in from Day 1.',
                        'Lightning-fast user interfaces with modern reactive frameworks.',
                        'Zero technical debt tolerance through strict code reviews.'
                      ]).map((pt, pIdx) => (
                        <li key={pIdx}>
                          <CheckCircle size={18} className="text-orange" /> {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="tab-visual-side">
                    <div className="quote-display-card quote-cyan">
                      <Quote size={40} className="quote-icon" />
                      <p className="quote-text">
                        {philosophy.quote || '"Great code is invisible; what users experience is flawless speed, intuition, and undeniable value."'}
                      </p>
                      <span className="quote-author">{philosophy.quoteAuthor || '— Core Tech Standard'}</span>
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
                {/* Founders Photo with Cyber Border */}
                <div className="founders-photo-wrap">
                  <div className="photo-frame">
                    <img
                      src={foundersPhoto}
                      alt={photoTagName}
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
                  <span className="badge badge-purple mb-3">{foundersExecBadge}</span>
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
                      <span>{foundersCtaText}</span>
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
              <Shield size={14} /> {cvBadge}
            </span>
            <h2 className="section-title">{cvTitle}</h2>
            <p className="section-subtitle">
              {cvSubtitle}
            </p>
          </div>

          <div className="values-grid">
            {coreValuesList.map((value, idx) => {
              const Icon = VALUE_ICONS[idx % VALUE_ICONS.length] || Lightbulb;
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
                <Cpu size={14} /> {techBadge}
              </span>
              <h2 className="domains-title">
                {techTitle}
              </h2>
              <p className="domains-sub">
                {techSubtitle}
              </p>
              <div className="domains-tags-grid">
                {techDomainsList.map((domain, idx) => (
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
              <Clock size={14} /> {msBadge}
            </span>
            <h2 className="section-title">{msTitle}</h2>
            <p className="section-subtitle">
              {msSubtitle}
            </p>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline-track-line"></div>
            <div className="timeline-events-grid">
              {milestonesList.map((milestone, idx) => (
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
                src={hqImage}
                alt="Black Grapes Softech Headquarters"
                className="hq-img"
              />
              <div className="hq-location-tag">
                <Building2 size={16} className="text-orange" />
                <span>{hqLocation}</span>
              </div>
            </div>

            <div className="hq-text-box">
              <span className="badge badge-purple">
                <Sparkles size={14} /> {hqBadge}
              </span>
              <h2 className="hq-title">{hqTitle}</h2>
              <p className="hq-paragraph">{hqP1}</p>
              <p className="hq-paragraph">{hqP2}</p>

              <div className="hq-highlights-grid">
                <div className="hq-item">
                  <span className="hq-item-num">{hqStat1Num}</span>
                  <span className="hq-item-label">{hqStat1Label}</span>
                </div>
                <div className="hq-item">
                  <span className="hq-item-num">{hqStat1Num ? hqStat2Num : '100%'}</span>
                  <span className="hq-item-label">{hqStat2Label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. FINAL CALL TO ACTION BANNER
          ======================================================== */}
      <section className="about-final-cta">
        <div className="container">
          <div className="final-cta-banner">
            <div className="cta-ambient"></div>
            <h2 className="final-cta-heading">{ctaTitle}</h2>
            <p className="final-cta-text">{ctaText}</p>
            <div className="final-cta-buttons">
              <button onClick={onOpenDemoModal} className="btn btn-primary btn-xl">
                <span>{ctaButtonText}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
