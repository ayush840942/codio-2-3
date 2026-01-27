import { supabase } from "@/integrations/supabase/client";

/**
 * Security utility for safe profile data access
 * Ensures sensitive fields are only accessible to profile owners
 */

// Fields that are safe for public viewing
const PUBLIC_PROFILE_FIELDS = [
  'id',
  'username', 
  'avatar_url',
  'created_at'
] as const;

// Fields that only the profile owner should see
const PRIVATE_PROFILE_FIELDS = [
  'user_name', // Contains email-like data
  'business_name',
  'referral_code', 
  'credits_used',
  'credits_limit',
  'bonus_credits',
  'referrals_count',
  'referred_by',
  'plan',
  'trial_start_date',
  'full_name',
  'user_id'
] as const;

// Complete profile fields for authenticated user accessing their own profile
const OWNER_PROFILE_FIELDS = [
  ...PUBLIC_PROFILE_FIELDS,
  ...PRIVATE_PROFILE_FIELDS,
  'updated_at'
] as const;

/**
 * Safely fetch public profile data for display purposes
 * Only returns non-sensitive fields
 */
export const fetchPublicProfile = async (profileId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select(PUBLIC_PROFILE_FIELDS.join(', '))
    .eq('id', profileId)
    .single();

  if (error) {
    console.error('Error fetching public profile:', error);
    return { data: null, error };
  }

  return { data, error: null };
};

/**
 * Safely fetch own complete profile data
 * Returns all fields for the authenticated user's own profile
 */
export const fetchOwnProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select(OWNER_PROFILE_FIELDS.join(', '))
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching own profile:', error);
    return { data: null, error };
  }

  return { data, error: null };
};

/**
 * Check if current user can access full profile data
 */
export const canAccessFullProfile = (profileId: string, currentUserId: string | undefined): boolean => {
  return currentUserId === profileId;
};

/**
 * Sanitize profile data by removing sensitive fields if not owner
 */
export const sanitizeProfileData = (profileData: any, currentUserId: string | undefined) => {
  if (!profileData) return null;
  
  // If viewing own profile, return all data
  if (canAccessFullProfile(profileData.id, currentUserId)) {
    return profileData;
  }
  
  // Otherwise, return only public fields
  const sanitized: any = {};
  PUBLIC_PROFILE_FIELDS.forEach(field => {
    if (profileData[field] !== undefined) {
      sanitized[field] = profileData[field];
    }
  });
  
  return sanitized;
};
