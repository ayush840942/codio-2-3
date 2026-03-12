import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Code2, Palette, FileJson, CheckCircle2, ArrowLeft } from 'lucide-react';
import { DrawnButton } from '@/components/ui/HandDrawnComponents';
import { useNavigate } from 'react-router-dom';
import { haptics } from '@/utils/haptics';
import MobileHeader from '@/components/MobileHeader';
import { ImpactStyle, NotificationType } from '@capacitor/haptics';

export interface MobileWorkspaceProps {
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
  instruction?: string;
  title?: string;
  onSuccess?: () => void;
  expectedSnippet?: string;
}

type Tab = 'html' | 'css' | 'js';

const MobileWorkspace: React.FC<MobileWorkspaceProps> = ({
  initialHtml = '<h1>Hello World</h1>\n<p>Start coding!</p>',
  initialCss = 'body { font-family: sans-serif; text-align: center; padding: 2rem; color: #333; }',
  initialJs = 'console.log("App ready!");',
  instruction = 'Write your code below and hit format to see it live.',
  title = 'Project Workspace',
  onSuccess,
  expectedSnippet
}) => {
  const navigate = useNavigate();
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [activeTab, setActiveTab] = useState<Tab>('html');
  const [isSuccess, setIsSuccess] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Compile and run code for iframe preview
  const runCode = () => {
    haptics.impact(ImpactStyle.Light);
    if (!iframeRef.current) return;

    const source = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { margin: 0; padding: 0; }
                ${css}
              </style>
            </head>
            <body>
              ${html}
              <script>
                try {
                  ${js}
                } catch (e) {
                  console.error("User JS Error:", e);
                }
              </script>
            </body>
          </html>
        `;

    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(source);
      doc.close();
    }

    // Simple validation mechanic
    if (expectedSnippet && source.toLowerCase().includes(expectedSnippet.toLowerCase())) {
      haptics.notification(NotificationType.Success);
      setIsSuccess(true);
      if (onSuccess) {
        setTimeout(onSuccess, 1500);
      }
    }
  };

  // Run initial code on mount
  useEffect(() => {
    // Short timeout to ensure iframe is ready
    const timer = setTimeout(runCode, 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-[100dvh] bg-pastel-yellow/10 font-draw overflow-hidden">
      {/* Unified Mobile Header */}
      <MobileHeader
        title={title}
        subtitle={instruction}
        showBack
        rightElement={
          <DrawnButton
            onClick={runCode}
            variant="cc-green"
            className="px-4 py-2 text-sm flex items-center gap-1 shadow-comic-sm shrink-0"
          >
            <Play className="w-4 h-4 fill-black" /> RUN
          </DrawnButton>
        }
      />

      {/* Main Split Interface */}
      <div className="flex-1 flex flex-col overflow-hidden relative">

        {/* TOP HALF: Live Preview (Mobile Simulator) */}
        <div className="flex-[0.45] bg-stripes-light border-b-4 border-black relative overflow-hidden flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-sm pointer-events-none" />

          <div className="w-full h-full max-w-[400px] border-4 border-black rounded-[2.5rem] bg-white overflow-hidden shadow-comic relative z-10 flex flex-col">
            <div className="h-6 border-b border-black/10 bg-black/5 flex justify-center items-center">
              <div className="w-16 h-1.5 bg-black/20 rounded-full" />
            </div>

            <iframe
              ref={iframeRef}
              title="Live Preview"
              className="w-full h-full flex-1 border-none bg-white"
              sandbox="allow-scripts allow-modals allow-popups"
            />

            {/* Success Overlay within Preview */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-cc-green/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-black"
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <CheckCircle2 className="w-20 h-20 mb-4" />
                  </motion.div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter shadow-white drop-shadow-md">Verified!</h3>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM HALF: Code Editor */}
        <div className="flex-[0.55] flex flex-col bg-slate-900 border-t-8 border-black">
          {/* File Tabs */}
          <div className="flex bg-slate-800 border-b-2 border-slate-700">
            {[
              { id: 'html', label: 'index.html', icon: Code2, color: 'text-orange-400' },
              { id: 'css', label: 'styles.css', icon: Palette, color: 'text-blue-400' },
              { id: 'js', label: 'script.js', icon: FileJson, color: 'text-yellow-400' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  haptics.impact(ImpactStyle.Light);
                  setActiveTab(tab.id as Tab);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[10px] font-mono font-bold transition-colors ${activeTab === tab.id ? 'bg-slate-900 text-white border-b-2 border-blue-400' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <tab.icon className={`w-3 h-3 ${activeTab === tab.id ? tab.color : ''}`} />
                {tab.label.split('.')[0]}
              </button>
            ))}
          </div>

          {/* Text Area (Simulating Editor) */}
          <div className="flex-1 relative bg-[#1e1e1e]" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
            <textarea
              value={activeTab === 'html' ? html : activeTab === 'css' ? css : js}
              onChange={(e) => {
                const val = e.target.value;
                if (activeTab === 'html') setHtml(val);
                if (activeTab === 'css') setCss(val);
                if (activeTab === 'js') setJs(val);
              }}
              className="w-full h-full p-4 bg-transparent text-slate-300 font-mono text-sm leading-relaxed outline-none resize-none"
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              placeholder={`Start typing ${activeTab} code here...`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileWorkspace;
