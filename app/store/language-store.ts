import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  LanguageStore,
  AVAILABLE_LANGUAGES,
  SupportedLanguage,
} from "@/app/types";

// First, extend the LanguageStore interface
interface ExtendedLanguageStore extends LanguageStore {
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
}

export const useLanguageStore = create<ExtendedLanguageStore>()(
  persist(
    (set, get) => ({
      currentLanguage: "en",
      availableLanguages: AVAILABLE_LANGUAGES,
      isHydrated: false, // Add hydration tracking
      translations: {
        en: {
          home: "Home",
          about: "About",
          services: "Services",
          contact: "Contact",
          loading: "Loading...",
          error: "Error",
          success: "Success",
          close: "Close",
          submit: "Submit",
          cancel: "Cancel",
          hero: {
            title: "Welcome",
            subtitle: "Build something amazing",
            cta: "Get Started",
          },
        },
        ja: {
          home: "ホーム",
          about: "私たちについて",
          services: "サービス",
          contact: "お問い合わせ",
          loading: "読み込み中...",
          error: "エラー",
          success: "成功",
          close: "閉じる",
          submit: "送信",
          cancel: "キャンセル",
          hero: {
            title: "ようこそ",
            subtitle: "素晴らしいものを作りましょう",
            cta: "始める",
          },
        },
      },

      setLanguage: (language) => set({ currentLanguage: language }),
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),

      t: (key, fallback) => {
        const state = get();

        // IMPORTANT: If not hydrated yet, always return fallback or default English
        if (!state.isHydrated) {
          return fallback || key;
        }

        const keys = key.split(".");
        let value: any = state.translations[state.currentLanguage];

        for (const k of keys) {
          value = value?.[k];
        }

        return value || fallback || key;
      },

      loadTranslations: async (language) => {
        try {
          const response = await fetch(`/api/translations/${language}`);
          const translations = await response.json();

          set((state) => ({
            translations: {
              ...state.translations,
              [language]: translations,
            },
          }));
        } catch (error) {
          console.warn(`Failed to load translations for ${language}`);
        }
      },
    }),
    {
      name: "language-storage",
      partialize: (state) => ({
        currentLanguage: state.currentLanguage,
      }),
    }
  )
);
