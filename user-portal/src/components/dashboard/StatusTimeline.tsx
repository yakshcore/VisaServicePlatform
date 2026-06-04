'use client';
import { CheckCircle2, Circle, XCircle, Clock } from 'lucide-react';
import type { ApplicationStatus } from '@/types';

const TIMELINE: { status: ApplicationStatus; label: string }[] = [
  { status: 'payment_completed',      label: 'Application & Payment Received' },
  { status: 'documents_under_review', label: 'Documents Under Review' },
  { status: 'documents_approved',     label: 'Documents Approved' },
  { status: 'visa_processing',        label: 'Visa Processing' },
  { status: 'embassy_review',         label: 'Embassy Review' },
  { status: 'visa_approved',          label: 'Visa Approved' },
  { status: 'visa_delivered',         label: 'Visa Delivered' },
];

const ORDER: ApplicationStatus[] = TIMELINE.map((t) => t.status);

// Statuses that are pre-payment (wizard states) — shown as a placeholder
const PRE_PAYMENT_STATUSES: ApplicationStatus[] = ['submitted', 'payment_pending'];

interface Props {
  currentStatus: ApplicationStatus;
}

export default function StatusTimeline({ currentStatus }: Props) {
  if (currentStatus === 'visa_rejected') {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
        <div>
          <p className="font-semibold text-red-700">Visa Rejected</p>
          <p className="text-sm text-red-600">Please contact support for more information.</p>
        </div>
      </div>
    );
  }

  const isPrePayment = PRE_PAYMENT_STATUSES.includes(currentStatus);
  const currentIdx = ORDER.indexOf(currentStatus);

  return (
    <div className="relative">
      {/* Placeholder for pre-payment states */}
      {isPrePayment && (
        <div className="flex items-start gap-4 relative mb-1">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors bg-blue-600">
              <Clock className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div className="w-0.5 h-8 my-1 bg-slate-200" />
          </div>
          <div className="pb-2 pt-1.5">
            <p className="text-sm font-medium text-blue-700">Submitted — awaiting payment confirmation</p>
          </div>
        </div>
      )}

      {TIMELINE.map((step, idx) => {
        const done = isPrePayment ? false : idx < currentIdx;
        const active = isPrePayment ? false : idx === currentIdx;

        return (
          <div key={step.status} className="flex items-start gap-4 relative">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                done ? 'bg-green-500' : active ? 'bg-blue-600' : 'bg-slate-100'
              }`}>
                {done ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : active ? (
                  <Clock className="w-4 h-4 text-white animate-pulse" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400" />
                )}
              </div>
              {idx < TIMELINE.length - 1 && (
                <div className={`w-0.5 h-8 my-1 ${done ? 'bg-green-500' : 'bg-slate-200'}`} />
              )}
            </div>
            <div className={`pb-2 pt-1.5 ${idx < TIMELINE.length - 1 ? 'mb-0' : ''}`}>
              <p className={`text-sm font-medium ${
                done ? 'text-green-700' : active ? 'text-blue-700' : 'text-slate-400'
              }`}>
                {step.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
