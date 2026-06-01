'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How long does visa processing take?',
    a: 'Processing times vary by country and visa type. Tourist visas typically take 5–15 business days, while student and work visas may take 15–30 days. You can see the estimated processing time for each visa type before applying.',
  },
  {
    q: 'What documents do I need to upload?',
    a: 'Required documents vary by visa type. After selecting your visa, you\'ll see the exact list. Common documents include a passport copy, photographs, bank statements, and travel itinerary.',
  },
  {
    q: 'When do I pay the visa fee?',
    a: 'Payment is only required after our team reviews and approves your documents. This ensures you only pay when your application is on track.',
  },
  {
    q: 'How will I receive my visa?',
    a: 'Once approved, your visa is uploaded to your VisaFlow dashboard. You\'ll receive an email notification and can download the PDF directly from your application page.',
  },
  {
    q: 'What happens if my documents are rejected?',
    a: 'If a document is rejected, you\'ll receive a notification with the reason. You can re-upload the corrected document directly from your application page.',
  },
  {
    q: 'Is my personal data secure?',
    a: 'Yes. All documents are encrypted and stored on secure cloud infrastructure. We never share your data with third parties without your explicit consent.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-500">Everything you need to know about VisaFlow.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${open === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {open === idx && (
                <div className="px-5 pb-5">
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
