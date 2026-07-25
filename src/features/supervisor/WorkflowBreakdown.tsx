'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Workflow } from 'lucide-react';
import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { SupervisorTask } from '../../types/supervisor.types';
import { cn } from '../../utils/cn';

interface WorkflowBreakdownProps {
  tasks?: SupervisorTask[];
  className?: string;
}

const statusBadges: Record<string, string> = {
  running: 'border-sky-500/40 bg-sky-500/10 text-sky-400',
  completed: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  waiting: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  blocked: 'border-slate-500/40 bg-slate-500/10 text-slate-400',
  retry: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
};

export function WorkflowBreakdown({ tasks = [], className }: WorkflowBreakdownProps) {
  if (tasks.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-6 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-xl space-y-4', className)}
    >
      <SectionHeader
        icon={Workflow}
        title="Workflow Decomposition & Task Allocation"
        description="Parsed Boss CEO approved workflow into executable task units across departments"
        badge={`${tasks.length} Decomposed Tasks`}
        badgeColor="bg-sky-500/10 text-sky-400 border-sky-500/30"
      />

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 rounded-2xl border border-border/50 bg-card/60 space-y-2.5">

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={cn('px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border', statusBadges[task.status])}>
                  {task.status}
                </span>
                <h4 className="text-xs font-bold text-foreground">{task.title}</h4>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono shrink-0">
                <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-semibold uppercase">{task.department}</span>
                <span className="font-bold text-sky-400">{task.estimatedDuration}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                <span>Assigned Worker: <strong className="text-foreground">{task.assignedWorkerName || 'Unassigned'}</strong></span>
                <span>{task.progressPercent}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-sky-400 rounded-full" style={{ width: `${task.progressPercent}%` }} />
              </div>
            </div>

            {/* Subtasks List */}
            {task.subtasks.length > 0 && (
              <div className="pt-2 border-t border-border/30 space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Subtask Pipeline ({task.subtasks.length})</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  {task.subtasks.map((st) => (
                    <div key={st.id} className="p-2 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-between">
                      <span className="truncate text-foreground/90 font-medium">{st.title}</span>
                      <span className={cn('px-1.5 py-0.2 rounded text-[8px] font-mono uppercase border shrink-0', statusBadges[st.status])}>
                        {st.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default WorkflowBreakdown;
