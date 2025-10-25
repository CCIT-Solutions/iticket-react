import { memo, ReactNode } from "react";
import Header from "@/layout/header";
import Footer from "@/layout/footer";

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
