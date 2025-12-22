'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { ThemeToggle } from '@/components/ThemeToggle';

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

export default function Error({ reset }: ErrorProps): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const activeContainerVariants = shouldReduceMotion ? reducedMotionVariants : containerVariants;
  const activeItemVariants = shouldReduceMotion ? reducedMotionVariants : itemVariants;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[color:var(--background)]">
      <ThemeToggle />
      {/* Faint cyan glow behind content */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--accent-cyan)]/10 blur-3xl"
        aria-hidden="true"
      />

      <motion.main
        className="relative flex w-full max-w-[430px] flex-col items-center px-6 text-center"
        variants={activeContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Icon - Abstract warning symbol */}
        <motion.div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[color:var(--card-border)] bg-[color:var(--card-surface)]"
          variants={activeItemVariants}
          aria-hidden="true"
        >
          <svg
            className="h-8 w-8 text-[color:var(--icon-color)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </motion.div>

        {/* Headline with role="alert" for screen readers */}
        <motion.h1
          ref={headingRef}
          role="alert"
          tabIndex={-1}
          className="text-xl font-bold text-[color:var(--text-primary)] outline-none"
          variants={activeItemVariants}
        >
          System Encountered an Error
        </motion.h1>

        {/* Body text */}
        <motion.p
          className="mt-3 text-sm text-[color:var(--text-secondary)]"
          variants={activeItemVariants}
        >
          We caught a runtime exception. The issue has been automatically logged.
        </motion.p>

        {/* Dev accent badge */}
        <motion.span
          className="mt-4 rounded-md border border-[color:var(--accent-cyan)]/20 bg-[color:var(--accent-cyan)]/5 px-3 py-1 font-mono text-xs text-[color:var(--accent-cyan)]/70"
          variants={activeItemVariants}
        >
          Exception Caught
        </motion.span>

        {/* Actions */}
        <motion.div className="mt-8 flex w-full flex-col gap-4" variants={activeItemVariants}>
          {/* Primary Action: Try Again */}
          <motion.button
            type="button"
            onClick={reset}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-[color:var(--btn-primary-bg)] text-base font-semibold text-[color:var(--btn-primary-text)] transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--ring-offset)]"
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -1, boxShadow: '0 8px 30px rgba(128, 128, 128, 0.12)' }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Try Again
          </motion.button>

          {/* Secondary Action: Go Home */}
          <Link href="/" className="block">
            <motion.span
              className="flex h-12 w-full items-center justify-center rounded-lg text-base font-medium text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--ring-offset)]"
              whileHover={shouldReduceMotion ? undefined : { y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Return to Links
            </motion.span>
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
}
