'use client';

import { useThemeStore } from '@/app/store';
import { useLanguageStore } from '@/app/store';
import { useHydration } from '@/app/hooks/useHydration';
import { useEffect } from 'react';

interface ThemeProviderProps {
    children: React.ReactNode;
}

/**
 * ThemeProvider - Handles all theme setup for the entire application
 * 
 * Features:
 * - Automatically applies theme colors and fonts via CSS custom properties
 * - Handles hydration for all stores (theme, language, UI)
 * - Zero setup required in individual pages
 * - Overrideable with inline styles or Tailwind classes
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Get theme and language data
    const { currentTheme } = useThemeStore();
    const { } = useLanguageStore(); // Initialize language store

    // Initialize hydration for all stores
    const isHydrated = useHydration();

    // Apply theme to document via CSS custom properties
    useEffect(() => {
        // Only apply after hydration to prevent SSR mismatches
        if (isHydrated) {
            document.documentElement.style.setProperty('--primary-color', currentTheme.primaryColor);
            document.documentElement.style.setProperty('--secondary-color', currentTheme.secondaryColor);
            document.documentElement.style.setProperty('--accent-color', currentTheme.accentColor);
            document.documentElement.style.setProperty('--background-color', currentTheme.backgroundColor);
            document.documentElement.style.setProperty('--foreground-color', currentTheme.foregroundColor);
            document.documentElement.style.setProperty('--font-family', `"${currentTheme.typeFace}", sans-serif`);
        }
    }, [currentTheme, isHydrated]);

    // Apply theme to body for global styles
    useEffect(() => {
        if (isHydrated && typeof window !== 'undefined') {
            document.body.style.backgroundColor = currentTheme.backgroundColor;
            document.body.style.color = currentTheme.foregroundColor;
            document.body.style.fontFamily = `"${currentTheme.typeFace}", sans-serif`;
        }
    }, [currentTheme, isHydrated]);

    return <>{children}</>;
};