
import React, { useEffect } from 'react';
import { usePushNotifications } from '@/hooks/usePushNotifications';

interface PushNotificationHandlerProps {
  onTokenReceived?: (token: string) => void;
}

const PushNotificationHandler: React.FC<PushNotificationHandlerProps> = ({ 
  onTokenReceived 
}) => {
  const { token, isSupported, isRegistered } = usePushNotifications();

  useEffect(() => {
    if (token && onTokenReceived) {
      onTokenReceived(token);
    }
  }, [token, onTokenReceived]);

  // This component handles push notification setup silently
  // No UI rendered - just the side effects
  return null;
};

export default PushNotificationHandler;
