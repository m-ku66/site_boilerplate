import { BaseComponentProps, AlignmentOption, SpacingSize } from "./common";

export interface SectionProps extends BaseComponentProps {
  id: string;
  minHeight?: string;
  maxWidth?: string;
  padding?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  textAlignment?: AlignmentOption;
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  style?: React.CSSProperties;
}

export interface SectionWrapperProps extends BaseComponentProps {
  enableScrollSnap?: boolean;
  snapDuration?: number;
  direction?: "vertical" | "horizontal";
  snapType?: "mandatory" | "proximity";
  style?: React.CSSProperties;
}

// Template-specific section types
export interface HeroSectionProps extends SectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaAction?: () => void;
  backgroundVideo?: string;
  overlayOpacity?: number;
}

export interface FeatureSectionProps extends SectionProps {
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  showIcons?: boolean;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
  link?: string;
}

export interface ContentSectionProps extends SectionProps {
  title?: string;
  content: string;
  imagePosition?: "left" | "right" | "top" | "bottom";
  imageUrl?: string;
  imageAlt?: string;
}
