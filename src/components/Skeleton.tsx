'use client';

import { motion, useReducedMotion } from 'framer-motion';

export interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const radiusMap: Record<NonNullable<SkeletonProps['radius']>, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export function Skeleton({
  width,
  height,
  radius = 'md',
  className = '',
}: SkeletonProps): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`bg-white/5 ${radiusMap[radius]} ${className}`}
      style={{ width, height }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0.6, 1] }}
      transition={
        shouldReduceMotion
          ? undefined
          : {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
      aria-hidden="true"
    />
  );
}
