'use client';

import React from 'react';
import { Play, Pause, Film } from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';
import { cn } from '../../utils/cn';

export function WorkflowReplay() {
  const { replayState, toggleReplayPlay, setReplaySpeed, setReplayProgress } = useWorkflowStore();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-2">
        <Film className="h-4 w-4 text-primary" />
        <div>
          <h4 className="text-xs font-extrabold text-foreground">Workflow Execution Replay Engine</h4>
          <p className="text-[10px] text-muted-foreground">Scrub, pause, and replay step snapshots of completed execution sessions</p>
        </div>
      </div>

      {/* Scrubber Bar */}
      <div className="flex-1 w-full max-w-md space-y-1">
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
          <span>Step {replayState.currentStepIndex} / {replayState.totalSteps}</span>
          <span className="font-bold text-primary">{replayState.scrubProgress}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={replayState.scrubProgress}
          onChange={(e) => setReplayProgress(Number(e.target.value))}
          className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 text-xs shrink-0">
        <button
          onClick={toggleReplayPlay}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors cursor-pointer"
        >
          {replayState.isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
          <span>{replayState.isPlaying ? 'Pause' : 'Replay'}</span>
        </button>

        {/* Speed Selector */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/30 border border-border/40 font-mono text-[10px]">
          {([1, 2, 4] as const).map((s) => (
            <button
              key={s}
              onClick={() => setReplaySpeed(s)}
              className={cn(
                'px-2 py-0.5 rounded-lg font-bold transition-colors cursor-pointer',
                replayState.speed === s ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkflowReplay;
