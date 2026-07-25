'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { useWorkflowStore } from '../../store/workflowStore';
import { cn } from '../../utils/cn';

interface LiveEventFeedProps {
  className?: string;
}

export function LiveEventFeed({ className }: LiveEventFeedProps) {
  const { liveEvents } = useWorkflowStore();

  if (liveEvents.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-3', className)}
    >
      <SectionHeader
        icon={Activity}
        title="Live Execution Event Feed"
        description="Streaming WebSocket event triggers across nodes and edges"
        badge="Live Stream"
      />

      <div className="space-y-2 text-xs max-h-56 overflow-y-auto pr-1 font-mono">
        {liveEvents.map((evt) => (
          <div key={evt.id} className="p-2.5 rounded-xl border border-border/40 bg-black/70 text-slate-200 space-y-0.5">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="text-primary font-bold">{evt.type}</span>
              <span>{evt.timestamp}</span>
            </div>
            <p className="text-[11px] font-bold text-slate-100">{evt.title}</p>
            <p className="text-[10px] text-slate-400 truncate">{evt.detail}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default LiveEventFeed;
