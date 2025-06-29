import { useCallback, useRef } from 'react';

export function useDebouncedPress(
  onPress: () => void,
  delay: number = 500
): () => void {
  const lastPressRef = useRef<number>(0);

  return useCallback(() => {
    const now = Date.now();
    if (now - lastPressRef.current >= delay) {
      lastPressRef.current = now;
      onPress();
    }
  }, [onPress, delay]);
}