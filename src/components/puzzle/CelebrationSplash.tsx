
import React, { useEffect } from 'react';
import { CheckCircle, Award, Sparkles, Trophy, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface CelebrationSplashProps {
  show: boolean;
  levelId: number;
  xpReward: number;
  onComplete?: () => void;
}

const CelebrationSplash: React.FC<CelebrationSplashProps> = ({ 
  show, 
  levelId, 
  xpReward,
  onComplete 
}) => {
  const { playLevelComplete, playAchievement, playNotification } = useSoundEffects();

  useEffect(() => {
    if (show) {
      console.log('Celebration splash showing for level:', levelId);
      
      // Play immediate level complete sound
      playLevelComplete();
      
      // Play achievement sound after a delay
      setTimeout(() => {
        playAchievement();
      }, 1000);
      
      // Play final notification
      setTimeout(() => {
        playNotification();
      }, 2000);

      // Add haptic feedback for mobile
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200, 100, 400]);
      }

      // Call onComplete callback if provided
      if (onComplete) {
        setTimeout(() => {
          onComplete();
        }, 3000);
      }
    }
  }, [show, playLevelComplete, playAchievement, playNotification, onComplete, levelId]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50 backdrop-blur-sm p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Star className="h-4 w-4 text-puzzle-orange/30 animate-pulse" />
          </div>
        ))}
      </div>
      
      <div className="relative animate-scale-in w-full max-w-sm sm:max-w-md">
        <Card className="bg-gradient-to-br from-white/98 to-puzzle-light/98 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl mx-auto border-2 border-puzzle-purple/20 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-puzzle-purple via-puzzle-blue to-puzzle-orange"></div>
          
          <div className="text-center relative z-10">
            {/* Success Icon */}
            <div className="inline-flex p-4 sm:p-5 bg-gradient-to-br from-puzzle-purple to-puzzle-blue rounded-full mb-4 sm:mb-6 shadow-lg animate-bounce">
              <CheckCircle className="h-10 w-10 sm:h-12 md:h-14 sm:w-12 md:w-14 text-white" />
            </div>
            
            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-puzzle-purple via-puzzle-blue to-puzzle-orange bg-clip-text text-transparent">
                🎉 Level {levelId} Complete! 🎉
              </span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-base sm:text-lg text-puzzle-gray/80 mb-4 sm:mb-6 px-2 font-medium">
              Outstanding work! You've mastered this coding challenge.
            </p>
            
            {/* Rewards Section */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 px-4 sm:px-5 py-3 bg-gradient-to-r from-puzzle-purple/10 to-puzzle-purple/20 rounded-full border border-puzzle-purple/30 shadow-sm">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-puzzle-purple animate-pulse" />
                <span className="font-bold text-puzzle-purple text-base sm:text-lg">+{xpReward} XP</span>
              </div>
              
              <div className="flex items-center gap-2 px-4 sm:px-5 py-3 bg-gradient-to-r from-puzzle-orange/10 to-puzzle-orange/20 rounded-full border border-puzzle-orange/30 shadow-sm">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-puzzle-orange animate-pulse" />
                <span className="font-bold text-puzzle-orange text-base sm:text-lg">Level Up!</span>
              </div>
            </div>
            
            {/* Progress Message */}
            <div className="bg-gradient-to-r from-puzzle-blue/5 to-puzzle-purple/5 rounded-xl p-4 border border-puzzle-blue/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-puzzle-blue animate-spin" />
                <span className="text-puzzle-gray font-semibold">Preparing Next Challenge...</span>
              </div>
              <p className="text-sm text-puzzle-gray/70">
                🚀 Get ready for the next exciting level!
              </p>
            </div>
          </div>
          
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-puzzle-purple via-puzzle-blue to-puzzle-orange opacity-20 animate-pulse"></div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CelebrationSplash;
