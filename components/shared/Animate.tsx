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
    let mounted = true;

    import("framer-motion")
      .then((mod) => {
        if (mounted) setMotion(mod.motion as unknown as Record<string, ElementType>);
      })
      .catch(() => {
        if (mounted) setMotion(null);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // ✅ ensure valid tag always
  const MotionTag = useMemo<ElementType>(() => {
    if (!motion) return element;
    const tag = motion[element];
    return tag ?? element; // fallback in case of null
  }, [motion, element]);

  // ✅ render plain element if motion not yet loaded
  const ElementTag = MotionTag as ElementType;

  return (
    <ElementTag
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
    </ElementTag>
  );
}
