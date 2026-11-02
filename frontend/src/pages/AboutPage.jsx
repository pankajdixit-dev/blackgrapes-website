import React from 'react';
import { 
  Building2, 
  Award, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Target, 
  Compass, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO, ABOUT_CONTENT, WHY_CHOOSE_US } from '../data/siteData';

export default function AboutPage({ onOpenModal }) {
  const milestones = [
    { year: "2014", title: "Foundation", desc: "Started operations in Indore with a vision to provide world-class custom IT development." },
    { year: "2017", title: "Enterprise Scaling", desc: "Delivered 50+ enterprise ERPs and bespoke platforms across Central India." },
    { year: "2020", title: "Global Reach", desc: "Expanded to offshore client partnerships across the US, UAE, and Europe." },
    { year: "2024+", title: "Next-Gen Tech", desc: "Pioneered Cloud, AI automation, and high-throughput MLM engines with 150+ deliveries." }
  ];

  return (
    <div className="about-page page-container" style={{ padding: '6rem 1.5rem 4rem', maxWidth: '1280px', margin: '0 auto', color: '#f1f5f9' }}>
      {/* Header */}
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="badge-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(248, 98, 0, 0.15)', border: '1px solid rgba(248, 98, 0, 0.4)', padding: '0.4rem 1.1rem', borderRadius: '999px', color: '#ff8c3b', fontSize: '0.88rem', fontWeight: 600, marginBottom: '1.25rem' }}>
          <Sparkles size={16} />
          <span>About Black Grapes Softech</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>
          Engineering Tomorrow's <span style={{ background: 'linear-gradient(135deg, #f86200, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Solutions</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '800px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          10+ Years of Proven IT Excellence. We engineer scalable custom software, iOS & Android mobile apps, enterprise CRMs, MLM platforms, and high-conversion websites.
        </p>
      </div>

      {/* Main Story & Values */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '5rem', alignItems: 'center' }}>
        <div style={{ background: 'rgba(22, 17, 36, 0.72)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>Our Mission</h2>
          <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            {ABOUT_CONTENT.primaryParagraph}
          </p>
          <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.7 }}>
            {ABOUT_CONTENT.secondaryParagraph}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {(ABOUT_CONTENT?.coreValues || []).map((val, idx) => (
            <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <CheckCircle2 className="text-orange-500" style={{ color: '#f86200' }} size={20} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>{val.title}</h3>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.6, paddingLeft: '2rem' }}>{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Journey */}
      <div style={{ background: 'rgba(13, 10, 23, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '3.5rem 2rem', marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '3rem', fontFamily: 'var(--font-heading)' }}>
          A Decade of Innovation & Growth
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.8rem' }}>
          {milestones.map((m, idx) => (
            <div key={idx} style={{ borderLeft: '3px solid #f86200', paddingLeft: '1.25rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f86200', marginBottom: '0.3rem' }}>{m.year}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>{m.title}</div>
              <div style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5 }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, rgba(248, 98, 0, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)', border: '1px solid rgba(248, 98, 0, 0.4)', borderRadius: '20px', padding: '3.5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
          Work With Indore's Top IT Innovation Team
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#e2e8f0', maxWidth: '650px', margin: '0 auto 2rem' }}>
          Reach out for a 30-minute discovery call and see how Black Grapes Softech can accelerate your product roadmap.
        </p>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => onOpenModal && onOpenModal('Request About Discovery Call')}
        >
          <span>Connect With Our Leadership</span>
        </button>
      </div>
    </div>
  );
}
