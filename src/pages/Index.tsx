import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useGame } from '@/context/GameContext';
import { useRewards } from '@/context/RewardsContext';
import { useVoiceWelcome } from '@/hooks/useVoiceWelcome';
import CodioAssistant from '@/components/CodioAssistant';
import Logo from '@/components/ui/logo';
import {
  BookOpen,
  Rocket,
  Code2,
  Trophy,
  Star,
  Flame,
  Zap,
  Play,
  Gift,
  Target,
  Award,
  ChevronRight,
  Sparkles,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DailyGoalsWidget } from '@/components/goals/DailyGoalsWidget';

const Index = () => {
  const navigate = useNavigate();
  const { user, profile, continueAsGuest } = useAuth();
  const { gameState, isLoaded } = useGame();
  const { rewards, canClaimDaily, claimDailyReward } = useRewards();
  const { playWelcomeMessage } = useVoiceWelcome();
  const [showHeartsShop, setShowHeartsShop] = React.useState(false);

  useEffect(() => {
    if (user && profile) {
      const displayName = profile.username || profile.full_name || 'Champion';
      playWelcomeMessage(displayName);
    }
  }, [user, profile?.id, playWelcomeMessage]);

  const nextLevel = gameState.levels
    .sort((a, b) => a.id - b.id)
    .find(level => level.isUnlocked && !level.isCompleted);

  const completedLevels = gameState.levels.filter(level => level.isCompleted).length;
  const totalLevels = gameState.levels.length;

  const handleContinueLearning = () => {
    if (nextLevel) {
      navigate(`/puzzle/${nextLevel.id}`);
    } else {
      navigate('/levels');
    }
  };

  const handleClaimDaily = async () => {
    await claimDailyReward();
  };

  // Not logged in view
  if (!user) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {['{ }', '< />', '[ ]', '( )', '# #'].map((code, i) => (
            <motion.div
              key={i}
              className="absolute text-foreground/10 text-2xl font-mono font-bold"
              style={{
                top: `${15 + i * 18}%`,
                left: i % 2 === 0 ? `${5 + i * 3}%` : `${80 - i * 3}%`
              }}
              animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity }}
            >
              {code}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative min-h-screen flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-full max-w-md space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Logo with bounce */}
              <motion.div
                className="mb-8"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Logo size="xl" className="justify-center" />
              </motion.div>

              <h1 className="text-4xl font-extrabold mb-3 text-foreground tracking-tight">
                Learn to Code
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-[280px] mx-auto leading-relaxed">
                The most aesthetic way to master programming
              </p>
              <div className="flex justify-center gap-3 text-sm">
                <span className="px-5 py-2.5 bg-secondary border border-border/50 rounded-full font-semibold shadow-sm">Interactive</span>
                <span className="px-5 py-2.5 bg-secondary border border-border/50 rounded-full font-semibold shadow-sm">Modern</span>
              </div>
            </motion.div>

            {/* Features Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { icon: BookOpen, label: 'Learn', color: 'text-blue-500' },
                { icon: Code2, label: 'Practice', color: 'text-teal-500' },
                { icon: Rocket, label: 'Build', color: 'text-purple-500' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-3 bg-white border border-border/30 rounded-2xl flex items-center justify-center shadow-soft hover:shadow-soft-lg transition-all`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </motion.div>
                  <span className="text-sm font-semibold text-foreground/80 tracking-wide uppercase">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-3"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={continueAsGuest}
                  className="w-full h-14 text-base font-bold rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Learning Free
                </Button>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => navigate('/auth')}
                  variant="outline"
                  className="w-full h-14 text-base font-semibold rounded-full bg-white/50 backdrop-blur-sm border border-border shadow-sm hover:bg-white transition-all"
                >
                  Sign In / Sign Up
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Loading state
  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <Logo size="xl" />
        <div className="h-4 w-32 bg-muted rounded"></div>
      </div>
    </div>;
  }

  // Logged in view - Study App Theme
  return (
    <div className="min-h-screen bg-background relative pb-28">
      {/* Header - Compact & Informative */}
      <motion.header
        className="px-6 py-4 flex items-center justify-between sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border/50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/20">
            <span className="text-lg">🐍</span> {/* Dynamic based on course later */}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Current Course</span>
            <span className="text-sm font-black text-foreground leading-none">Python Mastery</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 rounded-full border border-orange-500/20">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-sm font-bold text-orange-600">{rewards.loginStreak || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-500 fill-blue-500" />
            <span className="text-sm font-bold text-blue-600">{gameState.xp || 0}</span>
          </div>
        </div>
      </motion.header>

      <div className="px-6 pt-6 space-y-8">

        {/* Continue Learning Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="rounded-[2rem] border-0 shadow-xl bg-gradient-to-br from-[#2D2B3F] to-[#201E30] overflow-hidden relative group cursor-pointer" onClick={handleContinueLearning}>
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Code2 className="w-40 h-40 text-white rotate-12" />
            </div>

            <CardContent className="p-8 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20 mb-3 hover:bg-white/20 transition-colors">
                    Next Lesson
                  </Badge>
                  <h2 className="text-3xl font-black text-white leading-tight mb-2">
                    {nextLevel ? nextLevel.title : "All Completed!"}
                  </h2>
                  <p className="text-slate-400 font-medium line-clamp-1">
                    {nextLevel ? "Master the basics of syntax." : "You've finished the course!"}
                  </p>
                </div>
                {/* Progress Ring */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" className="text-white/10" />
                    <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" className="text-primary" strokeDasharray="150" strokeDashoffset="30" strokeLinecap="round" />
                  </svg>
                  <Play className="w-6 h-6 text-white fill-white absolute" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base shadow-lg shadow-primary/20 transition-all active:scale-95">
                  Continue Path
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vertical Learning Path */}
        <div className="relative pl-6 space-y-8 before:absolute before:left-[1.65rem] before:top-4 before:bottom-0 before:w-1 before:bg-border/50 before:rounded-full">

          <div className="relative">
            <span className="absolute -left-[2.15rem] top-0 bg-background py-1 text-xs font-bold text-muted-foreground -rotate-90 origin-center translate-y-8 w-20 text-center">
              UNIT 1
            </span>

            <div className="space-y-4">
              {/* Unit Header */}
              {(() => {
                const unitLevels = gameState.levels.filter(l => l.topic === 'Basic Programming');
                const unitCompleted = unitLevels.filter(l => l.isCompleted).length;
                const currentInUnit = unitLevels.find(l => !l.isCompleted && l.isUnlocked);

                return (
                  <>
                    <div className="flex items-center justify-between mb-4 pl-4">
                      <h3 className="text-lg font-black text-foreground">Introduction to Code</h3>
                      <Badge variant="secondary" className="font-bold">
                        {unitCompleted}/{unitLevels.length} Completed
                      </Badge>
                    </div>

                    {/* Path Nodes */}
                    {unitLevels.slice(0, 4).map((level, i) => {
                      const isCompleted = level.isCompleted;
                      const isCurrent = currentInUnit?.id === level.id;
                      const isLocked = !level.isUnlocked && !isCompleted;

                      return (
                        <motion.div
                          key={level.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${isCurrent
                            ? 'bg-background border-primary shadow-[0_4px_0_0_rgba(0,0,0,0)] shadow-primary'
                            : isCompleted
                              ? 'bg-secondary/50 border-transparent opacity-80'
                              : 'bg-secondary/20 border-transparent opacity-60 grayscale'
                            }`}
                          onClick={() => !isLocked && navigate(`/puzzle/${level.id}`)}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${isCurrent ? 'bg-primary text-primary-foreground' : 'bg-background'
                            }`}>
                            {isCompleted ? <Award className="w-6 h-6 text-yellow-500 fill-yellow-500" /> : <Star className="w-6 h-6" />}
                          </div>

                          <div className="flex-1">
                            <h4 className="font-bold text-foreground">
                              {level.title}
                            </h4>
                            <p className="text-xs font-medium text-muted-foreground">Lesson {i + 1}</p>
                          </div>

                          {isCurrent && (
                            <div className="absolute -right-2 -top-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">
                              START
                            </div>
                          )}

                          {isLocked && (
                            <div className="absolute right-4 text-muted-foreground/30">
                              <Target className="w-4 h-4" />
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                  </>
                );
              })()}
            </div>
          </div>

          <div className="relative pt-8">
            <span className="absolute -left-[2.15rem] top-8 bg-background py-1 text-xs font-bold text-muted-foreground -rotate-90 origin-center w-20 text-center">
              UNIT 2
            </span>
            <div className="bg-muted/30 border-2 border-dashed border-muted rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-muted rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <Target className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h3 className="font-bold text-muted-foreground">Control Flow</h3>
              <p className="text-xs text-muted-foreground/70">Complete Unit 1 to unlock</p>
            </div>
          </div>
        </div>

        {/* Daily Stats (Moved to bottom secondary) */}
        <section className="pt-4">
          <h3 className="text-lg font-bold text-foreground mb-4">Daily Goals</h3>
          <DailyGoalsWidget />
        </section>

      </div>

      {/* AI Assistant */}
      <CodioAssistant />
    </div>
  );
};

export default Index;