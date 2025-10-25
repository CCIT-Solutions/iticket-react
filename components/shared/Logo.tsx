import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function Logo({ className }: Readonly<{ className?: string }>) {
  return (
    <div
      className={cn("w-28 h-12 relative", className)}
    >
      <Link href="/" className="w-full h-full">
        <Image
          src="/logo.png"
          alt="Logo"
          fill
          className="w-full h-full object-contain"
          priority={true}
          decoding="async"
        />
      </Link>
    </div>
  );
}

export default Logo;
