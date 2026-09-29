'use client';

import NextLink from 'next/link';
import { useLocale } from 'next-intl';
import type { ComponentProps } from 'react';
import { Link as LocalizedLink } from '@/i18n/navigation';
import { hasEligibleTranslation } from '@/lib/i18n/translationEligibility';

type Props = ComponentProps<typeof LocalizedLink>;

/** Link to a translated page when it exists, otherwise to its English URL. */
export function Link(props: Props) {
  const locale = useLocale();
  const path = typeof props.href === 'string' ? props.href.split(/[?#]/, 1)[0] : '';
  if (path.startsWith('/') && !path.startsWith('//') && !hasEligibleTranslation(path, locale)) {
    const { locale: _explicitLocale, ...rest } = props;
    return <NextLink {...rest} href={props.href} />;
  }
  return <LocalizedLink {...props} />;
}
