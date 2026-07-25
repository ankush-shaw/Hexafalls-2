'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

interface SidebarSectionProps {
  label: string;
  isCollapsed: boolean;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function SidebarSection({ label, isCollapsed, children, defaultOpen = true }: SidebarSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  if (isCollapsed) {
    return (
      <div className="space-y-0.5">
        <div className="h-px bg-border/40 mx-1 my-2" />
        {children}
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-3 py-1 group cursor-pointer"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
          {label}
        </span>
        <ChevronDown className={cn(
          'h-3 w-3 text-muted-foreground/50 transition-transform duration-200',
          open ? '' : '-rotate-90'
        )} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="section-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default SidebarSection;
