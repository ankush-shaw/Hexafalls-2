'use client';

import React, { useState } from 'react';
import { GitFork, Bot, Users, Cpu, Sparkles } from 'lucide-react';
import { BossWorkspace } from '../../../features/boss';
import { SupervisorWorkspace } from '../../../features/supervisor';
import { WorkerWorkspace } from '../../../features/workers';
import { LiveWorkflowWorkspace } from '../../../features/workflow';
import { cn } from '../../../utils/cn';

export default function WorkflowPage() {
  const [activeTab, setActiveTab] = useState<'canvas' | 'boss' | 'supervisor' | 'workers'>('canvas');

  return (
    <div className="space-y-4">
      {/* Executive Workspace View Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-2 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md max-w-[1700px] mx-auto">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('canvas')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer',
              activeTab === 'canvas'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md scale-102'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
            )}
          >
            <GitFork className="h-4 w-4" />
            <span>Live Agent Canvas & Replay</span>
          </button>

          <button
            onClick={() => setActiveTab('boss')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer',
              activeTab === 'boss'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 shadow-md scale-102'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
            )}
          >
            <Bot className="h-4 w-4" />
            <span>Boss Agent (CEO Strategy)</span>
          </button>

          <button
            onClick={() => setActiveTab('supervisor')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer',
              activeTab === 'supervisor'
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-sky-950 shadow-md scale-102'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
            )}
          >
            <Users className="h-4 w-4" />
            <span>Supervisor AI (COO Operations)</span>
          </button>

          <button
            onClick={() => setActiveTab('workers')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer',
              activeTab === 'workers'
                ? 'bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-md scale-102'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
            )}
          >
            <Cpu className="h-4 w-4" />
            <span>Worker Agents Ecosystem</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
          <Sparkles className="h-3 w-3" /> Enterprise Multi-Agent OS
        </div>
      </div>

      {/* Render Selected Executive Workspace */}
      {activeTab === 'canvas' && <LiveWorkflowWorkspace />}
      {activeTab === 'boss' && <BossWorkspace />}
      {activeTab === 'supervisor' && <SupervisorWorkspace />}
      {activeTab === 'workers' && <WorkerWorkspace />}
    </div>
  );
}
