
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ResponsivePuzzleLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsivePuzzleLayout: React.FC<ResponsivePuzzleLayoutProps> = ({ 
  children, 
  className 
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      // Mobile-first responsive container
      "w-full max-w-full mx-auto min-h-screen overflow-x-hidden",
      // Enhanced mobile spacing and safe areas
      isMobile ? "px-2 py-2" : "px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 lg:py-6",
      // Flexible layout that adapts to screen size
      "flex flex-col",
      isMobile ? "gap-2" : "gap-3 sm:gap-4 md:gap-5 lg:gap-6",
      // Mobile optimizations
      "touch-manipulation",
      // Enhanced mobile background
      "bg-gradient-to-br from-slate-50 to-blue-50/30",
      // Safe area handling for mobile devices with notches
      "pt-safe-area-top pb-safe-area-bottom pl-safe-area-left pr-safe-area-right",
      // Prevent any horizontal overflow
      "overflow-x-hidden",
      // Mobile-specific improvements
      isMobile && "min-h-screen antialiased",
      className
    )}>
      <div className="w-full overflow-x-hidden max-w-full flex-1">
        {children}
      </div>
    </div>
  );
};

export default ResponsivePuzzleLayout;
