import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ChevronRight, Clock, Check, Star, Zap } from 'lucide-react';
import { DrawnCard } from '@/components/ui/HandDrawnComponents';
import { BuildProject } from '@/data/projectBuilderData';
import { usePremiumGate } from '@/hooks/usePremiumGate';

interface ProjectCardProps {
    project: BuildProject;
    index: number;
    onSelect: (p: BuildProject) => void;
    completedSteps?: number;
}

const difficultyConfig = {
    beginner: { label: 'Beginner', star: 1 },
    intermediate: { label: 'Intermediate', star: 2 },
    advanced: { label: 'Advanced', star: 3 },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onSelect, completedSteps = 0 }) => {
    const { isSubscribed } = usePremiumGate();
    const isLocked = project.isPremium && !isSubscribed;
    const progress = Math.round((completedSteps / project.steps.length) * 100);
    const isCompleted = completedSteps >= project.steps.length;
    const dc = difficultyConfig[project.difficulty];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.07 }}
        >
            <DrawnCard
                className={`p-0 overflow-hidden cursor-pointer hover:shadow-comic transition-all active:scale-[0.98] border-4 border-black ${isLocked ? 'opacity-75' : ''}`}
                style={{ transform: `rotate(${index % 2 === 0 ? '0.5deg' : '-0.5deg'})` }}
                onClick={() => onSelect(project)}
            >
                {/* Coloured header */}
                <div className={`${project.color} border-b-4 border-black p-4 relative`}>
                    {/* Lock badge */}
                    {isLocked && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-xl">
                            <Lock className="h-3 w-3" strokeWidth={3} />
                            PRO
                        </div>
                    )}
                    {/* Completed badge */}
                    {isCompleted && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-pastel-mint border-2 border-black rounded-xl flex items-center justify-center">
                            <Check className="h-4 w-4 text-black" strokeWidth={3} />
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        <div className={`text-4xl border-2 border-black/20 rounded-2xl w-14 h-14 flex items-center justify-center bg-white/30`}>
                            {project.emoji}
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-black uppercase leading-tight">{project.title}</h4>
                            <div className="flex items-center gap-1 mt-0.5">
                                {Array.from({ length: dc.star }).map((_, i) => (
                                    <Star key={i} className="h-3 w-3 text-black fill-black" />
                                ))}
                                <span className="text-[9px] font-black text-black/60 uppercase ml-1">{dc.label}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 bg-white">
                    <p className="text-xs font-bold text-black/60 mb-3 leading-relaxed">{project.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-[9px] font-black uppercase bg-black/5 border border-black/10 px-2 py-0.5 rounded-lg text-black/50">{tag}</span>
                        ))}
                    </div>

                    {/* Progress bar */}
                    {completedSteps > 0 && (
                        <div className="mb-3">
                            <div className="flex justify-between mb-1">
                                <span className="text-[9px] font-black text-black/40 uppercase">Progress</span>
                                <span className="text-[9px] font-black text-black uppercase">{progress}%</span>
                            </div>
                            <div className="h-2 bg-black/5 border border-black/10 rounded-full overflow-hidden">
                                <div className="h-full bg-pastel-mint transition-all" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[9px] font-black text-black/30 uppercase">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{project.estimatedTime}</span>
                            <span className="flex items-center gap-1"><Zap className="h-3 w-3" />{project.steps.length} Steps</span>
                        </div>
                        <div className="flex items-center gap-1 bg-black text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-xl">
                            {isCompleted ? 'Review' : isLocked ? 'Unlock' : completedSteps > 0 ? 'Continue' : 'Start'}
                            <ChevronRight className="h-3.5 w-3.5 ml-0.5" strokeWidth={3} />
                        </div>
                    </div>
                </div>
            </DrawnCard>
        </motion.div>
    );
};

export default ProjectCard;
