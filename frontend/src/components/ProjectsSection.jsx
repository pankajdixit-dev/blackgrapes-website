import React, { useState } from 'react';
import { useHomePage } from '@backend/useContent';
import { PROJECTS } from '../data/siteData';

export default function ProjectsSection({ onOpenModal }) {
  const { home } = useHomePage();
  const [activeFilter, setActiveFilter] = useState('All');

  const ps = home?.projectsSection || {};
  const badge = ps.badge || 'PORTFOLIO SHOWCASE';
  const titlePrefix = ps.titlePrefix !== undefined ? ps.titlePrefix : 'Our Projects & ';
  const titleHighlight = ps.titleHighlight !== undefined ? ps.titleHighlight : 'Proven Deliveries';
  const subtitle = ps.subtitle || 'Explore a selection of successful client products spanning web applications, iOS/Android apps, and eCommerce engines.';

  const projectList = (Array.isArray(ps.projects) && ps.projects.length > 0)
    ? ps.projects
    : PROJECTS;

  // Extract unique categories dynamically
  const uniqueCategories = Array.from(
    new Set(projectList.map((p) => p.category).filter(Boolean))
  );
  const categories = ['All', ...uniqueCategories];

  const currentFilter = categories.includes(activeFilter) ? activeFilter : 'All';

  const filteredProjects = currentFilter === 'All'
    ? projectList
    : projectList.filter((p) => p.category === currentFilter);

  const bottomCtaText = ps.bottomCta?.text || "Have a project in mind? Let's turn your concept into our next featured success story.";
  const bottomCtaBtn = ps.bottomCta?.btnText || "Start Your Project With Us";

  return (
    <section id="projects" className="section projects-section">
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
          <p className="section-subtitle">
            {subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="portfolio-filter-tabs">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? projectList.length
              : projectList.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                className={`portfolio-tab-btn ${currentFilter === cat ? 'tab-btn-active' : ''}`}
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
                <span className="project-status-dot">{proj.status || 'Live Production'}</span>
              </div>

              <div className="project-card-body">
                <span className="project-type-tag">{proj.type}</span>
                <h3 className="project-name">{proj.name}</h3>
                <p className="project-desc">{proj.desc}</p>
              </div>

              <div className="project-card-footer">
                {proj.url && proj.url !== '#' ? (
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
                    onClick={() => onOpenModal && onOpenModal(`Project Case: ${proj.name}`)}
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
                  onClick={() => onOpenModal && onOpenModal(`Similar solution to ${proj.name}`)}
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
            {bottomCtaText}
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onOpenModal && onOpenModal('New Project Inquiry')}
          >
            {bottomCtaBtn}
          </button>
        </div>
      </div>
    </section>
  );
}
