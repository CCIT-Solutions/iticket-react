"use client";

import Translate from "@/components/shared/Translate";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const headerLinks = [
  { label: <Translate text="header.home" />, href: "/" },
  { label: <Translate text="header.features" />, href: "/#features" },
  { label: <Translate text="header.pricing" />, href: "/pricing" },
  { label: <Translate text="header.contact" />, href: "/contact" },
];

interface HeaderLinksProps {
  className?: string;
  phone?: boolean;
  toggle?: () => void;
}

function HeaderLinks({ className, phone, toggle }: HeaderLinksProps) {
  const router = useRouter();

  const handleRedirect = (href: string) => {
     router.push(href);
    if (toggle) toggle();
   
  };

  return (
    <nav
      className={cn(
        "flex",
        phone ? "flex-col items-center gap-8" : "space-x-10",
        className
      )}
    >
      {headerLinks.map(({ label, href }, i) => (
        <button
          key={i}
          onClick={() => handleRedirect(href)}
          className={cn(
            "text-neutral-800 font-medium transition-colors hover:text-secondary",
            phone ? "text-xl" : "text-sm"
          )}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

export default HeaderLinks;
