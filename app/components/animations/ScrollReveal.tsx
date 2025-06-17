import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";

interface ScrollRevealProps {
    children: ReactNode;
    animation: 'fade' | 'mask';
    direction: 'up-down' | 'down-up' | 'left-right' | 'right-left' | 'center';
    duration?: number;
    ease?: "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" | [number, number, number, number];
    delay?: number;
    className?: string;
}

export const ScrollReveal = ({
    children,
    animation,
    direction,
    duration = 0.8,
    ease = [0.87, 0, 0.13, 1],
    delay = 0,
    className = '',
}: ScrollRevealProps) => {
    const { elementRef, isIntersecting } = useIntersectionObserver({
        threshold: 0.1,
        triggerOnce: true,
    });

    // console.log('ScrollReveal debug:', { animation, isIntersecting });

    // Animation variants for fade
    const fadeVariants = {
        hidden: {
            opacity: 0,
            y: direction === "up-down" ? 50 : direction === "down-up" ? -50 : 0,
            x: direction === "left-right" ? 50 : direction === "right-left" ? -50 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
        },
    };

    // Animation variants for mask (clip-path)
    const maskVariants = {
        hidden: {
            clipPath:
                direction === 'up-down' ? 'inset(0% 0% 100% 0%)' :
                    direction === 'down-up' ? 'inset(100% 0% 0% 0%)' :
                        direction === 'left-right' ? 'inset(0% 0% 0% 100%)' :
                            direction === 'right-left' ? 'inset(0% 100% 0% 0%)' :
                                'inset(0% 50% 0% 50%)', // center - only horizontal mask!
        },
        visible: {
            clipPath: 'inset(0% 0% 0% 0%)',
        },
    };

    const variants = animation === "fade" ? fadeVariants : maskVariants;

    if (animation === 'mask') {
        return (
            <div
                ref={elementRef}
                className={className}
                style={{
                    width: '100%',
                    height: 'auto',
                }}
            >
                <motion.div
                    initial="hidden"
                    animate={isIntersecting ? "visible" : "hidden"}
                    variants={variants}
                    transition={{
                        duration,
                        ease,
                        delay,
                    }}
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                >
                    {children}
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            ref={elementRef}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
            variants={variants}
            transition={{
                duration,
                ease,
                delay,
            }}
            className={className}
            style={{
                // Ensure the wrapper doesn't interfere with layout
                width: "100%",
                height: "auto",
            }}
        >
            {children}
        </motion.div>
    );
};
