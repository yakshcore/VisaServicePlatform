import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">About VisaFlow</h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          VisaFlow is a modern visa management platform built to simplify the entire visa application journey — from document submission to visa delivery.
        </p>
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            We believe that obtaining a visa should be straightforward, transparent, and stress-free. Our platform connects applicants with experienced visa consultants while providing real-time tracking and secure document management.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Who We Serve</h2>
          <ul className="space-y-2 text-slate-600 mb-6">
            {['Students applying for study visas', 'Tourists planning international trips', 'Business professionals seeking work visas', 'Immigration agencies managing multiple clients', 'Travel agencies offering visa services'].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[['Transparency', 'Every step of your application is visible and trackable in real-time.'], ['Security', 'Your documents are encrypted and protected with enterprise-grade security.'], ['Speed', 'We process applications as fast as possible without compromising quality.']].map(([title, desc]) => (
              <div key={title} className="bg-slate-50 rounded-xl p-5">
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
