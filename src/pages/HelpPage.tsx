import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
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
  Info,
  ExternalLink
} from 'lucide-react';

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
      answer: 'You can earn hints through daily rewards, completing levels, maintaining streaks, or purchasing them from the Hint Store. Claim your daily reward every day for free hints!'
    },
    {
      question: 'What is the Subscription plan?',
      answer: 'Our subscription gives you unlimited hints, ad-free experience, access to all premium levels, and priority support. Choose between monthly or yearly plans.'
    },
    {
      question: 'How do I reset my progress?',
      answer: 'Go to Settings > Clear Cache to reset your local progress. Note that your account data and achievements are stored securely and won\'t be affected.'
    },
    {
      question: 'Can I use the app offline?',
      answer: 'Currently, Codio requires an internet connection to sync your progress and validate solutions. Offline mode is coming soon!'
    },
    {
      question: 'How do hints work?',
      answer: 'Hints help you when you\'re stuck. Each puzzle has multiple hint levels - first gives a gentle nudge, and further hints provide more specific guidance.'
    },
    {
      question: 'Is my progress saved?',
      answer: 'Yes! Your progress is automatically synced to your account. You can continue learning on any device by signing in with the same account.'
    }
  ];

  const handleSubmitContact = async () => {
    if (!user) {
      toast.error('Please sign in to send a message');
      return;
    }

    if (!contactForm.subject.trim() || !contactForm.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (contactForm.message.length < 10) {
      toast.error('Message is too short. Please provide more detail.');
      return;
    }

    setSending(true);
    try {
      const success = await sendSupportRequest(
        user.id,
        contactForm.subject,
        contactForm.message,
        {
          environment: window.location.hostname,
          userAgent: navigator.userAgent,
          platform: (navigator as any).platform
        }
      );

      if (success) {
        toast.success('Message sent! We\'ll get back to you soon.');
        setContactForm({ subject: '', message: '' });
        loadTickets(); // Refresh history
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved': return <Badge className="bg-puzzle-green/20 text-puzzle-green border-puzzle-green/20">Resolved</Badge>;
      case 'pending': return <Badge className="bg-pastel-yellow text-foreground border-border">Pending</Badge>;
      default: return <Badge className="bg-secondary text-muted-foreground">Received</Badge>;
    }
  };

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
            <h1 className="text-2xl font-bold text-foreground font-display">Help & Support</h1>
            <p className="text-sm text-muted-foreground">We're here to help</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-secondary/50 p-1 rounded-2xl">
          <Button
            onClick={() => setActiveTab('faq')}
            variant={activeTab === 'faq' ? 'default' : 'ghost'}
            className={`flex-1 rounded-xl ${activeTab === 'faq' ? '' : 'text-muted-foreground'}`}
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQs
          </Button>
          <Button
            onClick={() => setActiveTab('contact')}
            variant={activeTab === 'contact' ? 'default' : 'ghost'}
            className={`flex-1 rounded-xl ${activeTab === 'contact' ? '' : 'text-muted-foreground'}`}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact
          </Button>
        </div>

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="overflow-hidden cursor-pointer"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground pr-4">{faq.question}</p>
                    {expandedFaq === index ? (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>

                  {expandedFaq === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Quick Links */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <a
                  href="mailto:support@codio.app"
                  className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email Support</p>
                    <p className="text-xs text-muted-foreground">support@codio.app</p>
                  </div>
                </a>

                <a
                  href="https://docs.codio.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="w-10 h-10 bg-puzzle-green/10 rounded-xl flex items-center justify-center">
                    <Book className="w-5 h-5 text-puzzle-green" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Documentation</p>
                    <p className="text-xs text-muted-foreground">Browse our guides</p>
                  </div>
                </a>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Send us a message</h3>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Direct Support</Badge>
                </div>

                <Input
                  placeholder="Subject (e.g. Payment Issue, App Bug)"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="rounded-xl bg-card border-border"
                />

                <Textarea
                  placeholder="Describe your issue or feedback in detail..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="rounded-xl min-h-[120px] resize-none bg-card border-border"
                />

                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmitContact}
                    disabled={sending}
                    variant="gradient"
                    className="flex-1 rounded-xl shadow-lg"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Ticket
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    className="h-12 w-12 rounded-xl border-border bg-card p-0"
                    title="Send via Email instead"
                    onClick={() => {
                      const subject = encodeURIComponent(contactForm.subject || 'Support Request');
                      const body = encodeURIComponent(contactForm.message || '');
                      window.location.href = `mailto:support@codio.local?subject=${subject}&body=${body}`;
                    }}
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>

                <p className="text-[10px] text-muted-foreground text-center">
                  Replies are usually sent within 24 hours to your registered email.
                </p>
              </CardContent>
            </Card>

            {/* Ticket History */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center gap-2 px-1">
                <History className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-foreground">My Tickets</h3>
              </div>

              {loadingTickets ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : tickets.length === 0 ? (
                <Card className="bg-secondary/20 border-dashed">
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageCircle className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">No support messages yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {tickets.map((ticket) => (
                    <Card key={ticket.id} className="group hover:border-primary/30 transition-colors">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                              {ticket.title}
                            </h4>
                            <p className="text-[10px] text-muted-foreground">
                              {format(new Date(ticket.created_at), 'MMM dd, yyyy • hh:mm a')}
                            </p>
                          </div>
                          {getStatusBadge(ticket.status)}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 bg-secondary/30 p-2 rounded-lg italic">
                          "{ticket.content}"
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HelpPage;
