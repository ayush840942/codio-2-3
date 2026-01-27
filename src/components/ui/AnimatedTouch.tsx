
import React from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface AnimatedTouchProps {
  children: React.ReactNode;
  className?: string;
  springConfig?: {
    stiffness?: number;
    damping?: number;
  };
  scaleOnTap?: number;
  enableHover?: boolean;
  onClick?: () => void;
}

const AnimatedTouch: React.FC<AnimatedTouchProps> = ({
  children,
  className = "",
  springConfig = { stiffness: 400, damping: 17 },
  scaleOnTap = 0.95,
  enableHover = true,
  onClick,
}) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className={cn(
        "touch-manipulation select-none",
        isMobile && "active:scale-95",
        className
      )}
      whileTap={{ 
        scale: scaleOnTap
      }}
      whileHover={enableHover && !isMobile ? { 
        scale: 1.02
      } : {}}
      transition={{
        type: "spring",
        ...springConfig
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedTouch;
