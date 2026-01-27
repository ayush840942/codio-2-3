
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PuzzleDropZone from './PuzzleDropZone';
import SecureHintSystem from './SecureHintSystem';
import { PuzzleBlockData } from '@/components/PuzzleBlock';
import { ArrowRight, CheckCircle2, Play, RefreshCcw, Zap } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface PuzzleSolutionAreaProps {
  placedBlocks: PuzzleBlockData[];
  feedback: 'correct' | 'incorrect' | null;
  showHint: boolean;
  showSolution: boolean;
  hint: string;
  onRemoveBlock: (index: number) => void;
  onReset: () => void;
  onToggleHint: () => void;
  onVerifySolution: () => void;
  onShowSolution: () => void;
  onRunCode?: () => void;
  xpReward: number;
  topic: string;
  attempts: number;
  codeOutput: string | null;
  difficulty: 'easy' | 'medium' | 'hard';
  currentPuzzle?: any;
}

const PuzzleSolutionArea = ({
  placedBlocks,
  feedback,
  showHint,
  showSolution,
  hint,
  onRemoveBlock,
  onReset,
  onToggleHint,
  onVerifySolution,
  onShowSolution,
  onRunCode,
  xpReward,
  topic,
  attempts,
  codeOutput,
  difficulty,
  currentPuzzle
}: PuzzleSolutionAreaProps) => {
  const { playButtonPress } = useSoundEffects();

  const handleRunCode = () => {
    playButtonPress();
    onRunCode?.();
  };

  const handleVerify = () => {
    playButtonPress();
    onVerifySolution();
  };

  const handleReset = () => {
    playButtonPress();
    onReset();
  };

  return (
    <div className="space-y-3 sm:space-y-4 w-full max-w-full overflow-x-hidden">
      {/* Solution Workspace */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-blue-200/50 shadow-xl overflow-hidden w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-6 pt-3 sm:pt-6 pb-2 gap-2">
          <h3 className="font-bold text-base sm:text-lg text-gray-800 flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-sm sm:text-lg">💡</span>
            </div>
            <span className="text-sm sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Solution
            </span>
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="text-xs sm:text-sm text-gray-600 font-medium">
              Attempts: {attempts}
            </div>
            <div className="text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full border border-blue-200">
              {topic} • {xpReward} XP
            </div>
          </div>
        </div>
        
        <div className="px-3 sm:px-6 w-full">
          <PuzzleDropZone 
            placedBlocks={placedBlocks} 
            onRemoveBlock={onRemoveBlock}
            codeOutput={codeOutput}
            feedback={feedback}
          />
        </div>
        
        <Separator className="mx-3 sm:mx-6" />
        
        <div className="p-3 sm:p-6 space-y-3 sm:space-y-4 w-full">
          {/* Action Buttons - Enhanced Mobile Design */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
            <Button 
              size="sm"
              className="h-10 sm:h-12 md:h-14 gap-1 sm:gap-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border-2 border-gray-300 text-xs sm:text-sm font-semibold rounded-xl sm:rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95"
              onClick={handleReset}
            >
              <RefreshCcw className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" /> 
              <span className="hidden sm:inline">Reset</span>
            </Button>
            
            <Button 
              size="sm"
              className="h-10 sm:h-12 md:h-14 gap-1 sm:gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 text-xs sm:text-sm font-semibold rounded-xl sm:rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95"
              onClick={handleRunCode}
            >
              <Play className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" /> 
              <span className="hidden sm:inline">Run</span>
            </Button>

            <Button 
              onClick={handleVerify} 
              disabled={placedBlocks.length === 0}
              className="h-10 sm:h-12 md:h-14 gap-1 sm:gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold rounded-xl sm:rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95"
            >
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              <span className="hidden sm:inline">Verify</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Unified Hint System */}
      <div className="w-full">
        <SecureHintSystem
          showHint={showHint}
          showSolution={showSolution}
          hint={hint}
          onToggleHint={onToggleHint}
          onShowSolution={onShowSolution}
          levelDifficulty={difficulty}
          currentPuzzle={currentPuzzle}
          attempts={attempts}
        />
      </div>
    </div>
  );
};

export default PuzzleSolutionArea;
