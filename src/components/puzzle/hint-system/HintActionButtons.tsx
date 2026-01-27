
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, Eye } from 'lucide-react';

interface HintActionButtonsProps {
  showHint: boolean;
  showSolution: boolean;
  hintPoints: number;
  hintCost: number;
  solutionCost: number;
  onHintClick: () => void;
  onSolutionClick: () => void;
}

const HintActionButtons: React.FC<HintActionButtonsProps> = ({
  showHint,
  showSolution,
  hintPoints,
  hintCost,
  solutionCost,
  onHintClick,
  onSolutionClick
}) => {
  return (
    <div className="w-full max-w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full">
        <Button
          onClick={onHintClick}
          className={`
            h-12 sm:h-14 flex flex-col items-center justify-center gap-1 rounded-xl font-semibold w-full
            ${showHint 
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : hintPoints >= hintCost
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                : 'bg-gray-100 text-gray-500 border-2 border-dashed border-gray-300'
            }
          `}
          disabled={hintPoints < hintCost && !showHint}
        >
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span className="text-xs sm:text-sm">{showHint ? 'Hide Hint' : 'Show Hint'}</span>
          </div>
          {!showHint && (
            <span className="text-xs opacity-80">
              {hintPoints >= hintCost ? `${hintCost} hints` : 'Need more hints'}
            </span>
          )}
        </Button>

        <Button
          onClick={onSolutionClick}
          className={`
            h-12 sm:h-14 flex flex-col items-center justify-center gap-1 rounded-xl font-semibold w-full
            ${hintPoints >= solutionCost && !showSolution
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
              : 'bg-gray-100 text-gray-500 border-2 border-dashed border-gray-300'
            }
          `}
          disabled={showSolution || hintPoints < solutionCost}
        >
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="text-xs sm:text-sm">{showSolution ? 'Solution Shown' : 'Show Solution'}</span>
          </div>
          {!showSolution && (
            <span className="text-xs opacity-80">
              {hintPoints >= solutionCost ? `${solutionCost} hints` : 'Need more hints'}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default HintActionButtons;
