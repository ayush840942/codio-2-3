
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PuzzleBlockData } from '@/components/PuzzleBlock';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Code, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PuzzleDropZoneProps {
  placedBlocks: PuzzleBlockData[];
  onRemoveBlock: (index: number) => void;
  codeOutput?: string | null;
  feedback?: 'correct' | 'incorrect' | null;
}

const PuzzleDropZone: React.FC<PuzzleDropZoneProps> = ({
  placedBlocks,
  onRemoveBlock,
  codeOutput,
  feedback
}) => {
  const getBlockTypeColor = (type: string) => {
    switch (type) {
      case 'function':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'variable':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'control':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'code':
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      {/* Solution Workshop Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-800">Solution Workshop</h3>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          {placedBlocks.length} blocks
        </Badge>
      </div>

      {/* Scrollable Solution Area */}
      <Card className="border-2 border-dashed border-blue-300 bg-blue-50/50 min-h-[200px] max-h-[400px] overflow-hidden">
        <CardContent className="p-4 h-full">
          <ScrollArea className="h-full w-full">
            <div className="space-y-2 pr-4">
              {placedBlocks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <PlayCircle className="h-12 w-12 text-blue-400 mb-2" />
                  <p className="text-blue-600 font-medium">Drop code blocks here</p>
                  <p className="text-blue-500 text-sm">Build your solution step by step</p>
                </div>
              ) : (
                <AnimatePresence>
                  {placedBlocks.map((block, index) => (
                    <motion.div
                      key={`${block.id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className={`
                        relative group p-3 rounded-lg border-2 cursor-pointer
                        hover:shadow-md transition-all duration-200
                        ${getBlockTypeColor(block.type)}
                      `}
                      onClick={() => onRemoveBlock(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {block.type}
                            </Badge>
                            <span className="text-xs text-gray-500">Line {index + 1}</span>
                          </div>
                          <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap">
                            {block.content}
                          </pre>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveBlock(index);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Code Output Area */}
      {codeOutput && (
        <Card className={`border-2 ${feedback === 'correct' ? 'border-green-300 bg-green-50' : 'border-yellow-300 bg-yellow-50'}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <PlayCircle className="h-4 w-4 text-gray-600" />
              <h4 className="font-semibold text-gray-800">Output:</h4>
            </div>
            <ScrollArea className="max-h-32">
              <pre className="text-sm font-mono text-gray-700 whitespace-pre-wrap">
                {codeOutput}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PuzzleDropZone;
