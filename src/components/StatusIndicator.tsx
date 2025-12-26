'use client';

import { motion } from 'framer-motion';

export interface StatusIndicatorProps {
  statusText: string;
}

const HOLIDAY_END_DATE = new Date('2025-12-30T23:59:59');
const DEFAULT_STATUS_TEXT = 'Online • Working on PassFX';
const HOLIDAY_STATUS_TEXT = 'Online • git commit -m "merry christmas"';

function isHolidaySeason(): boolean {
  return new Date() <= HOLIDAY_END_DATE;
}

function ChristmasTreeIcon(): React.ReactElement {
  return (
    <motion.div
      className="relative"
      animate={{
        filter: [
          'drop-shadow(0 0 3px #22c55e)',
          'drop-shadow(0 0 5px #ef4444)',
          'drop-shadow(0 0 4px #3b82f6)',
          'drop-shadow(0 0 3px #22c55e)',
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <motion.path
          d="M12 2L8 8H10L6 14H9L5 20H19L15 14H18L14 8H16L12 2Z"
          animate={{
            fill: ['#22c55e', '#ef4444', '#3b82f6', '#22c55e'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <rect x="10" y="20" width="4" height="3" fill="#8B4513" />
      </svg>
    </motion.div>
  );
}

function OnlineIndicator(): React.ReactElement {
  return (
    <motion.div
      className="h-2 w-2 rounded-full bg-[color:var(--status-green)]"
      animate={{
        opacity: [1, 0.4, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden="true"
    />
  );
}

export function StatusIndicator({ statusText }: StatusIndicatorProps): React.ReactElement {
  const isHoliday = isHolidaySeason();
  const displayText = isHoliday ? HOLIDAY_STATUS_TEXT : DEFAULT_STATUS_TEXT;

  // Use passed statusText only if it differs from both defaults (for flexibility)
  const finalText =
    statusText !== HOLIDAY_STATUS_TEXT && statusText !== DEFAULT_STATUS_TEXT
      ? statusText
      : displayText;

  return (
    <div className="flex items-center gap-2">
      {isHoliday ? <ChristmasTreeIcon /> : <OnlineIndicator />}
      <span className="text-sm text-[color:var(--text-secondary)]">{finalText}</span>
    </div>
  );
}
