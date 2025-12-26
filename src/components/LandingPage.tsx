'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { FileText } from 'lucide-react';
import { type ReactNode } from 'react';

import { AnimatedAvatar } from './AnimatedAvatar';
import { AnimatedCTA } from './AnimatedCTA';
import { AnimatedProjectCard } from './AnimatedProjectCard';
import { AnimatedSocialGrid } from './AnimatedSocialGrid';
import { BuildBadge } from './BuildBadge';
import { LiveDemosPanel } from './LiveDemosPanel';
import { StatusIndicator } from './StatusIndicator';
import { ThemeToggle } from './ThemeToggle';

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const avatarVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

export interface ProjectCardData {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  badges: string[];
  glowColor: 'blue' | 'green' | 'red';
}

export interface LandingPageProps {
  projects: ProjectCardData[];
}

export function LandingPage({ projects }: LandingPageProps): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();

  const activeContainerVariants = shouldReduceMotion ? reducedMotionVariants : containerVariants;
  const activeItemVariants = shouldReduceMotion ? reducedMotionVariants : itemVariants;
  const activeAvatarVariants = shouldReduceMotion ? reducedMotionVariants : avatarVariants;

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[color:var(--background)]">
      <ThemeToggle />
      <motion.main
        className="flex min-h-dvh w-full max-w-[430px] flex-col gap-8 px-6 py-12"
        variants={activeContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Skip Navigation Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[color:var(--btn-primary-bg)] focus:px-4 focus:py-2 focus:text-[color:var(--btn-primary-text)]"
        >
          Skip to main content
        </a>

        <div id="main-content" className="flex flex-1 flex-col gap-8">
          {/* Hero Section */}
          <motion.section
            className="flex flex-col items-center gap-4 text-center"
            variants={activeItemVariants}
          >
            {/* Avatar with Glow - Step 1 */}
            <motion.div variants={activeAvatarVariants}>
              <AnimatedAvatar reduceMotion={shouldReduceMotion ?? false} />
            </motion.div>

            {/* Identity - Step 2 */}
            <motion.div className="flex flex-col gap-1" variants={activeItemVariants}>
              <h1 className="text-2xl font-bold text-[color:var(--text-primary)] text-balance">
                Dinesh
              </h1>
              <p className="text-sm text-[color:var(--text-secondary)]">
                I make computers do fun and useful things.
              </p>
            </motion.div>

            {/* Status */}
            <motion.div variants={activeItemVariants}>
              <StatusIndicator statusText='Online • git commit -m "merry christmas"' />
            </motion.div>
          </motion.section>

          {/* CTA Buttons - Step 3 */}
          <motion.div className="flex w-full gap-3" variants={activeItemVariants}>
            <motion.div
              className="flex-1"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0, type: 'spring', stiffness: 100, damping: 15 }}
            >
              <AnimatedCTA
                href="/contact"
                label="Ping Me"
                reduceMotion={shouldReduceMotion ?? false}
                variant="primary"
              />
            </motion.div>
            <motion.div
              className="flex-1"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.05, type: 'spring', stiffness: 100, damping: 15 }}
            >
              <AnimatedCTA
                href="/resume"
                label="Resume"
                reduceMotion={shouldReduceMotion ?? false}
                variant="secondary"
                icon={<FileText size={16} aria-hidden="true" />}
                ariaLabel="View Resume"
              />
            </motion.div>
          </motion.div>

          {/* Project Cards - Step 4 */}
          <section className="flex flex-col gap-4" aria-labelledby="projects-heading">
            <h2 id="projects-heading" className="sr-only">
              Featured Projects
            </h2>

            {projects.map((project) => (
              <motion.div key={project.title} variants={activeItemVariants}>
                <AnimatedProjectCard {...project} reduceMotion={shouldReduceMotion ?? false} />
              </motion.div>
            ))}
          </section>

          {/* Live Demos Panel - Step 5 */}
          <motion.div variants={activeItemVariants}>
            <LiveDemosPanel reduceMotion={shouldReduceMotion ?? false} />
          </motion.div>
        </div>

        {/* Social Grid - Step 6 */}
        <motion.footer
          className="mt-auto flex flex-col items-center gap-4"
          variants={activeItemVariants}
        >
          <AnimatedSocialGrid reduceMotion={shouldReduceMotion ?? false} />
          <BuildBadge />
        </motion.footer>
      </motion.main>
    </div>
  );
}
