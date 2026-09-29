import type { MetadataRoute } from 'next';
import sitemapEntries from '@/lib/seo/sitemapEntries';
import { routing } from '@/i18n/routing';

const ORIGIN = 'https://www.xfree.in';
export const SHARDS = ['core', 'tools-en', 'tools-locales', 'pillars', 'categories', 'guides', 'static-locales'] as const;
export type Shard = typeof SHARDS[number];

function family(entry: MetadataRoute.Sitemap[number]): Shard {
  const path = new URL(entry.url).pathname;
  const segment = path.split('/').filter(Boolean)[0];
  const localized = segment !== undefined && routing.locales.some((locale) => locale !== routing.defaultLocale && locale === segment);
  const route = localized ? path.slice(segment.length + 1) || '/' : path;
  if (route.startsWith('/tools/')) return localized ? 'tools-locales' : 'tools-en';
  if (route.startsWith('/pillars/')) return 'pillars';
  if (route.startsWith('/categories/')) return 'categories';
  if (route.startsWith('/guides/')) return 'guides';
  return localized ? 'static-locales' : 'core';
}

export function entriesForShard(shard: Shard): MetadataRoute.Sitemap {
  return sitemapEntries().filter((entry) => family(entry) === shard);
}

function xml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function response(body: string): Response {
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${body}`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}

export function sitemapIndex(): Response {
  const items = SHARDS.map((shard) => `<sitemap><loc>${ORIGIN}/sitemap-${shard}.xml</loc></sitemap>`).join('');
  return response(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</sitemapindex>`);
}

export function sitemapShard(shard: Shard): Response {
  const items = entriesForShard(shard).map((entry) => {
    const alternates = Object.entries(entry.alternates?.languages ?? {})
      .filter((pair): pair is [string, string] => typeof pair[1] === 'string')
      .map(([locale, href]) => `<xhtml:link rel="alternate" hreflang="${xml(locale)}" href="${xml(href)}"/>`).join('');
    const lastmod = entry.lastModified
      ? `<lastmod>${xml(entry.lastModified instanceof Date ? entry.lastModified.toISOString() : String(entry.lastModified))}</lastmod>` : '';
    return `<url><loc>${xml(entry.url)}</loc>${lastmod}${alternates}</url>`;
  }).join('');
  return response(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${items}</urlset>`);
}
