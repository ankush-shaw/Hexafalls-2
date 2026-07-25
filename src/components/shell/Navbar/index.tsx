'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Terminal, X, PanelRight } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import { GlobalSearch } from './GlobalSearch';
import { NotificationBell } from './NotificationBell';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import { ConnectionStatus } from './ConnectionStatus';
import { VoiceIndicator } from './VoiceIndicator';
import { Sidebar } from '../Sidebar';
import { cn } from '../../../utils/cn';

export function Navbar() {
  const { toggleRightPanel, isRightPanelOpen } = useUIStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="h-14 flex items-center gap-3 px-4 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40 shrink-0">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Logo (visible when sidebar is hidden on mobile) */}
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden shrink-0">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-sm shadow-primary/20">
            <Terminal className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-black text-sm tracking-tight">AegisOS</span>
        </Link>

        {/* Spacer for desktop (sidebar takes left space) */}
        <div className="hidden lg:block w-px h-5 bg-border/40 shrink-0" />

        {/* Global Search — center */}
        <div className="flex-1 flex justify-center px-2 max-w-lg mx-auto">
          <GlobalSearch />
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1 shrink-0">
          <VoiceIndicator />
          <ConnectionStatus />
          <div className="w-px h-5 bg-border/40 mx-1" />
          <ThemeToggle />
          <NotificationBell />
          {/* Right panel toggle (xl+) */}
          <button
            onClick={toggleRightPanel}
            aria-label="Toggle utility panel"
            title="Toggle utility panel"
            className={cn(
              'hidden xl:flex h-9 w-9 items-center justify-center rounded-lg transition-colors cursor-pointer',
              isRightPanelOpen
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <PanelRight className="h-4 w-4" />
          </button>
          <div className="w-px h-5 bg-border/40 mx-1" />
          <UserMenu />
        </div>
      </header>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              key="mobile-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <div className="relative h-full">
                <Sidebar isMobileMode onMobileClose={() => setMobileMenuOpen(false)} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
export default Navbar;
