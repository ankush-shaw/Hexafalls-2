'use client';

import React from 'react';
import { Plus, Search, Pin, MessageSquare, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useConversationStore } from '../../store/conversationStore';
import { ConversationCard } from './ConversationCard';
import { cn } from '../../utils/cn';

interface ConversationListProps {
  className?: string;
}

export function ConversationList({ className }: ConversationListProps) {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    createConversation,
    updateConversation,
    deleteConversation,
    togglePinConversation,
    toggleArchiveConversation,
    searchQuery,
    setSearchQuery,
    isSidebarOpen,
    toggleSidebar,
  } = useConversationStore();

  const filtered = conversations.filter((c) => {
    if (c.archived) return false;
    if (!searchQuery.trim()) return true;
    return (
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessageSnippet?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const pinned = filtered.filter((c) => c.pinned);
  const recent = filtered.filter((c) => !c.pinned);

  if (!isSidebarOpen) {
    return (
      <div className="p-2 border-r border-border/50 bg-card/40 flex flex-col items-center gap-3 shrink-0">
        <button
          onClick={toggleSidebar}
          title="Open Conversation History"
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <PanelLeftOpen className="h-4 w-4" />
        </button>
        <button
          onClick={() => createConversation()}
          title="New Chat"
          className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className={cn('w-72 border-r border-border/50 bg-card/30 flex flex-col h-full shrink-0 overflow-hidden', className)}>
      {/* Header + New Chat Button */}
      <div className="p-3 border-b border-border/40 space-y-2 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Conversations</span>
          <button
            onClick={toggleSidebar}
            title="Collapse Sidebar"
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={() => createConversation()}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="h-4 w-4" /> Start New Chat
        </button>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-muted/50 border border-border/40 rounded-lg outline-none focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Conversation Cards List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {pinned.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              <Pin className="h-3 w-3" /> Pinned Chats
            </div>
            <div className="space-y-2">
              {pinned.map((c) => (
                <ConversationCard
                  key={c.id}
                  conversation={c}
                  isActive={c.id === activeConversationId}
                  onSelect={() => setActiveConversationId(c.id)}
                  onPin={() => togglePinConversation(c.id)}
                  onArchive={() => toggleArchiveConversation(c.id)}
                  onDelete={() => deleteConversation(c.id)}
                  onRename={(newTitle) => updateConversation(c.id, { title: newTitle })}
                />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {pinned.length > 0 && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              <MessageSquare className="h-3 w-3" /> Recent Chats
            </div>
          )}
          {recent.length === 0 && pinned.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No conversations found.
            </div>
          ) : (
            <div className="space-y-2">
              {recent.map((c) => (
                <ConversationCard
                  key={c.id}
                  conversation={c}
                  isActive={c.id === activeConversationId}
                  onSelect={() => setActiveConversationId(c.id)}
                  onPin={() => togglePinConversation(c.id)}
                  onArchive={() => toggleArchiveConversation(c.id)}
                  onDelete={() => deleteConversation(c.id)}
                  onRename={(newTitle) => updateConversation(c.id, { title: newTitle })}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConversationList;
