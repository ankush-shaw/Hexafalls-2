'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Users, ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { useBossStore } from '../../../store/bossStore';
import { cn } from '../../../utils/cn';

interface SupervisorHandoffProps {
  className?: string;
}

export function SupervisorHandoff({ className }: SupervisorHandoffProps) {
  const { currentSession } = useBossStore();

  if (!currentSession) return null;

  const isHandedOff = currentSession.decision.approvalStatus === 'handed_off';

  if (!isHandedOff) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn('p-8 rounded-3xl border-2 border-emerald-500/50 bg-gradient-to-br from-card via-card to-emerald-500/10 shadow-2xl space-y-6 text-center backdrop-blur-xl', className)}
    >
      {/* Top Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold text-xs uppercase tracking-widest animate-pulse">
        <Sparkles className="h-4 w-4" /> Execution Plan Sent Successfully
      </div>

      <div className="space-y-2 max-w-xl mx-auto">
        <h2 className="text-2xl font-black tracking-tight text-foreground">
          Waiting for Supervisor AI
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The Boss Agent CEO has finalized, validated, and signed off on the execution blueprint. The workflow payload is now queued for Supervisor Agent Alpha & Beta task execution.
        </p>
      </div>

      {/* Animated Flowing Connection Cards (Boss -> Arrow -> Supervisor Placeholder) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4">
        {/* Boss CEO Card */}
        <div className="p-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-400 flex items-center gap-3 w-60">
          <div className="p-2.5 rounded-xl bg-amber-500/20">
            <Bot className="h-6 w-6" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold text-foreground">Boss Agent CEO</h4>
            <p className="text-[10px] text-muted-foreground">Blueprint Approved</p>
          </div>
        </div>

        {/* Animated Flowing Arrow */}
        <div className="flex items-center gap-1 text-emerald-400 font-mono text-xs animate-pulse">
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex items-center gap-1"
          >
            <span>Payload Stream</span>
            <ArrowRight className="h-5 w-5" />
          </motion.div>
        </div>

        {/* Supervisor Placeholder Card */}
        <div className="p-4 rounded-2xl border-2 border-dashed border-sky-500/40 bg-sky-500/10 text-sky-400 flex items-center gap-3 w-60">
          <div className="p-2.5 rounded-xl bg-sky-500/20">
            <Users className="h-6 w-6" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold text-foreground">Supervisor AI</h4>
            <p className="text-[10px] text-sky-400 font-semibold">Ready for Phase 5 Execution</p>
          </div>
        </div>
      </div>

      {/* Handoff Details Footer */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground pt-2 border-t border-border/40 font-mono">
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-primary" /> Est. Start: Immediate
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Handoff ID: HND-{currentSession.sessionId.slice(-6)}
        </span>
      </div>
    </motion.div>
  );
}

export default SupervisorHandoff;
