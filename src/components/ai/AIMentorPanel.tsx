import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Lock, MessageCircle, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePremiumGate } from '@/hooks/usePremiumGate';
import PremiumGateModal from '@/components/premium/PremiumGateModal';

interface Message {
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
}

import { supabase } from '@/integrations/supabase/client';

const FREE_MESSAGE_LIMIT = 5;
const DAILY_KEY = `codio_ai_mentor_msgs_${new Date().toISOString().split('T')[0]}`;

const AIMentorPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { isSubscribed } = usePremiumGate();
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: "Hey! 👋 I'm your AI Code Mentor. Ask me anything about coding — errors, concepts, tips, or hints!", timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showGate, setShowGate] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    const getMsgCount = () => parseInt(localStorage.getItem(DAILY_KEY) || '0');
    const [msgCount, setMsgCount] = useState(getMsgCount);
    const isAtLimit = !isSubscribed && msgCount >= FREE_MESSAGE_LIMIT;

    const handleSend = async () => {
        if (!input.trim()) return;
        if (isAtLimit) { setShowGate(true); return; }

        const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Increment daily count for free users
        if (!isSubscribed) {
            const newCount = getMsgCount() + 1;
            localStorage.setItem(DAILY_KEY, String(newCount));
            setMsgCount(newCount);
        }

        // Call Supabase Edge Function for real AI response
        try {
            const { data, error } = await supabase.functions.invoke('codio-chat', {
                body: {
                    message: input,
                    conversationHistory: messages.map(m => ({ role: m.role, content: m.content }))
                }
            });

            if (error) throw error;

            const aiResponse: Message = {
                role: 'ai',
                content: data.response || "I'm having trouble connecting right now. Try again soon!",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('AI Error:', error);
            setMessages(prev => [...prev, {
                role: 'ai',
                content: "Oops! 🔧 I'm having a small glitch. Try asking me again!",
                timestamp: new Date()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const quickPrompts = ['Explain loops', 'Help with functions', 'I have a bug', 'Recursion tips'];

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm"
                            onClick={onClose}
                        />
                        {/* Panel */}
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 z-[120] max-w-lg mx-auto bg-white border-t-4 border-x-4 border-black rounded-t-[2rem] shadow-[0_-8px_40px_rgba(0,0,0,0.3)] font-draw"
                            style={{ height: '80dvh', display: 'flex', flexDirection: 'column' }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b-3 border-black bg-black rounded-t-[1.8rem]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-pastel-yellow rounded-2xl flex items-center justify-center border-2 border-white/20">
                                        <Bot className="h-6 w-6 text-black" strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-white uppercase">AI Code Mentor</p>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-pastel-mint animate-pulse" />
                                            <p className="text-[9px] font-black text-white/40 uppercase">Online</p>
                                            {!isSubscribed && (
                                                <span className="text-[9px] font-black text-white/30 uppercase">• {FREE_MESSAGE_LIMIT - msgCount} msgs left today</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={onClose} className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
                                    <X className="h-5 w-5 text-white" strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.role === 'ai' && (
                                            <div className="w-7 h-7 bg-pastel-yellow border-2 border-black rounded-xl flex items-center justify-center mr-2 mt-1 shrink-0">
                                                <Bot className="h-4 w-4 text-black" strokeWidth={2} />
                                            </div>
                                        )}
                                        <div className={`max-w-[82%] rounded-2xl px-4 py-3 border-2 border-black ${msg.role === 'user'
                                            ? 'bg-black text-white rounded-tr-sm shadow-[2px_2px_0_#444]'
                                            : 'bg-white text-black rounded-tl-sm shadow-[2px_2px_0_#000]'
                                            }`}>
                                            <pre className="text-xs font-bold whitespace-pre-wrap font-draw leading-relaxed">{msg.content}</pre>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 bg-pastel-yellow border-2 border-black rounded-xl flex items-center justify-center shrink-0">
                                            <Bot className="h-4 w-4 text-black" />
                                        </div>
                                        <div className="bg-white border-2 border-black rounded-2xl rounded-tl-sm px-4 py-3 shadow-[2px_2px_0_#000]">
                                            <div className="flex items-center gap-1">
                                                {[0, 1, 2].map(i => (
                                                    <motion.div key={i} className="w-2 h-2 bg-black rounded-full"
                                                        animate={{ y: [0, -6, 0] }}
                                                        transition={{ delay: i * 0.15, repeat: Infinity, duration: 0.7 }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Limit warning */}
                                {isAtLimit && (
                                    <div className="bg-pastel-pink border-2 border-black rounded-2xl p-4 text-center">
                                        <p className="text-sm font-black text-black uppercase">🔒 Daily limit reached!</p>
                                        <p className="text-xs font-bold text-black/60 mt-1 mb-3">Upgrade to Pro for unlimited AI Mentor access.</p>
                                        <button
                                            onClick={() => { navigate('/subscription'); onClose(); }}
                                            className="bg-black text-white text-xs font-black uppercase px-4 py-2 rounded-xl"
                                        >
                                            Upgrade Now →
                                        </button>
                                    </div>
                                )}
                                <div ref={bottomRef} />
                            </div>

                            {/* Quick prompts */}
                            {messages.length <= 1 && (
                                <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
                                    {quickPrompts.map(p => (
                                        <button key={p} onClick={() => { setInput(p); }}
                                            className="shrink-0 bg-black/5 border-2 border-black rounded-xl px-3 py-1.5 text-[10px] font-black uppercase whitespace-nowrap">
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Input */}
                            <div className="px-4 pt-3 border-t-3 border-black bg-white"
                                style={{ paddingBottom: 'calc(85px + env(safe-area-inset-bottom))' }}>
                                <div className="flex gap-2 items-end">
                                    <textarea
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                                        placeholder={isAtLimit ? "Upgrade for unlimited messages..." : "Ask me anything about code..."}
                                        disabled={isAtLimit}
                                        rows={1}
                                        className="flex-1 bg-black/5 border-2 border-black rounded-2xl px-4 py-3 text-sm font-bold text-black placeholder-black/30 resize-none focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-50"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isAtLimit}
                                        className="w-11 h-11 bg-black text-white rounded-2xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0_#444] active:shadow-none disabled:opacity-30 transition-all"
                                    >
                                        <Send className="h-4 w-4" strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <PremiumGateModal isOpen={showGate} onClose={() => setShowGate(false)} trigger="hints" />
        </>
    );
};

// Floating button to open/close the mentor panel — used in App.tsx
export const AIMentorButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="fixed right-4 z-[110] w-14 h-14 bg-black text-white rounded-2xl border-3 border-black shadow-[4px_4px_0_#222] flex items-center justify-center font-draw"
                style={{
                    bottom: 'calc(100px + env(safe-area-inset-bottom))'
                }}
                aria-label="Open AI Code Mentor"
            >
                <Bot className="h-7 w-7 text-pastel-yellow" strokeWidth={2} />
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-pastel-mint border-2 border-black rounded-full flex items-center justify-center">
                    <Sparkles className="h-2.5 w-2.5 text-black" />
                </div>
            </motion.button>
            <AIMentorPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export default AIMentorPanel;
