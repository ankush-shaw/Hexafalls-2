'use client';

import React, { useEffect } from 'react';
import { ReviewHeader } from './ReviewHeader';
import { ReviewDashboard } from './ReviewDashboard';
import { DepartmentReviewCard } from './DepartmentReviewCard';
import { ValidationChecklist } from './ValidationChecklist';
import { QualityAnalysisCard, ConfidenceGaugeCard, RiskAnalysisCard } from './QualityAnalysisCard';
import { ApprovalPanel } from './ApprovalPanel';
import { GeminiReportStream } from './GeminiReportStream';
import { ExecutiveReportView } from './ExecutiveReportView';
import { ReportHistoryDrawer } from './ReportHistoryDrawer';
import { useReviewStore } from '../../store/reviewStore';
import { PageContainer } from '../../components/shared/PageContainer';
import { useUIStore } from '../../store/uiStore';

export function BossReviewWorkspace() {
  const { departments, isGeneratingReport, activeReport, reviewStatus } = useReviewStore();
  const { setBreadcrumbs } = useUIStore();

  useEffect(() => {
    setBreadcrumbs([{ label: 'Reports', href: '/reports' }, { label: 'Boss Review Center' }]);
  }, [setBreadcrumbs]);

  return (
    <PageContainer className="space-y-6 max-w-[1700px] mx-auto">
      {/* Header */}
      <ReviewHeader />

      {/* Top Review Metrics Dashboard */}
      <ReviewDashboard />

      {/* CEO Decision Action Bar */}
      <ApprovalPanel />

      {/* Gemini Stream Loading Animation */}
      {isGeneratingReport && <GeminiReportStream />}

      {/* Render Generated Executive Report if Approved/Generated */}
      {activeReport && reviewStatus === 'approved' && <ExecutiveReportView />}

      {/* Master 3-Column Review Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center (8 Cols): Department Review Queue & Validation Engine */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              Departmental Audit Queue ({departments.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.map((dept) => (
                <DepartmentReviewCard key={dept.id} dept={dept} />
              ))}
            </div>
          </div>

          <ValidationChecklist />
        </div>

        {/* Right (4 Cols): Quality Score, CEO Confidence Index & Risk Matrix */}
        <div className="lg:col-span-4 space-y-4">
          <QualityAnalysisCard />
          <ConfidenceGaugeCard />
          <RiskAnalysisCard />
        </div>
      </div>

      {/* Report History Slide-over Drawer */}
      <ReportHistoryDrawer />
    </PageContainer>
  );
}

export default BossReviewWorkspace;
