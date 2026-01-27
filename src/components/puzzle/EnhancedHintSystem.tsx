
import React from 'react';
import { motion } from 'framer-motion';
import SecureHintSystem from './SecureHintSystem';

interface EnhancedHintSystemProps {
  showHint: boolean;
  showSolution: boolean;
  hint: string;
  onToggleHint: () => void;
  onShowSolution: () => void;
  levelDifficulty: 'easy' | 'medium' | 'hard';
  currentPuzzle?: any;
  attempts?: number;
}

const EnhancedHintSystem: React.FC<EnhancedHintSystemProps> = (props) => {
  return (
    <div className="space-y-6">
      {/* Secure Hint System - No daily hints on puzzle pages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SecureHintSystem {...props} />
      </motion.div>
    </div>
  );
};

export default EnhancedHintSystem;
