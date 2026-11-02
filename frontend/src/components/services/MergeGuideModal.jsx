import React from 'react';
import { 
  X, 
  GitBranch, 
  GitMerge, 
  CheckCircle2, 
  Code, 
  Copy, 
  Layers, 
  Users,
  Terminal
} from 'lucide-react';

export default function MergeGuideModal({ onClose }) {
  const [copiedIndex, setCopiedIndex] = React.useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitSnippet1 = `git checkout -b feature/services-page
git add .
git commit -m "feat: complete revamped modern services page with MERN stack"
git push origin feature/services-page`;

  const routerSnippet = `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';       // Team Member 1 Branch
import ServicesPage from './pages/ServicesPage'; // Your Branch (Services)
import AboutPage from './pages/AboutPage';       // Team Member 3 Branch

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px' }}
      >
        <button 
          type="button" 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div style={{ marginBottom: '1.5rem' }}>
          <span className="badge-pill badge-purple" style={{ marginBottom: '0.4rem' }}>
            <GitBranch size={12} /> 3-Person Team GitHub Collaboration Guide
          </span>
          <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>
            How to Merge Your 3 Pages Seamlessly
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            You and your 2 team members divided the site into 3 branches. Here is the exact, collision-free strategy to push your completed Services page and merge all 3 pages into main!
          </p>
        </div>

        {/* 3-Member Architecture Card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-glass)',
            borderRadius: '0.75rem',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
              MEMBER 1
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>Home Page</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Branch: feature/home</div>
          </div>

          <div style={{
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid var(--grape-vibrant)',
            borderRadius: '0.75rem',
            padding: '1rem',
            textAlign: 'center',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)'
          }}>
            <div style={{ color: '#c084fc', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
              YOU (COMPLETED)
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>Services Page</div>
            <div style={{ fontSize: '0.75rem', color: '#a855f7' }}>Branch: feature/services</div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-glass)',
            borderRadius: '0.75rem',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
              MEMBER 3
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>About & Contact</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Branch: feature/about</div>
          </div>
        </div>

        {/* Step 1: Push your branch */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Terminal size={18} color="#A855F7" />
            <span>Step 1: Commit and Push Your Completed Services Page</span>
          </h3>
          <div style={{ position: 'relative' }}>
            <pre style={{
              background: '#040207',
              border: '1px solid var(--border-glass)',
              borderRadius: '0.75rem',
              padding: '1rem',
              fontSize: '0.85rem',
              color: '#a5f3fc',
              overflowX: 'auto',
              fontFamily: 'var(--font-mono)'
            }}>
              {gitSnippet1}
            </pre>
            <button
              type="button"
              onClick={() => copyToClipboard(gitSnippet1, 1)}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#fff',
                padding: '0.35rem 0.65rem',
                borderRadius: '0.4rem',
                cursor: 'pointer',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Copy size={13} />
              <span>{copiedIndex === 1 ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Step 2: Clean Integration in App.jsx */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code size={18} color="#A855F7" />
            <span>Step 2: How Teammates Integrate Your Services Page in App.jsx</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Because your code is exported cleanly as <code>export default function ServicesPage()</code> inside <code>src/pages/ServicesPage.jsx</code>, your teammates don’t have to edit or fix anything inside your files!
          </p>
          <div style={{ position: 'relative' }}>
            <pre style={{
              background: '#040207',
              border: '1px solid var(--border-glass)',
              borderRadius: '0.75rem',
              padding: '1rem',
              fontSize: '0.82rem',
              color: '#d8b4fe',
              overflowX: 'auto',
              fontFamily: 'var(--font-mono)'
            }}>
              {routerSnippet}
            </pre>
            <button
              type="button"
              onClick={() => copyToClipboard(routerSnippet, 2)}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#fff',
                padding: '0.35rem 0.65rem',
                borderRadius: '0.4rem',
                cursor: 'pointer',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Copy size={13} />
              <span>{copiedIndex === 2 ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Step 3: Zero Merge Conflict Guarantee */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '0.75rem',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem'
        }}>
          <CheckCircle2 size={20} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.85rem', color: '#d1fae5', lineHeight: '1.5' }}>
            <strong>Zero Git Conflicts:</strong> All your services code lives in isolated files (<code>src/pages/ServicesPage.jsx</code>, <code>src/components/services/*</code>, <code>src/data/servicesData.js</code>, and <code>server/</code>). When your teammates open a Pull Request (PR) on GitHub, Git will merge automatically without any file overwrite conflicts!
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={onClose}
          >
            Got it, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
