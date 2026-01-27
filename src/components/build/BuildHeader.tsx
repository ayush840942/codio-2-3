
import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const BuildHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="text-center mb-4"
    >
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
        <Code2 className="w-6 h-6 md:w-10 md:h-10 text-blue-600" />
        Web Builder
      </h1>
      <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto px-2">
        Create beautiful web pages with HTML, CSS, and JavaScript. 
        See your changes in real-time!
      </p>
    </motion.div>
  );
};

export default BuildHeader;
