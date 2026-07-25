'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const THEMES = [
  { value: 'dark',   icon: Moon,    label: 'Dark' },
  { value: 'light',  icon: Sun,     label: 'Light' },
  { value: 'system', icon: Monitor, label: 'System' },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    const idx = THEMES.findIndex((t) => t.value === theme);
    setTheme(THEMES[(idx + 1) % THEMES.length].value);
  };

  const current = THEMES.find((t) => t.value === theme) ?? THEMES[0];
  const Icon = current.icon;

  return (
    <button
      onClick={cycle}
      title={`Theme: ${current.label}`}
      aria-label={`Switch theme (current: ${current.label})`}
      className="h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={current.value}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          <Icon className="h-4 w-4" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
export default ThemeToggle;
