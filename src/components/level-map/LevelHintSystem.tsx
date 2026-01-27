
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Eye, HelpCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRewards } from '@/context/RewardsContext';
import { toast } from 'sonner';

interface LevelHintSystemProps {
  levelId: number;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  onHintUsed?: () => void;
}

const LevelHintSystem: React.FC<LevelHintSystemProps> = ({
  levelId,
  topic,
  difficulty,
  onHintUsed
}) => {
  const { rewards, useHints } = useRewards();
  const [showHints, setShowHints] = useState(false);
  const [selectedHint, setSelectedHint] = useState<string | null>(null);

  const getHintCost = (type: 'hint' | 'solution') => {
    const baseCost = type === 'hint' ? 2 : 5;
    const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2;
    return Math.ceil(baseCost * difficultyMultiplier);
  };

  const generateHints = () => {
    const hints = [];
    
    // Topic-specific hints
    if (topic === 'HTML') {
      hints.push({
        id: 'html-structure',
        type: 'hint',
        title: 'HTML Structure',
        content: 'Remember that HTML elements need opening and closing tags. Think about the proper nesting of elements.',
        cost: getHintCost('hint')
      });
      hints.push({
        id: 'html-attributes',
        type: 'hint',
        title: 'HTML Attributes',
        content: 'Check if you need any attributes like class, id, or src. Attributes go inside the opening tag.',
        cost: getHintCost('hint')
      });
    } else if (topic === 'CSS') {
      hints.push({
        id: 'css-selectors',
        type: 'hint',
        title: 'CSS Selectors',
        content: 'Make sure you are using the right selector (element, class, or ID). Classes use dots (.) and IDs use hashes (#).',
        cost: getHintCost('hint')
      });
      hints.push({
        id: 'css-properties',
        type: 'hint',
        title: 'CSS Properties',
        content: 'Check the CSS property names and values. Remember to use colons (:) after properties and semicolons (;) after values.',
        cost: getHintCost('hint')
      });
    } else if (topic === 'JavaScript') {
      hints.push({
        id: 'js-syntax',
        type: 'hint',
        title: 'JavaScript Syntax',
        content: 'Check for proper semicolons, parentheses, and curly braces. Variables need to be declared with let, const, or var.',
        cost: getHintCost('hint')
      });
      hints.push({
        id: 'js-functions',
        type: 'hint',
        title: 'Functions',
        content: 'Function declarations need the function keyword, parentheses for parameters, and curly braces for the body.',
        cost: getHintCost('hint')
      });
    } else if (topic === 'React') {
      hints.push({
        id: 'react-jsx',
        type: 'hint',
        title: 'JSX Syntax',
        content: 'JSX elements need to be properly closed. Use className instead of class, and wrap multiple elements in a fragment or div.',
        cost: getHintCost('hint')
      });
      hints.push({
        id: 'react-components',
        type: 'hint',
        title: 'React Components',
        content: 'Component names should start with capital letters. Make sure to return JSX from your component function.',
        cost: getHintCost('hint')
      });
    }

    // General hints
    hints.push({
      id: 'general-order',
      type: 'hint',
      title: 'Block Order',
      content: 'Pay attention to the logical order of the blocks. Start with declarations, then main logic, then any closing statements.',
      cost: getHintCost('hint')
    });

    hints.push({
      id: 'solution',
      type: 'solution',
      title: 'Complete Solution',
      content: 'This will show you the complete solution with all blocks in the correct order.',
      cost: getHintCost('solution')
    });

    return hints;
  };

  const handleUseHint = (hint: any) => {
    if (rewards.hintPoints >= hint.cost) {
      if (useHints(hint.cost)) {
        setSelectedHint(hint.content);
        toast.success(`Hint used! ${hint.cost} hint points spent.`);
        if (onHintUsed) onHintUsed();
      }
    } else {
      toast.error('Not enough hint points!');
    }
  };

  const hints = generateHints();

  return (
    <div className="w-full">
      <Button
        onClick={() => setShowHints(!showHints)}
        variant="outline"
        className="w-full flex items-center gap-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50"
      >
        <Lightbulb className="w-4 h-4" />
        Need Help? ({rewards.hintPoints} 💎)
        <Badge variant="secondary" className="ml-auto">
          Level {levelId}
        </Badge>
      </Button>

      <AnimatePresence>
        {showHints && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-3"
          >
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-yellow-800 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  {topic} - Level {levelId} Hints
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {hints.map((hint) => (
                  <div
                    key={hint.id}
                    className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-yellow-200"
                  >
                    <div className="flex items-center gap-2">
                      {hint.type === 'solution' ? (
                        <Eye className="w-4 h-4 text-green-600" />
                      ) : (
                        <Star className="w-4 h-4 text-yellow-600" />
                      )}
                      <span className="text-sm font-medium text-gray-800">
                        {hint.title}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleUseHint(hint)}
                      disabled={rewards.hintPoints < hint.cost}
                      className={`text-xs ${
                        hint.type === 'solution'
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-yellow-500 hover:bg-yellow-600'
                      } text-white`}
                    >
                      {hint.cost} 💎
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4"
          >
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Hint
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedHint(null)}
                    className="ml-auto text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-800 leading-relaxed">
                  {selectedHint}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LevelHintSystem;
