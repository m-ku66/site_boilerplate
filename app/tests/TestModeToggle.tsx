'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * Optional toggle component for easy switching between main app and test mode
 * Add this to any page for quick access to testing functionality
 */
export const TestModeToggle = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    const navigateToTest = () => {
        router.push('/tests');
    };

    const navigateToHome = () => {
        router.push('/');
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="fixed top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-all"
                title="Toggle test mode"
            >
                🧪
            </button>

            {/* Navigation Panel */}
            {isVisible && (
                <div className="fixed top-16 right-4 z-50 bg-white shadow-lg rounded-lg p-4 border">
                    <h3 className="font-semibold mb-3 text-gray-800">Test Mode</h3>
                    <div className="space-y-2">
                        <button
                            onClick={navigateToHome}
                            className="block w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-100 transition-all"
                        >
                            🏠 Main App
                        </button>
                        <button
                            onClick={navigateToTest}
                            className="block w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-100 transition-all"
                        >
                            🧪 Store Testing
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                        Switch between production and testing views
                    </p>
                </div>
            )}
        </>
    );
};