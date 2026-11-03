import React from 'react';
import { Sparkles, Layers, Handshake, ExternalLink, Plus } from 'lucide-react';
import {
  PRODUCT_PARTNERS_INTRO,
  PRODUCT_PARTNERS,
  SERVICE_PARTNERS_INTRO,
  SERVICE_PARTNERS
} from '../data/businessPartnersData';
import '../styles/Partnership.css';

export default function BusinessPartnersPage() {
  return (
    <div className="business-partners-container">
      <div className="container">
        {/* Top Header */}
        <div className="partner-page-header">
          <div className="partner-eyebrow">
            <Sparkles size={14} />
            <span>WHAT WE DO</span>
          </div>
          <h1 className="partner-page-title">Our <span className="text-gradient">Business Partners</span></h1>
          <p className="partner-page-subtitle">
            Forging strategic alliances, distribution networks, and scalable tech integrations across global enterprise platforms.
          </p>
        </div>

        {/* Section 1: Products Companies Tie-up */}
        <section className="bp-section">
          <div className="bp-intro-card">
            <h2 className="bp-section-title">
              <Handshake size={24} color="#f86200" />
              <span>{PRODUCT_PARTNERS_INTRO.sectionTitle}</span>
            </h2>

            <div className="bp-intro-paragraphs">
              {PRODUCT_PARTNERS_INTRO.paragraphs.map((p, idx) => (
                <p key={idx} className="bp-intro-para">{p}</p>
              ))}
            </div>
          </div>

          <h3 className="bp-grid-subheading">
            <span>✦</span> {PRODUCT_PARTNERS_INTRO.subHeading}
          </h3>

          <div className="bp-partners-grid">
            {PRODUCT_PARTNERS.map((partner, idx) => {
              const isMore = partner.name.toLowerCase().includes('more');
              if (isMore) {
                return (
                  <div key={idx} className="bp-partner-card bp-more-card">
                    <div className="bp-more-icon">
                      <Plus size={26} />
                    </div>
                    <span className="bp-partner-name">&amp; More Global Platforms</span>
                  </div>
                );
              }

              return (
                <div key={idx} className="bp-partner-card">
                  <div className="bp-logo-wrap">
                    <img
                      src={partner.localImg || partner.img}
                      alt={`${partner.name} logo`}
                      className="bp-logo-img"
                      loading="lazy"
                      onError={(e) => {
                        if (partner.img && e.target.src !== partner.img) {
                          e.target.src = partner.img;
                        }
                      }}
                    />
                  </div>
                  <span className="bp-partner-name">{partner.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Services Companies Tie-up */}
        <section className="bp-section">
          <div className="bp-intro-card">
            <h2 className="bp-section-title">
              <Layers size={24} color="#a855f7" />
              <span>{SERVICE_PARTNERS_INTRO.sectionTitle}</span>
            </h2>

            <div className="bp-intro-paragraphs">
              {SERVICE_PARTNERS_INTRO.paragraphs.map((p, idx) => (
                <p key={idx} className="bp-intro-para">{p}</p>
              ))}
            </div>
          </div>

          <h3 className="bp-grid-subheading" style={{ color: '#c084fc' }}>
            <span>✦</span> {SERVICE_PARTNERS_INTRO.subHeading}
          </h3>

          <div className="bp-partners-grid">
            {SERVICE_PARTNERS.map((partner, idx) => {
              const isMore = partner.name.toLowerCase().includes('more');
              if (isMore) {
                return (
                  <div key={idx} className="bp-partner-card bp-more-card">
                    <div className="bp-more-icon" style={{ color: '#c084fc', background: 'rgba(168, 85, 247, 0.2)' }}>
                      <Plus size={26} />
                    </div>
                    <span className="bp-partner-name">&amp; More Service Networks</span>
                  </div>
                );
              }

              return (
                <div key={idx} className="bp-partner-card">
                  <div className="bp-logo-wrap">
                    <img
                      src={partner.localImg || partner.img}
                      alt={`${partner.name} logo`}
                      className="bp-logo-img"
                      loading="lazy"
                      onError={(e) => {
                        if (partner.img && e.target.src !== partner.img) {
                          e.target.src = partner.img;
                        }
                      }}
                    />
                  </div>
                  <span className="bp-partner-name">{partner.name}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

