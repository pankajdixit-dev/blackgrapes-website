import React from 'react';
import { 
  Users, 
  UserCheck, 
  Briefcase, 
  ShieldCheck, 
  Clock, 
  Award, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Globe2,
  FileCheck2,
  Laptop
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function ITStaffingPage({ onOpenModal }) {
  const models = [
    {
      title: "Dedicated Developer Pods",
      desc: "Full-time, dedicated software engineers, QA analysts, and project managers working solely on your roadmap under your direct sprint control.",
      badge: "Most Popular",
      points: [
        "Direct Slack/Teams communication",
        "40 hours/week dedicated engineering",
        "Zero recruitment & payroll overhead",
        "2-week risk-free trial"
      ]
    },
    {
      title: "Team & Skill Augmentation",
      desc: "Inject specialized technical talent (React, Node, Flutter, Python AI, DevOps) into your existing team to meet tight deadlines.",
      badge: "High Agility",
      points: [
        "Immediate onboarding within 48 hours",
        "Scale team size up or down with 15 days notice",
        "Seamless integration with your GitHub & Jira",
        "Timezone-aligned overlap hours"
      ]
    },
    {
      title: "Contract-to-Hire (C2H)",
      desc: "Evaluate technical performance and team cultural fit in real production environments before transitioning developers to full-time payroll.",
      badge: "Risk-Free",
      points: [
        "Pre-vetted top 3% engineering talent",
        "Smooth IP and payroll handover",
        "Flexible 3 to 6-month contract periods",
        "Statutory compliance handled by BGST"
      ]
    }
  ];

  const roles = [
    { category: "Frontend", skills: ["React.js", "Next.js", "Vue.js", "Angular", "Tailwind CSS", "TypeScript"] },
    { category: "Backend & Cloud", skills: ["Node.js / Express", "Python / Django / FastAPI", "PHP / Laravel", "AWS / Docker", "PostgreSQL / MongoDB"] },
    { category: "Mobile Engineering", skills: ["React Native", "Flutter", "iOS / Swift", "Android / Kotlin"] },
    { category: "QA & DevOps", skills: ["Automated Testing", "CI/CD Pipelines", "Docker & Kubernetes", "Penetration Testing"] }
  ];

  return (
    <div className="staffing-page page-container" style={{ padding: '6rem 1.5rem 4rem', maxWidth: '1280px', margin: '0 auto', color: '#f1f5f9' }}>
      {/* Header */}
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="badge-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(248, 98, 0, 0.15)', border: '1px solid rgba(248, 98, 0, 0.4)', padding: '0.4rem 1.1rem', borderRadius: '999px', color: '#ff8c3b', fontSize: '0.88rem', fontWeight: 600, marginBottom: '1.25rem' }}>
          <Sparkles size={16} />
          <span>Top 3% Pre-Vetted IT Talent</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>
          IT Staffing & <span style={{ background: 'linear-gradient(135deg, #f86200, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Resource Augmentation</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '800px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Hire dedicated software developers, mobile app engineers, and cloud architects within 48 hours. Flexible engagement models designed for startups, IT agencies, and enterprises worldwide.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => onOpenModal && onOpenModal('Hire Dedicated Developers')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
          >
            <span>Hire Developers Now</span>
            <ArrowRight size={18} />
          </button>
          <a
            href="tel:+917470997884"
            className="btn btn-outline btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
          >
            <span>Talk to Staffing Lead</span>
          </a>
        </div>
      </div>

      {/* Engagement Models */}
      <div style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2.5rem', fontFamily: 'var(--font-heading)' }}>
          Flexible Staffing Models
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {models.map((m, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(22, 17, 36, 0.72)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '2.2rem',
                backdropFilter: 'blur(20px)',
                position: 'relative'
              }}
            >
              <span style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(248, 98, 0, 0.2)', border: '1px solid rgba(248, 98, 0, 0.4)', color: '#ff7a1a', fontSize: '0.78rem', fontWeight: 600, padding: '0.25rem 0.65rem', borderRadius: '999px' }}>
                {m.badge}
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.9rem', color: '#ffffff' }}>{m.title}</h3>
              <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>{m.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {m.points.map((pt, pIdx) => (
                  <li key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: '#e2e8f0' }}>
                    <CheckCircle2 size={16} className="text-emerald-400" style={{ color: '#10b981', flexShrink: 0 }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Matrix */}
      <div style={{ background: 'rgba(13, 10, 23, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '3rem 2rem', marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 700, textAlign: 'center', marginBottom: '2.5rem', fontFamily: 'var(--font-heading)' }}>
          On-Demand Technical Skillsets
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.8rem' }}>
          {roles.map((r, idx) => (
            <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '14px', padding: '1.6rem' }}>
              <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#ff7a1a', marginBottom: '1rem' }}>{r.category}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {r.skills.map((s, sIdx) => (
                  <span key={sIdx} style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '0.25rem 0.6rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, rgba(248, 98, 0, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)', border: '1px solid rgba(248, 98, 0, 0.4)', borderRadius: '20px', padding: '3.5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
          Scale Your Tech Team in 48 Hours
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#e2e8f0', maxWidth: '650px', margin: '0 auto 2rem' }}>
          Send us your required tech stack, seniority level, and team size. We will provide vetted developer profiles within 24 hours.
        </p>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => onOpenModal && onOpenModal('Request Developer Profiles')}
        >
          <span>Request Resumes & Rate Card</span>
        </button>
      </div>
    </div>
  );
}
