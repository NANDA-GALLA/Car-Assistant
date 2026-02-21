import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Shield, Cpu, Zap, Radio, Globe, Database, Thermometer } from 'lucide-react';

const DiagnosticLine = ({ delay = 0 }) => (
    <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay, ease: "linear" }}
        className="h-[1px] bg-primary/20 absolute w-full"
    />
);

const NeuralLogo = () => (
    <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Rotating Outer Ring */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full"
        />

        {/* Pulsing Core Glow */}
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />

        <svg viewBox="0 0 200 200" className="w-48 h-48 relative z-10 drop-shadow-[0_0_20px_rgba(0,242,255,0.6)]">
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f2ff" />
                    <stop offset="100%" stopColor="#7000ff" />
                </linearGradient>
            </defs>

            {/* Hexagonal Core */}
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M100 30 L160 65 L160 135 L100 170 L40 135 L40 65 Z"
                fill="none"
                stroke="url(#logoGradient)"
                strokeWidth="2"
            />

            {/* Inner Neural Synapse */}
            <motion.g
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
            >
                <path d="M100 70 L100 130" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" />
                <path d="M75 85 L125 115" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" />
                <path d="M75 115 L125 85" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" />

                {/* Center Core */}
                <motion.circle
                    cx="100" cy="100" r="8"
                    fill="url(#logoGradient)"
                    animate={{ r: [8, 12, 8], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.g>
        </svg>

        {/* Floating Data Bits */}
        {[...Array(4)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                animate={{
                    x: [0, Math.cos(i * 90) * 100],
                    y: [0, Math.sin(i * 90) * 100],
                    opacity: [1, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
        ))}
    </div>
);

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [readyToEnter, setReadyToEnter] = useState(false);

    const diagnosticLogs = [
        "KERNEL_INIT_SUCCESS: v8.4.2",
        "NEURAL_LINK_STABLE: 99.8%",
        "SYMMETRIC_ENCRYPTION_ACTIVE",
        "BIO_METRIC_SCAN_COMPLETE",
        "TURBO_CORE_WARMING_UP",
        "DASHBOARD_ASSETS_LOADED",
        "V8_ENGINE_READY_FOR_IGNITION"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setReadyToEnter(true), 1000);
                    return 100;
                }
                const increment = Math.random() * 3;
                return Math.min(prev + increment, 100);
            });
        }, 80);
        return () => clearInterval(timer);
    }, []);

    const handleInitialize = () => {
        import('../utils/audio').then(({ playSystemSound }) => {
            playSystemSound('ignition');
        });
        setTimeout(onComplete, 800);
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#020406] overflow-hidden font-sans">
            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent" />
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent" />
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,#111_1px,transparent_1px)] [background-size:40px_40px]" />

                {/* Moving Diagnostic Scan Lines */}
                <div className="absolute inset-0 flex flex-col justify-between overflow-hidden opacity-10">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="h-[1px] w-full bg-primary/20 blur-[1px]" />
                    ))}
                </div>
            </div>

            {/* TOP HEADER Telemetry */}
            <div className="absolute top-8 left-0 right-0 px-12 flex justify-between items-start z-20">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-primary/40 tracking-[0.4em] uppercase">System State</span>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-black text-white italic tracking-widest uppercase">Initializing_Core</span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase">Auth Token</span>
                    <span className="text-[10px] font-mono text-primary/60 uppercase">CX-7781-9921-X8</span>
                </div>
            </div>

            {/* Main Central Unit */}
            <div className="relative z-10 flex flex-col items-center gap-12">
                <NeuralLogo />

                <div className="flex flex-col items-center w-full max-w-sm gap-8 px-4">
                    <AnimatePresence mode="wait">
                        {!readyToEnter ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="w-full"
                            >
                                <div className="flex justify-between items-end mb-4 font-mono">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <Cpu className="w-3 h-3 text-primary" />
                                            <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Processing Data</span>
                                        </div>
                                        <div className="h-4 overflow-hidden relative w-48">
                                            <motion.div
                                                animate={{ y: [0, -20, -40, -60, -80, -100] }}
                                                transition={{ duration: 7, repeat: Infinity }}
                                                className="flex flex-col"
                                            >
                                                {diagnosticLogs.map((log, i) => (
                                                    <span key={i} className="text-[9px] text-primary/80 uppercase font-black tracking-tighter h-5">{log}</span>
                                                ))}
                                            </motion.div>
                                        </div>
                                    </div>
                                    <div className="text-4xl font-black text-white italic tabular-nums leading-none">
                                        {Math.round(progress)}<span className="text-xs text-primary/40 non-italic ml-1">%</span>
                                    </div>
                                </div>

                                {/* Premium Progress Bar */}
                                <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-[#7000ff] to-primary"
                                        style={{ width: `${progress}%` }}
                                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                    <motion.div
                                        className="absolute top-0 h-full w-20 bg-white/30 blur-xl"
                                        animate={{ left: ["-20%", "100%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.button
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleInitialize}
                                className="group relative w-full overflow-hidden rounded-3xl"
                            >
                                {/* Button Background with Glassmorphism */}
                                <div className="absolute inset-0 bg-primary opacity-10 group-hover:opacity-20 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />

                                <div className="relative z-10 py-8 px-12 border border-primary/30 flex flex-col items-center gap-2 backdrop-blur-md">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="absolute -top-12 -right-12 w-24 h-24 border-2 border-primary/10 rounded-full"
                                    />

                                    <div className="flex items-center gap-3">
                                        <Zap className="w-5 h-5 text-primary group-hover:drop-shadow-[0_0_8px_#00f2ff] transition-all" />
                                        <span className="text-2xl font-black text-white italic uppercase tracking-[0.3em] group-hover:text-primary transition-colors">
                                            Initiate Ignition
                                        </span>
                                    </div>
                                    <span className="text-[8px] font-black text-primary/50 uppercase tracking-[0.6em]">Neural_Interface_X8_Engaged</span>
                                </div>

                                {/* Animated scan bar inside button */}
                                <motion.div
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 w-24 bg-gradient-to-r from-transparent via-primary/10 to-transparent skew-x-12"
                                />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Telemetry Dots / Grid */}
            <div className="absolute bottom-12 grid grid-cols-4 gap-8 px-12 w-full max-w-4xl opacity-30">
                {[
                    { icon: Shield, label: "Safety_Core", val: "OK" },
                    { icon: Radio, label: "Signal_Link", val: "-42db" },
                    { icon: Database, label: "D-Storage", val: "94%" },
                    { icon: Globe, label: "Sat_Nav", val: "88%" }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-2 group cursor-crosshair">
                        <div className="flex items-center gap-2">
                            <item.icon className="w-3 h-3 text-primary group-hover:scale-125 transition-transform" />
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">{item.label}</span>
                        </div>
                        <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, delay: i * 0.2 }}
                            />
                        </div>
                        <span className="text-[7px] font-mono text-primary text-right">{item.val}</span>
                    </div>
                ))}
            </div>

            {/* Corner Decorative HUD */}
            <div className="absolute bottom-8 right-8 flex flex-col items-end pointer-events-none opacity-40">
                <div className="flex items-center gap-2 mb-1">
                    <Thermometer className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-mono text-white">42.2°C_SYS_TEMP</span>
                </div>
                <div className="w-32 h-[1px] bg-gradient-to-l from-primary to-transparent" />
            </div>

            <div className="absolute bottom-8 left-8 flex flex-col items-start pointer-events-none opacity-40">
                <span className="text-[8px] font-black text-white uppercase tracking-[0.8em] mb-1">Contessa_V8_Prototype</span>
                <div className="w-32 h-[1px] bg-gradient-to-r from-primary to-transparent" />
            </div>
        </div>
    );
};

export default LoadingScreen;
