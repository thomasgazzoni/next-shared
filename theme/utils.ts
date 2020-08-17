import { useEffect, useState } from 'react';
import { ColorMode } from './types';
import { localStorageManager } from './StorageManager';
import canUseDOM from '../utils/canUseDom';

const classNames = {
  light: 'theme-light',
  dark: 'theme-dark',
};

/**
 * SSR: Graceful fallback for the `body` element
 */
const mockBody = {
  classList: { add: () => {}, remove: () => {} },
};

export const body = typeof document !== 'undefined' ? document.body : mockBody;

/**
 * Syncs the classname of the `<body />` based on the
 * color mode.
 *
 * @example
 *
 * If mode is 'dark', body will be `<body class="chakra-ui-light"/>`
 */
export function useSyncBodyClass(mode: string) {
  useEffect(() => {
    requestAnimationFrame(() => {
      syncBodyClassName(mode === 'dark');
    });
  }, [mode]);
}

/**
 * React hook that sets up the localStorage, body className,
 * and reads from system preference
 */
export function useColorModeState(
  initialColorMode: ColorMode,
  useSystemColorMode = true,
  storageManager = localStorageManager,
) {
  const [mode, setMode] = useState<ColorMode>(() => {
    const stored = storageManager.get();

    if (stored) {
      return stored;
    }

    if (useSystemColorMode && canUseDOM) {
      return getColorScheme();
    }

    return initialColorMode || 'light';
  });

  useSyncBodyClass(mode);
  // useSyncSystemColorMod(setMode, !!options?.useSystemColorMode);

  useEffect(() => {
    if (mode) {
      storageManager.set(mode);
    }
  }, [storageManager, mode]);

  return [mode, setMode] as const;
}

/**
 * Function to add/remove class from `body` based on color mode
 */
export function syncBodyClassName(isDark: boolean) {
  body.classList.add(isDark ? classNames.dark : classNames.light);
  body.classList.remove(isDark ? classNames.light : classNames.dark);
}

/**
 * Check if JS media query matches the query string passed
 */
function getMediaQuery(query: string) {
  const mediaQueryList = window.matchMedia?.(query);
  const matches = !!mediaQueryList.media === mediaQueryList.matches;
  return matches;
}

export const queries = {
  light: '(prefers-color-scheme: light)',
  dark: '(prefers-color-scheme: dark)',
};
export const lightQuery = '(prefers-color-scheme: light)';
export const darkQuery = '(prefers-color-scheme: dark)';

export function getColorScheme() {
  const isDark = getMediaQuery(queries.dark);
  return isDark ? 'dark' : 'light';
}

/**
 * Adds system os color mode listener, and run the callback
 * once preference changes
 */
export function addListener(fn: Function) {
  if (!window.hasOwnProperty('matchMedia')) {
    return undefined;
  }

  const mediaQueryList = window.matchMedia(queries.dark);

  const listener = () => {
    fn(!!mediaQueryList.matches ? 'dark' : 'light');
  };

  listener();
  mediaQueryList.addListener(listener);

  return () => {
    mediaQueryList.removeListener(listener);
  };
}
