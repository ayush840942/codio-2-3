
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const Playground = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('// Type your code here\nconsole.log("Hello Codio!");\n\nfunction greet(name) {\n  return "Building " + name + "...";\n}\n\nconsole.log(greet("something great"));');
    const [output, setOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const runCode = () => {
        setIsRunning(true);
        const logs: string[] = [];

        // Safety: only allow console.log for simple frontend execution
        const originalLog = console.log;
        console.log = (...args) => {
            logs.push(args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            ).join(' '));
        };

        try {
            // Intentionally using eval for playground simplicity
            // In production apps, consider a safer sandbox (iframe or web worker)
            eval(code);
            setOutput(logs);
            toast.success('Code executed successfully');
        } catch (err: any) {
            setOutput([...logs, `Error: ${err.message}`]);
            toast.error('Execution error');
        } finally {
            console.log = originalLog;
            setIsRunning(false);
        }
    };

    const clearOutput = () => {
        setOutput([]);
        toast.info('Output cleared');
    };

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        toast.success('Code copied to clipboard');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center justify-between bg-slate-900 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(-1)}
                        className="text-slate-400 hover:text-white"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <div>
                        <h1 className="text-xl font-black tracking-tighter">Playground.js</h1>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                            <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Live Editor</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyCode}
                        className="text-slate-400 hover:text-white rounded-xl"
                    >
                        <Copy className="w-5 h-5" />
                    </Button>
                    <Button
                        onClick={runCode}
                        disabled={isRunning}
                        className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black h-11 px-6 rounded-2xl shadow-xl shadow-yellow-400/10"
                    >
                        {isRunning ? 'Running...' : 'Run'}
                        <Play className="w-4 h-4 ml-2 fill-current" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
                {/* Editor Area */}
                <div className="flex-[3] flex flex-col gap-2 min-h-0">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Code2 className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Main.js</span>
                        </div>
                    </div>
                    <div className="relative flex-1 group">
                        <div className="absolute inset-0 bg-white/5 rounded-3xl blur-2xl group-focus-within:bg-yellow-400/5 transition-all" />
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                            className="relative w-full h-full p-8 bg-slate-900/50 rounded-3xl border border-white/5 focus:border-yellow-400/30 focus:outline-none font-mono text-lg leading-relaxed text-yellow-50 shadow-inner resize-none"
                        />
                    </div>
                </div>

                {/* Console Area */}
                <div className="flex-[2] flex flex-col gap-2 min-h-0">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Terminal className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Console</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearOutput}
                            className="h-8 text-[10px] font-black uppercase text-slate-500"
                        >
                            <RotateCcw className="w-3 h-3 mr-1.5" /> Clear
                        </Button>
                    </div>
                    <div className="flex-1 bg-slate-900/80 rounded-3xl border border-white/5 p-6 font-mono text-sm overflow-y-auto space-y-2">
                        {output.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-700">
                                <Terminal className="w-10 h-10 mb-2 opacity-10" />
                                <p className="text-[10px] font-black uppercase tracking-widest">No output yet</p>
                            </div>
                        ) : (
                            output.map((line, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`flex gap-3 ${line.startsWith('Error:') ? 'text-red-400' : 'text-slate-400'}`}
                                >
                                    <span className="text-slate-700 font-bold select-none">{i + 1}</span>
                                    <span className="flex-1 whitespace-pre-wrap">{line}</span>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Toolbox Bar */}
            <div className="p-4 flex gap-4 overflow-x-auto bg-slate-900 border-t border-white/5 scrollbar-none">
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-black uppercase tracking-tighter text-slate-400">Assistant</span>
                </div>
                {['console.log()', 'if/else', 'for loop', 'function()'].map(snippet => (
                    <button
                        key={snippet}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 text-xs font-bold whitespace-nowrap transition-all"
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
