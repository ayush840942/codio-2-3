
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Play, 
  Eye, 
  Smartphone, 
  Monitor, 
  Tablet,
  Zap,
  Save,
  Share2,
  Download,
  Copy,
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';

interface BuildFeatureProps {
  onCodeChange?: (code: string) => void;
  initialCode?: string;
}

const BuildFeature: React.FC<BuildFeatureProps> = ({ 
  onCodeChange, 
  initialCode = '<h1 style="color: #6366f1; text-align: center; margin: 20px;">Hello World!</h1>' 
}) => {
  const [htmlCode, setHtmlCode] = useState(initialCode);
  const [cssCode, setCssCode] = useState(`
body { 
  font-family: 'Inter', Arial, sans-serif; 
  margin: 0;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

h1 {
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
  `);
  const [jsCode, setJsCode] = useState(`
console.log("Welcome to the Build feature!");

// Add some interactivity
document.addEventListener('DOMContentLoaded', function() {
  const h1 = document.querySelector('h1');
  if (h1) {
    h1.addEventListener('click', function() {
      this.style.transform = this.style.transform === 'scale(1.1)' ? 'scale(1)' : 'scale(1.1)';
      this.style.transition = 'transform 0.3s ease';
    });
  }
});
  `);
  const [activeTab, setActiveTab] = useState('html');
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [isRunning, setIsRunning] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const handleCodeChange = (newCode: string, type: string) => {
    if (type === 'html') {
      setHtmlCode(newCode);
      onCodeChange?.(newCode);
    } else if (type === 'css') {
      setCssCode(newCode);
    } else if (type === 'js') {
      setJsCode(newCode);
    }
    // Force preview refresh
    setPreviewKey(prev => prev + 1);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setPreviewKey(prev => prev + 1);
    toast.success("Code executed successfully!", {
      description: "Check the preview panel to see your results"
    });
    setTimeout(() => setIsRunning(false), 1000);
  };

  const handleSave = () => {
    const projectData = { html: htmlCode, css: cssCode, js: jsCode };
    localStorage.setItem('buildProject', JSON.stringify(projectData));
    toast.success("Project saved locally!");
  };

  const handleShare = () => {
    const projectData = { html: htmlCode, css: cssCode, js: jsCode };
    navigator.clipboard.writeText(JSON.stringify(projectData));
    toast.success("Project copied to clipboard!");
  };

  const handleDownload = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <style>${cssCode}</style>
</head>
<body>
    ${htmlCode}
    <script>${jsCode}</script>
</body>
</html>`;
    
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Project downloaded successfully!");
  };

  const handleReset = () => {
    setHtmlCode('<h1 style="color: #6366f1; text-align: center; margin: 20px;">Hello World!</h1>');
    setCssCode(`
body { 
  font-family: 'Inter', Arial, sans-serif; 
  margin: 0;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

h1 {
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
    `);
    setJsCode(`
console.log("Welcome to the Build feature!");

document.addEventListener('DOMContentLoaded', function() {
  const h1 = document.querySelector('h1');
  if (h1) {
    h1.addEventListener('click', function() {
      this.style.transform = this.style.transform === 'scale(1.1)' ? 'scale(1)' : 'scale(1.1)';
      this.style.transition = 'transform 0.3s ease';
    });
  }
});
    `);
    setPreviewKey(prev => prev + 1);
    toast.info("Project reset to default");
  };

  const getPreviewClasses = () => {
    switch (previewMode) {
      case 'mobile': return 'w-full max-w-sm mx-auto h-96';
      case 'tablet': return 'w-full max-w-md mx-auto h-96';
      case 'desktop': return 'w-full h-96';
      default: return 'w-full max-w-sm mx-auto h-96';
    }
  };

  const getCurrentCode = () => {
    switch (activeTab) {
      case 'html': return htmlCode;
      case 'css': return cssCode;
      case 'js': return jsCode;
      default: return htmlCode;
    }
  };

  const generatePreviewContent = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Preview</title>
    <style>${cssCode}</style>
</head>
<body>
    ${htmlCode}
    <script>${jsCode}</script>
</body>
</html>`;
  };

  // Auto-refresh preview when code changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviewKey(prev => prev + 1);
    }, 500);
    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, jsCode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Modern Header */}
        <motion.div
          className="text-center py-4 md:py-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🚀 Build & Create
          </h1>
          <p className="text-gray-600 text-sm md:text-lg">
            Write code, see it live, and build amazing projects
          </p>
        </motion.div>

        {/* Mobile-First Build Interface */}
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
          {/* Code Editor Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <Card className="h-full bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                {/* Code Editor Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                  <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Code Editor
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="secondary" className="h-8 px-3 text-xs" onClick={handleSave}>
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 px-3 text-xs" onClick={handleShare}>
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 px-3 text-xs" onClick={handleReset}>
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Reset
                      </Button>
                    </div>
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-3">
                    <TabsList className="bg-white/20 backdrop-blur-md">
                      <TabsTrigger value="html" className="text-xs data-[state=active]:bg-white data-[state=active]:text-indigo-600">HTML</TabsTrigger>
                      <TabsTrigger value="css" className="text-xs data-[state=active]:bg-white data-[state=active]:text-indigo-600">CSS</TabsTrigger>
                      <TabsTrigger value="js" className="text-xs data-[state=active]:bg-white data-[state=active]:text-indigo-600">JavaScript</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Code Input Area */}
                <div className="p-4">
                  <Tabs value={activeTab}>
                    <TabsContent value="html" className="mt-0">
                      <textarea
                        value={htmlCode}
                        onChange={(e) => handleCodeChange(e.target.value, 'html')}
                        className="w-full h-64 md:h-80 p-4 font-mono text-sm bg-gray-50 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                        placeholder="Write your HTML code here..."
                      />
                    </TabsContent>
                    <TabsContent value="css" className="mt-0">
                      <textarea
                        value={cssCode}
                        onChange={(e) => handleCodeChange(e.target.value, 'css')}
                        className="w-full h-64 md:h-80 p-4 font-mono text-sm bg-gray-50 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                        placeholder="Write your CSS code here..."
                      />
                    </TabsContent>
                    <TabsContent value="js" className="mt-0">
                      <textarea
                        value={jsCode}
                        onChange={(e) => handleCodeChange(e.target.value, 'js')}
                        className="w-full h-64 md:h-80 p-4 font-mono text-sm bg-gray-50 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                        placeholder="Write your JavaScript code here..."
                      />
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Action Buttons */}
                <div className="bg-gray-50 p-4 rounded-b-3xl">
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="flex-1 md:flex-none h-10 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {isRunning ? 'Running...' : 'Run Code'}
                    </Button>
                    <Button variant="outline" className="h-10 rounded-xl" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" className="h-10 rounded-xl" onClick={() => {
                      navigator.clipboard.writeText(getCurrentCode());
                      toast.success("Code copied to clipboard!");
                    }}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Live Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <Card className="h-full bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                {/* Preview Header */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white">
                  <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Live Preview
                    </h3>
                    <Badge variant="secondary" className="bg-white/20 text-white w-fit">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                      Live
                    </Badge>
                  </div>
                  
                  {/* Device Preview Options */}
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant={previewMode === 'mobile' ? 'secondary' : 'ghost'}
                      onClick={() => setPreviewMode('mobile')}
                      className="h-8 px-3 text-xs"
                    >
                      <Smartphone className="h-3 w-3 mr-1" />
                      Mobile
                    </Button>
                    <Button
                      size="sm"
                      variant={previewMode === 'tablet' ? 'secondary' : 'ghost'}
                      onClick={() => setPreviewMode('tablet')}
                      className="h-8 px-3 text-xs"
                    >
                      <Tablet className="h-3 w-3 mr-1" />
                      Tablet
                    </Button>
                    <Button
                      size="sm"
                      variant={previewMode === 'desktop' ? 'secondary' : 'ghost'}
                      onClick={() => setPreviewMode('desktop')}
                      className="h-8 px-3 text-xs"
                    >
                      <Monitor className="h-3 w-3 mr-1" />
                      Desktop
                    </Button>
                  </div>
                </div>

                {/* Preview Area */}
                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-80">
                  <div className={getPreviewClasses()}>
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-full">
                      <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-xs text-gray-600 ml-2">preview.html</div>
                      </div>
                      <div className="h-full">
                        <iframe
                          key={previewKey}
                          srcDoc={generatePreviewContent()}
                          className="w-full h-full border-0"
                          sandbox="allow-scripts allow-same-origin"
                          style={{ minHeight: '300px' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Footer */}
                <div className="bg-gray-50 p-4 rounded-b-3xl">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Auto-refresh enabled</span>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-yellow-500" />
                      <span>Instant updates</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Featured Projects Section */}
        <motion.div
          className="mt-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
            🌟 Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Personal Portfolio', difficulty: 'Beginner', time: '30 min', emoji: '💼' },
              { title: 'Todo App', difficulty: 'Intermediate', time: '45 min', emoji: '✅' },
              { title: 'Weather Dashboard', difficulty: 'Advanced', time: '60 min', emoji: '🌤️' }
            ].map((project, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden hover:scale-105">
                <CardContent className="p-4 md:p-6">
                  <div className="text-2xl mb-2">{project.emoji}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{project.title}</h3>
                  <div className="flex justify-between items-center">
                    <Badge 
                      variant="secondary" 
                      className={`${
                        project.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      {project.difficulty}
                    </Badge>
                    <span className="text-sm text-gray-600">{project.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BuildFeature;
