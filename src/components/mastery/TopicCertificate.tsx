import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { DrawnCard, DrawnButton } from '@/components/ui/HandDrawnComponents';
import { Award, Download, Share2, Star, CheckCircle2 } from 'lucide-react';
import ComicMascot from '@/components/ui/ComicMascot';
import { toast } from 'sonner';

interface TopicCertificateProps {
    userName: string;
    topic: string;
    date: string;
    onClose: () => void;
}

const TopicCertificate: React.FC<TopicCertificateProps> = ({
    userName,
    topic,
    date,
    onClose
}) => {
    const certificateRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!certificateRef.current) return;

        try {
            const dataUrl = await toPng(certificateRef.current, { cacheBust: true });
            const link = document.createElement('a');
            link.download = `Codio-Certificate-${topic}.png`;
            link.href = dataUrl;
            link.click();
            toast.success("Certificate downloaded! Share it with the world! 🚀");
        } catch (err) {
            console.error('Failed to generate certificate:', err);
            toast.error("Failed to generate certificate image.");
        }
    };

    const handleShare = async () => {
        if (!certificateRef.current) return;

        try {
            const dataUrl = await toPng(certificateRef.current, { cacheBust: true });
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], `certificate-${topic}.png`, { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: `I mastered ${topic} on Codio!`,
                    text: `Check out my new certification for ${topic}. I'm leveling up my coding skills!`,
                });
            } else {
                handleDownload();
            }
        } catch (err) {
            console.error('Sharing failed:', err);
            handleDownload();
        }
    };

    const handleSaveToMemo = () => {
        const savedNotes = localStorage.getItem('codio_memos');
        const notes = savedNotes ? JSON.parse(savedNotes) : [];

        const COLORS = [
            'bg-pastel-yellow',
            'bg-pastel-pink',
            'bg-pastel-mint',
            'bg-pastel-blue',
            'bg-pastel-lavender',
            'bg-pastel-cyan'
        ];

        const newNote = {
            id: Date.now().toString(),
            title: `Mastered ${topic}! 🏆`,
            content: `Achievement Unlocked: Finished the ${topic} Mastery Path on ${date}.\n\nTime to put these skills to use in the Labs!`,
            category: topic === 'JavaScript' || topic === 'React' || topic === 'HTML' || topic === 'CSS' ? topic : 'General',
            date: date,
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
        };

        localStorage.setItem('codio_memos', JSON.stringify([newNote, ...notes]));
        toast.success("Achievement saved to Memos! 📔");
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto pt-20">
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="w-full max-w-2xl"
            >
                <div className="flex justify-end mb-2">
                    <button onClick={onClose} className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* The Actual Certificate to Capture */}
                <div ref={certificateRef} className="bg-white p-1 shadow-2xl rounded-sm">
                    <div className="border-[12px] border-double border-black p-8 relative overflow-hidden bg-white">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-pastel-yellow/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pastel-blue/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                            <div className="flex items-center gap-4 mb-2">
                                <Award className="w-12 h-12 text-black" strokeWidth={2.5} />
                                <div className="h-px w-20 bg-black/20" />
                                <Star className="w-6 h-6 text-cc-yellow fill-cc-yellow" />
                                <div className="h-px w-20 bg-black/20" />
                                <Award className="w-12 h-12 text-black scale-x-[-1]" strokeWidth={2.5} />
                            </div>

                            <h1 className="text-sm font-black tracking-[0.3em] uppercase text-black/40">Certificate of Achievement</h1>

                            <div className="space-y-4 py-4 w-full">
                                <p className="text-xl font-bold italic text-black/60">This is to certify that</p>
                                <h2 className="text-5xl font-black text-black tracking-tight border-b-4 border-black inline-block px-8 py-2 rotate-[-1deg]">
                                    {userName}
                                </h2>
                            </div>

                            <p className="max-w-md text-lg font-bold text-black/80 leading-relaxed">
                                has successfully completed all missions and demonstrated exceptional mastery in the field of:
                            </p>

                            <div className="bg-black text-white px-8 py-4 rounded-2xl transform rotate-1 shadow-xl">
                                <h3 className="text-4xl font-black tracking-tighter uppercase">{topic} DEVELOPMENT</h3>
                            </div>

                            <div className="w-full pt-10 flex justify-between items-end border-t-2 border-black/5">
                                <div className="text-left">
                                    <div className="text-xs font-black uppercase text-black/30 mb-1">DATE OF COMPLETION</div>
                                    <div className="font-black text-black text-lg">{date}</div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <ComicMascot pose="welcome" size="md" className="mb-[-10px]" />
                                    <div className="w-32 h-px bg-black mb-1" />
                                    <div className="text-[10px] font-black uppercase text-black/40 italic">Codio's Official Seal</div>
                                </div>
                            </div>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-4 left-4 border-l-4 border-t-4 border-black w-8 h-8" />
                        <div className="absolute top-4 right-4 border-r-4 border-t-4 border-black w-8 h-8" />
                        <div className="absolute bottom-4 left-4 border-l-4 border-b-4 border-black w-8 h-8" />
                        <div className="absolute bottom-4 right-4 border-r-4 border-b-4 border-black w-8 h-8" />
                    </div>
                </div>

                {/* Actions Bottom Bar */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <DrawnButton onClick={handleDownload} className="flex-1 h-14 bg-pastel-yellow text-lg">
                        <Download className="w-5 h-5 mr-2" /> DOWNLOAD
                    </DrawnButton>
                    <DrawnButton onClick={handleSaveToMemo} className="flex-1 h-14 bg-pastel-cyan text-lg">
                        <Star className="w-5 h-5 mr-2" /> SAVE TO MEMOS
                    </DrawnButton>
                    <DrawnButton onClick={handleShare} className="flex-1 h-14 bg-pastel-mint text-lg">
                        <Share2 className="w-5 h-5 mr-2" /> SHARE
                    </DrawnButton>
                </div>
            </motion.div>
        </div>
    );
};

export default TopicCertificate;
