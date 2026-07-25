import { Variants, AnimationGeneratorType } from 'framer-motion';

export const slideIn = (
  direction: 'up' | 'down' | 'left' | 'right',
  type: AnimationGeneratorType = 'tween',
  delay = 0,
  duration = 0.4
): Variants => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
  },
  visible: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
  exit: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
    transition: {
      duration,
      ease: 'easeIn',
    },
  },
});
