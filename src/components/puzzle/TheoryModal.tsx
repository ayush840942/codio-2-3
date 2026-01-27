
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target, Lightbulb } from 'lucide-react';
import { PuzzleLevel } from '@/context/GameContext';

interface TheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: PuzzleLevel;
  onStartPuzzle: () => void;
}

const TheoryModal: React.FC<TheoryModalProps> = ({ 
  isOpen, 
  onClose, 
  level, 
  onStartPuzzle 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="h-6 w-6 text-blue-600" />
            {level.title} - Theory & Concepts
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Level Info */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline">{level.topic}</Badge>
            <Badge variant={level.difficulty === 'easy' ? 'default' : level.difficulty === 'medium' ? 'secondary' : 'destructive'}>
              {level.difficulty}
            </Badge>
            <Badge variant="outline">{level.xpReward} XP</Badge>
          </div>

          {/* Theory Content */}
          {level.theory && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Theory
                </h3>
                <div className="prose max-w-none">
                  {level.theory.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Learning Objectives */}
          {level.learningObjectives && level.learningObjectives.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Learning Objectives
                </h3>
                <ul className="space-y-2">
                  {level.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Key Concepts */}
          {level.concepts && level.concepts.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Key Concepts</h3>
                <div className="flex flex-wrap gap-2">
                  {level.concepts.map((concept, index) => (
                    <Badge key={index} variant="secondary">{concept}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Practice Hints */}
          {level.practiceHints && level.practiceHints.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Practice Hints
                </h3>
                <ul className="space-y-2">
                  {level.practiceHints.map((hint, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{hint}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Review Later
            </Button>
            <Button onClick={onStartPuzzle} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Start Puzzle
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TheoryModal;
