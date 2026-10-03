import React, { useState } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import InteractiveConfigurator from './components/InteractiveConfigurator';
import PortfolioSection from './components/PortfolioSection';
import ProcessSection from './components/ProcessSection';
import ContactSection from './components/ContactSection';
import ProjectModal from './components/ProjectModal';
import Footer from './components/Footer';
import AdminPortal from './components/AdminPortal';

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <PortfolioProvider>
      <div className="app-root">
        <Navbar onOpenAdmin={() => setAdminOpen(true)} />
        <Hero />
        <ServicesSection />
        <InteractiveConfigurator />
        <PortfolioSection />
        <ProcessSection />
        <ContactSection />
        <Footer onOpenAdmin={() => setAdminOpen(true)} />
        <ProjectModal />

        {adminOpen && <AdminPortal onClose={() => setAdminOpen(false)} />}
      </div>
    </PortfolioProvider>
  );
}
