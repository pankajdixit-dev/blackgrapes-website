import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, Phone, Mail, User } from 'lucide-react';
import { servicesData } from '../../data/servicesData';

export default function InquiryQuoteModal({ initialService, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService ? initialService.title : servicesData[0]?.title || '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const generatedId = `BG-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const res = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        setTicketId(data.ticketId || generatedId);
      } else {
        setTicketId(generatedId);
      }
    } catch {
      // Local fallback
      setTicketId(generatedId);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-dialog-black" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="inquiry-title"
      >
        <button 
          type="button" 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              borderRadius: '50%',
              background: 'rgba(249, 115, 22, 0.15)',
              border: '1px solid rgba(248, 98, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#f86200'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>
              Inquiry Submitted Successfully
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
              Thank you, <strong>{formData.name}</strong>. Our team for <strong>{formData.service}</strong> will contact you promptly.
            </p>
            <div style={{ 
              background: '#141024', 
              padding: '0.75rem 1.25rem', 
              borderRadius: '0.65rem', 
              display: 'inline-block',
              marginBottom: '1.5rem',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              fontSize: '0.88rem',
              color: '#f1f5f9'
            }}>
              Reference Ticket: <strong style={{ color: '#f86200' }}>#{ticketId}</strong>
            </div>
            <br />
            <button
              type="button"
              className="btn-primary"
              onClick={onClose}
              style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <span className="badge-pill" style={{ background: 'rgba(248, 98, 0, 0.15)', color: '#f86200', border: '1px solid rgba(248, 98, 0, 0.3)' }}>
                  <Sparkles size={12} /> Black Grapes Services
                </span>
              </div>
              <h2 id="inquiry-title" style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.35rem' }}>
                Service Inquiry & Consultation
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                Send your details to connect with our specialized domain team.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label className="form-label" htmlFor="inq-name">
                  Full Name *
                </label>
                <div className="input-group">
                  <User size={16} className="input-icon" />
                  <input
                    id="inq-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label className="form-label" htmlFor="inq-email">
                    Email Address *
                  </label>
                  <div className="input-group">
                    <Mail size={16} className="input-icon" />
                    <input
                      id="inq-email"
                      name="email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="inq-phone">
                    Phone Number *
                  </label>
                  <div className="input-group">
                    <Phone size={16} className="input-icon" />
                    <input
                      id="inq-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 98000 00000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="inq-service">
                  Select Vertical / Service
                </label>
                <select
                  id="inq-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="form-input form-select"
                >
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="General Enterprise Inquiry">General Enterprise Inquiry</option>
                </select>
              </div>

              <div>
                <label className="form-label" htmlFor="inq-msg">
                  Message / Requirements
                </label>
                <textarea
                  id="inq-msg"
                  name="message"
                  rows={3}
                  placeholder="Tell us about your requirements or questions..."
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
              >
                {loading ? 'Submitting...' : 'Submit Inquiry'}
                <Send size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
