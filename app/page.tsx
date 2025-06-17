'use client';

import { SectionWrapper } from '@/app/components/layout/SectionWrapper';
import { Section } from '@/app/components/layout/Section';
import { UIElement } from '@/app/components/ui/UIElement';

export default function Home() {
  // Track which section user is viewing
  const handleSectionChange = (index: number) => {
    const sectionNames = ['hero', 'features', 'about', 'contact'];
    console.log(`Now viewing: ${sectionNames[index]} section`);
  };

  return (
    <SectionWrapper
      enableScrollSnap={true}
      snapType="mandatory"
      direction="vertical"
      showNavigation={true}
      navigationPosition="center"
      onSectionChange={handleSectionChange}
      debug={true} // Enable debug mode to see the grid!
      className="h-screen"
    >
      {/* Regular sections */}
      <Section
        id="hero"
        className="bg-gradient-to-br from-blue-600 to-purple-700 text-white"
        minHeight="100vh"
        padding="px-6 py-20"
        textAlignment="center"
      >
        <h1 className="text-6xl font-bold mb-6">UIElement Demo</h1>
        <p className="text-xl opacity-90">Check out all the UI elements positioned around this page!</p>
      </Section>

      <Section
        id="features"
        className="bg-gray-50"
        minHeight="100vh"
        padding="px-6 py-20"
        textAlignment="center"
      >
        <h2 className="text-4xl font-bold mb-6">Features Section</h2>
        <p className="text-lg text-gray-600">Notice how the UI elements stay fixed while sections scroll!</p>
      </Section>

      <Section
        id="contact"
        className="bg-gray-900 text-white"
        minHeight="100vh"
        padding="px-6 py-20"
        textAlignment="center"
      >
        <h2 className="text-4xl font-bold mb-6">Contact Section</h2>
        <p className="text-lg opacity-90">The UI elements create a perfect overlay system!</p>
      </Section>

      {/* UI Elements - These will be positioned in the grid overlay */}

      {/* Top Navigation */}
      <UIElement layer="navigation" zone="top-center" className="w-full max-w-4xl px-6">
        <nav className="bg-white bg-opacity-10 backdrop-blur-md rounded-full px-8 py-4 mt-6">
          <div className="flex items-center justify-center space-x-8 text-white">
            <a href="#hero" className="hover:text-blue-300 transition-colors">Home</a>
            <a href="#features" className="hover:text-blue-300 transition-colors">Features</a>
            <a href="#contact" className="hover:text-blue-300 transition-colors">Contact</a>
          </div>
        </nav>
      </UIElement>

      {/* Logo in top-left */}
      <UIElement layer="navigation" zone="top-left" className="p-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg px-4 py-2">
          <span className="text-white font-bold text-xl">LOGO</span>
        </div>
      </UIElement>

      {/* Social links in top-right */}
      <UIElement layer="navigation" zone="top-right" className="p-6">
        <div className="flex space-x-3">
          <button className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
            📱
          </button>
          <button className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
            🐦
          </button>
          <button className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
            💼
          </button>
        </div>
      </UIElement>

      {/* Floating CTA button on the side */}
      <UIElement layer="content" zone="center-right" className="p-6">
        <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
          Get Started
        </button>
      </UIElement>

      {/* Progress indicator on the left */}
      <UIElement layer="content" zone="center-left" className="p-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-full p-4">
          <div className="flex flex-col space-y-2">
            <div className="w-2 h-8 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-8 bg-gray-400 opacity-50 rounded-full"></div>
            <div className="w-2 h-8 bg-gray-400 opacity-50 rounded-full"></div>
          </div>
        </div>
      </UIElement>

      {/* Footer in bottom-center */}
      <UIElement layer="navigation" zone="bottom-center" className="p-6">
        <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-lg px-8 py-3">
          <p className="text-white text-sm">© 2025 Your Company. Built with UIElements!</p>
        </div>
      </UIElement>

      {/* Quick actions in bottom-right */}
      <UIElement layer="overlay" zone="bottom-right" className="p-6">
        <div className="flex flex-col space-y-3">
          <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all">
            💬
          </button>
          <button className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all">
            📞
          </button>
          <button className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all">
            ✉️
          </button>
        </div>
      </UIElement>

      {/* Background decoration element */}
      <UIElement layer="background" zone="center" className="opacity-10">
        <div className="w-96 h-96 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-3xl"></div>
      </UIElement>
    </SectionWrapper>
  );
}