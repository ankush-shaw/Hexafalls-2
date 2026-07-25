'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Search, X, Bot, Users, Cpu, GitFork, ShieldCheck, Activity, Settings, User, Bell, History, ArrowRight } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';


export function CommandPalette() {
  const { isCommandPaletteOpen, openCommandPalette, closeCommandPalette } = useUIStore();
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isCommandPaletteOpen) {
          closeCommandPalette();
        } else {
          openCommandPalette();
        }
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        closeCommandPalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, openCommandPalette, closeCommandPalette]);


  if (!isCommandPaletteOpen) return null;

  const actions = [
    { label: 'Live Multi-Agent Canvas & Replay', icon: GitFork, href: '/workflow', category: 'Navigation' },
    { label: 'Boss Agent CEO Strategy', icon: Bot, href: '/workflow', category: 'Executive' },
    { label: 'Supervisor AI COO Operations', icon: Users, href: '/workflow', category: 'Operations' },
    { label: 'Worker Agents Ecosystem', icon: Cpu, href: '/agents', category: 'Workers' },
    { label: 'Boss Review Center & Executive Reports', icon: ShieldCheck, href: '/reports', category: 'Reports' },
    { label: 'Platform Telemetry & Analytics', icon: Activity, href: '/analytics', category: 'Analytics' },
    { label: 'Notification Feed', icon: Bell, href: '/notifications', category: 'Notifications' },
    { label: 'Audit Logs & History', icon: History, href: '/history', category: 'History' },
    { label: 'System & AI Settings', icon: Settings, href: '/settings', category: 'Settings' },
    { label: 'Profile & Team Roles', icon: User, href: '/profile', category: 'Profile' },
  ];

  const filtered = actions.filter((act) =>
    act.label.toLowerCase().includes(query.toLowerCase()) || act.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    closeCommandPalette();
    router.push(href);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-md p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCommandPalette}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-xl bg-card border border-border/70 rounded-3xl shadow-2xl overflow-hidden z-10 space-y-2 p-4"
        >
          {/* Input Bar */}
          <div className="relative flex items-center border-b border-border/40 pb-3">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search platform (Press Esc to close)..."
              className="w-full pl-9 pr-8 py-1.5 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 bg-transparent focus:outline-none"
            />
            <button onClick={closeCommandPalette} className="absolute right-2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>


          {/* Action List */}
          <div className="space-y-1 max-h-80 overflow-y-auto">
            {filtered.map((act, i) => {
              const Icon = act.icon;
              return (
                <div
                  key={i}
                  onClick={() => handleSelect(act.href)}
                  className="flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-foreground">{act.label}</h4>
                      <span className="text-[9px] font-mono text-muted-foreground uppercase">{act.category}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CommandPalette;
