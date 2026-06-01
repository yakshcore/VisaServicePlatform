import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import CountriesSection from '@/components/landing/CountriesSection';
import Benefits from '@/components/landing/Benefits';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import ContactSection from '@/components/landing/ContactSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <CountriesSection />
      <Benefits />
      <Testimonials />
      <FAQ />
      <ContactSection />
      <Footer />
    </div>
  );
}
