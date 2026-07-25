import { Variants } from 'framer-motion';

export const drawerVariants = (placement: 'right' | 'left' = 'right'): Variants => {
  return {
    hidden: {
      x: placement === 'right' ? '100%' : '-100%',
    },
    visible: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      x: placement === 'right' ? '100%' : '-100%',
      transition: {
        type: 'tween',
        duration: 0.25,
        ease: 'easeIn',
      },
    },
  };
};
