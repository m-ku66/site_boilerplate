import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeStore, DEFAULT_THEMES } from "@/app/types";

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      currentTheme: DEFAULT_THEMES.light,
      availableThemes: DEFAULT_THEMES,
      availableFonts: [
        "Inter",
        "Roboto",
        "Open Sans",
        "Lato",
        "Poppins",
        "Montserrat",
        "Source Sans Pro",
        "Nunito",
      ],

      setTheme: (themeName) => {
        const theme = get().availableThemes[themeName];
        if (theme) {
          set({ currentTheme: theme });
        }
      },

      updateTheme: (updates) =>
        set((state) => ({
          currentTheme: { ...state.currentTheme, ...updates },
        })),

      loadGoogleFont: (fontName) => {
        if (typeof window !== "undefined") {
          const link = document.createElement("link");
          link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
            " ",
            "+"
          )}:wght@300;400;500;600;700&display=swap`;
          link.rel = "stylesheet";
          document.head.appendChild(link);

          set((state) => ({
            availableFonts: [...new Set([...state.availableFonts, fontName])],
          }));
        }
      },
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({
        currentTheme: state.currentTheme,
        availableFonts: state.availableFonts,
      }),
    }
  )
);
