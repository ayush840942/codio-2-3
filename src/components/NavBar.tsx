import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useGame } from '@/context/GameContext';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { Home, Map, User, Trophy, ShoppingCart, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { gameState } = useGame();
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
    { path: '/', icon: Home, label: 'Home' },
    { path: '/levels', icon: Map, label: 'Levels' },
    { path: '/subscription', icon: ShoppingCart, label: 'Premium' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  // Hide navigation ONLY on puzzle pages and code result
  const hideNavigation = location.pathname.startsWith('/puzzle') || location.pathname === '/code-result';

  if (hideNavigation) {
    return null;
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavigation('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden bg-white border border-border">
                <img
                  src="/logo-robot.jpg"
                  alt="Codio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
                  Codio
                </h1>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-2">
              {navItems.map((item, index) => (
                <motion.div key={item.path}>
                  <Button
                    variant={location.pathname === item.path ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleNavigation(item.path)}
                    className={`gap-2 transition-all duration-200 px-4 py-2 rounded-xl ${location.pathname === item.path
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
              {/* XP Display */}
              <motion.div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-bold text-yellow-700">
                  {gameState.xp} XP
                </span>
              </motion.div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="w-10 h-10 rounded-xl p-0">
                <Bell className="h-4 w-4 text-slate-600" />
              </Button>

              {/* User Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar
                  className="h-9 w-9 border-2 border-slate-200 cursor-pointer"
                  onClick={() => handleNavigation('/profile')}
                >
                  {profile?.avatar_url ? (
                    <AvatarImage src={profile.avatar_url} alt={profile?.username || 'User Avatar'} className="object-cover" />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold">
                      {getInitials()}
                    </AvatarFallback>
                  )}
                </Avatar>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
