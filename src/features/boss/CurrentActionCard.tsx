'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock } from 'lucide-react';
import { useBossStore } from '../../store/bossStore';
import { formatDuration } from '../../utils/date.utils';
import { cn } from '../../utils/cn';

interface CurrentActionCardProps {
  className?: string;
}

export function CurrentActionCard({ className }: CurrentActionCardProps) {
  const { currentSession } = useBossStore();

  if (!currentSession) return null;

  const progress = Math.min(100, Math.round((currentSession.currentStepIndex / currentSession.totalSteps) * 100));

  return (
    <div className={cn('p-5 rounded-2xl border border-primary/30 bg-card/90 shadow-lg space-y-3 backdrop-blur-md', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
          <Activity className="h-4 w-4 animate-pulse" /> Active Action Step
        </div>
        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono text-[10px] font-bold">
          Step {currentSession.currentStepIndex} of {currentSession.totalSteps}
        </span>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-bold text-foreground">{currentSession.currentAction}</h4>
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <span>Stage: <strong className="text-foreground capitalize">{currentSession.stage.replace('_', ' ')}</strong></span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Est. Remaining: {formatDuration(currentSession.estimatedRemainingSeconds)}
          </span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
          <span>Step Completion</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrentActionCard;
