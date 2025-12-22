'use client';

import { motion } from 'framer-motion';
import {
  ChevronRight,
  Code2,
  ExternalLink,
  FlaskConical,
  Globe,
  Heart,
  MessageCircleQuestion,
} from 'lucide-react';
import Link from 'next/link';
import { type ReactElement } from 'react';

export interface DemoLink {
  label: string;
  href: string;
  icon: ReactElement;
  meta?: string;
  ariaLabel: string;
  isViewSource?: boolean;
  isInternal?: boolean;
  isSupport?: boolean;
}

export interface LiveDemosPanelProps {
  reduceMotion: boolean;
}

const demoLinks: DemoLink[] = [
  {
    label: 'PassFX Live',
    href: 'https://passfx.dineshd.dev',
    icon: <Globe size={20} aria-hidden="true" />,
    ariaLabel: 'Open PassFX live website in new tab',
  },
  {
    label: 'Debate Lab Live',
    href: 'https://debatelab.dineshd.dev',
    icon: <FlaskConical size={20} aria-hidden="true" />,
    ariaLabel: 'Open Debate Lab live website in new tab',
  },
  {
    label: 'View Source',
    href: 'https://github.com/dinesh-git17/links',
    icon: <Code2 size={20} aria-hidden="true" />,
    meta: 'This Site',
    ariaLabel: 'View source code for this site on GitHub in new tab',
    isViewSource: true,
  },
  {
    label: 'FAQ',
    href: '/faq',
    icon: <MessageCircleQuestion size={20} aria-hidden="true" />,
    ariaLabel: 'View frequently asked questions',
    isInternal: true,
  },
  {
    label: 'Support the work',
    href: 'https://buymeacoffee.com/dinesh_d',
    icon: <Heart size={20} aria-hidden="true" />,
    ariaLabel: 'Support the developer on Buy Me a Coffee (opens in new tab)',
    isSupport: true,
  },
];

interface DemoLinkRowProps {
  link: DemoLink;
  reduceMotion: boolean;
  hasDivider: boolean;
}

function DemoLinkRow({ link, reduceMotion, hasDivider }: DemoLinkRowProps): ReactElement {
  const linkClassName = `group flex h-14 items-center gap-3 px-4 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--ring-color)] ${
    link.isViewSource ? 'opacity-[var(--view-source-opacity)] hover:opacity-100' : ''
  }`;

  const iconColorClass = link.isSupport
    ? 'text-[color:var(--support-icon-color)]'
    : 'text-[color:var(--icon-color)] transition-colors group-hover:text-[color:var(--icon-color-hover)]';

  const labelColorClass = link.isSupport
    ? 'text-[color:var(--support-text-color)]'
    : 'text-[color:var(--text-primary)]';

  const content = (
    <>
      <motion.span className={iconColorClass} initial={false}>
        {link.icon}
      </motion.span>
      <span className={`flex-1 text-sm font-medium ${labelColorClass}`}>{link.label}</span>
      {link.meta && <span className="text-xs text-[color:var(--text-muted)]">{link.meta}</span>}
      {link.isSupport ? (
        <span className="text-[color:var(--support-icon-color)] opacity-40">
          <ExternalLink size={14} aria-hidden="true" />
        </span>
      ) : (
        <motion.span
          className="text-[color:var(--icon-color)] transition-colors group-hover:text-[color:var(--icon-color-hover)]"
          initial={{ x: 0, opacity: 0.5 }}
          whileHover={reduceMotion ? undefined : { x: 4, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <ChevronRight size={16} aria-hidden="true" />
        </motion.span>
      )}
    </>
  );

  return (
    <li className={hasDivider ? 'border-t border-[color:var(--divider)]' : ''}>
      {link.isInternal ? (
        <motion.div
          initial={false}
          whileHover={
            reduceMotion
              ? undefined
              : {
                  backgroundColor: 'var(--demo-link-hover-bg)',
                }
          }
          whileTap={
            reduceMotion
              ? undefined
              : {
                  backgroundColor: 'var(--demo-link-tap-bg)',
                }
          }
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          <Link href={link.href} className={linkClassName} aria-label={link.ariaLabel}>
            {content}
          </Link>
        </motion.div>
      ) : (
        <motion.a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          initial={false}
          whileHover={
            reduceMotion
              ? undefined
              : {
                  backgroundColor: 'var(--demo-link-hover-bg)',
                }
          }
          whileTap={
            reduceMotion
              ? undefined
              : {
                  backgroundColor: 'var(--demo-link-tap-bg)',
                  ...(link.isSupport && { scale: 0.99 }),
                }
          }
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          aria-label={link.ariaLabel}
        >
          {content}
        </motion.a>
      )}
    </li>
  );
}

export function LiveDemosPanel({ reduceMotion }: LiveDemosPanelProps): ReactElement {
  return (
    <section aria-labelledby="live-demos-heading">
      <h2 id="live-demos-heading" className="sr-only">
        Live Demos
      </h2>
      <nav
        aria-label="Live demo links"
        className="overflow-hidden rounded-xl border border-[color:var(--card-border)] bg-[color:var(--card-surface)]"
      >
        <ul>
          {demoLinks.map((link) => (
            <DemoLinkRow
              key={link.href}
              link={link}
              reduceMotion={reduceMotion}
              hasDivider={
                link.isViewSource === true || link.isInternal === true || link.isSupport === true
              }
            />
          ))}
        </ul>
      </nav>
    </section>
  );
}
