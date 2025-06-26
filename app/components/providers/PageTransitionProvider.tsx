'use client';

import { AnimatePresence, motion, Transition } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useState, useTransition } from 'react';
import { blurFade, fastTransition } from './transitionVariants';
import { useUIStore } from '@/app/store';

interface PageTransitionProviderProps {
    children: ReactNode;
}

interface TransitionContextType {
    isTransitioning: boolean;
    transitionTo: (href: string) => void;
}

// Context for sharing transition state and functions
const TransitionContext = createContext<TransitionContextType | null>(null);

// Define our transition variants
const pageVariants = {
    initial: {
        opacity: 0,
        scale: 0.95,
        y: 20,
    },
    in: {
        opacity: 1,
        scale: 1,
        y: 0,
    },
    out: {
        opacity: 0,
        scale: 1.05,
        y: -20,
    },
};

// Transition configuration
const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
};

/**
 * PageTransitionProvider - Clean page transitions that actually work!
 * 
 * This provider creates a proper transition flow where exit animations
 * play BEFORE route changes, not after. Uses Next.js router properly.
 * 
 * UPDATED: Now includes UI state cleanup to prevent modal/toast overlay bugs!
 * 
 * How it works:
 * 1. transitionTo() resets UI state (closes modals, clears toasts)
 * 2. Starts exit animation on current page
 * 3. After exit completes, router.push() navigates to new route
 * 4. New page renders with enter animation
 * 5. Perfect timing, no jank, no overlay bugs!
 * 
 * Usage:
 * Wrap your app with <PageTransitionProvider> in layout.tsx or similar.
 * Then use the `usePageTransition` hook to get `transitionTo` function.
 * Everywhere you would normally use `router.push()`, use `transitionTo()` instead.
 * 
 * Example:
 * onClick={() => transitionTo('/about')}
 */
export const PageTransitionProvider = ({ children }: PageTransitionProviderProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isExiting, setIsExiting] = useState(false);

    // Get UI store functions for state cleanup
    const { closeModal, resetUI } = useUIStore();

    // Function to handle navigation with proper exit timing AND UI cleanup
    const transitionTo = (href: string) => {
        // Don't navigate if already transitioning or going to same route
        if (isExiting || isPending || href === pathname) return;

        // 🔥 CRITICAL: Reset UI state FIRST to prevent overlay bugs!
        // This closes any open modals, clears toasts, and resets menu state
        resetUI();

        // Also ensure modal is explicitly closed (double safety!)
        closeModal();

        console.log('UI state reset complete - starting route transition');

        // Start exit animation
        setIsExiting(true);

        // After exit animation completes, actually navigate
        setTimeout(() => {
            startTransition(() => {
                router.push(href);
                setIsExiting(false);
            });
        }, pageTransition.duration !== undefined ? pageTransition.duration * 1000 : 0);
    };

    return (
        <TransitionContext.Provider value={{ isTransitioning: isExiting || isPending, transitionTo }}>
            <AnimatePresence
                mode="wait"
                initial={false}
                onExitComplete={() => {
                    if (typeof window !== 'undefined') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        console.log('Exit animation complete - UI clean slate achieved!');
                    }
                }}
            >
                <motion.div
                    id='page-transition'
                    key={pathname}
                    initial="initial"
                    animate={isExiting ? "out" : "in"}
                    exit="out"
                    variants={blurFade} // Can be swapped for any Variant from transitionVariants.ts
                    transition={fastTransition} // Can be swapped for any Transition from transitionVariants.ts
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                    }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </TransitionContext.Provider>
    );
};

/**
 * Custom hook to use page transitions
 * 
 * Usage:
 * const { transitionTo, isTransitioning } = usePageTransition();
 * 
 * Then call transitionTo('/some-route') instead of router.push()
 * 
 * Example:
 * onClick={() => transitionTo('/about')}
 */
export const usePageTransition = () => {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error('usePageTransition must be used within PageTransitionProvider');
    }
    return context;
};