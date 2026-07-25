'use client';

import React, { useState } from 'react';
import { Keyboard, Sparkles, Mic, Paperclip, RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionBarProps {
  onOpenVoice: () => void;
  onOpenTemplates: () => void;
  onOpenUpload: () => void;
  onClearTimeline?: () => void;
  className?: string;
}

export function ActionBar({
  onOpenVoice,
  onOpenTemplates,
  onOpenUpload,
  onClearTimeline,
  className,
}: ActionBarProps) {
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);

  return (
    <>
      <div className={`flex items-center justify-between px-2 py-1 text-xs text-muted-foreground ${className}`}>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border/50 bg-card hover:bg-muted transition-colors cursor-pointer text-[11px] font-medium"
          >
            <Sparkles className="h-3 w-3 text-amber-400" /> Templates
          </button>
          <button
            onClick={onOpenVoice}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border/50 bg-card hover:bg-muted transition-colors cursor-pointer text-[11px] font-medium"
          >
            <Mic className="h-3 w-3 text-rose-400" /> Voice Mode
          </button>
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border/50 bg-card hover:bg-muted transition-colors cursor-pointer text-[11px] font-medium"
          >
            <Paperclip className="h-3 w-3 text-primary" /> Attach Files
          </button>
        </div>

        <div className="flex items-center gap-2">
          {onClearTimeline && (
            <button
              onClick={onClearTimeline}
              className="flex items-center gap-1 px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" /> Clear Timeline
            </button>
          )}

          <button
            onClick={() => setShortcutsModalOpen(true)}
            title="Keyboard Shortcuts"
            className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-[11px]"
          >
            <Keyboard className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Shortcuts</span>
          </button>
        </div>
      </div>

      {/* Shortcuts Modal */}
      <AnimatePresence>
        {shortcutsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShortcutsModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-popover shadow-2xl p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <div className="flex items-center gap-2">
                  <Keyboard className="h-4 w-4 text-primary" />
                  <span className="font-bold text-sm">Keyboard Shortcuts</span>
                </div>
                <button
                  onClick={() => setShortcutsModalOpen(false)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { key: 'Enter', action: 'Send message' },
                  { key: 'Shift + Enter', action: 'New line in prompt composer' },
                  { key: 'Ctrl + K', action: 'Open global command palette' },
                  { key: 'Ctrl + N', action: 'Create new conversation' },
                  { key: 'Ctrl + /', action: 'Toggle shortcuts guide' },
                  { key: 'Esc', action: 'Close modals & overlays' },
                ].map((s) => (
                  <div key={s.key} className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
                    <span className="text-muted-foreground">{s.action}</span>
                    <kbd className="px-2 py-0.5 rounded bg-muted border border-border/50 font-mono text-[10px] text-foreground font-semibold">
                      {s.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ActionBar;
