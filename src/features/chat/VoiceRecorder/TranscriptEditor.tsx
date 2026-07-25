'use client';

import React from 'react';
import { RefreshCw, Trash2, Send } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface TranscriptEditorProps {
  transcript: string;
  onChange: (text: string) => void;
  onClear: () => void;
  onRetry: () => void;
  onSend: () => void;
  confidence?: number;
  isTranscribing?: boolean;
  className?: string;
}

export function TranscriptEditor({
  transcript,
  onChange,
  onClear,
  onRetry,
  onSend,
  confidence = 0.92,
  isTranscribing = false,
  className,
}: TranscriptEditorProps) {
  return (
    <div className={cn('space-y-3 p-4 rounded-xl border border-border/60 bg-muted/20', className)}>
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>Transcribed Speech</span>
        <div className="flex items-center gap-2">
          {confidence > 0 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {Math.round(confidence * 100)}% confidence
            </span>
          )}
          <button
            onClick={onRetry}
            title="Re-record / Retry transcription"
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <RefreshCw className={cn('h-3.5 w-3.5', isTranscribing && 'animate-spin')} />
          </button>
          <button
            onClick={onClear}
            title="Clear transcript"
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-rose-400 transition-colors cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <textarea
        value={transcript}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isTranscribing ? 'Listening & transcribing...' : 'Your transcript will appear here. Edit before sending...'}
        rows={3}
        className="w-full text-xs bg-background border border-border/50 rounded-lg p-3 outline-none focus:border-primary/50 text-foreground resize-none leading-relaxed"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={onClear}
          className="px-3 py-1.5 text-xs rounded-lg border border-border/60 hover:bg-muted font-medium cursor-pointer"
        >
          Discard
        </button>
        <button
          disabled={!transcript.trim()}
          onClick={onSend}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 cursor-pointer shadow-sm"
        >
          <Send className="h-3.5 w-3.5" /> Send Text
        </button>
      </div>
    </div>
  );
}

export default TranscriptEditor;
