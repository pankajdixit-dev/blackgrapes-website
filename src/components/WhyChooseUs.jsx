import React from 'react';
import { WHY_CHOOSE_US, COMPANY_INFO } from '../data/siteData';
import { useHomePage } from '@backend/useContent';

export default function WhyChooseUs({ onOpenModal }) {
  const { home } = useHomePage();
  const wcu = home?.whyChooseUs || {};

  const badge = wcu.badge || 'WHY CHOOSE US ?';
  const titlePrefix = wcu.titlePrefix !== undefined ? wcu.titlePrefix : 'Built On Security, Uncompromising Quality & ';
  const titleHighlight = wcu.titleHighlight || 'Lifelong Relationships';
  const visionQuote = wcu.visionQuote || WHY_CHOOSE_US.vision;
  const pillars = wcu.pillars && wcu.pillars.length > 0 ? wcu.pillars : WHY_CHOOSE_US.pillars;

  const clientsCount = wcu.clientsCount || COMPANY_INFO.clientsCount;
  const projectsCount = wcu.projectsCount || COMPANY_INFO.projectsCount;
  const servicesCount = COMPANY_INFO.servicesCount;
  const teamCount = COMPANY_INFO.teamMembersCount;

  return (
    <section id="why-us" className="section why-us-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>{badge}</span>
          </div>
          <h2 className="section-title">
            {titlePrefix}<span className="text-highlight">{titleHighlight}</span>
          </h2>
          <p className="vision-quote">
            &ldquo;{visionQuote}&rdquo;
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="why-us-grid home-why-us-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="why-us-card home-why-us-card">
              <div className="why-us-img-container">
                <img
                  src={pillar.image || `/images/${idx === 0 ? 'Security-1.jpg' : idx === 1 ? 'quality.jpg' : 'good-business-relationship-2.jpg'}`}
                  alt={pillar.title}
                  className={`why-us-img why-us-img-${idx + 1}`}
                  loading="lazy"
                />
                <div className="why-us-img-gradient"></div>
                <div className="pillar-number">0{idx + 1}</div>
              </div>

              <div className="why-us-card-body">
                <span className="pillar-subtitle">{pillar.subtitle}</span>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-description">{pillar.description}</p>

                <div className="pillar-points-list">
                  {(pillar.points || []).map((pt, pIdx) => (
                    <div key={pIdx} className="pillar-point-item">
                      <span className="check-icon">✓</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Counters Banner */}
        <div className="counters-banner">
          <div className="counter-card">
            <div className="counter-icon-wrap">👥</div>
            <div className="counter-data">
              <span className="counter-number">{clientsCount}</span>
              <span className="counter-name">Happy Clients</span>
            </div>
          </div>

          <div className="counter-divider"></div>

          <div className="counter-card">
            <div className="counter-icon-wrap">🚀</div>
            <div className="counter-data">
              <span className="counter-number">{projectsCount}</span>
              <span className="counter-name">Projects Delivered</span>
            </div>
          </div>

          <div className="counter-divider"></div>

          <div className="counter-card">
            <div className="counter-icon-wrap">⚙️</div>
            <div className="counter-data">
              <span className="counter-number">{servicesCount}</span>
              <span className="counter-name">Services & Modules</span>
            </div>
          </div>

          <div className="counter-divider"></div>

          <div className="counter-card">
            <div className="counter-icon-wrap">👨‍💻</div>
            <div className="counter-data">
              <span className="counter-number">{teamCount}</span>
              <span className="counter-name">Tech Wizards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
