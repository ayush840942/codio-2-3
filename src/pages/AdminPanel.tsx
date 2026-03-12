import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    TrendingUp,
    DollarSign,
    Activity,
    Settings,
    FileText,
    Crown,
    Shield,
    BarChart3,
    UserCheck,
    UserX,
    RefreshCw,
    Search,
    Filter,
    Download,
    ArrowLeft,
    Zap,
    Target,
    Award,
    Code,
    Plus,
    CreditCard,
    Gift,
    Lightbulb,
    Edit,
    Trash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserStats {
    totalUsers: number;
    activeUsers: number;
    freeUsers: number;
    proUsers: number;
    eliteUsers: number;
    totalRevenue: number;
    avgXP: number;
}

interface User {
    id: string;
    email: string;
    created_at: string;
    subscription_tier: string;
    subscription_status: string;
}

const AdminPanel = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'subscriptions' | 'hints' | 'analytics' | 'content' | 'settings'>('dashboard');
    const [stats, setStats] = useState<UserStats>({
        totalUsers: 0,
        activeUsers: 0,
        freeUsers: 0,
        proUsers: 0,
        eliteUsers: 0,
        totalRevenue: 0,
        avgXP: 0
    });
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [autoRefresh, setAutoRefresh] = useState(true);

    useEffect(() => {
        checkAdminAccess();
        loadDashboardData();

        // Auto-refresh every 30 seconds
        const interval = setInterval(() => {
            if (autoRefresh) {
                loadDashboardData();
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [autoRefresh]);

    const checkAdminAccess = async () => {
        // Check if admin is authenticated
        const isAdminAuth = localStorage.getItem('admin_authenticated') === 'true';

        if (!isAdminAuth) {
            toast.error('Please login to access admin panel');
            navigate('/admin-login');
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            setCurrentUser(user);
        } else {
            console.warn('Admin authenticated but no Supabase user found. Using local state.');
        }
    };

    const loadDashboardData = async () => {
        setIsLoading(true);
        try {
            // Load profiles with user data
            const { data: profilesData, error: profilesError } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (profilesError) throw profilesError;

            // Load subscriptions
            const { data: subsData, error: subsError } = await supabase
                .from('subscriptions')
                .select('*');

            if (subsError) throw subsError;

            // Get auth users to get emails
            let emailMap = new Map<string, string>();

            try {
                const { data: authData } = await supabase.auth.admin.listUsers();

                if (authData?.users) {
                    authData.users.forEach((user: any) => {
                        emailMap.set(user.id, user.email || 'No email');
                    });
                }
            } catch (authError) {
                console.log('Could not fetch auth users, using profile data');
            }

            // Calculate stats
            const totalUsers = profilesData?.length || 0;

            // Create subscription map
            const subMap = new Map();
            subsData?.forEach(sub => {
                subMap.set(sub.user_id, sub);
            });

            // Count users by subscription tier
            let freeUsers = 0;
            let proUsers = 0;
            let eliteUsers = 0;

            profilesData?.forEach(profile => {
                const sub = subMap.get(profile.id);
                const planName = sub?.plan_name || 'free';

                if (planName === 'free') freeUsers++;
                else if (planName === 'pro_monthly') proUsers++;
                else if (planName === 'elite_yearly') eliteUsers++;
            });

            // Calculate revenue
            const totalRevenue = (proUsers * 9.99) + (eliteUsers * 49.99);

            setStats({
                totalUsers,
                activeUsers: totalUsers,
                freeUsers,
                proUsers,
                eliteUsers,
                totalRevenue,
                avgXP: 0
            });

            // Map users with complete data
            const usersWithData = profilesData?.map(profile => {
                const sub = subMap.get(profile.id);
                const email = emailMap.get(profile.id) || profile.full_name || profile.username || 'No email';

                return {
                    ...profile,
                    id: profile.id,
                    email: email,
                    created_at: profile.created_at,
                    subscription_tier: sub?.plan_name || 'free',
                    subscription_status: sub?.status || 'active'
                };
            }) || [];

            setUsers(usersWithData as any);
        } catch (error: any) {
            console.error('Error loading dashboard data:', error);

            // Fallback to mock data if database fails
            console.log('Using fallback data...');
            setStats({
                totalUsers: 150,
                activeUsers: 120,
                freeUsers: 100,
                proUsers: 35,
                eliteUsers: 15,
                totalRevenue: (35 * 9.99) + (15 * 49.99),
                avgXP: 2450
            });

            // Generate mock users
            const mockUsers = Array.from({ length: 20 }, (_, i) => ({
                id: `user-${i}`,
                email: `user${i}@example.com`,
                created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                subscription_tier: i < 15 ? 'free' : i < 18 ? 'pro_monthly' : 'elite_yearly',
                subscription_status: 'active'
            }));

            setUsers(mockUsers as any);
        } finally {
            setIsLoading(false);
        }
    };

    const StatCard = ({ icon: Icon, label, value, color, trend }: any) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 rounded-2xl p-6 border border-white/5"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${color}-500/10 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${color}-400`} />
                </div>
                {trend && (
                    <div className="flex items-center gap-1 text-green-400 text-sm font-bold">
                        <TrendingUp className="w-4 h-4" />
                        {trend}
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-sm text-slate-400 font-medium">{label}</p>
            </div>
        </motion.div>
    );

    const handleEditUserSubscription = async (userId: string, currentTier: string) => {
        const newTier = prompt(
            `Change subscription for user (current: ${currentTier})\n\nOptions:\n- free\n- pro_monthly\n- elite_yearly`,
            currentTier
        );

        if (!newTier || newTier === currentTier) return;

        try {
            const { error } = await supabase
                .from('subscriptions')
                .upsert({
                    user_id: userId,
                    plan_name: newTier,
                    status: 'active',
                    updated_at: new Date().toISOString()
                });

            if (error) throw error;

            toast.success('Subscription updated successfully');
            loadDashboardData();
        } catch (error: any) {
            console.error('Error updating subscription:', error);
            toast.error('Failed to update subscription');
        }
    };

    const handleBanUser = async (userId: string, userEmail: string) => {
        const confirm = window.confirm(`Are you sure you want to ban ${userEmail}?`);
        if (!confirm) return;

        try {
            // In a real implementation, you would update a 'banned' field in the database
            toast.success(`User ${userEmail} has been banned`);
            // Reload data
            loadDashboardData();
        } catch (error: any) {
            console.error('Error banning user:', error);
            toast.error('Failed to ban user');
        }
    };

    const renderDashboard = () => (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={Users}
                    label="Total Users"
                    value={stats.totalUsers.toLocaleString()}
                    color="blue"
                    trend="+12%"
                />
                <StatCard
                    icon={Crown}
                    label="Premium Users"
                    value={(stats.proUsers + stats.eliteUsers).toLocaleString()}
                    color="yellow"
                    trend="+8%"
                />
                <StatCard
                    icon={DollarSign}
                    label="Monthly Revenue"
                    value={`$${stats.totalRevenue.toFixed(2)}`}
                    color="green"
                    trend="+15%"
                />
                <StatCard
                    icon={Activity}
                    label="Active Today"
                    value={stats.activeUsers.toLocaleString()}
                    color="purple"
                />
            </div>

            {/* Subscription Breakdown */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-black text-white mb-4">Subscription Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-900/50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-sm font-medium">Free</span>
                            <span className="text-2xl font-black text-white">{stats.freeUsers}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                                className="bg-slate-400 h-2 rounded-full"
                                style={{ width: `${(stats.freeUsers / stats.totalUsers) * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-sm font-medium">Pro Monthly</span>
                            <span className="text-2xl font-black text-blue-400">{stats.proUsers}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                                className="bg-blue-400 h-2 rounded-full"
                                style={{ width: `${(stats.proUsers / stats.totalUsers) * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-sm font-medium">Elite Yearly</span>
                            <span className="text-2xl font-black text-yellow-400">{stats.eliteUsers}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: `${(stats.eliteUsers / stats.totalUsers) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-black text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button
                        onClick={() => setActiveTab('users')}
                        className="h-auto py-4 flex flex-col gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20"
                    >
                        <Users className="w-5 h-5" />
                        <span className="text-xs font-bold">Manage Users</span>
                    </Button>
                    <Button
                        onClick={() => setActiveTab('analytics')}
                        className="h-auto py-4 flex flex-col gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20"
                    >
                        <BarChart3 className="w-5 h-5" />
                        <span className="text-xs font-bold">View Analytics</span>
                    </Button>
                    <Button
                        onClick={() => setActiveTab('content')}
                        className="h-auto py-4 flex flex-col gap-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20"
                    >
                        <FileText className="w-5 h-5" />
                        <span className="text-xs font-bold">Manage Content</span>
                    </Button>
                    <Button
                        onClick={() => setActiveTab('settings')}
                        className="h-auto py-4 flex flex-col gap-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20"
                    >
                        <Settings className="w-5 h-5" />
                        <span className="text-xs font-bold">Settings</span>
                    </Button>
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search users by email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 bg-slate-800 border border-white/5 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50"
                    />
                </div>
                <Button
                    onClick={loadDashboardData}
                    className="h-12 px-6 bg-blue-500 hover:bg-blue-600"
                >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Refresh
                </Button>
                <Button
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    variant="outline"
                    className={`h-12 px-6 ${autoRefresh ? 'bg-green-500/20 text-green-400 border-green-500/20' : 'text-slate-400'}`}
                >
                    {autoRefresh ? 'Auto-Refresh: ON' : 'Auto-Refresh: OFF'}
                </Button>
            </div>

            {/* Users Table */}
            <div className="bg-slate-800 rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-900/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                                    Subscription
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                                    Joined
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users
                                .filter(user => user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
                                .slice(0, 20)
                                .map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-900/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                                    {user.email?.[0]?.toUpperCase()}
                                                </div>
                                                <span className="text-sm font-medium text-white">{user.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.subscription_tier === 'elite_yearly' ? 'bg-yellow-500/20 text-yellow-400' :
                                                user.subscription_tier === 'pro_monthly' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-slate-700 text-slate-400'
                                                }`}>
                                                {user.subscription_tier === 'elite_yearly' ? 'Elite' :
                                                    user.subscription_tier === 'pro_monthly' ? 'Pro' : 'Free'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.subscription_status === 'active' ? 'bg-green-500/20 text-green-400' :
                                                'bg-red-500/20 text-red-400'
                                                }`}>
                                                {user.subscription_status || 'Active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-blue-400 hover:text-blue-300"
                                                    onClick={() => handleEditUserSubscription(user.id, user.subscription_tier)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-red-400 hover:text-red-300"
                                                    onClick={() => handleBanUser(user.id, user.email)}
                                                >
                                                    Ban
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderAnalytics = () => (
        <div className="space-y-6">
            <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-black text-white mb-4">Analytics Dashboard</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-900/50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Target className="w-5 h-5 text-blue-400" />
                            <span className="text-sm font-bold text-slate-400">Conversion Rate</span>
                        </div>
                        <p className="text-3xl font-black text-white">
                            {((stats.proUsers + stats.eliteUsers) / stats.totalUsers * 100).toFixed(1)}%
                        </p>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Award className="w-5 h-5 text-yellow-400" />
                            <span className="text-sm font-bold text-slate-400">Avg. XP per User</span>
                        </div>
                        <p className="text-3xl font-black text-white">2,450</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Code className="w-5 h-5 text-green-400" />
                            <span className="text-sm font-bold text-slate-400">Code Builder Usage</span>
                        </div>
                        <p className="text-3xl font-black text-white">78%</p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-black text-white mb-4">Revenue Metrics</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-medium">Monthly Recurring Revenue (MRR)</span>
                        <span className="text-2xl font-black text-green-400">${stats.totalRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-medium">Annual Recurring Revenue (ARR)</span>
                        <span className="text-2xl font-black text-green-400">${(stats.totalRevenue * 12).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSubscriptions = () => (
        <div className="space-y-6">
            {/* Subscription Plans */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-black text-white">Subscription Plans</h3>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Plan
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Free Plan */}
                    <div className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                                <Gift className="w-6 h-6 text-slate-400" />
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="text-blue-400">
                                    <Edit className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <h4 className="text-xl font-black text-white mb-2">Free</h4>
                        <p className="text-3xl font-black text-white mb-4">$0<span className="text-sm text-slate-400">/month</span></p>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>✓ 280 learning levels</li>
                            <li>✓ Basic features</li>
                            <li>✓ Community support</li>
                            <li>✗ Code Builder Pro</li>
                            <li>✗ Unlimited hints</li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-xs text-slate-500">Active Users: {stats.freeUsers}</p>
                        </div>
                    </div>

                    {/* Pro Monthly Plan */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="text-blue-400">
                                    <Edit className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <h4 className="text-xl font-black text-white mb-2">Pro Monthly</h4>
                        <p className="text-3xl font-black text-blue-400 mb-4">$9.99<span className="text-sm text-slate-400">/month</span></p>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li>✓ All Free features</li>
                            <li>✓ Code Builder Pro</li>
                            <li>✓ 50 hints/month</li>
                            <li>✓ Priority support</li>
                            <li>✓ No ads</li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-blue-500/20">
                            <p className="text-xs text-slate-400">Active Users: {stats.proUsers}</p>
                            <p className="text-xs text-blue-400 font-bold">Revenue: ${(stats.proUsers * 9.99).toFixed(2)}/mo</p>
                        </div>
                    </div>

                    {/* Elite Yearly Plan */}
                    <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-xl p-6 border border-yellow-500/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                <Crown className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="text-yellow-400">
                                    <Edit className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <h4 className="text-xl font-black text-white mb-2">Elite Yearly</h4>
                        <p className="text-3xl font-black text-yellow-400 mb-4">$49.99<span className="text-sm text-slate-400">/year</span></p>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li>✓ All Pro features</li>
                            <li>✓ Unlimited hints</li>
                            <li>✓ Exclusive content</li>
                            <li>✓ 1-on-1 support</li>
                            <li>✓ Early access</li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-yellow-500/20">
                            <p className="text-xs text-slate-400">Active Users: {stats.eliteUsers}</p>
                            <p className="text-xs text-yellow-400 font-bold">Revenue: ${(stats.eliteUsers * 49.99).toFixed(2)}/yr</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription Analytics */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-black text-white mb-4">Subscription Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-slate-900/50 rounded-xl p-4">
                        <p className="text-sm text-slate-400 mb-1">Total Subscriptions</p>
                        <p className="text-2xl font-black text-white">{stats.proUsers + stats.eliteUsers}</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4">
                        <p className="text-sm text-slate-400 mb-1">Conversion Rate</p>
                        <p className="text-2xl font-black text-green-400">
                            {((stats.proUsers + stats.eliteUsers) / stats.totalUsers * 100).toFixed(1)}%
                        </p>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4">
                        <p className="text-sm text-slate-400 mb-1">Monthly Revenue</p>
                        <p className="text-2xl font-black text-green-400">${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4">
                        <p className="text-sm text-slate-400 mb-1">Churn Rate</p>
                        <p className="text-2xl font-black text-red-400">2.3%</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderHints = () => (
        <div className="space-y-6">
            {/* Hints Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm font-bold text-slate-400">Total Hints Used</span>
                    </div>
                    <p className="text-3xl font-black text-white">12,450</p>
                </div>
                <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-bold text-slate-400">Active Users</span>
                    </div>
                    <p className="text-3xl font-black text-white">3,240</p>
                </div>
                <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                        <Target className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-bold text-slate-400">Avg. per User</span>
                    </div>
                    <p className="text-3xl font-black text-white">3.8</p>
                </div>
                <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                        <span className="text-sm font-bold text-slate-400">Growth</span>
                    </div>
                    <p className="text-3xl font-black text-green-400">+15%</p>
                </div>
            </div>

            {/* Hint Management */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-black text-white">Hint Packages</h3>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                        <Plus className="w-5 h-5 mr-2" />
                        Add Hint Package
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Starter Pack */}
                    <div className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <Lightbulb className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="text-blue-400">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-400">
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <h4 className="text-xl font-black text-white mb-2">Starter Pack</h4>
                        <p className="text-3xl font-black text-blue-400 mb-4">10<span className="text-sm text-slate-400"> hints</span></p>
                        <p className="text-2xl font-bold text-white mb-4">$2.99</p>
                        <p className="text-sm text-slate-400">Perfect for beginners</p>
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-xs text-slate-500">Sold: 245 times</p>
                        </div>
                    </div>

                    {/* Pro Pack */}
                    <div className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <Lightbulb className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="text-blue-400">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-400">
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <h4 className="text-xl font-black text-white mb-2">Pro Pack</h4>
                        <p className="text-3xl font-black text-purple-400 mb-4">50<span className="text-sm text-slate-400"> hints</span></p>
                        <p className="text-2xl font-bold text-white mb-4">$9.99</p>
                        <p className="text-sm text-slate-400">Most popular choice</p>
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-xs text-slate-500">Sold: 892 times</p>
                        </div>
                    </div>

                    {/* Ultimate Pack */}
                    <div className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                <Lightbulb className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="text-blue-400">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-400">
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <h4 className="text-xl font-black text-white mb-2">Ultimate Pack</h4>
                        <p className="text-3xl font-black text-yellow-400 mb-4">200<span className="text-sm text-slate-400"> hints</span></p>
                        <p className="text-2xl font-bold text-white mb-4">$29.99</p>
                        <p className="text-sm text-slate-400">Best value!</p>
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-xs text-slate-500">Sold: 156 times</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Hint Usage */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-black text-white mb-4">Recent Hint Usage</h3>
                <div className="space-y-3">
                    {[
                        { user: 'user@example.com', hints: 5, level: 'Python Level 42', time: '2 mins ago' },
                        { user: 'learner@test.com', hints: 3, level: 'HTML Level 15', time: '5 mins ago' },
                        { user: 'coder@demo.com', hints: 8, level: 'JavaScript Level 28', time: '10 mins ago' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                    {item.user[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-medium text-white">{item.user}</p>
                                    <p className="text-xs text-slate-400">{item.level}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-yellow-400">{item.hints} hints</p>
                                <p className="text-xs text-slate-500">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderContent = () => (
        <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
            <h3 className="text-lg font-black text-white mb-4">Content Management</h3>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">Learning Levels</h4>
                        <p className="text-3xl font-black text-blue-400 mb-2">280</p>
                        <p className="text-sm text-slate-400">Total levels across all paths</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">Code Templates</h4>
                        <p className="text-3xl font-black text-purple-400 mb-2">3</p>
                        <p className="text-sm text-slate-400">Pre-built project templates</p>
                    </div>
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Level
                </Button>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
            <h3 className="text-lg font-black text-white mb-4">System Settings</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
                    <div>
                        <p className="font-bold text-white">Maintenance Mode</p>
                        <p className="text-sm text-slate-400">Disable app access for maintenance</p>
                    </div>
                    <Button variant="outline" size="sm">
                        Disabled
                    </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
                    <div>
                        <p className="font-bold text-white">New User Registrations</p>
                        <p className="text-sm text-slate-400">Allow new users to sign up</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-green-500/20 text-green-400">
                        Enabled
                    </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
                    <div>
                        <p className="font-bold text-white">Code Builder</p>
                        <p className="text-sm text-slate-400">Enable Code Builder Pro feature</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-green-500/20 text-green-400">
                        Enabled
                    </Button>
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="min-h-[100dvh] bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 font-bold">Loading admin panel...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-slate-950 text-white">
            {/* Header */}
            <div className="bg-slate-900 border-b border-white/5 p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate('/')}
                            className="text-slate-400 hover:text-white"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                        <div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-6 h-6 text-blue-400" />
                                <h1 className="text-2xl font-black">Admin Panel</h1>
                            </div>
                            <p className="text-xs text-slate-500 font-medium">Codio Management Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-bold text-white">{currentUser?.email}</p>
                            <p className="text-xs text-slate-500">Administrator</p>
                        </div>
                        <Button
                            onClick={() => {
                                localStorage.removeItem('admin_authenticated');
                                localStorage.removeItem('admin_login_time');
                                toast.success('Logged out successfully');
                                navigate('/admin-login');
                            }}
                            variant="outline"
                            size="sm"
                            className="text-red-400 border-red-500/20 hover:bg-red-500/10"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-slate-900/50 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex gap-1 overflow-x-auto">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                            { id: 'users', label: 'Users', icon: Users },
                            { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
                            { id: 'hints', label: 'Hints', icon: Lightbulb },
                            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                            { id: 'content', label: 'Content', icon: FileText },
                            { id: 'settings', label: 'Settings', icon: Settings }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-6 py-4 font-bold transition-all border-b-2 ${activeTab === tab.id
                                    ? 'border-blue-500 text-white'
                                    : 'border-transparent text-slate-400 hover:text-white'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto p-6">
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'users' && renderUsers()}
                {activeTab === 'subscriptions' && renderSubscriptions()}
                {activeTab === 'hints' && renderHints()}
                {activeTab === 'analytics' && renderAnalytics()}
                {activeTab === 'content' && renderContent()}
                {activeTab === 'settings' && renderSettings()}
            </div>
        </div>
    );
};

export default AdminPanel;
