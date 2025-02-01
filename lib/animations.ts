import { type TargetAndTransition, type Transition } from "framer-motion";

// Enhanced button interactions
export const buttonHoverAnimation: TargetAndTransition = {
  scale: 1.02,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10
  }
};

export const buttonTapAnimation: TargetAndTransition = {
  scale: 0.98,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10
  }
};

export const buttonHoverTapAnimation = {
  whileHover: buttonHoverAnimation,
  whileTap: buttonTapAnimation,
};

// Fade and slide animations
export const fadeInUp: TargetAndTransition = {
  opacity: 1,
  y: 0,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 30
  }
};

export const fadeInUpInitial = {
  opacity: 0,
  y: 10
};

// Loading spinner animation
export const spinTransition: Transition = {
  repeat: Infinity,
  ease: "linear",
  duration: 1
};

// Pop in animation for elements
export const popIn: TargetAndTransition = {
  scale: [0, 1.1, 1],
  opacity: [0, 1],
  transition: {
    duration: 0.4,
    ease: [0.23, 1.12, 0.25, 1]
  }
};

// Slide animations for modals and drawers
export const slideIn = (direction: "left" | "right" | "top" | "bottom"): TargetAndTransition => {
  const transitions = {
    left: { x: ["100%", "0%"] },
    right: { x: ["-100%", "0%"] },
    top: { y: ["100%", "0%"] },
    bottom: { y: ["-100%", "0%"] }
  };

  return {
    ...transitions[direction],
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  };
};

// Spring transition preset
export const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30
};

export const scaleUp: TargetAndTransition = {
  scale: 1.02,
  transition: {
    duration: 0.2,
    ease: "easeInOut"
  }
};

export const pressDown: TargetAndTransition = {
  scale: 0.95,
  transition: {
    duration: 0.1,
    ease: "easeInOut"
  }
};