'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useEffect, useState, useMemo, isValidElement } from 'react';
import { SectionWrapperProps } from '@/app/types';
import { UIGridOverlay } from '@/app/components/ui/UIGridOverlay';
import { UIElement } from '@/app/components/ui/UIElement';

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
        "change",
        (latest) => {
            if (sectionElements.length === 0) return;

            const container = containerRef.current;
            if (!container) return;

            let activeSection = 0;

            if (direction === 'horizontal') {
                const scrollPosition = latest;
                sectionElements.forEach((section, index) => {
                    const sectionLeft = section.offsetLeft;
                    if (scrollPosition >= sectionLeft - container.clientWidth * 0.5) {
                        activeSection = index;
                    }
                });
            } else {
                const scrollPosition = latest;
                sectionElements.forEach((section, index) => {
                    const sectionTop = section.offsetTop;
                    if (scrollPosition >= sectionTop - container.clientHeight * 0.5) {
                        activeSection = index;
                    }
                });
            }

            if (activeSection !== currentSection) {
                setCurrentSection(activeSection);
                onSectionChange?.(activeSection);
            }
        }
    );

    // Navigate to specific section programmatically
    const scrollToSection = (index: number) => {
        const targetSection = sectionElements[index];
        const container = containerRef.current;

        if (targetSection && container) {
            if (direction === 'horizontal') {
                container.scrollTo({
                    left: targetSection.offsetLeft,
                    behavior: 'smooth'
                });
            } else {
                container.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    };

    // Generate scroll snap classes
    const getScrollSnapClasses = () => {
        if (!enableScrollSnap) return direction === 'horizontal' ? 'flex overflow-x-auto' : 'overflow-y-auto';

        if (direction === 'horizontal') {
            return `scroll-snap-type-x-${snapType} overflow-x-auto overflow-y-hidden flex`;
        } else {
            return `scroll-snap-type-y-${snapType} overflow-y-auto overflow-x-hidden`;
        }
    };

    // Navigation position classes
    const getNavigationClasses = () => {
        if (direction === 'horizontal') {
            const positionMap = {
                start: 'bottom-6 left-6',
                center: 'bottom-6 left-1/2 transform -translate-x-1/2',
                end: 'bottom-6 right-6'
            };
            return `fixed z-50 flex gap-2 ${positionMap[navigationPosition]}`;
        } else {
            const positionMap = {
                start: 'fixed top-6 right-6',
                center: 'fixed top-1/2 right-6 transform -translate-y-1/2',
                end: 'fixed bottom-6 right-6'
            };
            return `${positionMap[navigationPosition]} z-50 flex ${direction === 'vertical' ? 'flex-col' : ''} gap-2`;
        }
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

            {/* Navigation dots */}
            {showNavigation && sections.length > 0 && (
                <div className={getNavigationClasses()}>
                    {sections.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => scrollToSection(index)}
                            className={`
                    w-3 h-3 rounded-full transition-all duration-300 border-none cursor-pointer
                    ${currentSection === index
                                    ? 'bg-blue-600 opacity-100 scale-110'
                                    : 'bg-gray-400 opacity-40 scale-100'
                                }
                `}
                            whileHover={{
                                scale: 1.2,
                                opacity: 0.8
                            }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Go to section ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};