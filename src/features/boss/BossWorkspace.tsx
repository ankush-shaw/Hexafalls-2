'use client';

import React, { useEffect } from 'react';
import { BossHeader } from './BossHeader';
import { BossAgentCard } from './BossAgentCard';
import { ThinkingEngine } from './ThinkingEngine';
import { CurrentActionCard } from './CurrentActionCard';
import { RequestSummaryCard } from './RequestSummaryCard';
import { BossContextPanel } from './LeftPanel/BossContextPanel';
import { IntelligenceScores } from './RightPanel/IntelligenceScores';
import { MultiProgressPanel } from './RightPanel/MultiProgressPanel';
import { BossEmptyState } from './BossEmptyState';

import {
  IntentCard,
  GoalCard,
  RequirementCard,
  ConstraintCard,
  ComplexityMeter,
  PriorityMatrix,
  EntityList,
  KeywordChips,
  RiskCard,
  PlanningTimeline,
  ReasoningStream,
  MemoryPanel,
  ContextEnginePanel,
  StrategyCard,
} from './intelligence';

import {
  DecisionCenterCard,
  WorkflowPreview,
  DepartmentDiscovery,
  DependencyGraph,
  ValidationChecklist,
  OptimizationCard,
  ConfidenceGauge,
  RiskGauge,
  ExecutionSummary,
  ApprovalPanel,
  SupervisorHandoff,
} from './decision';

import { useBossStore } from '../../store/bossStore';
import { PageContainer } from '../../components/shared/PageContainer';
import { useUIStore } from '../../store/uiStore';

export function BossWorkspace() {
  const { currentSession, isPlanningActive, tickTimer, optimizeWorkflow } = useBossStore();
  const { setBreadcrumbs } = useUIStore();

  useEffect(() => {
    setBreadcrumbs([{ label: 'Boss Agent', href: '/workflow' }, { label: 'CEO Decision Center & Approval' }]);
  }, [setBreadcrumbs]);

  // Master timer tick for elapsed seconds simulation
  useEffect(() => {
    if (!isPlanningActive) return;
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlanningActive, tickTimer]);

  return (
    <PageContainer className="space-y-6 max-w-[1700px] mx-auto">
      {/* Top Header */}
      <BossHeader />

      {!currentSession ? (
        <BossEmptyState />
      ) : (
        /* 3-Column Master Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel (3 Cols): Context, Knowns/Unknowns, Working Memory */}
          <div className="lg:col-span-3 space-y-4">
            <BossContextPanel />
            <ContextEnginePanel contextData={currentSession.contextEngine} />
            <MemoryPanel memory={currentSession.memorySnapshots} />
          </div>

          {/* Center Panel (6 Cols): Hero Avatar Card, Thinking Engine, Intent, Goals, Requirements, Workflow Preview, Validation, Approval, Handoff */}
          <div className="lg:col-span-6 space-y-6">
            <BossAgentCard />
            <CurrentActionCard />
            <ThinkingEngine />
            <ReasoningStream steps={currentSession.reasoningStream} />

            {/* Intelligence Engine Core Panels */}
            <IntentCard intent={currentSession.intent} />
            <GoalCard goals={currentSession.goals} />
            <RequirementCard requirements={currentSession.requirements} />
            <ConstraintCard constraints={currentSession.constraints} />
            <PriorityMatrix goals={currentSession.goals} />
            <StrategyCard strategy={currentSession.strategy} />

            {/* Decision Center & Final Approval Panels */}
            <DecisionCenterCard />
            <WorkflowPreview nodes={currentSession.decision.workflowNodes} />
            <DepartmentDiscovery nodes={currentSession.decision.workflowNodes} />
            <DependencyGraph dependencies={currentSession.decision.workflowDependencies} />
            <ValidationChecklist checklist={currentSession.decision.validationChecklist} />
            <OptimizationCard optimization={currentSession.decision.optimization} onRunOptimization={optimizeWorkflow} />
            <ExecutionSummary />
            <ApprovalPanel />
            <SupervisorHandoff />

            <RequestSummaryCard />
          </div>

          {/* Right Panel (3 Cols): Scores, Gauges, Complexity, Risk, Entities, Keywords, Sub-system Progress, Chronological Timeline */}
          <div className="lg:col-span-3 space-y-4">
            <IntelligenceScores />
            <ConfidenceGauge confidenceBreakdown={currentSession.decision.confidenceBreakdown} />
            <RiskGauge riskBreakdown={currentSession.decision.riskBreakdown} />
            <ComplexityMeter score={currentSession.context.complexityScore} level={currentSession.context.complexityLevel} />
            <RiskCard risk={currentSession.risk} />
            <EntityList entities={currentSession.entities} />
            <KeywordChips keywords={currentSession.keywords} />
            <MultiProgressPanel />
            <PlanningTimeline steps={currentSession.reasoningStream} />
          </div>
        </div>
      )}
    </PageContainer>
  );
}

export default BossWorkspace;
