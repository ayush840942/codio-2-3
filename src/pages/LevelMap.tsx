
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { useIsMobile } from '@/hooks/use-mobile';
import SimpleLevelMap from '@/components/level-map/SimpleLevelMap';
import LoadingPage from '@/pages/LoadingPage';
import ResponsivePuzzleLayout from '@/components/ResponsivePuzzleLayout';

const LevelMap = () => {
  const { gameState, canAccessLevel } = useGame();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayLevel = (levelId: number) => {
    // Navigate to puzzle page regardless of access
    // The Puzzle page itself will handle the "Upgrade Required" screen if needed
    navigate(`/puzzle/${levelId}`);
  };

  if (isLoading) {
    return <LoadingPage message="Loading levels..." />;
  }

  const levels = gameState.levels || [];

  return (
    <ResponsivePuzzleLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <SimpleLevelMap
          levels={levels}
          canAccessLevel={canAccessLevel}
          onPlayLevel={handlePlayLevel}
        />
      </motion.div>
    </ResponsivePuzzleLayout>
  );
};

export default LevelMap;

