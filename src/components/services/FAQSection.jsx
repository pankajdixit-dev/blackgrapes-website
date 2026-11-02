import React, { useState } from 'react';
import { faqList } from '../../data/servicesData';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="process-section" id="faq" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} />
            COMMON INQUIRIES
          </div>
          <h2 className="section-title">
            Frequently Asked <span className="glow-text-purple">Questions</span>
          </h2>
          <p className="section-description">
            Clear insights into our multi-sector operations, onboarding timelines, MERN engineering practices, and team branch merging.
          </p>
        </div>

        <div className="faq-container">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="faq-item">
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <HelpCircle size={18} color="#ffffff" style={{ flexShrink: 0 }} />
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0
                    }}
                  />
                </button>
                {isOpen && (
                  <div className="faq-content">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
