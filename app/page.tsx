'use client';

import { SectionWrapper } from '@/app/components/layout/SectionWrapper';
import { Section } from '@/app/components/layout/Section';
import { ScrollReveal } from '@/app/components/animations/ScrollReveal';
import { UIElement } from '@/app/components/ui/UIElement';
import { useThemeStore, useLanguageStore, useUIStore } from '@/app/store';
import { useHydration } from '@/app/hooks/useHydration';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon } from 'lucide-react';
import { TestModeToggle } from './tests/TestModeToggle';

export default function ShowcaseHomepage() {
  const { currentTheme, availableThemes, setTheme } = useThemeStore();
  const { currentLanguage, setLanguage, t } = useLanguageStore();
  const { ui, openModal, closeModal, showToast, toggleMenu, hideToast } = useUIStore();
  const isHydrated = useHydration();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Auto-dismiss toasts after 3 seconds
  useEffect(() => {
    if (ui.isToastOpen) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [ui.isToastOpen]);

  // Copy code to clipboard
  const copyCode = async (code: string, label: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(label);
    showToast(`${label} code copied!`, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading showcase...</div>
      </div>
    );
  }

  return (
    <SectionWrapper
      enableScrollSnap={true}
      snapType="mandatory"
      direction="vertical"
      showNavigation={true}
      navigationPosition="end"
      debug={false}
    >
      {/* Hero Section */}
      <Section
        id="hero"
        className="relative overflow-hidden"
        minHeight="100vh"
        padding="px-6 py-10"
        textAlignment="center"
        style={{ backgroundColor: currentTheme.backgroundColor, color: currentTheme.foregroundColor }}
      >
        <div className="max-w-6xl mx-auto">
          <ScrollReveal animation="fade" direction="up-down" delay={0.2}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
            >
              <h1 className="text-7xl p-4 font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Next.js Boilerplate
              </h1>
              <p className="text-2xl mb-12 max-w-3xl mx-auto">
                Production-ready with smooth scrolling, themes, animations, and more.
                Built with TypeScript, TailwindCSS, and Framer Motion.
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal animation="fade" direction="up-down" delay={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Feature Cards */}
              <motion.div
                style={{ outline: `1px solid ${currentTheme.secondaryColor}` }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-3">Dynamic Theming</h3>
                <p className={`text-[${currentTheme.secondaryColor}] opacity-70`}>10+ beautiful themes with Google Fonts integration</p>
              </motion.div>

              <motion.div
                style={{ outline: `1px solid ${currentTheme.secondaryColor}` }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold mb-3">Smooth Animations</h3>
                <p className={`text-[${currentTheme.secondaryColor}] opacity-70`}>ScrollReveal, page transitions, and Motion components</p>
              </motion.div>

              <motion.div
                style={{ outline: `1px solid ${currentTheme.secondaryColor}` }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-3">Internationalization</h3>
                <p className={`text-[${currentTheme.secondaryColor}] opacity-70`}>Multi-language support with persistent storage</p>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade" direction="up-down" delay={1.0}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => showToast('Welcome to the showcase!', 'success')}
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                style={{
                  background: `linear-gradient(45deg, ${currentTheme.primaryColor}, ${currentTheme.accentColor})`,
                  color: currentTheme.backgroundColor
                }}
              >
                Try Interactive Demo
              </button>
              <button
                onClick={() => openModal()}
                className="px-8 py-4 border-2 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  borderColor: currentTheme.accentColor,
                  color: currentTheme.foregroundColor,
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${currentTheme.accentColor}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                View Features
              </button>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Theme Showcase Section */}
      <Section
        id="themes"
        minHeight="100vh"
        padding="px-6 py-10"
        textAlignment="center"
        style={{ backgroundColor: currentTheme.backgroundColor }}
      >
        <div className="max-w-6xl mx-auto">
          <ScrollReveal animation="fade" direction="down-up" delay={0.2}>
            <h2 className="text-5xl font-bold mb-6" style={{ color: currentTheme.foregroundColor }}>Dynamic Theme System</h2>
            <p className="text-xl mb-16 max-w-3xl mx-auto opacity-70" style={{ color: currentTheme.primaryColor }}>
              Switch between beautiful themes instantly. Each theme includes custom colors, typography, and Google Fonts.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade" direction="up-down" delay={0.4}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
              {Object.entries(availableThemes).map(([themeName, theme]) => (
                <motion.button
                  key={themeName}
                  onClick={() => setTheme(themeName)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${currentTheme.name === themeName
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                  style={{
                    backgroundColor: theme.backgroundColor,
                    color: theme.foregroundColor,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl mb-2">🎨</div>
                  <div className="font-semibold capitalize">{themeName}</div>
                  <div className="text-sm opacity-70 font-mono">{theme.typeFaceName}</div>
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade" direction="up-down" delay={0.6}>
            <div className="bg-gray-900 rounded-2xl p-8 text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-mono text-lg">Theme Implementation</h3>
                <button
                  onClick={() => copyCode(`const { currentTheme, setTheme } = useThemeStore();
setTheme('midnight');`, 'Theme')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  {copiedCode === 'Theme' ? '✓ Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                {`const { currentTheme, setTheme } = useThemeStore();

// Switch themes instantly
setTheme('midnight');
setTheme('ocean');
setTheme('forest');

// Access theme values
currentTheme.primaryColor
currentTheme.typeFace`}
              </pre>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Animation Showcase Section */}
      <Section
        id="animations"
        minHeight="100vh"
        padding="px-6 pt-10 pb-20"
        textAlignment="center"
        style={{
          backgroundColor: currentTheme.backgroundColor,
          background: `linear-gradient(135deg, ${currentTheme.backgroundColor}, ${currentTheme.primaryColor}20)`
        }}
      >
        <div className="max-w-6xl mx-auto">
          <ScrollReveal animation="mask" direction="center" delay={0.2}>
            <h2 className="text-5xl font-bold mb-6" style={{ color: currentTheme.foregroundColor }}>Smooth Animations</h2>
            <p className="text-xl mb-16 max-w-3xl mx-auto opacity-70" style={{ color: currentTheme.primaryColor }}>
              ScrollReveal components with fade and mask animations. Powered by Framer Motion.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Animation Examples */}
            <ScrollReveal animation="fade" direction="left-right" delay={0.4}>
              <div className="backdrop-blur-lg rounded-2xl p-8" style={{
                backgroundColor: `${currentTheme.primaryColor}10`,
                border: `1px solid ${currentTheme.accentColor}30`
              }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: currentTheme.foregroundColor }}>Fade Animations</h3>
                <div className="space-y-4">
                  <ScrollReveal animation="fade" direction="up-down" delay={0.6}>
                    <div className="p-4 rounded-lg" style={{
                      backgroundColor: `${currentTheme.primaryColor}30`,
                      color: currentTheme.foregroundColor
                    }}>Fade Up</div>
                  </ScrollReveal>
                  <ScrollReveal animation="fade" direction="left-right" delay={0.8}>
                    <div className="p-4 rounded-lg" style={{
                      backgroundColor: `${currentTheme.accentColor}30`,
                      color: currentTheme.foregroundColor
                    }}>Fade Right</div>
                  </ScrollReveal>
                  <ScrollReveal animation="fade" direction="right-left" delay={1.0}>
                    <div className="p-4 rounded-lg" style={{
                      backgroundColor: `${currentTheme.secondaryColor}`,
                      color: currentTheme.foregroundColor
                    }}>Fade Left</div>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="mask" direction="right-left" delay={0.4}>
              <div className="backdrop-blur-lg rounded-2xl p-8" style={{
                backgroundColor: `${currentTheme.primaryColor}10`,
                border: `1px solid ${currentTheme.accentColor}30`
              }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: currentTheme.foregroundColor }}>Mask Animations</h3>
                <div className="space-y-4">
                  <ScrollReveal animation="mask" direction="up-down" delay={0.6}>
                    <div className="p-4 rounded-lg" style={{
                      backgroundColor: `${currentTheme.primaryColor}30`,
                      color: currentTheme.foregroundColor
                    }}>Mask Up</div>
                  </ScrollReveal>
                  <ScrollReveal animation="mask" direction="left-right" delay={0.8}>
                    <div className="p-4 rounded-lg" style={{
                      backgroundColor: `${currentTheme.accentColor}30`,
                      color: currentTheme.foregroundColor
                    }}>Mask Right</div>
                  </ScrollReveal>
                  <ScrollReveal animation="mask" direction="center" delay={1.0}>
                    <div className="p-4 rounded-lg" style={{
                      backgroundColor: `${currentTheme.secondaryColor}`,
                      color: currentTheme.foregroundColor
                    }}>Mask Center</div>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade" direction="up-down" delay={1.2}>
            <div className="bg-gray-900 rounded-2xl p-8 text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-mono text-lg">ScrollReveal Usage</h3>
                <button
                  onClick={() => copyCode(`<ScrollReveal animation="fade" direction="up-down" delay={0.2}>
  <YourComponent />
</ScrollReveal>`, 'Animation')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
                >
                  {copiedCode === 'Animation' ? '✓ Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                {`<ScrollReveal 
  animation="fade" 
  direction="up-down" 
  delay={0.2}
  duration={0.8}
  ease={[0.87, 0, 0.13, 1]}
>
  <YourComponent />
</ScrollReveal>`}
              </pre>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Language & UI Section */}
      <Section
        id="features"
        minHeight="100vh"
        padding="px-6 py-10"
        textAlignment="center"
        style={{ backgroundColor: currentTheme.backgroundColor }}
      >
        <div className="max-w-6xl mx-auto">
          <ScrollReveal animation="fade" direction="down-up" delay={0.2}>
            <h2 className="text-5xl font-bold mb-6" style={{ color: currentTheme.foregroundColor }}>Interactive Features</h2>
            <p className="text-xl mb-16 max-w-3xl mx-auto opacity-70" style={{ color: currentTheme.primaryColor }}>
              Language switching, UI state management, and smooth scroll snapping.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Language Demo */}
            <ScrollReveal animation="fade" direction="left-right" delay={0.4}>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Language Support</h3>
                <div className="space-y-4 mb-6">
                  <div className="text-lg text-gray-700">
                    Current: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{currentLanguage}</span>
                  </div>
                  <div className="text-lg text-gray-700">
                    {t('hero.title', 'Welcome to Your Project')}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-4 py-2 rounded-lg transition-all ${currentLanguage === 'en'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => setLanguage('ja')}
                    className={`px-4 py-2 rounded-lg transition-all ${currentLanguage === 'ja'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    🇯🇵 日本語
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* UI Store Demo */}
            <ScrollReveal animation="fade" direction="right-left" delay={0.4}>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">UI State Management</h3>
                <div className="space-y-4 mb-6">
                  <div className="text-lg text-gray-700">
                    Modal: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{ui.isModalOpen ? 'Open' : 'Closed'}</span>
                  </div>
                  <div className="text-lg text-gray-700">
                    Menu: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{ui.isMenuOpen ? 'Open' : 'Closed'}</span>
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => showToast('Hello from toast!', 'info')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Show Toast
                  </button>
                  <button
                    onClick={() => openModal()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Open Modal
                  </button>
                  <button
                    onClick={() => toggleMenu()}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Toggle Menu
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade" direction="up-down" delay={0.8}>
            <div className="bg-gray-900 rounded-2xl p-8 text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-mono text-lg">Store Implementation</h3>
                <button
                  onClick={() => copyCode(`const { ui, openModal, showToast } = useUIStore();
const { currentLanguage, setLanguage, t } = useLanguageStore();`, 'Stores')}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
                >
                  {copiedCode === 'Stores' ? '✓ Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                {`// UI Store
const { ui, openModal, showToast } = useUIStore();

// Language Store  
const { currentLanguage, setLanguage, t } = useLanguageStore();

// Usage
showToast('Success!', 'success');
setLanguage('ja');
const text = t('key', 'fallback');`}
              </pre>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* SectionWrapper Demo */}
      <Section
        id="scroll"
        minHeight="100vh"
        padding="px-6 py-20"
        textAlignment="center"
        style={{
          backgroundColor: currentTheme.backgroundColor,
          background: `linear-gradient(135deg, ${currentTheme.backgroundColor}, ${currentTheme.primaryColor}15)`
        }}
      >
        <div className="max-w-6xl mx-auto">
          <ScrollReveal animation="mask" direction="center" delay={0.2}>
            <h2 className="text-5xl font-bold mb-6">Smooth Scroll Snapping</h2>
            <p className="text-xl mb-16 max-w-3xl mx-auto opacity-70">
              Perfect scroll snapping with customizable behavior. This entire page uses SectionWrapper!
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade" direction="up-down" delay={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Vertical Snapping</h3>
                <p className="opacity-70 mb-4">Smooth section-to-section scrolling</p>
                <div className="text-sm text-gray-400 font-mono">
                  snapType="mandatory"<br />
                  direction="vertical"
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Navigation Dots</h3>
                <p className="opacity-70 mb-4">Auto-generated section navigation</p>
                <div className="text-sm text-gray-400 font-mono">
                  showNavigation={true}<br />
                  navigationPosition="end"
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade" direction="up-down" delay={0.8}>
            <div className="bg-gray-800 rounded-2xl p-8 text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-mono text-lg">SectionWrapper Setup</h3>
                <button
                  onClick={() => copyCode(`<SectionWrapper
  enableScrollSnap={true}
  snapType="mandatory"
  direction="vertical"
  showNavigation={true}
>
  <Section id="hero">Content</Section>
</SectionWrapper>`, 'SectionWrapper')}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
                >
                  {copiedCode === 'SectionWrapper' ? '✓ Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                {`<SectionWrapper
  enableScrollSnap={true}
  snapType="mandatory"
  direction="vertical" 
  showNavigation={true}
  navigationPosition="end"
>
  <Section id="hero" minHeight="100vh">
    Your content here
  </Section>
</SectionWrapper>`}
              </pre>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <UIElement layer="navigation" zone="top-right">
        <MenuIcon className='w-8 h-8 m-4 cursor-pointer pointer-events-auto hover:scale-105 duration-150 active:scale-90' />
      </UIElement>

      {/* Modal Demo using UIElement */}
      {ui.isModalOpen && (
        <UIElement layer="overlay" zone="center" className='pointer-events-auto w-full h-full'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-10"
            onClick={() => closeModal()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-2xl p-8 max-w-md w-full border"
              style={{
                backgroundColor: currentTheme.backgroundColor,
                borderColor: `${currentTheme.accentColor}50`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4" style={{
                color: currentTheme.foregroundColor,
              }}>Modal Component</h3>
              <p className="mb-6" style={{ color: currentTheme.secondaryColor }}>
                This modal is managed by the UI store, uses UIElement for positioning, and includes smooth animations with Framer Motion.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => closeModal()}
                  className="px-4 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${currentTheme.secondaryColor}50`,
                    color: currentTheme.foregroundColor
                  }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    showToast('Modal action triggered!', 'success');
                    closeModal();
                  }}
                  className="px-4 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: currentTheme.primaryColor,
                    color: currentTheme.backgroundColor
                  }}
                >
                  Action
                </button>
              </div>
            </motion.div>
          </motion.div>
        </UIElement>
      )}

      {/* Toast Notifications using UIElement */}
      {ui.isToastOpen && (
        <UIElement layer="overlay" zone="bottom-right">
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            className="m-6 px-6 py-3 rounded-lg shadow-lg backdrop-blur-lg border"
            style={{
              backgroundColor: `${currentTheme.primaryColor}90`,
              borderColor: `${currentTheme.accentColor}50`,
              color: currentTheme.backgroundColor
            }}
          >
            {ui.toastMessage}
          </motion.div>
        </UIElement>
      )}
      <UIElement layer="overlay" zone="bottom-left" className='pointer-events-auto p-4'>
        <TestModeToggle />
      </UIElement>
    </SectionWrapper>
  );
}