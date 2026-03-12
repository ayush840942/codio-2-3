import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { DrawnCard, DrawnButton } from '@/components/ui/HandDrawnComponents';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useGame } from '@/context/GameContext';
import { useRewards } from '@/context/RewardsContext';
import { useVoiceWelcome } from '@/hooks/useVoiceWelcome';
import Logo from '@/components/ui/logo';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  Rocket,
  Code2,
  Star,
  Flame,
  Zap,
  Play,
  Award,
  Sparkles,
  Clock,
  Target
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DailyGoalsWidget } from '@/components/goals/DailyGoalsWidget';
import { AIMentorButton } from '@/components/ai/AIMentorPanel';
import PremiumGateModal from '@/components/premium/PremiumGateModal';
import TrialBanner from '@/components/premium/TrialBanner';
import { usePremiumGate } from '@/hooks/usePremiumGate';
import { useState } from 'react';
import { Lock } from 'lucide-react';
import DailyChallengeWidget from '@/components/home/DailyChallenge';
import MobileHeader from '@/components/MobileHeader';

const Index = () => {
  const navigate = useNavigate();
  const { user, profile, continueAsGuest } = useAuth();
  const { gameState, isLoaded } = useGame();
  const { rewards, claimDailyReward } = useRewards();
  const { playWelcomeMessage } = useVoiceWelcome();

  useEffect(() => {
    if (user && profile) {
      const displayName = profile.username || profile.full_name || 'Champion';
      playWelcomeMessage(displayName);
    }
  }, [user, profile?.id, playWelcomeMessage]);

  const nextLevel = gameState.levels
    .sort((a, b) => a.id - b.id)
    .find(level => level.isUnlocked && !level.isCompleted);

  const { checkLevelAccess, isSubscribed } = usePremiumGate();
  const [gateLevel, setGateLevel] = useState<number | null>(null);
  const [showGate, setShowGate] = useState(false);

  const handleLevelClick = (levelId: number, isLocked: boolean) => {
    if (isLocked) return; // game-locked (not yet unlocked by progress)
    const gate = checkLevelAccess(levelId);
    if (!gate.allowed) {
      setGateLevel(levelId);
      setShowGate(true);
      return;
    }
    navigate(`/puzzle/${levelId}`);
  };

  const handleContinueLearning = () => {
    if (nextLevel) {
      navigate(`/puzzle/${nextLevel.id}`);
    } else {
      navigate('/levels');
    }
  };

  // Not logged in view
  if (!user) {
    return (
      <div className="min-h-[100dvh] bg-pastel-yellow/20 relative overflow-hidden font-draw">
        {/* Floating decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {['{ }', '< />', '[ ]', '( )', '# #'].map((code, i) => (
            <motion.div
              key={i}
              className="absolute text-black/10 text-3xl font-black"
              style={{
                top: `${15 + i * 18}%`,
                left: i % 2 === 0 ? `${5 + i * 3}%` : `${80 - i * 3}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 5 + i, repeat: Infinity }}
            >
              {code}
            </motion.div>
          ))}
        </div>

        <div
          className="relative min-h-[100dvh] flex items-center justify-center p-6 animate-fade-in"
        >
          <div className="w-full max-w-md space-y-10">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="text-center"
            >
              <motion.div
                className="mb-8 relative"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="inline-block p-4 bg-white border-3 border-black rounded-[2rem] shadow-comic rotate-[-3deg] relative z-10">
                  <Logo size="xl" className="justify-center" />
                </div>
              </motion.div>

              <h1 className="text-5xl font-black mb-4 text-black tracking-tighter leading-none">
                LEARN TO <span className="text-pastel-blue">CODE</span>
              </h1>
              <p className="text-black/60 text-xl font-bold mb-8 max-w-[280px] mx-auto leading-tight italic">
                The most playful way to master programming!
              </p>
              <div className="flex justify-center gap-3">
                <Badge className="bg-pastel-mint border-2 border-black text-black px-4 py-1 rotate-2 shadow-comic-sm">FUN!</Badge>
                <Badge className="bg-pastel-pink border-2 border-black text-black px-4 py-1 -rotate-2 shadow-comic-sm">EASY!</Badge>
              </div>
            </motion.div>

            {/* Features Preview */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: BookOpen, label: 'Learn', bg: 'bg-pastel-blue' },
                { icon: Code2, label: 'Code', bg: 'bg-pastel-mint' },
                { icon: Rocket, label: 'Launch', bg: 'bg-pastel-pink' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className={`w-20 h-20 mx-auto mb-3 ${item.bg} border-3 border-black rounded-2xl flex items-center justify-center shadow-comic hover:shadow-comic-lg hover:-translate-y-1 transition-all cursor-pointer relative group`}>
                    <item.icon className="w-10 h-10 text-black" strokeWidth={3} />
                  </div>
                  <span className="text-xs font-black text-black uppercase">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div className="space-y-4 pt-4">
              <DrawnButton
                onClick={continueAsGuest}
                variant="primary"
                className="w-full h-16 text-2xl bg-pastel-mint shadow-comic"
              >
                <div className="flex items-center justify-center gap-2">
                  <Rocket className="w-6 h-6" />
                  START JOURNEY
                </div>
              </DrawnButton>

              <DrawnButton
                onClick={() => navigate('/auth')}
                variant="outlined"
                className="w-full h-16 text-2xl bg-white shadow-comic"
              >
                SIGN IN / UP
              </DrawnButton>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-pastel-yellow/10">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-white border-4 border-black rounded-2xl flex items-center justify-center shadow-comic"
          >
            <Logo size="md" />
          </motion.div>
          <div className="font-draw font-black text-2xl animate-pulse italic">Doodle power charging...</div>
        </div>
      </div>
    );
  }

  // Logged in view - Comic Theme
  return (
    <div className="min-h-[100dvh] bg-pastel-yellow/5 relative pb-32 font-draw overflow-x-hidden">
      {/* Unified Mobile Header */}
      <MobileHeader showLogo showProfile showStats className="md:hidden" />

      <div className="px-6 space-y-12" style={{ paddingTop: 'calc(var(--safe-area-top) + 4rem)' }}>

        {/* Continue Learning Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <DrawnCard
            rank={nextLevel?.id || 1}
            badgeColor="bg-cc-yellow"
            variant="white"
            className="p-0 overflow-hidden relative group cursor-pointer shadow-comic-lg border-4"
            onClick={handleContinueLearning}
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-48 h-48 text-cc-blue -rotate-12" />
            </div>


            <div className="p-8 relative z-10">
              <div className="flex justify-between items-start mb-8 text-black">
                <div className="space-y-3">
                  <div className="inline-block bg-black text-white px-3 py-1 rounded-md text-[10px] font-black tracking-[0.2em] italic uppercase">
                    ACTIVE MISSION
                  </div>
                  <h2 className="text-5xl font-black leading-none tracking-tighter uppercase">
                    {nextLevel ? nextLevel.title : "VICTORY!"}
                  </h2>
                  <p className="text-black/50 font-bold italic text-lg line-clamp-1 max-w-[200px]">
                    {nextLevel ? "Mastering the code flow..." : "Season complete, Hero!"}
                  </p>
                </div>

                <div className="w-20 h-20 bg-cc-blue border-3 border-black rounded-3xl flex items-center justify-center shadow-comic rotate-6 group-hover:rotate-12 transition-transform">
                  <Play className="w-10 h-10 text-black fill-black ml-1" />
                </div>
              </div>

              <DrawnButton
                variant="cc-blue"
                className="w-full text-2xl h-16 shadow-none border-4"
              >
                RESUME MISSION
              </DrawnButton>
            </div>
          </DrawnCard>
        </motion.div>

        {/* 🔥 Daily Code Challenge Widget */}
        <DailyChallengeWidget />

        {/* Comic Learning Path Units */}
        <div className="relative">
          {/* Main Dotted Path */}
          <div className="absolute left-6 top-8 bottom-0 w-2 bg-transparent border-l-4 border-dashed border-black/20 rounded-full" />

          <div className="space-y-16 pl-4">
            {(() => {
              const units = [
                { id: 1, title: 'Introduction', topic: 'Basic Programming', icon: '🐍', bg: 'bg-cc-blue', variant: 'cc-blue' as const },
                { id: 2, title: 'Web Structure', topic: 'HTML', icon: '🌐', bg: 'bg-cc-green', variant: 'cc-green' as const },
                { id: 3, title: 'Design Vibes', topic: 'CSS', icon: '🎨', bg: 'bg-cc-pink', variant: 'cc-pink' as const },
                { id: 4, title: 'Logic Power', topic: 'JavaScript', icon: '⚡', bg: 'bg-cc-yellow', variant: 'cc-yellow' as const },
                { id: 5, title: 'Modern Apps', topic: 'React', icon: '⚛️', bg: 'bg-cc-purple', variant: 'cc-blue' as const },
              ];

              let firstLockedFound = false;

              return units.map((unit, unitIdx) => {
                const unitLevels = gameState.levels.filter(l => l.topic === unit.topic);
                const unitCompletedCount = unitLevels.filter(l => l.isCompleted).length;
                const isUnitCompleted = unitCompletedCount === unitLevels.length && unitLevels.length > 0;
                const isUnlocked = unitIdx === 0 || (
                  gameState.levels.filter(l => l.topic === units[unitIdx - 1].topic).every(l => l.isCompleted) &&
                  gameState.levels.filter(l => l.topic === units[unitIdx - 1].topic).length > 0
                );

                if (!isUnlocked && firstLockedFound) return null;
                if (!isUnlocked) firstLockedFound = true;

                const currentInUnit = unitLevels.find(l => !l.isCompleted && l.isUnlocked);

                return (
                  <div key={unit.id} className="relative">
                    {/* Unit Sticker Label */}
                    <div className={cn(
                      "inline-block px-5 py-2 border-3 border-black text-black font-black text-sm absolute -left-6 -top-8 rotate-[-3deg] z-10 shadow-comic-sm rounded-xl uppercase tracking-widest",
                      unit.bg
                    )}>
                      UNIT {unit.id}: {unit.topic}
                    </div>

                    {isUnlocked ? (
                      <div className="space-y-8">
                        <div className="flex items-center justify-between mb-2 pl-10 pt-2">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl rotate-12">{unit.icon}</div>
                            <h3 className="text-3xl font-black text-black leading-none tracking-tighter uppercase">{unit.title}</h3>
                          </div>
                          <div className={cn(
                            "px-4 py-1.5 rounded-lg border-3 border-black font-black text-xs shadow-comic-sm hidden sm:block",
                            isUnitCompleted ? 'bg-cc-green' : 'bg-white'
                          )}>
                            {unitCompletedCount}/{unitLevels.length} MISSIONS
                          </div>
                        </div>

                        <div className="space-y-6 pl-8">
                          {unitLevels.map((level, i) => {
                            const isCompleted = level.isCompleted;
                            const isCurrent = currentInUnit?.id === level.id;
                            const isLocked = !level.isUnlocked && !isCompleted;

                            return (
                              <motion.div
                                key={level.id}
                                whileHover={!isLocked ? { scale: 1.02, x: 8 } : {}}
                                whileTap={!isLocked ? { scale: 0.98 } : {}}
                                className="relative"
                                onClick={() => handleLevelClick(level.id, isLocked)}
                              >
                                <DrawnCard
                                  rank={level.id}
                                  badgeColor={isCompleted ? 'bg-cc-green' : isCurrent ? 'bg-cc-yellow' : 'bg-white/20'}
                                  variant={isCurrent ? unit.variant as any : 'white'}
                                  className={cn(
                                    "p-5 flex items-center gap-5 transition-all cursor-pointer border-4 group",
                                    isCurrent ? `${unit.bg} rotate-1 scale-105 shadow-comic` :
                                      isCompleted ? 'bg-white border-dashed opacity-90' : 'bg-white/40 grayscale opacity-40 border-black/20 shadow-none'
                                  )}
                                >
                                  <div className={cn(
                                    "w-14 h-14 rounded-2xl border-3 border-black flex items-center justify-center shrink-0 shadow-comic-sm transition-transform group-hover:rotate-6",
                                    isCurrent ? 'bg-white' : 'bg-black/5'
                                  )}>
                                    {isCompleted ? <Award className="w-8 h-8 text-black fill-cc-yellow" strokeWidth={3} /> : <Code2 className="w-8 h-8 text-black" strokeWidth={3} />}
                                  </div>

                                  <div className="flex-1">
                                    <h4 className="font-black text-xl text-black leading-none uppercase tracking-tighter">
                                      {level.title}
                                    </h4>
                                    <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mt-1 italic">Mission Sector {i + 1}</p>
                                  </div>

                                  {isCurrent && (
                                    <div className="absolute -right-4 -top-4 bg-cc-pink border-3 border-black text-black text-[10px] font-black px-3 py-1.5 rounded-xl shadow-comic-sm animate-bounce tracking-widest">
                                      PLAY!
                                    </div>
                                  )}

                                  {isLocked && (
                                    <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center">
                                      <Clock className="w-5 h-5 text-black/20" />
                                    </div>
                                  )}
                                </DrawnCard>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white/30 border-4 border-black border-dashed rounded-[2.5rem] p-12 text-center shadow-none opacity-40 ml-10">
                        <Target className="w-16 h-16 text-black/30 mx-auto mb-4" />
                        <h3 className="font-black text-black/30 text-2xl uppercase tracking-tighter">CLASSIFIED DATA</h3>
                        <p className="text-[10px] font-black text-black/30 uppercase mt-2 tracking-[0.3em] italic">Unlock previous unit to decrypt</p>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>

        {/* Daily Goals - Comic Card */}
        <section className="pt-10 pb-32">
          <DrawnCard className="bg-cc-yellow/10 border-4 border-black p-8 shadow-comic rotate-[-1deg] relative overflow-hidden mt-4">
            {/* Background Decoration */}
            <div className="absolute -right-6 -bottom-6 opacity-10 rotate-12">
              <Rocket className="w-40 h-40 text-black" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-cc-yellow border-3 border-black rounded-2xl flex items-center justify-center shadow-comic-sm rotate-6">
                  <Rocket className="w-8 h-8 text-black" strokeWidth={3} />
                </div>
                <h3 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">
                  Daily Quests
                </h3>
              </div>
              <DailyGoalsWidget />
            </div>
          </DrawnCard>
        </section>

      </div>

      {/* Trial Banner */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TrialBanner />
      </div>

      {/* Premium Gate Modal */}
      <PremiumGateModal
        isOpen={showGate}
        onClose={() => setShowGate(false)}
        lockedLevel={gateLevel ?? undefined}
        trigger="level"
      />
    </div>
  );
};

export default Index;