import React from 'react';
import { WHY_CHOOSE_US, COMPANY_INFO } from '../data/siteData';

export default function WhyChooseUs({ onOpenModal }) {
  return (
    <section id="why-us" className="section why-us-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>WHY CHOOSE US ?</span>
          </div>
          <h2 className="section-title">
            Built On Security, Uncompromising Quality & <span className="text-highlight">Lifelong Relationships</span>
          </h2>
          <p className="vision-quote">
            &ldquo;{WHY_CHOOSE_US.vision}&rdquo;
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="why-us-grid">
          {WHY_CHOOSE_US.pillars.map((pillar, idx) => (
            <div key={idx} className="why-us-card">
              <div className="why-us-img-container">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="why-us-img"
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
                  {pillar.points.map((pt, pIdx) => (
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
              <span className="counter-number">{COMPANY_INFO.clientsCount}</span>
              <span className="counter-name">Happy Clients</span>
            </div>
          </div>

          <div className="counter-divider"></div>

          <div className="counter-card">
            <div className="counter-icon-wrap">🚀</div>
            <div className="counter-data">
              <span className="counter-number">{COMPANY_INFO.projectsCount}</span>
              <span className="counter-name">Projects Delivered</span>
            </div>
          </div>

          <div className="counter-divider"></div>

          <div className="counter-card">
            <div className="counter-icon-wrap">⚙️</div>
            <div className="counter-data">
              <span className="counter-number">{COMPANY_INFO.servicesCount}</span>
              <span className="counter-name">Services & Modules</span>
            </div>
          </div>

          <div className="counter-divider"></div>

          <div className="counter-card">
            <div className="counter-icon-wrap">👨‍💻</div>
            <div className="counter-data">
              <span className="counter-number">{COMPANY_INFO.teamMembersCount}</span>
              <span className="counter-name">Tech Wizards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
