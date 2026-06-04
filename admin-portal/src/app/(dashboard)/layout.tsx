'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useAdminAuthStore } from '@/store/auth.store';

import { SocketProvider } from '@/components/providers/SocketProvider';
import NotificationDropdown from '@/components/layout/NotificationDropdown';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, _hasHydrated } = useAdminAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (_hasHydrated && !isAuthenticated) router.push('/login');
  }, [isAuthenticated, _hasHydrated, router]);

  if (!_hasHydrated) {
    return (
      <div className="flex min-h-screen bg-slate-50 items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <SocketProvider>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-end px-6 shrink-0 z-10">
            <NotificationDropdown />
          </header>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </SocketProvider>
  );
}
