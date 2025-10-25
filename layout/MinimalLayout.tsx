import { memo, ReactNode } from "react";
import Header from "@/layout/header";
import Footer from "@/layout/footer";

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
