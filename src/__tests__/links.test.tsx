import { render, screen } from '@testing-library/react';

import { PrimaryCTA } from '@/components/PrimaryCTA';
import { ProjectCard } from '@/components/ProjectCard';
import { SocialGrid } from '@/components/SocialGrid';

describe('SocialGrid', () => {
  it('renders all social media links', () => {
    render(<SocialGrid />);

    const nav = screen.getByRole('navigation', { name: /social media links/i });
    expect(nav).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(5);
  });

  it('renders GitHub link with correct href', () => {
    render(<SocialGrid />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/dinesh-git17');
  });

  it('renders LinkedIn link with correct href', () => {
    render(<SocialGrid />);

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/dineshsdawonauth/');
  });

  it('renders X (Twitter) link with correct href', () => {
    render(<SocialGrid />);

    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    expect(twitterLink).toHaveAttribute('href', 'https://x.com/dinbuilds');
  });

  it('renders TikTok link with correct href', () => {
    render(<SocialGrid />);

    const tiktokLink = screen.getByRole('link', { name: /tiktok/i });
    expect(tiktokLink).toHaveAttribute('href', 'https://www.tiktok.com/@dinbuilds');
  });

  it('renders YouTube link with correct href', () => {
    render(<SocialGrid />);

    const youtubeLink = screen.getByRole('link', { name: /youtube/i });
    expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/@DinBuilds');
  });

  it('opens links in new tab with security attributes', () => {
    render(<SocialGrid />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('has accessible names for all links', () => {
    render(<SocialGrid />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-label');
    });
  });
});

describe('ProjectCard', () => {
  const defaultProps = {
    title: 'Test Project',
    description: 'A test project description',
    href: 'https://example.com/project',
    icon: <span data-testid="project-icon">Icon</span>,
    badges: ['TypeScript', 'React'],
    glowColor: 'blue' as const,
  };

  it('renders project title', () => {
    render(<ProjectCard {...defaultProps} />);

    expect(screen.getByRole('heading', { name: 'Test Project' })).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(<ProjectCard {...defaultProps} />);

    expect(screen.getByText('A test project description')).toBeInTheDocument();
  });

  it('renders link with correct href', () => {
    render(<ProjectCard {...defaultProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com/project');
  });

  it('opens in new tab with security attributes', () => {
    render(<ProjectCard {...defaultProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders all badges', () => {
    render(<ProjectCard {...defaultProps} />);

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<ProjectCard {...defaultProps} />);

    expect(screen.getByTestId('project-icon')).toBeInTheDocument();
  });

  it('applies blue glow style', () => {
    const { container } = render(<ProjectCard {...defaultProps} glowColor="blue" />);

    const link = container.querySelector('a');
    expect(link?.className).toContain('before:from-blue-500/20');
  });

  it('applies green glow style', () => {
    const { container } = render(<ProjectCard {...defaultProps} glowColor="green" />);

    const link = container.querySelector('a');
    expect(link?.className).toContain('before:from-emerald-500/20');
  });
});

describe('PrimaryCTA', () => {
  it('renders link with correct href', () => {
    render(<PrimaryCTA href="https://example.com" label="Click Me" />);

    const link = screen.getByRole('link', { name: 'Click Me' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders label text', () => {
    render(<PrimaryCTA href="https://example.com" label="Get Started" />);

    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('has aria-label for accessibility', () => {
    render(<PrimaryCTA href="https://example.com" label="Contact Me" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Contact Me');
  });

  it('has focus styles for keyboard navigation', () => {
    const { container } = render(<PrimaryCTA href="https://example.com" label="Test" />);

    const link = container.querySelector('a');
    expect(link?.className).toContain('focus:outline-none');
    expect(link?.className).toContain('focus:ring-2');
  });
});
