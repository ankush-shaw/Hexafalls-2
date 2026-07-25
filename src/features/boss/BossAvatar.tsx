'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain } from 'lucide-react';
import { BossEmotionState, BossPlanningStage } from '../../types/boss.types';
import { cn } from '../../utils/cn';

interface BossAvatarProps {
  stage?: BossPlanningStage;
  emotion?: BossEmotionState;
  className?: string;
}

const themeByStage: Record<BossPlanningStage, { ring: string; glow: string; iconColor: string }> = {
  idle: { ring: 'border-muted-foreground/30', glow: 'from-muted-foreground/10 to-transparent', iconColor: 'text-muted-foreground' },
  receiving: { ring: 'border-sky-500/50', glow: 'from-sky-500/20 to-primary/10', iconColor: 'text-sky-400' },
  reading: { ring: 'border-sky-400/60', glow: 'from-sky-400/20 to-indigo-500/10', iconColor: 'text-sky-300' },
  understanding: { ring: 'border-indigo-500/60', glow: 'from-indigo-500/25 to-purple-500/10', iconColor: 'text-indigo-400' },
  thinking: { ring: 'border-amber-500/70', glow: 'from-amber-500/30 to-primary/20', iconColor: 'text-amber-400' },
  planning: { ring: 'border-violet-500/70', glow: 'from-violet-500/30 to-amber-500/20', iconColor: 'text-violet-400' },
  workflow_building: { ring: 'border-primary/80', glow: 'from-primary/35 to-violet-600/20', iconColor: 'text-primary' },
  validating: { ring: 'border-emerald-500/80', glow: 'from-emerald-500/35 to-teal-500/20', iconColor: 'text-emerald-400' },
  completed: { ring: 'border-emerald-400', glow: 'from-emerald-400/40 to-teal-400/20', iconColor: 'text-emerald-300' },
};

export function BossAvatar({ stage = 'idle', emotion = 'idle', className }: BossAvatarProps) {
  const theme = themeByStage[stage] || themeByStage.idle;

  return (
    <div className={cn('relative flex items-center justify-center py-6 select-none', className)}>
      {/* Outer Pulsing Ambient Aura Rings */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'easeInOut',
        }}
        className={cn(
          'absolute h-44 w-44 rounded-full bg-gradient-to-r blur-2xl pointer-events-none',
          theme.glow
        )}
      />

      <motion.div
        animate={{
          scale: [1.05, 0.95, 1.05],
          rotate: [0, 180, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: 'linear',
        }}
        className={cn(
          'absolute h-36 w-36 rounded-full border-2 border-dashed opacity-40 pointer-events-none',
          theme.ring
        )}
      />

      {/* Hero Avatar Card Container */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className={cn(
          'relative z-10 h-28 w-28 rounded-3xl bg-card/90 border-2 shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center p-3 transition-colors duration-500',
          theme.ring
        )}
      >
        {/* Glowing Central AI Core Icon */}
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={
              stage === 'thinking' || stage === 'planning'
                ? { rotate: [0, 360] }
                : { scale: [0.95, 1.05, 0.95] }
            }
            transition={{ repeat: Infinity, duration: stage === 'thinking' ? 4 : 2, ease: 'easeInOut' }}
          >
            <Brain className={cn('h-12 w-12 transition-colors duration-500', theme.iconColor)} />
          </motion.div>

          <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-amber-400 animate-pulse" />
        </div>

        {/* Status indicator dot */}
        <div className="flex items-center gap-1.5 mt-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/80">CEO AI</span>
        </div>
      </motion.div>

      {/* Floating Emotion Tag */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={emotion}
        className="absolute -bottom-1 z-20 px-3 py-1 rounded-full border border-primary/30 bg-popover/90 text-primary text-[10px] font-bold uppercase tracking-widest shadow-md backdrop-blur-sm"
      >
        State: {emotion}
      </motion.div>
    </div>
  );
}

export default BossAvatar;
