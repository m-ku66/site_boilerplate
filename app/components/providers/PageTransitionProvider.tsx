'use client';

import { AnimatePresence, motion, Transition } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useState, useTransition } from 'react';
import { blurFade, fastTransition } from './transitionVariants';

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
 * How it works:
 * 1. transitionTo() starts exit animation on current page
 * 2. After exit completes, router.push() navigates to new route
 * 3. New page renders with enter animation
 * 4. Perfect timing, no jank!
 * 
 * Usage:
 * Wrap your app with <PageTransitionProvider> in layout.tsx or similar.
 * Then use the `usePageTransition` hook to get `transitionTo` function.
 * Everywhere you would normally use `router.push()`, use `transitionTo()` instead.
 * * Example:
 * onClick={() => transitionTo('/about')}
 */
export const PageTransitionProvider = ({ children }: PageTransitionProviderProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isExiting, setIsExiting] = useState(false);

    // Function to handle navigation with proper exit timing
    const transitionTo = (href: string) => {
        // Don't navigate if already transitioning or going to same route
        if (isExiting || isPending || href === pathname) return;

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
                    }
                }}
            >
                <motion.div
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