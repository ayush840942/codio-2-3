
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '@/context/GameContext';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const UnderDevelopment = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const { gameState, canAccessLevel } = useGame();
  
  const currentLevel = gameState.levels.find(level => level.id === Number(levelId));
  
  if (!currentLevel) {
    return (
      <div className="min-h-screen bg-puzzle-light">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Level Not Found</h1>
          <Button onClick={() => navigate('/levels')}>Back to Level Map</Button>
        </div>
      </div>
    );
  }
  
  const isPremiumLevel = currentLevel.id > 10;
  const canAccess = canAccessLevel(currentLevel.id);
  
  const handlePreviousLevel = () => {
    const prevLevelId = currentLevel.id - 1;
    if (prevLevelId > 0) {
      navigate(`/puzzle/${prevLevelId}`);
    }
  };
  
  const handleNextLevel = () => {
    const nextLevelId = currentLevel.id + 1;
    const nextLevel = gameState.levels.find(level => level.id === nextLevelId);
    
    if (nextLevel && nextLevel.isUnlocked) {
      navigate(`/puzzle/${nextLevelId}`);
    } else {
      navigate('/levels');
    }
  };
  
  return (
    <div className="min-h-screen bg-puzzle-light">
      <NavBar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate('/levels')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Level {currentLevel.id}</h1>
          </div>
        </div>
        
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="mb-2">Level {currentLevel.id}</Badge>
              <Badge className={
                currentLevel.difficulty === 'easy' ? 'bg-puzzle-green text-white' :
                currentLevel.difficulty === 'medium' ? 'bg-puzzle-yellow text-black' :
                'bg-puzzle-red text-white'
              }>
                {currentLevel.difficulty}
              </Badge>
            </div>
            <CardTitle>{currentLevel.title}</CardTitle>
            <CardDescription>{currentLevel.description}</CardDescription>
          </CardHeader>
          <CardContent className="text-center p-12">
            {isPremiumLevel && !canAccess ? (
              <>
                <Sparkles className="h-16 w-16 mx-auto mb-4 text-puzzle-purple opacity-60" />
                <h2 className="text-xl font-semibold mb-2">Premium Content</h2>
                <p className="text-muted-foreground mb-6">
                  This level is available with our Premium or Pro subscription. Upgrade now to access all levels!
                </p>
                <Button 
                  className="bg-gradient-to-r from-puzzle-purple to-puzzle-blue"
                  onClick={() => navigate('/subscription')}
                >
                  Upgrade Subscription
                </Button>
              </>
            ) : (
              <>
                <Construction className="h-16 w-16 mx-auto mb-4 text-puzzle-purple opacity-60" />
                <h2 className="text-xl font-semibold mb-2">Under Development</h2>
                <p className="text-muted-foreground">
                  This puzzle is currently being built. Please check back later!
                </p>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between pt-2 border-t">
            <div className="text-sm text-muted-foreground">
              {currentLevel.topic} • {currentLevel.xpReward} XP
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handlePreviousLevel}
                disabled={currentLevel.id === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/levels')}
              >
                Level Map
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleNextLevel}
                disabled={currentLevel.id === gameState.levels.length || !gameState.levels.find(l => l.id === currentLevel.id + 1)?.isUnlocked}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UnderDevelopment;
