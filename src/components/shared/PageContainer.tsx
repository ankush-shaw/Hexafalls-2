'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { fadeIn } from '../../animations/fade';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function PageContainer({ children, className, animate = true }: PageContainerProps) {
  const content = (
    <div className={cn('space-y-6', className)}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      variants={fadeIn('up', 0.22)}
      initial="hidden"
      animate="visible"
      className={cn('space-y-6', className)}
    >
      {children}
    </motion.div>
  );
}
export default PageContainer;
