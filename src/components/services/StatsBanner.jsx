import React from 'react';
import { Layers, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { clientStats } from '../../data/servicesData';

const statIcons = {
  Layers,
  CheckCircle2,
  ShieldCheck,
  HeartHandshake
};

export default function StatsBanner() {
  return (
    <section className="stats-banner-section">
      <div className="content-wrapper">
        <div className="stats-grid">
          {clientStats.map((item, idx) => {
            const Icon = statIcons[item.icon] || Layers;
            return (
              <div key={idx} className="glass-panel stat-item-card">
                <Icon size={32} className="stat-icon" />
                <div className="stat-value glow-text-purple">{item.value}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
