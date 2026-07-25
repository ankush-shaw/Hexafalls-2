'use client';

import React from 'react';
import { Shield, Database, Tag, Building2, Layers } from 'lucide-react';
import { useBossStore } from '../../../store/bossStore';
import { cn } from '../../../utils/cn';


interface BossContextPanelProps {
  className?: string;
}

const priorityColors = {
  low: 'border-slate-500/30 bg-slate-500/10 text-slate-400',
  medium: 'border-sky-500/30 bg-sky-500/10 text-sky-400',
  high: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  critical: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
};

export function BossContextPanel({ className }: BossContextPanelProps) {
  const { currentSession } = useBossStore();

  const ctx = currentSession?.context || {
    domain: 'Enterprise Intelligence',
    taskType: 'Strategic Planning',
    priority: 'high' as const,
    urgency: 'immediate' as const,
    departmentsNeeded: ['Finance', 'Data Science', 'Operations', 'Marketing'],
    complexityScore: 88,
    confidenceScore: 96,
    planningAccuracy: 98.4,
    riskLevel: 'low' as const,
    estimatedDuration: '3m 45s',
  };

  const memory = currentSession?.memorySnapshots || [
    { id: '1', key: 'Governance Rule', value: 'Legal approval required for external API calls', type: 'rule' as const },
    { id: '2', key: 'Worker Scaling', value: 'Max 10 worker threads allocated per supervisor', type: 'constraint' as const },
  ];

  return (
    <div className={cn('space-y-4 overflow-y-auto pr-1', className)}>
      {/* CEO Identity Card */}
      <div className="p-4 rounded-2xl border border-primary/20 bg-card space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
          <Shield className="h-4 w-4 text-primary" /> Boss Agent Identity
        </div>
        <p className="text-xs text-foreground/90 font-medium leading-relaxed">
          Version 3.5 Omniscient Strategic Engine. Autonomous reasoning and execution planning layer.
        </p>
        <div className="flex items-center gap-2 pt-1 text-[10px] text-muted-foreground font-mono">
          <span>Scope: Enterprise OS</span>
          <span>•</span>
          <span>Role: CEO AI</span>
        </div>
      </div>

      {/* Detected Context Badges */}
      <div className="p-4 rounded-2xl border border-border/60 bg-card space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <Tag className="h-3.5 w-3.5 text-primary" /> Detected Context
        </div>

        <div className="space-y-2">
          <div>
            <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-semibold">Business Domain</span>
            <p className="text-xs font-bold text-foreground mt-0.5">{ctx.domain}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-semibold">Task Type</span>
              <p className="text-xs font-semibold text-foreground mt-0.5 truncate">{ctx.taskType}</p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-semibold">Priority</span>
              <div className="mt-0.5">
                <span className={cn('inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border', priorityColors[ctx.priority])}>
                  {ctx.priority}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Departments Needed Badges */}
      <div className="p-4 rounded-2xl border border-border/60 bg-card space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-amber-400" /> Departments Needed
          </span>
          <span className="text-primary font-mono text-[10px]">{ctx.departmentsNeeded.length} Active</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {ctx.departmentsNeeded.map((dept) => (
            <span
              key={dept}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-primary/20 bg-primary/10 text-primary text-xs font-semibold shadow-xs"
            >
              <Layers className="h-3 w-3" />
              {dept}
            </span>
          ))}
        </div>
      </div>

      {/* Boss Memory Snapshots */}
      <div className="p-4 rounded-2xl border border-border/60 bg-card space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <Database className="h-3.5 w-3.5 text-violet-400" /> Memory Snapshot
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">{memory.length} Rules</span>
        </div>

        <div className="space-y-2">
          {memory.map((item) => (
            <div key={item.id} className="p-2.5 rounded-xl border border-border/40 bg-muted/20 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground text-[11px]">{item.key}</span>
                <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-muted text-muted-foreground font-mono">
                  {item.type}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BossContextPanel;
