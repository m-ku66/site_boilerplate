'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useEffect, useState, useMemo, isValidElement } from 'react';
import { SectionWrapperProps } from '@/app/types';
import { UIGridOverlay } from '@/app/components/ui/UIGridOverlay';
import { UIElement } from '@/app/components/ui/UIElement';
import { useViewport, getBreakpointValue } from '@/app/hooks/useViewport';
import { useThemeStore } from '@/app/store';

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
    const { currentTheme } = useThemeStore();

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

            // Find the section closest to the center of the viewport
            let newSection = 0;
            let minDistance = Infinity;

            const viewportCenter = direction === 'horizontal'
                ? window.innerWidth / 2
                : window.innerHeight / 2;

            sectionElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();

                // Calculate the center of this section relative to viewport
                const elementCenter = direction === 'horizontal'
                    ? rect.left + rect.width / 2
                    : rect.top + rect.height / 2;

                // Calculate distance from viewport center to element center
                const distance = Math.abs(viewportCenter - elementCenter);

                // Keep track of the closest section
                if (distance < minDistance) {
                    minDistance = distance;
                    newSection = index;
                }
            });

            // Only update if the section actually changed
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
    const getNavigationStyles = () => {
        const { containerPadding, navGap } = getNavigationConfig();

        // Convert containerPadding to pixels (multiply by 4 for Tailwind spacing)
        const padding = parseInt(containerPadding!) * 4;

        if (direction === 'horizontal') {
            const positionStyles = {
                start: {
                    bottom: `${padding}px`,
                    left: `${padding}px`,
                },
                center: {
                    bottom: `${padding}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                },
                end: {
                    bottom: `${padding}px`,
                    right: `${padding}px`,
                }
            };

            return {
                position: 'fixed' as const,
                zIndex: 200,
                display: 'flex',
                gap: `${parseInt(navGap!.replace('gap-', '')) * 4}px`, // Convert gap-2 to 8px
                ...positionStyles[navigationPosition]
            };
        } else {
            const positionStyles = {
                start: {
                    top: `${padding}px`,
                    right: `${padding}px`,
                },
                center: {
                    top: '50%',
                    right: `${padding}px`,
                    transform: 'translateY(-50%)',
                },
                end: {
                    bottom: `${padding}px`,
                    right: `${padding}px`,
                }
            };

            return {
                position: 'fixed' as const,
                zIndex: 200,
                display: 'flex',
                flexDirection: direction === 'vertical' ? 'column' as const : 'row' as const,
                gap: `${parseInt(navGap!.replace('gap-', '')) * 4}px`, // Convert gap-2 to 8px
                ...positionStyles[navigationPosition]
            };
        }
    };

    // Navigation dot styles
    const getNavigationDotStyles = (index: number) => {
        const { dotSize, touchPadding } = getNavigationConfig();
        const isActive = currentSection === index;

        // Convert Tailwind classes to pixel values
        const size = parseInt(dotSize!.split(' ')[0].replace('w-', '')) * 4; // w-3 = 12px
        const padding = parseInt(touchPadding.replace('p-', '')) * 4; // p-1 = 4px

        return {
            width: `${size}px`,
            height: `${size}px`,
            padding: `${padding}px`,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backgroundColor: isActive ? currentTheme.primaryColor : currentTheme.secondaryColor,
            opacity: isActive ? 1 : 0.4,
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
            minWidth: isMobile ? '44px' : 'auto',
            minHeight: isMobile ? '44px' : 'auto',
        };
    };

    return (
        <div className={`relative w-full h-screen ${className}`}>
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
                <div style={getNavigationStyles()}>
                    {sections.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => scrollToSection(index)}
                            style={getNavigationDotStyles(index)}
                            whileHover={{
                                scale: isMobile ? 1.1 : 1.2,
                                opacity: 0.8
                            }}
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.1 }
                            }}
                            aria-label={`Go to section ${index + 1}`}
                            role="tab"
                            tabIndex={0}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};