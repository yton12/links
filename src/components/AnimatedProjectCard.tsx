'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

export interface AnimatedProjectCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  badges: string[];
  glowColor: 'blue' | 'green';
  reduceMotion: boolean;
}

const glowStyles = {
  blue: 'before:bg-gradient-to-t before:from-blue-500/[var(--glow-opacity)] before:to-transparent',
  green:
    'before:bg-gradient-to-t before:from-emerald-500/[var(--glow-opacity)] before:to-transparent',
} as const;

const cardVariants: Variants = {
  initial: {
    y: 0,
    scale: 1,
    borderColor: 'var(--card-border)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    y: -2,
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17,
    },
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17,
    },
  },
};

const reducedMotionVariants: Variants = {
  initial: {},
  hover: {},
  tap: {},
};

export function AnimatedProjectCard({
  title,
  description,
  href,
  icon,
  badges,
  glowColor,
  reduceMotion,
}: AnimatedProjectCardProps): React.ReactElement {
  const hoverBorderColor =
    glowColor === 'blue' ? 'var(--card-border-hover)' : 'var(--card-border-hover-alt)';
  const hoverShadow =
    glowColor === 'blue' ? 'var(--card-shadow-hover)' : 'var(--card-shadow-hover-alt)';

  const customHoverVariant = {
    ...cardVariants.hover,
    borderColor: hoverBorderColor,
    boxShadow: hoverShadow,
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative flex flex-col gap-3 overflow-hidden rounded-xl border border-[color:var(--card-border)] bg-[color:var(--card-surface)] p-4 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-cyan)] before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:h-24 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:bg-[image:var(--card-surface-gradient)] ${glowStyles[glowColor]}`}
      initial="initial"
      whileHover={reduceMotion ? undefined : customHoverVariant}
      whileTap={reduceMotion ? undefined : 'tap'}
      variants={reduceMotion ? reducedMotionVariants : cardVariants}
      style={{
        transition:
          'border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Header */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--card-border)] bg-[color:var(--skeleton-base)] text-lg">
          {icon}
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-[color:var(--text-primary)] text-balance">{title}</h3>
          <p className="text-sm text-[color:var(--text-secondary)]">{description}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge}
            className="rounded-md border border-[color:var(--badge-border)] bg-[color:var(--badge-bg)] px-2 py-1 font-mono text-xs text-[color:var(--badge-text)]"
          >
            {badge}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
