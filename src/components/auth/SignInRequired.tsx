import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SignInRequiredProps {
    feature?: string;
    isUpgrade?: boolean;
}

export const SignInRequired: React.FC<SignInRequiredProps> = ({
    feature = "this feature",
    isUpgrade = false
}) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm"
            >
                <Card className="border-study bg-white rounded-[2.5rem] shadow-studypal overflow-hidden">
                    <CardContent className="p-8 text-center">
                        {/* Lock Icon */}
                        <div className="w-20 h-20 bg-pastel-lavender rounded-[1.5rem] border-study mx-auto mb-6 flex items-center justify-center">
                            <Lock className="w-10 h-10 text-slate-800" />
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-black text-slate-900 mb-3">
                            {isUpgrade ? 'Upgrade Required' : 'Sign In Required'}
                        </h2>

                        {/* Description */}
                        <p className="text-slate-600 font-medium mb-8">
                            {isUpgrade
                                ? `Unlock ${feature} and more by upgrading to a premium plan.`
                                : `Create a free account to access ${feature} and save your progress.`
                            }
                        </p>

                        {/* Buttons */}
                        <div className="space-y-3">
                            <Button
                                onClick={() => navigate(isUpgrade ? '/subscription' : '/auth')}
                                className="w-full h-12 rounded-full bg-slate-900 text-white font-bold border-study shadow-studypal hover:bg-slate-800"
                            >
                                {isUpgrade ? <Sparkles className="w-5 h-5 mr-2" /> : <LogIn className="w-5 h-5 mr-2" />}
                                {isUpgrade ? 'View Plans' : 'Sign In'}
                            </Button>
                            <Button
                                onClick={() => navigate(-1)}
                                variant="outline"
                                className="w-full h-12 rounded-full border-study font-bold hover:bg-slate-50"
                            >
                                Go Back
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};
