import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { sendSupportRequest, fetchUserTickets, SupportTicket } from '@/services/supportService';
import { format } from 'date-fns';
import {
  ArrowLeft,
  MessageCircle,
  Mail,
  HelpCircle,
  Book,
  ChevronRight,
  ChevronDown,
  Send,
  Loader2,
  History,
  Sparkles
} from 'lucide-react';
import { DrawnButton, DrawnCard, DrawnInput } from '@/components/ui/HandDrawnComponents';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/ui/logo';
import MobileHeader from '@/components/MobileHeader';
import { cn } from '@/lib/utils';

const HelpPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(false);

  React.useEffect(() => {
    if (user && activeTab === 'contact') {
      loadTickets();
    }
  }, [user, activeTab]);

  const loadTickets = async () => {
    if (!user) return;
    setLoadingTickets(true);
    const data = await fetchUserTickets(user.id);
    setTickets(data);
    setLoadingTickets(false);
  };

  const faqs = [
    {
      question: 'How do I earn hints?',
      answer: 'You can earn hints through daily rewards, completing levels, maintaining streaks, or purchasing them from the Hint Store!'
    },
    {
      question: 'What is the Subscription plan?',
      answer: 'Our subscription gives you unlimited hints, ad-free experience, and access to all 200+ premium levels!'
    },
    {
      question: 'How do I reset my progress?',
      answer: 'Go to Settings > Clear Cache to reset your local progress. Your cloud achievements are safe!'
    },
    {
      question: 'How do hints work?',
      answer: 'Stuck? Tap the hint icon for a gentle nudge. We show you the logic without giving away the answer!'
    },
    {
      question: 'Is my progress saved?',
      answer: 'Yes! Your journey is automatically synced. Pick up where you left off on any device.'
    }
  ];

  const handleSubmitContact = async () => {
    if (!user) {
      toast.error('Please sign in to send a message');
      return;
    }
    if (!contactForm.subject.trim() || !contactForm.message.trim()) {
      toast.error('Fill in all fields, adventurer!');
      return;
    }
    setSending(true);
    try {
      const success = await sendSupportRequest(user.id, contactForm.subject, contactForm.message, { platform: 'web' });
      if (success) {
        toast.success('Message sent! Our wizards will reply soon.');
        setContactForm({ subject: '', message: '' });
        loadTickets();
      }
    } catch (error) {
      toast.error('Failed to send message. Try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-pastel-yellow/30 pb-32 font-draw relative">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #000 1.2px, transparent 1.2px)', backgroundSize: '25px 25px' }} />

      <div className="px-5 pb-10 space-y-10 max-w-md mx-auto relative z-10" style={{ paddingTop: 'calc(var(--safe-area-top) + 3rem)' }}>
        {/* Unified Mobile Header */}
        <MobileHeader
          title="Support"
          subtitle="We're here to help!"
          showBack
          rightElement={
            <div className="rotate-3 shadow-comic-sm bg-white p-2 rounded-2xl border-2 border-black">
              <Logo size="sm" showText={false} />
            </div>
          }
        />

        {/* Tabs */}
        <div className="flex bg-black p-1.5 rounded-[2rem] shadow-comic border-4 border-black">
          <button
            onClick={() => setActiveTab('faq')}
            className={cn(
              "flex-1 py-4 px-4 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] transition-all",
              activeTab === 'faq' ? "bg-cc-yellow text-black shadow-comic-sm" : "text-white/40"
            )}
          >
            FAQs
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={cn(
              "flex-1 py-4 px-4 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] transition-all",
              activeTab === 'contact' ? "bg-cc-pink text-black shadow-comic-sm" : "text-white/40"
            )}
          >
            Contact
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'faq' ? (
            <motion.div
              key="faq"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {faqs.map((faq, index) => (
                <DrawnCard
                  key={index}
                  className="bg-white p-6 overflow-hidden cursor-pointer border-4 border-black shadow-comic-lg active:translate-y-1 active:shadow-none transition-all"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-black text-black pr-4 uppercase tracking-tight leading-tight text-lg">{faq.question}</p>
                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center border-2 border-black/10">
                      {expandedFaq === index ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </div>
                  </div>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-sm font-black text-black/60 mt-4 pt-4 border-t-4 border-black border-dashed leading-tight italic bg-black/5 p-4 rounded-xl"
                    >
                      "{faq.answer}"
                    </motion.div>
                  )}
                </DrawnCard>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <DrawnCard className="bg-cc-yellow/20 border-4 border-black border-dashed shadow-comic p-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-cc-yellow border-4 border-black rounded-2xl flex items-center justify-center shadow-comic-sm rotate-[-5deg]">
                    <Mail className="w-8 h-8 text-black" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-black text-black leading-none uppercase tracking-tighter text-lg">Email Support</p>
                    <p className="text-xs font-black text-black/40 uppercase tracking-widest mt-1">support@codio.app</p>
                  </div>
                </div>
              </DrawnCard>

              <DrawnCard className="bg-white space-y-6 p-6 border-4 border-black shadow-comic-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-black uppercase tracking-tighter italic text-2xl flex items-center gap-3 relative">
                    <Sparkles className="w-6 h-6 text-cc-pink fill-cc-pink" />
                    <span>Drop a message</span>
                  </h3>
                </div>

                <div className="space-y-4">
                  <DrawnInput
                    placeholder="Subject (e.g. Payment Issue)"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="bg-white border-3 border-black rounded-xl h-14 font-black uppercase tracking-tight p-4 shadow-comic-sm"
                  />

                  <textarea
                    placeholder="Describe your issue in detail..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-white border-3 border-black rounded-2xl p-5 font-black focus:outline-none min-h-[150px] resize-none shadow-comic-sm italic text-black/70"
                  />

                  <DrawnButton
                    onClick={handleSubmitContact}
                    disabled={sending}
                    variant="accent"
                    className="w-full h-16 bg-cc-green text-black border-4 border-black shadow-comic active:translate-y-1 active:shadow-none transition-all text-xl font-black uppercase tracking-widest"
                  >
                    {sending ? <Loader2 className="w-8 h-8 animate-spin" /> : <span className="flex items-center gap-3">SEND MESSAGE <Send className="w-6 h-6" /></span>}
                  </DrawnButton>
                </div>
              </DrawnCard>

              {/* Tickets History */}
              <div className="space-y-6 pt-6">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center border-2 border-dashed border-black/20">
                    <History className="w-6 h-6 text-black" strokeWidth={3} />
                  </div>
                  <h3 className="font-black text-black uppercase tracking-[0.2em] text-xs">My Ticket History</h3>
                </div>

                {tickets.length === 0 ? (
                  <DrawnCard className="bg-black/5 border-4 border-black border-dashed text-center p-12 shadow-inner">
                    <p className="text-sm font-black text-black/30 uppercase tracking-[0.3em] italic">No messages yet!</p>
                  </DrawnCard>
                ) : (
                  <div className="space-y-5">
                    {tickets.map((t) => (
                      <DrawnCard key={t.id} className="bg-white border-4 border-black shadow-comic p-6 rotate-[1deg]">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-black text-black uppercase tracking-tighter text-lg leading-tight flex-1 pr-4">{t.title}</h4>
                          <Badge className={cn("text-[10px] font-black uppercase border-2 border-black h-6 px-3 shadow-comic-sm",
                            t.status === 'resolved' ? "bg-cc-green text-black" : "bg-cc-yellow text-black"
                          )}>
                            {t.status}
                          </Badge>
                        </div>
                        <p className="text-[10px] font-black text-black/30 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-black/20 rounded-full" />
                          {format(new Date(t.created_at), 'MMMM dd, yyyy')}
                        </p>
                        <p className="text-sm font-black text-black/60 italic bg-black/5 p-4 rounded-xl border-2 border-black/5">"{t.content}"</p>
                      </DrawnCard>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HelpPage;
