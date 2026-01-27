import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useGame } from '@/context/GameContext';
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
      className="bg-card/60 backdrop-blur-xl border-b border-border/30 sticky top-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {showBackButton && (
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackClick} 
                className="w-10 h-10 p-0 rounded-xl bg-secondary/50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
          
          {!showBackButton && (
            <motion.div 
              className="flex items-center gap-2"
              whileTap={{ scale: 0.97 }}
            >
              <Logo size="sm" showText={true} />
            </motion.div>
          )}
          
          {title && (
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* XP Counter - 3D Style */}
          <motion.div 
            className="relative flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 px-3 py-2 rounded-2xl shadow-sm border border-amber-200/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-yellow-400/10 rounded-2xl" />
            
            <motion.div 
              className="relative w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Star className="h-3.5 w-3.5 text-white fill-white" />
            </motion.div>
            <span className="relative text-sm font-bold text-amber-700">
              {gameState.xp || 0}
            </span>
          </motion.div>

          {/* Notification Center */}
          <NotificationCenter />

          {/* Profile Avatar - 3D Style */}
          <motion.div 
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-full blur-sm opacity-30 scale-110" />
            
            <Avatar 
              className="relative h-10 w-10 cursor-pointer border-2 border-white shadow-lg" 
              onClick={handleProfileClick}
            >
              {profile?.avatar_url ? (
                <AvatarImage 
                  src={profile.avatar_url} 
                  alt={profile?.username || 'User Avatar'} 
                  className="object-cover" 
                />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-sm font-bold">
                  {getInitials()}
                </AvatarFallback>
              )}
            </Avatar>
            
            {/* Online indicator */}
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white shadow-sm"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default AppHeader;
