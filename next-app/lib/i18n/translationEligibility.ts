import { routing, type Locale } from '@/i18n/routing';
import manifest from '@/lib/i18n/translationManifest.json';

/** Generated from tool copy and messages JSON by scripts/generate-translation-manifest.ts. */
export function eligibleLocalesForPath(path: string): readonly Locale[] {
  const eligible = (manifest as Record<string, Locale[]>)[path];
  return eligible ?? routing.locales;
}

export function hasEligibleTranslation(path: string, locale: string): boolean {
  return eligibleLocalesForPath(path).includes(locale as Locale);
}
