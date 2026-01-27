
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Award } from 'lucide-react';

interface LevelCompleteModalProps {
  show: boolean;
  xpReward: number;
}

const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({ show, xpReward }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 p-4 pointer-events-none">
      <Card className="pointer-events-auto animate-scale-in w-full max-w-sm sm:max-w-md relative bg-gradient-to-br from-white/95 to-puzzle-light/95 p-6 sm:p-8 rounded-2xl shadow-2xl border-2 border-puzzle-purple/20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-puzzle-purple via-puzzle-blue to-puzzle-orange"></div>
        <div className="text-center">
          <div className="inline-flex p-4 bg-gradient-to-br from-puzzle-purple to-puzzle-blue rounded-full mb-4 shadow-lg animate-bounce-subtle">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-puzzle-purple via-puzzle-blue to-puzzle-orange bg-clip-text text-transparent">
              Level Completed!
            </span>
          </h2>
          <p className="text-muted-foreground mb-4">You've earned experience points!</p>
          <div className="flex items-center justify-center gap-2 text-lg font-bold text-puzzle-purple bg-puzzle-purple/10 border border-puzzle-purple/20 px-4 py-2 rounded-full">
            <Award className="h-6 w-6" />
            <span>+{xpReward} XP</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LevelCompleteModal;
