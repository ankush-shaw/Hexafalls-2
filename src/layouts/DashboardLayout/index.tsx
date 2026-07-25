'use client';

import React from 'react';

interface DashboardLayoutProps {
  metrics: React.ReactNode;
  mainContent: React.ReactNode;
  sidePanel?: React.ReactNode;
}

export function DashboardLayout({ metrics, mainContent, sidePanel }: DashboardLayoutProps) {
  return (
    <div className="space-y-6 max-w-(screen-2xl) mx-auto">
      {/* Metrics Row */}
      {metrics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics}
        </div>
      )}

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Workspace */}
        <div className={sidePanel ? "lg:col-span-2 space-y-6" : "lg:col-span-3 space-y-6"}>
          {mainContent}
        </div>

        {/* Side Panel / Live Updates / Chats */}
        {sidePanel && (
          <div className="lg:col-span-1 space-y-6">
            {sidePanel}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardLayout;
