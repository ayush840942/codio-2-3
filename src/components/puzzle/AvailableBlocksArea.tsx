
import React from 'react';
import { PuzzleBlockData } from '@/components/PuzzleBlock';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type AvailableBlocksAreaProps = {
  availableBlocks: PuzzleBlockData[];
  onBlockClick: (block: PuzzleBlockData) => void;
};

const AvailableBlocksArea: React.FC<AvailableBlocksAreaProps> = ({
  availableBlocks,
  onBlockClick
}) => {
  const isMobile = useIsMobile();
  const unusedBlocks = availableBlocks.filter(block => !block.isPlaced);

  const handleBlockClick = (block: PuzzleBlockData) => {
    console.log('Block clicked:', block.id);
    onBlockClick(block);
  };

  return (
    <div className="bg-white rounded-2xl border border-purple-100 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-white`}>Available Blocks</h3>
        </div>
      </div>

      {/* Content */}
      <div className={isMobile ? 'p-3' : 'p-6'}>
        <ScrollArea className={`${isMobile ? 'h-64' : 'h-96'}`}>
          <div className={`space-y-${isMobile ? '2' : '3'}`}>
            {unusedBlocks.map((block, index) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleBlockClick(block)}
                className="group cursor-pointer"
              >
                <div className={`bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all duration-200 group-hover:scale-[1.02] ${isMobile ? 'p-3' : 'p-4'}`}>
                  <pre className={`font-mono text-blue-800 font-medium ${isMobile ? 'text-xs' : 'text-sm'} overflow-x-auto`}>
                    {block.content}
                  </pre>
                </div>
              </motion.div>
            ))}
            
            {unusedBlocks.length === 0 && (
              <div className={`text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 ${isMobile ? 'py-6' : 'py-8'}`}>
                <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}>🎉</div>
                <p className={`text-gray-600 font-semibold ${isMobile ? 'text-sm' : ''}`}>
                  All blocks have been used!
                </p>
                <p className={`text-gray-500 mt-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  Check your solution in the workspace.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AvailableBlocksArea;
