'use client';

import React from 'react';
import { SidebarLayout } from '../../layouts/SidebarLayout';

interface PlatformLayoutProps {
  children: React.ReactNode;
}

export default function PlatformLayout({ children }: PlatformLayoutProps) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
