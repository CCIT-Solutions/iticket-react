"use client";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useEffect, useState } from "react";
import { useLang } from "@/hooks/useLang";
import Global from "../icons/Global";

function LangSwitcher() {
  const { lang, setLang } = useLanguageStore();
  const { i18n } = useLang();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const nextLang = lang === "ar" ? "en" : "ar";
  const currentLanguageText = lang === "ar" ? "English" : "العربية";

  function toggleLang() {
    setLang(nextLang);
    i18n.changeLanguage(nextLang);
  }

  // Show a placeholder during SSR to prevent hydration mismatch
  if (!isMounted) {
    return (
      <Button
        variant="noStyle"
        className="h-auto border-0 p-0 hover:!bg-transparent"
        disabled
      >
        <div className="rounded uppercase hover:text-primary transition-colors cursor-pointer"></div>
      </Button>
    );
  }

  return (
    <Button
      variant="noStyle"
      className="cursor-pointer !p-0 h-auto block"
      onClick={toggleLang}
      title={currentLanguageText}
    >
      <Global className="size-5" />
      {/* <div className="rounded uppercase hover:text-primary transition-colors">{currentLanguageText}</div> */}
    </Button>
  );
}

export default LangSwitcher;
