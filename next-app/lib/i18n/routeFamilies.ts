// These routes render their main headings and body from English-only source
// modules. Keep this list next to the eligibility generator so adding a real
// translation requires a deliberate review of the page's rendered main body.
export const STATIC_PATHS = [
  '/', '/pillars', '/tools', '/guides', '/about', '/blog', '/contact', '/faq',
  '/how-it-works', '/privacy', '/terms', '/security', '/roadmap', '/use-cases',
  '/xfree-app', '/updates', '/updates/ai', '/updates/web-development',
  '/updates/open-source', '/updates/security', '/updates/browser',
] as const;

export const ENGLISH_ONLY_STATIC_PATHS = STATIC_PATHS.filter((path) => path !== '/');
