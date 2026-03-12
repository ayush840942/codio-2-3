import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Trophy,
    Star,
    Zap,
    CheckCircle2,
    Globe,
    Github,
    Twitter,
    Linkedin,
    ArrowLeft,
    ShieldCheck,
    Award,
    Sparkles
} from 'lucide-react';
import { DrawnCard, DrawnButton } from '@/components/ui/HandDrawnComponents';
import { useAuth } from '@/context/AuthContext';
import { useRewards } from '@/context/RewardsContext';
import { useGame } from '@/context/GameContext';
import ProfilePicture from '@/components/profile/ProfilePicture';
import MobileHeader from '@/components/MobileHeader';
import { toast } from 'sonner';
import { haptics } from '@/utils/haptics';
import { ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';
import { toDatabaseId } from '@/utils/idMapping';

const PublicProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();

    const [loading, setLoading] = React.useState(true);
    const [targetProfile, setTargetProfile] = React.useState<any>(null);
    const [targetRewards, setTargetRewards] = React.useState<any>(null);
    const [targetProgress, setTargetProgress] = React.useState<any[]>([]);
    const [targetProjects, setTargetProjects] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchPublicData = async () => {
            const profileId = id || (currentUser?.id ? `u_${currentUser.id}` : null);

            if (!profileId) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                // Handle u_ prefix for mapped IDs
                const dbId = profileId.startsWith('u_') ? toDatabaseId(profileId.replace('u_', '')) : profileId;
                console.log('Fetching public profile for:', dbId);

                // 1. Fetch Profile
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', dbId)
                    .maybeSingle();

                if (profileError) throw profileError;
                setTargetProfile(profileData);

                if (profileData) {
                    // 2. Fetch Rewards
                    const { data: rewardsData } = await supabase
                        .from('user_rewards')
                        .select('*')
                        .eq('user_id', dbId)
                        .maybeSingle();
                    setTargetRewards(rewardsData);

                    // 3. Fetch Progress
                    const { data: progressData } = await supabase
                        .from('user_progress')
                        .select('*')
                        .eq('user_id', dbId);
                    setTargetProgress(progressData || []);

                    // 4. Fetch Published Projects
                    const { data: projectData } = await supabase
                        .from('projects')
                        .select('*')
                        .eq('user_id', dbId)
                        .eq('published', true);
                    setTargetProjects(projectData || []);
                }
            } catch (err) {
                console.error('Error fetching public profile:', err);
                toast.error('Could not load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchPublicData();
    }, [id, currentUser]);

    const completedLevels = targetProgress.filter(l => l.completed).length;
    const isOwner = !id || (currentUser && (id === currentUser.id || id === `u_${currentUser.id}`));

    if (loading) {
        return (
            <div className="min-h-screen bg-cc-blue/5 flex items-center justify-center font-draw">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-cc-blue border-t-transparent rounded-full animate-spin" />
                    <p className="font-black uppercase tracking-widest text-cc-blue italic">Loading Legend...</p>
                </div>
            </div>
        );
    }

    if (!targetProfile) {
        return (
            <div className="min-h-screen bg-cc-blue/5 flex items-center justify-center p-6 font-draw">
                <DrawnCard className="bg-white p-10 text-center">
                    <h2 className="text-2xl font-black mb-2">OPPS!</h2>
                    <p className="font-bold opacity-60 mb-6">This coder has not yet appeared in our archives.</p>
                    <DrawnButton onClick={() => navigate('/')} className="w-full h-14 bg-cc-blue">
                        BACK TO STATION
                    </DrawnButton>
                </DrawnCard>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-cc-blue/5 font-draw pb-20 overflow-x-hidden">
            {/* Nav */}
            {/* Unified Mobile Header */}
            <MobileHeader
                title="Public Profile"
                showBack
                rightElement={
                    <div className="px-5 py-2 bg-black text-white rounded-2xl border-2 border-white/20 shadow-comic flex items-center gap-2">
                        <Globe className="w-4 h-4 text-cc-blue" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Live</span>
                    </div>
                }
            />

            <div className="px-6 max-w-lg mx-auto space-y-8" style={{ paddingTop: 'calc(var(--safe-area-top) + 3.5rem)' }}>
                {/* Profile Header */}
                <div className="flex flex-col items-center text-center relative">
                    <div className="relative mb-6">
                        <div className="absolute -inset-4 bg-cc-yellow/20 blur-2xl rounded-full" />
                        <div className="relative border-4 border-black rounded-[3rem] overflow-hidden shadow-comic-lg">
                            <ProfilePicture profilePicture={targetProfile?.avatar_url} editable={false} size="lg" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-cc-yellow border-3 border-black p-2 rounded-2xl shadow-comic rotate-12">
                            <ShieldCheck className="w-5 h-5 text-black" strokeWidth={3} />
                        </div>
                    </div>

                    <h1 className="text-4xl font-black uppercase tracking-tighter leading-tight text-black mb-1">
                        {targetProfile?.username || targetProfile?.full_name || 'Codio Voyager'}
                    </h1>
                    <div className="flex items-center gap-2 text-cc-blue font-black text-xs uppercase italic">
                        <Star className="w-4 h-4 fill-cc-blue" />
                        LEVEL {Math.floor((targetRewards?.xp || 0) / 1000) + 1} LOGIC WIZARD
                    </div>

                    {targetProfile?.bio && (
                        <p className="mt-4 text-sm font-bold text-black/60 italic max-w-xs">
                            "{targetProfile.bio}"
                        </p>
                    )}

                    <div className="flex gap-4 mt-8">
                        {[
                            { Icon: Github, url: targetProfile?.github_url },
                            { Icon: Linkedin, url: targetProfile?.linkedin_url },
                            { Icon: Twitter, url: targetProfile?.twitter_url }
                        ].map((social, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    haptics.impact(ImpactStyle.Light);
                                    if (social.url) {
                                        window.open(social.url, '_blank');
                                    } else {
                                        toast.error('No link provided yet');
                                    }
                                }}
                                className={`w-12 h-12 bg-white border-3 border-black rounded-2xl flex items-center justify-center shadow-comic-sm hover:translate-y-0.5 hover:shadow-none transition-all ${!social.url && 'opacity-20 grayscale cursor-not-allowed'}`}
                            >
                                <social.Icon className="w-6 h-6" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'XP', value: targetRewards?.xp || 0, color: 'bg-cc-yellow' },
                        { label: 'PROJECTS', value: targetProjects.length, color: 'bg-cc-green' },
                        { label: 'LEVELS', value: completedLevels, color: 'bg-cc-blue text-white' }
                    ].map(stat => (
                        <DrawnCard key={stat.label} className={`${stat.color} p-4 text-center border-4 shadow-comic`}>
                            <div className="text-xl font-black leading-none mb-1">{stat.value}</div>
                            <div className="text-[8px] font-black uppercase tracking-widest opacity-60">{stat.label}</div>
                        </DrawnCard>
                    ))}
                </div>

                {/* Verified Projects */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black uppercase tracking-tighter italic flex items-center gap-2">
                            <Award className="w-6 h-6 text-cc-yellow fill-cc-yellow shadow-comic-sm" />
                            AI Verified Work
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {targetProjects.length > 0 ? (
                            targetProjects.map((p, idx) => (
                                <DrawnCard
                                    key={p.id}
                                    className={`bg-white p-5 border-3 shadow-comic flex items-center gap-5 relative overflow-hidden rotate-[${idx % 2 === 0 ? '1' : '-1'}deg]`}
                                >
                                    <div className="w-14 h-14 bg-black rounded-2xl flex flex-col items-center justify-center text-white shrink-0">
                                        <span className="text-[8px] font-black uppercase text-cc-yellow">RANK</span>
                                        <span className="text-2xl font-black leading-none">{'A'}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-black text-lg uppercase leading-none mb-1">{p.name}</h4>
                                        <div className="flex items-center gap-1.5 text-cc-green font-black text-[9px] uppercase italic">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Verified by Codio AI • {new Date(p.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <Sparkles className="absolute -right-2 -top-2 w-12 h-12 text-black/5 rotate-12" />
                                </DrawnCard>
                            ))
                        ) : (
                            <div className="text-center py-10 opacity-40">
                                <p className="font-black uppercase tracking-widest text-[10px] italic">No published projects yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Career Summary */}
                <DrawnCard className="bg-black p-8 border-4 shadow-comic-lg text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-black uppercase mb-4 text-cc-yellow italic">Technical Report</h3>
                        <div className="space-y-4 font-mono text-[10px] uppercase font-bold leading-relaxed">
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-white/40">Algo Proficiency</span>
                                <span className="text-cc-mint">Top 5%</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-white/40">Coding Speed</span>
                                <span className="text-cc-blue">84 WPM (Clean)</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-white/40">Problem Solving</span>
                                <span className="text-cc-yellow">Advanced</span>
                            </div>
                        </div>
                    </div>
                </DrawnCard>

                {isOwner && (
                    <div className="pt-6">
                        <DrawnButton
                            className="w-full bg-cc-blue h-16 text-xl shadow-comic border-4"
                            onClick={async () => {
                                haptics.impact(ImpactStyle.Heavy);
                                const profileUrl = `https://codio.app/p/u_${currentUser?.id}`;

                                if (Capacitor.isNativePlatform()) {
                                    try {
                                        await Share.share({
                                            title: `${targetProfile?.username || 'Coder'}'s Coding Legend`,
                                            text: `Check out my AI-verified coding portfolio on Codio!`,
                                            url: profileUrl,
                                            dialogTitle: 'Share your coding legend',
                                        });
                                        haptics.notification(NotificationType.Success);
                                    } catch (e) {
                                        console.error('Share failed', e);
                                    }
                                } else {
                                    navigator.clipboard.writeText(profileUrl);
                                    toast.success('Link Copied! Share your legend! 🚀');
                                }
                            }}
                        >
                            SHARE LIVE PROFILE
                        </DrawnButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicProfile;
