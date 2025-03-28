'use client';

import { motion } from 'framer-motion';
import styles from './AnimatedTitle.module.css';

export const AnimatedTitle = () => {
  return (
    <motion.div 
      className={styles.titleContainer}
      initial={{ opacity: 0, y: '50vh' }}
      animate={{ 
        opacity: 1, 
        y: 0
      }}
      transition={{
        duration: 1.5,
        ease: "easeOut"
      }}
    >
      <motion.h1 
        className={styles.title}
        initial={{ scale: 1 }}
        animate={{ 
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 0.5,
          times: [0, 0.5, 1],
          delay: 1.5,
          ease: "easeInOut"
        }}
      >
        Find Natalia&apos;s New Home
      </motion.h1>
    </motion.div>
  );
}; 