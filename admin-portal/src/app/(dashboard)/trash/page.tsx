'use client';
import { useEffect, useState } from 'react';
import { Loader2, RotateCcw, Trash2, AlertTriangle, Globe2, CreditCard, LayoutTemplate, MessageSquare, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { getTrash, restoreTrashItem, deleteTrashItem, emptyTrash } from '@/lib/api';
import type { TrashItem, TrashEntityType } from '@/types';

const TYPE_ICON: Record<TrashEntityType, React.ComponentType<{ className?: string }>> = {
  country: Globe2,
  visaType: CreditCard,
  formPreset: LayoutTemplate,
  contactLead: MessageSquare,
  application: FileText,
};

const TYPE_BADGE: Record<TrashEntityType, string> = {
  country: 'bg-sky-50 text-sky-700 border-sky-200',
  visaType: 'bg-blue-50 text-blue-700 border-blue-200',
  formPreset: 'bg-violet-50 text-violet-700 border-violet-200',
  contactLead: 'bg-amber-50 text-amber-700 border-amber-200',
  application: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

function timeAgo(iso: string) {
  const d = new Date(iso).getTime();
  const diff = Date.now() - d;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function TrashPage() {
  const [items, setItems] = useState<TrashItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [emptying, setEmptying] = useState(false);

  const load = () => {
    setLoading(true);
    getTrash().then((r) => setItems(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleRestore = async (item: TrashItem) => {
    setBusy(item._id);
    try {
      const res = await restoreTrashItem(item._id);
      toast({ title: res.data.message || 'Restored', variant: 'success' });
      setItems((prev) => prev.filter((i) => i._id !== item._id));
    } catch (err: any) {
      toast({ title: 'Restore failed', description: err.response?.data?.message, variant: 'destructive' });
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = async (item: TrashItem) => {
    if (!confirm(`Permanently delete "${item.label}"? This cannot be undone.`)) return;
    setBusy(item._id);
    try {
      await deleteTrashItem(item._id);
      toast({ title: 'Permanently deleted' });
      setItems((prev) => prev.filter((i) => i._id !== item._id));
    } catch (err: any) {
      toast({ title: 'Delete failed', description: err.response?.data?.message, variant: 'destructive' });
    } finally {
      setBusy(null);
    }
  };

  const handleEmpty = async () => {
    if (items.length === 0) return;
    if (!confirm(`Permanently delete all ${items.length} item(s) in trash? This cannot be undone.`)) return;
    setEmptying(true);
    try {
      await emptyTrash();
      toast({ title: 'Trash emptied' });
      setItems([]);
    } catch {
      toast({ title: 'Failed to empty trash', variant: 'destructive' });
    } finally {
      setEmptying(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Trash</h1>
          <p className="text-slate-500 text-sm mt-1">Deleted records are kept here. Restore them or delete permanently.</p>
        </div>
        {items.length > 0 && (
          <Button variant="outline" onClick={handleEmpty} disabled={emptying} className="text-red-600 border-red-200 hover:bg-red-50">
            {emptying ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Trash2 className="w-4 h-4 mr-2" /> Empty Trash</>}
          </Button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-16"><Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" /></div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Trash2 className="w-10 h-10 mx-auto mb-3 text-slate-300" />
          <p className="text-slate-500 font-medium">Trash is empty</p>
          <p className="text-slate-400 text-sm mt-1">Deleted visa types, countries, presets, and leads will appear here.</p>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-2.5 p-3 mb-4 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">Items here are removed from the live app. Restoring a visa type also re-links any applications that referenced it.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Type', 'Name', 'Deleted', ''].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => {
                  const Icon = TYPE_ICON[item.entityType] || Trash2;
                  return (
                    <tr key={item._id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${TYPE_BADGE[item.entityType] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                          <Icon className="w-3 h-3" /> {item.entityLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-900">{item.label}</p>
                        {item.sublabel && <p className="text-xs text-slate-400">{item.sublabel}</p>}
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{timeAgo(item.deletedAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 justify-end">
                          <button onClick={() => handleRestore(item)} disabled={busy === item._id}
                            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 border border-emerald-200 disabled:opacity-50">
                            {busy === item._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />} Restore
                          </button>
                          <button onClick={() => handleDelete(item)} disabled={busy === item._id}
                            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 border border-red-200 disabled:opacity-50">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
