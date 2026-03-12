import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PuzzleLevel } from '@/context/GameContext';
import EpicLevelNode from './EpicLevelNode';
import { Trophy, BookOpen, Flag } from 'lucide-react';
import { DrawnCard } from '@/components/ui/HandDrawnComponents';
import ComicMascot from '@/components/ui/ComicMascot';

interface EpicPathMapProps {
    levels: PuzzleLevel[];
    canAccessLevel: (levelId: number) => boolean;
    onPlayLevel: (levelId: number) => void;
}

const LEVEL_VERTICAL_SPACING = 180;
const PATH_WIDTH_PERCENT = 40; // Max amplitude from center

const EpicPathMap: React.FC<EpicPathMapProps> = ({
    levels,
    canAccessLevel,
    onPlayLevel
}) => {
    const sortedLevels = [...levels].sort((a, b) => a.id - b.id);
    const completedCount = sortedLevels.filter(l => l.isCompleted).length;

    // Calculate node positions along a winding path
    const nodes = useMemo(() => {
        return sortedLevels.map((level, i) => {
            // Sine wave logic for organic winding
            const phase = i * 0.8;
            const x = 50 + Math.sin(phase) * PATH_WIDTH_PERCENT;
            const y = (i + 1) * LEVEL_VERTICAL_SPACING;

            return {
                ...level,
                x,
                y,
                index: i
            };
        });
    }, [sortedLevels]);

    const totalHeight = (nodes.length + 1) * LEVEL_VERTICAL_SPACING + 200;

    // Generate SVG path data
    const pathData = useMemo(() => {
        if (nodes.length === 0) return '';

        // Start at top center
        let d = `M 50 ${LEVEL_VERTICAL_SPACING / 2}`;

        nodes.forEach((node, i) => {
            const nextNode = nodes[i + 1];
            if (nextNode) {
                // Cubic Bezier for smooth curves between nodes
                const cp1y = node.y + LEVEL_VERTICAL_SPACING / 2;
                const cp2y = nextNode.y - LEVEL_VERTICAL_SPACING / 2;
                d += ` C ${node.x} ${cp1y}, ${nextNode.x} ${cp2y}, ${nextNode.x} ${nextNode.y}`;
            }
        });

        return d;
    }, [nodes]);

    const progressPercent = nodes.length > 0 ? Math.round((completedCount / nodes.length) * 100) : 0;

    return (
        <div className="w-full min-h-[100dvh] bg-[#FDFBF7] font-draw overflow-x-hidden relative">
            {/* Sticky Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b-4 border-black px-4 py-4 md:py-6 shadow-comic-sm">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-cc-yellow border-3 border-black rounded-xl flex items-center justify-center shadow-comic-sm -rotate-3">
                            <BookOpen className="w-6 h-6 text-black" strokeWidth={3} />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-black text-black uppercase tracking-tighter">The Epic Path</h1>
                            <div className="flex items-center gap-2">
                                <div className="w-32 h-3 bg-black/10 border-2 border-black rounded-full overflow-hidden">
                                    <div className="h-full bg-cc-green" style={{ width: `${progressPercent}%` }} />
                                </div>
                                <span className="text-[10px] font-black uppercase">{progressPercent}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-cc-pink border-3 border-black px-4 py-2 rounded-2xl shadow-comic-sm rotate-3">
                        <Trophy className="w-6 h-6 text-black" strokeWidth={3} />
                        <span className="font-black text-black">{completedCount}</span>
                    </div>
                </div>
            </div>

            {/* The Path Container */}
            <div
                className="relative max-w-2xl mx-auto mt-32 pb-40"
                style={{ height: `${totalHeight}px` }}
            >
                {/* SVG Path Background */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    {/* Ghost Path (Shadow) */}
                    <path
                        d={pathData}
                        fill="none"
                        stroke="rgba(0,0,0,0.1)"
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="translate(4, 6)"
                        className="path-shadow"
                    />
                    {/* Main Path */}
                    <path
                        d={pathData}
                        fill="none"
                        stroke="black"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Inner Path (Colored) */}
                    <path
                        d={pathData}
                        fill="none"
                        stroke="#FFF"
                        strokeWidth="6"
                        strokeDasharray="10, 15"
                        strokeLinecap="round"
                        className="animate-dash"
                    />
                </svg>

                {/* Nodes */}
                {nodes.map((node, i) => {
                    const isFirstLevel = node.id === 1;
                    const previousLevel = sortedLevels.find(l => l.id === node.id - 1);
                    const isUnlocked = isFirstLevel || (previousLevel && previousLevel.isCompleted);

                    return (
                        <EpicLevelNode
                            key={node.id}
                            level={node}
                            isUnlocked={isUnlocked && canAccessLevel(node.id)}
                            canAccess={canAccessLevel(node.id)}
                            onPlay={onPlayLevel}
                            index={i}
                            position={{ x: node.x, y: node.y }}
                        />
                    );
                })}

                {/* Start Flag */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-16 h-16 bg-cc-green border-4 border-black rounded-3xl flex items-center justify-center rotate-[-12deg] shadow-comic">
                        <Flag className="w-8 h-8 text-black" strokeWidth={3} />
                    </div>
                </div>

                {/* Bottom Mascot Encouragement */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full px-6">
                    <DrawnCard className="bg-white p-6 border-4 border-black shadow-comic text-center">
                        <ComicMascot pose="welcome" size="lg" className="mx-auto mb-4" />
                        <h3 className="text-2xl font-black uppercase">Adventure Awaits!</h3>
                        <p className="font-bold text-black/60 italic">"The further you go, the more powerful your code becomes!"</p>
                    </DrawnCard>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes dash {
                    to {
                        stroke-dashoffset: -100;
                    }
                }
                .animate-dash {
                    animation: dash 10s linear infinite;
                }
            `}} />
        </div>
    );
};

export default EpicPathMap;
