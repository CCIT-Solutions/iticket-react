import { memo, ReactNode } from "react";
import dynamic from "next/dynamic";

// Dynamically import Header and Footer
const Header = dynamic(() => import("@/layout/header"), { ssr: true });
const Footer = dynamic(() => import("@/layout/footer"), { ssr: true });

function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="relative">
      <Header />
      {children}
      <Footer />
    </main>
  );
}

export default memo(AppLayout);
