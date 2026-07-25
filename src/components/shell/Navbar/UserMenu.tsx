'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  User, Settings, LogOut, Keyboard, CreditCard,
  ChevronDown, Shield,
} from 'lucide-react';
import { useUserStore } from '../../../store/userStore';
import { useLogout } from '../../../hooks/useLogout';
import { ROUTES } from '../../../constants/routes';
import { cn } from '../../../utils/cn';

const MENU_ITEMS = [
  { label: 'Profile', icon: User, href: ROUTES.PROFILE },
  { label: 'Settings', icon: Settings, href: ROUTES.SETTINGS },
  { label: 'Billing', icon: CreditCard, href: '#' },
  { label: 'Security', icon: Shield, href: '#' },
  { label: 'Keyboard Shortcuts', icon: Keyboard, href: '#', action: 'shortcuts' },
];

export function UserMenu() {
  const { user } = useUserStore();
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initial = user?.name?.charAt(0)?.toUpperCase() ?? 'U';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="User menu"
        aria-expanded={open}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer group"
      >
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/40 to-violet-600/40 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary shrink-0">
          {initial}
        </div>
        <div className="hidden md:flex flex-col items-start min-w-0 max-w-24">
          <span className="text-xs font-semibold truncate leading-none">{user?.name ?? 'User'}</span>
          <span className="text-[10px] text-muted-foreground truncate leading-none mt-0.5 capitalize">{user?.role ?? 'Member'}</span>
        </div>
        <ChevronDown className={cn('hidden md:block h-3 w-3 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="user-menu"
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-11 w-56 rounded-xl border border-border bg-popover shadow-2xl shadow-black/30 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border/60 bg-muted/30">
              <p className="text-sm font-semibold truncate">{user?.name ?? 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email ?? ''}</p>
              <div className="mt-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-bold uppercase tracking-widest text-primary">
                Pro Plan
              </div>
            </div>

            {/* Items */}
            <div className="py-1">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Logout */}
            <div className="py-1 border-t border-border/60">
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default UserMenu;
