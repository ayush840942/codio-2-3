
import React, { useState } from 'react';
import { Camera as CameraIcon, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

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

  // Check if running on mobile natively
  const isNative = Capacitor.isNativePlatform();

  const handleFileSelect = async (event: any) => {
    const file = event.target?.files?.[0] || event.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image too large (max 5MB)');
      return;
    }

    setIsUploading(true);
    try {
      if (onProfilePictureChange) {
        await onProfilePictureChange(file);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to update profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
      });

      if (!image.webPath) {
        toast.error('Failed to get image path');
        return;
      }

      setIsUploading(true);

      const response = await fetch(image.webPath);
      const blob = await response.blob();
      const file = new File([blob], `profile_${Date.now()}.jpg`, { type: 'image/jpeg' });

      if (onProfilePictureChange) {
        await onProfilePictureChange(file);
      }
    } catch (error: any) {
      console.error('Camera error:', error);
      if (!error.message?.includes('cancelled')) {
        toast.error('Camera capture failed');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
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

  const handlePhotoUpload = () => {
    if (isNative) {
      // Use Capacitor Camera API on mobile
      handleCameraCapture();
    } else {
      // Use file input on web
      triggerFileInput();
    }
  };

  return (
    <div className="relative">
      <Avatar className={`${sizeClasses[size]} relative border-3 border-black shadow-comic-lg bg-white overflow-hidden`}>
        <AvatarImage src={profilePicture} alt="Profile" className="object-cover" />
        <AvatarFallback className="bg-pastel-yellow/20">
          <User className="w-1/2 h-1/2 text-black/20" />
        </AvatarFallback>
      </Avatar>

      {editable && (
        <Button
          onClick={handlePhotoUpload}
          disabled={isUploading}
          size="sm"
          className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full p-0 bg-white hover:bg-gray-100 border-2 border-black shadow-comic"
        >
          <CameraIcon className="w-5 h-5 text-black" strokeWidth={3} />
        </Button>
      )}
    </div>
  );
};

export default ProfilePicture;
