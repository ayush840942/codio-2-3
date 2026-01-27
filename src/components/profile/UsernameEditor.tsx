import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Edit3, Check, X } from 'lucide-react';

const UsernameEditor = () => {
  const { user, profile, setProfile } = useAuth();
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
      
      // Check if username is already taken by another user
      const { data: existingUsername, error: usernameCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', trimmedUsername)
        .neq('id', user.id)
        .maybeSingle();

      if (usernameCheckError) {
        console.error('Error checking username:', usernameCheckError);
        throw new Error('Failed to verify username availability');
      }

      if (existingUsername) {
        setError('This username is already taken');
        setLoading(false);
        return;
      }

      // Generate a unique user_name if display name is provided
      // Add a random suffix to avoid unique constraint issues
      let uniqueUserName = trimmedDisplayName || null;
      
      if (trimmedDisplayName) {
        // Check if user_name is already taken by another user
        const { data: existingDisplayName } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_name', trimmedDisplayName)
          .neq('id', user.id)
          .maybeSingle();

        // If taken by someone else, add a unique suffix
        if (existingDisplayName) {
          const randomSuffix = Math.random().toString(36).substring(2, 6);
          uniqueUserName = `${trimmedDisplayName}_${randomSuffix}`;
        }
      }

      // Update the profile
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update({
          username: trimmedUsername,
          user_name: uniqueUserName,
          full_name: trimmedDisplayName || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating profile:', updateError);
        // Check for unique constraint violation
        if (updateError.code === '23505' || updateError.message?.includes('unique constraint') || updateError.message?.includes('duplicate key')) {
          // Try again with a different unique suffix
          const randomSuffix = Date.now().toString(36);
          const retryUserName = trimmedDisplayName ? `${trimmedDisplayName}_${randomSuffix}` : null;
          
          const { data: retryProfile, error: retryError } = await supabase
            .from('profiles')
            .update({
              username: trimmedUsername,
              user_name: retryUserName,
              full_name: trimmedDisplayName || null,
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id)
            .select()
            .single();
            
          if (retryError) {
            setError('This username or display name is already taken. Please try a different one.');
            setLoading(false);
            return;
          }
          
          if (retryProfile) {
            setProfile(retryProfile);
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
            setTimeout(() => setSuccess(''), 3000);
            return;
          }
        }
        throw new Error(updateError.message || 'Failed to update profile');
      }

      // Update the profile in context - this propagates the change everywhere
      if (updatedProfile) {
        setProfile(updatedProfile);
      }

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
      
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
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">
              {displayFullName}
            </h2>
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
