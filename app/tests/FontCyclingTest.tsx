'use client';

import { useThemeStore } from "@/app/store/theme-store";

export const FontCyclingTest = () => {
    const { currentTheme, availableFonts, cycleFont } = useThemeStore();

    // Apply the current font to the component for visual feedback
    const fontClass = currentTheme.typeFaceClass;

    return (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 backdrop-blur-md rounded-lg p-4 text-white">
            <div className="space-y-3">
                {/* Font Display */}
                <div className="text-center">
                    <h4 className="text-sm font-semibold mb-1">Current Font</h4>
                    <p className="text-xs opacity-80">
                        {currentTheme.typeFaceName ? currentTheme.typeFaceName : 'Loading...'}
                    </p>
                </div>

                {/* Sample Text with Current Font */}
                <div
                    className="text-center p-3 bg-white bg-opacity-10 rounded-md"
                >
                    <p className="text-sm font-normal">Normal Text</p>
                    <p className="text-sm font-medium">Medium Weight</p>
                    <p className="text-sm font-bold">Bold Text</p>
                    <p className="text-xs opacity-80 mt-1">Quick brown fox jumps</p>
                </div>

                {/* Cycle Button */}
                <button
                    onClick={cycleFont}
                    disabled={!availableFonts.length}
                    className={`w-full px-4 py-2 rounded-md font-medium text-sm transition-all
            ${'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                >
                    {'Cycle Font'}
                </button>

                {/* Font List (for debugging) */}
                <div className="text-xs opacity-60">
                    <p className="mb-1">Available: {availableFonts.length} fonts</p>
                    <div className="max-h-20 overflow-y-auto text-xs">
                        {availableFonts.map((font, index) => (
                            <div
                                key={font.name}
                                className={`${font.className === currentTheme.typeFaceClass ? 'text-yellow-300' : 'text-gray-300'}`}
                            >
                                {index + 1}. {font.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};