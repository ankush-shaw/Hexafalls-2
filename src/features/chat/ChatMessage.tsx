'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Bot, User, Shield, Check, CheckCheck, Clock, AlertCircle } from 'lucide-react';
import { ChatMessage as ChatMessageType, MessageStatus } from '../../types/chat.types';
import { formatTime } from '../../utils/date.utils';
import { MessageToolbar } from './MessageToolbar';
import { AttachmentPreview } from './AttachmentPreview';
import { cn } from '../../utils/cn';

interface ChatMessageProps {
  message: ChatMessageType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRegenerate?: (id: string) => void;
  onReact?: (id: string, emoji: string) => void;
  className?: string;
}

const statusIcons: Record<MessageStatus, React.ElementType> = {
  sending: Clock,
  queued: Clock,
  sent: Check,
  delivered: CheckCheck,
  failed: AlertCircle,
};

export function ChatMessage({
  message,
  onEdit,
  onDelete,
  onRegenerate,
  onReact,
  className,
}: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const StatusIcon = statusIcons[message.status] || Check;

  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  const getAvatar = () => {
    if (isUser) {
      return (
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-xs font-bold text-primary-foreground shadow-sm shrink-0">
          <User className="h-4 w-4" />
        </div>
      );
    }

    if (isSystem) {
      return (
        <div className="h-8 w-8 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground shrink-0">
          <Shield className="h-4 w-4" />
        </div>
      );
    }

    // Assistant / Agent
    const roleColors = {
      boss: 'from-amber-500/20 to-primary/20 border-amber-500/40 text-amber-400',
      supervisor: 'from-sky-500/20 to-primary/20 border-sky-500/40 text-sky-400',
      worker: 'from-emerald-500/20 to-primary/20 border-emerald-500/40 text-emerald-400',
    };

    const roleClass = message.agentRole ? roleColors[message.agentRole] : 'from-primary/20 to-violet-500/20 border-primary/40 text-primary';

    return (
      <div className={cn('h-8 w-8 rounded-xl bg-gradient-to-br border flex items-center justify-center shadow-md shrink-0', roleClass)}>
        <Bot className="h-4 w-4" />
      </div>
    );
  };

  if (isSystem) {
    return (
      <div className={cn('flex justify-center my-3', className)}>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-muted/30 text-[11px] text-muted-foreground font-medium">
          <Shield className="h-3 w-3 text-primary" />
          <span>{message.content}</span>
          <span className="text-[9px] text-muted-foreground/60">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('group flex gap-3 my-4', isUser ? 'flex-row-reverse' : 'flex-row', className)}
    >
      {getAvatar()}

      <div className={cn('flex flex-col max-w-[85%] sm:max-w-[75%]', isUser ? 'items-end' : 'items-start')}>
        {/* Sender name + Role badge */}
        <div className="flex items-center gap-2 mb-1 px-1 text-[11px]">
          <span className="font-semibold text-foreground/80">{message.senderName || (isUser ? 'You' : 'Assistant')}</span>
          {message.agentRole && (
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 text-primary">
              {message.agentRole}
            </span>
          )}
          <span className="text-muted-foreground/60 text-[9px]">{formatTime(message.timestamp)}</span>
        </div>

        {/* Message bubble */}
        <div
          className={cn(
            'relative px-4 py-3 rounded-2xl text-sm leading-relaxed border transition-all shadow-sm',
            isUser
              ? 'bg-primary text-primary-foreground border-primary rounded-tr-xs'
              : 'bg-card text-card-foreground border-border/60 rounded-tl-xs hover:border-border'
          )}
        >
          {editMode ? (
            <div className="space-y-2 min-w-[240px]">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full bg-background text-foreground text-xs p-2 rounded border border-border outline-none"
                rows={3}
              />
              <div className="flex justify-end gap-1.5">
                <button
                  onClick={() => setEditMode(false)}
                  className="px-2 py-1 text-xs rounded border hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (onEdit) onEdit(editedContent);
                    setEditMode(false);
                  }}
                  className="px-2 py-1 text-xs rounded bg-primary text-primary-foreground font-semibold cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none text-sm break-words">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}

          {/* Attachments if any */}
          {message.attachments && message.attachments.length > 0 && (
            <AttachmentPreview attachments={message.attachments} onRemove={() => {}} />
          )}
        </div>

        {/* Bottom row: Reactions + Toolbar + Status */}
        <div className="flex items-center justify-between w-full mt-1 px-1 text-[11px] gap-2">
          {/* Reaction chips */}
          <div className="flex items-center gap-1">
            {message.reactions &&
              Object.entries(message.reactions).map(([emoji, count]) => (
                <span key={emoji} className="px-1.5 py-0.5 rounded-full border border-border/50 bg-muted/40 text-[10px]">
                  {emoji} {count}
                </span>
              ))}
          </div>

          <div className="flex items-center gap-2">
            <MessageToolbar
              message={message}
              onEdit={() => setEditMode(true)}
              onDelete={onDelete}
              onRegenerate={onRegenerate}
              onReact={onReact}
            />

            {isUser && (
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
                <StatusIcon className="h-3 w-3" />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ChatMessage;
