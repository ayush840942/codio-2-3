
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Copy, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

type Code = {
  javascript: string;
  python: string;
  java: string;
};

type LevelInfo = {
    topic: string;
    difficulty: string;
    xpReward: number;
}

interface GeneratedCodeProps {
  code: Code;
  levelInfo: LevelInfo;
}

const GeneratedCode: React.FC<GeneratedCodeProps> = ({ code, levelInfo }) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState('javascript');
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code[selectedLanguage as keyof typeof code]);
    setCopied(true);
    
    toast.success("Code Copied! The code has been copied to your clipboard.");
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Card className="shadow-lg border-puzzle-blue/10 border">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Generated Code</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleCopyCode} className="h-8">
            {copied ? (
              <CheckCircle className="h-4 w-4 mr-2 text-puzzle-green" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>
        </div>
        <CardDescription>
          This is the code generated from your puzzle solution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="javascript" onValueChange={setSelectedLanguage}>
          <TabsList className="mb-4">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
          </TabsList>
          
          <TabsContent value="javascript">
            <pre className="code-block">{code.javascript}</pre>
          </TabsContent>
          
          <TabsContent value="python">
            <pre className="code-block">{code.python}</pre>
          </TabsContent>
          
          <TabsContent value="java">
            <pre className="code-block">{code.java}</pre>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          {levelInfo.topic} • {levelInfo.difficulty}
        </div>
        <div className="flex items-center gap-1 text-puzzle-green">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium text-sm">+{levelInfo.xpReward} XP earned</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GeneratedCode;
