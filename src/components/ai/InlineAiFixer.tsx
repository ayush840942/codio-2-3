import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, AlertCircle, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { toast } from 'sonner';

import { supabase } from '@/integrations/supabase/client';

export interface AiFixRecommendation {
    originalCode: string;
    fixedCode: string;
    explanation: string;
    lineIndex?: number; // 0-indexed line where the error occurred
}

interface InlineAiFixerProps {
    error: string | null;
    currentCode: string;
    onApplyFix: (fixedCode: string) => void;
    onClose?: () => void;
    isVisible: boolean;
    // In a real app, this would be an async API call to OpenAI/Claude
    // For the demo, we generate a mock fix based on common errors
    generateMockFix?: boolean;
}

const InlineAiFixer: React.FC<InlineAiFixerProps> = ({
    error,
    currentCode,
    onApplyFix,
    onClose,
    isVisible,
    generateMockFix = true
}) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [recommendation, setRecommendation] = useState<AiFixRecommendation | null>(null);
    const { playSuccess, playLevelComplete } = useSoundEffects();

    // Reset state when error changes or visibility changes
    React.useEffect(() => {
        if (isVisible && error) {
            setRecommendation(null);

            // Auto-analyze when an error pops up
            if (generateMockFix) {
                handleAnalyzeError();
            }
        } else if (!isVisible) {
            setRecommendation(null);
            setIsAnalyzing(false);
        }
    }, [error, isVisible, currentCode]);

    const handleAnalyzeError = async () => {
        if (!error) return;

        setIsAnalyzing(true);

        try {
            const prompt = `I have a coding error: "${error}". 
            
My current code is:
\`\`\`
${currentCode}
\`\`\`

Please provide a fix. Return your response ONLY as a valid JSON object with exactly two fields: 
1. "explanation": a brief, friendly explanation of what was wrong and how you fixed it.
2. "fixedCode": the complete corrected code.

Do not include any other text, markdown formatting (no \`\`\`json blocks), or commentary outside the JSON object.`;

            const { data, error: functionError } = await supabase.functions.invoke('codio-chat', {
                body: {
                    message: prompt,
                    conversationHistory: []
                }
            });

            if (functionError) throw functionError;

            // The edge function returns { response: "..." }
            // We expect the response to be a JSON string
            const aiRawResponse = data?.response || "";

            try {
                // Clean up in case AI included markdown backticks
                const cleanedResponse = aiRawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
                const parsedResult = JSON.parse(cleanedResponse);

                if (parsedResult.fixedCode && parsedResult.explanation) {
                    setRecommendation({
                        originalCode: currentCode,
                        fixedCode: parsedResult.fixedCode,
                        explanation: parsedResult.explanation,
                        lineIndex: 0 // Default
                    });
                    playSuccess();
                } else {
                    throw new Error("Invalid AI response format");
                }
            } catch (parseError) {
                console.error('Failed to parse AI fix:', parseError, aiRawResponse);
                toast.error("AI generated a fix but I couldn't understand it. Try again!");
            }
        } catch (err) {
            console.error('AI Fix Error:', err);
            toast.error("I'm having trouble reaching the AI brain. Check your connection!");
        } finally {
            setIsAnalyzing(false);
        }
    };


    const handleApply = () => {
        if (recommendation) {
            onApplyFix(recommendation.fixedCode);
            playLevelComplete();
            toast.success("AI fix applied successfully! ✨");
            if (onClose) onClose();
        }
    };

    if (!isVisible || !error) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="w-full bg-slate-900 border border-indigo-500/30 rounded-xl overflow-hidden shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-900/80 to-slate-900 p-3 sm:px-4 flex items-center justify-between border-b border-indigo-500/20">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-500/20 p-1.5 rounded-lg border border-indigo-500/30">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                        </div>
                        <h3 className="text-sm font-semibold text-indigo-100 flex items-center gap-2">
                            AI Pair Programmer
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">PRO</span>
                        </h3>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-white transition-colors p-1"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 flex flex-col gap-3">

                    {/* Error Display */}
                    <div className="flex items-start gap-2 text-red-400 text-xs sm:text-sm bg-red-950/30 p-2 sm:p-3 rounded-lg border border-red-900/50 font-mono">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div className="break-all whitespace-pre-wrap line-clamp-3">
                            {error}
                        </div>
                    </div>

                    {isAnalyzing ? (
                        <div className="flex items-center justify-center py-4 gap-3 text-indigo-300 text-sm">
                            <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                            Analyzing the issue...
                        </div>
                    ) : recommendation ? (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="flex flex-col gap-3"
                        >
                            {/* AI Explanation */}
                            <div className="flex items-start gap-2 text-indigo-200 text-sm bg-indigo-950/20 p-3 rounded-lg border border-indigo-500/10">
                                <Bot className="w-4 h-4 mt-0.5 text-indigo-400 flex-shrink-0" />
                                <p className="leading-relaxed">{recommendation.explanation}</p>
                            </div>

                            {/* Fix Action */}
                            <Button
                                onClick={handleApply}
                                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-900/50 border border-indigo-400/20 gap-2 h-10 sm:h-12 text-sm sm:text-base"
                            >
                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                1-Tap Apply Fix
                                <ChevronRight className="w-4 h-4 bg-white/20 rounded-full ml-auto" />
                            </Button>
                        </motion.div>
                    ) : (
                        <Button
                            onClick={handleAnalyzeError}
                            variant="outline"
                            className="w-full border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Ask AI to fix this
                        </Button>
                    )}

                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default InlineAiFixer;
