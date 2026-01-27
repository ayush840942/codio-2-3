import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Award,
  Trophy,
  BookOpen,
  Target,
  Code2,
  ChevronRight,
  Sparkles,
  Zap,
  Star,
  Flame,
  GraduationCap,
  Play,
  SquareCode,
  Notebook
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import MasteryDashboard from '@/components/mastery/MasteryDashboard';
import { useAuth } from '@/context/AuthContext';
import { useGame } from '@/context/GameContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CodePracticeEnvironment from '@/components/practice/CodePracticeEnvironment';
import { getChallengesByLanguage, PracticeChallenge } from '@/data/practiceChallenges';

const Mastery = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'tests' | 'practice'>('tests');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<PracticeChallenge | null>(null);

  const languages = [
    { name: 'HTML', emoji: '🌐', color: 'from-orange-400 to-red-500', bgColor: 'bg-orange-500/10', iconColor: 'text-orange-600', path: 'web' },
    { name: 'CSS', emoji: '🎨', color: 'from-pink-400 to-purple-600', bgColor: 'bg-pink-500/10', iconColor: 'text-pink-600', path: 'web' },
    { name: 'JavaScript', emoji: '⚡', color: 'from-amber-400 to-orange-500', bgColor: 'bg-amber-500/10', iconColor: 'text-amber-600', path: 'web' },
    { name: 'React', emoji: '⚛️', color: 'from-cyan-400 to-blue-500', bgColor: 'bg-cyan-500/10', iconColor: 'text-cyan-600', path: 'web' },
    { name: 'Python', emoji: '🐍', color: 'from-emerald-400 to-green-600', bgColor: 'bg-emerald-500/10', iconColor: 'text-emerald-600', path: 'backend' },
    { name: 'Go', emoji: '🐹', color: 'from-sky-400 to-blue-600', bgColor: 'bg-sky-500/10', iconColor: 'text-sky-600', path: 'backend' },
    { name: 'Node.js', emoji: '🟢', color: 'from-green-400 to-emerald-600', bgColor: 'bg-green-500/10', iconColor: 'text-green-600', path: 'backend' },
    { name: 'Swift', emoji: '🍎', color: 'from-orange-500 to-red-600', bgColor: 'bg-orange-500/10', iconColor: 'text-orange-600', path: 'mobile' },
    { name: 'Kotlin', emoji: '💜', color: 'from-purple-500 to-indigo-600', bgColor: 'bg-purple-500/10', iconColor: 'text-purple-600', path: 'mobile' },
    { name: 'Flutter', emoji: '🦋', color: 'from-cyan-500 to-blue-600', bgColor: 'bg-cyan-500/10', iconColor: 'text-cyan-600', path: 'mobile' },
  ];

  const preferredPath = localStorage.getItem('codio_preferred_path') || 'web';
  const { gameState } = useGame();

  const calculateProgress = (langName: string) => {
    const langLevels = gameState.levels.filter(l => l.topic === langName);
    if (langLevels.length === 0) return 0;
    const completed = langLevels.filter(l => l.isCompleted).length;
    return Math.round((completed / langLevels.length) * 100);
  };

  const filteredLanguages = languages
    .filter(lang => lang.path === preferredPath)
    .map(lang => ({ ...lang, progress: calculateProgress(lang.name) }));

  const otherLanguages = languages
    .filter(lang => lang.path !== preferredPath)
    .map(lang => ({ ...lang, progress: calculateProgress(lang.name) }));

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="w-full max-w-sm border-primary/20 overflow-hidden shadow-xl rounded-3xl">
            <div className="h-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />
            <CardContent className="p-8 text-center">
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <GraduationCap className="w-12 h-12 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 text-foreground">Master Your Skills</h2>
              <p className="text-muted-foreground mb-6">Sign in to access certification tests and practice</p>
              <Button onClick={() => navigate('/auth')} className="w-full h-12 text-base rounded-xl font-bold">
                <Sparkles className="w-5 h-5 mr-2" />
                Sign In to Continue
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const handleBackFromChallenge = () => {
    if (selectedChallenge) {
      setSelectedChallenge(null);
    } else if (selectedLanguage) {
      setSelectedLanguage(null);
    } else {
      navigate(-1);
    }
  };

  // Show challenge editor
  if (selectedChallenge) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/50 pt-safe-top">
          <div className="px-4 py-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackFromChallenge}
                className="rounded-xl shrink-0 hover:bg-primary/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-bold text-foreground truncate">
                  {selectedChallenge.title}
                </h1>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{selectedLanguage}</span>
                  <span>•</span>
                  <span className={`capitalize ${selectedChallenge.difficulty === 'easy' ? 'text-green-500' :
                    selectedChallenge.difficulty === 'medium' ? 'text-amber-500' :
                      'text-red-500'
                    }`}>
                    {selectedChallenge.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 max-w-2xl mx-auto">
          <CodePracticeEnvironment
            language={selectedLanguage || 'JavaScript'}
            challenge={{
              title: selectedChallenge.title,
              description: selectedChallenge.description,
              starterCode: selectedChallenge.starterCode,
              expectedOutput: selectedChallenge.expectedOutput,
              hint: selectedChallenge.hint,
            }}
          />
        </div>
      </div>
    );
  }

  // Show challenge list for selected language
  if (selectedLanguage) {
    const challenges = getChallengesByLanguage(selectedLanguage);
    const langInfo = languages.find(l => l.name === selectedLanguage);

    return (
      <div className="min-h-screen bg-background pb-28">
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/50 pt-safe-top">
          <div className="px-4 py-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackFromChallenge}
                className="rounded-xl shrink-0 hover:bg-primary/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className={`w-12 h-12 bg-gradient-to-br ${langInfo?.color || 'from-primary to-primary/60'} rounded-2xl flex items-center justify-center shrink-0 shadow-lg`}>
                <span className="text-2xl">{langInfo?.emoji}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-bold text-foreground truncate">
                  {selectedLanguage} Path
                </h1>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {challenges.length} Steps to Mastery
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-8 max-w-2xl mx-auto relative">
          {/* Path Line */}
          <div className="absolute left-[3.2rem] top-8 bottom-0 w-1 bg-border/40 rounded-full" />

          <div className="space-y-8 relative">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-6"
              >
                <div
                  className={`w-14 h-14 rounded-full border-4 shrink-0 flex items-center justify-center cursor-pointer transition-all z-10 ${index === 0 // Assuming first is unlocked/current
                    ? `bg-white border-${langInfo?.iconColor.split('-')[1]}-500 shadow-lg scale-110`
                    : 'bg-muted border-transparent opacity-60'
                    }`}
                  onClick={() => setSelectedChallenge(challenge)}
                >
                  <Code2 className={`w-6 h-6 ${index === 0 ? langInfo?.iconColor : 'text-muted-foreground'}`} />
                </div>

                <Card
                  className={`flex-1 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all cursor-pointer ${index === 0 ? 'bg-white' : 'bg-muted/30'}`}
                  onClick={() => setSelectedChallenge(challenge)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className={`font-bold ${index === 0 ? 'text-foreground' : 'text-muted-foreground'}`}>{challenge.title}</h3>
                      <p className="text-xs text-muted-foreground">{challenge.difficulty} Practice</p>
                    </div>
                    {index === 0 && (
                      <Button size="sm" className="rounded-full bg-primary h-8 px-4">Start</Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Scrollable Content */}
      <div className="px-6 pt-safe-top pb-6 max-w-2xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Mastery Path</h1>
            <p className="text-sm font-medium text-slate-500">Choose a certification to start</p>
          </div>
          <div className="w-10 h-10 bg-pastel-yellow rounded-xl flex items-center justify-center border-study shadow-sm">
            <Award className="w-6 h-6 text-slate-800" />
          </div>
        </div>

        {/* Quick Tools */}
        <div className="grid grid-cols-2 gap-4">
          <Card
            className="rounded-[2rem] border-2 border-study p-1 cursor-pointer overflow-hidden group"
            onClick={() => navigate('/playground')}
          >
            <CardContent className="p-6 bg-slate-900 text-white rounded-[1.8rem] h-full flex flex-col justify-between">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <SquareCode className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="font-black text-lg leading-tight mb-1">Playground</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Execution</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="rounded-[2rem] border-2 border-study p-1 cursor-pointer overflow-hidden group"
            onClick={() => navigate('/memo')}
          >
            <CardContent className="p-6 bg-white rounded-[1.8rem] h-full flex flex-col justify-between">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Notebook className="w-6 h-6 text-slate-800" />
              </div>
              <div>
                <h4 className="font-black text-lg leading-tight mb-1">Memos</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Study Notes</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hero Card - Current Focus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-[2.5rem] border-0 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden relative group cursor-pointer border-b-8 border-slate-950">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Target className="w-48 h-48 text-white rotate-12" />
            </div>
            <CardContent className="p-8 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <Badge className="bg-white/10 text-white border-white/20 mb-3 hover:bg-white/20">
                    Recommended
                  </Badge>
                  <h2 className="text-3xl font-black text-white leading-tight mb-2">
                    JavaScript<br />Certification
                  </h2>
                  <p className="text-slate-400 font-medium">
                    75% of developers start here.
                  </p>
                </div>
                <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center border-4 border-amber-300 shadow-lg origin-bottom-right rotate-3 group-hover:rotate-6 transition-transform">
                  <span className="text-3xl">JS</span>
                </div>
              </div>

              <Button
                className="w-full h-14 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-lg border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 transition-all"
                onClick={() => setSelectedLanguage('JavaScript')}
              >
                Continue Path
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vertical Language List */}
        <div className="space-y-4">
          <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">Your {preferredPath} Path</h3>

          {filteredLanguages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="group cursor-pointer rounded-[2rem] border-study border-2 border-primary/20 hover:border-primary/50 transition-all active:scale-[0.98] bg-white overflow-hidden"
                onClick={() => setSelectedLanguage(lang.name)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-16 h-16 ${lang.bgColor} rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {lang.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-black text-slate-800 mb-1">{lang.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${lang.color} transition-all duration-1000`}
                          style={{ width: `${lang.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-400">{lang.progress}%</span>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <h3 className="font-black text-slate-400 text-lg uppercase tracking-tight pt-6">Other Paths</h3>
          <div className="grid grid-cols-1 gap-3">
            {otherLanguages.map((lang) => (
              <div
                key={lang.name}
                onClick={() => setSelectedLanguage(lang.name)}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-white hover:shadow-md transition-all"
              >
                <div className={`w-10 h-10 ${lang.bgColor} rounded-xl flex items-center justify-center text-xl`}>
                  {lang.emoji}
                </div>
                <span className="font-bold text-slate-600">{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mastery;