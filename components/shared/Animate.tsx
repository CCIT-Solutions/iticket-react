"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type ElementType,
} from "react";
import type {
  MotionStyle,
  TargetAndTransition,
  VariantLabels,
  Variants,
  MotionProps,
} from "framer-motion";

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

// ✅ explicitly type what `motionPromise` resolves to
const motionPromise: Promise<Record<string, ElementType>> = import(
  "framer-motion"
).then((mod) => mod.motion as unknown as Record<string, ElementType>);

interface AnimateProps extends MotionProps {
  children?: ReactNode;
  variants: Variants;
  element?: MotionElementTag;
  className?: string;
  viewOnce?: boolean;
  style?: MotionStyle;
  animate?: boolean | TargetAndTransition | VariantLabels;
  exit?: TargetAndTransition | VariantLabels;
  transition?: TargetAndTransition["transition"];
}

/**
 * Animate wrapper that lazy-loads Framer Motion only when needed.
 * ✅ Fully typed
 * ✅ SSR safe
 * ✅ Zero hydration mismatch risk
 */
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
  ...props
}: AnimateProps) {
  const [motion, setMotion] = useState<Record<string, ElementType> | null>(null);

  useEffect(() => {
    motionPromise.then((m) => setMotion(m));
  }, []);

  const MotionTag = useMemo(
    () => (motion ? (motion[element] as ElementType) : element),
    [motion, element]
  );

  // fallback to plain element before motion loads
  if (!motion) return React.createElement(element, { className, style }, children);

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
      {...props}
    >
      {children}
    </MotionTag>
  );
}
