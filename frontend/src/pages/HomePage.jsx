import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ClockPhilosophy from '../components/ClockPhilosophy';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ProjectsSection from '../components/ProjectsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import IndustriesSection from '../components/IndustriesSection';
import CtaBanner from '../components/CtaBanner';
import { getPageSections } from '@backend/dataService.js';
import '../utils/realtimeSync';

export default function HomePage({ onOpenModal, onSelectService, onOpenInquiry }) {
  const [sectionsMap, setSectionsMap] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getPageSections('home').then((secs) => {
      if (isMounted && secs) setSectionsMap(secs);
    });

    const handleUpdate = (e) => {
      const detail = e.detail || {};
      if (detail.pageSlug === 'home') {
        getPageSections('home').then((secs) => {
          if (isMounted && secs) setSectionsMap(secs);
        });
      }
    };

    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('bgst_content_updated', handleUpdate);
    };
  }, []);

  const sectionComponentMap = {
    home_hero: <HeroSection key="home_hero" onOpenModal={onOpenModal} />,
    home_philosophy: <ClockPhilosophy key="home_philosophy" />,
    home_services: (
      <ServicesSection
        key="home_services"
        onOpenModal={onOpenModal}
        onSelectService={onSelectService}
      />
    ),
    home_about: <AboutSection key="home_about" onOpenModal={onOpenModal} />,
    home_why_us: <WhyChooseUs key="home_why_us" onOpenModal={onOpenModal} />,
    home_projects: <ProjectsSection key="home_projects" onOpenModal={onOpenModal} />,
    home_testimonials: <TestimonialsSection key="home_testimonials" />,
    home_industries: <IndustriesSection key="home_industries" onOpenModal={onOpenModal} />,
    home_cta: <CtaBanner key="home_cta" onOpenModal={onOpenModal} />
  };

  const defaultOrder = [
    'home_hero',
    'home_philosophy',
    'home_services',
    'home_about',
    'home_why_us',
    'home_projects',
    'home_testimonials',
    'home_industries',
    'home_cta'
  ];

  let orderedKeys = defaultOrder;
  if (sectionsMap && typeof sectionsMap === 'object') {
    const activeKeys = Object.entries(sectionsMap)
      .filter(([k, v]) => v && v.enabled !== false && sectionComponentMap[k])
      .sort((a, b) => (Number(a[1].order) || 0) - (Number(b[1].order) || 0))
      .map(([k]) => k);

    if (activeKeys.length > 0) {
      orderedKeys = activeKeys;
    }
  }

  return (
    <>
      {orderedKeys.map((key) => sectionComponentMap[key] || null)}
    </>
  );
}
