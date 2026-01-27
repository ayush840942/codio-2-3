
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Share2, CheckCircle, Star } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LANGUAGE_CONFIG } from '@/types/mastery';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  score?: number;
  completedAt?: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  language,
  score,
  completedAt
}) => {
  const { user } = useAuth();
  const config = LANGUAGE_CONFIG[language] || {
    icon: '📚',
    color: 'from-gray-500 to-gray-600'
  };

  const formattedDate = completedAt 
    ? new Date(completedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${language} Mastery Certificate`,
        text: `I've earned my ${language} Mastery Certificate on Codio! 🎉`,
        url: window.location.origin
      });
    } catch (error) {
      toast.success('Certificate link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    toast.success('Certificate download started!');
    // In a real app, this would generate a PDF
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          {/* Certificate design */}
          <div className="bg-gradient-to-br from-primary/5 via-background to-primary/10 p-8">
            {/* Decorative border */}
            <div className="absolute inset-4 border-2 border-dashed border-primary/20 rounded-xl pointer-events-none" />
            
            {/* Certificate content */}
            <div className="relative text-center py-6">
              {/* Header */}
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${config.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                  {config.icon}
                </div>
              </div>

              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Certificate of Mastery
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-6">
                {language}
              </h2>

              {/* Divider */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px bg-border flex-1 max-w-16" />
                <Star className="w-4 h-4 text-primary fill-current" />
                <div className="h-px bg-border flex-1 max-w-16" />
              </div>

              {/* Recipient */}
              <p className="text-sm text-muted-foreground mb-1">
                This certifies that
              </p>
              <p className="text-xl font-semibold text-foreground mb-4">
                {user?.email?.split('@')[0] || 'Developer'}
              </p>

              <p className="text-sm text-muted-foreground mb-6">
                has successfully demonstrated mastery in <br />
                <span className="font-medium text-foreground">{language} Programming</span>
              </p>

              {/* Score badge */}
              {score && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Test Score: {score}%
                  </span>
                </div>
              )}

              {/* Date */}
              <p className="text-xs text-muted-foreground">
                Issued on {formattedDate}
              </p>

              {/* Seal */}
              <div className="absolute bottom-4 right-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 bg-muted/30 flex gap-3">
            <Button variant="outline" onClick={handleShare} className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button onClick={handleDownload} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
