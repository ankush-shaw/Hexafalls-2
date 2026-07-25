'use client';
import React from 'react';
import { Navbar } from '../../components/shell/Navbar';
import { Sidebar } from '../../components/shell/Sidebar';
import { RightPanel } from '../../components/shell/RightPanel';
import { StatusBar } from '../../components/shell/StatusBar';
import { CommandPalette } from '../../components/shell/CommandPalette';

interface PlatformShellProps {
  children: React.ReactNode;
}

export function PlatformShell({ children }: PlatformShellProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Top Navbar */}
      <Navbar />

      {/* Body: Sidebar + Workspace + RightPanel */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex">
          <Sidebar />
        </div>

        {/* Main Workspace */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto min-w-0"
          role="main"
        >
          <div className="p-6 max-w-[1600px] mx-auto w-full min-h-full">
            {children}
          </div>
        </main>

        {/* Right Utility Panel */}
        <RightPanel />
      </div>

      {/* Bottom Status Bar */}
      <StatusBar />

      {/* Global Overlays */}
      <CommandPalette />
    </div>
  );
}
export default PlatformShell;
