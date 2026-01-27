
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Play, RefreshCcw, Zap, Code, Home } from 'lucide-react';
import { PuzzleBlockData } from '@/components/PuzzleBlock';
import { motion } from 'framer-motion';
import Logo from '@/components/ui/logo';

type PuzzleHeaderProps = {
  level: any;
  attempts: number;
  feedback: 'correct' | 'incorrect' | null;
  onVerify: () => void;
  onShowSolution: () => void;
  onReset: () => void;
  onRunCode: () => void;
  showSolution: boolean;
  placedBlocks: PuzzleBlockData[];
};

const PuzzleHeader = ({
  level,
  attempts,
  feedback,
  onVerify,
  onShowSolution,
  onReset,
  onRunCode,
  showSolution,
  placedBlocks
}: PuzzleHeaderProps) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-xl rounded-3xl border border-indigo-100/50 shadow-2xl p-4 md:p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Mobile-first header layout */}
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        {/* Left side - Logo, Navigation and Level Info */}
        <div className="flex items-center space-x-3">
          <Logo size="sm" showText={false} className="flex-shrink-0" />
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="h-10 w-10 rounded-2xl bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-indigo-600 border-0 shadow-lg"
            >
              <Home className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/levels')}
              className="h-10 w-10 rounded-2xl bg-gradient-to-r from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 text-blue-600 border-0 shadow-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex flex-col min-w-0">
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">
              {level?.title || `Level ${level?.id}`}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Badge variant="secondary" className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-0">
                {level?.topic || 'Coding'}
              </Badge>
              <span>•</span>
              <span>{level?.difficulty || 'Easy'}</span>
            </div>
          </div>
        </div>

        {/* Right side - Progress and Actions */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          {/* Progress indicators */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 hidden sm:inline">Attempts:</span>
              <Badge variant={attempts > 3 ? "destructive" : "default"} className="rounded-full">
                {attempts}
              </Badge>
            </div>
            
            {feedback && (
              <Badge variant={feedback === 'correct' ? "default" : "destructive"} className="rounded-full">
                {feedback === 'correct' ? '✓ Correct' : '✗ Try again'}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced progress bar */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <span className="font-medium">Progress</span>
          <span className="font-bold">{Math.min(attempts * 10, 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
          <motion.div 
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-3 rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(attempts * 10, 100)}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PuzzleHeader;
