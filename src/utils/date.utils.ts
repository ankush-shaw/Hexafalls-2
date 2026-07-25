import { format, formatDistanceToNow, parseISO } from 'date-fns';

export function formatDate(date: Date | string | number, formatStr: string = 'PPP'): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
  return format(parsedDate, formatStr);
}

export function formatTime(date: Date | string | number, formatStr: string = 'p'): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
  return format(parsedDate, formatStr);
}

export function formatDateTime(date: Date | string | number, formatStr: string = 'PPpp'): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
  return format(parsedDate, formatStr);
}

export function formatRelative(date: Date | string | number): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
  return formatDistanceToNow(parsedDate, { addSuffix: true });
}

export function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
