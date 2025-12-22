'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { type ReactNode } from 'react';

export interface AnimatedCTAProps {
  href: string;
  label: string;
  reduceMotion: boolean;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
  ariaLabel?: string;
}

const primaryStyles =
  'bg-[image:var(--btn-primary-gradient)] text-[color:var(--btn-primary-text)] shadow-[var(--btn-primary-shadow)] focus:ring-[color:var(--ring-color)]';

const secondaryStyles =
  'bg-[color:var(--btn-secondary-bg)] text-[color:var(--btn-secondary-text)] border border-[color:var(--btn-secondary-border)] focus:ring-[color:var(--ring-color)]';

export function AnimatedCTA({
  href,
  label,
  reduceMotion,
  variant = 'primary',
  icon,
  ariaLabel,
}: AnimatedCTAProps): React.ReactElement {
  const isPrimary = variant === 'primary';
  const variantStyles = isPrimary ? primaryStyles : secondaryStyles;

  const primaryHoverAnimation = {
    scale: 1.03,
    boxShadow: 'var(--btn-primary-shadow-hover)',
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 17,
    },
  };

  const secondaryHoverAnimation = {
    scale: 1.02,
    backgroundColor: 'var(--btn-secondary-bg-hover)',
    borderColor: 'var(--btn-secondary-border-hover)',
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 17,
    },
  };

  const hoverAnimation = isPrimary ? primaryHoverAnimation : secondaryHoverAnimation;

  const tapAnimation = {
    scale: 0.96,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 17,
    },
  };

  return (
    <Link href={href} className="block flex-1">
      <motion.span
        className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[color:var(--ring-offset)] ${variantStyles}`}
        whileHover={reduceMotion ? undefined : hoverAnimation}
        whileTap={reduceMotion ? undefined : tapAnimation}
        style={{
          transition:
            'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        aria-label={ariaLabel ?? label}
      >
        {icon}
        {label}
      </motion.span>
    </Link>
  );
}
