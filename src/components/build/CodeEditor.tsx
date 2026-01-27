import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Code2, Palette, Zap, Download, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface CodeEditorProps {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  onHtmlChange: (code: string) => void;
  onCssChange: (code: string) => void;
  onJsChange: (code: string) => void;
  onRun: () => void;
  onCopy: () => void;
  onDownload: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  htmlCode,
  cssCode,
  jsCode,
  onHtmlChange,
  onCssChange,
  onJsChange,
  onRun,
  onCopy,
  onDownload
}) => {
  const handleMobileDownload = async () => {
    try {
      // Create the complete HTML file content
      const fullHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodeZen Project</title>
    <style>
        ${cssCode}
    </style>
</head>
<body>
    ${htmlCode}
    <script>
        ${jsCode}
    </script>
</body>
</html>`;

      // Check if we're on mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // For mobile devices, use data URL approach for direct download
        const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(fullHtmlContent)}`;
        
        // Create download link
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `codezen-project-${Date.now()}.html`;
        
        // Force download on mobile
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Add a small delay to ensure the link is in DOM
        setTimeout(() => {
          link.click();
          document.body.removeChild(link);
        }, 100);
        
        toast.success('Download initiated!', {
          description: 'Your HTML file download has started.'
        });
      } else {
        // Desktop download
        onDownload();
      }
    } catch (error) {
      console.error('Download error:', error);
      
      // Fallback: copy to clipboard
      try {
        const fullHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodeZen Project</title>
    <style>
        ${cssCode}
    </style>
</head>
<body>
    ${htmlCode}
    <script>
        ${jsCode}
    </script>
</body>
</html>`;
        await navigator.clipboard.writeText(fullHtmlContent);
        toast.info('Download failed, code copied to clipboard instead');
      } catch (clipboardError) {
        toast.error('Download failed. Please try again.');
      }
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2 md:pb-3">
        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-sm md:text-base">
            <Code2 className="w-4 h-4 md:w-5 md:h-5" />
            Code Editor
          </span>
          <div className="flex flex-wrap gap-1 md:gap-2 w-full sm:w-auto">
            <Button onClick={onRun} size="sm" className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none text-xs md:text-sm px-2 md:px-3 py-1">
              <Play className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              Run
            </Button>
            <Button onClick={onCopy} size="sm" variant="outline" className="flex-1 sm:flex-none text-xs md:text-sm px-2 md:px-3 py-1">
              <Copy className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              Copy
            </Button>
            <Button onClick={handleMobileDownload} size="sm" variant="outline" className="flex-1 sm:flex-none text-xs md:text-sm px-2 md:px-3 py-1">
              <Download className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              Download
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-3 h-8 md:h-10">
            <TabsTrigger value="html" className="flex items-center gap-1 text-xs md:text-sm px-2">
              <Code2 className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">HTML</span>
            </TabsTrigger>
            <TabsTrigger value="css" className="flex items-center gap-1 text-xs md:text-sm px-2">
              <Palette className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">CSS</span>
            </TabsTrigger>
            <TabsTrigger value="js" className="flex items-center gap-1 text-xs md:text-sm px-2">
              <Zap className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">JS</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="html" className="mt-2">
            <Textarea 
              value={htmlCode} 
              onChange={(e) => onHtmlChange(e.target.value)} 
              placeholder="Enter your HTML code here..." 
              className="min-h-[250px] md:min-h-[400px] font-mono text-xs md:text-sm resize-none scrollable" 
            />
          </TabsContent>
          
          <TabsContent value="css" className="mt-2">
            <Textarea 
              value={cssCode} 
              onChange={(e) => onCssChange(e.target.value)} 
              placeholder="Enter your CSS code here..." 
              className="min-h-[250px] md:min-h-[400px] font-mono text-xs md:text-sm resize-none scrollable" 
            />
          </TabsContent>
          
          <TabsContent value="js" className="mt-2">
            <Textarea 
              value={jsCode} 
              onChange={(e) => onJsChange(e.target.value)} 
              placeholder="Enter your JavaScript code here..." 
              className="min-h-[250px] md:min-h-[400px] font-mono text-xs md:text-sm resize-none scrollable" 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
