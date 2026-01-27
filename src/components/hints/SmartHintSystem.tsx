
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, X, Star, Clock, Target, BookOpen } from 'lucide-react';
import { useRewards } from '@/context/RewardsContext';
import { usePuzzleHints } from '@/hooks/usePuzzleHints';

interface Hint {
  id: string;
  type: 'encouragement' | 'direction' | 'specific' | 'solution';
  content: string;
  cost: number;
}

interface SmartHintSystemProps {
  levelId: number;
  attempts: number;
  timeSpent: number;
  levelDifficulty: 'easy' | 'medium' | 'hard';
  onHintUsed: (hint: Hint) => void;
  className?: string;
}

const SmartHintSystem: React.FC<SmartHintSystemProps> = ({
  levelId,
  attempts,
  timeSpent,
  levelDifficulty,
  onHintUsed,
  className = ""
}) => {
  const [showHints, setShowHints] = useState(false);
  const [showStruggleHelp, setShowStruggleHelp] = useState(false);
  const { rewards, useHints } = useRewards();
  const { hints, loading, getAvailableHints } = usePuzzleHints(levelId);

  const availableHints = getAvailableHints(attempts);

  // Show struggle help after certain conditions
  useEffect(() => {
    if (attempts >= 3 || timeSpent > 120) { // 2 minutes
      setShowStruggleHelp(true);
    }
  }, [attempts, timeSpent]);

  const handleUseHint = (hint: Hint) => {
    if (hint.cost === 0 || rewards.hintPoints >= hint.cost) {
      if (hint.cost > 0) {
        useHints(hint.cost);
      }
      onHintUsed(hint);
      setShowHints(false);
      setShowStruggleHelp(false);
    }
  };

  const getHintTypeIcon = (type: Hint['type']) => {
    switch (type) {
      case 'encouragement': return Star;
      case 'direction': return Target;
      case 'specific': return BookOpen;
      case 'solution': return Lightbulb;
    }
  };

  const getHintTypeColor = (type: Hint['type']) => {
    switch (type) {
      case 'encouragement': return 'text-yellow-600';
      case 'direction': return 'text-blue-600';
      case 'specific': return 'text-purple-600';
      case 'solution': return 'text-green-600';
    }
  };

  // Convert database hints to component format
  const convertToHint = (dbHint: any): Hint => ({
    id: dbHint.id,
    type: dbHint.hint_type,
    content: dbHint.content,
    cost: dbHint.cost
  });

  if (loading) {
    return (
      <div className={className}>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Struggle Help Prompt */}
      <AnimatePresence>
        {showStruggleHelp && !showHints && availableHints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="mb-4"
          >
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-yellow-800 mb-1">
                    Need some help?
                  </h4>
                  <p className="text-sm text-yellow-700 mb-3">
                    It looks like you might be stuck. Would you like a hint to help you progress?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setShowHints(true)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      Yes, show hints
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowStruggleHelp(false)}
                    >
                      No thanks
                    </Button>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowStruggleHelp(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint Button */}
      {!showStruggleHelp && availableHints.length > 0 && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setShowHints(true)}
            variant="outline"
            className="flex items-center gap-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50"
          >
            <Lightbulb className="w-4 h-4" />
            Get Hint ({availableHints.length} available)
            <Badge variant="secondary" className="ml-1">
              {rewards.hintPoints}
            </Badge>
          </Button>
        </motion.div>
      )}

      {/* Hints Modal */}
      <AnimatePresence>
        {showHints && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowHints(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-xl font-bold text-puzzle-gray">
                    Level {levelId} Hints
                  </h3>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowHints(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {availableHints.map((dbHint) => {
                  const hint = convertToHint(dbHint);
                  const IconComponent = getHintTypeIcon(hint.type);
                  const canAfford = hint.cost === 0 || rewards.hintPoints >= hint.cost;

                  return (
                    <motion.div
                      key={hint.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Card className={`p-4 cursor-pointer transition-all ${
                        canAfford 
                          ? 'hover:shadow-md border-puzzle-purple/20' 
                          : 'opacity-50 cursor-not-allowed'
                      }`}>
                        <div className="flex items-start gap-3">
                          <IconComponent className={`w-5 h-5 mt-0.5 ${getHintTypeColor(hint.type)}`} />
                          <div className="flex-1">
                            <p className="text-sm text-puzzle-gray mb-2">
                              {hint.content}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge 
                                variant="outline" 
                                className={hint.cost === 0 ? 'text-green-600 border-green-300' : ''}
                              >
                                {hint.cost === 0 ? 'Free' : `${hint.cost} hints`}
                              </Badge>
                              <Button
                                size="sm"
                                onClick={() => handleUseHint(hint)}
                                disabled={!canAfford}
                                className="bg-puzzle-purple hover:bg-puzzle-purple/90"
                              >
                                Use Hint
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}

                {availableHints.length === 0 && (
                  <div className="text-center py-8">
                    <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No hints available yet.</p>
                    <p className="text-sm text-gray-400">Try a few more times to unlock hints!</p>
                  </div>
                )}
              </div>

              <div className="mt-6 p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">
                  💡 Hint Balance: <strong>{rewards.hintPoints} points</strong>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Get more hints from the store or daily rewards
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartHintSystem;
