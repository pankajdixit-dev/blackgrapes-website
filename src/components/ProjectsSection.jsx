import React, { useState, useEffect } from 'react';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/siteData';
import { getProjects } from '@backend/dataService.js';
import '../utils/realtimeSync';

export default function ProjectsSection({ onOpenModal }) {
  const [projectsList, setProjectsList] = useState(DEFAULT_PROJECTS || []);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = () => {
      getProjects()
        .then((data) => {
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setProjectsList(data);
          }
        })
        .catch(() => {});
    };

    fetchProjects();
    window.addEventListener('bgst_content_updated', fetchProjects);
    return () => {
      isMounted = false;
      window.removeEventListener('bgst_content_updated', fetchProjects);
    };
  }, []);

  const categories = [
    'All',
    'Website',
    'Android / IOS - Mobile Apps',
    'Web Apps',
    'E-Commerce'
  ];

  const safeList = Array.isArray(projectsList) && projectsList.length > 0 ? projectsList : (DEFAULT_PROJECTS || []);

  const matchesCategory = (item, catName) => {
    if (catName === 'All') return true;
    const cat = (item.category || '').toLowerCase();
    const target = catName.toLowerCase();
    if (cat === target) return true;
    if (target.includes('mobile') && (cat.includes('android') || cat.includes('ios') || cat.includes('mobile') || cat.includes('app'))) return true;
    if (target.includes('e-commerce') && cat.includes('commerce')) return true;
    if (target.includes('web apps') && (cat.includes('web app') || cat.includes('portal') || cat.includes('cloud'))) return true;
    if (target.includes('website') && cat.includes('website')) return true;
    return cat.includes(target);
  };

  const filteredProjects = activeFilter === 'All'
    ? safeList
    : safeList.filter((p) => matchesCategory(p, activeFilter));

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
            Our Projects &amp; <span className="text-highlight">Proven Deliveries</span>
          </h2>
          <p className="section-subtitle">
            Explore a selection of successful client products spanning web applications, iOS/Android apps, and eCommerce engines.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="portfolio-filter-tabs">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? safeList.length
              : safeList.filter((p) => matchesCategory(p, cat)).length;

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
          {filteredProjects.map((proj, idx) => {
            const projName = proj.title || proj.name || `Project ${idx + 1}`;
            const projDesc = proj.description || proj.desc || '';
            const projCategory = proj.category || 'Software Solution';
            const projType = proj.type || proj.industry || 'Web Application';
            const projUrl = proj.liveUrl || proj.url || '#';

            return (
              <div key={proj.id || proj._id || idx} className="project-card">
                <div className="project-card-top">
                  <span className="project-category-badge">{projCategory}</span>
                  <span className="project-status-dot">Live Production</span>
                </div>

                <div className="project-card-body">
                  <span className="project-type-tag">{projType}</span>
                  <h3 className="project-name">{projName}</h3>
                  <p className="project-desc">{projDesc}</p>
                </div>

                <div className="project-card-footer">
                  {projUrl && projUrl !== '#' ? (
                    <a
                      href={projUrl}
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
                      onClick={() => onOpenModal(`Project Case: ${projName}`)}
                    >
                      <span>View Case Info</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
