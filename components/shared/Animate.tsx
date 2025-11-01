"use client";

import React, { type ReactNode, type ElementType, type CSSProperties } from "react";
import { motion, type MotionProps, type Variants, type MotionStyle, type TargetAndTransition, type VariantLabels } from "framer-motion";

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

interface AnimateProps extends Omit<MotionProps, 'animate'> {
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
  // Dynamically get motion element from framer-motion
  const MotionComponent = motion[element] as ElementType;

  return (
    <MotionComponent
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
    </MotionComponent>
  );
}
