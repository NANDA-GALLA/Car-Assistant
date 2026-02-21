import React, { useState, useEffect } from 'react';
import {
    User,
    Bell,
    Wifi,
    Signal,
    Settings,
    Search,
    Compass,
    Cpu,
    Hexagon,
    Shield,
    Orbit,
    Sun,
    Moon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useCar } from '../context/CarContext';

const Navbar = () => {
    const { theme, toggleTheme, carState, toggleDriveMode } = useCar();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const StatusOrb = ({ icon: Icon, active = true, color = "primary" }) => (
        <div className="relative group px-1">
            <div className={`absolute inset-0 bg-${color}/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
            <div className={`relative px-2 py-1 flex items-center gap-1.5 rounded-md border border-white/5 bg-black/40 transition-all duration-300 group-hover:border-${color}/40`}>
                <Icon className={`w-3.5 h-3.5 ${active ? `text-${color}` : 'text-white/10'}`} />
                <div className={`w-1 h-1 rounded-full ${active ? `bg-${color} animate-pulse shadow-[0_0_5px_currentColor]` : 'bg-white/10'}`}></div>
            </div>
        </div>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 h-28 z-50 pointer-events-none overflow-hidden">
            {/* Background HUD Cinematic Elements */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/90 to-transparent"></div>

            {/* Main Navigation Chassis */}
            <div className="max-w-[1800px] mx-auto h-full flex items-start justify-between px-10 pt-4 relative">

                {/* 1. LEFT: NEURAL CORE ARCHITECTURE (Redesigned Shard Module) */}
                <div className="flex flex-col gap-3 pointer-events-auto">
                    <div className="flex items-center gap-0">
                        {/* Primary Brand Shard */}
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="relative group cursor-pointer"
                        >
                            <div className="hud-glass p-0.5 rounded-l-2xl [clip-path:polygon(0_0,100%_0,85%_100%,0%_100%)]">
                                <div className="bg-black/80 px-8 py-4 flex items-center gap-4 [clip-path:polygon(0_0,100%_0,85%_100%,0%_100%)] border-r-4 border-primary">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                                        <Hexagon className="w-10 h-10 text-primary/30 fill-primary/5 animate-[spin_15s_linear_infinite]" />
                                        <Cpu className="absolute inset-0 m-auto w-5 h-5 text-primary drop-shadow-[0_0_10px_#00f2ff]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="text-xl font-black text-white italic tracking-[0.3em] uppercase leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                            Contessa V8
                                        </h1>
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{ opacity: [0.2, 1, 0.2] }}
                                                        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                                                        className={`w-1.5 h-3 ${i < 4 ? 'bg-primary' : 'bg-white/10'}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[8px] font-black text-primary/80 uppercase tracking-widest">Core integrity: 84%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Drive Mode Shard - Interactive */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            onClick={toggleDriveMode}
                            className="relative -ml-6 group cursor-pointer pointer-events-auto"
                        >
                            <div className="hud-glass p-0.5 rounded-r-xl [clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)]">
                                <div className="bg-black/60 pl-12 pr-8 py-4 flex flex-col justify-center [clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)] border-l border-white/10 group-hover:bg-primary/5 transition-all">
                                    <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.4em]">Drive Mode</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Orbit className="w-4 h-4 text-secondary animate-spin-slow" />
                                        <span className="text-sm font-black text-secondary uppercase tracking-tighter drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]">
                                            {carState.driveMode}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Mode Accent Glow */}
                            <div className={`absolute top-0 right-0 w-1 h-full shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-500 ${carState.driveMode === 'SPORT' ? 'bg-red-500 shadow-red-500/50' :
                                    carState.driveMode === 'STEALTH' ? 'bg-white/20' : 'bg-secondary'
                                }`}></div>
                        </motion.div>
                    </div>

                    {/* Connectivity & Unique Status EQ */}
                    <div className="flex items-center gap-3 pl-4 h-6">
                        <div className="flex items-center gap-1.5">
                            <StatusOrb icon={Signal} label="NET" color="primary" />
                            <StatusOrb icon={Wifi} label="WIFI" color="primary" />
                            <StatusOrb icon={Shield} label="SEC" color="secondary" />
                        </div>

                        <div className="flex items-center gap-1 h-full px-2 border-l border-white/5">
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-0.5 bg-primary/40"
                                    animate={{
                                        height: [4, Math.random() * 12 + 4, 4],
                                    }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                />
                            ))}
                            <span className="text-[6px] font-black text-primary ml-1 uppercase opacity-40">Tactical_EQ</span>
                        </div>
                    </div>
                </div>

                {/* 2. CENTER: THE CHRONOS MONOLITH (Dominant Central Piece) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-2 pointer-events-auto">
                    <div className="relative flex flex-col items-center">
                        {/* Top Accent bar */}
                        <div className="w-48 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-[1px]"></div>

                        <div className="hud-glass px-14 py-4 rounded-b-3xl border-t-0 border-x-primary/20 border-b-primary/30 relative overflow-hidden group">

                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[9px] font-black text-primary tracking-[0.6em] uppercase opacity-40">Tactical Time</span>
                                <div className="text-5xl font-black text-white font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                                </div>
                                <div className="flex items-center gap-4 mt-1">
                                    <div className="flex items-center gap-1 text-[8px] font-black text-white/40 uppercase tracking-widest">
                                        <Compass className="w-3 h-3 text-secondary" />
                                        <span>North-East</span>
                                    </div>
                                    <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                                    <div className="flex items-center gap-1 text-[8px] font-black text-white/40 uppercase tracking-widest">
                                        <Orbit className="w-3 h-3 text-primary animate-spin-slow" />
                                        <span>42.8° Lat</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Glow */}
                        <div className="w-64 h-12 bg-primary/5 blur-3xl absolute -bottom-10 pointer-events-none"></div>
                    </div>
                </div>

                {/* 3. RIGHT: COMMAND SERVICES POD (Symmetric Angle) */}
                <div className="flex items-center gap-6 pointer-events-auto">
                    {/* Action Hub */}
                    <div className="flex items-center gap-2 glass-card p-1 border-white/5 bg-black/20">
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary/10 text-white/30 hover:text-primary transition-all group">
                            <Search className="w-4 h-4 group-hover:scale-110" />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary/10 text-white/30 hover:text-primary transition-all group relative">
                            <Bell className="w-4 h-4 group-hover:rotate-12" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-secondary rounded-full border-2 border-black pulse-fast"></span>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary/10 text-white/30 hover:text-primary transition-all group">
                            <Settings className="w-4 h-4 group-hover:rotate-45" />
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary/10 text-white/30 hover:text-primary transition-all group"
                            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4 h-4 animate-pulse" />
                            ) : (
                                <Moon className="w-4 h-4 text-indigo-400" />
                            )}
                        </button>
                    </div>

                    {/* Elite User Profile (Polygon Shape) */}
                    <div className="relative group cursor-pointer">
                        <div className="hud-glass [clip-path:polygon(15%_0%,100%_0%,100%_100%,0%_100%)] p-[2px]">
                            <div className="bg-black/60 [clip-path:polygon(15%_0%,100%_0%,100%_100%,0%_100%)] flex items-center gap-4 pl-8 pr-4 py-2 border-l-4 border-secondary/50 group-hover:bg-secondary/5 transition-all">
                                <div className="flex flex-col items-end">
                                    <span className="text-[8px] font-black text-secondary tracking-widest uppercase">Operator</span>
                                    <span className="text-xs font-black text-white uppercase tracking-tighter">G. Nanda</span>
                                </div>
                                <div className="relative w-10 h-10">
                                    <div className="absolute inset-0 border-2 border-secondary/20 rounded-full group-hover:border-secondary/60 animate-[spin_4s_linear_infinite]"></div>
                                    <div className="absolute inset-1 border border-white/10 rounded-full"></div>
                                    <div className="absolute inset-0 m-auto w-full h-full p-1">
                                        <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
                                            <User className="w-6 h-6 text-white/40 group-hover:text-secondary transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* HUD Detail: Perimeter scanning line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </nav>
    );
};

export default Navbar;
