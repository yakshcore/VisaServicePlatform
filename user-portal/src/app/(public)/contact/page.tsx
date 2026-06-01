import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/landing/ContactSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Contact Us</h1>
        <p className="text-lg text-slate-500 mb-12">We're here to help with any questions about your visa application.</p>
      </div>
      <ContactSection />
      <Footer />
    </div>
  );
}
