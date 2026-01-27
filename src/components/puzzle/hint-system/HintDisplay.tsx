
import React from 'react';
import { Info, Eye } from 'lucide-react';

interface HintDisplayProps {
  hint: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const HintDisplay: React.FC<HintDisplayProps> = ({
  hint,
  difficulty = 'easy'
}) => {
  return (
    <div className="flex items-start gap-3">
      <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <h4 className="font-semibold text-blue-800 mb-2 text-sm">Helpful Hint:</h4>
        <p className="text-sm text-blue-700 leading-relaxed">{hint}</p>
      </div>
    </div>
  );
};

export default HintDisplay;
