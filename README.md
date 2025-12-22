<div align="center">
  <img src="public/og.jpeg" alt="links.dineshd.dev" width="600" />
</div>

<br />

<h1 align="center">links.dineshd.dev</h1>

<p align="center">
  A personal links hub. Small on purpose.
</p>

<p align="center">
  <a href="https://github.com/dinesh-git17/links/actions/workflows/code-quality.yml">
    <img src="https://github.com/dinesh-git17/links/actions/workflows/code-quality.yml/badge.svg" alt="CI" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-16-black" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-strict-3178c6" alt="TypeScript strict" />
  <img src="https://img.shields.io/badge/Tailwind-4-38bdf8" alt="Tailwind CSS 4" />
</p>

---

## What This Is

A custom links page that serves as my home base on the internet. Think Linktree, but with opinions about performance budgets and semantic HTML.

This repository is public because I believe in building in the open. It reflects how I approach frontend work: type safety, accessibility, performance, and knowing when to stop.

## What This Is Not

- **Not a product.** There is no npm package here.
- **Not a template.** No "Deploy to Vercel" button exists.
- **Not a framework.** It's one person's links page with too many tests.

If you're looking for a Linktree alternative to fork and ship, there are excellent open-source options designed for exactly that. This isn't one of them.

## Why It Exists

**Control.** Third-party link services are fine until they aren't. Rate limits, feature gates, analytics you don't own, designs that broadcast "I used a template." A custom build means I own the pixels, the performance, and the data.

**Focus.** A links page is small enough to polish properly. Every transition, every loading state, every focus ring. Small scope, high standards.

**Signal.** The best portfolio is working code. This repository shows how I think about architecture and user experience in a codebase you can read in one sitting.

## Design Philosophy

**Mobile-first.** Most visitors arrive from social media on phones. This was designed thumb-first, desktop second.

**Performance is not optional.** Core Web Vitals are constraints, not suggestions. If it's slow on a mid-range Android, it's too slow.

**Motion with purpose.** Animation serves communication. Staggered reveals guide attention. Hover states provide feedback. Nothing bounces.

**Dark by default.** This is a developer's site. Light mode exists, but it knows its place.

**Accessibility is baseline.** WCAG AA, keyboard navigation, semantic markup, visible focus states. The web is for everyone.

## Tech Stack

| Layer      | Choice                  |
| ---------- | ----------------------- |
| Framework  | Next.js 16 (App Router) |
| Language   | TypeScript 5 (strict)   |
| Styling    | Tailwind CSS 4          |
| Animation  | Framer Motion           |
| Deployment | Vercel                  |

No state management library. No component framework. The simplest tools that could possibly work.

## Local Development

```bash
git clone https://github.com/dinesh-git17/links.git
cd links
npm install
npm run dev
```

Open `localhost:3000`.

This exists for developers curious about implementation details. It is not an invitation to fork and deploy.

## On Inspiration and Reuse

You're welcome to read this code. You're welcome to learn from it. If you see a pattern worth borrowing, build your own version.

What I'd ask:

1. **Make it yours.** The value of a personal site is that it's personal. A copy defeats the purpose.
2. **Credit ideas, not code.** If something here shapes your thinking, a mention is nice but not required.
3. **Star before you clone.** Stars are free. Forks are forever.

## Status

This is a living project. It changes when I have something to add or improve. There's no roadmap, no release schedule, no issues tab waiting for feature requests.

It's done when it does what I need. It's improved when it improves.

---

<p align="center">
  Built by <a href="https://links.dineshd.dev">Dinesh</a>
</p>

<p align="center">
  <sub>If you've read this far, you're either a recruiter doing due diligence or a developer who reads READMEs for fun. Either way: hello.</sub>
</p>
