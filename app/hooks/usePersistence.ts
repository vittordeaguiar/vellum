import { useEffect } from 'react';
import { useCanvasStore } from '~/store/canvas-store';
import type { StorageData } from '~/types/canvas.types';

const STORAGE_KEY = 'vellum-whiteboard';
const STORAGE_VERSION = '1.0.0';

export function usePersistence() {
  const objects = useCanvasStore((state) => state.objects);
  const setObjects = useCanvasStore((state) => state.setObjects);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const data: StorageData = JSON.parse(stored);

        if (data.version === STORAGE_VERSION) {
          setObjects(data.objects);
        }
      } catch (error) {
        console.error('Failed to load from localStorage:', error);
      }
    }
  }, [setObjects]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timeoutId = setTimeout(() => {
      const data: StorageData = {
        objects,
        version: STORAGE_VERSION,
        lastModified: Date.now(),
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [objects]);
}
