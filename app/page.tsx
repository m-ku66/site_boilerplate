'use client';

import { SectionWrapper } from '@/app/components/layout/SectionWrapper';
import { Section } from '@/app/components/layout/Section';
import { UIElement } from '@/app/components/ui/UIElement';
import { useUIStore } from '@/app/store';
import { useThemeStore } from '@/app/store';
import { useLanguageStore } from '@/app/store';
import { useEffect } from 'react';

export default function Home() {
  // Store hooks
  const { ui, openModal, closeModal, showToast, toggleMenu, resetUI } = useUIStore();
  const { currentTheme, availableThemes, setTheme, updateTheme, loadGoogleFont } = useThemeStore();
  const { currentLanguage, setLanguage, t } = useLanguageStore();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', currentTheme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', currentTheme.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', currentTheme.accentColor);
    document.documentElement.style.setProperty('--background-color', currentTheme.backgroundColor);
    document.documentElement.style.setProperty('--foreground-color', currentTheme.foregroundColor);
  }, [currentTheme]);

  // Track which section user is viewing
  const handleSectionChange = (index: number) => {
    const sectionNames = ['hero', 'features', 'contact'];
    console.log(`Now viewing: ${sectionNames[index]} section`);
    showToast(`Now viewing: ${sectionNames[index]} section`, 'info');
  };

  return (
    <SectionWrapper
      enableScrollSnap={true}
      snapType="mandatory"
      direction="vertical"
      showNavigation={true}
      navigationPosition="center"
      onSectionChange={handleSectionChange}
      debug={false}
      className="h-screen"
      style={{
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.foregroundColor
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
        <h1 className="text-6xl font-bold mb-6">{t('hero.title', 'Store Integration Demo')}</h1>
        <p className="text-xl opacity-90">{t('hero.subtitle', 'Check out all the interactive store features!')}</p>

        <div className="mt-8 space-x-4 relative z-10">
          <button
            onClick={() => openModal('Welcome to the store demo! This modal is powered by Zustand!')}
            className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all relative z-[1]"
          >
            Open Modal Demo
          </button>
          <button
            onClick={() => showToast('Toast notification working perfectly!', 'success')}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all relative z-[1]"
          >
            Show Toast
          </button>
        </div>
      </Section>

      {/* Features Section */}
      <Section
        id="features"
        className="bg-gray-50"
        minHeight="100vh"
        padding="px-6 py-20"
        textAlignment="center"
        style={{ backgroundColor: currentTheme.backgroundColor }}
      >
        <h2 className="text-4xl font-bold mb-6" style={{ color: currentTheme.primaryColor }}>
          {t('features', 'Store Features')}
        </h2>
        <p className="text-lg mb-8" style={{ color: currentTheme.secondaryColor }}>
          Real-time state management with persistence!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative z-10">
          <div className="p-6 rounded-lg border" style={{ borderColor: currentTheme.accentColor }}>
            <h3 className="text-xl font-semibold mb-3" style={{ color: currentTheme.primaryColor }}>UI Store</h3>
            <p className="text-sm" style={{ color: currentTheme.secondaryColor }}>
              Modal: {ui.isModalOpen ? 'Open' : 'Closed'}<br />
              Menu: {ui.isMenuOpen ? 'Open' : 'Closed'}<br />
              Toast: {ui.isToastOpen ? 'Active' : 'Inactive'}
            </p>
          </div>

          <div className="p-6 rounded-lg border" style={{ borderColor: currentTheme.accentColor }}>
            <h3 className="text-xl font-semibold mb-3" style={{ color: currentTheme.primaryColor }}>Theme Store</h3>
            <p className="text-sm" style={{ color: currentTheme.secondaryColor }}>
              Active: {currentTheme.name}<br />
              Font: {currentTheme.typeFace}<br />
              Persisted: ✓
            </p>
          </div>

          <div className="p-6 rounded-lg border" style={{ borderColor: currentTheme.accentColor }}>
            <h3 className="text-xl font-semibold mb-3" style={{ color: currentTheme.primaryColor }}>Language Store</h3>
            <p className="text-sm" style={{ color: currentTheme.secondaryColor }}>
              Current: {currentLanguage}<br />
              Translation: {t('loading', 'Working')}<br />
              Reactive: ✓
            </p>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section
        id="contact"
        className="bg-gray-900 text-white"
        minHeight="100vh"
        padding="px-6 py-20"
        textAlignment="center"
      >
        <h2 className="text-4xl font-bold mb-6">{t('contact', 'Interactive Demo')}</h2>
        <p className="text-lg opacity-90 mb-8">Try out all the store interactions!</p>

        <div className="space-y-4 relative z-10">
          <button
            onClick={resetUI}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all relative z-10"
          >
            Reset All UI State
          </button>
        </div>
      </Section>

      {/* UI Elements - Store-powered overlays */}

      {/* Theme Switcher - Top Right */}
      <UIElement layer="navigation" zone="top-right" className="p-6 pointer-events-none">
        <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-lg p-4 pointer-events-auto">
          <h4 className="text-white text-sm font-semibold mb-2">Theme</h4>
          <div className="space-y-2">
            {Object.keys(availableThemes).map((themeName) => (
              <button
                key={themeName}
                onClick={() => setTheme(themeName)}
                className={`block w-full text-left px-3 py-2 rounded text-sm transition-all pointer-events-auto ${currentTheme.name === themeName
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white hover:bg-opacity-20'
                  }`}
              >
                {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </UIElement>

      {/* Language Switcher - Top Left */}
      <UIElement layer="navigation" zone="top-left" className="p-6 pointer-events-none">
        <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-lg p-4 pointer-events-auto">
          <h4 className="text-white text-sm font-semibold mb-2">Language</h4>
          <div className="space-y-2">
            <button
              onClick={() => setLanguage('en')}
              className={`block w-full text-left px-3 py-2 rounded text-sm transition-all pointer-events-auto ${currentLanguage === 'en'
                ? 'bg-white text-black'
                : 'text-white hover:bg-white hover:bg-opacity-20'
                }`}
            >
              🇺🇸 English
            </button>
            <button
              onClick={() => setLanguage('ja')}
              className={`block w-full text-left px-3 py-2 rounded text-sm transition-all pointer-events-auto ${currentLanguage === 'ja'
                ? 'bg-white text-black'
                : 'text-white hover:bg-white hover:bg-opacity-20'
                }`}
            >
              🇯🇵 日本語
            </button>
          </div>
        </div>
      </UIElement>

      {/* Menu Toggle - Center Left */}
      <UIElement layer="navigation" zone="center-left" className="p-6 pointer-events-none">
        <button
          onClick={toggleMenu}
          className="bg-black bg-opacity-50 backdrop-blur-md rounded-lg p-4 text-white hover:bg-opacity-70 transition-all pointer-events-auto"
        >
          <div className="space-y-1">
            <div className={`w-6 h-0.5 bg-white transition-all ${ui.isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all ${ui.isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all ${ui.isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </UIElement>

      {/* Footer */}
      <UIElement layer="navigation" zone="bottom-left" className="p-6 pointer-events-none">
        <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-lg px-8 py-3 pointer-events-auto">
          <p className="text-white text-sm">© 2025 Store Demo. Real-time state management!</p>
        </div>
      </UIElement>

      {/* Toast Notification */}
      {ui.isToastOpen && (
        <UIElement layer="overlay" zone="top-center" className="p-6 pointer-events-none">
          <div className={`rounded-lg px-6 py-4 text-white font-medium pointer-events-auto ${ui.toastType === 'success' ? 'bg-green-500' :
            ui.toastType === 'error' ? 'bg-red-500' :
              ui.toastType === 'warning' ? 'bg-yellow-500' :
                'bg-blue-500'
            }`}>
            {ui.toastMessage}
          </div>
        </UIElement>
      )}

      {/* Modal */}
      {ui.isModalOpen && (
        <UIElement layer="overlay" zone="center" className="p-6 pointer-events-auto">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl pointer-events-auto" style={{ color: currentTheme.foregroundColor }}>
            <h3 className="text-xl font-bold mb-4">Modal Demo</h3>
            <p className="mb-6">{ui.modalContent}</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all pointer-events-auto"
            >
              {t('close', 'Close')}
            </button>
          </div>
        </UIElement>
      )}

      {/* Menu Overlay */}
      {ui.isMenuOpen && (
        <UIElement layer="overlay" zone="center-left" className="p-6 ml-20 pointer-events-none">
          <div className="bg-white rounded-lg p-6 shadow-2xl pointer-events-auto" style={{ color: currentTheme.foregroundColor }}>
            <h3 className="text-lg font-bold mb-4">Menu Demo</h3>
            <nav className="space-y-2">
              <a href="#" className="block py-2 hover:text-blue-500 transition-colors pointer-events-auto">{t('home', 'Home')}</a>
              <a href="#" className="block py-2 hover:text-blue-500 transition-colors pointer-events-auto">{t('about', 'About')}</a>
              <a href="#" className="block py-2 hover:text-blue-500 transition-colors pointer-events-auto">{t('services', 'Services')}</a>
              <a href="#" className="block py-2 hover:text-blue-500 transition-colors pointer-events-auto">{t('contact', 'Contact')}</a>
            </nav>
          </div>
        </UIElement>
      )}
    </SectionWrapper>
  );
}