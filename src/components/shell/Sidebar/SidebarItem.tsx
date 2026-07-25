'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  shortcut?: string;
  isActive: boolean;
  isCollapsed: boolean;
  badge?: number;
  onClick?: () => void;
}

export function SidebarItem({ href, icon: Icon, label, shortcut, isActive, isCollapsed, badge, onClick }: SidebarItemProps) {
  return (
    <Link href={href} onClick={onClick} tabIndex={0}>
      <div
        className={cn(
          'group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer select-none',
          isCollapsed ? 'justify-center px-0' : '',
          isActive
            ? 'text-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
        )}
      >
        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/20"
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          />
        )}

        {/* Icon */}
        <div className={cn(
          'relative shrink-0 flex items-center justify-center rounded-md h-7 w-7 transition-colors',
          isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
        )}>
          <Icon className="h-4 w-4 relative z-10" />
        </div>

        {/* Label + shortcut */}
        {!isCollapsed && (
          <div className="flex-1 flex items-center justify-between min-w-0 relative z-10">
            <span className="truncate">{label}</span>
            <div className="flex items-center gap-2 shrink-0">
              {badge !== undefined && badge > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-bold px-1">
                  {badge > 99 ? '99+' : badge}
                </span>
              )}
              {shortcut && (
                <kbd className="hidden group-hover:block text-[9px] font-mono text-muted-foreground/70">
                  {shortcut}
                </kbd>
              )}
            </div>
          </div>
        )}

        {/* Collapsed tooltip */}
        {isCollapsed && (
          <div className="absolute left-12 invisible group-hover:visible z-50 px-2.5 py-1.5 bg-popover border border-border rounded-lg text-xs font-medium whitespace-nowrap shadow-lg text-foreground">
            {label}
            {shortcut && <span className="ml-2 text-muted-foreground">{shortcut}</span>}
          </div>
        )}
      </div>
    </Link>
  );
}
export default SidebarItem;
