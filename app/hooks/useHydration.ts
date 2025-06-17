import { useEffect, useState } from "react";
import { useLanguageStore } from "@/app/store/language-store";
import { useThemeStore } from "@/app/store/theme-store";

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const setLanguageHydrated = useLanguageStore((state) => state.setHydrated);
  const setThemeHydrated = useThemeStore((state) => state.setHydrated);

  useEffect(() => {
    setIsHydrated(true);
    setLanguageHydrated(true);
    setThemeHydrated(true);
  }, [setLanguageHydrated, setThemeHydrated]);

  return isHydrated;
};
