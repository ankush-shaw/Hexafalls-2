'use client';

import React from 'react';
import { PageLayout } from '../../../layouts/PageLayout';
import { Card } from '../../../components/ui/design-system';
import { GitFork } from 'lucide-react';

export default function WorkflowPage() {
  return (
    <PageLayout
      title="Workflow Engine"
      description="Design, connect, and execute multi-agent coordination pipelines."
      actions={
        <div className="flex gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary rounded-md">
            Graph Editor Ready
          </span>
        </div>
      }
    >
      <Card className="h-[60vh] flex flex-col justify-between items-center p-8 bg-card/40 border border-dashed border-border/80">
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-primary/10 text-primary rounded-full border border-primary/25 animate-pulse">
            <GitFork className="h-8 w-8" />
          </div>
          <div className="text-center space-y-1.5 max-w-sm">
            <h3 className="font-bold text-base">Workflow Builder</h3>
            <p className="text-xs text-muted-foreground">
              React Flow drag-and-drop workspace for agent node execution routes will initialize here in Phase 2.
            </p>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
}
