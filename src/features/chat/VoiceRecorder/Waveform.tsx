'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

interface WaveformProps {
  isRecording: boolean;
  isPaused?: boolean;
  volumeLevel?: number; // 0 to 100
  barCount?: number;
  className?: string;
}

export function Waveform({
  isRecording,
  isPaused = false,
  volumeLevel = 50,
  barCount = 16,
  className,
}: WaveformProps) {
  return (
    <div className={cn('flex items-center justify-center gap-1 h-12 py-1', className)}>
      {Array.from({ length: barCount }).map((_, i) => {
        const factor = Math.sin((i / barCount) * Math.PI); // bell curve multiplier
        const baseHeight = 6;
        const dynamicHeight = isRecording && !isPaused ? Math.max(8, (volumeLevel / 100) * 36 * factor) : baseHeight;

        return (
          <motion.span
            key={i}
            className={cn(
              'w-1 rounded-full transition-all duration-75',
              isPaused
                ? 'bg-amber-400/40'
                : isRecording
                ? 'bg-rose-500 shadow-sm shadow-rose-500/40'
                : 'bg-muted-foreground/30'
            )}
            animate={{
              height: isRecording && !isPaused ? [dynamicHeight * 0.5, dynamicHeight, dynamicHeight * 0.7] : baseHeight,
            }}
            transition={{
              repeat: isRecording && !isPaused ? Infinity : 0,
              repeatType: 'reverse',
              duration: 0.3 + (i % 3) * 0.1,
            }}
          />
        );
      })}
    </div>
  );
}

export default Waveform;
