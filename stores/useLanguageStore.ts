import { create } from "zustand";

type Language = "en" | "ar";

interface LanguageStore {
  lang: Language;
  isRTL: boolean;
  setLang: (lang: Language) => void;
}

function getInitialLang(): Language {
  if (typeof window === "undefined") return "ar";
  const stored = localStorage.getItem("lang") as Language;
  return stored || "ar"; 
}

function isLanguageRTL(lang: Language): boolean {
  return lang === "ar";
}

export const useLanguageStore = create<LanguageStore>((set) => {
  const initialLang = getInitialLang();
  const initialRTL = isLanguageRTL(initialLang);

  return {
    lang: initialLang,
    isRTL: initialRTL,
    setLang: (lang) => {
      const rtl = isLanguageRTL(lang);

      if (typeof window !== "undefined") {
        localStorage.setItem("lang", lang);
        document.documentElement.setAttribute("lang", lang);
        document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
      }

      set({ lang, isRTL: rtl });
    },
  };
});