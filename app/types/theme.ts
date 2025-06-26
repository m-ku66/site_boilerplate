export interface ThemeData {
  name: string;
  typeFaceClass: string;
  typeFaceName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  foregroundColor: string;
}

// Font configuration with display names and CSS classes
export const AVAILABLE_FONTS = [
  { name: "Inter", className: "font-inter" },
  { name: "Roboto", className: "font-roboto" },
  { name: "Open Sans", className: "font-open-sans" },
  { name: "Lato", className: "font-lato" },
  { name: "Montserrat", className: "font-montserrat" },
  { name: "Source Sans Pro", className: "font-source-sans" },
  { name: "Raleway", className: "font-raleway" },
  { name: "Nunito", className: "font-nunito" },
  { name: "Poppins", className: "font-poppins" },
  { name: "Playfair Display", className: "font-playfair" },
] as const;

export interface ThemeStore {
  currentTheme: ThemeData;
  availableThemes: Record<string, ThemeData>;
  availableFonts: typeof AVAILABLE_FONTS;
  setTheme: (themeName: string) => void;
  updateTheme: (updates: Partial<ThemeData>) => void;
  setFont: (fontClassName: string) => void;
  cycleFont: () => void;
}

// Clean, simple default themes
export const DEFAULT_THEMES: Record<string, ThemeData> = {
  light: {
    name: "light",
    typeFaceClass: "font-inter",
    typeFaceName: "Inter",
    primaryColor: "#000000",
    secondaryColor: "#D3D3D3",
    accentColor: "#0066cc",
    backgroundColor: "#ffffff",
    foregroundColor: "#000000",
  },
  dark: {
    name: "dark",
    typeFaceClass: "font-inter",
    typeFaceName: "Inter",
    primaryColor: "#ffffff",
    secondaryColor: "#cccccc",
    accentColor: "#4d9eff",
    backgroundColor: "#1a1a1a",
    foregroundColor: "#ffffff",
  },
};
