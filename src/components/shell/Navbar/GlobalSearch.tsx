'use client';
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import { cn } from '../../../utils/cn';

export function GlobalSearch() {
  const { openCommandPalette } = useUIStore();
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openCommandPalette();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openCommandPalette]);

  return (
    <button
      onClick={() => openCommandPalette()}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-label="Open command palette"
      className={cn(
        'flex items-center gap-3 h-9 px-3.5 rounded-lg border bg-muted/50 text-muted-foreground text-sm transition-all cursor-pointer w-full max-w-xs xl:max-w-sm',
        focused ? 'border-primary/50 ring-2 ring-primary/10' : 'border-border/50 hover:border-border hover:bg-muted'
      )}
    >
      <Search className="h-3.5 w-3.5 shrink-0" />
      <span className="flex-1 text-left truncate">Search or jump to...</span>
      <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 bg-background border border-border rounded text-muted-foreground shrink-0">
        ⌘ K
      </kbd>
    </button>
  );
}
export default GlobalSearch;
