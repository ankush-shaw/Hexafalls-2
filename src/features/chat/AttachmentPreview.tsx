'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Image as ImageIcon, FileSpreadsheet, FileCode, Music, Video, X, AlertCircle } from 'lucide-react';
import { Attachment, AttachmentType } from '../../types/chat.types';
import { formatBytes } from '../../utils/file.utils';
import { cn } from '../../utils/cn';

const typeIcons: Record<AttachmentType, React.ElementType> = {
  image: ImageIcon,
  pdf: FileText,
  doc: FileText,
  excel: FileSpreadsheet,
  csv: FileSpreadsheet,
  json: FileCode,
  audio: Music,
  video: Video,
};

interface AttachmentPreviewProps {
  attachments: Attachment[];
  onRemove: (id: string) => void;
  className?: string;
}

export function AttachmentPreview({ attachments, onRemove, className }: AttachmentPreviewProps) {
  if (attachments.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap gap-2 py-2', className)}>
      <AnimatePresence mode="popLayout">
        {attachments.map((file) => {
          const Icon = typeIcons[file.type] || FileText;
          return (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.9, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -6 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'group relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg border bg-card/80 text-xs font-medium backdrop-blur-sm max-w-xs overflow-hidden',
                file.status === 'error' ? 'border-rose-500/40 bg-rose-500/10' : 'border-border/60 hover:border-primary/40'
              )}
            >
              <div className="p-1 rounded bg-muted text-primary shrink-0">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-foreground font-medium text-[11px]">{file.name}</p>
                <p className="text-[9px] text-muted-foreground">{formatBytes(file.size)}</p>
              </div>

              {file.status === 'uploading' && file.uploadProgress !== undefined && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-200"
                    style={{ width: `${file.uploadProgress}%` }}
                  />
                </div>
              )}

              {file.status === 'error' ? (
                <span title={file.error || 'Upload error'}>
                  <AlertCircle className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                </span>
              ) : (
                <button
                  onClick={() => onRemove(file.id)}
                  className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded transition-colors cursor-pointer shrink-0"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default AttachmentPreview;
