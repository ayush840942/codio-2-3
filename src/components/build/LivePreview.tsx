
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Play, Eye, Smartphone, Monitor, Tablet, AlertTriangle, RefreshCw } from 'lucide-react';

interface LivePreviewProps {
  previewCode: string;
  previewMode: 'mobile' | 'tablet' | 'desktop';
  error: string;
  onPreviewModeChange: (mode: 'mobile' | 'tablet' | 'desktop') => void;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  previewCode,
  previewMode,
  error,
  onPreviewModeChange
}) => {
  const getPreviewStyles = () => {
    switch (previewMode) {
      case 'mobile':
        return { width: '375px', height: '600px' };
      case 'tablet':
        return { width: '768px', height: '500px' };
      default:
        return { width: '100%', height: '500px' };
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2 md:pb-3">
        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-sm md:text-base">
            <Play className="w-4 h-4 md:w-5 md:h-5" />
            Live Preview
          </span>
          <div className="flex gap-1 md:gap-2 w-full sm:w-auto">
            <Button
              onClick={() => onPreviewModeChange('desktop')}
              size="sm"
              variant={previewMode === 'desktop' ? 'default' : 'outline'}
              className="flex-1 sm:flex-none px-2 py-1"
            >
              <Monitor className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
            <Button
              onClick={() => onPreviewModeChange('tablet')}
              size="sm"
              variant={previewMode === 'tablet' ? 'default' : 'outline'}
              className="flex-1 sm:flex-none px-2 py-1"
            >
              <Tablet className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
            <Button
              onClick={() => onPreviewModeChange('mobile')}
              size="sm"
              variant={previewMode === 'mobile' ? 'default' : 'outline'}
              className="flex-1 sm:flex-none px-2 py-1"
            >
              <Smartphone className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-6 py-[12px] px-0">
        {error && (
          <Alert className="mb-3 border-red-200 bg-red-50">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription className="text-red-800 text-xs md:text-sm">{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="bg-gray-100 p-2 md:p-4 rounded-lg overflow-auto">
          <div className="mx-auto border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white" style={getPreviewStyles()}>
            <iframe 
              srcDoc={previewCode} 
              className="w-full h-full border-0" 
              title="Preview" 
              sandbox="allow-scripts allow-same-origin" 
            />
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm text-gray-600">
          <Badge variant="outline" className="flex items-center gap-1 text-xs px-2 py-1">
            <RefreshCw className="w-3 h-3" />
            Auto-refresh
          </Badge>
          <Badge variant="outline" className="text-xs px-2 py-1">
            {previewMode === 'desktop' ? 'Desktop' : previewMode === 'tablet' ? 'Tablet' : 'Mobile'} View
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivePreview;
