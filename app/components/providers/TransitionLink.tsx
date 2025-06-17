'use client';

import { usePageTransition } from './PageTransitionProvider';
import { ReactNode } from 'react';

interface TransitionLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

/**
 * TransitionLink - A Link component that uses our smooth page transitions
 * 
 * Drop-in replacement for Next.js Link that automatically uses our transition system.
 * Works exactly like a normal link but with buttery smooth animations!
 * 
 * Usage:
 * <TransitionLink href="/about">About</TransitionLink>
 * 
 * Features:
 * - Automatic transition handling
 * - Prevents navigation during transitions
 * - Works with any styling/className
 * - Optional onClick callback
 * 
 * Instead of:
 * onClick={() => router.push('/about')}
 * Use:
 * const { transitionTo } = usePageTransition();
 * onClick={() => transitionTo('/about')}
 * Or just use <TransitionLink href="/about">About</TransitionLink> and it handles everything!
 */
export const TransitionLink = ({
    href,
    children,
    className,
    style,
    onClick
}: TransitionLinkProps) => {
    const { transitionTo, isTransitioning } = usePageTransition();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        // Call optional onClick first
        if (onClick) onClick();

        // Then navigate with transition
        transitionTo(href);
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            className={className}
            style={{
                cursor: isTransitioning ? 'not-allowed' : 'pointer',
                opacity: isTransitioning ? 0.6 : 1,
                ...style
            }}
        >
            {children}
        </a>
    );
};