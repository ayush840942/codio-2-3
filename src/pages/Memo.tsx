import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Search,
    Book,
    StickyNote,
    Trash2,
    ArrowLeft,
    FolderOpen,
    Filter,
    MoreVertical,
    Edit2,
    Lock,
    Crown,
    Sparkles,
    Gift
} from 'lucide-react';
import MobileHeader from '@/components/MobileHeader';
import { DrawnButton, DrawnCard, DrawnInput } from '@/components/ui/HandDrawnComponents';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';

interface Note {
    id: string;
    title: string;
    content: string;
    category: string;
    date: string;
    color: string;
}

const NOTE_COLORS = [
    'bg-pastel-yellow',
    'bg-pastel-pink',
    'bg-pastel-mint',
    'bg-pastel-blue',
    'bg-pastel-lavender',
    'bg-pastel-cyan'
];

const NOTE_TEMPLATES = [
    { title: 'Bug Log 🐞', content: 'Issue: \nRoot Cause: \nFix Plan: ', category: 'General' },
    { title: 'Code Snippet ⚡', content: '```javascript\n\n```', category: 'JavaScript' },
    { title: 'App Idea 💡', content: 'Problem: \nSolution: \nMonetization: ', category: 'All' },
];

const CATEGORY_STICKERS: Record<string, string> = {
    'JavaScript': '⚡',
    'React': '⚛️',
    'HTML': '🌐',
    'CSS': '🎨',
    'Python': '🐍',
    'Go': '🐹',
    'Backend': '🟢',
    'Mobile': '🦋',
    'General': '📝',
    'All': '📔'
};

const Memo = () => {
    const navigate = useNavigate();
    const { hasFeature } = useSubscriptionFeatures();
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isAdding, setIsAdding] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', content: '', category: 'General' });

    useEffect(() => {
        const savedNotes = localStorage.getItem('codio_memos');
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []);

    if (!hasFeature('memos')) {
        return (
            <div className="min-h-[100dvh] bg-pastel-yellow/20 flex items-center justify-center p-6 text-center font-draw">
                <DrawnCard className="space-y-6 max-w-sm bg-white p-8 shadow-comic-lg rotate-1">
                    <div className="w-20 h-20 bg-black rounded-[2.5rem] flex items-center justify-center mx-auto text-pastel-yellow shadow-comic rotate-[-5deg]">
                        <Crown className="w-10 h-10" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Elite Access</h2>
                    <p className="text-black/40 font-bold italic text-sm">
                        Coding Memos are for the Elite! Keep your genius thoughts organized.
                    </p>
                    <DrawnButton
                        onClick={() => navigate('/subscription')}
                        className="w-full h-14 bg-black text-white text-xl shadow-comic"
                    >
                        UNLEASH ELITE
                    </DrawnButton>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-black/40 font-black uppercase text-xs tracking-widest hover:text-black transition-colors"
                    >
                        MAYBE LATER
                    </button>
                </DrawnCard>
            </div>
        );
    }

    const categories = ['All', 'HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Go', 'Backend', 'Mobile'];

    const saveNotes = (updatedNotes: Note[]) => {
        setNotes(updatedNotes);
        localStorage.setItem('codio_memos', JSON.stringify(updatedNotes));
    };

    const handleAddNote = () => {
        if (!newNote.title.trim() || !newNote.content.trim()) {
            toast.error('Gotta write something first!');
            return;
        }

        const note: Note = {
            id: Date.now().toString(),
            ...newNote,
            date: new Date().toLocaleDateString(),
            color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)]
        };

        saveNotes([note, ...notes]);
        setNewNote({ title: '', content: '', category: 'General' });
        setIsAdding(false);
        toast.success('Doodle saved!');
    };

    const deleteNote = (id: string) => {
        saveNotes(notes.filter(note => note.id !== id));
        toast.success('Note vanished!');
    };

    const applyTemplate = (template: typeof NOTE_TEMPLATES[0]) => {
        setNewNote({
            title: template.title,
            content: template.content,
            category: template.category === 'All' ? 'General' : template.category
        });
        toast.success('Template applied! 📝');
    };

    const filteredNotes = notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-[100dvh] bg-pastel-yellow/20 pb-32 font-draw overflow-x-hidden">
            {/* Header */}
            {/* Unified Mobile Header */}
            <MobileHeader
                title="My Memos"
                showBack
                rightElement={
                    <DrawnButton
                        onClick={() => setIsAdding(true)}
                        className="bg-pastel-yellow text-sm h-10 px-6 shadow-comic-sm"
                    >
                        <Plus className="w-5 h-5 mr-1" strokeWidth={3} /> NEW
                    </DrawnButton>
                }
            />

            <div className="p-6 space-y-8 max-w-4xl mx-auto" style={{ paddingTop: 'calc(var(--safe-area-top) + 4.5rem)' }}>
                {/* Search & Filter */}
                <div className="space-y-4">
                    <div className="relative">
                        <DrawnInput
                            placeholder="Find a brilliant thought..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-14 bg-white shadow-comic-sm"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-black/20" strokeWidth={3} />
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none px-1">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl border-2 font-black text-xs uppercase tracking-tight whitespace-nowrap transition-all ${selectedCategory === cat
                                    ? 'bg-black text-white border-black shadow-comic-sm'
                                    : 'bg-white text-black/40 border-black/10 hover:border-black/20'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {filteredNotes.map((note, idx) => (
                            <motion.div
                                key={note.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, rotate: idx % 2 === 0 ? -2 : 2 }}
                                animate={{ opacity: 1, scale: 1, rotate: idx % 2 === 0 ? -1 : 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ scale: 1.02, rotate: 0 }}
                                className="relative group"
                            >
                                {/* Category Sticker */}
                                <div className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center text-xl shadow-comic-sm rotate-12 group-hover:rotate-0 transition-transform">
                                    {CATEGORY_STICKERS[note.category] || '📝'}
                                </div>

                                <DrawnCard className={`${note.color} p-0 overflow-hidden shadow-comic relative h-full flex flex-col`}>
                                    <div className="p-5 flex-1">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="px-2 py-0.5 bg-black/5 border border-black/10 rounded-lg text-[10px] font-black uppercase tracking-widest italic opacity-60">
                                                {note.category}
                                            </div>
                                            <button
                                                onClick={() => deleteNote(note.id)}
                                                className="w-8 h-8 flex items-center justify-center text-black/20 hover:text-pastel-pink transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" strokeWidth={2.5} />
                                            </button>
                                        </div>
                                        <h3 className="text-xl font-black mt-2 leading-tight uppercase tracking-tight text-black">
                                            {note.title}
                                        </h3>
                                        <p className="text-black/70 font-bold mt-3 text-sm line-clamp-4 leading-relaxed whitespace-pre-wrap">
                                            {note.content}
                                        </p>
                                    </div>
                                    <div className="px-5 py-3 border-t-2 border-black/5 flex justify-between items-center bg-black/5 mt-auto">
                                        <div className="text-[10px] font-black uppercase text-black/30 tracking-widest italic">
                                            {note.date}
                                        </div>
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-black/10" />
                                            ))}
                                        </div>
                                    </div>
                                </DrawnCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredNotes.length === 0 && !isAdding && (
                    <div className="text-center py-24 px-6">
                        <motion.div
                            className="w-32 h-32 bg-white border-3 border-black rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-comic rotate-6"
                            animate={{ rotate: [6, -6, 6] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        >
                            <StickyNote className="w-16 h-16 text-black/10" strokeWidth={2} />
                        </motion.div>
                        <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Your Mind is Empty!</h3>
                        <p className="text-black/40 font-bold italic mt-2">Document your genius before it escapes...</p>
                        <DrawnButton
                            onClick={() => setIsAdding(true)}
                            className="mt-8 bg-pastel-yellow shadow-comic px-8"
                        >
                            START WRITING
                        </DrawnButton>
                    </div>
                )}
            </div>

            {/* Add Note Modal - Comic Style */}
            <AnimatePresence>
                {isAdding && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAdding(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, y: 50, rotate: 5 }}
                            animate={{ scale: 1, y: 0, rotate: 0 }}
                            exit={{ scale: 0.9, y: 50, rotate: -5 }}
                            className="bg-white w-full max-w-lg rounded-[2.5rem] border-4 border-black shadow-comic-lg relative z-10 overflow-hidden"
                        >
                            <div className="p-8 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-pastel-blue border-3 border-black rounded-2xl flex items-center justify-center shadow-comic-sm rotate-[-5deg]">
                                        <Edit2 className="w-6 h-6 text-black" strokeWidth={3} />
                                    </div>
                                    <h2 className="text-3xl font-black tracking-tighter uppercase">Quick Note</h2>
                                </div>

                                {/* Templates Selector */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-black/30 uppercase tracking-widest ml-1 italic">Quick Start</label>
                                    <div className="flex gap-2">
                                        {NOTE_TEMPLATES.map(t => (
                                            <button
                                                key={t.title}
                                                onClick={() => applyTemplate(t)}
                                                className="flex-1 py-2 bg-black/5 border-2 border-black/10 rounded-xl text-[10px] font-black uppercase hover:bg-pastel-yellow/20 hover:border-black/20 transition-all"
                                            >
                                                {t.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black/30 uppercase tracking-widest ml-1 italic">What's the topic?</label>
                                        <DrawnInput
                                            value={newNote.title}
                                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                            placeholder="A super clever title..."
                                            className="bg-white h-14 text-lg"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black/30 uppercase tracking-widest ml-1 italic">Category</label>
                                        <div className="relative">
                                            <select
                                                value={newNote.category}
                                                onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                                                className="w-full h-14 rounded-2xl border-3 border-black bg-white px-5 font-black text-lg focus:outline-none focus:bg-pastel-yellow/10 transition-all appearance-none uppercase tracking-tight"
                                            >
                                                {categories.filter(c => c !== 'All').map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <Filter className="w-5 h-5 opacity-30" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black/30 uppercase tracking-widest ml-1 italic">Pour your brain out...</label>
                                        <textarea
                                            value={newNote.content}
                                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                            placeholder="Explain it like I'm five..."
                                            className="w-full h-44 rounded-2xl border-3 border-black p-5 font-bold text-lg focus:outline-none focus:bg-pastel-yellow/10 transition-all resize-none shadow-inner"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-2">
                                    <button
                                        onClick={() => setIsAdding(false)}
                                        className="flex-1 h-14 rounded-2xl border-3 border-black font-black text-lg uppercase tracking-tight hover:bg-black/5 transition-colors"
                                    >
                                        ABORT
                                    </button>
                                    <DrawnButton
                                        onClick={handleAddNote}
                                        className="flex-1 h-14 bg-pastel-yellow text-xl shadow-comic-sm"
                                    >
                                        SAVE IT!
                                    </DrawnButton>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Memo;
