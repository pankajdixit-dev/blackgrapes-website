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
import './About.css';

export default function About({ onOpenDemoModal }) {
  // Active tab state for Mission/Vision/Philosophy interactive viewer
  const [activeTab, setActiveTab] = useState('vision');

  const stats = [
    { number: '10+', label: 'Years of Innovation', icon: Calendar, highlight: 'Since 2014' },
    { number: '250+', label: 'Projects Completed', icon: Code2, highlight: 'Global Scale' },
    { number: '150+', label: 'Satisfied Clients', icon: Users, highlight: '15+ Countries' },
    { number: '99%', label: 'Client Retention', icon: Award, highlight: 'Industry Best' }
  ];

  const coreValues = [
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

  const milestones = [
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

  const techDomains = [
    'CRM Software Systems',
    'MLM Architecture',
    'Full-Stack Web Apps',
    'iOS & Android Native/Flutter',
    'Cloud & DevOps (AWS/Azure)',
    'UI/UX Design Systems',
    'Enterprise ERP Solutions',
    'Interactive Game Development'
  ];

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
                <Sparkles size={14} /> ABOUT BLACK GRAPES SOFTECH
              </span>
            </div>

            <h1 className="hero-title">
              We Don’t Just Write Code —{' '}
              <span className="text-gradient">We Engineer The Digital Future.</span>
            </h1>

            <p className="hero-lead">
              Headquartered in Indore, India, <strong>Black Grapes Softech</strong> is a premier software engineering & digital transformation agency. We translate complex business hurdles into elegant, high-impact digital products.
            </p>

            <div className="hero-cta-group">
              <button onClick={onOpenDemoModal} className="btn btn-primary">
                <span>Partner With Us</span>
                <ArrowRight size={18} />
              </button>
              <a href="#founders" className="btn btn-secondary">
                <span>Meet Our Leadership</span>
              </a>
            </div>

            {/* Quick Micro Badges */}
            <div className="hero-badges-list">
              <span className="micro-badge">
                <CheckCircle size={15} className="micro-badge-icon" /> Certified Developers
              </span>
              <span className="micro-badge">
                <CheckCircle size={15} className="micro-badge-icon" /> Full Cycle Development
              </span>
              <span className="micro-badge">
                <CheckCircle size={15} className="micro-badge-icon" /> 24/7 Dedicated Support
              </span>
            </div>
          </div>

          <div className="hero-visual-card">
            <div className="visual-image-wrapper">
              <img
                src={aboutHeroImg}
                alt="Black Grapes Softech Modern Tech Lab"
                className="hero-main-img"
              />
              <div className="visual-glass-overlay">
                <div className="floating-stat-box floating-elem">
                  <div className="stat-pill-icon">
                    <Rocket size={20} />
                  </div>
                  <div>
                    <span className="stat-pill-title">250+ Projects</span>
                    <span className="stat-pill-sub">Shipped Globally</span>
                  </div>
                </div>

                <div className="floating-stat-box box-bottom">
                  <div className="stat-pill-icon purple-icon">
                    <Globe size={20} />
                  </div>
                  <div>
                    <span className="stat-pill-title">15+ Nations</span>
                    <span className="stat-pill-sub">Active Client Base</span>
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
              <Target size={14} /> PURPOSE & PRINCIPLES
            </span>
            <h2 className="section-title">
              The Guiding Pillars Behind Our Growth
            </h2>
            <p className="section-subtitle">
              Every system we engineer is backed by our relentless commitment to excellence and transformative technology.
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
                    <span className="tab-badge-accent">Strategic Vision</span>
                    <h3 className="tab-heading">
                      Empowering Tomorrow Through <span className="text-gradient">Innovative Code</span>
                    </h3>
                    <p className="tab-paragraph">
                      At <strong>Black Grapes Softech</strong>, our vision is to lead the way in software development, using innovation and creativity to shape the future of technology.
                    </p>
                    <p className="tab-paragraph">
                      We envision a world where every software solution we architect empowers individuals, businesses, and communities to thrive, automate, and excel in the digital-first economy.
                    </p>

                    <ul className="tab-points-list">
                      <li><CheckCircle size={18} className="text-orange" /> Pioneering intelligent, scalable cloud and web infrastructures.</li>
                      <li><CheckCircle size={18} className="text-orange" /> Cultivating technological self-reliance and commercial success for clients.</li>
                      <li><CheckCircle size={18} className="text-orange" /> Constantly innovating ahead of emerging market trends.</li>
                    </ul>
                  </div>

                  <div className="tab-visual-side">
                    <div className="quote-display-card">
                      <Quote size={40} className="quote-icon" />
                      <p className="quote-text">
                        "Technology should not just automate tasks; it should multiply human potential and drive real-world transformation."
                      </p>
                      <span className="quote-author">— Black Grapes Softech Leadership</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="tab-pane glass-card animate-fade">
                <div className="tab-pane-grid">
                  <div className="tab-text-side">
                    <span className="tab-badge-accent">Execution & Commitment</span>
                    <h3 className="tab-heading">
                      Crafting Excellence, <span className="text-gradient">One Line of Code at a Time</span>
                    </h3>
                    <p className="tab-paragraph">
                      Our mission is to provide exceptional software development services tailored to our clients’ unique business requirements. We are dedicated to delivering top-notch, cutting-edge solutions while fostering a culture of collaboration, growth, and continuous innovation.
                    </p>
                    <p className="tab-paragraph">
                      At Black Grapes Softech, we don’t just write code; we build the solid architectural foundation for a better, smarter, and more connected digital world.
                    </p>

                    <ul className="tab-points-list">
                      <li><CheckCircle size={18} className="text-orange" /> High-velocity development with bulletproof security & QA.</li>
                      <li><CheckCircle size={18} className="text-orange" /> Transparent communication and milestone visibility at all times.</li>
                      <li><CheckCircle size={18} className="text-orange" /> Tailored solutions engineered precisely for client ROI.</li>
                    </ul>
                  </div>

                  <div className="tab-visual-side">
                    <div className="quote-display-card quote-purple">
                      <Quote size={40} className="quote-icon" />
                      <p className="quote-text">
                        "We don’t settle for 'good enough'. We build digital products designed to dominate their industry."
                      </p>
                      <span className="quote-author">— Engineering Philosophy</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'philosophy' && (
              <div className="tab-pane glass-card animate-fade">
                <div className="tab-pane-grid">
                  <div className="tab-text-side">
                    <span className="tab-badge-accent">Architectural Integrity</span>
                    <h3 className="tab-heading">
                      Engineering For <span className="text-gradient">Infinite Scale & Speed</span>
                    </h3>
                    <p className="tab-paragraph">
                      Software isn't merely lines of script — it is the digital nervous system of your business. Our philosophy emphasizes clean code, microservices scalability, robust security protocols, and human-centered design.
                    </p>
                    <p className="tab-paragraph">
                      Whether developing custom MLM platforms, enterprise CRM systems, or high-throughput SaaS engines, our engineering principles guarantee longevity and seamless scalability.
                    </p>

                    <ul className="tab-points-list">
                      <li><CheckCircle size={18} className="text-orange" /> Modularity and maintainability baked in from Day 1.</li>
                      <li><CheckCircle size={18} className="text-orange" /> Lightning-fast user interfaces with modern reactive frameworks.</li>
                      <li><CheckCircle size={18} className="text-orange" /> Zero technical debt tolerance through strict code reviews.</li>
                    </ul>
                  </div>

                  <div className="tab-visual-side">
                    <div className="quote-display-card quote-cyan">
                      <Quote size={40} className="quote-icon" />
                      <p className="quote-text">
                        "Great code is invisible; what users experience is flawless speed, intuition, and undeniable value."
                      </p>
                      <span className="quote-author">— Core Tech Standard</span>
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
              <Users size={14} /> LEADERSHIP & VISION
            </span>
            <h2 className="section-title">
              Meet the Visionaries Behind Black Grapes
            </h2>
            <p className="section-subtitle">
              Passionate innovators dedicated to redefining software engineering standards.
            </p>
          </div>

          <div className="founders-card-container">
            <div className="founders-main-card glass-card">
              <div className="founders-grid">
                {/* Founders Real Photo with Cyber Border */}
                <div className="founders-photo-wrap">
                  <div className="photo-frame">
                    <img
                      src={foundersImg}
                      alt="Mr. Arpit Jain and Mrs. Deepika Jain - Founders of Black Grapes Softech"
                      className="founders-img"
                    />
                    <div className="founders-photo-tag">
                      <span className="photo-tag-name">Mr. Arpit Jain & Mrs. Deepika Jain</span>
                      <span className="photo-tag-role">Founders & Executive Directors</span>
                    </div>
                  </div>
                </div>

                {/* Founders Story and Profile */}
                <div className="founders-story-wrap">
                  <span className="badge badge-purple mb-3">EXECUTIVE LEADERSHIP</span>
                  <h3 className="founders-heading">
                    Driven By Innovation, Grounded In Excellence
                  </h3>

                  <p className="founders-text">
                    Behind <strong>Black Grapes Softech</strong> stand two visionary leaders with an unquenchable passion for digital advancement.
                  </p>

                  <div className="leader-bio-block">
                    <div className="leader-bio-header">
                      <div className="leader-badge-dot"></div>
                      <h4 className="leader-name">Mr. Arpit Jain — <span className="leader-title">Founder & Chief Architect</span></h4>
                    </div>
                    <p className="leader-bio-p">
                      The driving force behind our software development journey. With a wealth of architectural experience and an instinctive knack for staying ahead of technological curves, he has pioneered cutting-edge solutions that have redefined client operations across industries.
                    </p>
                  </div>

                  <div className="leader-bio-block">
                    <div className="leader-bio-header">
                      <div className="leader-badge-dot purple"></div>
                      <h4 className="leader-name">Mrs. Deepika Jain — <span className="leader-title">Co-Founder & Strategic Director</span></h4>
                    </div>
                    <p className="leader-bio-p">
                      Deepika Jain doesn’t just see challenges; she envisions opportunities. Her boundless creativity, strategic acumen, and people-first leadership have shaped our company’s culture of relentless innovation and customer delight.
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

      

      
    </div>
  );
}
