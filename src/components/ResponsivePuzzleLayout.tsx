
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
      "w-full max-w-full mx-auto min-h-[100dvh] overflow-x-hidden",
      isMobile ? "px-2 py-2" : "px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 lg:py-6",
      "flex flex-col",
      "touch-manipulation",
      // Hand-drawn theme background
      "bg-pastel-cyan relative",
      "pt-safe-area-top pb-safe-area-bottom pl-safe-area-left pr-safe-area-right",
      "overflow-x-hidden",
      isMobile && "min-h-[100dvh] antialiased",
      className
    )}>
      <div className="w-full h-full relative z-10 overflow-x-hidden max-w-full flex-1">
        {children}
      </div>
    </div>
  );
};

export default ResponsivePuzzleLayout;
