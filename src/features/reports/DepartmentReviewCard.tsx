'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { DepartmentReviewItem } from '../../types/review.types';
import { useReviewStore } from '../../store/reviewStore';
import { cn } from '../../utils/cn';

interface DepartmentReviewCardProps {
  dept: DepartmentReviewItem;
}

export function DepartmentReviewCard({ dept }: DepartmentReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { selectedDepartmentId, setSelectedDepartmentId } = useReviewStore();

  const isSelected = selectedDepartmentId === dept.id;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'p-5 rounded-3xl border transition-all cursor-pointer space-y-3 backdrop-blur-xl shadow-xl',
        isSelected ? 'border-primary/60 bg-card/90 ring-1 ring-primary/30' : 'border-border/60 bg-card/60 hover:border-primary/40'
      )}
      onClick={() => setSelectedDepartmentId(dept.id)}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${dept.workerAvatar} text-white shadow-md`}>
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-extrabold text-foreground">{dept.department}</h3>
              <span className="px-2 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Audit Passed
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground font-semibold">Worker: {dept.workerName}</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono font-extrabold text-emerald-400">{dept.confidenceScore}% Conf.</span>
          <span className="text-[10px] text-muted-foreground block font-mono">Time: {dept.executionTime}</span>
        </div>
      </div>

      {/* Summary */}
      <p className="text-xs text-foreground/90 font-medium leading-relaxed">{dept.summary}</p>

      {/* Key Output Badges */}
      {dept.keyOutputs.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {dept.keyOutputs.map((out, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-card border border-primary/20 text-primary font-mono text-[10px] font-semibold">
              ✓ {out}
            </span>
          ))}
        </div>
      )}

      {/* Expand / Collapse Toggle for Subtask Breakdown */}
      <div className="pt-2 border-t border-border/30">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="flex items-center justify-between w-full text-[10px] font-mono font-bold text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <span>Subtasks & Execution Logs ({dept.tasks.length})</span>
          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 space-y-2 overflow-hidden text-xs"
            >
              {dept.tasks.map((task) => (
                <div key={task.id} className="p-3 rounded-xl border border-border/40 bg-muted/20 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">{task.title}</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{task.duration}</span>
                  </div>

                  {task.logs.length > 0 && (
                    <div className="p-2 rounded-lg bg-black/70 font-mono text-[10px] text-slate-300 space-y-0.5">
                      {task.logs.map((log, i) => (
                        <p key={i}>&gt; {log}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default DepartmentReviewCard;
