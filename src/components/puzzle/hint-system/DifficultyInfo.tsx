
import React from 'react';
import { Zap } from 'lucide-react';

const DifficultyInfo: React.FC = () => {
  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-600 text-center">
        <Zap className="h-3 w-3 inline mr-1" />
        Hint costs vary by difficulty: Easy (3 hints) • Medium (5 hints) • Hard (8 hints)
      </p>
    </div>
  );
};

export default DifficultyInfo;
