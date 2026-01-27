
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CodioAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: "Hi! I'm Codio, your coding buddy! 🤖 Ask me anything about programming!"
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Refinement: Aggressively Hide Spline Watermark
  useEffect(() => {
    const hideWatermark = () => {
      const spline = splineRef.current;
      if (!spline) return;

      // 1. Hide in shadow root
      if (spline.shadowRoot) {
        const styleId = 'spline-hide-watermark-aggressive';
        if (!spline.shadowRoot.getElementById(styleId)) {
          const style = document.createElement('style');
          style.id = styleId;
          style.innerHTML = `
            #logo, a[href*="spline.design"], .spline-watermark, #watermark,
            [class*="watermark"], [id*="watermark"], 
            #container > a, div[style*="z-index: 10000"] { 
              display: none !important; 
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
              width: 0 !important;
              height: 0 !important;
            }
          `;
          spline.shadowRoot.appendChild(style);
        }
      }

      // 2. Hide in light DOM (sometimes Spline injects there)
      const watermarks = document.querySelectorAll('a[href*="spline"], .spline-watermark');
      watermarks.forEach(el => (el as HTMLElement).style.display = 'none');
    };

    const spline = splineRef.current;
    let observer: MutationObserver | null = null;

    if (spline) {
      observer = new MutationObserver(() => hideWatermark());
      observer.observe(spline, { attributes: true, childList: true, subtree: true });
    }

    // Run extremely frequently for the first few seconds to catch async loads
    const fastInterval = setInterval(hideWatermark, 100);
    const slowInterval = setInterval(hideWatermark, 1000);

    const timeout1 = setTimeout(() => clearInterval(fastInterval), 5000);
    const timeout2 = setTimeout(() => clearInterval(slowInterval), 30000);

    return () => {
      if (observer) observer.disconnect();
      clearInterval(fastInterval);
      clearInterval(slowInterval);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('codio-chat', {
        body: { message: userMessage, conversationHistory: messages }
      });
      if (error) throw error;
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error calling Codio:', error);
      toast.error("Codio is taking a short break. Try again!");
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having a tiny glitch! Try again in a moment!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* 3D Floating Button / Spline Model */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -8, 0]
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-20 right-0 z-50 w-32 h-32 cursor-pointer pointer-events-auto overflow-hidden"
            onClick={() => setIsOpen(true)}
          >
            {/* @ts-ignore */}
            <spline-viewer
              ref={splineRef}
              url="https://prod.spline.design/K9p0zjAnNcVDhX8Z/scene.splinecode"
              class="w-full h-full"
              style={{
                // Color match to app theme (Cyan/Teal tint)
                filter: 'hue-rotate(140deg) saturate(1.2) brightness(1.1)',
                // Clip the bottom slightly just in case logo isn't hidden by shadow inject
                clipPath: 'inset(0 0 10% 0)'
              }}
            ></spline-viewer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-4 w-[90vw] max-w-sm h-[450px] z-50 bg-background rounded-3xl shadow-soft-xl flex flex-col overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-hover p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base flex items-center gap-1.5">
                    Codio
                    <Sparkles className="w-3.5 h-3.5" />
                  </h3>
                  <p className="text-white/70 text-xs">AI Coding Buddy</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-xl w-8 h-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-lavender-50/50">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${msg.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white text-foreground shadow-soft-sm border border-border'
                      }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <Bot className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-primary">Codio</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white rounded-2xl px-4 py-2.5 shadow-soft-sm border border-border">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-primary animate-pulse" />
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 150}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-background border-t border-border">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything..."
                  className="resize-none rounded-xl border-border bg-muted/50 focus:border-primary text-sm"
                  rows={1}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-primary hover:bg-primary-hover rounded-xl px-4"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CodioAssistant;
