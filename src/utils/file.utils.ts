export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  if (allowedTypes.includes('*')) return true;
  
  // Check exact mime type or glob wildcard (e.g. 'image/*')
  return allowedTypes.some(type => {
    if (type.includes('/*')) {
      const category = type.split('/')[0];
      return file.type.startsWith(`${category}/`);
    }
    return file.type === type || getFileExtension(file.name).toLowerCase() === type.replace('.', '').toLowerCase();
  });
}

export function readAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
