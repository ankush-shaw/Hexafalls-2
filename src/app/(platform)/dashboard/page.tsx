'use client';

import React from 'react';
import { PageLayout } from '../../../layouts/PageLayout';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card, Badge, Progress } from '../../../components/ui/design-system';
import { Cpu, Activity, Play, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <PageLayout
      title="Operations Command Center"
      description="Real-time multi-agent telemetry and system throughput monitoring metrics."
      actions={
        <div className="flex gap-2">
          <Badge variant="success">Socket: Connected</Badge>
          <Badge variant="primary">Agent version: 1.0.0</Badge>
        </div>
      }
    >
      <DashboardLayout
        metrics={
          <>
            <Card className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-muted-foreground">
                <span className="text-xs font-semibold uppercase tracking-wider">Active Workers</span>
                <Cpu className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold">12</div>
              <Progress value={78} />
            </Card>

            <Card className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-muted-foreground">
                <span className="text-xs font-semibold uppercase tracking-wider">Workflows Running</span>
                <Activity className="h-4 w-4 text-sky-400" />
              </div>
              <div className="text-3xl font-extrabold">4</div>
              <Progress value={45} />
            </Card>

            <Card className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-muted-foreground">
                <span className="text-xs font-semibold uppercase tracking-wider">Completed Tasks</span>
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="text-3xl font-extrabold">1,482</div>
              <Progress value={98} />
            </Card>

            <Card className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-muted-foreground">
                <span className="text-xs font-semibold uppercase tracking-wider">System Accuracy</span>
                <Play className="h-4 w-4 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold">99.2%</div>
              <Progress value={99.2} />
            </Card>
          </>
        }
        mainContent={
          <div className="space-y-4">
            <Card className="h-96 flex flex-col justify-between">
              <div className="border-b border-border/30 pb-3">
                <h3 className="font-bold text-sm">System Operations Stream</h3>
              </div>
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-xs font-semibold">
                Telemetry activity stream will connect in Phase 2
              </div>
            </Card>
          </div>
        }
        sidePanel={
          <Card className="h-96 flex flex-col justify-between">
            <div className="border-b border-border/30 pb-3">
              <h3 className="font-bold text-sm">Active Agents</h3>
            </div>
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-xs font-semibold">
              Live status dashboard will connect in Phase 2
            </div>
          </Card>
        }
      />
    </PageLayout>
  );
}
