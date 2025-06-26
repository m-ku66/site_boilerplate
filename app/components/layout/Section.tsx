'use client';

import { SectionProps } from '@/app/types';

export const Section: React.FC<SectionProps> = ({
    id,
    children,
    className = '',
    minHeight = 'min-h-screen',
    maxWidth,
    padding = 'px-6 py-12',
    backgroundColor,
    backgroundImage,
    textAlignment = 'left',
    flexDirection = 'row',
    ...props
}) => {
    // Generate alignment classes - simplified to avoid duplication
    const getAlignmentClasses = () => {
        switch (textAlignment) {
            case 'center':
                return 'text-center items-center justify-center';
            case 'right':
                return 'text-right items-end justify-end';
            default:
                return 'text-left items-start justify-start';
        }
    };

    // Generate max width classes
    const getMaxWidthClass = () => {
        if (!maxWidth) return '';

        const widthMap: Record<string, string> = {
            'xs': 'max-w-xs',
            'sm': 'max-w-sm',
            'md': 'max-w-md',
            'lg': 'max-w-lg',
            'xl': 'max-w-xl',
            '2xl': 'max-w-2xl',
            '3xl': 'max-w-3xl',
            '4xl': 'max-w-4xl',
            '5xl': 'max-w-5xl',
            '6xl': 'max-w-6xl',
            '7xl': 'max-w-7xl',
            'full': 'max-w-full',
            'none': 'max-w-none'
        };

        return widthMap[maxWidth] || maxWidth;
    };

    // Simplified min-height handling - combines both class and style logic
    const getMinHeightConfig = () => {
        if (!minHeight) return { className: 'min-h-screen', style: {} };

        // Standard Tailwind classes
        const tailwindClasses = ['min-h-screen', 'min-h-full', 'min-h-0', 'min-h-max', 'min-h-min', 'min-h-fit'];

        if (tailwindClasses.includes(minHeight)) {
            return { className: minHeight, style: {} };
        }

        // Custom values (vh, vw, px, rem, %)
        if (minHeight.includes('vh') || minHeight.includes('vw') || minHeight.includes('px') || minHeight.includes('rem') || minHeight.includes('%')) {
            return { className: '', style: { minHeight } };
        }

        // Fallback to default
        return { className: 'min-h-screen', style: {} };
    };

    // Get flex direction class
    const getFlexDirectionClass = () => {
        switch (flexDirection) {
            case 'row':
                return 'flex-row';
            case 'row-reverse':
                return 'flex-row-reverse';
            case 'column':
                return 'flex-col';
            case 'column-reverse':
                return 'flex-col-reverse';
            default:
                return 'flex-row';
        }
    };

    // Get alignment classes for the section
    const alignmentClasses = getAlignmentClasses();
    const minHeightConfig = getMinHeightConfig();

    // Build complete styles object
    const sectionStyles: React.CSSProperties = {
        backgroundColor: backgroundColor || undefined,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: backgroundImage ? 'cover' : undefined,
        backgroundPosition: backgroundImage ? 'center' : undefined,
        backgroundRepeat: backgroundImage ? 'no-repeat' : undefined,
        ...minHeightConfig.style,
    };

    // Consolidated content div classes - no duplication
    const contentClasses = `
        w-full flex flex-col
        ${maxWidth ? `mx-auto ${getMaxWidthClass()}` : ''}
        ${alignmentClasses}
    `.trim();

    return (
        <section
            id={id}
            className={`
                relative w-full flex 
                ${getFlexDirectionClass()}
                ${minHeightConfig.className}
                ${padding}
                ${alignmentClasses}
                ${className}
            `.trim()}
            style={sectionStyles}
            {...props}
        >
            {/* Single content container - no duplication */}
            <div className={contentClasses}>
                {children}
            </div>

            {/* Background overlay if background image is present */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none"
                    aria-hidden="true"
                />
            )}
        </section>
    );
};