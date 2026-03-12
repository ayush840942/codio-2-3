import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import {
    Play,
    RotateCcw,
    Save,
    Share2,
    ArrowLeft,
    Download,
    Copy,
    Moon,
    Sun,
    Maximize2,
    Minimize2,
    FolderOpen,
    Plus,
    FileText,
    Trash2,
    Smartphone,
    Tablet,
    Monitor,
    Eye,
    EyeOff,
    Sparkles,
    Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import { Crown } from 'lucide-react';
import { executeCode, validateCode } from '@/services/codeExecutionService';
import { saveProject, loadUserProjects, CodeProject } from '@/services/codeProjectService';
import { TEMPLATES, getTemplateById, ProjectTemplate } from '@/data/codeTemplates';
import MobileHeader from '@/components/MobileHeader';

type Language = 'javascript' | 'typescript' | 'python' | 'html' | 'css' | 'cpp' | 'java' | 'go' | 'rust';
type DeviceMode = 'mobile' | 'tablet' | 'desktop';

interface FileNode {
    name: string;
    content: string;
    language: string;
}

interface LanguageConfig {
    name: string;
    monacoLang: string;
    defaultCode: string;
    canRunClientSide: boolean;
}

const LANGUAGES: Record<Language, LanguageConfig> = {
    javascript: {
        name: 'JavaScript',
        monacoLang: 'javascript',
        defaultCode: '// Welcome to Code Builder Pro!\nconsole.log("Hello, World!");\n\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("Codio"));',
        canRunClientSide: true
    },
    typescript: {
        name: 'TypeScript',
        monacoLang: 'typescript',
        defaultCode: '// TypeScript with type safety\nconst greet = (name: string): string => {\n  return "Hello, " + name + "!";\n};\n\nconsole.log(greet("Codio"));',
        canRunClientSide: true
    },
    python: {
        name: 'Python',
        monacoLang: 'python',
        defaultCode: `# Python Code\nprint("Hello, World!")\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Codio"))`,
        canRunClientSide: false
    },
    html: {
        name: 'HTML',
        monacoLang: 'html',
        defaultCode: `<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n  <style>\n    body { font-family: Arial; padding: 20px; }\n    h1 { color: #4F46E5; }\n  </style>\n</head>\n<body>\n  <h1>Hello, Codio!</h1>\n  <p>Build anything you want!</p>\n</body>\n</html>`,
        canRunClientSide: true
    },
    css: {
        name: 'CSS',
        monacoLang: 'css',
        defaultCode: `/* CSS Styles */\nbody {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  font-family: Arial, sans-serif;\n  padding: 40px;\n}\n\nh1 {\n  font-size: 3em;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n}`,
        canRunClientSide: true
    },
    cpp: {
        name: 'C++',
        monacoLang: 'cpp',
        defaultCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
        canRunClientSide: false
    },
    java: {
        name: 'Java',
        monacoLang: 'java',
        defaultCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
        canRunClientSide: false
    },
    go: {
        name: 'Go',
        monacoLang: 'go',
        defaultCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}`,
        canRunClientSide: false
    },
    rust: {
        name: 'Rust',
        monacoLang: 'rust',
        defaultCode: `fn main() {\n    println!("Hello, World!");\n}`,
        canRunClientSide: false
    }
};

const CodeBuilderPro = () => {
    const navigate = useNavigate();
    const { hasFeature } = useSubscriptionFeatures();

    // Multi-file support
    const [files, setFiles] = useState<FileNode[]>([
        { name: 'index.html', content: LANGUAGES.html.defaultCode, language: 'html' }
    ]);
    const [activeFile, setActiveFile] = useState(0);

    // UI State
    const [output, setOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
    const [showTemplates, setShowTemplates] = useState(false);
    const [showProjects, setShowProjects] = useState(false);
    const [projects, setProjects] = useState<CodeProject[]>([]);

    const editorRef = useRef<any>(null);
    const previewRef = useRef<HTMLIFrameElement>(null);

    // Premium check
    if (!hasFeature('codeBuilder')) {
        return (
            <div className="min-h-[100dvh] bg-slate-950 flex items-center justify-center p-6 text-center">
                <div className="space-y-6 max-w-sm">
                    <div className="w-20 h-20 bg-yellow-400/20 rounded-[2.5rem] flex items-center justify-center mx-auto">
                        <Crown className="w-10 h-10 text-yellow-400" />
                    </div>
                    <h2 className="text-2xl font-black text-white">Unlock Code Builder Pro</h2>
                    <p className="text-slate-400 font-medium">
                        Build anything with our AI-powered IDE! Live preview, multi-file projects, and more!
                    </p>
                    <Button
                        onClick={() => navigate('/subscription')}
                        className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-black rounded-2xl"
                    >
                        View Plans
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="text-slate-500 font-bold"
                    >
                        Maybe later
                    </Button>
                </div>
            </div>
        );
    }

    // Get current file
    const currentFile = files[activeFile];
    const isWebProject = files.some(f => f.name.endsWith('.html'));

    // Live preview update (debounced)
    useEffect(() => {
        if (!showPreview || !isWebProject) return;

        const timer = setTimeout(() => {
            updatePreview();
        }, 500);

        return () => clearTimeout(timer);
    }, [files, showPreview, isWebProject]);

    const updatePreview = () => {
        if (!previewRef.current) return;

        const htmlFile = files.find(f => f.name.endsWith('.html'));
        const cssFile = files.find(f => f.name.endsWith('.css'));
        const jsFile = files.find(f => f.name.endsWith('.js'));

        let html = htmlFile?.content || '';

        // Inject CSS
        if (cssFile && !html.includes(cssFile.name)) {
            html = html.replace('</head>', `<style>${cssFile.content}</style></head>`);
        }

        // Inject JS
        if (jsFile && !html.includes(jsFile.name)) {
            html = html.replace('</body>', `<script>${jsFile.content}</script></body>`);
        }

        const doc = previewRef.current.contentDocument;
        if (doc) {
            doc.open();
            doc.write(html);
            doc.close();
        }
    };

    const runCode = async () => {
        setIsRunning(true);
        setOutput([]);
        const logs: string[] = [];

        const validation = validateCode(currentFile.language, currentFile.content);
        if (!validation.valid) {
            setOutput([`❌ Validation Error: ${validation.error}`]);
            toast.error(validation.error || 'Invalid code');
            setIsRunning(false);
            return;
        }

        try {
            const canRunClientSide = LANGUAGES[currentFile.language as Language]?.canRunClientSide;

            if (currentFile.language === 'html' && isWebProject) {
                updatePreview();
                setOutput(['✅ Live preview updated']);
                toast.success('Preview rendered');
            } else if (!canRunClientSide) {
                setOutput(['⏳ Executing code on server...']);

                const result = await executeCode(currentFile.language, currentFile.content);

                if (result.success) {
                    const outputLines = result.output.split('\n').filter(line => line.trim());
                    setOutput([
                        `✅ Executed successfully (${result.executionTime}ms)`,
                        '--- Output ---',
                        ...outputLines.map(line => `▶ ${line}`)
                    ]);
                    toast.success(`Code executed in ${result.executionTime}ms`);
                } else {
                    setOutput([
                        '❌ Execution failed',
                        result.error || 'Unknown error',
                        ...(result.output ? ['--- Partial Output ---', result.output] : [])
                    ]);
                    toast.error('Execution failed');
                }
            } else {
                // JavaScript execution
                const originalLog = console.log;
                const originalError = console.error;
                const originalWarn = console.warn;

                console.log = (...args) => {
                    logs.push('▶ ' + args.map(arg =>
                        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                    ).join(' '));
                };

                console.error = (...args) => {
                    logs.push('❌ ' + args.join(' '));
                };

                console.warn = (...args) => {
                    logs.push('⚠️ ' + args.join(' '));
                };

                try {
                    // Wrap in strict mode for better error reporting
                    const execute = new Function(`"use strict"; ${currentFile.content}`);
                    execute();

                    setOutput(logs.length > 0 ? logs : ['✅ Code executed successfully (no output)']);
                    toast.success('Execution Finished');
                } catch (err: any) {
                    console.error('JS Execution Error:', err);
                    setOutput([...logs, `❌ Execution Error: ${err.message}`]);
                    toast.error('Runtime error detected');
                } finally {
                    console.log = originalLog;
                    console.error = originalError;
                    console.warn = originalWarn;
                }
            }
        } catch (err: any) {
            setOutput([`❌ Error: ${err.message}`]);
            toast.error('Execution failed');
        } finally {
            setIsRunning(false);
        }
    };

    const addFile = () => {
        const fileName = prompt('Enter file name (e.g., script.js, styles.css):');
        if (!fileName) return;

        const ext = fileName.split('.').pop()?.toLowerCase();
        let language = 'javascript';
        if (ext === 'html') language = 'html';
        else if (ext === 'css') language = 'css';
        else if (ext === 'py') language = 'python';
        else if (ext === 'cpp' || ext === 'h') language = 'cpp';
        else if (ext === 'java') language = 'java';

        setFiles([...files, { name: fileName, content: '', language }]);
        setActiveFile(files.length);
        toast.success(`Created ${fileName}`);
    };

    const deleteFile = (index: number) => {
        if (files.length === 1) {
            toast.error('Cannot delete the last file');
            return;
        }
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        setActiveFile(Math.max(0, activeFile - 1));
        toast.success('File deleted');
    };

    const loadTemplate = (template: ProjectTemplate) => {
        const newFiles: FileNode[] = Object.entries(template.files).map(([name, content]) => {
            const ext = name.split('.').pop()?.toLowerCase() || 'txt';
            let language = 'javascript';
            if (ext === 'html') language = 'html';
            else if (ext === 'css') language = 'css';
            else if (ext === 'js') language = 'javascript';
            else if (ext === 'py') language = 'python';

            return { name, content, language };
        });

        setFiles(newFiles);
        setActiveFile(0);
        setShowTemplates(false);
        toast.success(`Loaded: ${template.name}`);
    };

    const handleSaveProject = async () => {
        const title = prompt('Enter project name:', `My ${currentFile.language} Project`);
        if (!title) return;

        // Save all files as a single code string
        const projectCode = files.map(f => `// ${f.name}\n${f.content}`).join('\n\n');

        const result = await saveProject(title, currentFile.language, projectCode);
        if (result.success) {
            toast.success('Project saved!');
            loadProjects();
        } else {
            toast.error(result.error || 'Failed to save');
        }
    };

    const loadProjects = async () => {
        const result = await loadUserProjects();
        if (result.success && result.projects) {
            setProjects(result.projects);
        }
    };

    const getDeviceWidth = () => {
        switch (deviceMode) {
            case 'mobile': return '375px';
            case 'tablet': return '768px';
            case 'desktop': return '100%';
        }
    };

    return (
        <div className={`min-h-[100dvh] bg-slate-950 text-slate-100 flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
            {/* Unified Mobile Header */}
            <MobileHeader
                title="Code Builder Pro"
                showBack
                rightElement={
                    <div className="flex items-center gap-2">
                        {/* Device Mode (for web projects) */}
                        {isWebProject && showPreview && (
                            <div className="hidden sm:flex gap-1 bg-slate-800 rounded-xl p-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setDeviceMode('mobile')}
                                    className={`h-8 px-3 ${deviceMode === 'mobile' ? 'bg-white/10' : ''}`}
                                >
                                    <Smartphone className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setDeviceMode('tablet')}
                                    className={`h-8 px-3 ${deviceMode === 'tablet' ? 'bg-white/10' : ''}`}
                                >
                                    <Tablet className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setDeviceMode('desktop')}
                                    className={`h-8 px-3 ${deviceMode === 'desktop' ? 'bg-white/10' : ''}`}
                                >
                                    <Monitor className="w-4 h-4" />
                                </Button>
                            </div>
                        )}

                        {/* Templates */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowTemplates(!showTemplates)}
                            className="text-black hover:text-white rounded-xl"
                            title="Templates"
                        >
                            <Zap className="w-5 h-5" />
                        </Button>

                        {/* Run Button */}
                        <Button
                            onClick={runCode}
                            disabled={isRunning}
                            className="bg-green-500 hover:bg-green-600 text-white font-black h-10 px-4 rounded-xl shadow-comic-sm"
                        >
                            {isRunning ? '...' : 'Run'}
                            <Play className="w-3 h-3 ml-2 fill-current" />
                        </Button>
                    </div>
                }
            />

            {/* File Tabs */}
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-white/5 overflow-x-auto">
                {files.map((file, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${activeFile === index
                            ? 'bg-slate-800 text-white'
                            : 'bg-slate-900/50 text-slate-400 hover:bg-slate-800/50'
                            }`}
                        onClick={() => setActiveFile(index)}
                    >
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-bold whitespace-nowrap">{file.name}</span>
                        {files.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteFile(index);
                                }}
                                className="ml-2 text-slate-500 hover:text-red-400"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                ))}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={addFile}
                    className="h-8 text-xs font-black text-slate-400"
                >
                    <Plus className="w-4 h-4 mr-1" /> Add File
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Editor */}
                <div className={`flex flex-col min-h-0 ${showPreview && isWebProject ? 'flex-1' : 'flex-[2]'} border-r border-white/5`}>
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            language={currentFile.language}
                            value={currentFile.content}
                            onChange={(value) => {
                                const newFiles = [...files];
                                newFiles[activeFile].content = value || '';
                                setFiles(newFiles);
                            }}
                            theme={theme}
                            options={{
                                fontSize: 14,
                                minimap: { enabled: true },
                                scrollBeyondLastLine: false,
                                wordWrap: 'on',
                                automaticLayout: true,
                                tabSize: 2,
                                formatOnPaste: true,
                                formatOnType: true,
                                suggestOnTriggerCharacters: true,
                                quickSuggestions: true
                            }}
                            onMount={(editor) => {
                                editorRef.current = editor;
                            }}
                        />
                    </div>
                </div>

                {/* Live Preview (for web projects) */}
                {showPreview && isWebProject && (
                    <div className="flex-1 flex flex-col bg-slate-900/50">
                        <div className="px-4 py-2 bg-slate-900 border-b border-white/5 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                Live Preview
                            </span>
                            <span className="text-xs text-slate-600 font-mono">
                                {deviceMode === 'mobile' ? '375px' : deviceMode === 'tablet' ? '768px' : 'Responsive'}
                            </span>
                        </div>
                        <div className="flex-1 p-4 overflow-auto flex items-start justify-center">
                            <div style={{ width: getDeviceWidth(), height: '100%' }}>
                                <iframe
                                    ref={previewRef}
                                    className="w-full h-full bg-white rounded-lg shadow-2xl"
                                    title="Live Preview"
                                    sandbox="allow-scripts"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Console Output (for non-web projects) */}
                {(!isWebProject || !showPreview) && (
                    <div className="flex-[0.8] flex flex-col min-h-0 bg-slate-900/50">
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-white/5">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                Output
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setOutput([])}
                                className="h-8 text-xs font-black text-slate-400"
                            >
                                <RotateCcw className="w-3 h-3 mr-1.5" /> Clear
                            </Button>
                        </div>
                        <div className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-2">
                            {output.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-700">
                                    <Play className="w-10 h-10 mb-2 opacity-10" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">
                                        Click Run to see output
                                    </p>
                                </div>
                            ) : (
                                output.map((line, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={i}
                                        className={`flex gap-3 ${line.startsWith('❌') ? 'text-red-400' :
                                            line.startsWith('⚠️') ? 'text-yellow-400' :
                                                line.startsWith('✅') ? 'text-green-400' :
                                                    'text-slate-300'
                                            }`}
                                    >
                                        <span className="text-slate-700 font-bold select-none">{i + 1}</span>
                                        <span className="flex-1 whitespace-pre-wrap">{line}</span>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Templates Modal */}
            <AnimatePresence>
                {showTemplates && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowTemplates(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-900 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                                <Zap className="w-6 h-6 text-yellow-400" />
                                Project Templates
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {TEMPLATES.map((template) => (
                                    <div
                                        key={template.id}
                                        className="bg-slate-800 rounded-xl p-4 cursor-pointer hover:bg-slate-700 transition-all"
                                        onClick={() => loadTemplate(template)}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-black text-lg">{template.name}</h3>
                                            <span className={`text-xs px-2 py-1 rounded-full ${template.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                                                template.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-red-500/20 text-red-400'
                                                }`}>
                                                {template.difficulty}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-400 mb-3">{template.description}</p>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="bg-slate-700 px-2 py-1 rounded">{template.language.toUpperCase()}</span>
                                            <span>{Object.keys(template.files).length} files</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <div className="p-3 flex gap-3 bg-slate-900 border-t border-white/5">
                <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs font-black text-slate-400">
                        {files.length} file{files.length > 1 ? 's' : ''} • {currentFile.name}
                    </span>
                </div>
                <div className="flex-1" />
                <span className="text-xs text-slate-600 font-mono">
                    Lines: {currentFile.content.split('\n').length}
                </span>
            </div>
        </div>
    );
};

export default CodeBuilderPro;
