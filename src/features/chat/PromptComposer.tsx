'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Send, Mic, Paperclip, Sparkles, Trash2 } from 'lucide-react';
import { TokenCounter } from './TokenCounter';
import { AttachmentPreview } from './AttachmentPreview';
import { Attachment } from '../../types/chat.types';
import { cn } from '../../utils/cn';

interface PromptComposerProps {
  onSend: (content: string, attachments: Attachment[]) => void;
  onOpenVoiceModal: () => void;
  onOpenTemplatesModal: () => void;
  onOpenUpload: () => void;
  initialDraft?: string;
  attachments?: Attachment[];
  onRemoveAttachment?: (id: string) => void;
  disabled?: boolean;
  className?: string;
}

const PLACEHOLDERS = [
  'Ask Boss Agent to orchestrate a market research workflow...',
  'Paste financial statement data to generate a Q4 PDF report...',
  'Request dynamic worker scaling for NLP classification tasks...',
  'Draft an executive summary for our multi-agent pipeline...',
];

export function PromptComposer({

  onSend,
  onOpenVoiceModal,
  onOpenTemplatesModal,
  onOpenUpload,
  initialDraft = '',
  attachments = [],
  onRemoveAttachment,
  disabled = false,
  className,
}: PromptComposerProps) {

  const [content, setContent] = useState(initialDraft);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync draft from props if changed (deferred to avoid synchronous setState in effect)
  useEffect(() => {
    if (initialDraft && !content) {
      const timer = setTimeout(() => setContent(initialDraft), 0);
      return () => clearTimeout(timer);
    }
  }, [initialDraft, content]);


  // Rotate placeholder text every 5s
  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Auto-resize textarea height (min 56px, max 240px)
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, 56), 240)}px`;
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [content, adjustHeight]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if ((!content.trim() && attachments.length === 0) || disabled) return;
    onSend(content.trim(), attachments);
    setContent('');
    if (textareaRef.current) textareaRef.current.style.height = '56px';
  };

  return (
    <div className={cn('relative flex flex-col rounded-2xl border border-border/80 bg-card/90 shadow-xl backdrop-blur-md transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 overflow-hidden', className)}>
      {/* Attachments Preview Bar if files added */}
      {attachments.length > 0 && onRemoveAttachment && (
        <div className="px-4 pt-3 pb-1 border-b border-border/40 bg-muted/20">
          <AttachmentPreview attachments={attachments} onRemove={onRemoveAttachment} />
        </div>
      )}

      {/* Main Text Area */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          adjustHeight();
        }}
        onKeyDown={handleKeyDown}
        placeholder={PLACEHOLDERS[placeholderIdx]}
        disabled={disabled}
        rows={1}
        className="w-full px-4 py-3.5 bg-transparent text-foreground placeholder:text-muted-foreground/60 text-sm outline-none resize-none leading-relaxed min-h-[56px] max-h-[240px]"
      />

      {/* Footer Toolbar: Controls + Token Counter */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-border/40 bg-muted/20 text-xs">
        {/* Left Action Icons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenUpload}
            title="Attach file (PDF, Doc, Image, CSV)"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <Paperclip className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onOpenVoiceModal}
            title="Voice input mode"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <Mic className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onOpenTemplatesModal}
            title="Prompt Templates Library"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer flex items-center gap-1 font-medium"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline text-[11px]">Templates</span>
          </button>

          {content.trim() && (
            <button
              type="button"
              onClick={() => setContent('')}
              title="Clear composer"
              className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Right: Live Token Counter & Send Button */}
        <div className="flex items-center gap-3">
          <TokenCounter content={content} className="hidden sm:flex" />

          <button
            type="button"
            onClick={handleSend}
            disabled={(!content.trim() && attachments.length === 0) || disabled}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 disabled:opacity-40 transition-all shadow-md cursor-pointer shrink-0"
          >
            <span>Send</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromptComposer;
