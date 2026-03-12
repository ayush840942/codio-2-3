import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Sparkles, Lightbulb, GripVertical, AlertCircle } from 'lucide-react';
import { DrawnButton, DrawnCard } from '@/components/ui/HandDrawnComponents';
import { LearningPage } from '@/data/learning/types';
import { cn } from '@/lib/utils';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface InteractiveLearningSlideProps {
    page: LearningPage;
    onComplete: (isCorrect: boolean) => void;
}

const InteractiveLearningSlide: React.FC<InteractiveLearningSlideProps> = ({ page, onComplete }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedBugIndex, setSelectedBugIndex] = useState<number | null>(null);
    const [shuffledLines, setShuffledLines] = useState<{ id: string; text: string }[]>([]);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const exercise = page.exercise;

    // Reset state when page changes
    useEffect(() => {
        setSelectedOption(null);
        setSelectedBugIndex(null);
        setIsCorrect(null);
        setShowFeedback(false);

        if (page.interactionType === 'drag-to-order' && exercise?.codeLines) {
            // Shuffle lines initially
            const lines = exercise.codeLines.map((line, idx) => ({ id: `line-${idx}`, text: line }));
            setShuffledLines([...lines].sort(() => Math.random() - 0.5));
        }
    }, [page]);

    if (!exercise) return null;

    const handleCheck = () => {
        let correct = false;

        if (page.interactionType === 'multiple-choice') {
            correct = selectedOption === exercise.correctAnswer;
        } else if (page.interactionType === 'spot-the-bug') {
            correct = selectedBugIndex === exercise.buggyLineIndex;
        } else if (page.interactionType === 'drag-to-order') {
            const currentOrder = shuffledLines.map(l => l.text);
            correct = JSON.stringify(currentOrder) === JSON.stringify(exercise.codeLines);
        }

        setIsCorrect(correct);
        setShowFeedback(true);
        onComplete(correct);
    };

    const handleReset = () => {
        setSelectedOption(null);
        setSelectedBugIndex(null);
        setIsCorrect(null);
        setShowFeedback(false);
        if (page.interactionType === 'drag-to-order' && exercise?.codeLines) {
            setShuffledLines([...shuffledLines].sort(() => Math.random() - 0.5));
        }
    };

    return (
        <div className="space-y-6 font-draw">
            <DrawnCard className="bg-white p-6 border-3 border-black shadow-comic">
                <div className="flex items-start gap-3 mb-6">
                    <div className="p-2 bg-pastel-yellow border-2 border-black rounded-lg">
                        <Lightbulb className="h-5 w-5 text-black" strokeWidth={3} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-black leading-tight uppercase">
                            {page.interactionType === 'spot-the-bug' ? 'Find the Bug!' :
                                page.interactionType === 'drag-to-order' ? 'Fix the Order!' :
                                    `Quiz: ${exercise.question}`}
                        </h3>
                        {page.interactionType === 'spot-the-bug' && (
                            <p className="text-xs font-bold text-black/40 uppercase italic">Click the line with the error</p>
                        )}
                    </div>
                </div>

                {/* Multiple Choice */}
                {page.interactionType === 'multiple-choice' && exercise.options && (
                    <div className="grid grid-cols-1 gap-3">
                        {exercise.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => !showFeedback && setSelectedOption(option)}
                                className={cn(
                                    "w-full p-4 text-left font-bold text-lg border-3 border-black rounded-2xl transition-all shadow-comic-sm",
                                    selectedOption === option ? "bg-cc-yellow translate-x-1" : "bg-white",
                                    showFeedback && option === exercise.correctAnswer && "bg-cc-green border-green-600",
                                    showFeedback && selectedOption === option && !isCorrect && "bg-cc-pink border-red-600 animate-shake"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {showFeedback && option === exercise.correctAnswer && <Check className="h-6 w-6" strokeWidth={4} />}
                                    {showFeedback && selectedOption === option && !isCorrect && <X className="h-6 w-6" strokeWidth={4} />}
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Spot the Bug */}
                {page.interactionType === 'spot-the-bug' && exercise.codeLines && (
                    <div className="bg-slate-900 p-4 rounded-2xl border-3 border-black overflow-hidden">
                        <div className="space-y-1">
                            {exercise.codeLines.map((line, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => !showFeedback && setSelectedBugIndex(idx)}
                                    className={cn(
                                        "w-full text-left p-2 font-mono text-sm rounded-lg transition-all group relative",
                                        selectedBugIndex === idx ? "bg-pastel-yellow/20" : "hover:bg-white/5",
                                        showFeedback && idx === exercise.buggyLineIndex && "bg-cc-green border-2 border-green-500",
                                        showFeedback && selectedBugIndex === idx && !isCorrect && "bg-cc-pink border-2 border-red-500"
                                    )}
                                >
                                    <span className="inline-block w-6 text-slate-500 mr-2 border-r border-slate-700">{idx + 1}</span>
                                    <span className={cn(
                                        "text-slate-300",
                                        selectedBugIndex === idx && "text-pastel-yellow font-bold",
                                        showFeedback && idx === exercise.buggyLineIndex && "text-black",
                                        showFeedback && selectedBugIndex === idx && !isCorrect && "text-black"
                                    )}>{line}</span>
                                    {selectedBugIndex === idx && !showFeedback && (
                                        <AlertCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-pastel-yellow animate-pulse" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Drag to Order */}
                {page.interactionType === 'drag-to-order' && (
                    <DndContext
                        sensors={useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))}
                        collisionDetection={closestCenter}
                        onDragEnd={(event: DragEndEvent) => {
                            const { active, over } = event;
                            if (over && active.id !== over.id) {
                                setShuffledLines((items) => {
                                    const oldIndex = items.findIndex((i) => i.id === active.id);
                                    const newIndex = items.findIndex((i) => i.id === over.id);
                                    return arrayMove(items, oldIndex, newIndex);
                                });
                            }
                        }}
                    >
                        <SortableContext items={shuffledLines.map(l => l.id)} strategy={verticalListSortingStrategy}>
                            <div className="space-y-2">
                                {shuffledLines.map((line, index) => (
                                    <SortableItem key={line.id} id={line.id} text={line.text} index={index} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </DrawnCard>

            <AnimatePresence mode="wait">
                {!showFeedback && (selectedOption !== null || selectedBugIndex !== null || page.interactionType === 'drag-to-order') && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex justify-center"
                    >
                        <DrawnButton
                            onClick={handleCheck}
                            className="px-12 py-4 bg-pastel-blue text-xl shadow-comic-lg hover:-translate-y-1 active:translate-y-0"
                        >
                            VERIFY!
                        </DrawnButton>
                    </motion.div>
                )}

                {showFeedback && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        className={cn(
                            "p-6 rounded-3xl border-4 border-black shadow-comic-lg text-center font-black",
                            isCorrect ? "bg-cc-green" : "bg-cc-pink"
                        )}
                    >
                        {isCorrect ? (
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-8 w-8 text-black animate-pulse" />
                                    <p className="text-2xl text-black">PERFECT! YOU GOT IT!</p>
                                    <Sparkles className="h-8 w-8 text-black animate-pulse" />
                                </div>
                                {exercise.explanation && <p className="text-sm font-bold opacity-70 mt-2">{exercise.explanation}</p>}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-2xl text-black">NOT QUITE RIGHT...</p>
                                <p className="text-sm font-bold opacity-70 mb-2 italic">Don't give up! Try one more time.</p>
                                <DrawnButton onClick={handleReset} className="bg-white border-2 border-black text-black">TRY AGAIN</DrawnButton>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Sortable Item Component
const SortableItem = ({ id, text, index }: { id: string, text: string, index: number }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                "p-4 bg-white border-3 border-black rounded-2xl flex items-center gap-4 shadow-comic-sm cursor-grab active:cursor-grabbing",
                isDragging && "z-50 opacity-50 shadow-comic-lg rotate-2"
            )}
        >
            <GripVertical className="w-5 h-5 text-black/20" />
            <div className="flex-1 font-mono text-sm bg-slate-50 p-2 rounded-lg border border-black/5">
                {text}
            </div>
            <span className="text-[10px] font-black opacity-20">{index + 1}</span>
        </div>
    );
};

export default InteractiveLearningSlide;
