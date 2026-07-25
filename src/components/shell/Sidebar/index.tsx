'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, GitFork, Cpu, FileText, BarChart3, History,
  Bell, Settings, User, HelpCircle, ChevronLeft, Terminal,
  LogOut, Sparkles, LifeBuoy,
} from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import { useUserStore } from '../../../store/userStore';
import { useNotificationsStore } from '../../../store/notificationsStore';
import { useLogout } from '../../../hooks/useLogout';
import { ROUTES } from '../../../constants/routes';
import { SidebarItem } from './SidebarItem';
import { SidebarSection } from './SidebarSection';
import { cn } from '../../../utils/cn';

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard, shortcut: 'G D' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { id: 'workflow', label: 'Workflow', href: ROUTES.WORKFLOW, icon: GitFork, shortcut: 'G W' },
      { id: 'agents', label: 'Agents', href: ROUTES.AGENTS, icon: Cpu, shortcut: 'G A' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { id: 'reports', label: 'Reports', href: ROUTES.REPORTS, icon: FileText, shortcut: 'G R' },
      { id: 'analytics', label: 'Analytics', href: ROUTES.ANALYTICS, icon: BarChart3, shortcut: 'G N' },
      { id: 'history', label: 'History', href: ROUTES.HISTORY, icon: History, shortcut: 'G H' },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'notifications', label: 'Notifications', href: ROUTES.NOTIFICATIONS, icon: Bell, shortcut: 'G I' },
      { id: 'settings', label: 'Settings', href: ROUTES.SETTINGS, icon: Settings, shortcut: 'G S' },
    ],
  },
  {
    label: 'Account',
    items: [
      { id: 'profile', label: 'Profile', href: ROUTES.PROFILE, icon: User, shortcut: 'G P' },
      { id: 'support', label: 'Support', href: '#', icon: LifeBuoy },
      { id: 'help', label: 'Help & Docs', href: '#', icon: HelpCircle },
    ],
  },
];

interface SidebarProps {
  onMobileClose?: () => void;
  isMobileMode?: boolean;
}

export function Sidebar({ onMobileClose, isMobileMode = false }: SidebarProps) {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();
  const { user } = useUserStore();
  const { unreadCount } = useNotificationsStore();
  const logout = useLogout();

  const collapsed = isMobileMode ? false : isSidebarCollapsed;
  const w = collapsed ? 'w-[72px]' : 'w-64';

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'relative flex flex-col h-full bg-card border-r border-border/50 overflow-hidden shrink-0',
        w
      )}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-border/40 gap-3 shrink-0">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
          <Terminal className="h-4 w-4 text-white" />
        </div>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              key="logo-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col min-w-0"
            >
              <span className="font-black text-sm tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent leading-none">
                AegisOS
              </span>
              <span className="text-[9px] text-muted-foreground/60 tracking-widest uppercase font-medium mt-0.5">
                Multi-Agent OS
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {NAV_SECTIONS.map((section) => (
          <SidebarSection key={section.label} label={section.label} isCollapsed={collapsed}>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                const badge = item.id === 'notifications' ? unreadCount : undefined;
                return (
                  <SidebarItem
                    key={item.id}
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                    shortcut={item.shortcut}
                    isActive={isActive}
                    isCollapsed={collapsed}
                    badge={badge}
                    onClick={onMobileClose}
                  />
                );
              })}
            </div>
          </SidebarSection>
        ))}

        {/* AI Status pill */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-1 p-3 rounded-xl border border-primary/20 bg-primary/5 space-y-1"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Agent AI Online
            </div>
            <p className="text-[10px] text-muted-foreground leading-snug">
              All systems operational. 12 workers active.
            </p>
          </motion.div>
        )}
      </nav>

      {/* User Footer */}
      <div className="p-2 border-t border-border/40 space-y-1 shrink-0">
        <Link href={ROUTES.PROFILE} onClick={onMobileClose}>
          <div className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors cursor-pointer group',
            collapsed ? 'justify-center' : ''
          )}>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/30 to-violet-500/30 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary shrink-0">
              {user?.name?.charAt(0) ?? 'U'}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">{user?.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.role}</p>
              </div>
            )}
          </div>
        </Link>
        {!collapsed && (
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-400 transition-colors cursor-pointer text-sm"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="text-xs font-medium">Sign Out</span>
          </button>
        )}
      </div>

      {/* Collapse toggle (desktop only) */}
      {!isMobileMode && (
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-[58px] z-50 h-6 w-6 rounded-full border border-border bg-card shadow-md flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform', collapsed ? 'rotate-180' : '')} />
        </button>
      )}
    </motion.aside>
  );
}
export default Sidebar;
