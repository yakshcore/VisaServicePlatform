'use client';
import { useRef, useState } from 'react';
import {
  ShieldCheck, Upload, CheckCircle2, RotateCcw,
  ArrowRight, Loader2, Fingerprint, CreditCard,
} from 'lucide-react';
import { uploadVaultDocument } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

/* ─────────────────────────────────────────────────────── types */
interface KYCStatus { aadharFront: boolean; aadharBack: boolean; pan: boolean; }
interface Props { initialStatus: KYCStatus; onComplete: () => void; }

/* ─────────────────────────────────────────────────────── upload card face */
function CardFace({
  side, gradient, image, done, onPick,
}: {
  side: string; gradient: string; image: string | null; done: boolean; onPick: () => void;
}) {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
      {image ? (
        /* ── preview image ── */
        <div className="w-full h-full relative">
          <img src={image} className="w-full h-full object-cover" alt={side} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="text-white text-xs font-bold tracking-wide">{side} · Aadhaar</span>
            <span className="flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Ready
            </span>
          </div>
        </div>
      ) : done ? (
        /* ── already uploaded ── */
        <div className="w-full h-full flex items-center justify-center" style={{ background: gradient }}>
          <div className="text-center">
            <CheckCircle2 className="w-14 h-14 text-white/90 mx-auto mb-2 drop-shadow" />
            <p className="text-white font-bold text-sm drop-shadow">Already Uploaded</p>
            <p className="text-white/70 text-xs mt-0.5">{side} side</p>
          </div>
        </div>
      ) : (
        /* ── upload zone ── */
        <div
          onClick={onPick}
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer group select-none"
          style={{ background: gradient }}
        >
          {/* decorative grid lines */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 24px,rgba(255,255,255,.5) 24px,rgba(255,255,255,.5) 25px),repeating-linear-gradient(90deg,transparent,transparent 24px,rgba(255,255,255,.5) 24px,rgba(255,255,255,.5) 25px)' }} />

          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-dashed border-white/50 flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Upload className="w-7 h-7 text-white" />
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-sm">{side} Side</p>
              <p className="text-white/70 text-xs mt-0.5">Click to upload · JPG or PNG</p>
            </div>
          </div>

          {/* corner chip */}
          <div className="absolute top-3 left-4 w-8 h-6 rounded bg-white/20 border border-white/30" />
          <div className="absolute top-3 right-4 text-white/50 text-[10px] font-mono tracking-widest">AADHAAR</div>
          <div className="absolute bottom-3 left-4 right-4 h-0.5 bg-white/20 rounded" />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────── PAN face */
function PanFace({ image, done, onPick }: { image: string | null; done: boolean; onPick: () => void; }) {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{ height: 230, background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 45%,#1d4ed8 100%)' }}
      onClick={!done ? onPick : undefined}
    >
      {image ? (
        <div className="relative w-full h-full">
          <img src={image} className="w-full h-full object-cover" alt="PAN" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="text-white text-xs font-bold tracking-wide">PAN Card · Front</span>
            <span className="flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Ready
            </span>
          </div>
        </div>
      ) : done ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <CheckCircle2 className="w-14 h-14 text-white/90 mx-auto mb-2 drop-shadow" />
            <p className="text-white font-bold text-sm drop-shadow">PAN Card Uploaded</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 group">
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize: '12px 12px' }} />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-dashed border-white/40 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-sm">PAN Card Front</p>
              <p className="text-blue-300 text-xs mt-0.5">Click to upload · JPG or PNG</p>
            </div>
          </div>
          {/* decorative PAN elements */}
          <div className="absolute top-4 left-4 text-white/30 text-[10px] font-mono tracking-widest">INCOME TAX DEPT</div>
          <div className="absolute top-4 right-4 w-8 h-5 rounded-sm bg-white/10 border border-white/20" />
          <div className="absolute bottom-4 left-4 right-4 h-0.5 bg-white/10 rounded" />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────── main modal */
export default function KYCModal({ initialStatus, onComplete }: Props) {
  /* step management */
  const [step, setStep] = useState<'aadhaar' | 'pan'>(
    (!initialStatus.aadharFront || !initialStatus.aadharBack) ? 'aadhaar' : 'pan'
  );
  const [isFlipped, setIsFlipped] = useState(false);
  const [uploading, setUploading] = useState(false);

  /* aadhaar state */
  const [afFile, setAfFile] = useState<File | null>(null);
  const [afPreview, setAfPreview] = useState<string | null>(null);
  const [afDone, setAfDone] = useState(initialStatus.aadharFront);

  const [abFile, setAbFile] = useState<File | null>(null);
  const [abPreview, setAbPreview] = useState<string | null>(null);
  const [abDone, setAbDone] = useState(initialStatus.aadharBack);

  /* pan state */
  const [panFile, setPanFile] = useState<File | null>(null);
  const [panPreview, setPanPreview] = useState<string | null>(null);
  const [panDone, setPanDone] = useState(initialStatus.pan);

  /* refs */
  const afRef = useRef<HTMLInputElement>(null);
  const abRef = useRef<HTMLInputElement>(null);
  const panRef = useRef<HTMLInputElement>(null);

  /* file pickers */
  const pickFront = () => afRef.current?.click();
  const pickBack  = () => { abRef.current?.click(); };
  const pickPan   = () => panRef.current?.click();

  const handleFile = (side: 'front' | 'back' | 'pan', file: File) => {
    const url = URL.createObjectURL(file);
    if (side === 'front') { setAfFile(file); setAfPreview(url); }
    if (side === 'back')  { setAbFile(file); setAbPreview(url); setIsFlipped(true); }
    if (side === 'pan')   { setPanFile(file); setPanPreview(url); }
  };

  /* upload aadhaar */
  const uploadAadhaar = async () => {
    const tasks: { file: File; label: string }[] = [];
    if (!afDone && afFile) tasks.push({ file: afFile, label: 'Aadhaar Front' });
    if (!abDone && abFile) tasks.push({ file: abFile, label: 'Aadhaar Back' });
    if (!tasks.length) { setStep('pan'); return; }

    setUploading(true);
    try {
      for (const t of tasks) {
        const fd = new FormData();
        fd.append('file', t.file);
        fd.append('type', 'aadhar');
        fd.append('label', t.label);
        await uploadVaultDocument(fd);
      }
      if (!afDone && afFile) setAfDone(true);
      if (!abDone && abFile) setAbDone(true);
      toast({ title: 'Aadhaar saved!', variant: 'success' });
      setStep('pan');
    } catch (e: any) {
      toast({ title: 'Upload failed', description: e.response?.data?.message, variant: 'destructive' });
    } finally { setUploading(false); }
  };

  /* upload pan */
  const uploadPan = async () => {
    if (panDone) { onComplete(); return; }
    if (!panFile) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', panFile);
      fd.append('type', 'pan');
      fd.append('label', 'PAN Card');
      await uploadVaultDocument(fd);
      setPanDone(true);
      toast({ title: 'KYC Complete! 🎉', description: 'Your identity is verified.', variant: 'success' });
      onComplete();
    } catch (e: any) {
      toast({ title: 'Upload failed', description: e.response?.data?.message, variant: 'destructive' });
    } finally { setUploading(false); }
  };

  /* derived */
  const aadhaarDone = afDone && abDone;
  const canAadhaar  = (afDone || !!afFile) && (abDone || !!abFile);
  const canPan      = panDone || !!panFile;
  const totalDone   = [afDone || !!afFile, abDone || !!abFile, panDone || !!panFile].filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(12px)' }}>

      {/* hidden inputs */}
      <input ref={afRef}  type="file" className="hidden" accept="image/*" onChange={e => e.target.files?.[0] && handleFile('front', e.target.files[0])} />
      <input ref={abRef}  type="file" className="hidden" accept="image/*" onChange={e => e.target.files?.[0] && handleFile('back',  e.target.files[0])} />
      <input ref={panRef} type="file" className="hidden" accept="image/*" onChange={e => e.target.files?.[0] && handleFile('pan',   e.target.files[0])} />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* ── header ── */}
        <div className="relative overflow-hidden px-6 pt-7 pb-6"
          style={{ background: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#1d4ed8 80%,#0369a1 100%)' }}>
          {/* animated glow orbs */}
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20 animate-pulse"
            style={{ background: 'radial-gradient(circle,#818cf8,transparent)' }} />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full opacity-15 animate-pulse"
            style={{ background: 'radial-gradient(circle,#38bdf8,transparent)', animationDelay: '1s' }} />

          <div className="relative z-10 flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.25)' }}>
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">Verify Your Identity</h2>
              <p className="text-blue-200 text-xs mt-0.5">Required to start any visa application</p>
            </div>
          </div>

          {/* progress pills */}
          <div className="relative z-10 flex items-center gap-2">
            {[
              { id: 'aadhaar', label: 'Aadhaar Card', icon: Fingerprint, done: aadhaarDone },
              { id: 'pan',     label: 'PAN Card',     icon: CreditCard,  done: panDone },
            ].map((s, i) => (
              <div key={s.id}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  step === s.id
                    ? 'bg-white text-indigo-700 shadow-lg'
                    : s.done
                    ? 'text-white/80 border border-white/20'
                    : 'text-white/50 border border-white/10'
                }`}>
                {s.done
                  ? <CheckCircle2 className="w-3 h-3 text-green-400" />
                  : <s.icon className="w-3 h-3" />}
                {s.label}
              </div>
            ))}

            {/* progress fraction */}
            <div className="ml-auto text-white/60 text-xs font-mono">{totalDone}/3</div>
          </div>

          {/* progress bar */}
          <div className="relative z-10 mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${(totalDone / 3) * 100}%` }} />
          </div>
        </div>

        {/* ── body ── */}
        <div className="px-6 py-5">

          {/* ──────────── AADHAAR STEP ──────────── */}
          {step === 'aadhaar' && (
            <div>
              <p className="text-center text-sm text-slate-500 mb-5">
                Upload <span className="font-semibold text-slate-700">both sides</span> of your Aadhaar card
              </p>

              {/* 3D flip card */}
              <div className="flex justify-center mb-3" style={{ perspective: '1200px' }}>
                <div style={{
                  width: '100%', maxWidth: '380px', height: 230,
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.65s cubic-bezier(0.4,0.2,0.2,1)',
                }}>
                  {/* FRONT */}
                  <CardFace
                    side="Front"
                    gradient="linear-gradient(135deg,#FF9933 0%,#FF9933 30%,#ffffff 45%,#ffffff 55%,#138808 70%,#138808 100%)"
                    image={afPreview}
                    done={afDone}
                    onPick={pickFront}
                  />
                  {/* BACK */}
                  <div style={{ position: 'absolute', inset: 0, transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                    <CardFace
                      side="Back"
                      gradient="linear-gradient(135deg,#1e3a8a 0%,#2563eb 60%,#0ea5e9 100%)"
                      image={abPreview}
                      done={abDone}
                      onPick={pickBack}
                    />
                  </div>
                </div>
              </div>

              {/* flip button */}
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setIsFlipped(f => !f)}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-full transition-all hover:scale-105 active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {isFlipped ? 'See Front' : 'Turn Over'}
                </button>
              </div>

              {/* side status chips */}
              <div className="flex gap-2 justify-center mb-5">
                {[
                  { label: 'Front', ok: afDone || !!afFile, onClick: pickFront },
                  { label: 'Back',  ok: abDone || !!abFile, onClick: () => { setIsFlipped(true); setTimeout(pickBack, 350); } },
                ].map(s => (
                  <button
                    key={s.label}
                    onClick={s.onClick}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium border transition-all ${
                      s.ok
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {s.ok
                      ? <CheckCircle2 className="w-3 h-3" />
                      : <Upload className="w-3 h-3" />}
                    {s.label}
                  </button>
                ))}
              </div>

              <button
                onClick={uploadAadhaar}
                disabled={!canAadhaar || uploading}
                className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={canAadhaar && !uploading ? { background: 'linear-gradient(135deg,#4f46e5,#2563eb)', color: 'white', boxShadow: '0 4px 15px rgba(79,70,229,0.4)' } : { background: '#f1f5f9', color: '#94a3b8' }}
              >
                {uploading
                  ? <><Loader2 className="w-4 h-4 animate-spin" />Uploading…</>
                  : <>{aadhaarDone ? 'Continue' : 'Save & Continue'} <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          )}

          {/* ──────────── PAN STEP ──────────── */}
          {step === 'pan' && (
            <div>
              <p className="text-center text-sm text-slate-500 mb-5">
                Upload the <span className="font-semibold text-slate-700">front side</span> of your PAN card
              </p>

              <div className="mb-5">
                <PanFace image={panPreview} done={panDone} onPick={pickPan} />
              </div>

              {/* clickable chip when no file selected yet */}
              {!panDone && !panFile && (
                <div className="flex justify-center mb-4">
                  <button
                    onClick={pickPan}
                    className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium border bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all"
                  >
                    <Upload className="w-3 h-3" />
                    Choose PAN image
                  </button>
                </div>
              )}

              {panFile && (
                <div className="flex justify-center mb-4">
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium bg-green-50 text-green-700 border border-green-200">
                    <CheckCircle2 className="w-3 h-3" /> PAN selected
                  </span>
                </div>
              )}

              <button
                onClick={uploadPan}
                disabled={!canPan || uploading}
                className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={canPan && !uploading ? { background: 'linear-gradient(135deg,#4f46e5,#2563eb)', color: 'white', boxShadow: '0 4px 15px rgba(79,70,229,0.4)' } : { background: '#f1f5f9', color: '#94a3b8' }}
              >
                {uploading
                  ? <><Loader2 className="w-4 h-4 animate-spin" />Uploading…</>
                  : <><ShieldCheck className="w-4 h-4" />{panDone ? 'Continue to Dashboard' : 'Complete KYC'}</>}
              </button>

              <button
                onClick={() => setStep('aadhaar')}
                className="w-full mt-2 py-2 text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                ← Back to Aadhaar
              </button>
            </div>
          )}

        </div>

        {/* ── footer note ── */}
        <div className="px-6 pb-5">
          <p className="text-center text-[11px] text-slate-400 leading-relaxed">
            Your documents are encrypted and stored securely.
            They are only used to pre-fill visa applications.
          </p>
        </div>
      </div>
    </div>
  );
}
