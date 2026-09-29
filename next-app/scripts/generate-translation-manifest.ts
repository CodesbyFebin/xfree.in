import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { TOOLS, CATEGORIES } from '../lib/data/toolsWithSEO';
import { GUIDES } from '../lib/data/guides';
import { PILLARS } from '../lib/data/pillars';
import { ENGLISH_ONLY_STATIC_PATHS } from '../lib/i18n/routeFamilies';
import { routing } from '../i18n/routing';
import type { ToolDefinition } from '../types';

// The tool's main copy must be translated, including every visible FAQ.
// A localized navigation bar or a translated title alone does not qualify.
type Translation = Partial<Pick<ToolDefinition,
  'title' | 'shortDescription' | 'longDescription' | 'explanation' | 'howToUse' | 'faqs'>>;
function differs(value: unknown, original: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0 && value.trim() !== original;
}
function complete(tool: ToolDefinition, translation?: Translation): boolean {
  if (!translation) return false;
  if (!(['title', 'shortDescription', 'longDescription', 'explanation'] as const)
    .every((key) => differs(translation[key], tool[key]))) return false;
  if (!Array.isArray(translation.howToUse) || translation.howToUse.length !== tool.howToUse.length ||
    !translation.howToUse.every((step, i) => differs(step, tool.howToUse[i]))) return false;
  if (tool.faqs.length && (!Array.isArray(translation.faqs) || translation.faqs.length !== tool.faqs.length ||
    !translation.faqs.every((faq, i) =>
      differs(faq.question, tool.faqs[i].question) && differs(faq.answer, tool.faqs[i].answer)))) return false;
  return true;
}

const manifest: Record<string, string[]> = {};
// These page families render their main copy from English-only source
// modules today. When localized main bodies are introduced, replace this
// English-only eligibility with field-level checks for those sources.
for (const path of ENGLISH_ONLY_STATIC_PATHS) {
  manifest[path] = [routing.defaultLocale];
}
for (const guide of GUIDES) manifest[`/guides/${guide.slug}`] = [routing.defaultLocale];
for (const category of CATEGORIES) manifest[`/categories/${category.slug}`] = [routing.defaultLocale];
for (const pillar of PILLARS) {
  manifest[`/pillars/${pillar.slug}`] = [routing.defaultLocale];
  // This alternate route renders the same pillar body and is not in the sitemap.
  manifest[`/pillars/${pillar.category}/${pillar.slug}`] = [routing.defaultLocale];
}
for (const tool of TOOLS.filter((item) => item.indexable)) {
  manifest[`/tools/${tool.slug}`] = [routing.defaultLocale];
}
for (const locale of routing.locales) {
  if (locale === routing.defaultLocale) continue;
  const messages = require(`../messages/${locale}.json`) as { Tools?: Record<string, Translation> };
  for (const tool of TOOLS.filter((item) => item.indexable)) {
    if (complete(tool, messages.Tools?.[tool.slug])) manifest[`/tools/${tool.slug}`].push(locale);
  }
}
const output = join(process.cwd(), 'lib/i18n/translationManifest.json');
writeFileSync(output, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${output}: ${Object.values(manifest).reduce((sum, locales) => sum + locales.length, 0)} eligible URLs across audited families`);
