import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Copy, Check, Terminal, Code2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface CodePracticeEnvironmentProps {
  language: string;
  challenge?: {
    title: string;
    description: string;
    starterCode: string;
    expectedOutput?: string;
    hint?: string;
  };
  onComplete?: (code: string, output: string) => void;
}

const CodePracticeEnvironment: React.FC<CodePracticeEnvironmentProps> = ({
  language,
  challenge,
  onComplete
}) => {
  const [code, setCode] = useState(challenge?.starterCode || getDefaultStarterCode(language));
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [copied, setCopied] = useState(false);

  function getDefaultStarterCode(lang: string): string {
    const starters: Record<string, string> = {
      'JavaScript': '// Write your JavaScript code here\nconsole.log("Hello, World!");',
      'Python': '# Write your Python code here\nprint("Hello, World!")',
      'TypeScript': '// Write your TypeScript code here\nconst greeting: string = "Hello, World!";\nconsole.log(greeting);',
      'HTML': '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>',
      'CSS': '/* Write your CSS code here */\nbody {\n  background-color: #f0f0f0;\n  font-family: Arial, sans-serif;\n}',
      'React': '// React Component\nfunction App() {\n  return (\n    <div>\n      <h1>Hello, World!</h1>\n    </div>\n  );\n}',
    };
    return starters[lang] || '// Write your code here\n';
  }

  const executeCode = useCallback(() => {
    setIsRunning(true);
    setOutput('');

    try {
      const logs: string[] = [];

      // Create mock console
      const mockConsole = {
        log: (...args: any[]) => {
          const output = args.map(arg => {
            if (typeof arg === 'object' && arg !== null) {
              try {
                return JSON.stringify(arg, null, 2);
              } catch {
                return String(arg);
              }
            }
            return String(arg);
          }).join(' ');
          logs.push(output);
        },
        error: (...args: any[]) => {
          logs.push(`Error: ${args.map(String).join(' ')}`);
        },
        warn: (...args: any[]) => {
          logs.push(`Warning: ${args.map(String).join(' ')}`);
        }
      };

      let finalOutput = '';

      // Handle different languages
      if (language === 'JavaScript' || language === 'TypeScript') {
        const safeCode = code.replace(/console\.(log|error|warn)/g, 'mockConsole.$1');
        const executeFunction = new Function('mockConsole', `
          try {
            ${safeCode}
          } catch (error) {
            mockConsole.error(error.message);
          }
        `);
        executeFunction(mockConsole);
        finalOutput = logs.join('\n') || 'Code executed successfully (no output)';
      } else if (language === 'Python') {
        // Simulate Python execution
        finalOutput = simulatePythonExecution(code);
      } else if (language === 'HTML' || language === 'CSS') {
        finalOutput = 'Preview rendered below:\n\n' + code;
      } else if (language === 'React') {
        finalOutput = 'React component rendered:\n\n' + code;
      } else {
        finalOutput = `Code ready for ${language}:\n\n${code}`;
      }

      setOutput(finalOutput);

      if (challenge?.expectedOutput && finalOutput.includes(challenge.expectedOutput)) {
        toast.success('Correct! Your output matches the expected result.');
        onComplete?.(code, finalOutput);
      }
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, language, challenge, onComplete, output]);

  const simulatePythonExecution = (pythonCode: string): string => {
    const outputs: string[] = [];
    const lines = pythonCode.split('\n');

    lines.forEach(line => {
      const trimmed = line.trim();

      // Handle print statements
      const printMatch = trimmed.match(/print\((.+)\)/);
      if (printMatch) {
        let content = printMatch[1];
        // Remove quotes for string literals
        content = content.replace(/^["']|["']$/g, '');
        // Handle f-strings and basic expressions
        content = content.replace(/f["'](.+)["']/g, '$1');
        outputs.push(content);
      }

      // Handle basic variable assignments and expressions
      if (trimmed.includes('=') && !trimmed.startsWith('#')) {
        // Variable assignment - just note it
      }
    });

    return outputs.length > 0
      ? outputs.join('\n')
      : 'Code executed successfully (no print output)';
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(challenge?.starterCode || getDefaultStarterCode(language));
    setOutput('');
    setShowHint(false);
    toast.info('Code reset to starter');
  };

  return (
    <div className="space-y-4">
      {/* Challenge Info */}
      {challenge && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <h3 className="font-bold text-foreground mb-2">{challenge.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
            {challenge.expectedOutput && (
              <div className="bg-background/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Expected Output:</p>
                <code className="text-sm text-primary font-mono">{challenge.expectedOutput}</code>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Code Editor */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm">
              <Code2 className="w-4 h-4" />
              {language} Editor
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="h-8"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="h-8"
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Write your ${language} code here...`}
            className="min-h-[200px] font-mono text-sm resize-y bg-muted/30 border-muted"
            spellCheck={false}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={executeCode}
          disabled={isRunning}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          {isRunning ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run Code
            </>
          )}
        </Button>

        {challenge?.hint && !showHint && (
          <Button
            variant="outline"
            onClick={() => setShowHint(true)}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Hint
          </Button>
        )}
      </div>

      {/* Hint */}
      {showHint && challenge?.hint && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-300">{challenge.hint}</p>
          </div>
        </motion.div>
      )}

      {/* Output */}
      {output && (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Output
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <pre className="font-mono text-sm whitespace-pre-wrap text-foreground bg-background/50 rounded-lg p-3 max-h-[200px] overflow-y-auto">
              {output}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* HTML/CSS Preview */}
      {(language === 'HTML' || language === 'CSS') && output && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Live Preview</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div
              className="border rounded-lg p-4 bg-white min-h-[150px]"
              dangerouslySetInnerHTML={{
                __html: language === 'CSS'
                  ? `<style>${code}</style><div class="preview">Preview with your styles</div>`
                  : code
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CodePracticeEnvironment;
