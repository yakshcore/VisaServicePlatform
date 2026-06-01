import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Student, Canada',
    avatar: 'PS',
    text: 'VisaFlow made my Canadian student visa process so smooth. The document upload was easy and I got real-time updates throughout. Approved in 12 days!',
    rating: 5,
  },
  {
    name: 'Ahmed Al-Rashid',
    role: 'Business Consultant, UK',
    avatar: 'AA',
    text: 'Professional service from start to finish. The team reviewed my business visa documents quickly and I was never left guessing about my application status.',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'Tourist, Australia',
    avatar: 'SJ',
    text: 'I was nervous about applying for my Australian visa, but VisaFlow guided me through every step. The status tracker gave me peace of mind.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-slate-500">Join thousands of satisfied travelers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-700 font-semibold text-sm">{t.avatar}</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
