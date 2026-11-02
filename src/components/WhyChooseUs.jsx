import React, { useState, useEffect } from 'react';
import { WHY_CHOOSE_US, COMPANY_INFO } from '../data/siteData';
import { getPageSections } from '@backend/dataService.js';
import '../utils/realtimeSync';

export default function WhyChooseUs({ onOpenModal }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPageSections('home').then((sections) => {
      if (sections && sections.home_why_us) {
        setData(sections.home_why_us.content);
      }
    });

    const handleUpdate = (e) => {
      const detail = e.detail || {};
      if (detail.pageSlug === 'home' && detail.sections?.home_why_us) {
        setData(detail.sections.home_why_us.content);
      } else {
        getPageSections('home').then((sections) => {
          if (sections && sections.home_why_us) {
            setData(sections.home_why_us.content);
          }
        });
      }
    };

    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const badge = data?.badge || 'WHY CHOOSE US ?';
  const heading = data?.heading || 'Built On Security, Uncompromising Quality & Lifelong Relationships';
  const vision = data?.vision || WHY_CHOOSE_US.vision;
  const pillars = data?.pillars || WHY_CHOOSE_US.pillars;
  const stats = data?.stats || [
    { icon: '👥', number: COMPANY_INFO.clientsCount, name: 'Happy Clients' },
    { icon: '🚀', number: COMPANY_INFO.projectsCount, name: 'Projects Delivered' },
    { icon: '⚙️', number: COMPANY_INFO.servicesCount, name: 'Services & Modules' },
    { icon: '👨‍💻', number: COMPANY_INFO.teamMembersCount, name: 'Tech Wizards' }
  ];

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
            {heading}
          </h2>
          {vision && (
            <p className="vision-quote">
              &ldquo;{vision}&rdquo;
            </p>
          )}
        </div>

        {/* 3 Pillars Grid */}
        <div className="why-us-grid home-why-us-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="why-us-card home-why-us-card">
              <div className="why-us-img-container">
                <img
                  src={pillar.image}
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

                {pillar.points && pillar.points.length > 0 && (
                  <div className="pillar-points-list">
                    {pillar.points.map((pt, pIdx) => (
                      <div key={pIdx} className="pillar-point-item">
                        <span className="check-icon">✓</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Live Counters Banner */}
        <div className="counters-banner">
          {stats.map((stat, sIdx) => (
            <React.Fragment key={sIdx}>
              {sIdx > 0 && <div className="counter-divider"></div>}
              <div className="counter-card">
                <div className="counter-icon-wrap">{stat.icon}</div>
                <div className="counter-data">
                  <span className="counter-number">{stat.number}</span>
                  <span className="counter-name">{stat.name}</span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
