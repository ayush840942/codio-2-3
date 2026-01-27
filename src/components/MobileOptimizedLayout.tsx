
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import MobileNavigation from '@/components/MobileNavigation';
import { motion, AnimatePresence } from 'framer-motion';

const MobileOptimizedLayout = () => {
  const location = useLocation();

  // Hide navigation ONLY on puzzle pages and code result
  const hideNavigation = location.pathname.startsWith('/puzzle') ||
    location.pathname === '/code-result';

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Notch Header - Matches app theme background */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] bg-background"
        style={{ height: 'var(--safe-area-top)' }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen w-full pt-[var(--safe-area-top)]"
      >
        {/* Desktop NavBar */}
        {!hideNavigation && (
          <div className="hidden md:block w-full">
            <NavBar />
          </div>
        )}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            className={`min-h-screen w-full ${hideNavigation ? 'pb-0 pt-0' : 'pb-24 md:pb-4'
              }`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{
              duration: 0.4,
              ease: "easeOut"
            }}
          >
            <div className={`w-full ${hideNavigation ? 'px-0' : 'px-1 sm:px-2 md:px-4'}`}>
              <Outlet />
            </div>
          </motion.main>
        </AnimatePresence>

      </motion.div>

      {/* Mobile Navigation - Outside motion wrapper to prevent transform interference */}
      {!hideNavigation && (
        <MobileNavigation />
      )}
    </div>
  );
};

export default MobileOptimizedLayout;
