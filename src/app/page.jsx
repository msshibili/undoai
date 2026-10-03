import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import InteractiveConfigurator from '@/components/InteractiveConfigurator';
import PortfolioSection from '@/components/PortfolioSection';
import ProcessSection from '@/components/ProcessSection';
import ContactSection from '@/components/ContactSection';
import ProjectModal from '@/components/ProjectModal';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07080d] text-slate-100 relative">
      <Navbar />
      <Hero />
      <ServicesSection />
      <InteractiveConfigurator />
      <PortfolioSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
      <ProjectModal />
    </main>
  );
}
