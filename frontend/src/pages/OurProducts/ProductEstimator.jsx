import React, { useState } from 'react';
import { Calculator, Check, Sparkles, ArrowRight, Server, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { PRODUCTS_LIST } from './productsData';

export default function ProductEstimator({ onOpenDemoModal }) {
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS_LIST[0].id);
  const [deploymentType, setDeploymentType] = useState('cloud');
  const [selectedAddons, setSelectedAddons] = useState(['mobile-apps', 'whatsapp']);

  const selectedProduct = PRODUCTS_LIST.find((p) => p.id === selectedProductId) || PRODUCTS_LIST[0];

  const addonsList = [
    { id: 'mobile-apps', label: 'Native iOS & Android Mobile Apps', desc: 'Store-ready customer and admin apps with push notifications' },
    { id: 'whatsapp', label: 'WhatsApp & SMS Automated Alerts', desc: 'Instant OTP, invoice PDFs, and transaction updates' },
    { id: 'payment', label: 'Payment Gateway Integration', desc: 'UPI, Cards, NetBanking, International Stripe & Razorpay' },
    { id: 'hardware', label: 'Biometric / RFID / POS Hardware Sync', desc: 'Hardware drivers for biometric turnstiles, thermal printers, barcode scanners' },
    { id: 'custom-branding', label: 'Complete White-Label Theme & Domain', desc: 'Tailored UI colors, custom typography, your logo & enterprise domain' }
  ];

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const calculateTurnaround = () => {
    let days = 3;
    if (deploymentType === 'source-code') days += 2;
    days += Math.floor(selectedAddons.length * 0.7);
    return `${days} - ${days + 3} Business Days`;
  };

  const handleConsultClick = () => {
    if (onOpenDemoModal) onOpenDemoModal();
  };

  return (
    <div className="product-estimator-card glass-card">
      <div className="estimator-glow"></div>
      
      <div className="estimator-header">
        <div className="estimator-badge">
          <Calculator size={16} />
          <span>INSTANT SOLUTION CONFIGURATOR</span>
        </div>
        <h3 className="estimator-title">
          Customize Your Software Deployment & Timeline
        </h3>
        <p className="estimator-sub">
          Select your turnkey product and add-on architecture to view real-time delivery timelines and initiate your onboarding.
        </p>
      </div>

      <div className="estimator-body-grid">
        {/* Left Column: Configuration Options */}
        <div className="estimator-controls">
          {/* Step 1: Select Product */}
          <div className="control-group">
            <label className="control-label">
              <span className="step-number">1</span> Select Target Software Product
            </label>
            <div className="select-wrapper">
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="estimator-select"
              >
                {PRODUCTS_LIST.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.title} ({prod.industry})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 2: Deployment Mode */}
          <div className="control-group">
            <label className="control-label">
              <span className="step-number">2</span> Choose Deployment Model
            </label>
            <div className="radio-tile-group">
              <button
                type="button"
                className={`radio-tile ${deploymentType === 'cloud' ? 'active' : ''}`}
                onClick={() => setDeploymentType('cloud')}
              >
                <Server size={18} />
                <div className="radio-tile-text">
                  <strong>Cloud Hosted (AWS / Azure)</strong>
                  <span>Managed high-availability infrastructure</span>
                </div>
              </button>

              <button
                type="button"
                className={`radio-tile ${deploymentType === 'source-code' ? 'active' : ''}`}
                onClick={() => setDeploymentType('source-code')}
              >
                <ShieldCheck size={18} />
                <div className="radio-tile-text">
                  <strong>Full Source Code Ownership</strong>
                  <span>Self-hosted on your on-premise or cloud servers</span>
                </div>
              </button>
            </div>
          </div>

          {/* Step 3: Add-on Modules */}
          <div className="control-group">
            <label className="control-label">
              <span className="step-number">3</span> Select Add-On Ecosystem Modules
            </label>
            <div className="addons-checkbox-list">
              {addonsList.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    className={`addon-tile ${isChecked ? 'checked' : ''}`}
                    onClick={() => toggleAddon(addon.id)}
                  >
                    <div className="addon-checkbox">
                      {isChecked && <Check size={14} />}
                    </div>
                    <div className="addon-text">
                      <span className="addon-title">{addon.label}</span>
                      <span className="addon-desc">{addon.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Summary & Delivery Blueprint */}
        <div className="estimator-summary-panel">
          <div className="summary-card">
            <div className="summary-header">
              <span className="summary-eyebrow">CONFIGURED BLUEPRINT</span>
              <h4 className="summary-product-name">{selectedProduct.title}</h4>
              <span className="summary-industry-pill">{selectedProduct.industry} Solution</span>
            </div>

            <div className="summary-metrics">
              <div className="metric-box">
                <span className="metric-label">Estimated Delivery</span>
                <span className="metric-value text-gradient">{calculateTurnaround()}</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Architecture</span>
                <span className="metric-value">Microservices Ready</span>
              </div>
            </div>

            <div className="summary-includes">
              <span className="includes-title">Package Inclusions:</span>
              <ul className="includes-list">
                <li><Check size={14} className="check-icon" /> 100% Unencrypted Source Code</li>
                <li><Check size={14} className="check-icon" /> Complete White-Label Branding</li>
                <li><Check size={14} className="check-icon" /> Deployment on Client Servers</li>
                <li><Check size={14} className="check-icon" /> 1-Year Free Maintenance & AMC</li>
                <li><Check size={14} className="check-icon" /> Staff & Admin Video Training</li>
                {selectedAddons.includes('mobile-apps') && (
                  <li><Check size={14} className="check-icon" /> iOS & Android App Store Upload</li>
                )}
              </ul>
            </div>

            <div className="summary-action">
              <button
                type="button"
                onClick={handleConsultClick}
                className="btn btn-primary btn-block"
              >
                <Sparkles size={16} />
                <span>Lock In This Configuration & Get Quote</span>
                <ArrowRight size={16} />
              </button>
              <p className="summary-disclaimer">
                No obligations. Free 30-minute live screen share walkthrough with technical architect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
