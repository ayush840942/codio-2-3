import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { portfolioProjects } from '@/data/portfolioProjects';
import MobileWorkspace from '@/components/workspace/MobileWorkspace';
import { DrawnCard, DrawnButton } from '@/components/ui/HandDrawnComponents';
import { Trophy, Share2, CornerUpLeft, Loader2, Sparkles, Star, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleConfetti from '@/components/ui/SimpleConfetti';
import { useWindowSize } from '@/hooks/useWindowSize';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { haptics } from '@/utils/haptics';
import { ImpactStyle, NotificationType } from '@capacitor/haptics';

const ProjectPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { width, height } = useWindowSize();

    const project = portfolioProjects.find(p => p.id === id);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const currentStep = project?.steps[currentStepIndex];
    const [isCompleted, setIsCompleted] = useState(false);
    const [aiReview, setAiReview] = useState<{ rank: string; feedback: string } | null>(null);
    const [isReviewing, setIsReviewing] = useState(false);

    if (!project) return <div>Project not found</div>;

    const handleStepSuccess = async () => {
        haptics.impact(ImpactStyle.Medium);
        if (currentStepIndex < project.steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            haptics.notification(NotificationType.Success);
            setIsCompleted(true);
            triggerAIReview();
        }
    };

    const triggerAIReview = async () => {
        setIsReviewing(true);
        try {
            const { data, error } = await supabase.functions.invoke('codio-chat', {
                body: {
                    message: "Explain my performance in this project. Give me a RANK (S, A, or B) and 2 sentences of feedback. Code: " + JSON.stringify(project.steps),
                    conversationHistory: []
                }
            });

            if (error) throw error;

            // Extract rank from AI response (e.g., "RANK: S")
            const response = data.response;
            const rankMatch = response.match(/RANK:\s*([SAB])/i);
            const rank = rankMatch ? rankMatch[1].toUpperCase() : 'A';
            const feedback = response.replace(/RANK:\s*[SAB]/i, '').trim().slice(0, 140);

            setAiReview({ rank, feedback });
            haptics.impact(ImpactStyle.Light);
            toast.success(`AI Review Complete: Rank ${rank}!`);
        } catch (err) {
            console.error('AI Review Error:', err);
            setAiReview({ rank: 'A', feedback: 'Great job completing all the technical steps for this project!' });
        } finally {
            setIsReviewing(false);
        }
    };

    if (isCompleted) {
        return (
            <div className="min-h-[100dvh] bg-cc-green font-draw flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                <SimpleConfetti width={width} height={height} recycle={false} numberOfPieces={500} />

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="relative z-10 w-full max-w-sm"
                >
                    <DrawnCard className="bg-white border-4 p-8 flex flex-col items-center relative shadow-comic-lg">
                        <div className="absolute -top-8 bg-cc-yellow border-4 border-black w-16 h-16 rounded-full flex items-center justify-center shadow-comic">
                            <Trophy className="w-8 h-8 text-black fill-black" />
                        </div>

                        <h1 className="text-4xl font-black uppercase mt-6 mb-2 tracking-tighter leading-none">
                            Project <br />Deployed!
                        </h1>

                        <p className="text-black/60 font-bold mb-6">
                            You just built the <span className="text-black font-black uppercase">{project.title}</span>!
                        </p>

                        {/* AI Review Card */}
                        <div className="w-full mb-8">
                            <AnimatePresence mode="wait">
                                {isReviewing ? (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-black/5 border-3 border-black border-dashed rounded-3xl p-6 flex flex-col items-center gap-3"
                                    >
                                        <Loader2 className="w-8 h-8 animate-spin text-cc-blue" />
                                        <p className="text-[10px] font-black uppercase tracking-widest italic opacity-40">AI is reviewing your code...</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="result"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="bg-cc-blue text-white rounded-[2.5rem] p-6 border-4 border-black shadow-comic relative overflow-hidden rotate-1"
                                    >
                                        <div className="relative z-10 flex items-center gap-5">
                                            <div className="w-16 h-16 bg-white rounded-2xl border-4 border-black flex flex-col items-center justify-center text-black shrink-0 -rotate-6 shadow-comic-sm">
                                                <span className="text-[9px] font-black uppercase tracking-tight">RANK</span>
                                                <span className="text-3xl font-black leading-none">{aiReview?.rank || 'A'}</span>
                                            </div>
                                            <div className="text-left">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <Sparkles className="w-4 h-4 text-cc-yellow fill-cc-yellow" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest italic text-cc-yellow">AI FEEDBACK</span>
                                                </div>
                                                <p className="text-[11px] font-bold leading-relaxed line-clamp-3 italic opacity-90">
                                                    "{aiReview?.feedback}"
                                                </p>
                                            </div>
                                        </div>
                                        <Star className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 -rotate-12" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="w-full space-y-3">
                            <DrawnButton
                                variant="cc-blue"
                                className="w-full text-xl h-14 shadow-comic"
                                onClick={() => navigate('/public-profile-preview')}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Globe className="w-5 h-5" /> SHOWCASE ON PROFILE
                                </div>
                            </DrawnButton>

                            <DrawnButton
                                variant="outlined"
                                className="w-full text-xl h-14"
                                onClick={() => navigate('/portfolio')}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <CornerUpLeft className="w-5 h-5" /> BACK TO PROJECTS
                                </div>
                            </DrawnButton>
                        </div>
                    </DrawnCard>
                </motion.div>
            </div>
        );
    }

    return (
        <MobileWorkspace
            key={currentStep.id}
            title={`Step ${currentStepIndex + 1}: ${currentStep.title}`}
            instruction={currentStep.instruction}
            initialHtml={currentStep.initialCode.html}
            initialCss={currentStep.initialCode.css}
            initialJs={currentStep.initialCode.js}
            expectedSnippet={currentStep.expectedOutputSnippet}
            onSuccess={handleStepSuccess}
        />
    );
};

export default ProjectPlayer;
