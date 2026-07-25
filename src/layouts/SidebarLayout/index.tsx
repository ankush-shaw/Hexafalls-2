'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  GitFork, 
  Cpu, 
  FileSpreadsheet, 
  BarChart3, 
  History, 
  Bell, 
  Settings, 
  ChevronLeft, 
  Menu,
  Terminal,
  LogOut
} from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import { useUserStore } from '../../store/userStore';
import { ROUTES } from '../../constants/routes';
import { cn } from '../../utils/cn';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Workflow', href: ROUTES.WORKFLOW, icon: GitFork },
  { label: 'Agents', href: ROUTES.AGENTS, icon: Cpu },
  { label: 'Reports', href: ROUTES.REPORTS, icon: FileSpreadsheet },
  { label: 'Analytics', href: ROUTES.ANALYTICS, icon: BarChart3 },
  { label: 'History', href: ROUTES.HISTORY, icon: History },
  { label: 'Notifications', href: ROUTES.NOTIFICATIONS, icon: Bell },
  { label: 'Settings', href: ROUTES.SETTINGS, icon: Settings },
];

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useSettingsStore();
  const { user, logout } = useUserStore();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const sidebarWidthClass = isSidebarCollapsed ? 'w-16' : 'w-64';

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className={cn(
        "hidden md:flex flex-col border-r border-border bg-card transition-all duration-300 relative",
        sidebarWidthClass
      )}>
        {/* Logo Section */}
        <div className="h-16 flex items-center px-4 border-b border-border gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Terminal className="h-5 w-5" />
          </div>
          {!isSidebarCollapsed && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-lg tracking-wider bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
            >
              AegisOS
            </motion.span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer group relative",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}>
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!isSidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {isSidebarCollapsed && (
                    <div className="absolute left-14 invisible group-hover:visible bg-popover text-popover-foreground px-2 py-1 text-xs rounded border border-border whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer Profile */}
        <div className="p-3 border-t border-border bg-muted/30">
          <div className={cn("flex items-center gap-3", isSidebarCollapsed ? "justify-center" : "")}>
            <Link href={ROUTES.PROFILE} className="flex items-center gap-3 overflow-hidden cursor-pointer">
              <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0 border border-primary/30">
                {user?.name.charAt(0) || 'U'}
              </div>
              {!isSidebarCollapsed && (
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-xs font-semibold truncate">{user?.name}</span>
                  <span className="text-[10px] text-muted-foreground truncate">{user?.email}</span>
                </div>
              )}
            </Link>
            {!isSidebarCollapsed && (
              <button 
                onClick={() => logout()}
                className="ml-auto p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Toggle Collapse Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 bg-background border border-border rounded-full p-1 shadow-md hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer z-40 hidden md:block"
        >
          <ChevronLeft className={cn("h-3.5 w-3.5 transition-transform", isSidebarCollapsed ? "rotate-180" : "")} />
        </button>
      </aside>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-card border-r border-border z-50 flex flex-col md:hidden"
            >
              <div className="h-16 flex items-center px-4 border-b border-border justify-between">
                <div className="flex items-center gap-3">
                  <Terminal className="h-5 w-5 text-primary" />
                  <span className="font-bold text-lg">AegisOS</span>
                </div>
                <button onClick={() => setIsMobileOpen(false)} className="p-1 rounded hover:bg-muted text-muted-foreground">
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 py-4 space-y-1 px-3">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}>
                      <div className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                      )}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-border flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {user?.name.charAt(0) || 'U'}
                </div>
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-xs font-semibold truncate">{user?.name}</span>
                  <span className="text-[10px] text-muted-foreground truncate">{user?.email}</span>
                </div>
                <button onClick={() => logout()} className="ml-auto p-1.5 text-muted-foreground hover:text-destructive">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Work Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-border bg-card/50 backdrop-blur-md z-30 shrink-0">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground md:hidden cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold uppercase tracking-wider ml-2 md:ml-0">
            <span>Enterprise Agent OS</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href={ROUTES.NOTIFICATIONS} className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </Link>
            <Link href={ROUTES.SETTINGS} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="h-4 w-4" />
            </Link>
          </div>
        </header>

        {/* Child Router Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-background/50 relative">
          {children}
        </main>
      </div>
    </div>
  );
}

export default SidebarLayout;
