
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

// Enhanced Button with mobile-optimized micro-interactions
export const AnimatedButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  className = ""
}) => {
  const isMobile = useIsMobile();
  
  const baseClasses = "relative overflow-hidden font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 touch-manipulation";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl focus:ring-blue-500",
    secondary: "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm",
    success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl focus:ring-green-500",
    danger: "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl focus:ring-red-500",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800"
  };

  const sizeClasses = {
    sm: "px-4 py-2.5 text-sm min-h-[40px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[56px]"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : (isMobile ? 1 : 1.02) }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            />
            <span>Loading...</span>
          </motion.div>
        ) : (
          <motion.span
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        whileTap={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

// Enhanced Card with mobile interactions
export const AnimatedCard: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hoverable?: boolean;
}> = ({ children, onClick, className = "", hoverable = true }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-mobile border border-gray-100/50 overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
      whileHover={hoverable && !isMobile ? { 
        y: -4,
        scale: 1.02,
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)"
      } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      layout
    >
      {children}
    </motion.div>
  );
};

// Floating notification with mobile optimization
export const FloatingNotification: React.FC<{
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  isVisible: boolean;
  onClose: () => void;
}> = ({ message, type, isVisible, onClose }) => {
  const typeColors = {
    success: 'from-green-500 to-emerald-500',
    info: 'from-blue-500 to-cyan-500',
    warning: 'from-yellow-500 to-orange-500',
    error: 'from-red-500 to-pink-500'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1
          }}
          exit={{ 
            opacity: 0, 
            y: -100,
            scale: 0.8
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={`fixed top-4 left-4 right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 md:w-auto bg-gradient-to-r ${typeColors[type]} text-white px-6 py-4 rounded-2xl shadow-mobile-lg z-50 flex items-center justify-between gap-3 backdrop-blur-xl`}
        >
          <span className="font-medium">{message}</span>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-all"
          >
            ×
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Enhanced Progress Ring with better animations
export const ProgressRing: React.FC<{
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showPercentage?: boolean;
}> = ({ progress, size = 80, strokeWidth = 6, color = "#3b82f6", showPercentage = true }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          strokeLinecap="round"
        />
      </svg>
      {showPercentage && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        >
          <span className="text-lg font-bold text-gray-700">
            {Math.round(progress)}%
          </span>
        </motion.div>
      )}
    </div>
  );
};

// Enhanced Pulse dot for notifications
export const PulseDot: React.FC<{
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ color = 'bg-red-500', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className="relative">
      <motion.div
        className={`${color} ${sizeClasses[size]} rounded-full`}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className={`absolute inset-0 ${color} ${sizeClasses[size]} rounded-full opacity-75`}
        animate={{ scale: [1, 2, 1], opacity: [0.75, 0, 0.75] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

// Mobile-optimized input field
export const AnimatedInput: React.FC<{
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  className?: string;
}> = ({ placeholder, value, onChange, type = "text", className = "" }) => {
  return (
    <motion.input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm text-base ${className}`}
      whileFocus={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
};

// Bouncy Icon component for micro-interactions
export const BouncyIcon: React.FC<{
  children: React.ReactNode;
  trigger?: boolean;
  className?: string;
}> = ({ children, trigger = false, className = "" }) => {
  return (
    <motion.div
      className={className}
      animate={trigger ? { 
        scale: [1, 1.3, 1],
        rotate: [0, 5, -5, 0]
      } : {}}
      transition={{ 
        duration: 0.6,
        type: "spring",
        stiffness: 300,
        damping: 10
      }}
    >
      {children}
    </motion.div>
  );
};
