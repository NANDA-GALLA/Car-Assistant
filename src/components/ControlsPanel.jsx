import React from 'react';
import { useCar } from '../context/CarContext';
import {
    Wind,
    Fan,
    Lightbulb,
    Sun,
    Power,
    Zap,
    ArrowUpCircle,
    Thermometer,
    Plus,
    Minus,
    Navigation,
    LocateFixed,
    Maximize2,
    Layers,
    Umbrella
} from 'lucide-react';
import { motion } from 'framer-motion';

const ControlsPanel = () => {
    const { carState, toggleControl, updateControl } = useCar();

    return (
        <div className="w-full h-full flex flex-col gap-6 overflow-y-auto p-5 scrollbar-hide relative bg-black/20">
            {/* Header section */}
            <div className="relative z-10 px-1 pt-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-black uppercase tracking-tighter text-white flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_10px_#00f2ff]"></span>
                            Systems Control
                        </h2>
                        <span className="text-[10px] font-black text-white/30 tracking-[0.3em] uppercase mt-1">N8-Neural Interface</span>
                    </div>
                    <CpuIcon className="w-8 h-8 text-primary/20" />
                </div>
            </div>

            <div className="grid gap-5 z-10 pb-10">
                {/* 1. NEURAL NAVIGATION - Advanced Radar */}
                <div className={`hud-glass rounded-2xl p-4 transition-all duration-500 group ${carState.navigation ? 'border-primary/40 shadow-[0_0_30px_rgba(0,242,255,0.15)] bg-primary/5' : 'border-white/5'}`}>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg transition-all ${carState.navigation ? 'bg-primary text-black neon-glow-primary' : 'bg-white/5 text-white/40'}`}>
                                <Navigation className={`w-5 h-5 ${carState.navigation ? 'animate-pulse' : ''}`} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black uppercase tracking-widest text-white">Neural Pathing</span>
                                <span className={`text-[9px] font-bold uppercase transition-colors ${carState.navigation ? 'text-primary' : 'text-white/20'}`}>
                                    {carState.navigation ? 'Real-time Sync Active' : 'Offline Mode'}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleControl('navigation')}
                            className={`w-12 h-6 rounded-full relative transition-all duration-500 ${carState.navigation ? 'bg-primary' : 'bg-white/10'}`}
                        >
                            <motion.div
                                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg"
                                animate={{ x: carState.navigation ? 24 : 4 }}
                            />
                        </button>
                    </div>

                    <div className="relative h-32 bg-black/60 rounded-xl overflow-hidden border border-white/5 cyber-border-gradient">
                        {/* Interactive UI Grid */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`absolute w-48 h-48 border border-primary/10 rounded-full ${carState.navigation ? 'animate-ping' : ''}`}></div>
                            <div className="absolute w-32 h-32 border border-primary/5 rounded-full"></div>

                            {/* Scanning Line */}
                            {carState.navigation && (
                                <motion.div
                                    className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(0,242,255,0.15)_90deg,transparent_90deg)]"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />
                            )}

                            <div className="z-10 flex flex-col items-center">
                                <LocateFixed className={`w-6 h-6 mb-1 ${carState.navigation ? 'text-primary scale-110 drop-shadow-[0_0_10px_#00f2ff]' : 'text-white/10'}`} />
                                <span className={`text-[10px] font-black ${carState.navigation ? 'text-primary' : 'text-white/20'} uppercase tracking-[0.2em]`}>
                                    {carState.navigation ? carState.destination : 'Await Input'}
                                </span>
                            </div>
                        </div>

                        {/* Coordinates Overlays */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1 text-[8px] font-mono text-primary/40">
                            <span>LAT: 28.6139° N</span>
                            <span>LON: 77.2090° E</span>
                        </div>
                    </div>
                </div>

                {/* 2. CLIMATE ENGINE - Unified Thermal Control */}
                <div className={`hud-glass rounded-2xl p-4 border-l-4 transition-all duration-500 ${carState.ac ? 'border-primary neon-glow-primary bg-primary/5' : 'border-white/10'}`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-xl transition-all ${carState.ac ? 'bg-primary text-black' : 'bg-white/5 text-white/30'}`}>
                                <Thermometer className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black uppercase text-white tracking-widest leading-none">Thermal Engine</span>
                                <span className="text-[9px] font-bold text-white/20 uppercase mt-1">Biometric Control</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`text-xl font-black font-mono transition-colors ${carState.ac ? 'text-primary' : 'text-white/10'}`}>
                                {carState.temperature}°
                            </span>
                            <button
                                onClick={() => toggleControl('ac')}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${carState.ac ? 'bg-primary/20 text-primary border border-primary/50' : 'bg-white/5 text-white/20 border border-white/10'}`}
                            >
                                <Power className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={!carState.ac}
                            onClick={() => updateControl('temperature', carState.temperature - 1)}
                            className="flex-1 h-12 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center group/btn hover:border-primary/40 disabled:opacity-20 transition-all"
                        >
                            <Minus className="w-5 h-5 text-white/40 group-hover/btn:text-primary transition-colors" />
                        </button>
                        <button
                            disabled={!carState.ac}
                            onClick={() => updateControl('temperature', carState.temperature + 1)}
                            className="flex-1 h-12 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center group/btn hover:border-primary/40 disabled:opacity-20 transition-all"
                        >
                            <Plus className="w-5 h-5 text-white/40 group-hover/btn:text-primary transition-colors" />
                        </button>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-primary-dark"
                            initial={{ width: '0%' }}
                            animate={{ width: carState.ac ? `${((carState.temperature - 16) / 14) * 100}%` : '0%' }}
                        />
                    </div>
                </div>

                {/* 3. LIGHTING ARRAY - Interior & Surface */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => toggleControl('interiorLight')}
                        className={`hud-glass p-4 rounded-2xl border transition-all duration-500 overflow-hidden group ${carState.interiorLight ? 'border-secondary neon-glow-secondary bg-secondary/10' : 'border-white/5'}`}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${carState.interiorLight ? 'bg-secondary text-white shadow-[0_0_20px_#7000ff]' : 'bg-white/5 text-white/20'}`}>
                                <Lightbulb className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${carState.interiorLight ? 'text-secondary' : 'text-white/40'}`}>Interior</span>
                                <span className="text-[8px] font-bold text-white/20 uppercase">Mood Glow</span>
                            </div>
                        </div>
                        {carState.interiorLight && (
                            <motion.div
                                className="absolute inset-0 bg-secondary/5"
                                animate={{ opacity: [0, 0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}
                    </button>

                    <button
                        onClick={() => toggleControl('externalLight')}
                        className={`hud-glass p-4 rounded-2xl border transition-all duration-500 overflow-hidden group ${carState.externalLight ? 'border-primary neon-glow-primary bg-primary/10' : 'border-white/5'}`}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${carState.externalLight ? 'bg-primary text-black shadow-[0_0_20px_#00f2ff]' : 'bg-white/5 text-white/20'}`}>
                                <Zap className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${carState.externalLight ? 'text-primary' : 'text-white/40'}`}>External</span>
                                <span className="text-[8px] font-bold text-white/20 uppercase">Photon Array</span>
                            </div>
                        </div>
                    </button>
                </div>

                {/* 4. AERO ROOF - Unique Multi-state Switch */}
                <div className="hud-glass p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg transition-all ${carState.sunroof !== 'closed' ? 'bg-primary text-black neon-glow-primary' : 'bg-white/5 text-white/30'}`}>
                            <Layers className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black uppercase text-white tracking-widest leading-none">Aero Glass</span>
                            <span className="text-[9px] font-bold text-white/20 uppercase mt-1">Sunroof Aperture</span>
                        </div>
                    </div>

                    <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                        {['closed', 'partial', 'open'].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => updateControl('sunroof', mode)}
                                className={`flex-1 py-3 rounded-lg flex flex-col items-center gap-1.5 transition-all duration-300 relative ${carState.sunroof === mode
                                    ? 'bg-primary text-black neon-glow-primary z-10'
                                    : 'text-white/20 hover:text-white/40'
                                    }`}
                            >
                                <span className="text-[9px] font-black uppercase tracking-tighter leading-none">{mode}</span>
                                {mode === 'closed' && <Maximize2 className="w-3.5 h-3.5" />}
                                {mode === 'partial' && <Umbrella className="w-3.5 h-3.5" />}
                                {mode === 'open' && <Sun className="w-3.5 h-3.5" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 5. AMBIENT SIGNATURE */}
                <button
                    onClick={() => toggleControl('generalLight')}
                    className={`hud-glass p-4 rounded-2xl flex items-center justify-between border transition-all duration-500 overflow-hidden ${carState.generalLight ? 'border-primary shadow-[inset_0_0_20px_rgba(0,242,255,0.1)]' : 'border-white/5'}`}
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${carState.generalLight ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10 text-white/30'}`}>
                            <SparklesIcon className={`w-5 h-5 ${carState.generalLight ? 'animate-pulse' : ''}`} />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className={`text-xs font-black uppercase tracking-widest ${carState.generalLight ? 'text-white' : 'text-white/40'}`}>Ambient Signature</span>
                            <span className="text-[9px] font-bold text-primary/40 uppercase">Aura Sync</span>
                        </div>
                    </div>
                    <div className={`w-1.5 h-6 rounded-full ${carState.generalLight ? 'bg-primary shadow-[0_0_10px_#00f2ff] animate-pulse' : 'bg-white/5'}`}></div>
                </button>

                {/* SYSTEM IGNITION */}
                <div className="mt-4 pt-6 border-t border-white/5">
                    <button
                        onClick={() => toggleControl('engine')}
                        className={`w-full py-6 rounded-3xl flex flex-col items-center transition-all duration-700 group overflow-hidden relative border-2 ${carState.engine
                            ? 'bg-red-900/20 border-red-500/50 text-red-500 neon-glow-red'
                            : 'bg-green-900/10 border-green-500/20 text-green-500'
                            }`}
                    >
                        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full ${carState.engine ? 'animate-[scan_2s_linear_infinite]' : ''}`}></div>

                        <Power className={`w-8 h-8 mb-2 ${carState.engine ? 'animate-pulse' : 'group-hover:rotate-12 transition-transform'}`} />
                        <span className="text-sm font-black uppercase tracking-[0.3em]">{carState.engine ? 'Terminate Systems' : 'Initiate Ignition'}</span>
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mt-1">N8 Neural Link Engaged</span>
                    </button>
                </div>
            </div>

            <div className="fixed right-0 top-1/2 -translate-y-1/2 w-[1px] h-64 bg-gradient-to-b from-transparent via-primary/30 to-transparent pointer-events-none"></div>
        </div>
    );
};

const CpuIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6v6H9z" />
        <path d="M15 2v2M9 2v2M15 20v2M9 20v2M20 15h2M20 9h2M2 15h2M2 9h2" />
    </svg>
);

const SparklesIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m12 3 1.912 5.885L20 10.8l-6.088 1.915L12 18.6l-1.912-5.885L4 10.8l6.088-1.915L12 3Z" />
        <path d="M5 3v4M3 5h4M21 17v4M19 19h4M21 3v4M19 5h4M5 17v4M3 19h4" />
    </svg>
);

export default ControlsPanel;
