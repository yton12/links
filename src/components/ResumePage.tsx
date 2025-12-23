'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';

import { resumeData } from '@/lib/resume-data';

import { ResumeToolbar } from './ResumeToolbar';
import { ThemeToggle } from './ThemeToggle';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

function SectionHeader({ children }: { children: string }): React.ReactElement {
  return (
    <h2 className="mb-4 border-b border-[color:var(--divider)] pb-2 text-xs font-bold uppercase tracking-widest text-[color:var(--text-muted)] print:mb-1 print:border-slate-200 print:pb-0.5 print:text-[9px] print:text-slate-400">
      {children}
    </h2>
  );
}

function TechBadge({ children }: { children: string }): React.ReactElement {
  return (
    <span className="rounded bg-[color:var(--btn-secondary-bg)] px-2 py-0.5 font-mono text-xs text-[color:var(--text-secondary)] print:bg-slate-100 print:px-1 print:py-0 print:text-[9px] print:text-slate-600">
      {children}
    </span>
  );
}

export function ResumePage(): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const activeContainerVariants = shouldReduceMotion ? reducedMotionVariants : containerVariants;
  const activeItemVariants = shouldReduceMotion ? reducedMotionVariants : itemVariants;

  return (
    <div className="min-h-dvh bg-[color:var(--background)] print:bg-white">
      <ThemeToggle />
      <ResumeToolbar shareUrl="https://links.dineshd.dev/resume" />

      <motion.article
        className="mx-auto w-full max-w-3xl px-6 pb-32 pt-12 md:pb-12 print:max-w-none print:p-0 print:px-[6mm] print:py-[4mm]"
        variants={activeContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Skip Navigation - hidden in print */}
        <a
          href="#resume-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[color:var(--btn-primary-bg)] focus:px-4 focus:py-2 focus:text-[color:var(--btn-primary-text)] print:hidden"
        >
          Skip to resume content
        </a>

        {/* Header */}
        <motion.header
          id="resume-content"
          className="mb-6 border-b border-[color:var(--divider)] pb-4 print:mb-2 print:border-slate-200 print:pb-1.5"
          variants={activeItemVariants}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between print:gap-2">
            <div>
              <h1 className="text-3xl font-bold uppercase tracking-tight text-[color:var(--text-primary)] text-balance print:text-2xl print:text-slate-900">
                {resumeData.name}
              </h1>
              <p className="mt-1 text-base font-medium text-[color:var(--text-secondary)] print:mt-0.5 print:text-sm print:text-slate-600">
                {resumeData.role}
              </p>
            </div>

            <div className="text-sm text-[color:var(--text-secondary)] print:text-right print:text-[11px] print:text-slate-600">
              <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1 sm:justify-end">
                <a
                  href={`mailto:${resumeData.contact.email}`}
                  className="flex items-center gap-1.5 transition-colors hover:text-[color:var(--accent-cyan)] print:text-slate-700 print:no-underline"
                >
                  <Mail size={14} className="print:hidden" />
                  {resumeData.contact.email}
                </a>
                <span className="text-[color:var(--text-muted)] print:text-slate-300">|</span>
                <a
                  href={`tel:${resumeData.contact.phone}`}
                  className="flex items-center gap-1.5 transition-colors hover:text-[color:var(--accent-cyan)] print:text-slate-700 print:no-underline"
                >
                  <Phone size={14} className="print:hidden" />
                  {resumeData.contact.phone}
                </a>
                <span className="text-[color:var(--text-muted)] print:text-slate-300">|</span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="print:hidden" />
                  {resumeData.contact.location}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-medium text-[color:var(--accent-cyan)] sm:justify-end print:text-blue-600">
                <a
                  href={`https://${resumeData.contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[color:var(--accent-cyan-dark)] print:text-blue-600 print:no-underline"
                >
                  {resumeData.contact.website}
                </a>
                <span className="text-[color:var(--text-muted)] print:text-slate-300">|</span>
                <a
                  href={`https://${resumeData.contact.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[color:var(--accent-cyan-dark)] print:text-blue-600 print:no-underline"
                >
                  GitHub
                </a>
                <span className="text-[color:var(--text-muted)] print:text-slate-300">|</span>
                <a
                  href={`https://${resumeData.contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[color:var(--accent-cyan-dark)] print:text-blue-600 print:no-underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Summary */}
        <motion.section className="mb-6 print:mb-3" variants={activeItemVariants}>
          <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] print:text-justify print:text-[11px] print:leading-tight print:text-slate-700">
            {resumeData.summary}
          </p>
        </motion.section>

        {/* Technical Skills */}
        <motion.section className="mb-6 print:mb-3" variants={activeItemVariants}>
          <SectionHeader>Technical Skills</SectionHeader>
          <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-[100px_1fr] sm:gap-y-2 print:grid-cols-[85px_1fr] print:gap-y-0 print:text-[10px]">
            {resumeData.skills.map((skill) => (
              <div key={skill.category} className="contents">
                <div className="font-semibold text-[color:var(--text-primary)] print:text-slate-900">
                  {skill.category}
                </div>
                <div className="text-[color:var(--text-secondary)] print:text-slate-700">
                  {skill.skills}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Featured Projects */}
        <motion.section className="mb-6 print:mb-3" variants={activeItemVariants}>
          <SectionHeader>Featured Engineering Projects</SectionHeader>
          <div className="space-y-4 print:space-y-1.5">
            {resumeData.projects.map((project, index) => (
              <motion.div key={project.title} variants={activeItemVariants} custom={index}>
                <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between print:mb-0">
                  <h3 className="text-base font-bold text-[color:var(--text-primary)] print:text-[12px] print:text-slate-900">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    <TechBadge>{project.techStack}</TechBadge>
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[color:var(--accent-cyan)] transition-colors hover:text-[color:var(--accent-cyan-dark)] print:hidden"
                    >
                      View Code
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
                <p className="mb-1 text-sm italic text-[color:var(--text-muted)] print:mb-0 print:text-[10px] print:text-slate-600">
                  {project.description}
                </p>
                <ul className="list-disc space-y-1 pl-4 text-sm text-[color:var(--text-secondary)] marker:text-[color:var(--text-muted)] print:space-y-0 print:pl-3 print:text-[10px] print:text-slate-700 print:marker:text-slate-400">
                  {project.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Professional Experience */}
        <motion.section className="mb-6 print:mb-3" variants={activeItemVariants}>
          <SectionHeader>Professional Experience</SectionHeader>
          <div className="space-y-4 print:space-y-1.5">
            {resumeData.experience.map((exp, index) => (
              <motion.div key={exp.company} variants={activeItemVariants} custom={index}>
                <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between print:mb-0">
                  <div>
                    <span className="text-base font-bold text-[color:var(--text-primary)] print:text-[12px] print:text-slate-900">
                      {exp.company}
                    </span>
                    <span className="mx-2 text-[color:var(--text-muted)] print:text-slate-300">
                      |
                    </span>
                    <span className="text-sm font-medium text-[color:var(--text-secondary)] print:text-[11px] print:text-slate-700">
                      {exp.role}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[color:var(--text-muted)] print:text-[10px] print:text-slate-500">
                    {exp.period}
                  </span>
                </div>
                <ul className="list-disc space-y-1 pl-4 text-sm text-[color:var(--text-secondary)] marker:text-[color:var(--text-muted)] print:space-y-0 print:pl-3 print:text-[10px] print:text-slate-700 print:marker:text-slate-400">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.article>
    </div>
  );
}
