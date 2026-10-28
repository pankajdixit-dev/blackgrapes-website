import React from 'react';
import HeroSection from '../components/HeroSection';
import ClockPhilosophy from '../components/ClockPhilosophy';
import HoneycombIndustries from '../components/HoneycombIndustries';
import ServicesBranch from '../components/ServicesBranch';
import ServiceEstimator from '../components/ServiceEstimator';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ProjectsSection from '../components/ProjectsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import IndustriesSection from '../components/IndustriesSection';
import CtaBanner from '../components/CtaBanner';

export default function HomePage({ onOpenModal, onSelectService, onOpenInquiry }) {
  const triggerInquiry = (serviceName = 'General Consultation') => {
    if (onOpenInquiry) {
      onOpenInquiry(serviceName);
    } else if (onOpenModal) {
      onOpenModal(serviceName);
    }
  };

  return (
    <>
      <HeroSection onOpenModal={onOpenModal} />
      <ClockPhilosophy />
      <ServicesSection
        onOpenModal={onOpenModal}
        onSelectService={onSelectService}
      />
      <HoneycombIndustries onOpenInquiry={triggerInquiry} />
      <ServicesBranch 
        onSelectService={onSelectService} 
        onOpenInquiry={triggerInquiry} 
      />
      <ServiceEstimator 
        onInquireEstimate={(summary) => triggerInquiry(`Configured Scope: ${summary}`)} 
      />
      <AboutSection onOpenModal={onOpenModal} />
      <WhyChooseUs onOpenModal={onOpenModal} />
      <ProjectsSection onOpenModal={onOpenModal} />
      <TestimonialsSection />
      <IndustriesSection onOpenModal={onOpenModal} />
      <CtaBanner onOpenModal={onOpenModal} />
    </>
  );
}
