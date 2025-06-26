import { useEffect, useState } from "react";
import { useLanguageStore } from "@/app/store/language-store";

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const setLanguageHydrated = useLanguageStore((state) => state.setHydrated);

  useEffect(() => {
    setIsHydrated(true);
    setLanguageHydrated(true);
  }, [setLanguageHydrated]);

  return isHydrated;
};
