'use client';

import { useState } from 'react';
import { usePageTransition } from '@/app/components/providers/PageTransitionProvider';

/**
 * Updated TestModeToggle that uses our smooth page transitions
 * Now navigation between test and main app will have beautiful animations!
 */
export const TestModeToggle = () => {
    const { transitionTo, isTransitioning } = usePageTransition();
    const [isVisible, setIsVisible] = useState(false);

    const navigateToTest = () => {
        transitionTo('/tests');
    };

    const navigateToHome = () => {
        transitionTo('/');
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="fixed z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-all"
                title="Toggle test mode"
                disabled={isTransitioning}
            >
                🧪
            </button>

            {/* Navigation Panel */}
            {isVisible && (
                <div className="fixed z-50 bg-white shadow-lg rounded-lg p-4 border">
                    <h3 className="font-semibold mb-3 text-gray-800">Test Mode</h3>
                    <div className="space-y-2">
                        <button
                            onClick={navigateToHome}
                            className={`block w-full text-left px-3 py-2 rounded text-sm transition-all ${isTransitioning
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-gray-100'
                                }`}
                            disabled={isTransitioning}
                        >
                            🏠 Main App
                        </button>
                        <button
                            onClick={navigateToTest}
                            className={`block w-full text-left px-3 py-2 rounded text-sm transition-all ${isTransitioning
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-gray-100'
                                }`}
                            disabled={isTransitioning}
                        >
                            🧪 Store Testing
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                        {isTransitioning
                            ? 'Transitioning...'
                            : 'Switch between production and testing views'
                        }
                    </p>
                </div>
            )}
        </>
    );
};