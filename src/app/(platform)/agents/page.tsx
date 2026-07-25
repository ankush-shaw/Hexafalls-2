'use client';

import React from 'react';
import { PageLayout } from '../../../layouts/PageLayout';
import { Card, Badge, Skeleton } from '../../../components/ui/design-system';
import { Cpu } from 'lucide-react';

export default function AgentsPage() {
  return (
    <PageLayout
      title="Agent Operations Directory"
      description="Register, configure, and monitor Boss, Supervisor, and Worker AI nodes."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Boss Node Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border/40">
            <Badge variant="warning">Boss Agent</Badge>
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Level 1 Decision</span>
          </div>
          <Card className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/25 rounded-xl">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Boss System Operator</h4>
                <p className="text-[10px] text-muted-foreground">Version 1.0.0</p>
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </Card>
        </div>

        {/* Supervisor Node Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border/40">
            <Badge variant="info">Supervisor Agent</Badge>
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Level 2 Orchestrate</span>
          </div>
          <Card className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-sky-500/10 text-sky-400 border border-sky-500/25 rounded-xl">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Task Dispatch Router</h4>
                <p className="text-[10px] text-muted-foreground">Version 1.0.0</p>
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </Card>
        </div>

        {/* Workers Node Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border/40">
            <Badge variant="success">Workers Agent</Badge>
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Level 3 Execute</span>
          </div>
          <Card className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-xl">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Action Executor Node</h4>
                <p className="text-[10px] text-muted-foreground">Model: gemini-2.5-flash</p>
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
