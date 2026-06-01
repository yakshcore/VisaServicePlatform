import { Zap, Shield, Activity } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Fast Processing',
    desc: 'Get your visa processed in as little as 5 business days with our expedited service and expert guidance.',
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    icon: Shield,
    title: 'Secure Documents',
    desc: 'Your personal documents are encrypted, stored securely in the cloud, and never shared without consent.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Activity,
    title: 'Real-Time Tracking',
    desc: 'Monitor every stage of your application with our live status timeline — from submission to delivery.',
    color: 'bg-blue-50 text-blue-600',
  },
];

export default function Benefits() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose VisaFlow?</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Built for travelers who value clarity, speed, and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="p-8 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all group">
                <div className={`w-14 h-14 rounded-2xl ${b.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{b.title}</h3>
                <p className="text-slate-500 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
