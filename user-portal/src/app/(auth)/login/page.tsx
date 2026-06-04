'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Globe, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { sendOTP, verifyOTP } from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';

type Step = 'details' | 'otp';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [step, setStep] = useState<Step>('details');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [otp, setOtp] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendOTP(form);
      setStep('otp');
      toast({ title: 'OTP Sent', description: 'Check your email for the 6-digit code.', variant: 'success' });
    } catch (err: any) {
      toast({ title: 'Error', description: err.response?.data?.message || 'Failed to send OTP', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyOTP({ email: form.email, otp });
      const { token, user } = res.data.data;
      login(user, token);
      toast({ title: 'Welcome!', description: `Logged in as ${user.name}`, variant: 'success' });
      router.push('/dashboard');
    } catch (err: any) {
      toast({ title: 'Error', description: err.response?.data?.message || 'Invalid OTP', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Pravasa Transworld</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">
            {step === 'details' ? 'Sign in to continue' : 'Enter your OTP'}
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            {step === 'details'
              ? 'Enter your details to receive a login code.'
              : `We sent a 6-digit code to ${form.email}`}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {step === 'details' ? (
            <form onSubmit={handleSendOTP} className="space-y-5">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  className="mt-1"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  className="mt-1"
                  placeholder="+1 234 567 890"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div>
                <Label htmlFor="otp">One-Time Password</Label>
                <Input
                  id="otp"
                  className="mt-1 text-center text-2xl tracking-widest font-bold"
                  placeholder="000000"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading || otp.length !== 6}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify & Sign In'}
              </Button>
              <button
                type="button"
                onClick={() => { setStep('details'); setOtp(''); }}
                className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 mx-auto"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Change email
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-slate-600">Terms</Link> and{' '}
          <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
