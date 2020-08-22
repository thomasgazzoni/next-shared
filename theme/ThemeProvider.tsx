import React, { createContext, FC, ReactNode, useContext } from 'react';
import { ColorMode } from './types';
import { useColorModeState } from './utils';

// *** Context

interface ThemeContext {
  colorMode: ColorMode;
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContext>({
  colorMode: 'light',
  toggleColorMode: () => {},
});

// *** Provider

interface ThemeProvider {
  value?: ColorMode;
  children?: ReactNode;
  useSystemColorMode?: boolean;
  defaultValue?: ColorMode;
  cookies?: any;
}

/**
 * Provides context for the color mode based on config in `theme`
 * Returns the color mode and function to toggle the color mode
 */
export const ThemeProvider: FC<ThemeProvider> = props => {
  const {
    value,
    children,
    useSystemColorMode = true,
    defaultValue = 'light',
  } = props;

  const [colorMode, setColorMode] = useColorModeState(
    defaultValue,
    useSystemColorMode,
  );
  const toggleColorMode = () =>
    setColorMode(colorMode === 'light' ? 'dark' : 'light');

  const context = { colorMode, toggleColorMode };

  const controlledContext = {
    colorMode: value as ColorMode,
    toggleColorMode: () => {},
  };

  return (
    <ThemeContext.Provider value={value ? controlledContext : context}>
      {children}
    </ThemeContext.Provider>
  );
};

// *** Hooks

/**
 * React hook that reads from `ColorModeProvider` context
 * Returns the color mode and function to toggle it
 */
export function useColorMode() {
  return useContext(ThemeContext);
}
