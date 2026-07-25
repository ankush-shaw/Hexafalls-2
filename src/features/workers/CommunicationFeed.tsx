'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { useWorkerStore } from '../../store/workerStore';
import { cn } from '../../utils/cn';

interface CommunicationFeedProps {
  className?: string;
}

export function CommunicationFeed({ className }: CommunicationFeedProps) {
  const { messages } = useWorkerStore();

  if (messages.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-xl space-y-3', className)}
    >
      <SectionHeader
        icon={MessageSquare}
        title="Live Worker ↔ Supervisor Inter-Agent Communication"
        description="Streaming inter-agent message logs across all active worker threads"
        badge={`${messages.length} Active Messages`}
      />

      <div className="space-y-2 text-xs max-h-56 overflow-y-auto pr-1">
        {messages.map((msg) => (
          <div key={msg.id} className="p-3 rounded-xl border border-border/40 bg-muted/20 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1 font-bold text-primary">
                {msg.senderName} <ArrowRight className="h-3 w-3" /> {msg.recipientName}
              </span>
              <span>{msg.timestamp}</span>
            </div>
            <p className="text-[11px] text-foreground font-medium leading-snug">{msg.content}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default CommunicationFeed;
