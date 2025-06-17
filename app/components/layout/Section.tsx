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
    ...props
}) => {
    // Generate alignment classes
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

    // Handle minHeight - support both Tailwind classes and custom values
    const getMinHeightStyles = () => {
        if (!minHeight) return {};

        // If it's a standard Tailwind class, let CSS handle it
        const tailwindClasses = ['min-h-screen', 'min-h-full', 'min-h-0', 'min-h-max', 'min-h-min', 'min-h-fit'];
        if (tailwindClasses.includes(minHeight)) {
            return {};
        }

        // If it contains vh, vw, px, rem, etc., apply as inline style
        if (minHeight.includes('vh') || minHeight.includes('vw') || minHeight.includes('px') || minHeight.includes('rem') || minHeight.includes('%')) {
            return { minHeight };
        }

        return {};
    };

    const getMinHeightClass = () => {
        if (!minHeight) return 'min-h-screen'; // default fallback

        // If it's a standard Tailwind class, use it
        const tailwindClasses = ['min-h-screen', 'min-h-full', 'min-h-0', 'min-h-max', 'min-h-min', 'min-h-fit'];
        if (tailwindClasses.includes(minHeight)) {
            return minHeight;
        }

        // For custom values, we'll use inline styles instead
        return '';
    };

    // Build styles object for backgrounds and minHeight
    const sectionStyles: React.CSSProperties = {
        backgroundColor: backgroundColor || undefined,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: backgroundImage ? 'cover' : undefined,
        backgroundPosition: backgroundImage ? 'center' : undefined,
        backgroundRepeat: backgroundImage ? 'no-repeat' : undefined,
        ...getMinHeightStyles(), // Add minHeight styles
    };

    return (
        <section
            id={id}
            className={`
        relative w-full flex flex-col
        ${getMinHeightClass()}
        ${padding}
        ${getAlignmentClasses()}
        ${className}
      `}
            style={sectionStyles}
            {...props}
        >
            {/* Content container with max width if specified */}
            {maxWidth ? (
                <div className={`
          w-full mx-auto flex flex-col
          ${getMaxWidthClass()}
          ${getAlignmentClasses()}
        `}>
                    {children}
                </div>
            ) : (
                <div className={`
          w-full flex flex-col
          ${getAlignmentClasses()}
        `}>
                    {children}
                </div>
            )}

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