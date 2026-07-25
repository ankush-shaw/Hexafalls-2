'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../intelligence/SectionHeader';
import { WorkflowDependency } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface DependencyGraphProps {
  dependencies?: WorkflowDependency[];
  className?: string;
}

export function DependencyGraph({ dependencies = [], className }: DependencyGraphProps) {
  if (dependencies.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-3', className)}
    >
      <SectionHeader
        icon={Network}
        title="Department Dependency Map"
        description="Visualizing operational prerequisite connections between departments"
        badge={`${dependencies.length} Links`}
      />

      <div className="space-y-2 text-xs">
        {dependencies.map((dep, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border/40 bg-muted/20">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-foreground">
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">{dep.sourceId}</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">{dep.targetId}</span>
            </div>
            <span className="text-[10px] text-muted-foreground truncate max-w-xs">{dep.reason}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default DependencyGraph;
