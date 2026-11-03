import React from 'react';
import HeroSection from '../components/HeroSection';
import ClockPhilosophy from '../components/ClockPhilosophy';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ProjectsSection from '../components/ProjectsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import IndustriesSection from '../components/IndustriesSection';
import CtaBanner from '../components/CtaBanner';

export default function HomePage({ onOpenModal, onSelectService, onOpenInquiry }) {
  return (
    <>
      <HeroSection onOpenModal={onOpenModal} />
      <ClockPhilosophy />
      <ServicesSection
        onOpenModal={onOpenModal}
        onSelectService={onSelectService}
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
