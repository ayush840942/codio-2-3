import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

const AdminLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate loading
        setTimeout(() => {
            if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
                // Store admin session
                localStorage.setItem('admin_authenticated', 'true');
                localStorage.setItem('admin_login_time', new Date().toISOString());

                toast.success('Welcome, Administrator!');
                navigate('/admin');
            } else {
                toast.error('Invalid credentials');
                setPassword('');
            }
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-[100dvh] bg-slate-950 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6 text-slate-400 hover:text-white"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </Button>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-10 h-10 text-blue-400" />
                        </div>
                        <h1 className="text-3xl font-black text-white mb-2">Admin Access</h1>
                        <p className="text-slate-400 font-medium">Enter your credentials to continue</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    required
                                    className="w-full h-14 pl-12 pr-4 bg-slate-800 border border-white/5 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    required
                                    className="w-full h-14 pl-12 pr-12 bg-slate-800 border border-white/5 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-white font-black text-lg rounded-xl shadow-xl shadow-blue-500/20"
                        >
                            {isLoading ? 'Authenticating...' : 'Login'}
                        </Button>
                    </form>

                    {/* Demo Credentials Info */}
                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <p className="text-xs text-blue-400 font-bold text-center">
                            Demo Credentials: admin / admin123
                        </p>
                    </div>
                </motion.div>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-600 font-medium">
                        🔒 Secure admin access • All actions are logged
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
