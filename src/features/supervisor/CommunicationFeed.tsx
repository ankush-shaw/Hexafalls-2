'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { SupervisorCommunication } from '../../types/supervisor.types';
import { cn } from '../../utils/cn';

interface CommunicationFeedProps {
  communications?: SupervisorCommunication[];
  className?: string;
}

export function CommunicationFeed({ communications = [], className }: CommunicationFeedProps) {
  if (communications.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-3', className)}
    >
      <SectionHeader
        icon={MessageSquare}
        title="Supervisor ↔ Worker Communication Stream"
        description="Real-time message exchange between Supervisor COO and active Worker Agents"
        badge={`${communications.length} Messages`}
      />

      <div className="space-y-2 text-xs max-h-56 overflow-y-auto pr-1">
        {communications.map((comm) => (
          <div key={comm.id} className="p-3 rounded-xl border border-border/40 bg-muted/20 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1 font-bold text-sky-400">
                {comm.sender} <ArrowRight className="h-3 w-3" /> {comm.recipient}
              </span>
              <span>{comm.timestamp}</span>
            </div>
            <p className="text-[11px] text-foreground font-medium leading-snug">{comm.message}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default CommunicationFeed;
