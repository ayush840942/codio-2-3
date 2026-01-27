
import { toast } from 'sonner';

export const sanitizeCodeBlock = (code: string): string => {
  if (!code) return '';

  // Remove any potentially harmful characters or commands
  let sanitizedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Limit the length of the code block to prevent abuse
  sanitizedCode = sanitizedCode.substring(0, 1000);

  return sanitizedCode;
};

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // Password must be at least 8 characters long
  if (password.length < 8) {
    toast.error("Password must be at least 8 characters long.");
    return false;
  }

  // Password must contain at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    toast.error("Password must contain at least one uppercase letter.");
    return false;
  }

  // Password must contain at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    toast.error("Password must contain at least one lowercase letter.");
    return false;
  }

  // Password must contain at least one digit
  if (!/[0-9]/.test(password)) {
    toast.error("Password must contain at least one digit.");
    return false;
  }

  // Password must contain at least one special character (non-alphanumeric)
  if (!/[^a-zA-Z0-9\s]/.test(password)) {
    toast.error("Password must contain at least one special character.");
    return false;
  }

  return true;
};

export const validateUsername = (username: string): boolean => {
  // Username must be between 3 and 20 characters long
  if (username.length < 3 || username.length > 20) {
    toast.error("Username must be between 3 and 20 characters long.");
    return false;
  }

  // Username must contain only alphanumeric characters and underscores
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    toast.error("Username must contain only alphanumeric characters and underscores.");
    return false;
  }

  return true;
};

export const validatePlan = (plan: any): { success: boolean; error?: string; data?: any } => {
  try {
    if (!plan || typeof plan !== 'object') {
      return { success: false, error: 'Plan must be a valid object' };
    }
    
    if (!plan.id || typeof plan.id !== 'string') {
      return { success: false, error: 'Plan ID is required and must be a string' };
    }
    
    if (!plan.name || typeof plan.name !== 'string') {
      return { success: false, error: 'Plan name is required and must be a string' };
    }
    
    if (typeof plan.price !== 'number' || plan.price < 0) {
      return { success: false, error: 'Plan price must be a non-negative number' };
    }
    
    return { success: true, data: plan };
  } catch (error) {
    return { success: false, error: 'Failed to validate plan' };
  }
};

export const validateMetadata = (metadata: any): { success: boolean; error?: string; data?: any } => {
  try {
    if (!metadata || typeof metadata !== 'object') {
      return { success: true, data: {} };
    }
    
    if (metadata.hintAmount !== undefined) {
      if (typeof metadata.hintAmount !== 'number' || metadata.hintAmount <= 0) {
        return { success: false, error: 'Hint amount must be a positive number' };
      }
    }
    
    if (metadata.type !== undefined) {
      if (typeof metadata.type !== 'string') {
        return { success: false, error: 'Metadata type must be a string' };
      }
    }
    
    return { success: true, data: metadata };
  } catch (error) {
    return { success: false, error: 'Failed to validate metadata' };
  }
};

export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, { count: number; resetTime: number }>();

  return (identifier: string): boolean => {
    const now = Date.now();
    const userAttempts = attempts.get(identifier);

    if (!userAttempts || now > userAttempts.resetTime) {
      attempts.set(identifier, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (userAttempts.count >= maxAttempts) {
      return false;
    }

    userAttempts.count++;
    return true;
  };
};
