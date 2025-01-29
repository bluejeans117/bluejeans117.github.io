'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.4,
          ease: [0.645, 0.045, 0.355, 1.000], // Cubic bezier for smooth animation
        }
      }}
      exit={{ 
        opacity: 0,
        y: -10,
        transition: {
          duration: 0.3,
          ease: [0.645, 0.045, 0.355, 1.000],
        }
      }}
    >
      {children}
    </motion.div>
  );
}
