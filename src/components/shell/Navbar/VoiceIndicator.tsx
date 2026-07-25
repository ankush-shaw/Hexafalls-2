'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceStore } from '../../../store/voiceStore';
import { cn } from '../../../utils/cn';

export function VoiceIndicator() {
  const { isRecording, isListening } = useVoiceStore();
  const muted = !isListening && isRecording;

  if (!isRecording) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="voice-active"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={cn(
          'hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold',
          muted
            ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
            : 'border-rose-500/30 bg-rose-500/10 text-rose-400'
        )}
      >
        {muted ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3 animate-pulse" />}
        <span>{muted ? 'Muted' : 'Recording'}</span>
        {!muted && (
          <span className="flex gap-0.5 items-end h-3">
            {[1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-0.5 bg-rose-400 rounded-full"
                animate={{ height: ['4px', '10px', '4px'] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
              />
            ))}
          </span>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
export default VoiceIndicator;
