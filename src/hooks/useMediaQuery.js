import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// Convenience hooks
export const useIsMobile  = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet  = () => useMediaQuery('(max-width: 1024px)');
export const useIsTouch   = () => useMediaQuery('(hover: none)');
