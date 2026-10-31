import React from 'react';
import { 
  Users, 
  Building2, 
  Star, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Globe2, 
  ShieldCheck, 
  HeartHandshake,
  ExternalLink,
  Laptop,
  Smartphone
} from 'lucide-react';
import { COMPANY_INFO, TESTIMONIALS, INDUSTRIES, PROJECTS } from '../data/siteData';

export default function ClientsPage({ onOpenModal }) {
  const clientStats = [
    { number: "100+", label: "Satisfied Clients Globally" },
    { number: "150+", label: "Enterprise Projects Delivered" },
    { number: "98.8%", label: "Client Retention Rate" },
    { number: "10+", label: "Years of Sustained Partnerships" }
  ];

  const safeTestimonials = TESTIMONIALS || [];
  const safeProjects = PROJECTS || [];
  const safeIndustries = INDUSTRIES || [];

  return (
    <div className="clients-page page-container" style={{ padding: '6rem 1.5rem 4rem', maxWidth: '1280px', margin: '0 auto', color: '#f1f5f9' }}>
      {/* Header */}
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="badge-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(248, 98, 0, 0.15)', border: '1px solid rgba(248, 98, 0, 0.4)', padding: '0.4rem 1.1rem', borderRadius: '999px', color: '#ff8c3b', fontSize: '0.88rem', fontWeight: 600, marginBottom: '1.25rem' }}>
          <Sparkles size={16} />
          <span>Our Global Client Partnerships</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>
          Trusted by <span style={{ background: 'linear-gradient(135deg, #f86200, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>100+ Ambitious Businesses</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '800px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          From high-growth startups to established enterprises across India, UAE, and the US, we build technology partnerships that last years, not just weeks.
        </p>
      </div>

      {/* Stats Counter */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
        {clientStats.map((st, idx) => (
          <div key={idx} style={{ background: 'rgba(22, 17, 36, 0.72)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f86200', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>{st.number}</div>
            <div style={{ fontSize: '0.92rem', color: '#cbd5e1' }}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* Featured Client Deliveries & Case Studies */}
      <div style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2.5rem', fontFamily: 'var(--font-heading)' }}>
          Featured Client Projects &amp; Deliveries
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
          {safeProjects.map((p, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(22, 17, 36, 0.72)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '2rem',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ background: 'rgba(248, 98, 0, 0.15)', color: '#ff8c3b', fontSize: '0.78rem', fontWeight: 600, padding: '0.25rem 0.65rem', borderRadius: '6px' }}>
                    {p.category}
                  </span>
                  {p.url && p.url !== '#' && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}>
                      <span>Live Site</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>{p.name}</h3>
                <div style={{ fontSize: '0.88rem', color: '#c084fc', marginBottom: '0.75rem', fontWeight: 500 }}>{p.type}</div>
                <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Testimonials */}
      <div style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2.5rem', fontFamily: 'var(--font-heading)' }}>
          What Our Clients Say
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {safeTestimonials.map((t, idx) => {
            const clientName = t.name || t.author || 'Enterprise Client';
            const initial = clientName.charAt(0) || 'C';
            return (
              <div 
                key={idx}
                style={{
                  background: 'rgba(22, 17, 36, 0.72)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '2rem',
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem', color: '#fba721' }}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} fill="#fba721" />
                    ))}
                  </div>
                  <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                    "{t.quote}"
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #f86200, #9333ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#ffffff' }}>
                    {t.avatar || initial}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.98rem' }}>{clientName}</div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{t.role || 'Verified Client'}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Industries Served */}
      <div style={{ background: 'rgba(13, 10, 23, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '3.5rem 2rem', marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 700, textAlign: 'center', marginBottom: '2.5rem', fontFamily: 'var(--font-heading)' }}>
          Industries We Empower
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {safeIndustries.map((ind, idx) => (
            <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: '#ff7a1a', marginBottom: '0.4rem', fontSize: '1.1rem' }}>{ind.name || ind.title}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>{ind.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, rgba(248, 98, 0, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)', border: '1px solid rgba(248, 98, 0, 0.4)', borderRadius: '20px', padding: '3.5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
          Become Our Next Success Story
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#e2e8f0', maxWidth: '650px', margin: '0 auto 2rem' }}>
          Partner with our team for high-velocity software engineering and scalable digital solutions.
        </p>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => onOpenModal && onOpenModal('Request Partnership Discussion')}
        >
          <span>Start Your Project With Us</span>
        </button>
      </div>
    </div>
  );
}
