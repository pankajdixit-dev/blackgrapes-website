import React from 'react';
import { executionProcess } from '../../data/servicesData';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ExecutionProcess({ onOpenQuote }) {
  return (
    <section className="process-section" id="process">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} />
            HOW WE DELIVER EXCELLENCE
          </div>
          <h2 className="section-title">
            Our 4-Stage Turnkey <span className="glow-text-purple">Execution Blueprint</span>
          </h2>
          <p className="section-description">
            From preliminary technical discovery to institutional-grade delivery and SLA maintenance, our structured process ensures zero friction, complete transparency, and accelerated turnaround.
          </p>
        </div>

        <div className="process-steps-grid">
          {executionProcess.map((step) => (
            <div key={step.step} className="glass-panel process-step-card">
              <div className="process-step-number">{step.step}</div>
              <h3 className="process-step-title">{step.title}</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-grape)', fontWeight: 600, marginBottom: '0.65rem' }}>
                {step.subtitle}
              </div>
              <p className="process-step-desc">{step.description}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={onOpenQuote}
            style={{ padding: '1rem 2.25rem' }}
          >
            <span>Initiate Stage 01 Consultation</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
