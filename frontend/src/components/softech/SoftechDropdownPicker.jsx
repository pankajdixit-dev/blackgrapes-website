import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Sparkles, Layers } from 'lucide-react';

export default function SoftechDropdownPicker({ 
  services, 
  selectedServiceId, 
  onSelectService 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedService = services.find((s) => s.id === selectedServiceId) || null;

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      className="softech-dropdown-container" 
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="softech-dropdown-label">
        <Sparkles size={14} color="#f86200" />
        <span>Select Service (Hover or Click to Browse List):</span>
      </div>

      {/* Main Trigger Button */}
      <button
        type="button"
        className={`softech-dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', overflow: 'hidden' }}>
          <div className="dropdown-trigger-icon">
            <Layers size={18} color="#f86200" />
          </div>
          <div style={{ textAlign: 'left', overflow: 'hidden' }}>
            <div className="dropdown-trigger-title">
              {selectedService ? selectedService.title : 'All Services Overview'}
            </div>
            <div className="dropdown-trigger-subtitle">
              {selectedService ? selectedService.tagline : 'Hover or click to select from 10 specialized services'}
            </div>
          </div>
        </div>

        <ChevronDown 
          size={20} 
          className={`dropdown-chevron ${isOpen ? 'rotate' : ''}`} 
        />
      </button>

      {/* Dropdown Menu Panel (Opens on Mouse Hover or Click) */}
      {isOpen && (
        <div className="softech-dropdown-menu">
          {/* Option: View All */}
          <button
            type="button"
            className={`dropdown-menu-item ${!selectedServiceId ? 'selected' : ''}`}
            onClick={() => {
              onSelectService(null);
              setIsOpen(false);
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="dropdown-item-dot" style={{ background: '#f86200' }} />
              <div>
                <div className="dropdown-item-title">All Services Overview</div>
                <div className="dropdown-item-tag">Browse entire catalog of 10 IT services</div>
              </div>
            </div>
            {!selectedServiceId && <Check size={16} color="#f86200" />}
          </button>

          <div className="dropdown-menu-divider" />

          {/* List of services */}
          {services.map((item, idx) => {
            const isSelected = selectedServiceId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`dropdown-menu-item ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  onSelectService(item.id);
                  setIsOpen(false);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                  <span className="dropdown-item-num">0{idx + 1}</span>
                  <div style={{ textAlign: 'left', overflow: 'hidden' }}>
                    <div className="dropdown-item-title">{item.title}</div>
                    <div className="dropdown-item-tag">{item.tagline}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                  {item.badge && (
                    <span className="dropdown-item-badge">
                      {item.badge}
                    </span>
                  )}
                  {isSelected && <Check size={16} color="#f86200" />}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
