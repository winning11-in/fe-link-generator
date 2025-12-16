import { useState, useEffect, useCallback } from 'react';
import { defaultTemplates as defaultQRTemplates } from '../types/qrCode';
import type { QRTemplate } from '../types/qrCode';

const STORAGE_KEY = 'qr-templates-v1';

export function useQRTemplates() {
  const [templates, setTemplates] = useState<QRTemplate[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTemplates(JSON.parse(stored));
        return;
      }
    } catch (e) {
      // ignore
    }
    setTemplates(defaultQRTemplates);
  }, []);

  const saveAll = useCallback((next: QRTemplate[]) => {
    setTemplates(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { /* ignore */ }
  }, []);

  const updateTemplate = useCallback((t: QRTemplate) => {
    saveAll(templates.map(x => x.id === t.id ? t : x));
  }, [templates, saveAll]);

  return { templates, updateTemplate, setTemplates: saveAll };
}

export default useQRTemplates;
