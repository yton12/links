'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { useHaptic } from '@/lib/useHaptic';

export function ThemeToggle(): React.ReactElement | null {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const { triggerHaptic } = useHaptic();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for SSR hydration mismatch prevention with next-themes
    setMounted(true);
  }, []);

  const toggleTheme = (): void => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    triggerHaptic('light');
  };

  const isDark = resolvedTheme === 'dark';
  const ariaLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  if (!mounted) {
    return (
      <div
        className="fixed right-6 top-6 z-50 h-10 w-10 rounded-full border border-[color:var(--card-border)] bg-[color:var(--card-surface)] backdrop-blur-md"
        aria-hidden="true"
      />
    );
  }

  const iconVariants = {
    initial: shouldReduceMotion ? { opacity: 0 } : { rotate: -90, scale: 0, opacity: 0 },
    animate: shouldReduceMotion ? { opacity: 1 } : { rotate: 0, scale: 1, opacity: 1 },
    exit: shouldReduceMotion ? { opacity: 0 } : { rotate: 90, scale: 0, opacity: 0 },
  };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="fixed right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--card-border)] bg-[color:var(--card-surface)] text-[color:var(--icon-color)] backdrop-blur-md transition-colors hover:border-[color:var(--card-border-hover)] hover:text-[color:var(--icon-color-hover)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--ring-offset)]"
      whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      aria-label={ariaLabel}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.15 }}
          >
            <Sun size={18} strokeWidth={1.5} aria-hidden="true" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.15 }}
          >
            <Moon size={18} strokeWidth={1.5} aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
