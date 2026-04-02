import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC = () => {
  return (
    <motion.div 
      className="flex items-center"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src="/images/exytex-logo.png" 
          alt="Exytex Technologies Logo" 
          className="h-10 w-auto object-contain"
        />
      </motion.div>
    </motion.div>
  );
};
