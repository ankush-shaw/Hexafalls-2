'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, File, AlertCircle } from 'lucide-react';
import { Attachment, AttachmentType } from '../../types/chat.types';
import { isValidFileType, getFileExtension } from '../../utils/file.utils';
import { cn } from '../../utils/cn';

interface UploadZoneProps {
  onFilesSelected: (attachments: Attachment[]) => void;
  maxSizeMb?: number;
  className?: string;
}

const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'application/pdf',
  'application/json', 'text/csv',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'audio/mpeg', 'audio/wav', 'video/mp4',
];

function classifyFileType(mimeType: string, extension: string): AttachmentType {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType === 'application/pdf' || extension === 'pdf') return 'pdf';
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet') || extension === 'xlsx' || extension === 'xls') return 'excel';
  if (mimeType === 'text/csv' || extension === 'csv') return 'csv';
  if (mimeType === 'application/json' || extension === 'json') return 'json';
  return 'doc';
}

export function UploadZone({ onFilesSelected, maxSizeMb = 25, className }: UploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFiles = (files: FileList | File[]) => {
    setErrorMsg(null);
    const validAttachments: Attachment[] = [];
    const maxBytes = maxSizeMb * 1024 * 1024;

    Array.from(files).forEach((file) => {
      const ext = getFileExtension(file.name);
      if (!isValidFileType(file, ALLOWED_TYPES)) {
        setErrorMsg(`Unsupported file type: .${ext}`);
        return;
      }
      if (file.size > maxBytes) {
        setErrorMsg(`File exceeds max size of ${maxSizeMb}MB: ${file.name}`);
        return;
      }

      validAttachments.push({
        id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: file.name,
        size: file.size,
        type: classifyFileType(file.type, ext),
        mimeType: file.type,
        file,
        status: 'complete',
        uploadProgress: 100,
      });
    });

    if (validAttachments.length > 0) {
      onFilesSelected(validAttachments);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        'relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-all cursor-pointer text-center',
        isDragging
          ? 'border-primary bg-primary/10 scale-[0.99]'
          : 'border-border/60 hover:border-primary/50 hover:bg-muted/30',
        className
      )}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
        }}
      />
      <div className="p-3 rounded-full bg-primary/10 text-primary mb-2">
        <UploadCloud className="h-6 w-6" />
      </div>
      <p className="text-xs font-semibold text-foreground">
        Click to upload or drag & drop files here
      </p>
      <p className="text-[10px] text-muted-foreground mt-1">
        Images, PDFs, Documents, CSV, JSON, Audio up to {maxSizeMb}MB
      </p>
      {errorMsg && (
        <p className="flex items-center gap-1 text-[11px] text-rose-400 font-medium mt-2">
          <AlertCircle className="h-3.5 w-3.5" />
          {errorMsg}
        </p>
      )}
    </div>
  );
}

export default UploadZone;
