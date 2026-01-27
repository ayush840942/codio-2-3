import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, User, Zap, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRewards } from '@/context/RewardsContext';

const MobileNavigation = () => {
  const { rewards } = useRewards();

  const navItems = [
    { to: '/', icon: Home, label: 'Home', bg: 'bg-pastel-blue' },
    { to: '/levels', icon: Map, label: 'Learn', bg: 'bg-pastel-mint' },
    { to: '/mastery', icon: Award, label: 'Mastery', bg: 'bg-pastel-yellow' },
    { to: '/hints', icon: Zap, label: 'Hints', badge: rewards.hintPoints, bg: 'bg-pastel-pink' },
    { to: '/profile', icon: User, label: 'Profile', bg: 'bg-pastel-lavender' }
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-[100] md:hidden px-3"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      {/* Main container */}
      <div className="bg-card border border-border rounded-3xl shadow-lg mb-2">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map(({ to, icon: Icon, label, badge, bg }) => (
            <NavLink key={to} to={to} className="flex-1 max-w-[70px]">
              {({ isActive }) => (
                <motion.div
                  className="relative flex flex-col items-center justify-center py-2 px-1 rounded-2xl"
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Active background */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className={`absolute inset-1 ${bg} border border-border rounded-2xl`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon Container */}
                  <div className="relative z-10 mb-1">
                    <motion.div
                      animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="relative"
                    >
                      <div className={`w-8 h-8 flex items-center justify-center rounded-xl transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                        <Icon className={`h-6 w-6 ${isActive ? 'fill-current opacity-90' : 'opacity-70'}`} />
                      </div>
                    </motion.div>

                    {/* Badge */}
                    {badge !== undefined && badge > 0 && (
                      <motion.div
                        className="absolute -top-1 -right-2 bg-pastel-yellow border border-border text-foreground text-[9px] rounded-full min-w-[16px] h-[16px] flex items-center justify-center font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        {badge > 99 ? '99+' : badge}
                      </motion.div>
                    )}
                  </div>

                  {/* Label */}
                  <motion.span
                    className={`text-[10px] font-semibold relative z-10 transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                  >
                    {label}
                  </motion.span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default MobileNavigation;