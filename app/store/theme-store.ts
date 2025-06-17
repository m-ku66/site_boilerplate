import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeStore, DEFAULT_THEMES } from "@/app/types";

// Extended interface with hydration tracking and font cycling
interface ExtendedThemeStore extends ThemeStore {
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  setFont: (fontName: string) => void;
  cycleFont: () => void;
}

export const useThemeStore = create<ExtendedThemeStore>()(
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
      isHydrated: false, // Add hydration tracking

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

      // NEW: Set hydration state (prevents SSR mismatches)
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),

      // NEW: Set just the font without changing other theme properties
      setFont: (fontName) => {
        const state = get();

        // Don't update if not hydrated yet (prevents SSR mismatch)
        if (!state.isHydrated) {
          return;
        }

        // Load Google Font if it's not already loaded
        if (
          typeof window !== "undefined" &&
          !state.availableFonts.includes(fontName)
        ) {
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

        // Update the theme's typeface
        set((state) => ({
          currentTheme: { ...state.currentTheme, typeFace: fontName },
        }));
      },

      // NEW: Cycle through available fonts
      cycleFont: () => {
        const state = get();

        if (!state.isHydrated) {
          return; // Don't cycle if not hydrated yet
        }

        const currentIndex = state.availableFonts.indexOf(
          state.currentTheme.typeFace
        );
        const nextIndex = (currentIndex + 1) % state.availableFonts.length;
        const nextFont = state.availableFonts[nextIndex];

        // Use the setFont function to handle the update
        get().setFont(nextFont);
      },

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
