'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { SupervisorTask } from '../../types/supervisor.types';
import { cn } from '../../utils/cn';

interface DependencyViewProps {
  tasks?: SupervisorTask[];
  className?: string;
}

export function DependencyView({ tasks = [], className }: DependencyViewProps) {
  const dependentTasks = tasks.filter((t) => t.dependencies.length > 0);

  if (dependentTasks.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-3', className)}
    >
      <SectionHeader
        icon={Network}
        title="Execution Prerequisite Map"
        description="Dependency relationships preventing out-of-order worker execution"
      />

      <div className="space-y-2 text-xs">
        {dependentTasks.map((t) => (
          <div key={t.id} className="p-3 rounded-xl border border-border/40 bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">{t.dependencies.join(', ')}</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">{t.id}</span>
            </div>
            <span className="text-[10px] text-muted-foreground truncate">{t.department}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default DependencyView;
