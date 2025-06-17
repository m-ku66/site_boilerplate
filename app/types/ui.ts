type Theme = {
  name: string;
  backgroundColor: string;
  foregroundColor: string;
  accentColor: string;
  isTransitioning: boolean;
  transitionDuration: number;
};

type Font = {
  name: string;
};

export interface UIState {
  currentFont: Font;
  availableFonts: Font[];
  currentTheme: Theme;
  availableThemes: Record<string, Theme>;
  isModalOpen: boolean;
  isMenuOpen: boolean;
  isToastOpen: boolean;
}
