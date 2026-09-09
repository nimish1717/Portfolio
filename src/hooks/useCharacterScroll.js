import { useScroll, useTransform } from 'framer-motion';

export function useCharacterScroll(containerRef) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return scrollYProgress;
}
