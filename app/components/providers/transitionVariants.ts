import { Variants, Transition } from "framer-motion";

/**
 * Collection of page transition variants for different feels and styles
 * Mix and match these in your PageTransitionProvider!
 */

// 🌊 Smooth fade with subtle scale (default choice)
export const fadeScale: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  in: { opacity: 1, scale: 1, y: 0 },
  out: { opacity: 0, scale: 1.05, y: -20 },
};

// 📄 Clean slide transitions (great for portfolios)
export const slideVertical: Variants = {
  initial: { opacity: 0, y: 50 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -50 },
};

// ↔️ Horizontal slide (good for step-by-step flows)
export const slideHorizontal: Variants = {
  initial: { opacity: 0, x: 100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -100 },
};

// ✨ Zoom with rotation (flashy but smooth)
export const zoomRotate: Variants = {
  initial: { opacity: 0, scale: 0.8, rotate: -5 },
  in: { opacity: 1, scale: 1, rotate: 0 },
  out: { opacity: 0, scale: 1.2, rotate: 5 },
};

// 🌀 Blur transition (modern glass effect)
export const blurFade: Variants = {
  initial: { opacity: 0, filter: "blur(10px)", scale: 1.05 },
  in: { opacity: 1, filter: "blur(0px)", scale: 1 },
  out: { opacity: 0, filter: "blur(10px)", scale: 0.95 },
};

// 📱 Mobile-friendly minimal (faster, less resource intensive)
export const minimal: Variants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

// 🎯 Focus transition (great for content-heavy sites)
export const focus: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.9 },
};

// 🎮 Game-style transition (bouncy and fun)
export const bounce: Variants = {
  initial: { opacity: 0, scale: 0.3, y: 100 },
  in: { opacity: 1, scale: 1, y: 0 },
  out: { opacity: 0, scale: 0.3, y: -100 },
};

// ⚡ Lightning fast (for when you need speed)
export const instant: Variants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 },
};

/**
 * Transition timing configurations to pair with variants
 */

// 🎯 Smooth and professional
export const smoothTransition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

// ⚡ Quick and snappy
export const snappyTransition: Transition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
};

// 🌊 Gentle and calm
export const gentleTransition: Transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.7,
};

// 🎮 Bouncy and playful
export const bouncyTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
};

// 🏃‍♂️ Lightning fast
export const fastTransition: Transition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.2,
};

// 🎨 Custom spring (great for organic feel)
export const organicTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

/**
 * Usage examples:
 *
 * In your PageTransitionProvider:
 * - Change pageVariants to any of the exported variants
 * - Change pageTransition to any of the exported transitions
 *
 * Example:
 * const pageVariants = blurFade;
 * const pageTransition = organicTransition;
 */
