import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Play,
    RotateCcw,
    Code2,
    Terminal,
    ArrowLeft,
    Copy,
    Share2,
    Settings,
    Sparkles,
    Zap,
    Crown,
    Beaker
} from 'lucide-react';
import { DrawnButton, DrawnCard } from '@/components/ui/HandDrawnComponents';
import { toast } from 'sonner';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import MobileHeader from '@/components/MobileHeader';

const CODE_TEMPLATES = [
    {
        name: 'Loop Mastery',
        icon: '🔄',
        code: '// Array power!\nconst heroes = ["Codio", "Bit", "Logic"];\n\nconsole.log("ROSTER:");\nheroes.forEach((h, i) => {\n  console.log(`${i + 1}. ${h}`);\n});\n\nconst upper = heroes.map(h => h.toUpperCase());\nconsole.log("LOUD ROSTER:", upper);'
    },
    {
        name: 'Object Secret',
        icon: '💎',
        code: '// Objects are keys to everything\nconst quest = {\n  id: "Q-101",\n  name: "JS Lab Explorer",\n  difficulty: "Hard",\n  reward: 500\n};\n\nconsole.log("Quest ID:", quest.id);\nconsole.log("Status: ACTIVE");\n\nconst entries = Object.entries(quest);\nconsole.log("Quest Data Structure:");\nconsole.log(entries);'
    },
    {
        name: 'Magic Function',
        icon: '🪄',
        code: '// Function Wizardry\nfunction summonPower(lvl) {\n  const power = lvl * 10;\n  return `Summoned ${power} Energy!`;\n}\n\nconsole.log(summonPower(5));\nconsole.log(summonPower(10));'
    }
];

const Playground = () => {
    const navigate = useNavigate();
    const { hasFeature, isSubscribed } = useSubscriptionFeatures();
    const [code, setCode] = useState('// Type your code here\nconsole.log("Hello Codio!");\n\nfunction greet(name) {\n  return "Building " + name + "...";\n}\n\nconsole.log(greet("something great"));');
    const [output, setOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    if (!hasFeature('playground')) {
        return (
            <div className="min-h-[100dvh] bg-pastel-yellow/20 flex items-center justify-center p-6 text-center font-draw">
                <DrawnCard className="space-y-6 max-w-sm bg-white p-8 shadow-comic-lg rotate-1">
                    <div className="w-20 h-20 bg-pastel-yellow border-3 border-black rounded-[2.5rem] flex items-center justify-center mx-auto shadow-comic rotate-3">
                        <Crown className="w-10 h-10 text-black" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-3xl font-black text-black uppercase tracking-tighter">LABS ACCESS</h2>
                    <p className="text-black/40 font-bold italic text-sm">
                        The JS Lab is a high-tech facility for Elite members only. Upgrade to start experimenting!
                    </p>
                    <DrawnButton
                        onClick={() => navigate('/subscription')}
                        className="w-full h-14 bg-black text-white text-xl shadow-comic"
                    >
                        UNLEASH ELITE
                    </DrawnButton>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-black/40 font-black uppercase text-xs tracking-widest hover:text-black transition-colors"
                    >
                        MAYBE LATER
                    </button>
                </DrawnCard>
            </div>
        );
    }

    const runCode = () => {
        setIsRunning(true);
        const logs: string[] = [];

        const originalLog = console.log;
        const originalError = console.error;

        console.log = (...args) => {
            logs.push(args.map(arg => {
                if (arg === null) return 'null';
                if (arg === undefined) return 'undefined';
                if (typeof arg === 'object') {
                    try {
                        return JSON.stringify(arg, null, 2);
                    } catch (e) {
                        return '[Circular Object]';
                    }
                }
                return String(arg);
            }).join(' '));
        };

        console.error = (...args) => {
            logs.push(`Error: ${args.join(' ')}`);
        };

        try {
            // Using new Function() is safer than eval but still needs caution
            // We wrap in a block to ensure strict mode doesn't leak
            const executor = new Function(`"use strict"; ${code}`);
            executor();
            setOutput(logs);
            if (logs.length > 0) {
                toast.success('BOOM! Code executed!');
            } else {
                toast.info('Ran perfectly (no logs)');
            }
        } catch (err: any) {
            console.error('Execution Error:', err);
            const errorLine = err.stack ? `\n\nStack: ${err.stack.split('\n')[1]}` : '';
            setOutput([...logs, `❌ Runtime Error: ${err.message}${errorLine}`]);
            toast.error('Oof! Check your code syntax.');
        } finally {
            console.log = originalLog;
            console.error = originalError;
            setIsRunning(false);
        }
    };

    const clearOutput = () => {
        setOutput([]);
        toast.info('Slate cleaned!');
    };

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        toast.success('Copied your genius!');
    };

    const loadTemplate = (templateCode: string) => {
        setCode(templateCode);
        toast.success('Template loaded! 🚀');
    };

    return (
        <div className="min-h-[100dvh] bg-pastel-yellow/20 flex flex-col overflow-hidden font-draw">
            {/* Unified Mobile Header */}
            <MobileHeader
                title="JS Labs"
                subtitle="Live Experiment"
                showBack
                rightElement={
                    <div className="flex gap-2">
                        <button
                            onClick={copyCode}
                            className="w-10 h-10 bg-white border-2 border-black rounded-xl flex items-center justify-center shadow-comic-sm active:translate-y-0.5 active:shadow-none transition-all"
                        >
                            <Copy className="w-4 h-4 text-black" strokeWidth={2.5} />
                        </button>
                        <DrawnButton
                            onClick={runCode}
                            disabled={isRunning}
                            className="bg-pastel-yellow h-10 px-4 shadow-comic-sm whitespace-nowrap text-xs"
                        >
                            {isRunning ? '...' : 'RUN!'}
                            <Zap className="w-3 h-3 ml-1 fill-black" strokeWidth={3} />
                        </DrawnButton>
                    </div>
                }
            />

            <div className="flex-1 flex flex-col md:flex-row p-4 gap-6 overflow-hidden">
                {/* Editor Area */}
                <div className="flex-[3] flex flex-col gap-3 min-h-0">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                            <Code2 className="w-5 h-5 text-black" strokeWidth={3} />
                            <span className="text-xs font-black uppercase tracking-widest text-black/40 italic">Brainstorm.js</span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto max-w-[200px] scrollbar-none">
                            {CODE_TEMPLATES.map((t, idx) => (
                                <button
                                    key={t.name}
                                    onClick={() => loadTemplate(t.code)}
                                    title={t.name}
                                    className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center text-sm shadow-comic-sm hover:bg-pastel-yellow transition-colors"
                                >
                                    {t.icon}
                                </button>
                            ))}
                        </div>
                    </div>
                    <DrawnCard className="flex-1 bg-white p-0 overflow-hidden shadow-comic-lg border-4 rotate-[-0.5deg]">
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                            className="w-full h-full p-8 bg-transparent focus:outline-none font-mono text-lg leading-relaxed text-black resize-none"
                        />
                    </DrawnCard>
                </div>

                {/* Console Area */}
                <div className="flex-[2] flex flex-col gap-3 min-h-0">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-black" strokeWidth={3} />
                            <span className="text-xs font-black uppercase tracking-widest text-black/40 italic">Result</span>
                        </div>
                        <button
                            onClick={clearOutput}
                            className="text-[10px] font-black uppercase text-black/30 hover:text-black transition-colors flex items-center gap-1.5"
                        >
                            <RotateCcw className="w-3 h-3" strokeWidth={3} /> RESET
                        </button>
                    </div>
                    <DrawnCard className="flex-1 bg-black p-0 overflow-hidden shadow-comic border-4 rotate-[0.5deg]">
                        <div className="w-full h-full p-6 font-mono text-sm overflow-y-auto space-y-3 custom-scrollbar">
                            {output.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-white/10 opacity-40">
                                    <Beaker className="w-12 h-12 mb-3" strokeWidth={1.5} />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Ready for results</p>
                                </div>
                            ) : (
                                output.map((line, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={i}
                                        className={`flex gap-3 ${line.startsWith('Error:') ? 'text-pastel-pink' : 'text-pastel-mint'}`}
                                    >
                                        <span className="text-white/20 font-bold select-none">{i + 1}</span>
                                        <span className="flex-1 whitespace-pre-wrap">{line}</span>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </DrawnCard>
                </div>
            </div>

            {/* Toolbox Bar */}
            <div className="p-4 flex gap-4 overflow-x-auto bg-white border-t-3 border-black scrollbar-none pb-[calc(var(--safe-area-bottom)+1rem)]">
                <div className="flex items-center gap-3 px-4 py-2 bg-pastel-blue/20 border-2 border-black rounded-xl shadow-comic-sm shrink-0 -rotate-2">
                    <Sparkles className="w-4 h-4 text-black" strokeWidth={3} />
                    <span className="text-[10px] font-black uppercase tracking-tight text-black">SNIPPETS:</span>
                </div>
                {['console.log()', 'if/else', 'for loop', 'function()'].map((snippet, idx) => (
                    <button
                        key={snippet}
                        className={`px-5 py-2.5 bg-white hover:bg-black hover:text-white border-2 border-black rounded-xl text-xs font-black uppercase tracking-tight whitespace-nowrap shadow-comic-sm transition-all active:translate-y-0.5 active:shadow-none rotate-[${idx % 2 === 0 ? '2deg' : '-2deg'}]`}
                        onClick={() => setCode(prev => prev + '\n' + snippet)}
                    >
                        {snippet}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Playground;
