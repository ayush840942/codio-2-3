import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useGame } from '@/context/GameContext';
import { useRewards } from '@/context/RewardsContext';
import { supabase } from '@/integrations/supabase/client';
import UsernameEditor from '@/components/profile/UsernameEditor';
import ProfilePicture from '@/components/profile/ProfilePicture';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Trophy,
  Star,
  Target,
  Flame,
  LogOut,
  ChevronRight,
  Crown,
  Settings,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import FloatingCodeElements from '@/components/home/FloatingCodeElements';

const Profile = () => {
  const { user, profile, signOut } = useAuth();
  const { gameState } = useGame();
  const { rewards } = useRewards();
  const navigate = useNavigate();

  const completedLevels = gameState.levels.filter(l => l.isCompleted).length;
  const totalLevels = gameState.levels.length;
  const progressPercent = totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      if (!user) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      console.log('Uploading file to:', fileName);

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          upsert: true
        });

      if (uploadError) {
        console.error('Supabase Storage Upload Error:', uploadError);
        toast.error(`Upload failed: ${uploadError.message}`);
        throw uploadError;
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', user.id);

      if (updateError) {
        console.error('Profile Update Error:', updateError);
        throw updateError;
      }

      toast.success('Avatar updated! Refreshing...');
      // Force refresh (temporary until Context sync)
      setTimeout(() => window.location.reload(), 1000);

    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      // Toast is handled by the component or detailed error above
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-100/30" />
        <FloatingCodeElements />
        <div className="relative min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full max-w-sm"
          >
            <Card className="rounded-3xl shadow-xl border-border/50 overflow-hidden">
              <CardContent className="p-8 text-center">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <User className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-xl font-bold mb-2 text-foreground">Sign In Required</h2>
                <p className="text-muted-foreground mb-6">Please sign in to view your profile</p>
                <Button onClick={() => navigate('/auth')} variant="gradient" className="w-full h-12 rounded-2xl">
                  Sign In
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: Target, label: 'Levels', value: completedLevels, gradient: 'from-emerald-400 to-green-600' },
    { icon: Star, label: 'XP', value: gameState.xp, gradient: 'from-amber-400 to-orange-500' },
    { icon: Trophy, label: 'Coins', value: rewards.coins, gradient: 'from-blue-400 to-indigo-600' },
    { icon: Flame, label: 'Streak', value: rewards.loginStreak, gradient: 'from-red-400 to-orange-500' },
  ];

  const menuItems = [
    { icon: Crown, label: 'Subscription', desc: 'Upgrade your plan', path: '/subscription', gradient: 'from-amber-400 to-yellow-500' },
    { icon: Settings, label: 'Settings', desc: 'App preferences', path: '/settings', gradient: 'from-gray-400 to-gray-600' },
    { icon: HelpCircle, label: 'Help & Support', desc: 'Get assistance', path: '/help', gradient: 'from-blue-400 to-cyan-500' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pb-28">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-lavender-50 via-background to-purple-50/30 -z-10" />
      <FloatingCodeElements />

      <div className="relative px-4 py-6 space-y-5 max-w-md mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-4"
        >
          <h1 className="text-2xl font-bold text-foreground font-display">Profile</h1>
        </motion.div>

        {/* Profile Card - 3D Style */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6 }}
          style={{ perspective: '1000px' }}
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-3xl blur-xl transform translate-y-2 scale-95" />

            <Card className="relative rounded-3xl shadow-xl border-border/50 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-2xl" />

              <CardContent className="relative p-6">
                <div className="flex flex-col items-center">
                  <ProfilePicture
                    profilePicture={profile?.avatar_url}
                    onProfilePictureChange={uploadAvatar}
                    editable={true}
                  />
                  <div className="mt-4 text-center w-full">
                    <UsernameEditor />
                  </div>
                </div>

                {/* Progress - 3D Ring */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="hsl(var(--secondary))"
                        strokeWidth="6"
                        fill="none"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="hsl(var(--primary))"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - progressPercent / 100) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{progressPercent}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Learning Progress</p>
                    <p className="text-sm text-muted-foreground">{completedLevels} of {totalLevels} levels</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Stats Grid - 3D Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-4 gap-2"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative"
            >
              {/* Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl blur-lg opacity-20`} />

              <Card className="relative rounded-2xl border-border/50 overflow-hidden">
                <CardContent className="p-3 text-center">
                  <motion.div
                    className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mx-auto mb-1 shadow-lg`}
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 6, repeat: Infinity, delay: i * 1.5, ease: "linear" }}
                  >
                    <stat.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Menu Items - 3D Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          {menuItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.path)}
              className="cursor-pointer"
            >
              <Card className="rounded-2xl border-border/50 shadow-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 10 }}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Preview - 3D Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 rounded-3xl blur-xl" />

            <Card className="relative rounded-3xl border-border/50 overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg flex items-center justify-center shadow-md"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Trophy className="w-4 h-4 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-foreground">Achievements</h3>
                  </div>
                  <span className="text-sm font-semibold text-primary">{completedLevels > 0 ? '1' : '0'} earned</span>
                </div>

                {completedLevels > 0 ? (
                  <motion.div
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Trophy className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">First Steps</p>
                      <p className="text-xs text-muted-foreground">Completed your first level</p>
                    </div>
                    <Sparkles className="w-5 h-5 text-amber-500 ml-auto" />
                  </motion.div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">Complete levels to earn achievements</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Sign Out - 3D Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full h-14 rounded-2xl border-destructive/30 text-destructive hover:bg-destructive/10 font-semibold"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
