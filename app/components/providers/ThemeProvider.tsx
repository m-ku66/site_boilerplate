'use client';

import { useThemeStore } from '@/app/store';
import { useLanguageStore } from '@/app/store';

interface ThemeProviderProps {
    children: React.ReactNode;
}

/**
 * ThemeProvider - Simple wrapper that applies theme via CSS inheritance
 * 
 * Features:
 * - Applies theme colors and fonts via direct styles and className
 * - Uses natural CSS inheritance - no DOM manipulation
 * - Zero hydration complexity
 * - Zero setup required in individual pages
 * - Works perfectly with SSR out of the box
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Get theme data
    const { currentTheme } = useThemeStore();

    // Initialize language store (but we don't need complex hydration logic)
    useLanguageStore();

    // That's it! Just a simple wrapper div with theme applied
    return (
        <div
            id='theme-wrapper'
            className={currentTheme.typeFaceClass}
            style={{
                backgroundColor: currentTheme.backgroundColor,
                color: currentTheme.foregroundColor,
                minHeight: '100vh', // Ensure full coverage
            }}
        >
            {children}
        </div>
    );
};