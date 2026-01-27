import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Moon,
  Volume2,
  Vibrate,
  Globe,
  Shield,
  Trash2,
  ChevronRight,
  Send,
  Loader2,
  FileText,
  Check
} from 'lucide-react';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isSupported, isRegistered, requestPermission, sendNotification } = usePushNotifications();
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() =>
    localStorage.getItem('app_language') || 'en'
  );

  const handleTestNotification = async () => {
    setIsSendingTest(true);
    try {
      const result = await sendNotification('custom', {
        title: '🧪 Test Notification',
        body: 'Push notifications are working correctly!'
      });
      toast.success(`Notification sent! (${result?.sent || 0} delivered)`);
    } catch (error) {
      console.error('Test notification error:', error);
      toast.error('Failed to send test notification');
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleLanguageChange = (langCode: string) => {
    localStorage.setItem('app_language', langCode);
    setSelectedLanguage(langCode);
    setShowLanguageDialog(false);
    toast.success(`Language changed to ${LANGUAGES.find(l => l.code === langCode)?.name}`);
  };

  // Settings state with localStorage persistence
  const [notifications, setNotifications] = useState(() =>
    localStorage.getItem('settings_notifications') !== 'false'
  );
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('settings_darkMode') === 'true'
  );
  const [sound, setSound] = useState(() =>
    localStorage.getItem('settings_sound') !== 'false'
  );
  const [haptics, setHaptics] = useState(() =>
    localStorage.getItem('settings_haptics') !== 'false'
  );

  const handleSettingChange = async (key: string, value: boolean, setter: (v: boolean) => void) => {
    // Handle push notifications specially
    if (key === 'notifications' && value && isSupported) {
      const success = await requestPermission();
      if (!success) {
        toast.error('Could not enable notifications');
        return;
      }
    }

    localStorage.setItem(`settings_${key}`, String(value));
    setter(value);

    // Apply dark mode immediately
    if (key === 'darkMode') {
      if (value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const handleClearCache = () => {
    // Clear app cache (localStorage items except auth)
    const authData = localStorage.getItem('supabase.auth.token');
    localStorage.clear();
    if (authData) localStorage.setItem('supabase.auth.token', authData);
    window.location.reload();
  };

  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          desc: 'Get reminders and updates',
          value: notifications,
          onChange: (v: boolean) => handleSettingChange('notifications', v, setNotifications)
        },
        {
          icon: Moon,
          label: 'Dark Mode',
          desc: 'Reduce eye strain',
          value: darkMode,
          onChange: (v: boolean) => handleSettingChange('darkMode', v, setDarkMode)
        },
        {
          icon: Volume2,
          label: 'Sound Effects',
          desc: 'Play sounds on actions',
          value: sound,
          onChange: (v: boolean) => handleSettingChange('sound', v, setSound)
        },
        {
          icon: Vibrate,
          label: 'Haptic Feedback',
          desc: 'Vibrate on interactions',
          value: haptics,
          onChange: (v: boolean) => handleSettingChange('haptics', v, setHaptics)
        }
      ]
    }
  ];

  const currentLang = LANGUAGES.find(l => l.code === selectedLanguage);

  const actionItems = [
    {
      icon: Globe,
      label: 'Language',
      desc: `${currentLang?.flag} ${currentLang?.name}`,
      action: () => setShowLanguageDialog(true)
    },
    {
      icon: Shield,
      label: 'Privacy Policy',
      desc: 'View our policies',
      action: () => setShowPrivacyDialog(true)
    },
    {
      icon: FileText,
      label: 'Terms of Service',
      desc: 'Read our terms',
      action: () => setShowPrivacyDialog(true)
    },
    {
      icon: Trash2,
      label: 'Clear Cache',
      desc: 'Free up storage',
      action: handleClearCache,
      danger: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-50 to-background pb-28">
      <div className="px-4 py-6 space-y-5 max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-2xl bg-card border border-border"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground font-display">Settings</h1>
            <p className="text-sm text-muted-foreground">Customize your experience</p>
          </div>
        </div>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
              {group.title}
            </h2>
            <Card>
              <CardContent className="p-0 divide-y divide-border">
                {group.items.map((item, i) => (
                  <div key={item.label} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <Switch
                      checked={item.value}
                      onCheckedChange={item.onChange}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Test Notification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
            Developer Tools
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Test Push Notification</p>
                    <p className="text-xs text-muted-foreground">Send a test notification to your device</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={handleTestNotification}
                  disabled={isSendingTest}
                >
                  {isSendingTest ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Send'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
            More
          </h2>
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              {actionItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-4 cursor-pointer active:bg-secondary/50 transition-colors"
                  onClick={item.action}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.danger ? 'bg-destructive/10' : 'bg-secondary'
                      }`}>
                      <item.icon className={`w-5 h-5 ${item.danger ? 'text-destructive' : 'text-muted-foreground'
                        }`} />
                    </div>
                    <div>
                      <p className={`font-medium ${item.danger ? 'text-destructive' : 'text-foreground'}`}>
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* App Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center pt-4"
        >
          <p className="text-sm text-muted-foreground">Codio v1.0.0</p>
          <p className="text-xs text-muted-foreground/60">Made with ❤️ for learners</p>
        </motion.div>
      </div>

      {/* Language Dialog */}
      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Select Language
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 max-h-[60vh] overflow-y-auto">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${selectedLanguage === lang.code
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-secondary hover:bg-secondary/80'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium text-foreground">{lang.name}</span>
                </div>
                {selectedLanguage === lang.code && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Dialog */}
      <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy Policy & Terms
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            <section>
              <h3 className="font-semibold text-foreground mb-2">Privacy Policy</h3>
              <p>
                Codio ("we", "our", or "us") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, and safeguard your information.
              </p>
            </section>

            <section>
              <h4 className="font-medium text-foreground mb-1">Information We Collect</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Account information (email, username)</li>
                <li>Learning progress and achievements</li>
                <li>Device information for notifications</li>
                <li>Usage analytics to improve the app</li>
              </ul>
            </section>

            <section>
              <h4 className="font-medium text-foreground mb-1">How We Use Your Information</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>To provide and personalize learning experiences</li>
                <li>To track your progress and achievements</li>
                <li>To send notifications about streaks and rewards</li>
                <li>To improve our services</li>
              </ul>
            </section>

            <section>
              <h4 className="font-medium text-foreground mb-1">Data Security</h4>
              <p>
                We implement industry-standard security measures to protect your data.
                Your information is encrypted and stored securely.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">Terms of Service</h3>
              <p>
                By using Codio, you agree to these terms. You must be at least 13 years old
                to use this service. You are responsible for maintaining the security of your account.
              </p>
            </section>

            <section>
              <h4 className="font-medium text-foreground mb-1">Acceptable Use</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Use the app for personal learning only</li>
                <li>Do not attempt to hack or exploit the app</li>
                <li>Do not share your account credentials</li>
                <li>Respect other users and our community</li>
              </ul>
            </section>

            <section>
              <h4 className="font-medium text-foreground mb-1">Contact Us</h4>
              <p>
                If you have questions about our privacy policy or terms,
                please contact us at support@codio.app
              </p>
            </section>

            <p className="text-xs text-muted-foreground/60 pt-4">
              Last updated: January 2026
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPage;