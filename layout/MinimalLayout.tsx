import dynamic from "next/dynamic";
import { memo, ReactNode } from "react";

const Header = dynamic(() => import("@/layout/header"), { ssr: true });
const Footer = dynamic(() => import("@/layout/footer"), { ssr: true });

function MinimalLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="relative">
      <Header className="static"/>
      {children}
      <Footer minimal={true} />
    </main>
  );
}

export default memo(MinimalLayout);
