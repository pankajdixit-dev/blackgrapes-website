import React, { useState } from 'react';
import { techMatrix } from '../../data/softechServicesData';
import { Cpu, Terminal, CheckCircle } from 'lucide-react';

export default function SoftechTechMatrix() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="tech-matrix-section">
      <div className="content-wrapper">
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
            <span className="hero-top-pill">
              <Cpu size={13} color="#f86200" />
              <span>ENTERPRISE ENGINEERING STACK</span>
            </span>
          </div>
          <h2 className="black-hero-title" style={{ fontSize: '2.25rem' }}>
            Technologies We <span className="hero-title-accent">Master</span>
          </h2>
          <p className="black-hero-subtitle" style={{ maxWidth: '600px' }}>
            Engineered using modern frameworks, microservices, cloud pipelines, and scalable database architectures.
          </p>
        </div>

        {/* Tab Headers */}
        <div className="tech-tab-headers">
          {techMatrix.map((item, idx) => (
            <button
              key={idx}
              type="button"
              className={`tech-tab-btn ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <Terminal size={15} />
              <span>{item.category}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Pills */}
        <div className="tech-tab-content-box">
          <div className="tech-items-grid">
            {techMatrix[activeTab].tools.map((tool, idx) => (
              <div key={idx} className="tech-item-badge">
                <CheckCircle size={15} color="#f86200" />
                <span className="tech-item-name">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
