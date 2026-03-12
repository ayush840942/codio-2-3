import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useGame } from '@/context/GameContext';
import { useRewards } from '@/context/RewardsContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Sparkles } from 'lucide-react';
import Logo from '@/components/ui/logo';
import NotificationCenter from '@/components/notifications/NotificationCenter';

interface AppHeaderProps {
  showBackButton?: boolean;
  title?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  showBackButton = false,
  title
}) => {
  const { user, profile } = useAuth();
  const { gameState } = useGame();
  const { rewards } = useRewards();
  const navigate = useNavigate();

  const getInitials = () => {
    if (profile?.username) return profile.username.charAt(0).toUpperCase();
    if (!user?.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <motion.header
      className="bg-white/90 backdrop-blur-md border-b-4 border-black sticky top-0 z-50 shadow-comic-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {showBackButton && (
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="w-12 h-12 p-0 rounded-xl border-3 border-black bg-white shadow-comic-sm hover:bg-cc-yellow/20"
              >
                <ChevronLeft className="h-6 w-6 text-black" strokeWidth={3} />
              </Button>
            </motion.div>
          )}

          {!showBackButton && (
            <motion.div
              className="flex items-center gap-2 relative"
              whileTap={{ scale: 0.97 }}
            >
              <Logo size="sm" showText={true} className="relative z-10" />
            </motion.div>
          )}

          {title && (
            <h1 className="text-xl font-black text-black uppercase tracking-tighter ml-2">{title}</h1>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* XP Counter - Comic Style */}
          <motion.div
            className="relative flex items-center gap-2 bg-cc-yellow border-3 border-black px-4 py-2 rounded-xl shadow-comic-sm rotate-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star className="h-4 w-4 text-black fill-black" strokeWidth={3} />
            <span className="text-sm font-black text-black">
              {rewards.xp || 0} XP
            </span>
          </motion.div>

          {/* Notification Center */}
          <div className="relative z-10">
            <NotificationCenter />
          </div>

          {/* Profile Avatar - Card Style */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1, rotate: -3 }}
            className="relative w-11 h-11"
          >
            <div className="absolute inset-0 bg-black rounded-xl translate-x-0.5 translate-y-0.5" />
            <div
              className="relative w-full h-full rounded-xl border-3 border-black bg-white overflow-hidden cursor-pointer"
              onClick={handleProfileClick}
            >
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile?.username || 'User Avatar'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-cc-pink flex items-center justify-center text-black font-black text-lg">
                  {getInitials()}
                </div>
              )}
            </div>

            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cc-green rounded-full border-2 border-black shadow-comic-sm" />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default AppHeader;
