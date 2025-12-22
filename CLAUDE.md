# CLAUDE.md — Engineering Contract

**Version:** 1.0
**Project:** links.dineshd.dev — Personal Links Hub
**Last Updated:** 2025-12-22

This document is the authoritative engineering contract for this codebase. Every commit, every PR, every deployment must comply. Non-negotiable rules are marked as such. Deviations require documented exceptions with technical justification.

---

## 1. Project Overview

**Purpose:** Custom personal links hub (similar to allmylinks) serving as a centralized landing page for all professional and social profiles.

**Domain:** links.dineshd.dev

**Tech Stack:**

- Next.js 14+ (App Router)
- TypeScript 5+ (strict mode)
- Tailwind CSS 3+
- React 18+

**Core Principles:**

1. Type safety is not optional
2. Accessibility is not an afterthought
3. Performance is a feature
4. SEO correctness is mandatory
5. Code quality is enforced, not suggested

---

## 2. Non-Negotiable Rules

These rules have zero tolerance for violations. CI will reject non-compliant code.

### 2.1 TypeScript Rules

**STRICT MODE ALWAYS ENABLED**

- `strict: true` in tsconfig.json is immutable
- All compiler strict flags must remain enabled
- No silencing TypeScript errors with config changes

**TYPE SAFETY**

- `any` type is banned (document exceptions in PR with technical justification)
- `unknown` preferred over `any` when type is genuinely unknown
- All functions must have explicit return types
- All function parameters must have explicit types
- Props interfaces must be exported and documented

```typescript
// WRONG
function formatDate(date) {
  return date.toLocaleDateString();
}

// CORRECT
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}
```

**NO TYPE ASSERTIONS WITHOUT JUSTIFICATION**

- `as` assertions require inline comment explaining why
- Prefer type guards over assertions
- Never use `as any` (this is a firing offense)

### 2.2 Code Cleanliness

**NO CONSOLE.LOG IN PRODUCTION**

- ESLint will fail on console.log/warn/error
- Use proper logging utility if logging is needed
- Debug statements must be removed before PR

**NO INLINE STYLES**

- Use Tailwind classes exclusively
- Exception: Dynamic styles requiring runtime calculation (must be documented)
- No style prop unless absolutely necessary (and documented)

**NO COMMENTED-OUT CODE**

- Dead code must be deleted
- Git history exists for a reason
- Commented code in PR will block merge

**NO MAGIC NUMBERS**

- Use Tailwind spacing scale (space-4, gap-8)
- Named constants for business logic numbers
- Design tokens in Tailwind config

### 2.3 Accessibility (WCAG AA Minimum)

**KEYBOARD NAVIGATION**

- All interactive elements must be keyboard accessible
- Focus indicators must be visible (never `outline: none` without replacement)
- Logical tab order maintained
- Skip navigation link required on all pages

**SEMANTIC HTML**

- Use proper heading hierarchy (h1 → h2 → h3, no skipping)
- Landmark regions (header, nav, main, footer)
- Button for actions, anchor for navigation
- Lists for list content (nav menus, link cards)

**ARIA ATTRIBUTES**

- aria-label for icon-only buttons
- aria-describedby for additional context
- aria-live for dynamic content updates
- No redundant ARIA (if semantic HTML suffices)

**COLOR CONTRAST**

- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text
- Minimum 3:1 for UI components
- Verify both light and dark modes

**IMAGES**

- All images must have alt text
- Decorative images: empty alt (`alt=""`)
- Informative images: descriptive alt text

### 2.4 SEO Requirements

**METADATA (Next.js Metadata API)**

- Every page must export metadata object
- Title: 50-60 characters
- Description: 150-160 characters
- Open Graph tags required
- Twitter Card tags required
- Canonical URLs configured

```typescript
// app/page.tsx
export const metadata: Metadata = {
  title: 'Dinesh D — Links Hub',
  description: 'Central hub for all my professional and social profiles.',
  openGraph: {
    title: 'Dinesh D — Links Hub',
    description: 'Central hub for all my professional and social profiles.',
    url: 'https://links.dineshd.dev',
    siteName: 'Dinesh D Links',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dinesh D — Links Hub',
    description: 'Central hub for all my professional and social profiles.',
    images: ['/og-image.png'],
  },
};
```

**STRUCTURED DATA**

- JSON-LD for person schema
- Proper social profile markup
- Validate with Google Rich Results Test

**TECHNICAL SEO**

- sitemap.xml generated
- robots.txt configured
- Canonical URLs on all pages
- Proper heading structure (one h1 per page)

### 2.5 Performance Requirements

**CORE WEB VITALS TARGETS**

- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**IMAGES**

- Use next/image exclusively
- Specify width and height attributes
- Use appropriate priority for above-fold images
- Optimize images before committing (WebP/AVIF preferred)

**FONTS**

- Use next/font for font optimization
- Preload critical fonts
- Font-display: swap or optional

**LAZY LOADING**

- Below-fold content lazy loaded
- Images outside viewport lazy loaded
- Code splitting for large components

**BUNDLE SIZE**

- Run bundle analyzer before major releases
- No single bundle > 200KB (gzipped)
- Tree-shake unused dependencies
- Dynamic imports for heavy components

**NO BLOCKING RESOURCES**

- No synchronous third-party scripts
- Defer non-critical JavaScript
- Inline critical CSS if needed

---

## 3. Git Workflow (Strict Sequence)

This sequence is mandatory. Deviations will result in messy git history and blocked PRs.

### 3.1 Before Any Work

```bash
# 1. Always start on main
git checkout main

# 2. Pull latest changes
git pull origin main

# 3. Verify clean state
git status  # Must show "working tree clean"
```

### 3.2 Making Changes

```bash
# 1. Make your changes
# Edit files, add features, fix bugs

# 2. DO NOT COMMIT ON MAIN
# Verify you have not committed:
git log --oneline -5  # Check no new commits

# 3. Create feature branch BEFORE committing
git checkout -b feature/descriptive-name
# or
git checkout -b fix/bug-description
```

### 3.3 Committing

**CONVENTIONAL COMMIT FORMAT**

```
<type>(<scope>): <subject>

<body (optional)>

<footer (optional)>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code change that neither fixes bug nor adds feature
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Build process, dependencies, tooling

**Examples:**

```bash
git commit -m "feat(links): add social media link cards"
git commit -m "fix(header): correct mobile navigation z-index"
git commit -m "perf(image): implement lazy loading for link icons"
```

**Commit Body (when needed):**

```
feat(analytics): add Vercel Analytics integration

Integrates Vercel Analytics for basic traffic monitoring.
No PII collected. Tracks page views and Web Vitals only.

Closes #42
```

### 3.4 Pushing and PR

```bash
# 1. Push branch
git push origin feature/your-branch-name

# 2. Create PR via GitHub
# Use PR template (see Section 10)

# 3. Never merge your own PR without review
# Exception: Hotfixes with post-merge review
```

### 3.5 After PR Merged

```bash
# 1. Return to main
git checkout main

# 2. Pull merged changes
git pull origin main

# 3. Delete feature branch
git branch -d feature/your-branch-name
```

---

## 4. Code Quality Enforcement

All checks must pass before merge. No exceptions.

### 4.1 Automated Checks

**Pre-commit Hooks:**

- ESLint (zero warnings)
- Prettier format check
- TypeScript type check
- Staged files only

**CI Pipeline:**

- ESLint (zero warnings in CI)
- TypeScript type check
- Build success
- Test suite pass
- Accessibility audit (axe-core)

### 4.2 ESLint Configuration

**ZERO WARNINGS IN CI**

- Warnings in local dev are acceptable during iteration
- All warnings must be resolved before push
- No eslint-disable without documented justification
- No modifying ESLint rules to silence errors

**Common Rules:**

- No unused variables
- No console statements
- No any types
- React hooks rules enforced
- Accessibility rules enforced (jsx-a11y)

### 4.3 Prettier

**FORMATTING IS NON-NEGOTIABLE**

- Prettier config is immutable
- Run `npm run format` before commit
- Use editor integration for auto-format on save
- No debating formatting choices (Prettier decides)

### 4.4 TypeScript Type Check

```bash
# Must pass before push
npm run type-check
```

**No type errors allowed in CI**

- Fix type errors, do not suppress them
- No `@ts-ignore` or `@ts-expect-error` without justification
- Justification must be inline comment explaining why

### 4.5 Build Check

```bash
# Must pass before push
npm run build
```

**Build errors are blocking**

- No shipping broken builds
- Test build locally before pushing
- Vercel preview deployments must succeed

---

## 5. Component Standards

### 5.1 Component Structure

**FUNCTIONAL COMPONENTS ONLY**

- No class components (legacy React pattern)
- Use hooks for state and lifecycle

**COMPONENT FILE STRUCTURE**

```typescript
// LinkCard.tsx
import { type ReactNode } from 'react';

// Types first
export interface LinkCardProps {
  title: string;
  url: string;
  icon?: ReactNode;
  description?: string;
}

// Component second
export function LinkCard({ title, url, icon, description }: LinkCardProps): JSX.Element {
  return (
    <a
      href={url}
      className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        )}
      </div>
    </a>
  );
}
```

### 5.2 Props Interface

**MUST BE DEFINED AND EXPORTED**

- Interface named `{ComponentName}Props`
- Exported for reuse and testing
- All props documented with JSDoc if not self-explanatory

```typescript
/**
 * Props for the LinkCard component.
 */
export interface LinkCardProps {
  /** Display title for the link */
  title: string;
  /** Destination URL */
  url: string;
  /** Optional icon element */
  icon?: ReactNode;
  /** Optional description text */
  description?: string;
}
```

### 5.3 Performance Optimization

**React.memo FOR EXPENSIVE RENDERS**

- Use React.memo for components that render frequently with same props
- Profile before optimizing (no premature optimization)
- Document why memo is needed

```typescript
export const LinkCard = memo(function LinkCard({ title, url }: LinkCardProps): JSX.Element {
  // Component implementation
});
```

**Avoid Unnecessary Re-renders**

- Use useCallback for event handlers passed as props
- Use useMemo for expensive calculations
- Keep state as local as possible

### 5.4 Export Conventions

**DEFAULT vs NAMED EXPORTS**

- Default exports: Pages only (`app/page.tsx`)
- Named exports: Components, utilities, types
- Reason: Better refactoring support, clearer imports

```typescript
// components/LinkCard.tsx
export function LinkCard() {} // Named export

// app/page.tsx
export default function HomePage() {} // Default export for Next.js page
```

### 5.5 Colocation

**KEEP RELATED FILES TOGETHER**

```
components/
  LinkCard/
    LinkCard.tsx
    LinkCard.test.tsx
    index.ts  // Re-export for cleaner imports
```

---

## 6. Styling Standards

### 6.1 Tailwind CSS Exclusively

**NO CUSTOM CSS FILES**

- All styling via Tailwind utility classes
- Exception: Global styles in `app/globals.css` for resets only
- No CSS modules, no styled-components, no emotion

**Tailwind Config is Single Source of Truth**

```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          // ... full scale
        },
      },
      spacing: {
        18: '4.5rem', // Only if 4.5rem is a repeated pattern
      },
    },
  },
};
```

### 6.2 Design Tokens

**USE TAILWIND CONFIG FOR TOKENS**

- Colors: Define in theme.extend.colors
- Spacing: Use default scale (rarely extend)
- Typography: Define in theme.extend.fontSize
- Shadows, borders, radii: Configure in theme

**NO ARBITRARY VALUES UNLESS NECESSARY**

```typescript
// WRONG (unless one-off value)
<div className="w-[347px]" />

// CORRECT
<div className="w-80" /> // Use scale value
```

### 6.3 Responsive Design

**MOBILE-FIRST APPROACH**

- Base styles are mobile
- Use breakpoint prefixes for larger screens (sm:, md:, lg:, xl:, 2xl:)

```typescript
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```

**Breakpoint Usage:**

- `sm:` (640px): Small tablets
- `md:` (768px): Tablets
- `lg:` (1024px): Laptops
- `xl:` (1280px): Desktops
- `2xl:` (1536px): Large desktops

### 6.4 Dark Mode

**DARK MODE SUPPORT REQUIRED**

- Use `dark:` variant for all color utilities
- Test both modes before PR
- Use system preference as default (`class` strategy)

```typescript
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
```

**Dark Mode Colors:**

- Light backgrounds → Dark backgrounds
- Dark text → Light text
- Maintain color contrast ratios in both modes

### 6.5 Class Organization

**CONSISTENT ORDERING**

1. Layout (display, position, top/left/right/bottom)
2. Box model (width, height, margin, padding)
3. Typography (font, text)
4. Visual (background, border, shadow)
5. Misc (cursor, transition, transform)

```typescript
// Good ordering
<button className="flex items-center gap-2 rounded-lg px-4 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
```

**Use Prettier Plugin:**

- `prettier-plugin-tailwindcss` for automatic class sorting

---

## 7. Naming Conventions

### 7.1 Files and Directories

**Components:** PascalCase

```
LinkCard.tsx
ProfileHeader.tsx
SocialIcon.tsx
```

**Utilities:** camelCase

```
formatDate.ts
validateUrl.ts
cn.ts  // classNames utility
```

**Types:** PascalCase

```
types.ts       // Contains multiple types
LinkData.ts    // Single type export
```

**Non-Component Files:** kebab-case

```
api-client.ts
error-messages.ts
```

**Next.js Special Files:** lowercase

```
page.tsx
layout.tsx
loading.tsx
error.tsx
not-found.tsx
```

### 7.2 Variables and Functions

**Variables:** camelCase

```typescript
const userProfile = {};
let isLoading = false;
```

**Constants:** UPPER_SNAKE_CASE

```typescript
const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT = 5000;
```

**Functions:** camelCase (verb prefix)

```typescript
function fetchUserData() {}
function handleClick() {}
function formatCurrency() {}
```

**Event Handlers:** `handle{Event}` or `on{Event}`

```typescript
function handleSubmit() {}
function handleChange() {}
```

**Boolean Variables:** `is/has/should` prefix

```typescript
const isLoading = true;
const hasError = false;
const shouldRedirect = true;
```

### 7.3 Types and Interfaces

**PascalCase for All Types**

```typescript
interface LinkData {}
type UserProfile = {};
enum LoadingState {}
```

**Props Interfaces:** `{ComponentName}Props`

```typescript
interface LinkCardProps {}
interface HeaderProps {}
```

**Generic Type Parameters:** Descriptive or single capital letter

```typescript
function identity<T>(value: T): T {}
function mapArray<TInput, TOutput>(items: TInput[], fn: (item: TInput) => TOutput): TOutput[] {}
```

---

## 8. Accessibility Requirements

### 8.1 Semantic HTML

**USE PROPER ELEMENTS**

```typescript
// WRONG
<div onClick={handleClick}>Click me</div>

// CORRECT
<button onClick={handleClick}>Click me</button>
```

**HEADING HIERARCHY**

- One h1 per page
- No skipping levels (h1 → h2 → h3, not h1 → h3)
- Headings describe content structure, not just style

```typescript
<h1>Dinesh D</h1>
<h2>Professional Links</h2>
<h3>GitHub</h3>
<h3>LinkedIn</h3>
<h2>Social Media</h2>
<h3>Twitter</h3>
```

**LANDMARK REGIONS**

```typescript
<header>
  <nav aria-label="Main navigation">
<main>
  <section aria-labelledby="professional-links">
<footer>
```

### 8.2 ARIA Labels

**ICON-ONLY BUTTONS**

```typescript
<button aria-label="Close dialog">
  <XIcon />
</button>
```

**DESCRIPTIVE LABELS**

```typescript
<nav aria-label="Main navigation">
<form aria-label="Contact form">
<section aria-labelledby="heading-id">
```

**LIVE REGIONS**

```typescript
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

**AVOID REDUNDANT ARIA**

```typescript
// WRONG (button already has role)
<button role="button">

// CORRECT
<button>
```

### 8.3 Keyboard Navigation

**FOCUS INDICATORS**

```typescript
// WRONG
<button className="outline-none">

// CORRECT (custom focus style)
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500">
```

**TAB ORDER**

- Natural DOM order is best
- Use tabIndex only when necessary
- tabIndex="0" for custom interactive elements
- tabIndex="-1" to remove from tab order

**SKIP NAVIGATION**

```typescript
// Required on all pages
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

// CSS in globals.css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  z-index: 100;
  padding: 8px;
  background: white;
}

.skip-link:focus {
  top: 0;
}
```

### 8.4 Color Contrast

**MINIMUM RATIOS (WCAG AA)**

- Normal text (< 18px): 4.5:1
- Large text (≥ 18px or ≥ 14px bold): 3:1
- UI components: 3:1

**VERIFY BOTH MODES**

- Test light mode contrast
- Test dark mode contrast
- Use WebAIM Contrast Checker

**NO INFORMATION BY COLOR ALONE**

```typescript
// WRONG (color only)
<span className="text-red-600">Error</span>

// CORRECT (color + icon/text)
<span className="text-red-600">
  <ErrorIcon /> Error
</span>
```

### 8.5 Images

**ALT TEXT REQUIRED**

```typescript
// Informative image
<Image src="/avatar.jpg" alt="Dinesh D profile photo" />

// Decorative image
<Image src="/background.svg" alt="" />

// Complex image (use aria-describedby for long description)
<Image src="/chart.png" alt="Sales chart" aria-describedby="chart-description" />
<div id="chart-description" className="sr-only">
  Detailed description of chart data...
</div>
```

---

## 9. SEO Requirements

### 9.1 Metadata API (Next.js 14+)

**EVERY PAGE MUST EXPORT METADATA**

```typescript
// app/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dinesh D — Links Hub',
  description: 'Central hub for all my professional and social profiles.',
  keywords: ['Dinesh D', 'links', 'social media', 'portfolio'],
  authors: [{ name: 'Dinesh D' }],
  creator: 'Dinesh D',
  publisher: 'Dinesh D',
  metadataBase: new URL('https://links.dineshd.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dinesh D — Links Hub',
    description: 'Central hub for all my professional and social profiles.',
    url: 'https://links.dineshd.dev',
    siteName: 'Dinesh D Links',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dinesh D Links Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dinesh D — Links Hub',
    description: 'Central hub for all my professional and social profiles.',
    creator: '@yourusername',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

### 9.2 Structured Data

**JSON-LD FOR PERSON SCHEMA**

```typescript
// components/StructuredData.tsx
export function PersonStructuredData(): JSX.Element {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dinesh D',
    url: 'https://links.dineshd.dev',
    image: 'https://links.dineshd.dev/avatar.jpg',
    sameAs: [
      'https://github.com/yourusername',
      'https://linkedin.com/in/yourusername',
      'https://twitter.com/yourusername',
    ],
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Your Company',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

### 9.3 Sitemap and Robots

**SITEMAP.XML**

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://links.dineshd.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

**ROBOTS.TXT**

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://links.dineshd.dev/sitemap.xml',
  };
}
```

### 9.4 Technical SEO

**CANONICAL URLS**

- Set via metadata.alternates.canonical
- Use absolute URLs
- One canonical per page

**URL STRUCTURE**

- Clean URLs (no query parameters for primary content)
- Descriptive slugs
- Lowercase only
- Hyphens for word separation

**HEADING STRUCTURE**

- One h1 per page (page title)
- Logical hierarchy
- Descriptive text (not "click here")

---

## 10. Performance Requirements

### 10.1 Core Web Vitals

**MONITORING REQUIRED**

- Vercel Analytics enabled
- Monitor LCP, FID, CLS in production
- Regression alerts on significant drops

**LCP (Largest Contentful Paint) < 2.5s**

- Optimize above-fold images
- Prioritize critical resources
- Reduce server response time

**FID (First Input Delay) < 100ms**

- Minimize JavaScript execution time
- Break up long tasks
- Use code splitting

**CLS (Cumulative Layout Shift) < 0.1**

- Set explicit dimensions on images/videos
- Reserve space for dynamic content
- Avoid inserting content above existing content

### 10.2 Image Optimization

**USE NEXT/IMAGE EXCLUSIVELY**

```typescript
import Image from 'next/image';

// CORRECT
<Image
  src="/avatar.jpg"
  alt="Profile photo"
  width={200}
  height={200}
  priority // For above-fold images
/>

// WRONG
<img src="/avatar.jpg" alt="Profile photo" />
```

**IMAGE REQUIREMENTS**

- Always specify width and height
- Use priority for LCP images
- Lazy load below-fold images (default)
- Optimize source images before commit
- Prefer WebP/AVIF formats

**IMAGE SIZING**

```typescript
// Responsive images
<Image
  src="/hero.jpg"
  alt="Hero image"
  fill
  sizes="100vw"
  className="object-cover"
/>
```

### 10.3 Font Optimization

**USE NEXT/FONT**

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

**FONT CONFIGURATION**

- display: 'swap' or 'optional' (never 'block')
- Preload critical fonts automatically handled by next/font
- Subset fonts (only include needed characters)

### 10.4 Bundle Size

**BUNDLE ANALYSIS**

```bash
# Run before major releases
npm run build
npm run analyze
```

**SIZE LIMITS**

- No single route bundle > 200KB (gzipped)
- First-load JS < 150KB
- Total page size < 500KB

**OPTIMIZATION STRATEGIES**

- Tree-shake unused dependencies
- Dynamic imports for heavy components
- Code splitting by route (automatic in Next.js)
- Remove unused packages

```typescript
// Dynamic import for heavy component
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // If client-only
});
```

### 10.5 Lazy Loading

**BELOW-FOLD CONTENT**

```typescript
import dynamic from 'next/dynamic';

// Lazy load component
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div>Loading...</div>,
});

// Lazy load with no SSR
const ClientOnlyComponent = dynamic(
  () => import('@/components/ClientOnlyComponent'),
  { ssr: false }
);
```

**IMAGES**

- Above-fold: `priority={true}`
- Below-fold: default lazy loading
- Far below-fold: `loading="lazy"` (default)

### 10.6 Third-Party Scripts

**NO BLOCKING SCRIPTS**

```typescript
import Script from 'next/script';

// CORRECT
<Script
  src="https://example.com/script.js"
  strategy="lazyOnload" // or "afterInteractive"
/>

// WRONG
<script src="https://example.com/script.js"></script>
```

**SCRIPT STRATEGIES**

- `beforeInteractive`: Critical scripts (rarely needed)
- `afterInteractive`: Important scripts (analytics)
- `lazyOnload`: Non-critical scripts (chatbots, widgets)

---

## 11. Testing Requirements

### 11.1 Test Coverage Targets

**MINIMUM COVERAGE**

- Utilities: 80%
- Components: 70%
- Overall: 75%

**NO COVERAGE GAMING**

- Meaningful tests only
- Test behavior, not implementation
- Avoid snapshot tests for dynamic content

### 11.2 Unit Tests

**UTILITIES MUST BE TESTED**

```typescript
// utils/formatDate.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats date in MM/DD/YYYY format', () => {
    const date = new Date('2025-12-22');
    expect(formatDate(date)).toBe('12/22/2025');
  });

  it('handles invalid dates', () => {
    const invalidDate = new Date('invalid');
    expect(() => formatDate(invalidDate)).toThrow('Invalid date');
  });
});
```

**WHAT TO TEST**

- Pure functions (100% coverage)
- Data transformations
- Validation logic
- Business logic

### 11.3 Component Tests

**COMPLEX COMPONENTS MUST BE TESTED**

```typescript
// components/LinkCard.test.tsx
import { render, screen } from '@testing-library/react';
import { LinkCard } from './LinkCard';

describe('LinkCard', () => {
  it('renders link with title and URL', () => {
    render(<LinkCard title="GitHub" url="https://github.com" />);
    const link = screen.getByRole('link', { name: /github/i });
    expect(link).toHaveAttribute('href', 'https://github.com');
  });

  it('opens link in new tab', () => {
    render(<LinkCard title="GitHub" url="https://github.com" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders icon when provided', () => {
    render(<LinkCard title="GitHub" url="#" icon={<span>ICON</span>} />);
    expect(screen.getByText('ICON')).toBeInTheDocument();
  });
});
```

**WHAT TO TEST**

- Rendering with various props
- User interactions (clicks, typing)
- Conditional rendering
- Error states

### 11.4 E2E Tests

**CRITICAL PATHS**

```typescript
// e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('homepage displays all link categories', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h1')).toContainText('Dinesh D');
  await expect(page.getByRole('heading', { name: 'Professional Links' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Social Media' })).toBeVisible();
});

test('links are keyboard navigable', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press('Tab'); // Skip link
  await page.keyboard.press('Tab'); // First link

  const focusedElement = page.locator(':focus');
  await expect(focusedElement).toHaveRole('link');
});
```

**WHAT TO TEST**

- User flows (navigation)
- Keyboard navigation
- External link opening
- Mobile responsive behavior

### 11.5 Accessibility Testing

**AXE-CORE INTEGRATION**

```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('accessibility', () => {
  test('homepage has no accessibility violations', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
    await checkA11y(page);
  });
});
```

**RUN BEFORE EVERY PR**

```bash
npm run test:a11y
```

### 11.6 Running Tests

**COMMANDS**

```bash
# Unit and component tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e

# Accessibility tests
npm run test:a11y
```

**CI REQUIREMENTS**

- All tests must pass
- Coverage thresholds met
- No skipped tests in CI (skip locally is fine)

---

## 12. Error Handling

### 12.1 Error Boundaries

**TOP-LEVEL ERROR BOUNDARY**

```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="mt-4 text-gray-600">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
```

**COMPONENT-LEVEL ERROR BOUNDARIES**

- Use for critical sections that can fail independently
- Graceful degradation (show fallback UI)
- Never show stack traces to users

### 12.2 API Error Handling

**GRACEFUL ERROR HANDLING**

```typescript
async function fetchUserData(): Promise<UserData> {
  try {
    const response = await fetch('/api/user');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch user data:', error.message);
    }
    throw new Error('Unable to load user data. Please try again later.');
  }
}
```

**USER-FACING ERROR MESSAGES**

- Never expose internal errors
- Provide actionable guidance
- Maintain professional tone

```typescript
// WRONG
throw new Error('Database connection timeout in UserService.fetchById()');

// CORRECT
throw new Error('Unable to load profile. Please check your connection and try again.');
```

### 12.3 Validation Errors

**FORM VALIDATION**

```typescript
function validateUrl(url: string): string | null {
  try {
    new URL(url);
    return null; // Valid
  } catch {
    return 'Please enter a valid URL';
  }
}

// Usage
const error = validateUrl(input);
if (error) {
  setError(error); // User-facing message
}
```

### 12.4 404 and Error Pages

**CUSTOM 404**

```typescript
// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-gray-600">Page not found</p>
      <a href="/" className="mt-8 text-blue-600 hover:underline">
        Return home
      </a>
    </div>
  );
}
```

---

## 13. Comment Standards

Code should be self-documenting. Comments explain WHY, not WHAT.

### 13.1 When to Comment

**DO COMMENT:**

- Complex algorithms (explain the approach)
- Non-obvious workarounds (explain why workaround is needed)
- Type assertions (explain why assertion is safe)
- Business logic (explain the business rule)
- Public APIs (JSDoc for exported functions)

**DON'T COMMENT:**

- Obvious code (self-explanatory functions)
- Implementation details (code shows this)
- Version history (git history exists)
- Disabled code (delete it)

### 13.2 File-Level Comments

**2-4 LINES MAX**

```typescript
/**
 * Link card component for displaying social/professional links.
 * Supports optional icons and descriptions.
 */

// No file-level comment needed for this simple utility
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}
```

### 13.3 Function Comments

**JSDOC FOR PUBLIC APIs**

```typescript
/**
 * Validates a URL string.
 * @param url - The URL to validate
 * @returns null if valid, error message if invalid
 */
export function validateUrl(url: string): string | null {
  // Implementation
}
```

**INLINE COMMENTS FOR WHY**

```typescript
// WRONG (explaining what)
// Increment counter by 1
count++;

// CORRECT (explaining why)
// Skip the first item as it's the header row
const dataRows = rows.slice(1);

// Use type assertion here because TypeScript doesn't recognize the
// type narrowing from the previous if-check due to the async boundary
const user = data.user as User;
```

### 13.4 Comment Style

**TONE REQUIREMENTS**

- Professional and direct
- No emojis
- No casual language ("gonna", "wanna")
- No personal pronouns ("I think", "we should")
- No commentary ("this is hacky", "not sure if this is right")

```typescript
// WRONG
// TODO: Fix this hacky workaround later lol 😅
// WRONG
// I think we should probably validate this at some point
// WRONG
// Not sure why this works but it does so don't touch it

// CORRECT
// Workaround for Safari bug with flexbox in iOS 12
// CORRECT
// Validation deferred to API layer per security requirements
```

### 13.5 TODO Comments

**FORMAT**

```typescript
// TODO(username): Brief description of task
// TODO(dinesh): Add error handling for network failures
```

**REQUIREMENTS**

- Include your username
- Brief and specific
- No TODOs in production that are > 30 days old
- Track TODOs via issues for long-term items

---

## 14. Code Review Checklist

Use this checklist for every PR. Reviewer and author both responsible.

### 14.1 Functionality

- [ ] Code works as intended
- [ ] Edge cases handled
- [ ] Error states handled gracefully
- [ ] No console.log statements
- [ ] No commented-out code

### 14.2 Type Safety

- [ ] TypeScript strict mode passing
- [ ] No `any` types (or documented exceptions)
- [ ] Explicit return types on all functions
- [ ] Props interfaces defined and exported
- [ ] No type assertions without justification

### 14.3 Accessibility

- [ ] Semantic HTML used
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels on icon-only buttons
- [ ] Color contrast meets AA standard
- [ ] Alt text on images
- [ ] Heading hierarchy correct

### 14.4 SEO

- [ ] Metadata defined for new pages
- [ ] Open Graph tags included
- [ ] Twitter Card tags included
- [ ] Proper heading structure (one h1)
- [ ] Canonical URLs configured
- [ ] Structured data if applicable

### 14.5 Performance

- [ ] Images optimized (WebP/AVIF)
- [ ] next/image used for all images
- [ ] Proper priority on above-fold images
- [ ] No blocking resources
- [ ] Bundle size not significantly increased
- [ ] Lazy loading for below-fold content

### 14.6 Code Quality

- [ ] ESLint passing (zero warnings)
- [ ] Prettier formatted
- [ ] TypeScript type check passing
- [ ] Build succeeds
- [ ] No hardcoded values (use constants)
- [ ] No magic numbers (use Tailwind scale)

### 14.7 Styling

- [ ] Tailwind CSS exclusively
- [ ] No inline styles (unless documented)
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] Follows design tokens
- [ ] Consistent spacing

### 14.8 Testing

- [ ] Unit tests added for new utilities
- [ ] Component tests for complex components
- [ ] E2E tests updated if user flow changed
- [ ] Accessibility tests passing
- [ ] Coverage thresholds met
- [ ] All tests passing

### 14.9 Git Hygiene

- [ ] Conventional commit format
- [ ] Descriptive commit message
- [ ] Branch follows naming convention
- [ ] No merge conflicts
- [ ] PR description filled out

### 14.10 Documentation

- [ ] CLAUDE.md updated if patterns changed
- [ ] JSDoc added for public APIs
- [ ] Inline comments explain WHY not WHAT
- [ ] README updated if setup changed

---

## 15. Deployment

### 15.1 CI Requirements

**ALL CHECKS MUST PASS**

- ESLint (zero warnings)
- TypeScript type check
- Tests (unit, component, e2e)
- Build success
- Accessibility audit

**NO MERGE IF CI FAILS**

- No exceptions
- Fix issues before merge
- No "merge and fix later"

### 15.2 Preview Deployments

**EVERY PR GETS PREVIEW**

- Vercel automatically deploys previews
- Review preview before approving PR
- Test mobile on actual device
- Verify dark mode

**PREVIEW CHECKLIST**

- Page loads correctly
- Links work
- Images load
- Mobile responsive
- Dark mode works
- Performance acceptable

### 15.3 Production Deployment

**PRODUCTION ONLY FROM MAIN**

- Merge to main triggers production deploy
- No direct pushes to main
- All changes via PR

**POST-DEPLOYMENT VERIFICATION**

- Visit production URL
- Check Core Web Vitals
- Verify Analytics tracking
- Test critical user paths

**ROLLBACK PROCEDURE**

- Revert merge commit if critical issue
- Deploy fix ASAP
- Post-mortem for production issues

### 15.4 Monitoring

**CONTINUOUS MONITORING**

- Vercel Analytics for Core Web Vitals
- Error tracking (Sentry if configured)
- Uptime monitoring

**ALERT THRESHOLDS**

- LCP regression > 20%
- FID regression > 20%
- CLS regression > 0.05
- Error rate > 1%

---

## 16. Development Environment

### 16.1 Required Tools

**MUST BE INSTALLED**

- Node.js 18+ (LTS version)
- npm 9+ (or pnpm 8+)
- Git 2.30+
- VS Code (or equivalent with TypeScript support)

**RECOMMENDED VS CODE EXTENSIONS**

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- GitLens

### 16.2 Editor Configuration

**VS CODE SETTINGS**

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "tailwindCSS.experimental.classRegex": [["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]]
}
```

### 16.3 Environment Variables

**LOCAL DEVELOPMENT**

```bash
# .env.local (never commit this file)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**PRODUCTION**

```bash
# Set in Vercel dashboard
NEXT_PUBLIC_SITE_URL=https://links.dineshd.dev
```

**NEVER COMMIT SECRETS**

- .env files in .gitignore
- Use Vercel environment variables for production
- No API keys in code

---

## 17. Package Management

### 17.1 Adding Dependencies

**APPROVAL REQUIRED FOR NEW DEPS**

- Justify why dependency is needed
- Evaluate bundle size impact
- Check maintenance status
- Prefer well-maintained packages

**RUN BUNDLE ANALYSIS**

```bash
npm install new-package
npm run build
npm run analyze  # Check size impact
```

### 17.2 Updating Dependencies

**REGULAR UPDATES**

- Update dependencies monthly
- Test thoroughly after updates
- Read changelogs for breaking changes
- Update one dependency at a time for major versions

**SECURITY UPDATES**

```bash
npm audit
npm audit fix
```

### 17.3 Dependency Hygiene

**KEEP CLEAN**

- Remove unused dependencies
- No duplicate packages (check with npm ls)
- Use exact versions for critical packages
- Document version constraints if needed

---

## 18. Architecture Layers

### 18.1 Directory Structure

```
links/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── sitemap.ts         # Sitemap generation
│   ├── robots.ts          # Robots.txt
│   └── error.tsx          # Error boundary
├── components/            # React components
│   ├── LinkCard/
│   │   ├── LinkCard.tsx
│   │   ├── LinkCard.test.tsx
│   │   └── index.ts
│   ├── Header/
│   └── Footer/
├── lib/                   # Utilities and helpers
│   ├── utils.ts
│   ├── constants.ts
│   └── types.ts
├── public/                # Static assets
│   ├── avatar.jpg
│   ├── og-image.png
│   └── icons/
├── e2e/                   # E2E tests
│   ├── home.spec.ts
│   └── accessibility.spec.ts
└── config files           # TypeScript, ESLint, Tailwind, etc.
```

### 18.2 Import Paths

**USE ABSOLUTE IMPORTS**

```typescript
// CORRECT
import { LinkCard } from '@/components/LinkCard';
import { formatDate } from '@/lib/utils';

// WRONG
import { LinkCard } from '../../components/LinkCard';
```

**TSCONFIG PATHS**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### 18.3 Separation of Concerns

**COMPONENTS**

- UI only
- No business logic
- Accept data via props
- Emit events via callbacks

**UTILITIES**

- Pure functions
- No side effects
- Thoroughly tested
- Reusable across components

**CONSTANTS**

- Centralized in lib/constants.ts
- Typed exports
- No magic values in components

---

## 19. Emergency Procedures

### 19.1 Production Hotfix

**ONLY FOR CRITICAL ISSUES**

- Security vulnerabilities
- Complete site breakage
- Data loss potential

**PROCEDURE**

```bash
# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue

# 2. Make minimal fix
# Edit only necessary files

# 3. Test thoroughly
npm run build
npm run test

# 4. Commit and push
git add .
git commit -m "hotfix: brief description of fix"
git push origin hotfix/critical-issue

# 5. Create PR with "HOTFIX" label
# 6. Fast-track review
# 7. Merge immediately
# 8. Verify production deployment
# 9. Post-mortem within 24 hours
```

### 19.2 Rollback

**IF PRODUCTION IS BROKEN**

```bash
# 1. Identify breaking commit via Vercel dashboard
# 2. Revert commit
git revert <commit-hash>
git push origin main

# 3. Verify rollback successful
# 4. Fix issue properly in separate PR
```

### 19.3 Incident Response

**COMMUNICATION**

- Acknowledge issue immediately
- Provide status updates every 30 minutes
- Document timeline of events
- Post-mortem within 24 hours

**POST-MORTEM**

- What happened
- Why it happened
- How it was fixed
- Preventative measures

---

## 20. Pull Request Template

Every PR must follow this template:

```markdown
## Summary

Brief description of changes (2-3 sentences).

## Type of Change

- [ ] Feature (new functionality)
- [ ] Fix (bug fix)
- [ ] Refactor (code improvement, no behavior change)
- [ ] Style (formatting, no code change)
- [ ] Docs (documentation only)
- [ ] Perf (performance improvement)
- [ ] Test (adding tests)
- [ ] Chore (build, dependencies, tooling)

## Changes Made

- Bullet list of specific changes
- One bullet per logical change
- Be specific

## Testing

- [ ] Unit tests added/updated
- [ ] Component tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed
- [ ] Accessibility tested (keyboard, screen reader)
- [ ] Tested on mobile
- [ ] Tested dark mode

## Performance Impact

- [ ] No performance regression
- [ ] Bundle size checked (if applicable)
- [ ] Images optimized

## Accessibility

- [ ] Semantic HTML used
- [ ] Keyboard navigable
- [ ] Focus indicators visible
- [ ] ARIA labels added where needed
- [ ] Color contrast verified

## SEO

- [ ] Metadata updated (if new page)
- [ ] Heading hierarchy correct
- [ ] Alt text on images

## Screenshots

Add screenshots/videos if UI changes.

## Checklist

- [ ] ESLint passing (zero warnings)
- [ ] TypeScript type check passing
- [ ] Build succeeds
- [ ] All tests passing
- [ ] Code reviewed by self first
- [ ] CLAUDE.md compliance verified
- [ ] Preview deployment tested

## Notes

Any additional context, TODOs, or follow-up items.
```

---

## 21. Enforcement

### 21.1 CI Pipeline

**AUTOMATED ENFORCEMENT**

- ESLint failures block merge
- TypeScript errors block merge
- Test failures block merge
- Build failures block merge
- Accessibility audit failures block merge

**NO OVERRIDE BUTTON**

- If CI fails, fix the issue
- No "merge anyway" culture
- CI is the gatekeeper

### 21.2 Code Review Standards

**EVERY PR REQUIRES REVIEW**

- No self-merge (except hotfixes with post-merge review)
- Reviewer checks CLAUDE.md compliance
- Reviewer tests preview deployment
- Reviewer verifies checklist items

**REVIEWER RESPONSIBILITIES**

- Verify code quality
- Check test coverage
- Validate accessibility
- Confirm performance not regressed
- Ensure CLAUDE.md compliance

### 21.3 Violations

**FIRST VIOLATION**

- PR feedback with link to CLAUDE.md section
- Require changes before approval

**REPEATED VIOLATIONS**

- Additional review round
- Pair programming session to align on standards

**PERSISTENT VIOLATIONS**

- Engineering leadership escalation

---

## 22. Updating This Document

CLAUDE.md is a living document but changes require justification.

### 22.1 When to Update

**UPDATE FOR:**

- New patterns adopted
- New tools introduced
- Lessons learned from incidents
- Framework updates requiring new practices
- Team agreement on standard changes

### 22.2 How to Update

**PROCESS**

1. Propose change in PR
2. Include justification
3. Link to discussion/decision
4. Update version number
5. Update "Last Updated" date
6. Get team consensus before merge

**TONE CONSISTENCY**

- Maintain sharp, direct voice
- No corporate fluff
- Engineering contract tone
- Clear, enforceable rules

---

## 23. References

**Next.js Documentation**

- https://nextjs.org/docs

**TypeScript Documentation**

- https://www.typescriptlang.org/docs

**Tailwind CSS Documentation**

- https://tailwindcss.com/docs

**WCAG 2.1 Guidelines**

- https://www.w3.org/WAI/WCAG21/quickref/

**Core Web Vitals**

- https://web.dev/vitals/

**Conventional Commits**

- https://www.conventionalcommits.org/

---

## Appendix A: Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run type-check       # TypeScript type check

# Testing
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
npm run test:e2e         # E2E tests
npm run test:a11y        # Accessibility tests

# Analysis
npm run analyze          # Bundle analysis
npm run lighthouse       # Lighthouse audit

# Git workflow
git checkout main
git pull origin main
git checkout -b feature/name
# ... make changes ...
git add .
git commit -m "feat: description"
git push origin feature/name
```

---

## Appendix B: Common Patterns

### B.1 Link Card Pattern

```typescript
export interface LinkCardProps {
  title: string;
  url: string;
  icon?: ReactNode;
  description?: string;
}

export function LinkCard({ title, url, icon, description }: LinkCardProps): JSX.Element {
  return (
    <a
      href={url}
      className="group flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${title}`}
    >
      {icon && <div className="flex-shrink-0 text-2xl">{icon}</div>}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {description}
          </p>
        )}
      </div>
      <svg
        className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}
```

### B.2 Metadata Pattern

```typescript
import type { Metadata } from 'next';

export function generateMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: 'https://links.dineshd.dev',
      siteName: 'Dinesh D Links',
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}
```

### B.3 Error Handling Pattern

```typescript
export function handleApiError(error: unknown): never {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
  }
  throw new Error('Unable to complete request. Please try again later.');
}

// Usage
try {
  const data = await fetchData();
} catch (error) {
  handleApiError(error);
}
```

---

**END OF DOCUMENT**

This is the engineering contract for links.dineshd.dev. Every contributor is bound by these standards. When in doubt, err on the side of strictness.
