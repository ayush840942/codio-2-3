
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { createRateLimiter } from '@/utils/inputValidation';

const loginRateLimiter = createRateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes
const passwordResetRateLimiter = createRateLimiter(3, 60 * 60 * 1000); // 3 attempts per hour

export const useAuthSecurity = () => {
  const { user } = useAuth();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isAccountLocked, setIsAccountLocked] = useState(false);
  const [lockoutEnd, setLockoutEnd] = useState<Date | null>(null);

  useEffect(() => {
    if (user) {
      setIsEmailVerified(user.email_confirmed_at !== null);
    }
  }, [user]);

  const validatePasswordStrength = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    
    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number' };
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one special character' };
    }
    
    return { isValid: true, message: 'Password is strong' };
  };

  const handleFailedLogin = (email: string) => {
    const attempts = failedAttempts + 1;
    setFailedAttempts(attempts);
    
    if (attempts >= 5) {
      const lockoutDuration = Math.min(15 * Math.pow(2, attempts - 5), 60 * 60) * 1000; // Exponential backoff, max 1 hour
      const lockEnd = new Date(Date.now() + lockoutDuration);
      setIsAccountLocked(true);
      setLockoutEnd(lockEnd);
      
      toast.error('Account Locked', {
        description: `Too many failed attempts. Account locked until ${lockEnd.toLocaleTimeString()}`
      });
    } else {
      toast.error('Login Failed', {
        description: `Invalid credentials. ${5 - attempts} attempts remaining.`
      });
    }
  };

  const canAttemptLogin = (email: string): boolean => {
    if (isAccountLocked && lockoutEnd && Date.now() < lockoutEnd.getTime()) {
      toast.error('Account Locked', {
        description: `Account is locked until ${lockoutEnd.toLocaleTimeString()}`
      });
      return false;
    }
    
    if (isAccountLocked && lockoutEnd && Date.now() >= lockoutEnd.getTime()) {
      setIsAccountLocked(false);
      setLockoutEnd(null);
      setFailedAttempts(0);
    }
    
    if (!loginRateLimiter(email)) {
      toast.error('Rate Limit Exceeded', {
        description: 'Too many login attempts. Please wait 15 minutes before trying again.'
      });
      return false;
    }
    
    return true;
  };

  const canAttemptPasswordReset = (email: string): boolean => {
    if (!passwordResetRateLimiter(email)) {
      toast.error('Rate Limit Exceeded', {
        description: 'Too many password reset attempts. Please wait 1 hour before trying again.'
      });
      return false;
    }
    
    return true;
  };

  const requireEmailVerification = async (action: string): Promise<boolean> => {
    if (!user) return false;
    
    if (!isEmailVerified) {
      toast.error('Email Verification Required', {
        description: `Please verify your email address to ${action}. Check your inbox for the verification link.`
      });
      
      // Resend verification email
      await supabase.auth.resend({
        type: 'signup',
        email: user.email!
      });
      
      return false;
    }
    
    return true;
  };

  const logSecurityEvent = async (event: string, details: any) => {
    if (!user) return;
    
    try {
      console.log('Security Event:', {
        event,
        user_id: user.id,
        timestamp: new Date().toISOString(),
        details
      });
      
      // In a production environment, you would send this to a security logging service
      // For now, we'll just log to console and could extend to store in database
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  return {
    isEmailVerified,
    validatePasswordStrength,
    handleFailedLogin,
    canAttemptLogin,
    canAttemptPasswordReset,
    requireEmailVerification,
    logSecurityEvent,
    isAccountLocked,
    lockoutEnd,
    failedAttempts
  };
};
