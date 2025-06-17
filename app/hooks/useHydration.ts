import { useEffect, useState } from "react";
import { useLanguageStore } from "@/app/store/language-store";

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const setStoreHydrated = useLanguageStore((state) => state.setHydrated);

  useEffect(() => {
    setIsHydrated(true);
    setStoreHydrated(true);
  }, [setStoreHydrated]);

  return isHydrated;
};
