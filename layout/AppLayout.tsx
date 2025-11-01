import { memo, ReactNode } from "react";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/layout/header"), { ssr: false });
const Footer = dynamic(() => import("@/layout/footer"), { ssr: false });

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
