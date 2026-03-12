import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Flame, Calendar, Share2, ChevronRight, Trophy, Play,
    RotateCcw, ArrowLeft, CheckCircle2, Sparkles, Zap, Clock,
    Code2, XCircle, Terminal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getTodaysDailyChallenge, getPastChallenges, DailyPuzzle } from '@/data/dailyChallenges';
import { DrawnCard, DrawnButton } from '@/components/ui/HandDrawnComponents';
import { useRewards } from '@/context/RewardsContext';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import MobileHeader from '@/components/MobileHeader';

// ─── Sandbox Executor ────────────────────────────────────────────────────────
// Runs user's JS code safely and captures console.log output.
function runJSSandbox(code: string): { output: string; error: string | null } {
    const logs: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;

    try {
        // Intercept console.log
        console.log = (...args: any[]) => {
            logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        };
        console.error = (...args: any[]) => {
            logs.push('ERROR: ' + args.join(' '));
        };

        // eslint-disable-next-line no-new-func
        const fn = new Function(code);
        fn();

        return { output: logs.join('\n') || '(no output)', error: null };
    } catch (e: any) {
        return { output: logs.join('\n'), error: e.message || 'Runtime error' };
    } finally {
        console.log = originalLog;
        console.error = originalError;
    }
}

// ─── Validation: check if output matches expected ────────────────────────────
function normalizeOutput(s: string) {
    return s.trim().replace(/\s+/g, ' ').toLowerCase();
}

const Daily = () => {
    const navigate = useNavigate();
    const { rewards, addXP } = useRewards();
    const [challenge, setChallenge] = useState<DailyPuzzle>(getTodaysDailyChallenge);
    const [pastChallenges] = useState<DailyPuzzle[]>(getPastChallenges(7));
    const [code, setCode] = useState(challenge.starterCode);
    const [isSolved, setIsSolved] = useState(false);
    const [output, setOutput] = useState<string | null>(null);
    const [outputType, setOutputType] = useState<'success' | 'error' | 'info'>('info');
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState<'today' | 'past'>('today');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const solved = localStorage.getItem(`codio_daily_solved_${challenge.id}`);
        setIsSolved(!!solved);
        setCode(challenge.starterCode);
        setOutput(null);
    }, [challenge.id]);

    // Auto-grow textarea
    useEffect(() => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = Math.max(200, el.scrollHeight) + 'px';
        }
    }, [code]);

    const handleRunCode = () => {
        setIsRunning(true);
        setOutput(null);

        // Small delay for UX feedback
        setTimeout(() => {
            const { output: result, error } = runJSSandbox(code);

            if (error) {
                setOutput(`❌ Error: ${error}\n\n${result ? 'Partial output:\n' + result : ''}`);
                setOutputType('error');
                toast.error('Fix the error and try again!');
            } else {
                const normalResult = normalizeOutput(result);
                const normalExpected = normalizeOutput(challenge.expectedOutput);
                const isCorrect = normalResult === normalExpected ||
                    result.trim().includes(challenge.expectedOutput.trim());

                if (isCorrect) {
                    setOutput(`✅ Correct!\n\nOutput: ${result}`);
                    setOutputType('success');
                    if (!isSolved) {
                        setIsSolved(true);
                        localStorage.setItem(`codio_daily_solved_${challenge.id}`, 'true');
                        addXP(100);
                        toast.success("🎉 You earned 100 XP!");
                    }
                } else {
                    setOutput(`Output:\n${result}\n\nExpected:\n${challenge.expectedOutput}`);
                    setOutputType('error');
                    toast.error('Not quite! Check your output vs expected.');
                }
            }
            setIsRunning(false);
        }, 300);
    };

    const handleShare = () => {
        const text = `🔥 I solved today's @CodioApp Daily Challenge: "${challenge.title}"! 💻 #Codio #LearnToCode`;
        if (navigator.share) {
            navigator.share({ title: 'Codio Daily', text, url: 'https://codio.app/daily' }).catch(() => { });
        } else {
            navigator.clipboard?.writeText(text).then(() => toast.success('Share text copied!'));
        }
    };

    const selectPastChallenge = (pc: DailyPuzzle) => {
        setChallenge(pc);
        setActiveTab('today');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-pastel-yellow/10 font-draw">
            {/* Unified Mobile Header */}
            <MobileHeader
                title="Codio Daily"
                subtitle={new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short' })}
                showBack
                showStats
            />

            <div className="max-w-2xl mx-auto px-4 pb-32" style={{ paddingTop: 'calc(var(--safe-area-top) + 4.5rem)' }}>
                {/* Tab Pills */}
                <div className="flex gap-3 mb-6 sticky top-[72px] z-40 pt-2">
                    {(['today', 'past'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 rounded-2xl font-black uppercase text-sm tracking-widest border-3 border-black transition-all active:scale-95 ${activeTab === tab
                                ? tab === 'today' ? 'bg-cc-yellow shadow-comic-sm' : 'bg-cc-blue text-white shadow-comic-sm'
                                : 'bg-white/60 opacity-50'
                                }`}
                        >
                            {tab === 'today' ? '⚡ Today' : '📋 Past Logs'}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'today' ? (
                        <motion.div
                            key="today"
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 16 }}
                            className="space-y-5"
                        >
                            {/* Challenge Card */}
                            <DrawnCard className="bg-black text-white p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-10">
                                    <Zap className="w-28 h-28 text-cc-yellow -rotate-12" />
                                </div>
                                <div className="flex gap-2 mb-3 flex-wrap">
                                    <Badge className="bg-cc-yellow border-2 border-white/20 text-black uppercase font-black text-[10px]">
                                        {challenge.difficulty}
                                    </Badge>
                                    <Badge className="bg-white/10 border-2 border-white/20 text-white uppercase font-black text-[10px] italic">
                                        {challenge.concept}
                                    </Badge>
                                    <Badge className="bg-white/10 border-2 border-white/20 text-white uppercase font-black text-[10px]">
                                        {challenge.language}
                                    </Badge>
                                </div>
                                <h2 className="text-3xl font-black uppercase mb-2 italic tracking-tighter">{challenge.title}</h2>
                                <p className="text-base font-bold text-white/70 leading-snug mb-4">{challenge.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-xs font-black text-white/40 uppercase">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {challenge.date}</span>
                                        <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> 100 XP</span>
                                    </div>
                                    {isSolved && (
                                        <div className="bg-cc-green text-black px-3 py-1 rounded-xl flex items-center gap-1.5 font-black text-sm rotate-2">
                                            <CheckCircle2 className="w-4 h-4" /> SOLVED!
                                        </div>
                                    )}
                                </div>
                            </DrawnCard>

                            {/* Expected Output hint */}
                            <DrawnCard className="bg-pastel-blue/20 border-2 border-black p-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">🎯 Expected Output</p>
                                <pre className="font-mono text-sm font-bold text-black">{challenge.expectedOutput}</pre>
                            </DrawnCard>

                            {/* Code Editor */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-black flex items-center gap-2 uppercase">
                                        <Code2 className="w-5 h-5" /> Code Editor
                                    </h3>
                                    <button
                                        onClick={() => { setCode(challenge.starterCode); setOutput(null); }}
                                        className="flex items-center gap-1.5 text-xs font-black px-3 py-1.5 bg-white border-2 border-black rounded-xl active:scale-95 uppercase"
                                    >
                                        <RotateCcw className="w-3 h-3" /> Reset
                                    </button>
                                </div>

                                <div className="rounded-[1.5rem] border-4 border-black overflow-hidden shadow-comic">
                                    {/* Editor Chrome */}
                                    <div className="bg-slate-900 px-4 py-2.5 border-b-2 border-black flex items-center justify-between">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-400 border border-black/40" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black/40" />
                                            <div className="w-3 h-3 rounded-full bg-green-400 border border-black/40" />
                                        </div>
                                        <span className="text-[10px] text-white/30 font-black tracking-widest uppercase">
                                            <Terminal className="w-3 h-3 inline mr-1" />
                                            {challenge.language} · daily_{challenge.date}.js
                                        </span>
                                    </div>
                                    <textarea
                                        ref={textareaRef}
                                        value={code}
                                        onChange={e => setCode(e.target.value)}
                                        spellCheck={false}
                                        autoComplete="off"
                                        autoCorrect="off"
                                        autoCapitalize="off"
                                        className="w-full p-5 bg-slate-950 text-green-300 focus:outline-none font-mono text-[15px] leading-relaxed resize-none min-h-[200px]"
                                        placeholder="// Write your solution here..."
                                        style={{ caretColor: '#4ade80' }}
                                    />
                                </div>
                            </div>

                            {/* Run & Share */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleRunCode}
                                    disabled={isRunning}
                                    className="flex-1 h-16 bg-cc-green border-4 border-black rounded-2xl font-black text-xl uppercase tracking-wide shadow-comic active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                                >
                                    {isRunning ? (
                                        <><span className="animate-spin">⚙️</span> Running...</>
                                    ) : (
                                        <><Play className="w-6 h-6 fill-black" /> Run Code</>
                                    )}
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="w-16 h-16 bg-white border-4 border-black rounded-2xl flex items-center justify-center shadow-comic active:translate-y-1 active:shadow-none transition-all"
                                >
                                    <Share2 className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Output */}
                            <AnimatePresence>
                                {output && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <DrawnCard
                                            className={`border-4 border-black p-5 font-mono ${outputType === 'success' ? 'bg-cc-green/10' :
                                                outputType === 'error' ? 'bg-red-50' : 'bg-slate-900'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                {outputType === 'success'
                                                    ? <CheckCircle2 className="w-5 h-5 text-cc-green" />
                                                    : <XCircle className="w-5 h-5 text-red-500" />
                                                }
                                                <span className="text-xs font-black uppercase tracking-widest text-black/50">Output</span>
                                            </div>
                                            <pre className={`text-sm leading-relaxed whitespace-pre-wrap ${outputType === 'success' ? 'text-green-800' :
                                                outputType === 'error' ? 'text-red-700' : 'text-green-300'
                                                }`}>{output}</pre>
                                        </DrawnCard>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="past"
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            className="space-y-3"
                        >
                            <p className="text-[10px] font-black uppercase tracking-widest text-black/40 px-1 mb-4">Past 7 Days</p>
                            {pastChallenges.map((pc) => {
                                const solved = !!localStorage.getItem(`codio_daily_solved_${pc.id}`);
                                return (
                                    <DrawnCard
                                        key={pc.id}
                                        className="bg-white hover:bg-pastel-blue/10 cursor-pointer border-4 border-black p-4 group transition-all active:scale-[0.99]"
                                        onClick={() => selectPastChallenge(pc)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl border-2 border-black flex items-center justify-center shrink-0 group-hover:rotate-6 transition-all ${solved ? 'bg-cc-green' : 'bg-black/5'}`}>
                                                {solved
                                                    ? <CheckCircle2 className="w-6 h-6 text-black" />
                                                    : <Clock className="w-6 h-6 text-black/30" />
                                                }
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] uppercase font-black text-black/40">{pc.date}</p>
                                                <h4 className="text-lg font-black uppercase tracking-tight">{pc.title}</h4>
                                                <p className="text-[10px] font-bold text-black/30 uppercase">{pc.concept} · {pc.difficulty}</p>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </DrawnCard>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};


export default Daily;
