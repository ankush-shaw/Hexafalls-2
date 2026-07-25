'use client';

import { useState } from 'react';
import { copyToClipboard } from '../utils/clipboard.utils';

export function useClipboard(timeout = 2000) {
  const [hasCopied, setHasCopied] = useState(false);

  const copy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), timeout);
    }
    return success;
  };

  return { hasCopied, copy };
}

export default useClipboard;
