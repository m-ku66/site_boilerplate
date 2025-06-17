export type SupportedLanguage = "en" | "ja";

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export interface TranslationKeys {
  // Navigation
  home: string;
  about: string;
  services: string;
  contact: string;

  // Common UI
  loading: string;
  error: string;
  success: string;
  close: string;
  submit: string;
  cancel: string;

  // Sections (can be extended per template)
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };

  // Add more nested keys as needed for different templates
  [key: string]: any;
}

export interface LanguageStore {
  currentLanguage: SupportedLanguage;
  availableLanguages: LanguageOption[];
  translations: Record<SupportedLanguage, TranslationKeys>;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  loadTranslations: (language: SupportedLanguage) => Promise<void>;
}

export const AVAILABLE_LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
  },
];
