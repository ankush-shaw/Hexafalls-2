'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, RefreshCw, Send, ShieldCheck } from 'lucide-react';
import { useBossStore } from '../../../store/bossStore';
import { cn } from '../../../utils/cn';

interface ApprovalPanelProps {
  className?: string;
}

export function ApprovalPanel({ className }: ApprovalPanelProps) {
  const { currentSession, approvePlan, optimizeWorkflow, replanSession } = useBossStore();

  if (!currentSession) return null;

  const isApproved = currentSession.decision.approvalStatus === 'approved' || currentSession.decision.approvalStatus === 'handed_off';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-6 rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-card via-card to-emerald-500/10 shadow-2xl backdrop-blur-xl space-y-4 text-center', className)}
    >
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest">
          <ShieldCheck className="h-4 w-4" /> Boss CEO Final Approval Phase
        </div>
        <h3 className="text-xl font-extrabold tracking-tight text-foreground">
          {isApproved ? 'Execution Blueprint Approved!' : 'Approve Execution Blueprint & Handoff'}
        </h3>
        <p className="text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {isApproved
            ? 'Workflow plan has been signed off by Boss Agent CEO and transferred to Supervisor Agent for department execution.'
            : 'Review completed. Click below to approve strategy and send workflow payload to Supervisor Agent.'}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {!isApproved ? (
          <>
            <button
              onClick={approvePlan}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-sm hover:opacity-90 transition-all shadow-xl shadow-emerald-500/25 cursor-pointer scale-105"
            >
              <Send className="h-4 w-4" /> Approve Plan & Send to Supervisor
            </button>

            <button
              onClick={optimizeWorkflow}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-primary/40 bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-all cursor-pointer"
            >
              <Zap className="h-4 w-4" /> Optimize Workflow
            </button>

            <button
              onClick={replanSession}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-border/60 bg-muted/40 text-muted-foreground hover:text-foreground text-xs font-semibold hover:bg-muted cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Re-plan Strategy
            </button>
          </>
        ) : (
          <div className="flex items-center gap-2 px-6 py-2.5 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="h-4 w-4" /> Approved & Handed Off to Supervisor AI
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ApprovalPanel;
