'use client';

import { SectionWrapper } from '@/app/components/layout/SectionWrapper';
import { Section } from '@/app/components/layout/Section';
import { useThemeStore } from '@/app/store';
import { useLanguageStore } from '@/app/store';
import { useEffect } from 'react';
import { useHydration } from '@/app/hooks/useHydration';
import { TestModeToggle } from './tests/TestModeToggle';
import { UIElement } from './components';

export default function Home() {
  // Essential store hooks for theme and language support
  const { currentTheme } = useThemeStore();
  const { t } = useLanguageStore();

  // Initialize hydration for all stores
  const isHydrated = useHydration();

  // Apply theme to document via CSS custom properties
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', currentTheme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', currentTheme.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', currentTheme.accentColor);
    document.documentElement.style.setProperty('--background-color', currentTheme.backgroundColor);
    document.documentElement.style.setProperty('--foreground-color', currentTheme.foregroundColor);
    document.documentElement.style.setProperty('--font-family', `"${currentTheme.typeFace}", sans-serif`);
  }, [currentTheme]);

  return (
    <SectionWrapper
      enableScrollSnap={true}
      snapType="mandatory"
      direction="vertical"
      showNavigation={false}
      debug={false}
      className="h-screen"
      style={{
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.foregroundColor,
        fontFamily: currentTheme.typeFace,
      }}
    >
      {/* Hero Section */}
      <Section
        id="hero"
        className="bg-gradient-to-br from-blue-600 to-purple-700 text-white"
        minHeight="100vh"
        padding="px-6 py-20"
        textAlignment="center"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6">
            {t('hero.title', 'Welcome to Your Project')}
          </h1>
          <p className="text-xl opacity-90 mb-8">
            {t('hero.subtitle', 'Ready to build something amazing')}
          </p>

          <div className="space-x-4">
            <button className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
              {t('hero.cta', 'Get Started')}
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition-all">
              {t('hero.secondary', 'Learn More')}
            </button>
          </div>
        </div>
      </Section>

      {/* Content Section - Ready for your content */}
      <Section
        id="content"
        className="bg-white"
        minHeight="100vh"
        padding="px-6 py-20"
        textAlignment="center"
        style={{ backgroundColor: currentTheme.backgroundColor }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6" style={{ color: currentTheme.primaryColor }}>
            {t('content.title', 'Your Content Here')}
          </h2>
          <p className="text-lg mb-8" style={{ color: currentTheme.secondaryColor }}>
            {t('content.subtitle', 'This is your clean starting point. Theme and language stores are ready to go!')}
          </p>

          {/* Add your content here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border" style={{ borderColor: currentTheme.accentColor }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: currentTheme.primaryColor }}>
                Feature One
              </h3>
              <p className="text-sm" style={{ color: currentTheme.secondaryColor }}>
                Your feature description here
              </p>
            </div>

            <div className="p-6 rounded-lg border" style={{ borderColor: currentTheme.accentColor }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: currentTheme.primaryColor }}>
                Feature Two
              </h3>
              <p className="text-sm" style={{ color: currentTheme.secondaryColor }}>
                Your feature description here
              </p>
            </div>

            <div className="p-6 rounded-lg border" style={{ borderColor: currentTheme.accentColor }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: currentTheme.primaryColor }}>
                Feature Three
              </h3>
              <p className="text-sm" style={{ color: currentTheme.secondaryColor }}>
                Your feature description here
              </p>
            </div>
          </div>
        </div>
      </Section>
      <UIElement layer='overlay' zone='top-right' className="p-4 pointer-events-auto hover:scale-110 transition-transform duration-150">
        <TestModeToggle />
      </UIElement>
    </SectionWrapper>
  );
}