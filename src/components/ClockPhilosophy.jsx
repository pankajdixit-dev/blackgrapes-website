import React, { useState, useEffect } from 'react';
import { getPageSections } from '@backend/dataService.js';
import '../utils/realtimeSync';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';
import '../styles/ClockPhilosophy.css';

export default function ClockPhilosophy() {
  const [philosophyData, setPhilosophyData] = useState(null);

  useEffect(() => {
    getPageSections('home').then((sections) => {
      if (sections && sections.home_philosophy) {
        setPhilosophyData(sections.home_philosophy.content);
      }
    });

    const handleUpdate = (e) => {
      const detail = e.detail || {};
      if (detail.pageSlug === 'home' && detail.sections?.home_philosophy) {
        setPhilosophyData(detail.sections.home_philosophy.content);
      } else {
        getPageSections('home').then((sections) => {
          if (sections && sections.home_philosophy) {
            setPhilosophyData(sections.home_philosophy.content);
          }
        });
      }
    };

    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const eyebrow = philosophyData?.eyebrow || 'BLACK GRAPES PHILOSOPHY • PURPOSEFUL BEGINNINGS';
  const title = philosophyData?.title || 'MORE THAN A SERVICE.';
  const titleHighlight = philosophyData?.titleHighlight || 'A COMMITMENT TO TIME & SCALE.';
  const lead = philosophyData?.lead || 'Every transformative enterprise starts with a decisive moment. At Black Grapes Group, our approach embodies purposeful beginnings, engineering rigor, and the execution power to turn ambitious visions into enduring realities.';
  const mantra1 = philosophyData?.mantra1 || 'BEGIN WITH PURPOSE';
  const mantra2 = philosophyData?.mantra2 || 'ENGINEER WITH RIGOR';
  const mantra3 = philosophyData?.mantra3 || 'DELIVER ON TIME';
  return (
    <section className="brand-philosophy-section" id="brand-philosophy">
      <div className="container">
        <div className="philosophy-hero text-center">
          <div className="philosophy-eyebrow">
            <span className="philosophy-eyebrow-dot" aria-hidden="true"></span>
            <span>{eyebrow}</span>
          </div>
          <h2 className="philosophy-main-title">
            {title} <span className="gradient-gold-text">{titleHighlight}</span>
          </h2>
          <p className="philosophy-hero-desc">
            {lead}
          </p>
          <div className="philosophy-hero-mantra">
            <span className="mantra-pill">{mantra1}</span>
            <span className="mantra-sep">&bull;</span>
            <span className="mantra-pill">{mantra2}</span>
            <span className="mantra-sep">&bull;</span>
            <span className="mantra-pill">{mantra3}</span>
          </div>
        </div>

        {/* Pillar Card with Luxury Black Grapes Visualizer */}
        <div className="philosophy-pillar glass-card">
          <div className="pillar-grid">
            {/* Left Content */}
            <div className="pillar-content">
              <span className="pillar-label-badge">01 / THE TIMELESS PRINCIPLE</span>
              <h3 className="pillar-title">
                A MOMENT OF PURPOSE.<br />
                A BEGINNING OF POSSIBILITIES.
              </h3>
              <div className="pillar-paragraphs">
                <p className="pillar-p">
                  In Indian tradition, <em>Shubh Muhurat &amp; Brahma Muhurta</em> symbolizes the peak window of mental clarity, creative power, and spiritual resolve when the groundwork for monumental achievements is laid.
                </p>
                <p className="pillar-p">
                  Inspired by this timeless philosophy, our <strong>Black Grapes</strong> delivery model represents the conviction that every milestone project deserves undivided focus, zero technical shortcuts, and absolute punctuality.
                </p>
                <p className="pillar-p">
                  Whether launching a complex ERP system, validating property for a ₹50-crore bank facility, or securing municipal Naksha Pass approvals, we make every second of execution count.
                </p>
              </div>

              <div className="pillar-highlight-quote">
                <div className="quote-mark">“</div>
                <div className="quote-text">
                  Every great vision deserves its defining moment. At Black Grapes, we ensure that moment leads to unquestioned market leadership.
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
