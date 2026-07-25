'use client';

import React, { useState } from 'react';
import { Copy, Edit3, Trash2, RotateCw, Check, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../../types/chat.types';
import { copyToClipboard } from '../../utils/clipboard.utils';
import { cn } from '../../utils/cn';

interface MessageToolbarProps {
  message: ChatMessage;
  onEdit?: (messageId: string) => void;
  onDelete?: (messageId: string) => void;
  onRegenerate?: (messageId: string) => void;
  onReact?: (messageId: string, emoji: string) => void;
  className?: string;
}

const EMOJIS = ['👍', '❤️', '🚀', '💡', '🎉'];

export function MessageToolbar({
  message,
  onEdit,
  onDelete,
  onRegenerate,
  onReact,
  className,
}: MessageToolbarProps) {
  const [copied, setCopied] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className={cn('relative flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity', className)}>
      <button
        onClick={handleCopy}
        title="Copy text"
        className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      </button>

      {onReact && (
        <div className="relative">
          <button
            onClick={() => setShowReactions((v) => !v)}
            title="Add reaction"
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <Smile className="h-3.5 w-3.5" />
          </button>
          <AnimatePresence>
            {showReactions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -4 }}
                className="absolute bottom-full left-0 mb-1 flex items-center gap-1 p-1 rounded-full border bg-popover shadow-lg z-20"
              >
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      onReact(message.id, emoji);
                      setShowReactions(false);
                    }}
                    className="p-1 text-sm hover:scale-125 transition-transform cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {message.role === 'user' && onEdit && (
        <button
          onClick={() => onEdit(message.id)}
          title="Edit message"
          className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <Edit3 className="h-3.5 w-3.5" />
        </button>
      )}

      {message.role === 'assistant' && onRegenerate && (
        <button
          onClick={() => onRegenerate(message.id)}
          title="Regenerate response"
          className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <RotateCw className="h-3.5 w-3.5" />
        </button>
      )}

      {onDelete && (
        <button
          onClick={() => onDelete(message.id)}
          title="Delete message"
          className="p-1 rounded text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export default MessageToolbar;
