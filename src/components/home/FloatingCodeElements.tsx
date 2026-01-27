import React from 'react';
import { motion } from 'framer-motion';

const FloatingCodeElements = () => {
  const codeElements = [
    { text: 'const', color: 'text-blue-400/30' },
    { text: '( )', color: 'text-yellow-400/20' },
    { text: '{ }', color: 'text-purple-400/25' },
    { text: '=>', color: 'text-green-400/20' },
    { text: '</>', color: 'text-pink-400/25' },
    { text: '[]', color: 'text-orange-400/20' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {codeElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute font-mono text-2xl ${element.color} font-bold`}
          style={{
            top: `${15 + index * 15}%`,
            left: index % 2 === 0 ? `${5 + index * 5}%` : `${75 + index * 3}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            delay: index * 0.8,
            ease: "easeInOut",
          }}
        >
          {element.text}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCodeElements;
