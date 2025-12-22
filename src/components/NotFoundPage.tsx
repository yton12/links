'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';

import { ThemeToggle } from './ThemeToggle';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const heroVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

const textVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function NotFoundPage(): React.ReactElement {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[color:var(--background)]">
      <ThemeToggle />
      <motion.main
        className="flex w-full max-w-[430px] flex-col items-center px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section 1: The Visual Anchor ("404") */}
        <motion.div className="relative" variants={heroVariants}>
          {/* Glow Effect */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--accent-cyan)]/10 blur-3xl"
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            aria-hidden="true"
          />

          {/* 404 Text with Gradient */}
          <h1 className="relative font-mono text-8xl font-bold">
            <span className="bg-gradient-to-r from-[color:var(--accent-cyan)] to-[color:var(--accent-emerald)] bg-clip-text text-transparent">
              404
            </span>
            {/* Blinking Cursor */}
            <motion.span
              className="inline-block bg-gradient-to-r from-[color:var(--accent-cyan)] to-[color:var(--accent-emerald)] bg-clip-text text-transparent"
              animate={{
                opacity: [1, 1, 0, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                times: [0, 0.5, 0.5, 1],
              }}
              aria-hidden="true"
            >
              _
            </motion.span>
            <span className="sr-only">404 Error</span>
          </h1>
        </motion.div>

        {/* Section 2: The "Dev Humor" Message */}
        <motion.div variants={textVariants}>
          <h2 className="mt-6 text-xl font-medium text-[color:var(--text-primary)]">
            Error: Route Undefined
          </h2>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            We searched the stack, but this page didn&apos;t render.
          </p>
        </motion.div>

        {/* Section 3: Recovery Action */}
        <motion.div className="mt-10 w-full" variants={textVariants}>
          <Link href="/" className="block">
            <motion.span
              className="flex h-12 min-w-[200px] items-center justify-center rounded-lg bg-[color:var(--btn-primary-bg)] font-mono text-base font-medium text-[color:var(--btn-primary-text)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--ring-offset)]"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              cd ~/home
            </motion.span>
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
}
