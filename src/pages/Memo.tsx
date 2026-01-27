
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
    Edit2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Note {
    id: string;
    title: string;
    content: string;
    category: string;
    date: string;
}

const Memo = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isAdding, setIsAdding] = useState(false);

    // New note state
    const [newNote, setNewNote] = useState({ title: '', content: '', category: 'General' });

    const categories = ['All', 'HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Go', 'Backend', 'Mobile'];

    useEffect(() => {
        const savedNotes = localStorage.getItem('codio_memos');
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []);

    const saveNotes = (updatedNotes: Note[]) => {
        setNotes(updatedNotes);
        localStorage.setItem('codio_memos', JSON.stringify(updatedNotes));
    };

    const handleAddNote = () => {
        if (!newNote.title.trim() || !newNote.content.trim()) {
            toast.error('Please fill in both title and content');
            return;
        }

        const note: Note = {
            id: Date.now().toString(),
            ...newNote,
            date: new Date().toLocaleDateString(),
        };

        saveNotes([note, ...notes]);
        setNewNote({ title: '', content: '', category: 'General' });
        setIsAdding(false);
        toast.success('Note added successfully!');
    };

    const deleteNote = (id: string) => {
        saveNotes(notes.filter(note => note.id !== id));
        toast.success('Note deleted');
    };

    const filteredNotes = notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(-1)}
                        className="rounded-full"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <h1 className="text-2xl font-black tracking-tight">Coding Memos</h1>
                </div>
                <Button
                    onClick={() => setIsAdding(true)}
                    className="rounded-full bg-slate-900 text-white font-bold h-10 px-6"
                >
                    <Plus className="w-5 h-5 mr-2" /> New Note
                </Button>
            </div>

            <div className="p-6 space-y-6 max-w-4xl mx-auto">
                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search your notes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 rounded-2xl border-slate-200 bg-slate-50"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {categories.map(cat => (
                            <Badge
                                key={cat}
                                variant={selectedCategory === cat ? "default" : "outline"}
                                className={`cursor-pointer px-4 py-1.5 rounded-full whitespace-nowrap ${selectedCategory === cat ? 'bg-slate-900' : 'bg-white border-slate-200 text-slate-600'
                                    }`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Notes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatePresence>
                        {filteredNotes.map((note) => (
                            <motion.div
                                key={note.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group"
                            >
                                <Card className="rounded-3xl border-slate-200 hover:border-slate-900 transition-all hover:shadow-xl bg-white overflow-hidden relative">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-none rounded-lg font-bold">
                                                {note.category}
                                            </Badge>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => deleteNote(note.id)}
                                                className="text-slate-300 hover:text-red-500 rounded-full"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <CardTitle className="text-xl font-black mt-2 leading-tight">
                                            {note.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-500 font-medium line-clamp-3 mb-4">
                                            {note.content}
                                        </p>
                                        <div className="text-xs font-bold text-slate-400">
                                            {note.date}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredNotes.length === 0 && !isAdding && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-4">
                            <StickyNote className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900">No notes found</h3>
                        <p className="text-slate-400 font-bold">Start documenting your coding journey today!</p>
                    </div>
                )}
            </div>

            {/* Add Note Modal Overlay */}
            <AnimatePresence>
                {isAdding && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAdding(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
                        >
                            <div className="p-8 space-y-6">
                                <h2 className="text-3xl font-black">Quick Note</h2>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-400 uppercase tracking-wider ml-1">Title</label>
                                        <Input
                                            value={newNote.title}
                                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                            placeholder="e.g. Flexbox Center Trick"
                                            className="h-14 rounded-2xl border-2 border-slate-100 focus:border-slate-900 transition-all font-bold text-lg"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-400 uppercase tracking-wider ml-1">Category</label>
                                        <select
                                            value={newNote.category}
                                            onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                                            className="w-full h-14 rounded-2xl border-2 border-slate-100 bg-white px-4 font-bold text-lg focus:outline-none focus:border-slate-900 transition-all"
                                        >
                                            {categories.filter(c => c !== 'All').map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-400 uppercase tracking-wider ml-1">Thoughts</label>
                                        <textarea
                                            value={newNote.content}
                                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                            placeholder="Write your coding notes here..."
                                            className="w-full h-40 rounded-2xl border-2 border-slate-100 p-4 font-bold text-lg focus:outline-none focus:border-slate-900 transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsAdding(false)}
                                        className="flex-1 h-14 rounded-2xl border-2 font-black text-lg"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleAddNote}
                                        className="flex-1 h-14 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-xl"
                                    >
                                        Save Note
                                    </Button>
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
