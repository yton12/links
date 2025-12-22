'use client';

import { Skeleton } from '@/components/Skeleton';

export default function Loading(): React.ReactElement {
  return (
    <div
      className="flex min-h-dvh items-center justify-center bg-[#050505]"
      role="status"
      aria-busy="true"
    >
      <main className="flex min-h-dvh w-full max-w-[430px] flex-col gap-8 px-6 py-12">
        {/* Screen reader announcement */}
        <span className="sr-only">Loading content...</span>

        <div className="flex flex-1 flex-col gap-8">
          {/* Hero Section Skeleton */}
          <section className="flex flex-col items-center gap-4 text-center">
            {/* Avatar Placeholder */}
            <Skeleton width="96px" height="96px" radius="full" />

            {/* Name Placeholder */}
            <Skeleton width="128px" height="32px" radius="md" className="mt-1" />

            {/* Role/Subtitle Placeholder */}
            <Skeleton width="192px" height="16px" radius="md" />

            {/* Status Indicator Placeholder */}
            <Skeleton width="160px" height="16px" radius="full" />
          </section>

          {/* Primary CTA Skeleton */}
          <Skeleton width="100%" height="56px" radius="xl" className="bg-white/10" />

          {/* Project Cards Skeleton */}
          <section className="flex flex-col gap-4">
            {/* Card 1 */}
            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#0A0A0A] p-4">
              <div className="flex items-center gap-3">
                {/* Icon */}
                <Skeleton width="40px" height="40px" radius="lg" />
                {/* Text */}
                <div className="flex flex-col gap-2">
                  <Skeleton width="80px" height="16px" radius="md" />
                  <Skeleton width="160px" height="12px" radius="md" />
                </div>
              </div>
              {/* Badges */}
              <div className="flex gap-2">
                <Skeleton width="56px" height="24px" radius="md" />
                <Skeleton width="48px" height="24px" radius="md" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#0A0A0A] p-4">
              <div className="flex items-center gap-3">
                {/* Icon */}
                <Skeleton width="40px" height="40px" radius="lg" />
                {/* Text */}
                <div className="flex flex-col gap-2">
                  <Skeleton width="96px" height="16px" radius="md" />
                  <Skeleton width="180px" height="12px" radius="md" />
                </div>
              </div>
              {/* Badges */}
              <div className="flex gap-2">
                <Skeleton width="52px" height="24px" radius="md" />
                <Skeleton width="72px" height="24px" radius="md" />
              </div>
            </div>
          </section>
        </div>

        {/* Footer Skeleton - Social Icons */}
        <footer className="mt-auto">
          <nav className="flex justify-center gap-4 pb-safe" aria-hidden="true">
            <Skeleton width="48px" height="48px" radius="full" />
            <Skeleton width="48px" height="48px" radius="full" />
            <Skeleton width="48px" height="48px" radius="full" />
            <Skeleton width="48px" height="48px" radius="full" />
            <Skeleton width="48px" height="48px" radius="full" />
          </nav>
        </footer>
      </main>
    </div>
  );
}
