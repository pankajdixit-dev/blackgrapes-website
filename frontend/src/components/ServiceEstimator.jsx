import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Clock, 
  Users, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import '../styles/Estimator.css';

export default function ServiceEstimator({ onInquireEstimate }) {
  const [domain, setDomain] = useState('software');
  const [scale, setScale] = useState('growth');
  const [addons, setAddons] = useState(['cloud', 'sla']);

  const domains = [
    { id: 'software', name: 'Software & Web App', baseDays: '3 - 6 Weeks', team: '4 Specialists', icon: '💻' },
    { id: 'erp', name: 'ERP / CRM / MLM System', baseDays: '6 - 12 Weeks', team: '6 Specialists', icon: '⚡' },
    { id: 'valuation', name: 'Asset & Property Valuation', baseDays: '5 - 10 Days', team: 'Chartered Valuers', icon: '🏢' },
    { id: 'legal', name: 'Municipal / Naksha / Licensing', baseDays: '2 - 4 Weeks', team: 'Legal Counsel', icon: '📜' },
  ];

  const scales = [
    { id: 'essential', label: 'Essential / Startup', desc: 'Core features, streamlined workflow' },
    { id: 'growth', label: 'Growth / Mid-Enterprise', desc: 'Robust modules, high concurrency, full integrations' },
    { id: 'flagship', label: 'Flagship / Multi-tier Scale', desc: 'Multi-branch, enterprise governance, high security' },
  ];

  const addonOptions = [
    { id: 'cloud', label: 'High-Availability Cloud Architecture & DevOps', icon: '☁️' },
    { id: 'sla', label: 'Priority SLA & 24/7 Production Monitoring', icon: '🛡️' },
    { id: 'audit', label: 'Statutory Compliance & Security Vulnerability Audit', icon: '🔒' },
    { id: 'custom-api', label: 'Custom Banking / Payment Gateway & SMS Integration', icon: '💳' },
  ];

  const toggleAddon = (id) => {
    if (addons.includes(id)) {
      setAddons(addons.filter(item => item !== id));
    } else {
      setAddons([...addons, id]);
    }
  };

  const currentDomain = domains.find(d => d.id === domain) || domains[0];

  const handleApplyEstimate = () => {
    const summary = `${currentDomain.name} (${scale.toUpperCase()}) with ${addons.length} add-on modules`;
    if (onInquireEstimate) {
      onInquireEstimate(summary);
    }
  };

  return (
    <div className="estimator-wrapper glass-card">
      <div className="estimator-header">
        <div className="estimator-tag">
          <Calculator size={16} className="text-purple" />
          <span>Interactive Project Planner</span>
        </div>
        <h3 className="estimator-title">
          Scope &amp; Turnaround <span className="gradient-text">Estimator</span>
        </h3>
        <p className="estimator-desc">
          Configure your service requirements below to view estimated turnaround timelines and recommended engineering or advisory squads.
        </p>
      </div>

      <div className="estimator-grid">
        {/* Left Column: Configurator */}
        <div className="estimator-controls">
          {/* Step 1: Service Domain */}
          <div className="config-block">
            <label className="config-label">1. Choose Service Domain</label>
            <div className="domain-pill-group">
              {domains.map((d) => (
                <button
                  type="button"
                  key={d.id}
                  className={`domain-pill-btn ${domain === d.id ? 'active' : ''}`}
                  onClick={() => setDomain(d.id)}
                >
                  <span className="domain-pill-icon">{d.icon}</span>
                  <span>{d.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Scale */}
          <div className="config-block">
            <label className="config-label">2. Select Project Scale &amp; Tier</label>
            <div className="scale-radio-group">
              {scales.map((s) => (
                <div 
                  key={s.id} 
                  className={`scale-option-box ${scale === s.id ? 'active' : ''}`}
                  onClick={() => setScale(s.id)}
                >
                  <div className="radio-dot"></div>
                  <div className="scale-info">
                    <strong>{s.label}</strong>
                    <span>{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Add-on Modules */}
          <div className="config-block">
            <label className="config-label">3. Select Add-on Capabilities &amp; Compliance</label>
            <div className="addons-grid">
              {addonOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  className={`addon-btn ${addons.includes(opt.id) ? 'selected' : ''}`}
                  onClick={() => toggleAddon(opt.id)}
                >
                  <span className="addon-check">
                    {addons.includes(opt.id) ? '✓' : '+'}
                  </span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Output Summary Card */}
        <div className="estimator-output-panel">
          <div className="output-card">
            <div className="output-badge">
              <Sparkles size={16} />
              <span>Tailored Configuration Summary</span>
            </div>

            <div className="output-service-highlight">
              <span className="output-domain-icon">{currentDomain.icon}</span>
              <div>
                <h4>{currentDomain.name}</h4>
                <p>Tier: <span className="tier-badge">{scale.toUpperCase()}</span></p>
              </div>
            </div>

            <div className="output-metrics">
              <div className="metric-item">
                <Clock size={20} className="metric-icon" />
                <div>
                  <span className="metric-label">Estimated Delivery</span>
                  <span className="metric-value">{currentDomain.baseDays}</span>
                </div>
              </div>

              <div className="metric-item">
                <Users size={20} className="metric-icon" />
                <div>
                  <span className="metric-label">Squad Allocation</span>
                  <span className="metric-value">{currentDomain.team}</span>
                </div>
              </div>

              <div className="metric-item">
                <Cpu size={20} className="metric-icon" />
                <div>
                  <span className="metric-label">Selected Modules</span>
                  <span className="metric-value">{addons.length} Custom Extensions</span>
                </div>
              </div>
            </div>

            <div className="output-included">
              <span className="included-title">Standard Black Grapes Deliverables:</span>
              <ul>
                <li><CheckCircle size={14} className="text-emerald" /> Dedicated Project Manager &amp; Single Point of Contact</li>
                <li><CheckCircle size={14} className="text-emerald" /> Regulatory &amp; Technical Architecture Documentation</li>
                <li><CheckCircle size={14} className="text-emerald" /> Quality Assurance, Security &amp; Compliance Verification</li>
              </ul>
            </div>

            <button 
              type="button" 
              className="btn-primary w-full"
              onClick={handleApplyEstimate}
            >
              <span>Request Formal Proposal with this Scope</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
