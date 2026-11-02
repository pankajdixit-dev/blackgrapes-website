import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Award, 
  Workflow, 
  Headphones, 
  CheckCheck,
  Sparkles 
} from 'lucide-react';

const valueProps = [
  {
    icon: Workflow,
    title: 'Cross-Vertical Synergies',
    desc: 'Seamless synergy between software development, engineering valuation, real estate advisory, and corporate finance under one roof.'
  },
  {
    icon: ShieldCheck,
    title: 'Accredited & Statutory Compliance',
    desc: 'IBBI-registered valuers, RERA compliance experts, IRDAI licensed surveyors, and Chartered Engineers delivering legally binding dossiers.'
  },
  {
    icon: Cpu,
    title: 'Modern MERN & Cloud Architecture',
    desc: 'Future-ready digital products built with React, Node.js, Express, MongoDB, Docker, and AWS for 99.99% uptime and blistering speed.'
  },
  {
    icon: Award,
    title: '15+ Years Track Record',
    desc: 'Trusted by over 500+ private and public enterprises, major nationalized banks, state corporations, and growing unicorns across India.'
  },
  {
    icon: CheckCheck,
    title: 'Transparent Milestone SLAs',
    desc: 'Rigid service level agreements with sprint demonstrations, zero hidden costs, clear escrow milestones, and predictable deliverables.'
  },
  {
    icon: Headphones,
    title: 'Dedicated Account Partner',
    desc: 'Direct access to senior partners and technical leads with 24/7 escalation channels, not junior ticketing queues.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="process-section" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} />
            THE BLACK GRAPES ADVANTAGE
          </div>
          <h2 className="section-title">
            Why Leading Enterprises <span className="glow-text-gold">Rely on Us</span>
          </h2>
          <p className="section-description">
            We eliminate vendor fragmentation by unifying cutting-edge technology with institutional advisory and engineering authority.
          </p>
        </div>

        <div className="why-us-grid">
          {valueProps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-panel why-us-card">
                <div className="why-us-icon-wrapper">
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
