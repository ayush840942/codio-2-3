
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type LevelInfo = {
  id: number;
  title: string;
};

interface CodeResultHeaderProps {
  currentLevel: LevelInfo;
  onNextLevel: () => void;
}

const CodeResultHeader: React.FC<CodeResultHeaderProps> = ({ currentLevel, onNextLevel }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <Badge variant="outline" className="mb-2">Level {currentLevel.id} Completed</Badge>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {currentLevel.title}
          <CheckCircle className="h-5 w-5 text-puzzle-green" />
        </h1>
        <p className="text-muted-foreground">Your solution has been converted to real code!</p>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => navigate(`/puzzle/${currentLevel.id}`)}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Puzzle
        </Button>
        <Button onClick={onNextLevel}>
          Continue
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CodeResultHeader;
