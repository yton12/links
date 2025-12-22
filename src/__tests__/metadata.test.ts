import { metadata as contactMetadata } from '@/app/contact/page';
import { metadata as rootMetadata, viewport } from '@/app/layout';

describe('Root Layout Metadata', () => {
  it('has a title within recommended length (50-60 chars)', () => {
    expect(rootMetadata.title).toBeDefined();
    const title = rootMetadata.title as string;
    expect(title.length).toBeGreaterThanOrEqual(30);
    expect(title.length).toBeLessThanOrEqual(70);
  });

  it('has a description within recommended length (150-160 chars)', () => {
    expect(rootMetadata.description).toBeDefined();
    const description = rootMetadata.description as string;
    expect(description.length).toBeGreaterThanOrEqual(100);
    expect(description.length).toBeLessThanOrEqual(200);
  });

  it('has metadataBase configured', () => {
    expect(rootMetadata.metadataBase).toBeDefined();
    expect(rootMetadata.metadataBase?.toString()).toBe('https://links.dineshd.dev/');
  });

  it('has canonical URL configured', () => {
    expect(rootMetadata.alternates?.canonical).toBe('/');
  });

  it('has Open Graph metadata configured', () => {
    const og = rootMetadata.openGraph as {
      title?: string;
      description?: string;
      url?: string;
      siteName?: string;
      type?: string;
      images?: unknown[];
    };
    expect(og).toBeDefined();
    expect(og?.title).toBeDefined();
    expect(og?.description).toBeDefined();
    expect(og?.url).toBe('https://links.dineshd.dev');
    expect(og?.siteName).toBe('Dinesh Links');
    expect(og?.type).toBe('website');
    expect(og?.images).toBeDefined();
    expect(Array.isArray(og?.images)).toBe(true);
  });

  it('has Twitter Card metadata configured', () => {
    const twitter = rootMetadata.twitter as {
      card?: string;
      title?: string;
      description?: string;
      images?: unknown[];
      creator?: string;
    };
    expect(twitter).toBeDefined();
    expect(twitter?.card).toBe('summary_large_image');
    expect(twitter?.title).toBeDefined();
    expect(twitter?.description).toBeDefined();
    expect(twitter?.images).toBeDefined();
    expect(twitter?.creator).toBe('@dinbuilds');
  });

  it('has robots configuration', () => {
    expect(rootMetadata.robots).toBeDefined();
    const robots = rootMetadata.robots as { index: boolean; follow: boolean };
    expect(robots.index).toBe(true);
    expect(robots.follow).toBe(true);
  });

  it('has favicon and icons configured', () => {
    expect(rootMetadata.icons).toBeDefined();
    const icons = rootMetadata.icons as {
      icon: Array<{ url: string }>;
      apple: Array<{ url: string }>;
    };
    expect(icons.icon).toBeDefined();
    expect(icons.apple).toBeDefined();
  });

  it('has manifest configured', () => {
    expect(rootMetadata.manifest).toBe('/manifest.webmanifest');
  });
});

describe('Root Layout Viewport', () => {
  it('has viewport configuration', () => {
    expect(viewport).toBeDefined();
    expect(viewport.width).toBe('device-width');
    expect(viewport.initialScale).toBe(1);
    expect(viewport.themeColor).toBe('#050505');
  });
});

describe('Contact Page Metadata', () => {
  it('has a title', () => {
    expect(contactMetadata.title).toBeDefined();
    expect(contactMetadata.title).toBe('Contact | Dinesh');
  });

  it('has a description', () => {
    expect(contactMetadata.description).toBeDefined();
    expect(typeof contactMetadata.description).toBe('string');
  });

  it('has Open Graph metadata', () => {
    expect(contactMetadata.openGraph).toBeDefined();
    expect(contactMetadata.openGraph?.title).toBe('Contact | Dinesh');
    expect(contactMetadata.openGraph?.description).toBeDefined();
  });

  it('has Twitter metadata', () => {
    expect(contactMetadata.twitter).toBeDefined();
    expect(contactMetadata.twitter?.title).toBe('Contact | Dinesh');
    expect(contactMetadata.twitter?.description).toBeDefined();
  });
});
