'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, History } from 'lucide-react';
import { useReviewStore } from '../../store/reviewStore';

export function ReportHistoryDrawer() {
  const { reportHistory, isHistoryDrawerOpen, setIsHistoryDrawerOpen } = useReviewStore();

  if (!isHistoryDrawerOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsHistoryDrawerOpen(false)}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-card border-l border-border/60 shadow-2xl h-full flex flex-col z-10 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-border/40 bg-card/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                <History className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-foreground">Executive Report History</h3>
                <p className="text-xs text-muted-foreground">Previous AI executive audit reports</p>
              </div>
            </div>

            <button
              onClick={() => setIsHistoryDrawerOpen(false)}
              className="p-2 rounded-xl border border-border/50 bg-muted/40 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {reportHistory.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl border border-border/60 bg-muted/20 hover:border-primary/50 transition-all space-y-2 cursor-pointer">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>{item.generatedAt}</span>
                  <span className="text-emerald-400 font-bold">{item.successRate}% Success</span>
                </div>
                <h4 className="text-xs font-extrabold text-foreground">{item.title}</h4>
                <p className="text-[10px] text-muted-foreground font-mono">Workflow ID: {item.workflowId}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ReportHistoryDrawer;
