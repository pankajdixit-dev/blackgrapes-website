import React, { useState } from 'react';
import { PROJECTS } from '../data/siteData';

export default function ProjectsSection({ onOpenModal }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = [
    'All',
    'Website',
    'Android / IOS - Mobile Apps',
    'Web Apps',
    'E-Commerce'
  ];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="section-title">
            Our Projects & <span className="text-highlight">Proven Deliveries</span>
          </h2>
          <p className="section-subtitle">
            Explore a selection of successful client products spanning web applications, iOS/Android apps, and eCommerce engines.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="portfolio-filter-tabs">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? PROJECTS.length
              : PROJECTS.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                className={`portfolio-tab-btn ${activeFilter === cat ? 'tab-btn-active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                <span>{cat}</span>
                <span className="tab-count-pill">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((proj, idx) => (
            <div key={idx} className="project-card">
              <div className="project-card-top">
                <span className="project-category-badge">{proj.category}</span>
                <span className="project-status-dot">Live Production</span>
              </div>

              <div className="project-card-body">
                <span className="project-type-tag">{proj.type}</span>
                <h3 className="project-name">{proj.name}</h3>
                <p className="project-desc">{proj.desc}</p>
              </div>

              <div className="project-card-footer">
                {proj.url !== '#' ? (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-visit-link"
                  >
                    <span>Visit Live Site</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                ) : (
                  <button
                    type="button"
                    className="project-case-btn"
                    onClick={() => onOpenModal(`Project Case: ${proj.name}`)}
                  >
                    <span>View Case Info</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </button>
                )}

                <button
                  type="button"
                  className="project-inquire-icon"
                  title="Inquire about similar solution"
                  onClick={() => onOpenModal(`Similar solution to ${proj.name}`)}
                >
                  ⚡
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Bottom CTA */}
        <div className="portfolio-bottom-cta">
          <p className="portfolio-cta-text">
            Have a project in mind? Let's turn your concept into our next featured success story.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onOpenModal('New Project Inquiry')}
          >
            Start Your Project With Us
          </button>
        </div>
      </div>
    </section>
  );
}
