import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  Smartphone, 
  FileText, 
  Building2, 
  Cog, 
  Award, 
  Landmark, 
  TrendingUp, 
  Sparkles,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import '../styles/ServicesBranch.css';

export default function ServicesBranch({ onSelectService, onOpenInquiry }) {
  const [activeServiceId, setActiveServiceId] = useState('01');

  const leftServices = [
    {
      id: '01',
      number: 'SERVICE 01',
      tag: 'ENTERPRISE ERP',
      status: 'High Demand',
      title: 'Custom Enterprise Software & ERP',
      shortDesc: 'Multi-branch billing, inventory tracking & automation',
      icon: <Code2 size={24} />,
      category: 'softech',
      featured: true
    },
    {
      id: '02',
      number: 'SERVICE 02',
      tag: 'DIRECT SALES MATH',
      status: 'Specialized',
      title: 'Specialized MLM & Direct Sales',
      shortDesc: 'Binary, matrix & unilevel plans with auto-payouts',
      icon: <Sparkles size={24} />,
      category: 'softech',
      featured: true
    },
    {
      id: '03',
      number: 'SERVICE 03',
      tag: 'CLOUD NATIVE',
      status: 'Reactive API',
      title: 'Web & Cloud Platform Engineering',
      shortDesc: 'Next.js, high-speed customer portals & cloud APIs',
      icon: <Layers size={24} />,
      category: 'softech'
    },
    {
      id: '04',
      number: 'SERVICE 04',
      tag: 'MOBILE APPS',
      status: 'iOS & Android',
      title: 'Mobile App Engineering (iOS & Android)',
      shortDesc: 'React Native & Flutter apps with offline sync',
      icon: <Smartphone size={24} />,
      category: 'softech'
    },
    {
      id: '05',
      number: 'SERVICE 05',
      tag: 'E-PROCUREMENT',
      status: 'GeM Approved',
      title: 'Private Tender & Bid Management',
      shortDesc: 'GeM portal filing, technical bidding & DSC support',
      icon: <FileText size={24} />,
      category: 'softech'
    }
  ];

  const rightServices = [
    {
      id: '06',
      number: 'SERVICE 06',
      tag: 'BANK PANEL',
      status: 'IBBI Registered',
      title: 'Immovable Property & Asset Valuation',
      shortDesc: 'Bank panel approved, IBBI registered valuation',
      icon: <Building2 size={24} />,
      category: 'valuation',
      featured: true
    },
    {
      id: '07',
      number: 'SERVICE 07',
      tag: 'INDUSTRIAL AUDIT',
      status: 'TEV Feasibility',
      title: 'Plant, Machinery & Industrial Valuation',
      shortDesc: 'Technical depreciation audits & RUL modeling',
      icon: <Cog size={24} />,
      category: 'valuation'
    },
    {
      id: '08',
      number: 'SERVICE 08',
      tag: 'CHARTERED CE',
      status: 'Customs Clearance',
      title: 'Chartered Engineer (CE) Certifications',
      shortDesc: 'Customs EPCG clearance & TEV bank feasibility',
      icon: <Award size={24} />,
      category: 'valuation'
    },
    {
      id: '09',
      number: 'SERVICE 09',
      tag: 'GOVT SANCTION',
      status: 'Indore Authority',
      title: 'Municipal (Nagar Nigam) & IDA Sanctions',
      shortDesc: 'Indore Naksha Pass, lease renewals & regularizations',
      icon: <Landmark size={24} />,
      category: 'advisory',
      featured: true
    },
    {
      id: '10',
      number: 'SERVICE 10',
      tag: 'COMMERCIAL ASSETS',
      status: 'MPIDC Corridor',
      title: 'Commercial Real Estate & Land Aggregation',
      shortDesc: 'Prime corporate offices & MPIDC industrial plots',
      icon: <TrendingUp size={24} />,
      category: 'realestate'
    }
  ];

  // Canvas coordinates for 4 o'clock radial connection lines
  const hubX = 650;
  const hubY = 410;
  const hubRadius = 110;
  const leftX = 440;
  const rightX = 860;

  return (
    <section className="services-branch-section" id="network-hub">
      <div className="section-head text-center">
        <div className="hub-top-badge">
          <span className="live-dot-ping"></span>
          <span>LIVE ARCHITECTURAL MATRIX &bull; CENTRAL NETWORK</span>
        </div>
        <h2 className="section-title">
          Multi-Disciplinary <span className="gradient-gold-text">Engineering Ecosystem</span>
        </h2>
        <p className="section-desc">
          Connected directly from our Black Grapes core to specialized technological and statutory execution squads.
        </p>
      </div>

      <div className="services-branch-container">
        <div className="services-branch-layout">
          {/* SVG Canvas for Curving Connector Lines with Live Energy Particles */}
          <svg className="services-svg-canvas" viewBox="0 0 1300 820" preserveAspectRatio="none">
            <defs>
              <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b00" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffa500" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Left curved dashed connectors */}
            {leftServices.map((item, idx) => {
              const targetY = 70 + idx * 155;
              const angle = Math.atan2(targetY - hubY, leftX - hubX);
              const startX = hubX + hubRadius * Math.cos(angle);
              const startY = hubY + hubRadius * Math.sin(angle);
              const isActive = activeServiceId === item.id;
              const pathD = `M ${startX} ${startY} C ${startX - 70} ${startY}, ${leftX + 70} ${targetY}, ${leftX} ${targetY}`;

              return (
                <g key={`left-group-${idx}`}>
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isActive ? "url(#laserGrad)" : "rgba(255, 107, 0, 0.2)"}
                    strokeWidth={isActive ? "3" : "1.5"}
                    strokeDasharray={isActive ? "none" : "5 5"}
                    className={`branch-path ${isActive ? 'active-path' : ''}`}
                  />
                  {/* Endpoint Terminal Node */}
                  <circle
                    cx={leftX}
                    cy={targetY}
                    r={isActive ? 6 : 3.5}
                    fill={isActive ? "#ffffff" : "rgba(255, 107, 0, 0.5)"}
                    stroke="#ff6b00"
                    strokeWidth="2"
                    filter={isActive ? "drop-shadow(0 0 8px #ff6b00)" : "none"}
                  />
                  {/* Dynamic Energy Particle along active path */}
                  {isActive && (
                    <circle r="4.5" fill="#ffffff" stroke="#ff6b00" strokeWidth="2" filter="drop-shadow(0 0 8px #ff6b00)">
                      <animateMotion
                        path={pathD}
                        dur="1.4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Right curved dashed connectors */}
            {rightServices.map((item, idx) => {
              const targetY = 70 + idx * 155;
              const angle = Math.atan2(targetY - hubY, rightX - hubX);
              const startX = hubX + hubRadius * Math.cos(angle);
              const startY = hubY + hubRadius * Math.sin(angle);
              const isActive = activeServiceId === item.id;
              const pathD = `M ${startX} ${startY} C ${startX + 70} ${startY}, ${rightX - 70} ${targetY}, ${rightX} ${targetY}`;

              return (
                <g key={`right-group-${idx}`}>
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isActive ? "url(#laserGrad)" : "rgba(255, 107, 0, 0.2)"}
                    strokeWidth={isActive ? "3" : "1.5"}
                    strokeDasharray={isActive ? "none" : "5 5"}
                    className={`branch-path ${isActive ? 'active-path' : ''}`}
                  />
                  {/* Endpoint Terminal Node */}
                  <circle
                    cx={rightX}
                    cy={targetY}
                    r={isActive ? 6 : 3.5}
                    fill={isActive ? "#ffffff" : "rgba(255, 107, 0, 0.5)"}
                    stroke="#ff6b00"
                    strokeWidth="2"
                    filter={isActive ? "drop-shadow(0 0 8px #ff6b00)" : "none"}
                  />
                  {/* Dynamic Energy Particle along active path */}
                  {isActive && (
                    <circle r="4.5" fill="#ffffff" stroke="#ff6b00" strokeWidth="2" filter="drop-shadow(0 0 8px #ff6b00)">
                      <animateMotion
                        path={pathD}
                        dur="1.4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Left Column Services */}
          <div className="services-column-left">
            {leftServices.map((item) => (
              <div
                key={item.id}
                className={`service-pill-card ${activeServiceId === item.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveServiceId(item.id)}
                onClick={() => onSelectService && onSelectService(item.title)}
              >
                <div className="service-pill-icon">
                  {item.icon}
                </div>
                <div className="service-pill-content">
                  <div className="pill-meta-row">
                    <span className="pill-number">{item.number}</span>
                    <span className="pill-tag-badge">{item.tag}</span>
                  </div>
                  <h3 className="service-pill-title">{item.title}</h3>
                  <p className="service-pill-desc">{item.shortDesc}</p>
                </div>
                <div className="pill-arrow-indicator">
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>

          {/* Central Black Grapes Radar Hub */}
          <div className="services-center-hub">
            {/* Concentric pulsing radar wave rings */}
            <div className="hub-radar-ring ring-1"></div>
            <div className="hub-radar-ring ring-2"></div>
            <div className="hub-ambient-glow"></div>

            <div className="hub-inner-ring">
              <img 
                src="/images/black_grapes_emblem.jpg" 
                alt="Black Grapes Group Emblem" 
                className="hub-grapes-img"
              />
              <div className="hub-overlay-gradient"></div>
              <div className="hub-clock-face">
                <span className="hub-brand-name">BLACK GRAPES</span>
                <span className="hub-brand-tag">CENTRAL HUB</span>
                <div className="hub-time-display">PRECISION &bull; INNOVATION</div>
              </div>
            </div>
          </div>

          {/* Right Column Services */}
          <div className="services-column-right">
            {rightServices.map((item) => (
              <div
                key={item.id}
                className={`service-pill-card ${activeServiceId === item.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveServiceId(item.id)}
                onClick={() => onSelectService && onSelectService(item.title)}
              >
                <div className="service-pill-icon">
                  {item.icon}
                </div>
                <div className="service-pill-content">
                  <div className="pill-meta-row">
                    <span className="pill-number">{item.number}</span>
                    <span className="pill-tag-badge">{item.tag}</span>
                  </div>
                  <h3 className="service-pill-title">{item.title}</h3>
                  <p className="service-pill-desc">{item.shortDesc}</p>
                </div>
                <div className="pill-arrow-indicator">
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile helper notice */}
        <div className="branch-mobile-hint">
          <span className="live-dot-ping"></span>
          <span>Tap any capability card to view full architectural blueprint</span>
        </div>
      </div>
    </section>
  );
}
