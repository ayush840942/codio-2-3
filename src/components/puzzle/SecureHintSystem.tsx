
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Eye, Crown, Shield, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUnifiedHints } from '@/hooks/useUnifiedHints';
import SecureHintPurchaseModal from './SecureHintPurchaseModal';
import { toast } from 'sonner';

interface SecureHintSystemProps {
  showHint: boolean;
  showSolution: boolean;
  hint: string;
  onToggleHint: () => void;
  onShowSolution: () => void;
  levelDifficulty: 'easy' | 'medium' | 'hard';
  currentPuzzle?: any;
  attempts?: number;
}

const SecureHintSystem: React.FC<SecureHintSystemProps> = ({
  showHint,
  showSolution,
  hint: originalHint,
  onToggleHint,
  onShowSolution,
  levelDifficulty,
  currentPuzzle,
  attempts = 0
}) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const levelId = currentPuzzle?.id || 1;

  const {
    hints,
    canAffordHint,
    purchaseHint,
    isHintPurchased,
    getHintByType,
    hintPoints
  } = useUnifiedHints(levelId, levelDifficulty, currentPuzzle, attempts);

  const hintData = getHintByType('hint');
  const solutionData = getHintByType('solution');

  const handleHintClick = async () => {
    if (showHint) {
      onToggleHint();
      return;
    }

    if (!hintData) {
      toast.error('Hint not available for this level');
      return;
    }

    // If already purchased, just show it
    if (isHintPurchased(hintData)) {
      onToggleHint();
      return;
    }

    // Check if user can afford the hint
    if (canAffordHint(hintData)) {
      const success = await purchaseHint(hintData);
      if (success) {
        onToggleHint();
        toast.success(`Hint unlocked! (${hintData.cost} points)`);
      } else {
        toast.error('Failed to unlock hint');
      }
    } else {
      setShowPurchaseModal(true);
    }
  };

  const handleSolutionClick = async () => {
    if (showSolution) {
      return;
    }

    if (!solutionData) {
      toast.error('Solution not available for this level');
      return;
    }

    if (isHintPurchased(solutionData)) {
      onShowSolution();
      return;
    }

    if (canAffordHint(solutionData)) {
      const success = await purchaseHint(solutionData);
      if (success) {
        onShowSolution();
        toast.success('Solution unlocked!');
      } else {
        toast.error('Failed to unlock solution');
      }
    } else {
      setShowPurchaseModal(true);
    }
  };

  const getHintContent = () => {
    if (!hintData) return originalHint;
    return isHintPurchased(hintData) ? hintData.content : originalHint;
  };

  const getSolutionContent = () => {
    if (!solutionData) return "Solution not available";
    return isHintPurchased(solutionData) ? solutionData.content : "Solution locked";
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Card className="w-full bg-gradient-to-br from-white via-violet-50/30 to-purple-50/30 backdrop-blur-sm border-2 border-violet-200/50 shadow-xl">
          <CardHeader className="pb-3 px-3 sm:px-6">
            <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2 flex-wrap">
              <div className="w-6 h-6 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                <Lightbulb className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm sm:text-lg">Secure Hints & Solutions</span>
              <Badge className="ml-auto bg-violet-100 text-violet-700 text-xs flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {hintPoints} 💎
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 px-3 sm:px-6">
            {/* Hint Display */}
            {showHint && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 sm:p-4 rounded-lg border border-blue-200 w-full overflow-x-hidden">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-blue-800 mb-2">Helpful Hint:</h4>
                    <p className="text-sm text-blue-700 leading-relaxed whitespace-pre-wrap break-words">
                      {getHintContent()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Solution Display */}
            {showSolution && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 sm:p-4 rounded-lg border border-purple-200 w-full overflow-x-hidden">
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-purple-800 mb-2">Complete Solution:</h4>
                    <pre className="text-sm text-purple-700 font-mono bg-white/60 p-3 rounded border overflow-x-auto whitespace-pre-wrap break-words">
                      {getSolutionContent()}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full">
                <Button
                  onClick={handleHintClick}
                  className={`
                    h-12 sm:h-14 flex flex-col items-center justify-center gap-1 rounded-xl font-semibold w-full
                    ${showHint
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : (hintData && (isHintPurchased(hintData) || canAffordHint(hintData)))
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                        : 'bg-gray-100 text-gray-500 border-2 border-dashed border-gray-300'
                    }
                  `}
                  disabled={hintData && !isHintPurchased(hintData) && !canAffordHint(hintData) && !showHint}
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    <span className="text-xs sm:text-sm">{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                  </div>
                  {!showHint && hintData && (
                    <span className="text-xs opacity-80">
                      {isHintPurchased(hintData) ? 'Purchased' : canAffordHint(hintData) ? `${hintData.cost} hints` : 'Need more hints'}
                    </span>
                  )}
                </Button>

                <Button
                  onClick={handleSolutionClick}
                  className={`
                    h-12 sm:h-14 flex flex-col items-center justify-center gap-1 rounded-xl font-semibold w-full
                    ${solutionData && (isHintPurchased(solutionData) || canAffordHint(solutionData)) && !showSolution
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                      : 'bg-gray-100 text-gray-500 border-2 border-dashed border-gray-300'
                    }
                  `}
                  disabled={showSolution || !solutionData || (!isHintPurchased(solutionData) && !canAffordHint(solutionData))}
                >
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span className="text-xs sm:text-sm">{showSolution ? 'Solution Shown' : 'Show Solution'}</span>
                  </div>
                  {!showSolution && solutionData && (
                    <span className="text-xs opacity-80">
                      {isHintPurchased(solutionData) ? 'Purchased' : canAffordHint(solutionData) ? `${solutionData.cost} hints` : 'Need more hints'}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <SecureHintPurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onHintsPurchased={(amount) => {
          console.log(`Received ${amount} hints from secure purchase`);
          setShowPurchaseModal(false);
        }}
      />
    </div>
  );
};

export default SecureHintSystem;
