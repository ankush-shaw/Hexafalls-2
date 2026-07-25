'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, Archive, Trash2, Sparkles, Search } from 'lucide-react';
import { useAnalyticsStore } from '../../store/analyticsStore';
import { PageContainer } from '../../components/shared/PageContainer';
import { useUIStore } from '../../store/uiStore';
import { cn } from '../../utils/cn';

const categories = ['All', 'Boss', 'Supervisor', 'Workers', 'Security', 'System'];

export function NotificationCenter() {
  const {
    notifications,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    markNotificationRead,
    archiveNotification,
    clearAllNotifications,
  } = useAnalyticsStore();

  const { setBreadcrumbs } = useUIStore();

  useEffect(() => {
    setBreadcrumbs([{ label: 'Notifications', href: '/notifications' }, { label: 'Platform Feed' }]);
  }, [setBreadcrumbs]);

  const filtered = notifications.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || n.category === selectedCategory;
    return matchesSearch && matchesCat && !n.archived;
  });

  return (
    <PageContainer className="space-y-6 max-w-[1400px] mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl border border-primary/30 bg-card/80 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-foreground">Enterprise Notification Feed</h1>
            <p className="text-xs text-muted-foreground">Real-time multi-agent activity, security alerts, and system notifications</p>
          </div>
        </div>

        <button
          onClick={clearAllNotifications}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 font-bold text-xs hover:bg-rose-500/20 transition-colors cursor-pointer"
        >
          <Trash2 className="h-4 w-4" /> Clear All Notifications
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notification feed..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-border/50 bg-card/80 text-xs font-medium text-foreground focus:outline-none focus:border-primary/50"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer',
                selectedCategory === cat ? 'bg-primary text-primary-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 rounded-3xl border border-dashed border-border/60 text-center space-y-2">
            <p className="text-xs font-bold text-muted-foreground">No active notifications found.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 backdrop-blur-xl shadow-md',
                !item.read ? 'border-primary/40 bg-primary/5' : 'border-border/40 bg-card/60'
              )}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary mt-0.5">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.2 rounded text-[9px] font-mono font-bold uppercase bg-primary/10 text-primary border border-primary/20">
                      {item.category}
                    </span>
                    <h3 className="text-xs font-extrabold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">{item.message}</p>
                  <span className="text-[10px] text-muted-foreground font-mono block">{item.timestamp}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {!item.read && (
                  <button
                    onClick={() => markNotificationRead(item.id)}
                    className="p-1.5 rounded-lg border border-border/50 bg-card hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                    title="Mark Read"
                  >
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  </button>
                )}
                <button
                  onClick={() => archiveNotification(item.id)}
                  className="p-1.5 rounded-lg border border-border/50 bg-card hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Archive"
                >
                  <Archive className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </PageContainer>
  );
}

export default NotificationCenter;
