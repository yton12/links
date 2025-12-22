'use client';

const GIT_SHA = process.env.NEXT_PUBLIC_GIT_SHA ?? 'dev-build';
const SHORT_SHA = GIT_SHA.slice(0, 7);
const REPO_URL = 'https://github.com/dinesh-git17/links';

export function BuildBadge(): React.ReactElement {
  const isDevBuild = GIT_SHA === 'dev-build';
  const commitUrl = isDevBuild ? REPO_URL : `${REPO_URL}/commit/${GIT_SHA}`;

  return (
    <a
      href={commitUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-400 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring-color)] focus-visible:rounded"
      aria-label={isDevBuild ? 'View repository' : `View commit ${SHORT_SHA}`}
    >
      <span className="text-zinc-600">build:</span>
      <span>{SHORT_SHA}</span>
    </a>
  );
}
