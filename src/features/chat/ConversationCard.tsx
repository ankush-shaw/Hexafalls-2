'use client';

import React, { useState } from 'react';
import { MessageSquare, Pin, Archive, Trash2, Edit2, MoreVertical, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Conversation } from '../../types/chat.types';
import { formatRelative } from '../../utils/date.utils';
import { cn } from '../../utils/cn';

interface ConversationCardProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onPin: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onRename: (newTitle: string) => void;
}

export function ConversationCard({
  conversation,
  isActive,
  onSelect,
  onPin,
  onArchive,
  onDelete,
  onRename,
}: ConversationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState(conversation.title);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSaveRename = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (titleInput.trim()) {
      onRename(titleInput.trim());
    }
    setIsEditing(false);
    setMenuOpen(false);
  };

  return (
    <motion.div
      layout
      onClick={onSelect}
      className={cn(
        'group relative flex flex-col p-3 rounded-xl border text-left cursor-pointer transition-all',
        isActive
          ? 'bg-primary/10 border-primary/30 shadow-sm'
          : 'bg-card/40 border-border/40 hover:bg-muted/50 hover:border-border'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <MessageSquare className={cn('h-3.5 w-3.5 shrink-0 mt-0.5', isActive ? 'text-primary' : 'text-muted-foreground')} />

          {isEditing ? (
            <form onSubmit={handleSaveRename} className="flex items-center gap-1 flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="w-full text-xs bg-background border border-primary/40 rounded px-1.5 py-0.5 outline-none"
                autoFocus
              />
              <button type="submit" className="p-1 text-emerald-400 hover:bg-muted rounded">
                <Check className="h-3 w-3" />
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="p-1 text-muted-foreground hover:bg-muted rounded">
                <X className="h-3 w-3" />
              </button>
            </form>
          ) : (
            <span className={cn('text-xs font-semibold truncate', isActive ? 'text-foreground font-bold' : 'text-foreground/80')}>
              {conversation.title}
            </span>
          )}
        </div>

        {/* Pin Badge or Action Trigger */}
        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          {conversation.pinned && <Pin className="h-3 w-3 text-amber-400 fill-amber-400/20" />}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-1 opacity-0 group-hover:opacity-100 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer"
            >
              <MoreVertical className="h-3.5 w-3.5" />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -4 }}
                  className="absolute right-0 top-6 z-30 w-36 rounded-lg border border-border bg-popover shadow-xl p-1 text-xs"
                >
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <Edit2 className="h-3 w-3" /> Rename
                  </button>
                  <button
                    onClick={() => {
                      onPin();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <Pin className="h-3 w-3" /> {conversation.pinned ? 'Unpin' : 'Pin'}
                  </button>
                  <button
                    onClick={() => {
                      onArchive();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <Archive className="h-3 w-3" /> {conversation.archived ? 'Unarchive' : 'Archive'}
                  </button>
                  <div className="h-px bg-border/40 my-1" />
                  <button
                    onClick={() => {
                      onDelete();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-rose-500/10 text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" /> Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {conversation.lastMessageSnippet && (
        <p className="text-[11px] text-muted-foreground truncate mt-1 line-clamp-1">
          {conversation.lastMessageSnippet}
        </p>
      )}

      <div className="flex items-center justify-between mt-2 pt-1 border-t border-border/20 text-[9px] text-muted-foreground/60">
        <span>{conversation.messageCount} messages</span>
        <span>{formatRelative(conversation.updatedAt)}</span>
      </div>
    </motion.div>
  );
}

export default ConversationCard;
