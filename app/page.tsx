'use client';

import { SectionWrapper } from '@/app/components/layout/SectionWrapper';
import { Section } from '@/app/components/layout/Section';
import { useThemeStore } from '@/app/store';
import { useLanguageStore } from '@/app/store';
import { TestModeToggle } from './tests/TestModeToggle';
import { UIElement } from './components';

export default function Home() {
  // Only get what you actually need - no boilerplate!
  const { currentTheme } = useThemeStore();
  const { t } = useLanguageStore();

  // No useEffect needed! No CSS custom property setup! ThemeProvider handles it all!

  return (
    <SectionWrapper
      enableScrollSnap={true}
      snapType="mandatory"
      direction="vertical"
      showNavigation={false}
      debug={false}
      className="h-screen"
      // These styles still work for component-specific overrides
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

      {/* Content Section - Uses CSS custom properties automatically! */}
      <Section
        id="content"
        className="bg-white"
        minHeight="100vh"
        padding="px-6 py-20"
        textAlignment="center"
      // No inline styles needed! CSS custom properties work automatically
      >
        <div className="max-w-4xl mx-auto">
          {/* These will automatically use theme colors via CSS custom properties */}
          <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
            {t('content.title', 'Your Content Here')}
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--secondary-color)' }}>
            {t('content.subtitle', 'This is your clean starting point. Theme and language stores are ready to go!')}
          </p>

          {/* Grid uses automatic theming */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border" style={{ borderColor: 'var(--accent-color)' }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary-color)' }}>
                Feature One
              </h3>
              <p className="text-sm" style={{ color: 'var(--secondary-color)' }}>
                Your feature description here
              </p>
            </div>

            <div className="p-6 rounded-lg border" style={{ borderColor: 'var(--accent-color)' }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary-color)' }}>
                Feature Two
              </h3>
              <p className="text-sm" style={{ color: 'var(--secondary-color)' }}>
                Your feature description here
              </p>
            </div>

            <div className="p-6 rounded-lg border" style={{ borderColor: 'var(--accent-color)' }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary-color)' }}>
                Feature Three
              </h3>
              <p className="text-sm" style={{ color: 'var(--secondary-color)' }}>
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