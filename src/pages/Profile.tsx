import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useGame } from '@/context/GameContext';
import { useRewards } from '@/context/RewardsContext';
import { supabase } from '@/integrations/supabase/client';
import { toDatabaseId } from '@/utils/idMapping';
import UsernameEditor from '@/components/profile/UsernameEditor';
import ProfilePicture from '@/components/profile/ProfilePicture';
import { toast } from 'sonner';
import { DrawnButton, DrawnCard } from '@/components/ui/HandDrawnComponents';
import ComicMascot from '@/components/ui/ComicMascot';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
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
  Sparkles,
  Globe,
  Briefcase
} from 'lucide-react';

const Profile = () => {
  const { user, profile, setProfile, signOut, subscriptionTier } = useAuth();
  const { gameState } = useGame();
  const { rewards } = useRewards();
  const navigate = useNavigate();

  const [isEditingSocial, setIsEditingSocial] = React.useState(false);
  const [socialLinks, setSocialLinks] = React.useState({
    github_url: profile?.github_url || '',
    linkedin_url: profile?.linkedin_url || '',
    twitter_url: profile?.twitter_url || '',
    bio: profile?.bio || ''
  });

  // Update local state when profile changes
  React.useEffect(() => {
    if (profile) {
      setSocialLinks({
        github_url: profile.github_url || '',
        linkedin_url: profile.linkedin_url || '',
        twitter_url: profile.twitter_url || '',
        bio: profile.bio || ''
      });
    }
  }, [profile]);

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
    const uploadToast = toast.loading('Uploading photo...');
    try {
      if (!user) return;

      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const dbId = toDatabaseId(user.id);
      const fileName = `${dbId}/${Date.now()}.${fileExt}`;

      // 1. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          upsert: true,
          contentType: file.type
        });

      if (uploadError) {
        console.error('Storage Error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // 3. Update Profile Table
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', dbId)
        .select()
        .single();

      if (updateError) throw updateError;

      if (updatedProfile) {
        setProfile(updatedProfile);
        toast.dismiss(uploadToast);
        toast.success('Looking sharp! Avatar updated! 📸');
      }
    } catch (error: any) {
      console.error('Avatar upload process failed:', error);
      toast.dismiss(uploadToast);
      toast.error(error.message || 'Upload failed. Check your connection.');
    }
  };

  const saveSocialLinks = async () => {
    const saveToast = toast.loading('Saving links...');
    try {
      if (!user) return;
      const dbId = toDatabaseId(user.id);

      const { data: updatedProfile, error } = await supabase
        .from('profiles')
        .update({
          github_url: socialLinks.github_url,
          linkedin_url: socialLinks.linkedin_url,
          twitter_url: socialLinks.twitter_url,
          bio: socialLinks.bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', dbId)
        .select()
        .single();

      if (error) throw error;

      if (updatedProfile) {
        setProfile(updatedProfile);
        setIsEditingSocial(false);
        toast.dismiss(saveToast);
        toast.success('Professional profile updated! 🚀');
      }
    } catch (error: any) {
      console.error('Failed to save social links:', error);
      toast.dismiss(saveToast);
      toast.error(error.message || 'Failed to save links.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-[100dvh] bg-pastel-cyan flex items-center justify-center p-6 font-draw">
        <DrawnCard className="bg-white p-10 text-center">
          <div className="w-20 h-20 bg-pastel-yellow border-3 border-black rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-comic">
            <User className="w-10 h-10 text-black" />
          </div>
          <h2 className="text-2xl font-black mb-2">HELLO?</h2>
          <p className="font-bold opacity-60 mb-6">You need to sign in first!</p>
          <DrawnButton onClick={() => navigate('/auth')} className="w-full h-14 bg-pastel-blue">
            SIGN IN
          </DrawnButton>
        </DrawnCard>
      </div>
    );
  }

  const stats = [
    { icon: Target, label: 'Levels', value: completedLevels, bg: 'bg-pastel-mint' },
    { icon: Star, label: 'XP', value: rewards?.xp || 0, bg: 'bg-pastel-yellow' },
    { icon: Trophy, label: 'Coins', value: rewards.coins, bg: 'bg-pastel-blue' },
    { icon: Sparkles, label: 'Hints', value: rewards.hintPoints, bg: 'bg-cc-yellow' },
    { icon: Flame, label: 'Streak', value: rewards.loginStreak, bg: 'bg-pastel-pink' },
  ];

  const menuItems = [
    { icon: Globe, label: 'Public Profile', desc: 'Recruiter preview', path: '/public-profile-preview', bg: 'bg-pastel-mint' },
    { icon: Briefcase, label: 'Career Hub', desc: 'Projects & Interviews', path: '/career', bg: 'bg-cc-blue text-white' },
    { icon: Crown, label: 'Pro Pass', desc: 'Get full access', path: '/subscription', bg: 'bg-pastel-yellow' },
    { icon: Sparkles, label: 'Hint Store', desc: 'Get more hints', path: '/hints', bg: 'bg-cc-green' },
    { icon: Settings, label: 'Settings', desc: 'App preferences', path: '/settings', bg: 'bg-white' },
    { icon: HelpCircle, label: 'Support', desc: 'Get assistance', path: '/help', bg: 'bg-white' },
  ];

  const isElite = subscriptionTier === 'elite' || subscriptionTier === 'premium-yearly' || subscriptionTier === 'trial';
  const isPro = subscriptionTier === 'pro' || subscriptionTier === 'premium-monthly';

  return (
    <div className="min-h-[100dvh] relative font-draw pb-32">
      <div className="max-w-2xl mx-auto px-6 pb-12 space-y-12" style={{ paddingTop: 'calc(var(--safe-area-top) + 3rem)' }}>

        {/* Unified Mobile Header */}
        <MobileHeader
          title="My Profile"
          showBack
          rightElement={
            <button
              onClick={() => navigate('/settings')}
              className="w-10 h-10 flex items-center justify-center bg-white border-2 border-black rounded-xl shadow-comic-sm active:translate-y-0.5 active:shadow-none transition-all"
            >
              <Settings className="w-5 h-5" strokeWidth={3} />
            </button>
          }
        />

        {/* Profile Card */}
        <DrawnCard className="bg-white p-8 relative overflow-visible border-4 border-black shadow-comic-lg">
          <div className={`absolute -top-8 -right-6 ${isElite ? 'bg-cc-yellow' : isPro ? 'bg-cc-blue text-white' : 'bg-cc-pink'} border-4 border-black px-5 py-2 rounded-2xl shadow-comic rotate-6 z-10 font-black text-sm uppercase tracking-widest flex items-center gap-2`}>
            {isElite ? <Sparkles className="w-4 h-4 fill-black" /> : isPro ? <Trophy className="w-4 h-4" /> : null}
            {isElite ? 'Elite Member' : isPro ? 'Pro Member' : 'Level 1 Member'}
          </div>

          <div className="flex flex-col items-center">
            <div className="relative group">
              <ProfilePicture
                profilePicture={profile?.avatar_url}
                onProfilePictureChange={uploadAvatar}
                editable={true}
              />
              {/* Settings icon removed - blocked the ProfilePicture upload button */}
            </div>
            <div className="mt-8 text-center w-full">
              <UsernameEditor />
            </div>
          </div>

          {/* Progress Section */}
          <div className="mt-12 space-y-4">
            <div className="flex justify-between font-black text-black uppercase tracking-widest text-xs italic">
              <span>Mission Progress</span>
              <span>{progressPercent}% COMPLETE</span>
            </div>
            <div className="h-8 bg-black rounded-2xl overflow-hidden border-2 border-black shadow-comic-sm p-1">
              <motion.div
                className="h-full bg-cc-green rounded-xl"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-center font-black text-black/40 text-xs uppercase tracking-widest italic mt-2">
              {completedLevels} / {totalLevels} Regions Conquered
            </p>
          </div>

          {/* Social Links Section */}
          <div className="mt-10 pt-8 border-t-4 border-black/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black uppercase tracking-tighter italic flex items-center gap-2">
                <Globe className="w-6 h-6 text-cc-blue" strokeWidth={3} />
                Professional Links
              </h3>
              <button
                onClick={() => setIsEditingSocial(!isEditingSocial)}
                className="text-xs font-black uppercase text-cc-blue hover:underline"
              >
                {isEditingSocial ? 'CANCEL' : 'EDIT'}
              </button>
            </div>

            {isEditingSocial ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">About Me</label>
                  <textarea
                    value={socialLinks.bio}
                    onChange={(e) => setSocialLinks({ ...socialLinks, bio: e.target.value })}
                    placeholder="Short bio for your public legend..."
                    className="w-full bg-cc-blue/5 border-3 border-black rounded-2xl p-4 font-bold text-sm h-24 resize-none focus:outline-none focus:bg-white transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { key: 'github_url', label: 'GitHub', placeholder: 'https://github.com/username' },
                    { key: 'linkedin_url', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username' },
                    { key: 'twitter_url', label: 'Twitter', placeholder: 'https://twitter.com/username' }
                  ].map((field) => (
                    <div key={field.key} className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{field.label}</label>
                      <input
                        type="url"
                        value={(socialLinks as any)[field.key]}
                        onChange={(e) => setSocialLinks({ ...socialLinks, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full bg-cc-blue/5 border-3 border-black rounded-2xl p-4 font-bold text-sm focus:outline-none focus:bg-white transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <DrawnButton onClick={saveSocialLinks} className="w-full h-14 bg-cc-green text-lg mt-4 shadow-comic border-4">
                  SAVE PROFESSIONAL INFO
                </DrawnButton>
              </div>
            ) : (
              <div className="flex justify-center gap-4">
                <div className="w-full text-center mb-4">
                  <p className="text-sm font-bold text-black/60 italic px-4">
                    {profile?.bio || "No bio set yet. Tell the world your coding story!"}
                  </p>
                </div>
                <div className="flex gap-4 w-full justify-center">
                  {[
                    { url: profile?.github_url, label: 'GitHub' },
                    { url: profile?.linkedin_url, label: 'LinkedIn' },
                    { url: profile?.twitter_url, label: 'Twitter' }
                  ].map((link, i) => (
                    <div
                      key={i}
                      className={`w-12 h-12 bg-white border-3 border-black rounded-2xl flex items-center justify-center shadow-comic-sm ${!link.url && 'opacity-20 grayscale'}`}
                    >
                      <Globe className="w-6 h-6" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DrawnCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}>
              <DrawnCard className={`${stat.bg} p-4 flex flex-col items-center text-center shadow-comic-sm border-4 border-black transform ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform cursor-pointer`}>
                <div className="w-10 h-10 flex items-center justify-center mb-2 bg-white border-2 border-black rounded-xl">
                  <stat.icon className="w-6 h-6 text-black" strokeWidth={3} />
                </div>
                <div className="text-2xl font-black leading-none text-black">{stat.value}</div>
                <div className="text-[10px] font-black uppercase opacity-60 tracking-widest mt-1">{stat.label}</div>
              </DrawnCard>
            </motion.div>
          ))}
        </div>

        {/* Menu Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2 ml-2">
            <Settings className="w-6 h-6 text-black" strokeWidth={3} />
            <h3 className="text-2xl font-black text-black uppercase tracking-widest">Navigation</h3>
          </div>
          {menuItems.map((item, i) => (
            <motion.div key={item.label} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 + i * 0.1 }}>
              <DrawnCard className={`${item.bg} p-5 hover:translate-x-2 transition-transform cursor-pointer border-4 border-black shadow-comic relative overflow-hidden`} onClick={() => navigate(item.path)}>
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-14 h-14 bg-white border-4 border-black rounded-2xl flex items-center justify-center shadow-comic-sm group-hover:rotate-6 transition-transform">
                    <item.icon className="w-7 h-7 text-black" strokeWidth={3} />
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl font-black text-black leading-tight uppercase tracking-tighter">{item.label}</p>
                    <p className="text-xs font-black text-black/30 uppercase tracking-widest italic">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-8 h-8 text-black" strokeWidth={4} />
                </div>
              </DrawnCard>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <DrawnCard className="bg-cc-blue/10 p-8 border-4 border-black shadow-comic-lg relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 opacity-5 -rotate-12">
            <Trophy className="w-48 h-48 text-black" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black text-black flex items-center gap-3 uppercase tracking-tighter italic">
                <Trophy className="w-8 h-8 text-black" strokeWidth={3} /> Hall of Fame
              </h3>
              <div className="bg-black text-white px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest">
                {completedLevels > 0 ? 'LEVEL 1 CLEAR' : 'NOVICE'}
              </div>
            </div>

            {completedLevels > 0 ? (
              <div className="flex items-center gap-6 bg-white border-4 border-black p-6 rounded-[2rem] shadow-comic rotate-1 hover:rotate-0 transition-transform">
                <div className="w-20 h-20 bg-cc-yellow border-4 border-black rounded-3xl flex items-center justify-center shadow-comic-sm -rotate-6">
                  <Star className="w-12 h-12 text-black fill-black" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-2xl font-black text-black tracking-tighter uppercase">First Steps</p>
                  <p className="text-sm font-black text-black/40 uppercase tracking-widest italic">Cleared Region 1</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 border-4 border-dashed border-black/10 rounded-[2rem]">
                <p className="font-black text-black/20 text-xl uppercase tracking-tighter">Your legend begins soon...</p>
              </div>
            )}
          </div>
        </DrawnCard>

        {/* Sign Out */}
        <DrawnButton variant="outlined" onClick={handleSignOut} className="w-full h-18 bg-white text-cc-pink border-4 border-cc-pink shadow-comic text-2xl">
          <LogOut className="w-7 h-7 mr-3" strokeWidth={4} />
          ABORT MISSION
        </DrawnButton>

      </div>
    </div>
  );
};

export default Profile;
