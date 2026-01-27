
import React from 'react';
import { cn } from '@/lib/utils';
import { Code2, FunctionSquare, GitCommitHorizontal, Sigma, Variable } from 'lucide-react';

export type PuzzleBlockData = {
  id: string;
  content: string;
  isCorrect?: boolean;
  isPlaced?: boolean;
  type: 'code' | 'variable' | 'operator' | 'function' | 'control';
};

type PuzzleBlockProps = {
  block: PuzzleBlockData;
  onClick?: () => void;
  isInSolution?: boolean;
};

const PuzzleBlock = ({ 
  block, 
  onClick,
  isInSolution = false
}: PuzzleBlockProps) => {
  const typeStyles = {
    code: {
      icon: Code2,
      colors: 'border-puzzle-blue/40 text-puzzle-blue bg-puzzle-blue/5 hover:bg-puzzle-blue/10',
    },
    variable: {
      icon: Variable,
      colors: 'border-puzzle-purple/40 text-puzzle-purple bg-puzzle-purple/5 hover:bg-puzzle-purple/10',
    },
    operator: {
      icon: Sigma,
      colors: 'border-puzzle-orange/40 text-puzzle-orange bg-puzzle-orange/5 hover:bg-puzzle-orange/10',
    },
    function: {
      icon: FunctionSquare,
      colors: 'border-puzzle-green/40 text-puzzle-green bg-puzzle-green/5 hover:bg-puzzle-green/10',
    },
    control: {
      icon: GitCommitHorizontal,
      colors: 'border-puzzle-red/40 text-puzzle-red bg-puzzle-red/5 hover:bg-puzzle-red/10',
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const blockStyle = typeStyles[block.type];
  const IconComponent = blockStyle.icon;

  return (
    <div
      className={cn(
        'group relative flex items-center gap-3 rounded-xl p-3 shadow-sm border-2 transition-all duration-200',
        blockStyle.colors,
        {
          'opacity-40 grayscale pointer-events-none': block.isPlaced && !isInSolution,
          'hover:shadow-md hover:scale-[1.02] hover:border-current active:scale-100 cursor-pointer': !isInSolution,
        },
        isInSolution && 'p-2 text-sm'
      )}
      onClick={!isInSolution ? handleClick : undefined}
      role={!isInSolution ? "button" : undefined}
      title={isInSolution ? "This block is in your solution" : "Click to add to your solution"}
    >
      <IconComponent className="h-5 w-5 flex-shrink-0 opacity-70" />
      <pre className="font-mono text-sm sm:text-base font-semibold text-inherit m-0 p-0 w-full overflow-hidden text-left">
        {block.content}
      </pre>
    </div>
  );
};

export default PuzzleBlock;
