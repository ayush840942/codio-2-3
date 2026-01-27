import React from 'react';
import { Code } from 'lucide-react';
const InstructionsCard: React.FC = () => {
  return <div className="px-4 mb-8">
      <div className="bg-gradient-to-r from-puzzle-blue/10 to-puzzle-purple/10 p-6 border border-puzzle-blue/20 rounded-md">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-puzzle-blue to-puzzle-purple rounded-xl flex items-center justify-center">
            <Code className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-puzzle-gray mb-2">How to Play</h3>
            <p className="text-puzzle-gray/80 text-sm leading-relaxed mb-3">
              Arrange the code blocks in the correct order to match the expected output. 
              Each level builds upon the previous one, teaching you programming concepts step by step.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full border border-puzzle-purple/20">
                <div className="w-2 h-2 bg-puzzle-green rounded-full"></div>
                <span className="text-xs font-medium text-puzzle-gray">Drag & Drop</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full border border-puzzle-purple/20">
                <div className="w-2 h-2 bg-puzzle-blue rounded-full"></div>
                <span className="text-xs font-medium text-puzzle-gray">Progressive Learning (1-200 Levels)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default InstructionsCard;