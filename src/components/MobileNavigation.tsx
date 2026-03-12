import React from 'react';
import {
  NavLink
} from 'react-router-dom';
import {
  Home,
  User,
  Briefcase,
  Map,
  Award,
  Trophy,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRewards } from '@/context/RewardsContext';
import { useKeyboard } from '@/hooks/useKeyboard';

const MobileNavigation = () => {
  const { rewards } = useRewards();
  const { isOpen: isKeyboardOpen } = useKeyboard();

  const navItems = [
    { to: '/', icon: Home, label: 'Home', bg: 'bg-pastel-blue' },
    { to: '/levels', icon: Map, label: 'Learn', bg: 'bg-pastel-mint' },
    { to: '/career', icon: Briefcase, label: 'Career', bg: 'bg-pastel-pink' },
    { to: '/leagues', icon: Trophy, label: 'Leagues', bg: 'bg-pastel-lavender' },
    { to: '/mastery', icon: Award, label: 'Mastery', bg: 'bg-pastel-yellow' },
    { to: '/profile', icon: User, label: 'Profile', bg: 'bg-cc-blue' }
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-[80] md:hidden px-4"
      initial={{ y: 100 }}
      animate={{ y: isKeyboardOpen ? 150 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      {/* Main container - Comic Style */}
      <div className="bg-white border-4 border-black rounded-[2.5rem] shadow-comic overflow-hidden">
        <div className="flex items-center justify-around px-2 py-3 bg-white/50 backdrop-blur-sm">
          {navItems.map(({ to, icon: Icon, label, badge, bg }: any) => (
            <NavLink key={to} to={to} className="flex-1 max-w-[62px]">
              {({ isActive }) => (
                <motion.div
                  className="relative flex flex-col items-center justify-center py-2 px-1 rounded-2xl"
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Active background */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className={`absolute inset-0 ${bg} border-3 border-black rounded-2xl shadow-comic-sm`}
                        initial={{ scale: 0, opacity: 0, rotate: -5 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon Container */}
                  <div className="relative z-10 mb-1">
                    <motion.div
                      animate={isActive ? { scale: 1.2, y: -2 } : { scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="relative"
                    >
                      <div className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${isActive ? 'text-black' : 'text-black/30'
                        }`}>
                        <Icon className={`h-7 w-7 ${isActive ? 'stroke-[3.5px]' : 'stroke-[2.5px]'}`} />
                      </div>
                    </motion.div>

                    {/* Badge */}
                    {badge !== undefined && badge > 0 && (
                      <motion.div
                        className="absolute -top-2 -right-3 bg-cc-yellow border-2 border-black text-black text-[9px] rounded-lg min-w-[20px] h-[20px] flex items-center justify-center font-black shadow-comic-sm z-20"
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
                    className={`text-[9px] font-black font-draw relative z-10 transition-colors uppercase leading-none mt-1 tracking-wider ${isActive ? 'text-black' : 'text-black/40'
                      }`}
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