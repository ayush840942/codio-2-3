
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import MobileNavigation from '@/components/MobileNavigation';
import { motion } from 'framer-motion';

const MobileOptimizedLayout = () => {
  const location = useLocation();

  // Hide navigation ONLY on puzzle pages and code result
  const hideNavigation = location.pathname.startsWith('/puzzle') ||
    location.pathname === '/code-result';

  return (
    <div className="min-h-[100dvh] bg-pastel-yellow/5 w-full font-draw relative overflow-x-hidden">
      {/* Global Background dots pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />

      <div
        className="relative z-10 min-h-[100dvh] w-full flex flex-col animate-fade-in"
      >
        {/* Desktop NavBar */}
        {!hideNavigation && (
          <div className="hidden md:block w-full px-4 pt-4">
            <NavBar />
          </div>
        )}

        {/* Main Content */}
        <main
          className={`flex-1 w-full ${hideNavigation ? 'pb-0 pt-0' : 'pb-24 md:pb-4'
            }`}
        >
          <div className={`w-full max-w-6xl mx-auto ${hideNavigation ? 'px-0' : 'px-4 sm:px-6'}`}>
            <Outlet />
          </div>
        </main>

      </div>

      {/* Mobile Navigation - Outside motion wrapper to prevent transform interference */}
      {!hideNavigation && (
        <MobileNavigation />
      )}
    </div>
  );
};

export default MobileOptimizedLayout;
