import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import SimpleLevelMap from '@/components/level-map/SimpleLevelMap';

const LevelMap = () => {
  const { gameState, canAccessLevel } = useGame();
  const navigate = useNavigate();

  const handlePlayLevel = (levelId: number) => {
    navigate(`/puzzle/${levelId}`);
  };

  const levels = gameState.levels || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="bg-[#FDFBF7] min-h-[100dvh] pb-24 border-none border-0 m-0 p-0 shadow-none ring-0 outline-none block w-full absolute top-0 left-0 pt-[var(--safe-area-top)] pr-[var(--safe-area-right)] pl-[var(--safe-area-left)] pb-[var(--safe-area-bottom)] box-border">
        <SimpleLevelMap
          levels={levels}
          canAccessLevel={canAccessLevel}
          onPlayLevel={handlePlayLevel}
        />
      </div>
    </motion.div>
  );
};

export default LevelMap;

