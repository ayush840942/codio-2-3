
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Play, Check, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { PuzzleBlockData } from '@/components/PuzzleBlock';

interface InteractiveTutorialProps {
  onComplete: () => void;
}

const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [placedBlocks, setPlacedBlocks] = useState<PuzzleBlockData[]>([]);
  const [showHint, setShowHint] = useState(false);

  const tutorialBlocks: PuzzleBlockData[] = [
    { id: '1', content: '<h1>', type: 'code' },
    { id: '2', content: 'Hello World!', type: 'variable' },
    { id: '3', content: '</h1>', type: 'code' }
  ];

  const expectedOutput = '<h1>Hello World!</h1>';

  const handleBlockClick = (block: PuzzleBlockData) => {
    if (placedBlocks.length < 3) {
      setPlacedBlocks([...placedBlocks, block]);
    }
  };

  const handleRemoveBlock = (index: number) => {
    setPlacedBlocks(placedBlocks.filter((_, i) => i !== index));
  };

  const checkSolution = () => {
    const userCode = placedBlocks.map(block => block.content).join('');
    return userCode === expectedOutput;
  };

  const isComplete = checkSolution();

  const steps = [
    {
      title: "Welcome to CodeZen!",
      description: "Learn coding through fun, interactive puzzles",
      action: null
    },
    {
      title: "Try Your First Puzzle",
      description: "Drag the code blocks below to create: <h1>Hello World!</h1>",
      action: "practice"
    },
    {
      title: "Great Job! 🎉",
      description: "You've completed your first puzzle! Ready to start your coding journey?",
      action: "complete"
    }
  ];

  const currentStep = steps[step];

  return (
    <div className="min-h-screen bg-gradient-to-br from-puzzle-light via-white to-puzzle-purple/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm border-2 border-puzzle-purple/20 shadow-2xl">
        <CardContent className="p-8">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Progress */}
            <div className="flex justify-center mb-6">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                    index === step 
                      ? 'bg-puzzle-purple w-8' 
                      : index < step 
                      ? 'bg-puzzle-green' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-puzzle-gray mb-4 flex items-center justify-center gap-2">
                {currentStep.title}
                <Sparkles className="w-6 h-6 text-puzzle-yellow animate-pulse" />
              </h2>
              <p className="text-puzzle-gray/80 text-lg">
                {currentStep.description}
              </p>
            </div>

            {/* Practice Puzzle */}
            {currentStep.action === 'practice' && (
              <div className="space-y-6">
                {/* Available Blocks */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-puzzle-gray flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    Available Blocks
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {tutorialBlocks.map((block) => (
                      <motion.button
                        key={block.id}
                        onClick={() => handleBlockClick(block)}
                        className="px-4 py-2 bg-gradient-to-r from-puzzle-blue to-puzzle-purple text-white rounded-lg font-mono text-sm hover:scale-105 transition-transform shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {block.content}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Drop Zone */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-puzzle-gray flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Your Code
                  </h3>
                  <div className="min-h-[120px] border-2 border-dashed border-puzzle-purple/30 rounded-lg p-4 bg-gray-50 flex flex-wrap gap-2 items-start">
                    {placedBlocks.length === 0 ? (
                      <p className="text-gray-500 text-center w-full">
                        Click blocks above to place them here
                      </p>
                    ) : (
                      placedBlocks.map((block, index) => (
                        <motion.div
                          key={`${block.id}-${index}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-2 bg-white border border-puzzle-purple/20 rounded-lg font-mono text-sm flex items-center gap-2 shadow-sm"
                        >
                          {block.content}
                          <button
                            onClick={() => handleRemoveBlock(index)}
                            className="text-red-500 hover:text-red-700 ml-1"
                          >
                            ×
                          </button>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>

                {/* Result */}
                {placedBlocks.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-puzzle-gray">Result:</h3>
                    <div className="p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm">
                      {placedBlocks.map(block => block.content).join('')}
                    </div>
                  </div>
                )}

                {/* Hint */}
                {placedBlocks.length > 0 && !isComplete && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHint(!showHint)}
                      className="flex items-center gap-2"
                    >
                      <Lightbulb className="w-4 h-4" />
                      {showHint ? 'Hide Hint' : 'Need Help?'}
                    </Button>
                  </motion.div>
                )}

                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <p className="text-sm text-yellow-800">
                      💡 Try placing the blocks in this order: opening tag, content, closing tag
                    </p>
                  </motion.div>
                )}

                {/* Success */}
                {isComplete && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg"
                  >
                    <Check className="w-12 h-12 text-green-600 mx-auto mb-2" />
                    <h3 className="text-xl font-bold text-green-800 mb-2">Perfect! 🎉</h3>
                    <p className="text-green-700">You've created your first HTML element!</p>
                    <Badge className="mt-2 bg-green-600">+10 XP</Badge>
                  </motion.div>
                )}
              </div>
            )}

            {/* Completion */}
            {currentStep.action === 'complete' && (
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 mx-auto bg-gradient-to-r from-puzzle-green to-puzzle-teal rounded-full flex items-center justify-center"
                >
                  <Check className="w-12 h-12 text-white" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-puzzle-gray">Welcome to CodeZen!</h3>
                  <p className="text-puzzle-gray/70">
                    You're ready to start your coding adventure with 200+ levels waiting for you!
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
              >
                Back
              </Button>

              <Button
                onClick={() => {
                  if (step === steps.length - 1) {
                    onComplete();
                  } else if (step === 1 && !isComplete) {
                    // Don't allow proceeding until puzzle is complete
                    return;
                  } else {
                    setStep(step + 1);
                  }
                }}
                disabled={step === 1 && !isComplete}
                className="bg-gradient-to-r from-puzzle-purple to-puzzle-blue text-white flex items-center gap-2"
              >
                {step === steps.length - 1 ? 'Start Coding!' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveTutorial;
