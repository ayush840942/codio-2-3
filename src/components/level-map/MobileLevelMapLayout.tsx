
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileScrollArea } from '@/components/ui/mobile-scroll-area';

interface MobileLevelMapLayoutProps {
  children: React.ReactNode;
}

const MobileLevelMapLayout: React.FC<MobileLevelMapLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div 
      className="w-full min-h-[100dvh] bg-gradient-to-br from-slate-50 to-blue-50/30 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <MobileScrollArea className="h-[100dvh]">
        <div className={`
          w-full max-w-full mx-auto overflow-x-hidden
          ${isMobile ? 'px-2 py-2' : 'px-4 md:px-6 lg:px-8 py-4 md:py-6'}
          space-y-3 md:space-y-4
        `}>
          <div className="w-full overflow-x-hidden">
            {children}
          </div>
        </div>
      </MobileScrollArea>
    </motion.div>
  );
};

export default MobileLevelMapLayout;
