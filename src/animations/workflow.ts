import { Variants } from 'framer-motion';

export const nodePulse: Variants = {
  idle: {
    scale: 1,
    boxShadow: '0 0 0 0px rgba(99, 102, 241, 0)',
  },
  running: {
    scale: [1, 1.02, 1],
    boxShadow: [
      '0 0 0 0px rgba(99, 102, 241, 0.4)',
      '0 0 0 10px rgba(99, 102, 241, 0)',
      '0 0 0 0px rgba(99, 102, 241, 0)',
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  completed: {
    scale: 1,
    boxShadow: '0 0 0 0px rgba(34, 197, 94, 0)',
  },
  failed: {
    scale: [1, 0.98, 1],
    boxShadow: [
      '0 0 0 0px rgba(239, 68, 68, 0.5)',
      '0 0 0 8px rgba(239, 68, 68, 0)',
      '0 0 0 0px rgba(239, 68, 68, 0)',
    ],
    transition: {
      duration: 1,
      repeat: 3,
      ease: 'easeInOut',
    },
  },
};

export const linkLineStroke: Variants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 1, ease: 'easeInOut' },
  },
};
