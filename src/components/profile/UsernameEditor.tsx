import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Edit3, Check, X, Sparkles, Crown } from 'lucide-react';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import { Badge } from '@/components/ui/badge';

const UsernameEditor = () => {
  const { user, profile, setProfile } = useAuth();
  const { subscriptionTier, isSubscribed } = useSubscriptionFeatures();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Sync local state with profile from context
  useEffect(() => {
    if (profile) {
      setUsername(profile.username || '');
      setDisplayName(profile.user_name || profile.full_name || '');
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) {
      setError('You must be logged in to update your profile');
      return;
    }

    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username.trim())) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const trimmedUsername = username.trim().toLowerCase();
      const trimmedDisplayName = displayName.trim();

      // 1. Check if the HANDLE (username) is taken
      const { data: existingUsername, error: usernameCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', trimmedUsername)
        .neq('id', user.id)
        .maybeSingle();

      if (usernameCheckError) throw usernameCheckError;
      if (existingUsername) {
        setError('That handle is already claimed! Try another?');
        setLoading(false);
        return;
      }

      // 2. Prepare the update object
      const updateData: any = {
        username: trimmedUsername,
        full_name: trimmedDisplayName || null,
        updated_at: new Date().toISOString()
      };

      // 3. Try updating profile directly
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single();

      if (updateError) {
        if (updateError.code === '23505') {
          setError('Something went wrong (duplicate entry). Try a different handle!');
        } else {
          throw updateError;
        }
        setLoading(false);
        return;
      }

      if (updatedProfile) {
        setProfile(updatedProfile);
        setSuccess('Profile updated! 🚀');
        setIsEditing(false);
        setTimeout(() => setSuccess(''), 3000);
      }

    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to original values from profile
    setUsername(profile?.username || '');
    setDisplayName(profile?.user_name || profile?.full_name || '');
    setIsEditing(false);
    setError('');
  };

  // Get display value for username
  const displayUsername = profile?.username || username || 'Not set';
  const displayFullName = profile?.user_name || profile?.full_name || displayName || 'Not set';

  return (
    <div className="w-full space-y-3">
      {error && (
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertDescription className="text-destructive text-sm">{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500/50 bg-green-500/10">
          <AlertDescription className="text-green-600 text-sm">{success}</AlertDescription>
        </Alert>
      )}

      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Display Name
            </label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              className="h-10"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Username
            </label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
              placeholder="Enter your username"
              className="h-10"
            />
            <p className="text-[10px] text-muted-foreground mt-1">
              Letters, numbers, and underscores only
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              onClick={handleSave}
              disabled={loading}
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Save
                </>
              )}
            </Button>

            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
              disabled={loading}
              className="flex-1"
            >
              <X className="w-3 h-3 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <h2 className="text-lg font-semibold text-foreground">
              {displayFullName}
            </h2>
            {isSubscribed && (
              <Badge
                variant="outline"
                className={`flex items-center gap-1.5 h-6 px-2 rounded-full border-none font-black text-[10px] uppercase tracking-wider ${subscriptionTier === 'elite' || subscriptionTier === 'premium-yearly'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-sm'
                  : 'bg-primary text-slate-900 shadow-sm'
                  }`}
              >
                {subscriptionTier === 'elite' || subscriptionTier === 'premium-yearly' ? (
                  <>
                    <Crown className="w-3 h-3 fill-white" />
                    Elite
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 fill-slate-900" />
                    Pro
                  </>
                )}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="p-1 h-auto hover:bg-secondary"
            >
              <Edit3 className="w-3.5 h-3.5 text-muted-foreground" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">@{displayUsername}</p>
        </div>
      )}
    </div>
  );
};

export default UsernameEditor;
