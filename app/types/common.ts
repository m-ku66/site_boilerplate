import { ReactNode } from "react";

// Base component props that most components will extend
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  id?: string;
}

// Viewport size detection
export type ViewportSize = "mobile" | "tablet" | "desktop";

export interface ViewportInfo {
  size: ViewportSize;
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// Animation configs for motion components
export interface AnimationConfig {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  delay?: number;
}

// Common spacing and sizing options
export type SpacingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AlignmentOption = "left" | "center" | "right";
export type VerticalAlignment = "top" | "center" | "bottom";

// Image props for consistent image handling
export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}
