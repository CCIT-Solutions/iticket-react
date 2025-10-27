"use client";
import { type ReactNode, useEffect, useMemo, useState } from "react";

const motionPromise = import("framer-motion").then((mod) => mod.motion);

type MotionElementTag =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "main"
  | "nav"
  | "p"
  | "span"
  | "a"
  | "button"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

interface AnimateProps {
  children?: ReactNode;
  variants: any;
  element?: MotionElementTag;
  className?: string;
  viewOnce?: boolean;
  style?: React.CSSProperties;
  animate?: any;
  exit?: any;
  transition?: any;
}

export default function Animate({
  children,
  variants,
  element = "div",
  className,
  viewOnce = false,
  style,
  animate,
  exit,
  transition,
}: AnimateProps) {
  const [motion, setMotion] = useState<any>(null);

  useEffect(() => {
    motionPromise.then(setMotion);
  }, []);

  const MotionTag = useMemo(() => motion?.[element] || "div", [motion, element]);

  if (!motion) return <div className={className}>{children}</div>; // fallback: plain div

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      exit={exit}
      viewport={{ once: viewOnce }}
      variants={variants}
      className={className}
      style={style}
      animate={animate}
      transition={transition}
    >
      {children}
    </MotionTag>
  );
}
