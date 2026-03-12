import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DrawnButton, DrawnCard } from '@/components/ui/HandDrawnComponents';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
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
import Logo from '@/components/ui/logo';
import MobileHeader from '@/components/MobileHeader';
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
  const { isSupported, requestPermission, sendNotification } = usePushNotifications();
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
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
    toast.success(`Language changed!`);
  };

  const [notifications, setNotifications] = useState(() => localStorage.getItem('settings_notifications') !== 'false');
  const [sound, setSound] = useState(() => localStorage.getItem('settings_sound') !== 'false');
  const [haptics, setHaptics] = useState(() => localStorage.getItem('settings_haptics') !== 'false');
  const [musicEnabled, setMusicEnabled] = useState(() => localStorage.getItem('settings_music') !== 'false');
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);

  const handleSettingChange = async (key: string, value: boolean, setter: (v: boolean) => void) => {
    if (key === 'notifications' && value && isSupported) {
      const success = await requestPermission();
      if (!success) {
        toast.error('Permission denied');
        return;
      }
    }
    localStorage.setItem(`settings_${key}`, String(value));
    setter(value);
  };

  const handleClearCache = () => {
    const authData = localStorage.getItem('supabase.auth.token');
    localStorage.clear();
    if (authData) localStorage.setItem('supabase.auth.token', authData);
    window.location.reload();
  };

  const settingsGroups = [
    {
      title: 'PREFERENCES',
      items: [
        { icon: Bell, label: 'Notifications', desc: 'Game reminders', value: notifications, onChange: (v: boolean) => handleSettingChange('notifications', v, setNotifications) },
        { icon: Volume2, label: 'Sound FX', desc: 'Playful sounds', value: sound, onChange: (v: boolean) => handleSettingChange('sound', v, setSound) },
        {
          icon: Volume2, label: 'Music', desc: 'Game BGM', value: musicEnabled, onChange: (v: boolean) => {
            localStorage.setItem('settings_music', String(v));
            setMusicEnabled(v);
            window.dispatchEvent(new Event('storage')); // Trigger BGM component update
            toast.success(`Music ${v ? 'Enabled' : 'Disabled'}`);
          }
        },
        { icon: Vibrate, label: 'Haptics', desc: 'Vibrate on tap', value: haptics, onChange: (v: boolean) => handleSettingChange('haptics', v, setHaptics) }
      ]
    }
  ];

  const currentLang = LANGUAGES.find(l => l.code === selectedLanguage);
  const actionItems = [
    { icon: Globe, label: 'Language', desc: `${currentLang?.flag} ${currentLang?.name}`, action: () => setShowLanguageDialog(true) },
    { icon: Shield, label: 'Privacy Policy', desc: 'Rules & safety', action: () => setShowPrivacyDialog(true) },
    { icon: FileText, label: 'Terms', desc: 'Legal stuff', action: () => setShowPrivacyDialog(true) },
    { icon: Trash2, label: 'Clear Cache', desc: 'Reset app data', action: handleClearCache, danger: true }
  ];

  return (
    <div className="min-h-[100dvh] bg-pastel-yellow/30 font-draw pb-32 relative">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #000 1.2px, transparent 1.2px)', backgroundSize: '25px 25px' }} />

      <div className="px-5 pb-10 space-y-10 max-w-md mx-auto relative z-10" style={{ paddingTop: 'calc(var(--safe-area-top) + 4rem)' }}>
        {/* Unified Mobile Header */}
        <MobileHeader
          title="SETTINGS"
          subtitle="Customize your app"
          showBack
        />

        {/* Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: groupIndex * 0.1 }}>
            <h2 className="text-xs font-black text-black/40 mb-3 px-1 uppercase tracking-[0.3em] flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full" /> {group.title}
            </h2>
            <DrawnCard className="bg-white p-0 overflow-hidden divide-y-4 divide-black border-4 border-black shadow-comic-lg">
              {group.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-5 bg-white/50">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-pastel-blue/20 rounded-2xl flex items-center justify-center border-3 border-black shadow-comic-sm">
                      <item.icon className="w-6 h-6 text-black" strokeWidth={3} />
                    </div>
                    <div>
                      <p className="font-black text-black leading-tight text-lg uppercase tracking-tight">{item.label}</p>
                      <p className="text-[10px] font-black opacity-40 uppercase italic">{item.desc}</p>
                    </div>
                  </div>
                  <Switch checked={item.value} onCheckedChange={item.onChange} className="data-[state=checked]:bg-cc-green" />
                </div>
              ))}
            </DrawnCard>
          </motion.div>
        ))}

        {/* Dev Tools */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h2 className="text-xs font-black text-black/40 mb-3 px-1 uppercase tracking-[0.3em] flex items-center gap-2">
            <div className="w-2 h-2 bg-cc-pink rounded-full" /> DEV ZONE
          </h2>
          <DrawnCard className="bg-cc-pink/5 p-5 border-4 border-black border-dashed shadow-comic">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-cc-pink/20 rounded-2xl flex items-center justify-center border-3 border-black shadow-comic-sm">
                  <Send className="w-6 h-6 text-black" strokeWidth={3} />
                </div>
                <div>
                  <p className="font-black text-black leading-tight text-lg uppercase tracking-tight">TEST PUSH</p>
                  <p className="text-[10px] font-black opacity-40 uppercase italic">Send test ping</p>
                </div>
              </div>
              <DrawnButton
                onClick={handleTestNotification}
                disabled={isSendingTest}
                className="h-12 px-6 py-0 text-md bg-cc-green border-3 border-black shadow-comic active:translate-y-1 active:shadow-none transition-all font-black"
              >
                {isSendingTest ? <Loader2 className="w-5 h-5 animate-spin" /> : 'GO!'}
              </DrawnButton>
            </div>
          </DrawnCard>
        </motion.div>

        {/* More */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-xs font-black text-black/40 mb-3 px-1 uppercase tracking-[0.3em] flex items-center gap-2">
            <div className="w-2 h-2 bg-cc-blue rounded-full" /> MORE STUFF
          </h2>
          <DrawnCard className="bg-white p-0 overflow-hidden divide-y-4 divide-black border-4 border-black shadow-comic-lg">
            {actionItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between p-5 cursor-pointer active:bg-black/5 hover:bg-black/5 transition-colors" onClick={item.action}>
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 ${item.danger ? 'bg-pastel-pink/20' : 'bg-pastel-lavender/20'} rounded-2xl flex items-center justify-center border-3 border-black shadow-comic-sm`}>
                    <item.icon className={`w-6 h-6 ${item.danger ? 'text-pastel-pink' : 'text-black'}`} strokeWidth={3} />
                  </div>
                  <div>
                    <p className={`font-black text-lg leading-tight uppercase tracking-tight ${item.danger ? 'text-pastel-pink' : 'text-black'}`}>{item.label}</p>
                    <p className="text-[10px] font-black opacity-40 uppercase italic">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-black/30" strokeWidth={3} />
              </div>
            ))}
          </DrawnCard>
        </motion.div>

        {/* Footer */}
        <div className="text-center pt-16 opacity-30 pb-12 relative flex flex-col items-center">
          <div className="w-24 h-24 mb-4 bg-black/10 rounded-full flex items-center justify-center grayscale opacity-50">
            <Logo size="sm" showText={false} />
          </div>
          <p className="font-black text-xl tracking-tighter italic">CODIO v1.2.0</p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mt-1">MADE WITH ✨ FOR LEARNERS</p>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent className="max-w-sm rounded-[2rem] border-3 border-black p-6 font-draw">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-center">SELECT LANGUAGE</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 max-h-[60vh] overflow-y-auto pt-4">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${selectedLanguage === lang.code ? 'bg-pastel-yellow border-black shadow-comic-sm' : 'bg-white border-black/10'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-black text-black">{lang.name}</span>
                </div>
                {selectedLanguage === lang.code && <Check className="w-6 h-6 text-black" strokeWidth={4} />}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPage;