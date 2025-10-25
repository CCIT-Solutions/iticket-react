import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}

const Container = ({
  children,
  className = "",
  maxWidth = "max-w-[1200px] lg-w-[1200px]",
}: ContainerProps) => {
  return (
    <div className={cn(`mx-auto px-4 sm:px-6 lg:px-8 `, maxWidth, className)}>
      {children}
    </div>
  );
};
export default Container;
