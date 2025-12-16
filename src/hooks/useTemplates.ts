import { useState, useEffect, useCallback } from 'react';
import { cardTemplates as defaultTemplates } from '../components/templates/cardTemplates';
import type { CardTemplate } from '../types/cardTemplates';

const STORAGE_KEY = 'card-templates-v1';

export function useTemplates() {
  const [templates, setTemplates] = useState<CardTemplate[]>([]);

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
    setTemplates(defaultTemplates);
  }, []);

  const save = useCallback((next: CardTemplate[]) => {
    setTemplates(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      // ignore
    }
  }, []);

  const updateTemplate = useCallback((updated: CardTemplate) => {
    save(templates.map(t => t.id === updated.id ? updated : t));
  }, [templates, save]);

  return { templates, updateTemplate, setTemplates: save };
}

export default useTemplates;
