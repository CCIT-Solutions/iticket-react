"use client";
import { ReactNode, useEffect, useState } from "react";
import NoInternet from "@/components/shared/NoInternet";
import MinimalLayout from "./MinimalLayout";
import AppLayout from "./AppLayout";
import { useLanguageStore } from "@/stores/useLanguageStore";
import i18n from "@/i18n/i18n";
import Loading from "@/components/shared/Loading";
import dynamic from "next/dynamic";

const LazyLenis = dynamic(
  () => import("lenis/react").then((mod) => mod.ReactLenis),
  {
    ssr: false,
    loading: () => <></>,
  }
);

function MainLayout({
  children,
  minimal = false,
}: Readonly<{ children: ReactNode; minimal?: boolean }>) {
  const [isOnline, setIsOnline] = useState(true);
  const [isLanguageReady, setIsLanguageReady] = useState(false);

  const { lang } = useLanguageStore();

  useEffect(() => {
    const checkLanguageSync = () => {
      if (i18n.language === lang) {
        setIsLanguageReady(true);
      }
    };

    checkLanguageSync();

    const handleLanguageChanged = () => {
      checkLanguageSync();
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [lang]);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isLanguageReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!isOnline) return <NoInternet />;
  if (minimal) return <MinimalLayout>{children}</MinimalLayout>;

  return (
    <LazyLenis root>
      <AppLayout>{children}</AppLayout>
    </LazyLenis>
  );
}

export default MainLayout;
