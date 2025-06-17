'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useEffect, useState, useMemo, isValidElement } from 'react';
import { SectionWrapperProps } from '@/app/types';
import { UIGridOverlay } from '@/app/components/ui/UIGridOverlay';
import { UIElement } from '@/app/components/ui/UIElement';
import { useViewport, getBreakpointValue } from '@/app/hooks/useViewport';

interface SectionWrapperConfig extends SectionWrapperProps {
    showNavigation?: boolean;
    navigationPosition?: 'start' | 'center' | 'end';
    gap?: number;
    debug?: boolean;
    onSectionChange?: (index: number) => void;
}

export const SectionWrapper: React.FC<SectionWrapperConfig> = ({
    children,
    className = '',
    enableScrollSnap = true,
    snapDuration = 300,
    direction = 'vertical',
    snapType = 'mandatory',
    showNavigation = false,
    navigationPosition = 'center',
    gap = 0,
    debug = false,
    onSectionChange
}) => {
    // Get viewport info for responsive behavior
    const { breakpoint, isMobile, isTouch } = useViewport();

    // Refs and state for tracking scroll behavior
    const containerRef = useRef<HTMLDivElement>(null);
    const [sectionElements, setSectionElements] = useState<HTMLElement[]>([]);
    const [currentSection, setCurrentSection] = useState(0);

    // Framer Motion scroll tracking
    const { scrollX, scrollY } = useScroll({
        container: containerRef
    });

    // Filter children to separate sections from UI elements
    const { sections, uiElements } = useMemo(() => {
        const childrenArray = Array.isArray(children) ? children : [children];

        const sections = childrenArray.filter(child =>
            isValidElement(child) && child.type !== UIElement
        );

        const uiElements = childrenArray.filter(child =>
            isValidElement(child) && child.type === UIElement
        );

        return { sections, uiElements };
    }, [children]);

    // Auto-show UI overlay when we detect UI elements
    const shouldShowUIOverlay = uiElements.length > 0;

    // Find all section elements when they mount - only actual sections, not UI elements
    useEffect(() => {
        if (containerRef.current) {
            // Only get the section wrapper divs, not UIElements
            const sectionWrappers = Array.from(containerRef.current.children).filter(
                (child, index) => {
                    // Only include elements that correspond to actual sections
                    return child instanceof HTMLElement && index < sections.length;
                }
            ) as HTMLElement[];
            setSectionElements(sectionWrappers);
        }
    }, [sections]);

    // Track scroll position and determine active section
    useMotionValueEvent(
        direction === 'horizontal' ? scrollX : scrollY,
        'change',
        (latest) => {
            if (sectionElements.length === 0) return;

            let newSection = 0;
            const scrollPosition = latest;
            const threshold = direction === 'horizontal'
                ? window.innerWidth / 2
                : window.innerHeight / 2;

            sectionElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const elementPosition = direction === 'horizontal'
                    ? rect.left
                    : rect.top;

                if (Math.abs(elementPosition) < threshold) {
                    newSection = index;
                }
            });

            if (newSection !== currentSection) {
                setCurrentSection(newSection);
                onSectionChange?.(newSection);
            }
        }
    );

    // Scroll to specific section
    const scrollToSection = (index: number) => {
        if (!containerRef.current || !sectionElements[index]) return;

        const target = sectionElements[index];
        const container = containerRef.current;

        if (direction === 'horizontal') {
            const scrollLeft = target.offsetLeft;
            container.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        } else {
            const scrollTop = target.offsetTop;
            container.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            });
        }
    };

    // Generate scroll snap classes
    const getScrollSnapClasses = () => {
        if (!enableScrollSnap) return direction === 'horizontal' ?
            'flex overflow-x-auto' : 'overflow-y-auto';

        if (direction === 'horizontal') {
            return `scroll-snap-type-x-${snapType} overflow-x-auto overflow-y-hidden flex`;
        } else {
            return `scroll-snap-type-y-${snapType} overflow-y-auto overflow-x-hidden`;
        }
    };

    // Responsive navigation configuration
    const getNavigationConfig = () => {
        // Dot size based on device
        const dotSize = getBreakpointValue(breakpoint, {
            'small-phone': 'w-5 h-5', // Bigger for tiny screens
            'normal-phone': 'w-4 h-4',
            'tablet': 'w-4 h-4',
            'desktop': 'w-3 h-3',
            'large-desktop': 'w-3 h-3',
        }, 'w-3 h-3');

        // Touch target padding (invisible but tappable area)
        const touchPadding = isMobile ? 'p-3' : 'p-1';

        // Gap between navigation dots
        const navGap = getBreakpointValue(breakpoint, {
            'small-phone': 'gap-3',
            'normal-phone': 'gap-2',
            'tablet': 'gap-2',
            'desktop': 'gap-2',
            'large-desktop': 'gap-2',
        }, 'gap-2');

        // Container padding from screen edges
        const containerPadding = getBreakpointValue(breakpoint, {
            'small-phone': '4',
            'normal-phone': '6',
            'tablet': '6',
            'desktop': '6',
            'large-desktop': '6',
        }, '6');

        return {
            dotSize,
            touchPadding,
            navGap,
            containerPadding,
        };
    };

    // Navigation position classes with responsive spacing
    const getNavigationClasses = () => {
        const { containerPadding, navGap } = getNavigationConfig();

        if (direction === 'horizontal') {
            const positionMap = {
                start: `bottom-${containerPadding} left-${containerPadding}`,
                center: `bottom-${containerPadding} left-1/2 transform -translate-x-1/2`,
                end: `bottom-${containerPadding} right-${containerPadding}`
            };
            return `fixed z-50 flex ${navGap} ${positionMap[navigationPosition]}`;
        } else {
            const positionMap = {
                start: `top-${containerPadding} right-${containerPadding}`,
                center: `top-1/2 right-${containerPadding} transform -translate-y-1/2`,
                end: `bottom-${containerPadding} right-${containerPadding}`
            };
            return `fixed ${positionMap[navigationPosition]} z-50 flex ${direction === 'vertical' ? 'flex-col' : ''} ${navGap}`;
        }
    };

    // Responsive navigation dot styles
    const getNavigationDotClasses = (index: number) => {
        const { dotSize, touchPadding } = getNavigationConfig();
        const isActive = currentSection === index;

        // Enhanced color scheme for better visibility
        const activeColor = 'bg-blue-600';
        const inactiveColor = 'bg-gray-400';

        // Enhanced mobile interaction states
        const hoverScale = isMobile ? '1.1' : '1.2';

        return `
            ${dotSize} ${touchPadding} rounded-full transition-all duration-300 border-none cursor-pointer
            ${isActive ? `${activeColor} opacity-100 scale-110` : `${inactiveColor} opacity-40 scale-100`}
            ${isTouch ? 'active:scale-95' : ''} /* Touch feedback for mobile */
        `;
    };

    return (
        <div className={`relative w-full h-full ${className}`}>
            {/* Main scroll container */}
            <motion.div
                ref={containerRef}
                className={`
                    w-full h-full
                    ${getScrollSnapClasses()}
                    scroll-smooth
                `}
                style={{
                    gap: gap ? `${gap}px` : undefined,
                    scrollSnapType: enableScrollSnap
                        ? (direction === 'horizontal' ? `x ${snapType}` : `y ${snapType}`)
                        : 'none',
                    scrollBehavior: 'smooth',
                    transition: `scroll ${snapDuration}ms ease-out`
                }}
            >
                {/* Render sections with snap behavior */}
                {sections.map((child, index) => (
                    <div
                        key={index}
                        className={`z-[1]
                            ${enableScrollSnap ? 'scroll-snap-start' : ''} flex-shrink-0
                            ${direction === 'horizontal' ? 'w-full h-full' : 'min-h-screen w-full'}
                        `}
                    >
                        {child}
                    </div>
                ))}
            </motion.div>

            {/* Auto-generated UI overlay when UIElements are detected */}
            {shouldShowUIOverlay && (
                <UIGridOverlay debug={debug} mobileBreakpoint="md">
                    {uiElements}
                </UIGridOverlay>
            )}

            {/* Responsive Navigation dots */}
            {showNavigation && sections.length > 0 && (
                <div className={getNavigationClasses()}>
                    {sections.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => scrollToSection(index)}
                            className={getNavigationDotClasses(index)}
                            whileHover={{
                                scale: isMobile ? 1.1 : 1.2,
                                opacity: 0.8
                            }}
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.1 } // Quick feedback for better UX
                            }}
                            aria-label={`Go to section ${index + 1}`}
                            // Enhanced accessibility for touch devices
                            role="tab"
                            tabIndex={0}
                            style={{
                                // Ensure minimum touch target size (44px minimum per Apple/Google guidelines)
                                minWidth: isMobile ? '44px' : 'auto',
                                minHeight: isMobile ? '44px' : 'auto',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};