
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

type Explanation = {
  title: string;
  content: string;
  code: string;
};

interface CodeExplanationProps {
  explanations: Explanation[];
  onNextLevel: () => void;
}

const CodeExplanation: React.FC<CodeExplanationProps> = ({ explanations, onNextLevel }) => {
  return (
    <div>
      <Card className="shadow-lg border-puzzle-blue/10 border">
        <CardHeader>
          <CardTitle>Code Explanation</CardTitle>
          <CardDescription>
            Learn more about this coding concept
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {explanations.map((explanation, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="bg-puzzle-purple/10 px-4 py-2 border-b">
                  <h3 className="font-medium">{explanation.title}</h3>
                </div>
                <div className="p-4">
                  <p className="text-sm mb-3">{explanation.content}</p>
                  <pre className="code-block text-xs">{explanation.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4">
        <Button 
          className="w-full bg-puzzle-purple hover:bg-puzzle-purple/90"
          onClick={onNextLevel}
        >
          Continue to Next Level
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CodeExplanation;
