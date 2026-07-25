'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, LayoutDashboard, GitFork, Cpu, FileText,
  BarChart3, History, Bell, Settings, User,
  ArrowRight, Command, X
} from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import { ROUTES } from '../../../constants/routes';
import { cn } from '../../../utils/cn';

interface CommandEntry {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  href?: string;
  shortcut?: string;
  category: 'page' | 'action' | 'recent';
  action?: () => void;
}

const ALL_COMMANDS: CommandEntry[] = [
  { id: 'nav-dashboard',     label: 'Dashboard',        description: 'Overview & metrics',          icon: LayoutDashboard, href: ROUTES.DASHBOARD,     shortcut: 'G D', category: 'page' },
  { id: 'nav-workflow',      label: 'Workflow Builder',  description: 'Drag-and-drop flow editor',   icon: GitFork,         href: ROUTES.WORKFLOW,      shortcut: 'G W', category: 'page' },
  { id: 'nav-agents',        label: 'Agents',            description: 'Boss, Supervisor & Workers',  icon: Cpu,             href: ROUTES.AGENTS,        shortcut: 'G A', category: 'page' },
  { id: 'nav-reports',       label: 'Reports',           description: 'Generated reports & exports', icon: FileText,        href: ROUTES.REPORTS,       shortcut: 'G R', category: 'page' },
  { id: 'nav-analytics',     label: 'Analytics',         description: 'Charts & insights',           icon: BarChart3,       href: ROUTES.ANALYTICS,     shortcut: 'G N', category: 'page' },
  { id: 'nav-history',       label: 'History',           description: 'Past workflows & runs',       icon: History,         href: ROUTES.HISTORY,       shortcut: 'G H', category: 'page' },
  { id: 'nav-notifications', label: 'Notifications',     description: 'Alerts & messages',           icon: Bell,            href: ROUTES.NOTIFICATIONS, shortcut: 'G I', category: 'page' },
  { id: 'nav-settings',      label: 'Settings',          description: 'Platform configuration',      icon: Settings,        href: ROUTES.SETTINGS,      shortcut: 'G S', category: 'page' },
  { id: 'nav-profile',       label: 'Profile',           description: 'Account & subscription',      icon: User,            href: ROUTES.PROFILE,       shortcut: 'G P', category: 'page' },
];

export function CommandPalette() {
  const router = useRouter();
  const { isCommandPaletteOpen, commandPaletteQuery, closeCommandPalette, setCommandPaletteQuery } = useUIStore();
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = ALL_COMMANDS.filter((c) =>
    commandPaletteQuery.trim() === '' ||
    c.label.toLowerCase().includes(commandPaletteQuery.toLowerCase()) ||
    c.description?.toLowerCase().includes(commandPaletteQuery.toLowerCase())
  );

  // Open: focus input and reset index (both inside setTimeout, not synchronous)
  useEffect(() => {
    if (!isCommandPaletteOpen) return;
    const t = setTimeout(() => {
      inputRef.current?.focus();
      setActiveIdx(0);
    }, 60);
    return () => clearTimeout(t);
  }, [isCommandPaletteOpen]);

  // Reset index when query changes — deferred to avoid synchronous setState in effect
  useEffect(() => {
    const t = setTimeout(() => setActiveIdx(0), 0);
    return () => clearTimeout(t);
  }, [commandPaletteQuery]);

  const execute = useCallback((entry: CommandEntry) => {
    closeCommandPalette();
    if (entry.action) { entry.action(); return; }
    if (entry.href) router.push(entry.href);
  }, [closeCommandPalette, router]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isCommandPaletteOpen) return;
      if (e.key === 'Escape') { closeCommandPalette(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, filtered.length - 1)); return; }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); return; }
      if (e.key === 'Enter' && filtered[activeIdx]) execute(filtered[activeIdx]);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isCommandPaletteOpen, activeIdx, filtered, closeCommandPalette, execute]);

  const groupedByCategory = (cat: 'page' | 'action' | 'recent') => filtered.filter((c) => c.category === cat);

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cp-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={closeCommandPalette}
          />

          {/* Panel */}
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
            <motion.div
              key="cp-panel"
              initial={{ opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="pointer-events-auto w-full max-w-xl rounded-2xl border border-border bg-popover shadow-2xl shadow-black/50 overflow-hidden"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/60">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  value={commandPaletteQuery}
                  onChange={(e) => setCommandPaletteQuery(e.target.value)}
                  placeholder="Search pages, commands, settings..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
                />
                <div className="flex items-center gap-1.5 shrink-0">
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-muted border border-border rounded text-muted-foreground">ESC</kbd>
                  <button onClick={closeCommandPalette} className="p-1 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors cursor-pointer">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center py-10 gap-2 text-center">
                    <Command className="h-8 w-8 text-muted-foreground/30" strokeWidth={1.5} />
                    <p className="text-sm text-muted-foreground">No results for &ldquo;{commandPaletteQuery}&rdquo;</p>
                  </div>
                ) : (
                  <>
                    {groupedByCategory('page').length > 0 && (
                      <div>
                        <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                          Navigation
                        </p>
                        {groupedByCategory('page').map((entry) => {
                          const globalIdx = filtered.indexOf(entry);
                          return (
                            <CommandItem
                              key={entry.id}
                              entry={entry}
                              isActive={activeIdx === globalIdx}
                              onHover={() => setActiveIdx(globalIdx)}
                              onSelect={() => execute(entry)}
                            />
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-border/60 bg-muted/30">
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><kbd className="px-1 rounded border border-border bg-background font-mono">↑↓</kbd> navigate</span>
                  <span className="flex items-center gap-1"><kbd className="px-1 rounded border border-border bg-background font-mono">↵</kbd> select</span>
                  <span className="flex items-center gap-1"><kbd className="px-1 rounded border border-border bg-background font-mono">esc</kbd> close</span>
                </div>
                <span className="text-[10px] text-muted-foreground">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

interface CommandItemProps {
  entry: CommandEntry;
  isActive: boolean;
  onHover: () => void;
  onSelect: () => void;
}

function CommandItem({ entry, isActive, onHover, onSelect }: CommandItemProps) {
  const Icon = entry.icon;
  return (
    <div
      onClick={onSelect}
      onMouseEnter={onHover}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors group',
        isActive ? 'bg-primary/10' : 'hover:bg-muted/60'
      )}
    >
      <div className={cn(
        'h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 transition-colors',
        isActive ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-muted/50 border-border/50 text-muted-foreground'
      )}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-medium truncate', isActive ? 'text-foreground' : 'text-foreground/80')}>{entry.label}</p>
        {entry.description && (
          <p className="text-[11px] text-muted-foreground truncate">{entry.description}</p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {entry.shortcut && (
          <kbd className="text-[9px] font-mono text-muted-foreground hidden group-hover:block">{entry.shortcut}</kbd>
        )}
        <ArrowRight className={cn('h-3.5 w-3.5 transition-opacity', isActive ? 'text-primary opacity-100' : 'text-muted-foreground opacity-0 group-hover:opacity-50')} />
      </div>
    </div>
  );
}

export default CommandPalette;
