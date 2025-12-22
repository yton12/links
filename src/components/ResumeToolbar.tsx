'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Download, Share2, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';

import { ShareModal } from './ShareModal';

export interface ResumeToolbarProps {
  shareUrl: string;
}

export function ResumeToolbar({ shareUrl }: ResumeToolbarProps): React.ReactElement {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleDownloadPDF = useCallback(async (): Promise<void> => {
    setIsGenerating(true);
    try {
      // Dynamic import to ensure client-side only
      const { pdf } = await import('@react-pdf/renderer');
      const { ResumePDF } = await import('./ResumePDF');

      const blob = await pdf(<ResumePDF />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Dinesh_Dawonauth_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      // Log error for debugging, fallback to browser print

      console.error('PDF generation failed:', err);
      window.print();
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const openShare = useCallback((): void => {
    setIsShareOpen(true);
  }, []);

  const closeShare = useCallback((): void => {
    setIsShareOpen(false);
  }, []);

  const buttonBase =
    'flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--ring-offset)]';

  return (
    <>
      {/* Mobile: Fixed bottom bar */}
      <motion.div
        className="fixed inset-x-6 bottom-6 z-40 flex items-center justify-center gap-2 rounded-2xl border border-[color:var(--card-border)] bg-[color:var(--card-surface)]/80 px-4 py-3 backdrop-blur-md print:hidden md:hidden"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 50 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <motion.button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className={`${buttonBase} flex-1 bg-[color:var(--btn-primary-bg)] text-[color:var(--btn-primary-text)] hover:opacity-90 disabled:opacity-70`}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          aria-label="Download as PDF"
        >
          {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          <span>{isGenerating ? 'Generating...' : 'PDF'}</span>
        </motion.button>

        <motion.button
          onClick={openShare}
          className={`${buttonBase} flex-1 bg-[color:var(--btn-secondary-bg)] text-[color:var(--btn-secondary-text)] hover:opacity-80`}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          aria-label="Share resume"
        >
          <Share2 size={16} />
          <span>Share</span>
        </motion.button>

        <Link
          href="/"
          className={`${buttonBase} bg-[color:var(--btn-secondary-bg)] text-[color:var(--btn-secondary-text)] hover:opacity-80`}
        >
          <X size={16} />
          <span className="sr-only">Back to home</span>
        </Link>
      </motion.div>

      {/* Desktop: Fixed top-right - offset by theme toggle */}
      <motion.div
        className="fixed right-20 top-6 z-40 hidden items-center gap-2 rounded-2xl border border-[color:var(--card-border)] bg-[color:var(--card-surface)]/80 px-3 py-2 backdrop-blur-md print:hidden md:flex"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <motion.button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className={`${buttonBase} bg-[color:var(--btn-primary-bg)] text-[color:var(--btn-primary-text)] hover:opacity-90 disabled:opacity-70`}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          aria-label="Download as PDF"
        >
          {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          <span>{isGenerating ? 'Generating...' : 'PDF'}</span>
        </motion.button>

        <motion.button
          onClick={openShare}
          className={`${buttonBase} bg-[color:var(--btn-secondary-bg)] text-[color:var(--btn-secondary-text)] hover:opacity-80`}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          aria-label="Share resume"
        >
          <Share2 size={16} />
          <span>Share</span>
        </motion.button>

        <Link
          href="/"
          className={`${buttonBase} bg-[color:var(--btn-secondary-bg)] text-[color:var(--btn-secondary-text)] hover:opacity-80`}
          aria-label="Back to home"
        >
          <X size={16} />
        </Link>
      </motion.div>

      <ShareModal isOpen={isShareOpen} onClose={closeShare} url={shareUrl} />
    </>
  );
}
