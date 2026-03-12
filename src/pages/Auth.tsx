import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { toast } from 'sonner';
import { DrawnButton, DrawnCard, DrawnInput } from '@/components/ui/HandDrawnComponents';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Logo from '@/components/ui/logo';
import ComicMascot from '@/components/ui/ComicMascot';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState<boolean | null>(null);
    const { user, continueAsGuest, signIn, signUp } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const referralCode = searchParams.get('ref');

    useEffect(() => {
        if (user && user.email !== 'guest@codio.local') {
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [user, navigate, location]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const ADMIN_EMAIL = 'admin@codio.app';
            const ADMIN_PASSWORD = 'admin123';

            if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                setLoading(false);
                localStorage.setItem('admin_authenticated', 'true');
                localStorage.setItem('admin_login_time', new Date().toISOString());
                try { await continueAsGuest(); } catch (e) { console.error(e); }
                toast.success('Welcome, Administrator!');
                setTimeout(() => navigate('/admin'), 100);
                return;
            }

            await signIn(email.trim(), password);
        } catch (error: any) {
            setError(error.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signUp(email.trim(), password);
            setIsSignUp(null); // Close modal on success
            toast.info('Verification link sent!', {
                description: 'Please check your email to verify your account.'
            });
        } catch (error: any) {
            setError(error.message || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    const handleGuestMode = async () => {
        try {
            setLoading(true);
            setError('');
            await continueAsGuest();
            await new Promise(resolve => setTimeout(resolve, 100));
            navigate('/');
        } catch (error: any) {
            setError('Failed to start guest mode. Please try again.');
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            setError('');
            const isNative = Capacitor.isNativePlatform();

            if (isNative) {
                // Sign in using the globally initialized GoogleAuth
                const result = await GoogleAuth.signIn();

                if (!result || !result.authentication?.idToken) {
                    throw new Error('NO_ID_TOKEN');
                }

                const { auth } = await import('@/integrations/firebase/client');
                const { GoogleAuthProvider, signInWithCredential } = await import('firebase/auth');

                const credential = GoogleAuthProvider.credential(result.authentication.idToken);
                const userCredential = await signInWithCredential(auth, credential);
                const firebaseUser = userCredential.user;

                if (firebaseUser) {
                    // Upsert profile in Supabase
                    await supabase.from('profiles').upsert({
                        id: firebaseUser.uid,
                        username: firebaseUser.displayName?.split(' ')[0]
                            || firebaseUser.email?.split('@')[0]
                            || `user_${firebaseUser.uid.substring(0, 8)}`,
                        full_name: firebaseUser.displayName || null,
                        avatar_url: firebaseUser.photoURL || null,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'id' });
                }

                toast.success('Welcome! 🎉');
                navigate('/', { replace: true });
            } else {
                // Web browser — use popup flow
                const { auth } = await import('@/integrations/firebase/client');
                const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
                const provider = new GoogleAuthProvider();
                const result = await signInWithPopup(auth, provider);
                if (result.user) {
                    toast.success('Signed in!');
                    navigate('/', { replace: true });
                }
            }
        } catch (error: any) {
            const nativeError = error;
            const code = String(nativeError.code || '');
            const msg = String(nativeError.message || '');

            // User cancelled — don't show an error
            if (code === '12501' || msg.toLowerCase().includes('cancel') || msg.toLowerCase().includes('sign_in_cancelled')) {
                return;
            }

            if (msg === 'NO_ID_TOKEN') {
                setError('Google Sign-In returned no token. Please check your Firebase SHA-1 fingerprint.');
            } else if (code === '10' || msg.includes('DEVELOPER_ERROR') || msg.includes('ApiException: 10')) {
                setError('Google Auth Error (10): SHA-1 fingerprint mismatch. Please add your debug/release SHA-1 to Firebase Console → Project Settings → Your App.');
            } else if (code === '7' || msg.includes('NETWORK_ERROR')) {
                setError('Network error. Please check your internet connection and try again.');
            } else if (code === '12500') {
                setError('Google Play Services error. Please update Google Play Services and try again.');
            } else if (msg.includes('redirect') || msg.includes('oauth') || msg.includes('redirect_uri')) {
                setError('Google sign-in failed: OAuth redirect URI mismatch. Check Google Cloud Console.');
            } else {
                setError(`Google Sign-In failed: ${msg || 'Unknown error'}`);
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-[100dvh] bg-pastel-cyan flex flex-col items-center justify-center p-6 relative overflow-hidden font-draw">
            {/* Background Decorative elements */}
            <div className="absolute top-10 left-10 -rotate-12 opacity-80 cursor-default pointer-events-none hidden md:block z-0">
                <ComicMascot pose="study" size="xl" />
            </div>
            <div className="absolute bottom-10 right-10 rotate-6 opacity-80 cursor-default pointer-events-none hidden md:block z-0">
                <ComicMascot pose="cool" size="xl" />
            </div>

            <div
                className="w-full max-w-lg z-10 animate-fade-in"
            >
                <DrawnCard className="p-8 sm:p-12 border-4 border-black shadow-comic-lg bg-white relative overflow-hidden">
                    {/* Subtle background decoration inside card */}
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <Sparkles className="w-32 h-32 text-black rotate-12" />
                    </div>

                    <div className="text-center mb-10 relative z-10">
                        <h1 className="text-[4.5rem] sm:text-[6.5rem] font-black leading-[0.75] tracking-tighter mb-4 text-black uppercase italic"
                            style={{ textShadow: '8px 8px 0px rgba(0,0,0,0.1)' }}>
                            Codio
                        </h1>
                        <p className="text-xl font-black text-black/40 uppercase tracking-widest italic leading-tight">
                            Learning has never been <br /> this fun!
                        </p>
                    </div>

                    <div className="flex justify-center mb-12 relative z-10">
                        <motion.div
                            animate={{ rotate: [-2, 2, -2], y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="relative"
                        >
                            <div className="relative z-10 p-4 bg-white border-4 border-black rounded-[3rem] shadow-comic rotate-3 group overflow-hidden">
                                <ComicMascot pose="welcome" size="xl" className="scale-115" />
                            </div>
                            <motion.div
                                className="absolute -top-8 -right-8 w-20 h-20 bg-cc-yellow border-4 border-black rounded-full flex items-center justify-center shadow-comic-sm z-20 rotate-12"
                                animate={{ scale: [1, 1.1, 1], rotate: [12, -12, 12] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <Sparkles className="w-10 h-10 text-black fill-black" strokeWidth={3} />
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <div className="flex flex-col gap-5">
                            <DrawnButton
                                onClick={handleGuestMode}
                                className="w-full h-18 text-3xl bg-cc-green border-4 shadow-comic"
                            >
                                BEGIN JOURNEY
                            </DrawnButton>

                            <DrawnButton
                                variant="outlined"
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="w-full h-18 flex items-center justify-center gap-4 bg-white border-4 shadow-comic"
                            >
                                {loading ? (
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                ) : (
                                    <>
                                        <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-8 h-8" alt="G" />
                                        <span className="text-2xl font-black uppercase tracking-tight">Google Login</span>
                                    </>
                                )}
                            </DrawnButton>
                        </div>

                        <div className="flex gap-4">
                            <DrawnButton
                                variant="accent"
                                onClick={() => setIsSignUp(false)}
                                className="flex-1 h-14 text-xl bg-cc-pink border-4"
                            >
                                LOGIN
                            </DrawnButton>
                            <DrawnButton
                                variant="accent"
                                onClick={() => setIsSignUp(true)}
                                className="flex-1 h-14 text-xl bg-cc-blue border-4"
                            >
                                JOIN
                            </DrawnButton>
                        </div>
                    </div>
                </DrawnCard>
            </div>

            <AnimatePresence>
                {isSignUp !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                        onClick={(e) => e.target === e.currentTarget && setIsSignUp(null)}
                    >
                        <motion.div
                            initial={{ y: 50, rotate: 2 }}
                            animate={{ y: 0, rotate: 0 }}
                            exit={{ y: 50, rotate: -2 }}
                            className="w-full max-w-md"
                        >
                            <DrawnCard className="p-8">
                                <div className="text-center mb-8">
                                    <h2 className="text-[2.5rem] font-bold leading-tight">
                                        {isSignUp ? 'New Player!' : 'Welcome Back!'}
                                    </h2>
                                </div>

                                <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-5">
                                    <div>
                                        <DrawnInput
                                            type="email"
                                            placeholder="Your Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <DrawnInput
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Secret Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength={isSignUp ? 6 : undefined}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-black/50 hover:text-black"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>

                                    <DrawnButton type="submit" disabled={loading} className="w-full h-14">
                                        {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Confirm'}
                                    </DrawnButton>
                                </form>

                                {error && (
                                    <div className="mt-4 p-3 border-3 border-black rounded-xl bg-red-100 font-bold text-center">
                                        {error}
                                    </div>
                                )}
                            </DrawnCard>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-8 text-black/40 font-bold text-sm tracking-widest uppercase">
                Handmade with Love by Codio
            </div>

            {loading && !isSignUp && (
                <div className="fixed inset-0 z-[100] bg-pastel-cyan/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center font-draw">
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="mb-8"
                    >
                        <ComicMascot pose="thinking" size="xl" />
                    </motion.div>

                    <DrawnCard className="bg-white max-w-xs transform rotate-2">
                        <h2 className="text-3xl font-black mb-2 italic">HOLD ON!</h2>
                        <p className="text-lg font-bold text-black/60 uppercase tracking-widest">Entering the realm...</p>
                        <div className="mt-4 w-full h-4 bg-black rounded-full p-1 overflow-hidden border-2 border-black">
                            <motion.div
                                className="h-full bg-cc-pink rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </div>
                    </DrawnCard>
                </div>
            )}
        </div>
    );
};

export default Auth;
