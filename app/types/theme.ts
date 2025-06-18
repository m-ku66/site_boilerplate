export interface ThemeData {
  name: string;
  typeFace: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  foregroundColor: string;
}

export interface ThemeStore {
  currentTheme: ThemeData;
  availableThemes: Record<string, ThemeData>;
  availableFonts: string[];
  setTheme: (themeName: string) => void;
  updateTheme: (updates: Partial<ThemeData>) => void;
  loadGoogleFont: (fontName: string) => void;
}

// Default themes for quick setup
export const DEFAULT_THEMES: Record<string, ThemeData> = {
  light: {
    name: "light",
    typeFace: "Inter",
    primaryColor: "#000000",
    secondaryColor: "#D3D3D3",
    accentColor: "#0066cc",
    backgroundColor: "#ffffff",
    foregroundColor: "#000000",
  },
  dark: {
    name: "dark",
    typeFace: "Inter",
    primaryColor: "#ffffff",
    secondaryColor: "#cccccc",
    accentColor: "#4d9eff",
    backgroundColor: "#1a1a1a",
    foregroundColor: "#ffffff",
  },
};
