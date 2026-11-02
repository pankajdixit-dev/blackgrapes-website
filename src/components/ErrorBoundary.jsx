import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          style={{
            padding: '2rem',
            margin: '2rem auto',
            maxWidth: '600px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            color: '#f87171',
            textAlign: 'center',
            fontFamily: 'sans-serif'
          }}
        >
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fca5a5' }}>
            Section Recovering
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '1rem' }}>
            {this.state.error?.message || 'An issue occurred while rendering this section.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: '0.5rem 1rem',
              background: '#f97316',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Reload Section
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

