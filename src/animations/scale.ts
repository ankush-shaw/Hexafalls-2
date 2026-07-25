import { Variants } from 'framer-motion';

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};

export const hoverScale = (scale = 1.02, duration = 0.2) => ({
  whileHover: {
    scale,
    transition: { duration, ease: 'easeOut' },
  },
  whileTap: {
    scale: 0.98,
  },
});
