import { Globe2, Upload, CreditCard, CheckCircle, Package } from 'lucide-react';

const steps = [
  { icon: Globe2, title: 'Select Visa', desc: 'Choose your destination country and the type of visa you need.' },
  { icon: Upload, title: 'Upload Documents', desc: 'Securely upload your required documents directly from your device.' },
  { icon: CheckCircle, title: 'Verification', desc: 'Our team reviews your documents and notifies you promptly.' },
  { icon: CreditCard, title: 'Make Payment', desc: 'Pay securely after document approval — no upfront charges.' },
  { icon: Package, title: 'Visa Delivered', desc: 'Download your visa or receive it directly to your dashboard.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Five simple steps from application to visa delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative flex flex-col items-center text-center">
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 to-slate-200" />
                )}

                <div className="relative w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 border-2 border-blue-100 z-10">
                  <Icon className="w-8 h-8 text-blue-600" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
