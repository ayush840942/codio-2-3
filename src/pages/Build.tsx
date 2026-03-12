
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Play, Download, Copy, RotateCcw, Smartphone, Tablet, Monitor, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileHeader from '@/components/MobileHeader';

const Build = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [activeTab, setActiveTab] = useState('html');
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  const [htmlCode, setHtmlCode] = useState(`<div class="container">
  <h1>Hello World!</h1>
  <p>Start building your project</p>
  <button onclick="alert('Clicked!')">Click Me</button>
</div>`);

  const [cssCode, setCssCode] = useState(`body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  min-height: 100vh;
  color: white;
}

.container {
  text-align: center;
  padding: 32px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 8px;
}

button {
  background: white;
  color: #667eea;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
}`);

  const [jsCode, setJsCode] = useState(`// Your JavaScript code here
console.log('Hello from CodeZen!');`);

  const generatePreview = () => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${cssCode}</style>
</head>
<body>
  ${htmlCode}
  <script>${jsCode}</script>
</body>
</html>`;
  };

  const handleRun = () => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(generatePreview());
        doc.close();
      }
    }
    toast.success('Code executed!');
  };

  const handleCopy = () => {
    const code = activeTab === 'html' ? htmlCode : activeTab === 'css' ? cssCode : jsCode;
    navigator.clipboard.writeText(code);
    toast.success('Copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([generatePreview()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded!');
  };

  const handleReset = () => {
    setHtmlCode(`<div class="container">
  <h1>Hello World!</h1>
  <p>Start building your project</p>
  <button onclick="alert('Clicked!')">Click Me</button>
</div>`);
    setCssCode(`body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  min-height: 100vh;
  color: white;
}

.container {
  text-align: center;
  padding: 32px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 8px;
}

button {
  background: white;
  color: #667eea;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
}`);
    setJsCode(`// Your JavaScript code here
console.log('Hello from CodeZen!');`);
    toast.info('Reset to default');
  };

  useEffect(() => {
    const timer = setTimeout(handleRun, 300);
    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, jsCode]);

  const getPreviewSize = () => {
    switch (viewMode) {
      case 'mobile': return 'w-[280px]';
      case 'tablet': return 'w-[400px]';
      case 'desktop': return 'w-full';
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Unified Mobile Header */}
      <MobileHeader
        title="Build"
        showBack
        rightElement={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleCopy} className="text-black">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDownload} className="text-black">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleReset} className="text-black">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      <div className={`max-w-7xl mx-auto p-4 ${isMobile ? 'space-y-4' : 'grid grid-cols-2 gap-6'}`} style={{ paddingTop: 'calc(var(--safe-area-top) + 4rem)' }}>
        {/* Code Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={isMobile ? 'order-2' : ''}
        >
          <Card className="overflow-hidden border-border/50">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="bg-muted/30 px-4 py-2 border-b border-border/50">
                <TabsList className="h-9 bg-muted/50">
                  <TabsTrigger value="html" className="text-xs px-4">HTML</TabsTrigger>
                  <TabsTrigger value="css" className="text-xs px-4">CSS</TabsTrigger>
                  <TabsTrigger value="js" className="text-xs px-4">JS</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-3">
                <TabsContent value="html" className="mt-0">
                  <textarea
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-muted/30 border border-border/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="HTML code..."
                    spellCheck={false}
                  />
                </TabsContent>
                <TabsContent value="css" className="mt-0">
                  <textarea
                    value={cssCode}
                    onChange={(e) => setCssCode(e.target.value)}
                    className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-muted/30 border border-border/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="CSS code..."
                    spellCheck={false}
                  />
                </TabsContent>
                <TabsContent value="js" className="mt-0">
                  <textarea
                    value={jsCode}
                    onChange={(e) => setJsCode(e.target.value)}
                    className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-muted/30 border border-border/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="JavaScript code..."
                    spellCheck={false}
                  />
                </TabsContent>
              </div>

              <div className="px-3 pb-3">
                <Button onClick={handleRun} className="w-full gap-2">
                  <Play className="h-4 w-4" />
                  Run Code
                </Button>
              </div>
            </Tabs>
          </Card>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={isMobile ? 'order-1' : ''}
        >
          <Card className="overflow-hidden border-border/50">
            <div className="bg-muted/30 px-4 py-2 border-b border-border/50 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Preview</span>
              <div className="flex items-center gap-1">
                <Button
                  variant={viewMode === 'mobile' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setViewMode('mobile')}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant={viewMode === 'tablet' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setViewMode('tablet')}
                >
                  <Tablet className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant={viewMode === 'desktop' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setViewMode('desktop')}
                >
                  <Monitor className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-muted/20 min-h-[320px] md:min-h-[400px] flex items-start justify-center">
              <div className={`${getPreviewSize()} h-full transition-all duration-300`}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-border/30">
                  {/* Browser chrome */}
                  <div className="bg-muted/50 px-3 py-2 flex items-center gap-2 border-b border-border/30">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 bg-background/50 rounded px-2 py-0.5 text-xs text-muted-foreground truncate">
                      preview.html
                    </div>
                  </div>
                  <iframe
                    ref={iframeRef}
                    srcDoc={generatePreview()}
                    className="w-full h-64 md:h-80 border-0"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Build;
