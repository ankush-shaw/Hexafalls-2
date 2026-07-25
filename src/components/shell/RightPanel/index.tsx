'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Clock, Zap, Cpu, ChevronRight, X } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import { useSocket } from '../../../providers/SocketProvider';
import { StatusDot } from '../../shared/StatusDot';
import { cn } from '../../../utils/cn';
import { formatRelative } from '../../../utils/date.utils';

const MOCK_ACTIVITY = [
  { id: '1', text: 'Workflow initialized', time: new Date(Date.now() - 60000).toISOString(), type: 'success' as const },
  { id: '2', text: 'Agent Boss activated', time: new Date(Date.now() - 180000).toISOString(), type: 'info' as const },
  { id: '3', text: 'Report generated', time: new Date(Date.now() - 300000).toISOString(), type: 'success' as const },
  { id: '4', text: 'API token refreshed', time: new Date(Date.now() - 600000).toISOString(), type: 'info' as const },
];

const activityColor = { success: 'bg-emerald-500', info: 'bg-sky-500', warning: 'bg-amber-500', error: 'bg-rose-500' };

export function RightPanel() {
  const { isRightPanelOpen, setRightPanelOpen } = useUIStore();
  const { connectionState, isConnected } = useSocket();

  return (
    <AnimatePresence mode="wait">
      {isRightPanelOpen && (
        <motion.aside
          key="right-panel"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 272, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="hidden xl:flex flex-col border-l border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden shrink-0"
        >
          <div className="flex-1 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Utility Panel</span>
              <button
                onClick={() => setRightPanelOpen(false)}
                className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* System Health */}
            <section className="p-4 border-b border-border/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Cpu className="h-3.5 w-3.5" />
                System Health
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Socket', color: isConnected ? 'green' : 'red', status: connectionState },
                  { label: 'API Gateway', color: 'green', status: 'online' },
                  { label: 'Database', color: 'green', status: 'healthy' },
                  { label: 'LLM Engine', color: 'green', status: 'ready' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{item.label}</span>
                    <div className="flex items-center gap-1.5">
                      <StatusDot color={item.color as 'green' | 'red' | 'amber'} pulse={item.color === 'green'} />
                      <span className="text-foreground/70 font-medium capitalize">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="p-4 border-b border-border/30 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Zap className="h-3.5 w-3.5" />
                Quick Actions
              </div>
              {[
                { label: 'New Workflow', shortcut: '⌘ N' },
                { label: 'View Reports', shortcut: '⌘ R' },
                { label: 'Open Analytics', shortcut: '⌘ A' },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border/50 hover:bg-muted text-xs font-medium transition-colors cursor-pointer group"
                >
                  <span className="text-foreground/80">{item.label}</span>
                  <div className="flex items-center gap-1.5">
                    <kbd className="hidden group-hover:block text-[9px] font-mono px-1 py-0.5 bg-background border border-border rounded text-muted-foreground">
                      {item.shortcut}
                    </kbd>
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </section>

            {/* Recent Activity */}
            <section className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Activity className="h-3.5 w-3.5" />
                Recent Activity
              </div>
              <div className="space-y-3">
                {MOCK_ACTIVITY.map((item) => (
                  <div key={item.id} className="flex gap-2.5 items-start">
                    <div className={cn('h-1.5 w-1.5 rounded-full mt-1.5 shrink-0', activityColor[item.type])} />
                    <div className="flex-1 space-y-0.5 min-w-0">
                      <p className="text-xs text-foreground/80 leading-snug">{item.text}</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        {formatRelative(item.time)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
export default RightPanel;
