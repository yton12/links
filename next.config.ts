import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GIT_SHA: process.env.GITHUB_SHA ?? 'dev-build',
  },
};

export default nextConfig;
