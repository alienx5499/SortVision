'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Next App Router navigation aligned with the previous `react-router` navigate API
 * (string href or `{ pathname, search }`, optional `replace`).
 */
export type AppNavigate = (
  to: string | { pathname: string; search?: string },
  options?: { replace?: boolean; scroll?: boolean }
) => void;

export function useAppNavigate(): AppNavigate {
  const router = useRouter();

  return useCallback<AppNavigate>(
    (to, options) => {
      const href =
        typeof to === 'string' ? to : `${to.pathname}${to.search ?? ''}`;
      const scroll = options?.scroll ?? false;
      if (options?.replace) {
        router.replace(href, { scroll });
      } else {
        router.push(href, { scroll });
      }
    },
    [router]
  );
}
