
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';

interface InteractiveCodeExampleProps {
  code: string;
  title: string;
  expectedOutput?: string;
}

const InteractiveCodeExample: React.FC<InteractiveCodeExampleProps> = ({
  code,
  title,
  expectedOutput
}) => {
  const [output, setOutput] = useState<string>('');
  const [hasRun, setHasRun] = useState(false);

  const runCode = () => {
    // Simulate code execution
    setOutput(expectedOutput || 'Code executed successfully!');
    setHasRun(true);
  };

  const resetCode = () => {
    setOutput('');
    setHasRun(false);
  };

  return (
    <Card className="border border-indigo-200 bg-indigo-50/50">
      <CardContent className="p-4">
        <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
          <Play className="w-4 h-4" />
          {title}
        </h4>

        {/* Code display */}
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
          <pre className="text-sm whitespace-pre-wrap break-words">
            <code>{code}</code>
          </pre>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            size="sm"
            onClick={runCode}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Play className="w-3 h-3 mr-1" />
            Run Code
          </Button>
          {hasRun && (
            <Button
              size="sm"
              variant="outline"
              onClick={resetCode}
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          )}
        </div>

        {/* Output */}
        {hasRun && (
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <span className="text-xs font-medium text-gray-500 block mb-1">Output:</span>
            <code className="text-sm text-gray-800">{output}</code>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveCodeExample;
