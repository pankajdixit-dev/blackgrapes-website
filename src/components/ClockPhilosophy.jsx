import React from 'react';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { useHomePage } from '@backend/useContent';
import '../styles/ClockPhilosophy.css';

export default function ClockPhilosophy() {
  const { home } = useHomePage();
  const cp = home?.clockPhilosophy || {};

  const eyebrow = cp.eyebrow || 'BLACK GRAPES PHILOSOPHY • PURPOSEFUL BEGINNINGS';
  const titlePrefix = cp.titlePrefix !== undefined ? cp.titlePrefix : 'MORE THAN A SERVICE. ';
  const titleHighlight = cp.titleHighlight || 'A COMMITMENT TO TIME & SCALE.';
  const description = cp.description || 'Every transformative enterprise starts with a decisive moment. At Black Grapes Group, our approach embodies purposeful beginnings, engineering rigor, and the execution power to turn ambitious visions into enduring realities.';
  const mantraPills = cp.mantraPills || ['BEGIN WITH PURPOSE', 'ENGINEER WITH RIGOR', 'DELIVER ON TIME'];
  const pillarBadge = cp.pillarBadge || '01 / THE TIMELESS PRINCIPLE';
  const pillarTitle = cp.pillarTitle || 'A MOMENT OF PURPOSE. A BEGINNING OF POSSIBILITIES.';
  const paragraphs = cp.pillarParagraphs || [
    'In Indian tradition, Shubh Muhurat & Brahma Muhurta symbolizes the peak window of mental clarity, creative power, and spiritual resolve when the groundwork for monumental achievements is laid.',
    'Inspired by this timeless philosophy, our Black Grapes delivery model represents the conviction that every milestone project deserves undivided focus, zero technical shortcuts, and absolute punctuality.',
    'Whether launching a complex ERP system, validating property for a ₹50-crore bank facility, or securing municipal Naksha Pass approvals, we make every second of execution count.'
  ];
  const quoteText = cp.quoteText || 'Every great vision deserves its defining moment. At Black Grapes, we ensure that moment leads to unquestioned market leadership.';

  return (
    <section className="brand-philosophy-section" id="brand-philosophy">
      <div className="container">
        <div className="philosophy-hero text-center">
          <div className="philosophy-eyebrow">
            <span className="philosophy-eyebrow-dot" aria-hidden="true"></span>
            <span>{eyebrow}</span>
          </div>
          <h2 className="philosophy-main-title">
            {titlePrefix}<span className="gradient-gold-text">{titleHighlight}</span>
          </h2>
          <p className="philosophy-hero-desc">
            {description}
          </p>
          <div className="philosophy-hero-mantra">
            {mantraPills.map((pill, idx) => (
              <React.Fragment key={idx}>
                <span className="mantra-pill">{pill}</span>
                {idx < mantraPills.length - 1 && <span className="mantra-sep">&bull;</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Pillar Card with Luxury Black Grapes Visualizer */}
        <div className="philosophy-pillar glass-card">
          <div className="pillar-grid">
            {/* Left Content */}
            <div className="pillar-content">
              <span className="pillar-label-badge">{pillarBadge}</span>
              <h3 className="pillar-title">
                {pillarTitle}
              </h3>
              <div className="pillar-paragraphs">
                {paragraphs.map((pText, pIdx) => (
                  <p key={pIdx} className="pillar-p">
                    {pText}
                  </p>
                ))}
              </div>

              <div className="pillar-highlight-quote">
                <div className="quote-mark">“</div>
                <div className="quote-text">
                  {quoteText}
                </div>
              </div>
            </div>

            {/* Right Visualizer: Black Grapes Luxury Emblem */}
            <div className="pillar-visual-wrapper">
              <div className="grapes-visual-card">
                <div className="grapes-ambient-glow" aria-hidden="true"></div>
                <div className="grapes-img-container">
                  <img 
                    src="/images/black_grapes_emblem.jpg" 
                    alt="Black Grapes Group Luxury Emblem" 
                    className="luxury-grapes-artwork"
                  />
                  <div className="grapes-ring-pulse" aria-hidden="true"></div>
                </div>
                <div className="grapes-badge-label">
                  <span className="badge-time">BLACK GRAPES</span>
                  <span className="badge-sub">PRECISION &bull; INNOVATION &bull; SCALE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
