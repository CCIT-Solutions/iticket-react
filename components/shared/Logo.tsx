import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function Logo({ className }: Readonly<{ className?: string }>) {
  return (
    <Link href="/" className={cn("w-28 h-12 relative block", className)}>
      <Image
        src="/logo.png"
        alt="Logo"
        fill
        className="w-full h-full object-contain"
        priority 
        fetchPriority="high"
        decoding="async"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </Link>
  );
}

export default Logo;
