'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, RefreshCw } from 'lucide-react';

import { useWorkerStore } from '../../store/workerStore';
import { ExecutionLog } from './ExecutionLog';
import { ResultCard } from './ResultCard';
import { cn } from '../../utils/cn';

export function WorkerDetails() {
  const { workers, selectedWorkerId, setSelectedWorkerId, retryWorkerTask, cancelWorkerTask } = useWorkerStore();

  const worker = workers.find((w) => w.id === selectedWorkerId);

  if (!worker) return null;

  const executionStages = ['Received', 'Planning', 'Executing', 'Validating', 'Result Returned'];

  const getStageIndex = () => {
    if (worker.status === 'completed') return 4;
    if (worker.status === 'running') return 2;
    if (worker.status === 'planning') return 1;
    if (worker.status === 'retrying') return 2;
    return 0;
  };

  const currentStageIdx = getStageIndex();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedWorkerId(null)}
          className="absolute inset-0"
        />

        {/* Drawer Body */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-xl bg-card border-l border-border/60 shadow-2xl h-full flex flex-col z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/40 bg-card/60">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${worker.avatarColor} text-white shadow-md`}>
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-foreground">{worker.name}</h3>
                <p className="text-xs text-muted-foreground">{worker.department} Department · Worker ID: {worker.id}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedWorkerId(null)}
              className="p-2 rounded-xl border border-border/50 bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Task Banner */}
            <div className="p-4 rounded-2xl border border-primary/30 bg-primary/5 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Active Assigned Task</span>
              <h4 className="text-sm font-extrabold text-foreground">{worker.assignedTaskName}</h4>
              <p className="text-xs text-sky-400 font-mono pt-1">Current Step: {worker.currentStep}</p>
            </div>

            {/* 5-Stage Execution Visualization */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Execution Flow Pipeline</span>
              <div className="flex items-center justify-between text-[10px] font-mono border-b border-border/40 pb-2">
                {executionStages.map((stageName, idx) => {
                  const isDone = idx <= currentStageIdx;
                  return (
                    <div key={stageName} className="flex flex-col items-center gap-1 text-center">
                      <div
                        className={cn(
                          'h-4 w-4 rounded-full flex items-center justify-center font-bold text-[9px]',
                          isDone ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {idx + 1}
                      </div>
                      <span className={isDone ? 'text-foreground font-bold' : 'text-muted-foreground'}>{stageName}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subtasks Progress */}
            {worker.subtasks.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Subtask Execution Progress</span>
                <div className="space-y-2">
                  {worker.subtasks.map((st) => (
                    <div key={st.id} className="p-3 rounded-xl border border-border/40 bg-muted/20 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground">{st.title}</span>
                        <span className="font-mono text-[10px] font-bold text-sky-400">{st.progressPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-sky-400 rounded-full" style={{ width: `${st.progressPercent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Returned Result Card */}
            {worker.result && <ResultCard result={worker.result} />}

            {/* Live Streaming Logs */}
            <ExecutionLog logs={worker.logs} />

            {/* Performance Metrics */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Simulated Hardware & Token Metrics</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20">
                  <span className="text-[9px] text-muted-foreground">CPU Usage</span>
                  <p className="font-mono font-bold text-sky-400">{worker.metrics.cpuUsage}%</p>
                </div>
                <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20">
                  <span className="text-[9px] text-muted-foreground">Memory</span>
                  <p className="font-mono font-bold text-foreground">{worker.metrics.memoryUsage}</p>
                </div>
                <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20">
                  <span className="text-[9px] text-muted-foreground">LLM Tokens</span>
                  <p className="font-mono font-bold text-amber-400">{worker.metrics.tokensUsed.toLocaleString()}</p>
                </div>
                <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20">
                  <span className="text-[9px] text-muted-foreground">API Requests</span>
                  <p className="font-mono font-bold text-emerald-400">{worker.metrics.apiRequests}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 border-t border-border/40 bg-card/60 flex items-center justify-between gap-3">
            <button
              onClick={() => retryWorkerTask(worker.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-400 font-bold text-xs hover:bg-amber-500/20 transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" /> Retry Worker Task
            </button>

            <button
              onClick={() => cancelWorkerTask(worker.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-400 font-bold text-xs hover:bg-rose-500/20 transition-colors cursor-pointer"
            >
              Cancel Execution
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default WorkerDetails;
