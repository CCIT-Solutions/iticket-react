"use client";

import React, {
  useEffect,
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
  const [MotionComponent, setMotionComponent] = useState<ElementType | null>(null);

  useEffect(() => {
    let mounted = true;

    import("framer-motion")
      .then((mod) => {
        if (mounted) {
          const motionElement = mod.motion[element];
          if (motionElement) {
            setMotionComponent(() => motionElement);
          }
        }
      })
      .catch(() => {
        if (mounted) setMotionComponent(null);
      });

    return () => {
      mounted = false;
    };
  }, [element]);

  // Render plain HTML element while motion is loading
  if (!MotionComponent) {
    const Element = element;
    return (
      <Element className={className} style={style}>
        {children}
      </Element>
    );
  }

  // Render motion component with all animation props
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