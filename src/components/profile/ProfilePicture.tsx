
import React, { useState } from 'react';
import { Camera, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface ProfilePictureProps {
  profilePicture?: string;
  onProfilePictureChange?: (file: File) => void;
  editable?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  profilePicture,
  onProfilePictureChange,
  editable = false,
  size = 'md'
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-24 w-24',
    lg: 'h-32 w-32'
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      if (onProfilePictureChange) {
        await onProfilePictureChange(file); // Await the upload function
        toast.success('Profile picture updated successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // This enables camera on mobile
    input.style.display = 'none';

    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files?.[0]) {
        handleFileSelect(e as any);
      }
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  return (
    <div className="relative">
      <Avatar className={`${sizeClasses[size]} relative`}>
        <AvatarImage src={profilePicture} alt="Profile" />
        <AvatarFallback>
          <User className="w-1/2 h-1/2" />
        </AvatarFallback>
      </Avatar>

      {editable && (
        <Button
          onClick={triggerFileInput}
          disabled={isUploading}
          size="sm"
          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-blue-600 hover:bg-blue-700"
        >
          <Camera className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default ProfilePicture;
