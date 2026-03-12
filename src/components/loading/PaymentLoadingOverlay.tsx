
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, CreditCard, Loader2 } from 'lucide-react';

interface PaymentLoadingOverlayProps {
    isVisible: boolean;
    message?: string;
    subMessage?: string;
}

const PaymentLoadingOverlay: React.FC<PaymentLoadingOverlayProps> = ({
    isVisible,
    message = "Opening Secure Checkout",
    subMessage = "Please don't refresh or close the app"
}) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] flex flex-col items-center justify-center p-6 bg-background/80 backdrop-blur-xl"
                >
                    <div className="max-w-xs w-full text-center space-y-8">
                        {/* Animated Icon Cluster */}
                        <div className="relative h-24 flex items-center justify-center">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-20 h-20 rounded-[2.5rem] bg-primary/20 flex items-center justify-center border border-primary/20"
                            >
                                <div className="relative">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Loader2 className="w-10 h-10 text-primary opacity-40 shrink-0" />
                                    </motion.div>
                                    <Lock className="w-6 h-6 text-primary absolute inset-0 m-auto" />
                                </div>
                            </motion.div>

                            {/* Orbital Icons */}
                            {[Shield, CreditCard].map((Icon, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        x: [i === 0 ? -40 : 40, i === 0 ? -45 : 45, i === 0 ? -40 : 40],
                                        y: [0, -5, 5, 0],
                                        opacity: [0.4, 0.8, 0.4]
                                    }}
                                    transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                                    className="absolute"
                                >
                                    <Icon className="w-5 h-5 text-primary" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xl font-bold text-foreground"
                            >
                                {message}
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-sm text-muted-foreground font-medium"
                            >
                                {subMessage}
                            </motion.p>
                        </div>

                        {/* Security Badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-center gap-4 pt-4 grayscale opacity-50"
                        >
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card">
                                <Shield className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">SSL Encrypted</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Subtle background pulse */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.05, 0.1, 0.05]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -z-10 w-96 h-96 bg-primary rounded-full blur-[100px]"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PaymentLoadingOverlay;
