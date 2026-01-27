import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className,
  size = 'md',
  showText = true
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <div className={cn(
          'absolute inset-0 bg-primary/20 rounded-xl blur-md opacity-60',
          sizeClasses[size]
        )} />

        <div className={cn(
          'relative rounded-xl flex items-center justify-center shadow-lg overflow-hidden bg-white border border-border',
          sizeClasses[size]
        )}>
          <img
            src="/logo-robot.jpg"
            alt="Codio Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            'font-bold bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent leading-tight',
            textSizeClasses[size]
          )}>
            Codio
          </span>
          {size !== 'sm' && (
            <span className="text-[10px] text-muted-foreground -mt-0.5">Learn • Code • Master</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
