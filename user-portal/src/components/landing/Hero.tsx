'use client';
import Link from 'next/link';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 pt-16 pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
              Trusted by 50,000+ travelers worldwide
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Your Visa,{' '}
              <span className="text-blue-600">Simplified.</span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              Professional visa assistance from application to delivery. Upload documents once,
              track in real-time, and receive your visa hassle-free.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button size="lg" asChild className="group">
                <Link href="/login">
                  Apply For Visa
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">How It Works</Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secure & encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Real-time tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Animated Visa Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main card */}
              <div className="w-80 h-52 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-blue-200 text-xs font-medium">VISA TYPE</p>
                      <p className="text-white font-bold text-lg">Tourist Visa</p>
                    </div>
                    <div className="text-3xl">🇨🇦</div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-blue-200 text-xs mb-1">APPLICANT</p>
                      <p className="font-semibold">John Doe</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-200 text-xs mb-1">STATUS</p>
                      <span className="bg-green-400/20 text-green-300 text-xs font-semibold px-2 py-1 rounded-full">
                        ✓ Approved
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-6 -left-8 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">98%</p>
                  <p className="text-xs text-slate-500">Success Rate</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-6 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">5-15 Days</p>
                  <p className="text-xs text-slate-500">Processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
