import React from 'react';
import { useCar } from '../context/CarContext';
import {
    History,
    Sparkles,
    Activity,
    Zap,
    Terminal,
    CheckCircle2,
    Clock,
    Database,
    ShieldCheck,
    Fuel
} from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const InfoPanel = () => {
    const { history, clearHistory } = useCar();

    const commandGuide = [
        { category: "Thermal", cmds: ["AC ON", "TEMP 22°"] },
        { category: "Ignition", cmds: ["START", "STOP"] },
        { category: "Pathing", cmds: ["ROUTE TO...", "NAV OFF"] },
        { category: "Photon", cmds: ["LIGHTS ON", "AMBIENT"] }
    ];

    return (
        <div className="w-full h-full flex flex-col gap-6 overflow-hidden p-5 scrollbar-hide bg-black/40">
            {/* 1. TOP MODULE: NEURAL STATUS & FUEL INDUCTION */}
            <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-secondary animate-pulse" />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Core Metrics</h2>
                    </div>
                </div>

                <div className="grid gap-3">
                    {/* Neural Integrity Card */}
                    <div className="hud-glass p-4 rounded-2xl border border-white/5 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                            <ShieldCheck className="w-10 h-10 text-primary" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Neural Core</span>
                                    <span className="text-xl font-black text-primary drop-shadow-[0_0_8px_rgba(0,242,255,0.4)]">98.4%</span>
                                </div>
                                <div className="flex gap-1 h-8 items-end pb-1">
                                    {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1 bg-primary/40 rounded-full"
                                            animate={{ height: [`${h * 100}%`, `${(h * 0.5) * 100}%`, `${h * 100}%`] }}
                                            transition={{ duration: i + 1, repeat: Infinity }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: "98.4%" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Fuel Induction Card */}
                    <div className="hud-glass p-4 rounded-2xl border border-white/5 relative group overflow-hidden bg-gradient-to-br from-orange-500/5 to-transparent">
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                            <Fuel className="w-10 h-10 text-orange-500" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Fuel Induction</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-black text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">OPTIMAL</span>
                                        <span className="text-[8px] font-bold text-orange-500/50 uppercase border border-orange-500/20 px-1.5 py-0.5 rounded">Stage 2</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[8px] font-black text-white/40 uppercase">Flow Rate</span>
                                    <span className="text-[10px] font-mono text-white/80 tabular-nums">4.2 L/m</span>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden flex gap-0.5">
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="h-full flex-1 bg-orange-500/20 rounded-sm"
                                        animate={{
                                            backgroundColor: i < 9 ? ["rgba(249,115,22,0.6)", "rgba(249,115,22,0.2)", "rgba(249,115,22,0.6)"] : "rgba(255,255,255,0.05)"
                                        }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. COMMAND REFERENCE (Neural Dictate) */}
            <section className="flex flex-col gap-3">
                <div className="flex items-center gap-2 px-1">
                    <Terminal className="w-4 h-4 text-primary" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Neural Dictate</h2>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {commandGuide.map((group, i) => (
                        <div key={i} className="hud-glass p-2.5 rounded-xl border border-white/5 hover:border-primary/30 transition-all">
                            <h3 className="text-[8px] font-black text-primary/60 uppercase tracking-widest mb-1.5">{group.category}</h3>
                            <div className="flex flex-col gap-1">
                                {group.cmds.map((cmd, j) => (
                                    <span key={j} className="text-[9px] font-bold text-white/70 flex items-center gap-1.5">
                                        <Zap className="w-2 h-2 text-white/20" />
                                        {cmd}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. SYSTEM LOGS (Formerly History) */}
            <section className="flex-1 flex flex-col gap-3 min-h-0">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-primary" />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">System Logs</h2>
                    </div>
                    <button
                        onClick={clearHistory}
                        className="text-[8px] font-black uppercase tracking-tighter text-white/20 hover:text-red-500 transition-colors px-2 py-1 rounded border border-white/5 hover:border-red-500/30"
                    >
                        Purge Logs
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                    <AnimatePresence initial={false}>
                        {history.length === 0 ? (
                            <div className="hud-glass p-8 rounded-2xl flex flex-col items-center justify-center border-dashed border-white/10 opacity-40">
                                <History className="w-8 h-8 mb-2" />
                                <p className="text-[10px] uppercase font-black tracking-widest">No Log Data</p>
                            </div>
                        ) : (
                            history.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="hud-glass p-3 rounded-xl border border-white/5 group relative overflow-hidden"
                                >
                                    {/* Success glow background */}
                                    <div className={`absolute inset-0 opacity-[0.03] ${item.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />

                                    <div className="flex items-start justify-between relative z-10">
                                        <div className="flex items-start gap-3">
                                            <div className={`mt-1 p-1 rounded backdrop-blur-md ${item.status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                <CheckCircle2 className="w-3 h-3" />
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-[11px] font-black uppercase tracking-tight text-white/90 leading-tight">
                                                    {item.command}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Clock className="w-2.5 h-2.5 text-white/20" />
                                                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-tighter">
                                                        {format(item.timestamp, 'HH:mm:ss')} • TICK-{idx + 100}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${item.status === 'success' ? 'border-green-500/20 text-green-500 bg-green-500/5' : 'border-red-500/20 text-red-500 bg-red-500/5'}`}>
                                            {item.status === 'success' ? 'OK' : 'ERR'}
                                        </div>
                                    </div>

                                    {/* HUD accent line */}
                                    <div className={`absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent ${item.status === 'success' ? 'via-green-500/30' : 'via-red-500/30'} to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Bottom hud border detail */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-12 h-1 bg-white/10 rounded-full blur-[2px]"></div>
        </div>
    );
};

export default InfoPanel;
