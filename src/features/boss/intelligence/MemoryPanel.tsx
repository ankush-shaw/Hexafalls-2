'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { MemorySnapshotItem } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface MemoryPanelProps {
  memory?: MemorySnapshotItem[];
  className?: string;
}

export function MemoryPanel({ memory = [], className }: MemoryPanelProps) {
  if (memory.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-3', className)}
    >
      <SectionHeader
        icon={Database}
        title="AI CEO Working Memory"
        description="Persistent corporate rules, scaling policies, and prior session benchmarks"
        badge="Read-Only Memory"
        badgeColor="bg-violet-500/10 text-violet-400 border-violet-500/30"
      />

      <div className="space-y-2 text-xs">
        {memory.map((item) => (
          <div key={item.id} className="p-3 rounded-xl border border-border/40 bg-muted/20 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">{item.key}</span>
              <span className="px-1.5 py-0.2 rounded bg-muted text-[9px] uppercase tracking-wider font-mono text-muted-foreground">
                {item.type}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug">{item.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default MemoryPanel;
