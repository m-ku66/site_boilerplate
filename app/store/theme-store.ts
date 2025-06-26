import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  AVAILABLE_FONTS,
  DEFAULT_THEMES,
  ThemeStore,
  ThemeData,
} from "@/app/types";

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      currentTheme: DEFAULT_THEMES.light,
      availableThemes: DEFAULT_THEMES,
      availableFonts: AVAILABLE_FONTS,

      // Simple theme switching - no complexity!
      setTheme: (themeName) => {
        const theme = get().availableThemes[themeName];
        if (theme) {
          set({ currentTheme: theme });
        }
      },

      // Update any theme properties
      updateTheme: (updates) =>
        set((state) => ({
          currentTheme: { ...state.currentTheme, ...updates },
        })),

      // Set font by className - super simple!
      setFont: (fontClassName) => {
        const font = AVAILABLE_FONTS.find((f) => f.className === fontClassName);
        if (font) {
          set((state) => ({
            currentTheme: {
              ...state.currentTheme,
              typeFaceClass: font.className,
              typeFaceName: font.name,
            },
          }));
        }
      },

      // Cycle through fonts - no DOM manipulation needed!
      cycleFont: () => {
        const state = get();
        const currentIndex = AVAILABLE_FONTS.findIndex(
          (font) => font.className === state.currentTheme.typeFaceClass
        );
        const nextIndex = (currentIndex + 1) % AVAILABLE_FONTS.length;
        const nextFont = AVAILABLE_FONTS[nextIndex];

        set((state) => ({
          currentTheme: {
            ...state.currentTheme,
            typeFaceClass: nextFont.className,
            typeFaceName: nextFont.name,
          },
        }));
      },
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({
        currentTheme: state.currentTheme,
        // No need to persist availableFonts since they're static
      }),
    }
  )
);
