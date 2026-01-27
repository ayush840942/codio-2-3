
import React, { useEffect } from 'react';
import { FloatingNotification } from '@/components/ui/MicroInteractions';

interface PuzzleNotificationSystemProps {
  notification: {
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    isVisible: boolean;
  };
  onClose: () => void;
}

const PuzzleNotificationSystem: React.FC<PuzzleNotificationSystemProps> = ({
  notification,
  onClose
}) => {
  // Auto-close notification after 4 seconds
  useEffect(() => {
    if (notification.isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [notification.isVisible, onClose]);

  // Handle touch/click to close
  const handleNotificationClick = () => {
    onClose();
  };

  if (!notification.isVisible) {
    return null;
  }

  return (
    <div 
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto cursor-pointer"
      onClick={handleNotificationClick}
      data-notification
    >
      <FloatingNotification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={onClose}
      />
    </div>
  );
};

export default PuzzleNotificationSystem;
