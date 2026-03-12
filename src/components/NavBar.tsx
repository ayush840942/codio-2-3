import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DrawnButton, DrawnCard } from '@/components/ui/HandDrawnComponents';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useGame } from '@/context/GameContext';
import { useRewards } from '@/context/RewardsContext';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { Home, Map, User, Trophy, ShoppingCart, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '@/components/ui/logo';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { gameState } = useGame();
  const { rewards } = useRewards();
  const { playButtonPress, playPageTransition } = useSoundEffects();

  const handleNavigation = (path: string) => {
    playButtonPress();
    setTimeout(() => {
      playPageTransition();
      navigate(path);
    }, 50);
  };

  const getInitials = () => {
    if (profile?.username) return profile.username.charAt(0).toUpperCase();
    if (!user?.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home', bg: 'bg-pastel-blue' },
    { path: '/levels', icon: Map, label: 'Learn', bg: 'bg-pastel-mint' },
    { path: '/subscription', icon: ShoppingCart, label: 'Pro', bg: 'bg-pastel-pink' },
    { path: '/profile', icon: User, label: 'Me', bg: 'bg-pastel-lavender' }
  ];

  const hideNavigation = location.pathname.startsWith('/puzzle') || location.pathname === '/code-result';
  if (hideNavigation) return null;

  return (
    <nav className="hidden md:flex fixed top-4 left-4 right-4 z-[100] font-draw">
      <DrawnCard className="w-full px-8 py-4 bg-white/95 backdrop-blur-md flex items-center justify-between border-4 border-black shadow-comic">
        {/* Logo/Brand */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleNavigation('/')}
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Logo size="md" showText={true} />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const itemColorMap = {
              'bg-pastel-blue': 'bg-cc-blue',
              'bg-pastel-mint': 'bg-cc-green',
              'bg-pastel-pink': 'bg-cc-pink',
              'bg-pastel-lavender': 'bg-cc-purple'
            };
            const activeBg = itemColorMap[item.bg as keyof typeof itemColorMap] || 'bg-cc-yellow';

            return (
              <motion.div key={item.path} whileHover={{ y: -4 }} whileTap={{ scale: 0.9 }}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex flex-col items-center gap-1 px-5 py-2 rounded-2xl border-4 transition-all",
                    isActive
                      ? `${activeBg} border-black shadow-comic-sm`
                      : 'bg-transparent border-transparent hover:bg-black/5'
                  )}
                >
                  <item.icon className={cn("h-7 w-7 text-black", isActive ? 'stroke-[3.5px]' : 'stroke-[2.5px]')} />
                  <span className="text-sm font-black uppercase tracking-widest">{item.label}</span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          {/* XP Display - NOW USING REWARDS.XP */}
          <motion.div
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-cc-yellow border-4 border-black rounded-2xl shadow-comic-sm rotate-1"
            whileHover={{ rotate: 0, scale: 1.05 }}
          >
            <Trophy className="h-6 w-6 text-black" strokeWidth={3} />
            <span className="text-xl font-black text-black">
              {rewards?.xp || 0} XP
            </span>
          </motion.div>

          {/* User Avatar */}
          <motion.div
            className="w-14 h-14 bg-white border-4 border-black rounded-2xl overflow-hidden shadow-comic-sm cursor-pointer relative"
            whileHover={{ scale: 1.1, rotate: 3 }}
            onClick={() => handleNavigation('/profile')}
          >
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="You" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-cc-pink flex items-center justify-center text-3xl font-black text-black">
                {getInitials()}
              </div>
            )}
          </motion.div>
        </div>
      </DrawnCard>
    </nav>
  );
};

export default NavBar;
