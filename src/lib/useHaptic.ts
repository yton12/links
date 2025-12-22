import { useCallback } from 'react';

export type HapticIntensity = 'light' | 'medium' | 'heavy';

const HAPTIC_PATTERNS: Record<HapticIntensity, number[]> = {
  light: [10],
  medium: [40],
  heavy: [80],
};

export interface UseHapticReturn {
  triggerHaptic: (intensity?: HapticIntensity) => void;
  isSupported: boolean;
}

export function useHaptic(): UseHapticReturn {
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  const triggerHaptic = useCallback((intensity: HapticIntensity = 'light'): void => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(HAPTIC_PATTERNS[intensity]);
    }
  }, []);

  return { triggerHaptic, isSupported };
}
