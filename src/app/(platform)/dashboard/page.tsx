'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  GitFork, Cpu, FileText, BarChart3,
  MessageSquare, Mic, Sparkles, TrendingUp,
  CheckCircle2, Clock, Activity, Zap,
  ArrowUpRight, Bot,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../../../store/userStore';
import { useUIStore } from '../../../store/uiStore';
import { PageHeader } from '../../../components/shared/PageHeader';
import { PageContainer } from '../../../components/shared/PageContainer';
import { QuickActionCard } from '../../../components/shared/QuickActionCard';
import { ROUTES } from '../../../constants/routes';
import { cn } from '../../../utils/cn';

/* ─── greeting helper ─────────────────────────────────── */
function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/* ─── mock stat cards ─────────────────────────────────── */
const STAT_CARDS = [
  { label: 'Active Workflows', value: '12', delta: '+3 today', icon: GitFork, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  { label: 'Agents Online', value: '8', delta: '100% healthy', icon: Cpu, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { label: 'Reports Generated', value: '47', delta: '+12 this week', icon: FileText, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { label: 'Tasks Completed', value: '1,284', delta: '↑ 18% vs last wk', icon: CheckCircle2, color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
];

/* ─── mock recent workflows ───────────────────────────── */
const RECENT_WORKFLOWS = [
  { id: '1', name: 'Data Processing Pipeline', status: 'running', progress: 68, agent: 'Boss Agent', updated: '2m ago' },
  { id: '2', name: 'Report Generation — Q4',  status: 'completed', progress: 100, agent: 'Supervisor', updated: '14m ago' },
  { id: '3', name: 'Customer Analysis Batch',  status: 'paused',   progress: 42, agent: 'Worker #3',  updated: '1h ago' },
  { id: '4', name: 'NLP Classifier Training',  status: 'running',  progress: 29, agent: 'Worker #7',  updated: '3h ago' },
];

const statusConfig = {
  running:   { label: 'Running',   dot: 'bg-primary', text: 'text-primary', bg: 'bg-primary/10' },
  completed: { label: 'Done',      dot: 'bg-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  paused:    { label: 'Paused',    dot: 'bg-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10' },
  failed:    { label: 'Failed',    dot: 'bg-rose-500', text: 'text-rose-400', bg: 'bg-rose-500/10' },
};

/* ─── mock activity feed ──────────────────────────────── */
const ACTIVITY = [
  { id: '1', text: 'Boss Agent completed task batch #12', time: '2m ago',  icon: Bot,         color: 'text-primary' },
  { id: '2', text: 'New report: Q4 Customer Insights',    time: '18m ago', icon: FileText,    color: 'text-amber-400' },
  { id: '3', text: 'Workflow "NLP Classifier" resumed',   time: '1h ago',  icon: GitFork,     color: 'text-sky-400' },
  { id: '4', text: 'System health check passed',          time: '3h ago',  icon: CheckCircle2,color: 'text-emerald-400' },
  { id: '5', text: '3 workers scaled up automatically',   time: '5h ago',  icon: TrendingUp,  color: 'text-violet-400' },
];


const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const { setBreadcrumbs, openCommandPalette } = useUIStore();

  useEffect(() => {
    setBreadcrumbs([{ label: 'Dashboard' }]);
  }, [setBreadcrumbs]);

  return (
    <PageContainer>
      {/* Page header */}
      <PageHeader
        title={`${getGreeting()}, ${user?.name?.split(' ')[0] ?? 'there'} 👋`}
        description="Here's what's happening in your AI workspace today."
        breadcrumbs={[{ label: 'Dashboard' }]}
        actions={
          <button
            onClick={() => openCommandPalette()}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-primary/30 bg-primary/8 text-primary text-sm font-semibold hover:bg-primary/15 transition-colors cursor-pointer"
          >
            <Zap className="h-4 w-4" /> Quick action
          </button>
        }
      />

      {/* Stat cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              variants={staggerItem}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              className={cn(
                'relative rounded-xl border p-5 bg-card overflow-hidden group cursor-pointer',
                card.border
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn('p-2.5 rounded-lg', card.bg)}>
                  <Icon className={cn('h-5 w-5', card.color)} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-extrabold tracking-tight">{card.value}</p>
                <p className="text-xs font-medium text-muted-foreground">{card.label}</p>
                <p className={cn('text-[11px] font-semibold', card.color)}>{card.delta}</p>
              </div>
              {/* Subtle glow */}
              <div className={cn('absolute -right-8 -bottom-8 h-24 w-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity', card.bg)} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: recent workflows */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold tracking-tight">Recent Workflows</h2>
            <button
              onClick={() => router.push(ROUTES.WORKFLOW)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-2.5">
            {RECENT_WORKFLOWS.map((wf, idx) => {
              const cfg = statusConfig[wf.status as keyof typeof statusConfig] ?? statusConfig.running;
              return (
                <motion.div
                  key={wf.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.3 }}
                  whileHover={{ x: 2 }}
                  className="group flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-border/60 bg-card hover:border-border transition-all cursor-pointer"
                  onClick={() => router.push(ROUTES.WORKFLOW)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center shrink-0">
                      <GitFork className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold truncate">{wf.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Bot className="h-3 w-3" /> {wf.agent}
                        <span className="text-border">·</span>
                        <Clock className="h-3 w-3" /> {wf.updated}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:block w-24">
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className={cn('h-full rounded-full', wf.status === 'completed' ? 'bg-emerald-500' : wf.status === 'paused' ? 'bg-amber-500' : 'bg-primary')}
                          initial={{ width: 0 }}
                          animate={{ width: `${wf.progress}%` }}
                          transition={{ delay: idx * 0.1 + 0.3, duration: 0.6, ease: 'easeOut' }}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5 text-right">{wf.progress}%</p>
                    </div>
                    <span className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold', cfg.bg, cfg.text)}>
                      <span className={cn('h-1.5 w-1.5 rounded-full', cfg.dot, wf.status === 'running' && 'animate-pulse')} />
                      {cfg.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: activity + AI status */}
        <div className="space-y-4">
          {/* AI Status banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/8 to-violet-500/5 space-y-3"
          >
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/15">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">AI Engine Online</p>
                <p className="text-[10px] text-muted-foreground">All agents operational</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {['Boss Agent', 'Supervisor', '10 Workers'].map((a) => (
                <div key={a} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{a}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-400 font-medium">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold tracking-tight">Activity</h2>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {ACTIVITY.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.07, duration: 0.3 }}
                    className="flex gap-3 items-start"
                  >
                    <div className={cn('p-1.5 rounded-lg bg-muted/50 shrink-0 mt-0.5')}>
                      <Icon className={cn('h-3.5 w-3.5', item.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground/80 leading-snug">{item.text}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-base font-bold tracking-tight">Quick Actions</h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3"
        >
          {[
            { title: 'New Workflow', description: 'Create a workflow', icon: GitFork, color: 'primary' as const, shortcut: '⌘ N', href: ROUTES.WORKFLOW },
            { title: 'Open Chat', description: 'Chat with agents', icon: MessageSquare, color: 'sky' as const, shortcut: '⌘ /', href: ROUTES.AGENTS },
            { title: 'Record Voice', description: 'Voice command', icon: Mic, color: 'rose' as const, shortcut: '⌘ M', href: '#' },
            { title: 'View Reports', description: 'Browse reports', icon: FileText, color: 'amber' as const, shortcut: '⌘ R', href: ROUTES.REPORTS },
            { title: 'Analytics', description: 'Charts & insights', icon: BarChart3, color: 'emerald' as const, shortcut: '⌘ A', href: ROUTES.ANALYTICS },
            { title: 'Settings', description: 'Configure platform', icon: Zap, color: 'violet' as const, shortcut: '⌘ ,', href: ROUTES.SETTINGS },
          ].map((action) => (
            <motion.div key={action.title} variants={staggerItem}>
              <QuickActionCard
                title={action.title}
                description={action.description}
                icon={action.icon}
                color={action.color}
                shortcut={action.shortcut}
                onClick={() => action.href !== '#' && router.push(action.href)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageContainer>
  );
}
