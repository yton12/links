export interface PrimaryCTAProps {
  href: string;
  label: string;
}

export function PrimaryCTA({ href, label }: PrimaryCTAProps): React.ReactElement {
  return (
    <a
      href={href}
      className="flex w-full items-center justify-center rounded-xl bg-white px-6 py-4 text-base font-semibold text-black transition-opacity hover:opacity-90 outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
      aria-label={label}
    >
      {label}
    </a>
  );
}
