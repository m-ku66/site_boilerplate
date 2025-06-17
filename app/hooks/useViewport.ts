"use client";

import { useState, useEffect } from "react";

// Viewport breakpoint definitions based on Marc's requirements
export const VIEWPORT_BREAKPOINTS = {
  // Super small phones (older Android models, iPhone)
  SMALL_PHONE: 375,
  // Normal phones (iPhone 14 Pro Max and similar)
  NORMAL_PHONE: 430,
  // Normal desktops (anything reasonable for desktop)
  DESKTOP: 1024,
  // Large desktop displays
  LARGE_DESKTOP: 1920,
} as const;

export type ViewportBreakpoint =
  | "small-phone"
  | "normal-phone"
  | "tablet"
  | "desktop"
  | "large-desktop";

export interface ViewportInfo {
  // Raw viewport dimensions
  width: number;
  height: number;

  // Current breakpoint category
  breakpoint: ViewportBreakpoint;

  // Boolean flags for easy conditional logic
  isSmallPhone: boolean;
  isNormalPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;

  // Combined boolean flags for broader categories
  isMobile: boolean; // small-phone OR normal-phone
  isDesktopOrLarger: boolean; // desktop OR large-desktop

  // Orientation info (useful for mobile layouts)
  orientation: "portrait" | "landscape";

  // Utility info
  aspectRatio: number;
  isTouch: boolean; // Detects if device likely supports touch
}

/**
 * useViewport - Custom hook for responsive design and conditional rendering
 *
 * Provides real-time viewport information that updates on window resize.
 * Perfect for building components that adapt to different screen sizes!
 *
 * Breakpoints:
 * - small-phone: < 375px (older Android, iPhone)
 * - normal-phone: 375px - 429px (iPhone 14 Pro Max, etc.)
 * - tablet: 430px - 1023px (tablets, small laptops)
 * - desktop: 1024px - 1919px (normal desktops)
 * - large-desktop: >= 1920px (large displays)
 *
 * Usage:
 * const { isMobile, breakpoint, width } = useViewport();
 *
 * if (isMobile) {
 *   return <MobileComponent />;
 * }
 *
 * Features:
 * - SSR safe (returns sensible defaults on server)
 * - Updates on window resize
 * - Debounced for performance
 * - Touch detection for enhanced UX
 */
export const useViewport = (): ViewportInfo => {
  // Default viewport info for SSR/initial render
  const getDefaultViewport = (): ViewportInfo => ({
    width: 1024, // Default to desktop size for SSR
    height: 768,
    breakpoint: "desktop",
    isSmallPhone: false,
    isNormalPhone: false,
    isTablet: false,
    isDesktop: true,
    isLargeDesktop: false,
    isMobile: false,
    isDesktopOrLarger: true,
    orientation: "landscape",
    aspectRatio: 1024 / 768,
    isTouch: false,
  });

  const [viewport, setViewport] = useState<ViewportInfo>(getDefaultViewport);

  // Calculate viewport info from current window dimensions
  const calculateViewport = (): ViewportInfo => {
    if (typeof window === "undefined") {
      return getDefaultViewport();
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Determine breakpoint based on width
    let breakpoint: ViewportBreakpoint;
    if (width < VIEWPORT_BREAKPOINTS.SMALL_PHONE) {
      breakpoint = "small-phone";
    } else if (width < VIEWPORT_BREAKPOINTS.NORMAL_PHONE) {
      breakpoint = "normal-phone";
    } else if (width < VIEWPORT_BREAKPOINTS.DESKTOP) {
      breakpoint = "tablet";
    } else if (width < VIEWPORT_BREAKPOINTS.LARGE_DESKTOP) {
      breakpoint = "desktop";
    } else {
      breakpoint = "large-desktop";
    }

    // Calculate boolean flags
    const isSmallPhone = breakpoint === "small-phone";
    const isNormalPhone = breakpoint === "normal-phone";
    const isTablet = breakpoint === "tablet";
    const isDesktop = breakpoint === "desktop";
    const isLargeDesktop = breakpoint === "large-desktop";

    // Combined categories
    const isMobile = isSmallPhone || isNormalPhone;
    const isDesktopOrLarger = isDesktop || isLargeDesktop;

    // Orientation and other properties
    const orientation: "portrait" | "landscape" =
      height > width ? "portrait" : "landscape";
    const aspectRatio = width / height;

    // Touch detection (best guess based on mobile + touch support)
    const isTouch =
      isMobile || "ontouchstart" in window || navigator.maxTouchPoints > 0;

    return {
      width,
      height,
      breakpoint,
      isSmallPhone,
      isNormalPhone,
      isTablet,
      isDesktop,
      isLargeDesktop,
      isMobile,
      isDesktopOrLarger,
      orientation,
      aspectRatio,
      isTouch,
    };
  };

  useEffect(() => {
    // Update viewport on mount (client-side hydration)
    setViewport(calculateViewport());

    // Debounced resize handler for performance
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setViewport(calculateViewport());
      }, 100); // 100ms debounce
    };

    window.addEventListener("resize", handleResize);

    // Also listen to orientation change for mobile devices
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return viewport;
};

/**
 * Utility function to get breakpoint-specific values
 *
 * Usage:
 * const fontSize = getBreakpointValue(breakpoint, {
 *   'small-phone': '14px',
 *   'normal-phone': '16px',
 *   'tablet': '18px',
 *   'desktop': '20px',
 *   'large-desktop': '24px',
 * });
 */
export const getBreakpointValue = <T>(
  breakpoint: ViewportBreakpoint,
  values: Partial<Record<ViewportBreakpoint, T>>,
  fallback?: T
): T | undefined => {
  return values[breakpoint] ?? fallback;
};
