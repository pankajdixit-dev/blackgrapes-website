import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';

export default function SoftechScopeEstimator({ onOpenInquiry }) {
  const [projectType, setProjectType] = useState('web');
  const [scaleTier, setScaleTier] = useState('mvp');
  const [timelineSpeed, setTimelineSpeed] = useState('normal');

  const options = {
    projectType: [
      { id: 'web', label: 'Web Application / Portal', baseWeeks: 4, labelTitle: 'Website / Web App' },
      { id: 'mobile', label: 'Mobile App (iOS & Android)', baseWeeks: 6, labelTitle: 'Mobile App' },
      { id: 'enterprise', label: 'Custom CRM / MLM ERP', baseWeeks: 8, labelTitle: 'CRM / MLM ERP' },
      { id: 'software', label: 'Enterprise Software & Cloud', baseWeeks: 10, labelTitle: 'Enterprise Software' },
      { id: 'marketing', label: 'SEO & Performance Ads', baseWeeks: 2, labelTitle: 'Digital Marketing' }
    ],
    scaleTier: [
      { id: 'mvp', label: 'MVP / Fast Launch', multiplier: 1, desc: 'Essential core features & modern UI' },
      { id: 'growth', label: 'Growth / Scalable', multiplier: 1.5, desc: 'Full features, analytics & API sync' },
      { id: 'enterprise', label: 'Enterprise Grade', multiplier: 2, desc: 'High-security, microservices, 24/7 SLA' }
    ]
  };

  const selectedProj = options.projectType.find((p) => p.id === projectType) || options.projectType[0];
  const selectedScale = options.scaleTier.find((s) => s.id === scaleTier) || options.scaleTier[0];

  const estimatedWeeks = Math.ceil(selectedProj.baseWeeks * selectedScale.multiplier);

  const handleConsult = () => {
    onOpenInquiry({
      title: `${selectedProj.labelTitle} (${selectedScale.label})`,
      tagline: `Estimated Timeline: ${estimatedWeeks} Weeks`
    });
  };

  return (
    <section className="estimator-section">
      <div className="estimator-card">
        <div className="estimator-header">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
            <span className="badge-pill" style={{ background: 'rgba(248, 98, 0, 0.15)', color: '#f86200', border: '1px solid rgba(248, 98, 0, 0.3)' }}>
              <Calculator size={13} /> Interactive Project Estimator
            </span>
          </div>
          <h2 className="estimator-title">
            Estimate Your Project Scope & Timeline
          </h2>
          <p className="estimator-sub">
            Select your product requirements to generate an instantaneous architecture estimate.
          </p>
        </div>

        <div className="estimator-grid">
          {/* Options Column */}
          <div className="estimator-controls">
            {/* 1. Project Type */}
            <div className="estimator-group">
              <label className="estimator-label">1. Select Project Vertical</label>
              <div className="estimator-pill-grid">
                {options.projectType.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`estimator-pill-btn ${projectType === p.id ? 'active' : ''}`}
                    onClick={() => setProjectType(p.id)}
                  >
                    <span>{p.label}</span>
                    {projectType === p.id && <Check size={14} color="#f86200" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Scale Tier */}
            <div className="estimator-group">
              <label className="estimator-label">2. Target Scale & Complexity</label>
              <div className="estimator-cards-grid">
                {options.scaleTier.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`estimator-tier-card ${scaleTier === s.id ? 'active' : ''}`}
                    onClick={() => setScaleTier(s.id)}
                  >
                    <div className="tier-card-title">{s.label}</div>
                    <div className="tier-card-desc">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="estimator-summary-box">
            <div className="summary-top">
              <div style={{ fontSize: '0.82rem', color: '#f86200', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                Architecture Projection
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>
                {selectedProj.labelTitle}
              </h3>
              <div className="summary-tier-badge">{selectedScale.label}</div>
            </div>

            <div className="summary-metrics">
              <div className="metric-row">
                <div className="metric-label">
                  <Clock size={16} color="#f86200" />
                  <span>Estimated Delivery</span>
                </div>
                <div className="metric-value">{estimatedWeeks} - {estimatedWeeks + 2} Weeks</div>
              </div>

              <div className="metric-row">
                <div className="metric-label">
                  <ShieldCheck size={16} color="#10b981" />
                  <span>Guaranteed SLA Support</span>
                </div>
                <div className="metric-value">6 Months Free</div>
              </div>

              <div className="metric-row">
                <div className="metric-label">
                  <Sparkles size={16} color="#38bdf8" />
                  <span>Architecture</span>
                </div>
                <div className="metric-value">Full MERN / Cloud</div>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={handleConsult}
              style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '0.85rem' }}
            >
              <span>Lock in Estimate & Inquire</span>
              <ArrowRight size={15} />
            </button>
            <p style={{ fontSize: '0.75rem', color: '#cbd5e1', textAlign: 'center', marginTop: '0.5rem' }}>
              Free consultation • NDA protected • No obligation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
