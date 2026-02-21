import React from 'react';
import { useCar } from '../context/CarContext';
import { motion, AnimatePresence } from 'framer-motion';

const CarVisualizer = () => {
    const { carState, theme } = useCar();

    return (
        <div className="relative w-full h-[400px] flex items-center justify-center bg-transparent overflow-hidden">
            {/* HUD Environment - A more "Pro" stage */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`absolute bottom-10 w-[800px] h-[100px] blur-[80px] rounded-full ${theme === 'dark' ? 'bg-primary/5' : 'bg-primary/20'}`}></div>
                <div className={`absolute w-[600px] h-[2px] bottom-[15%] bg-gradient-to-r from-transparent via-primary/20 to-transparent`}></div>

                {/* Circular HUD stage elements */}
                <div className={`absolute w-[700px] h-[700px] border rounded-full rotate-x-60 animate-[spin_60s_linear_infinite] ${theme === 'dark' ? 'border-primary/5' : 'border-primary/10'}`}></div>
                <div className={`absolute w-[500px] h-[500px] border rounded-full rotate-x-60 animate-[spin_30s_linear_reverse_infinite] ${theme === 'dark' ? 'border-primary/10' : 'border-primary/20'}`}></div>
            </div>

            {/* Realistic Car Body (Contessa Concept) */}
            <div className="relative z-10 w-[700px] h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <svg viewBox="0 0 800 350" className="w-full h-full">
                    <defs>
                        {/* Metallic Body Gradient */}
                        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={theme === 'dark' ? "#1a1c1e" : "#cbd5e1"} />
                            <stop offset="45%" stopColor={theme === 'dark' ? "#2c3035" : "#f8fafc"} />
                            <stop offset="50%" stopColor={theme === 'dark' ? "#121416" : "#94a3b8"} />
                            <stop offset="100%" stopColor={theme === 'dark' ? "#08090a" : "#64748b"} />
                        </linearGradient>

                        {/* Chrome Reflection */}
                        <linearGradient id="chromeReflect" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="45%" stopColor={theme === 'dark' ? "rgba(0,242,255,0.1)" : "rgba(8,145,178,0.2)"} />
                            <stop offset="50%" stopColor={theme === 'dark' ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.5)"} />
                            <stop offset="55%" stopColor={theme === 'dark' ? "rgba(0,242,255,0.1)" : "rgba(8,145,178,0.2)"} />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>

                        {/* Headlight Beam */}
                        <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00f2ff" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#00f2ff" stopOpacity="0" />
                        </linearGradient>

                        {/* Interior Glow */}
                        <radialGradient id="interiorGlow">
                            <stop offset="0%" stopColor="#00f2ff" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#00f2ff" stopOpacity="0" />
                        </radialGradient>

                        {/* Sunroof Glow */}
                        <linearGradient id="sunroofGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00f2ff" stopOpacity="0.1" />
                            <stop offset="50%" stopColor="#00f2ff" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#00f2ff" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>

                    {/* Floor Reflection */}
                    <g transform="scale(1, -0.2) translate(0, -1450)" opacity="0.3" filter="blur(8px)">
                        <path
                            d="M50 240 L50 200 L100 200 L120 180 L250 180 L300 120 L550 120 L620 180 L740 180 L750 200 L750 240 Z"
                            fill="url(#bodyGradient)"
                        />
                    </g>

                    {/* Shadow under car - Soft Ambient Occlusion */}
                    <ellipse cx="400" cy="285" rx="380" ry="20" fill="rgba(0,0,0,0.6)" filter="blur(10px)" />

                    {/* Main Body Chassis */}
                    <path
                        d="M60 250 L60 210 L100 205 L130 180 L240 175 L310 120 L560 120 L630 180 L740 185 L760 210 L760 250 L750 260 L70 260 Z"
                        fill="url(#bodyGradient)"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="0.5"
                    />

                    {/* Elite Tactical Sunroof Assembly */}
                    <g transform="translate(360, 116)">
                        {/* Sunroof Recess (Interior Depth) */}
                        <rect width="160" height="4" rx="2" fill="#050505" />

                        {/* Dynamic Glass Panel */}
                        <motion.g
                            initial={false}
                            animate={{
                                x: carState.sunroof === 'open' ? 100 : (carState.sunroof === 'partial' ? 40 : 0),
                                y: carState.sunroof === 'closed' ? 0 : -2, // Realistic pop-up lift
                                rotate: carState.sunroof === 'partial' ? -1 : 0 // Subtle aerodynamic tilt
                            }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                        >
                            {/* Glass Panel Body */}
                            <rect
                                width="160" height="4" rx="2"
                                fill={theme === 'dark' ? "url(#bodyGradient)" : "#cbd5e1"}
                                stroke={theme === 'dark' ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)"}
                                strokeWidth="0.5"
                                className="transition-colors duration-500"
                            />

                            {/* Realistic Glass Reflection */}
                            <rect width="40" height="1.5" x="10" y="1" fill="white" fillOpacity="0.1" rx="0.5" />

                            {/* Operational Glow */}
                            <AnimatePresence>
                                {carState.sunroof !== 'closed' && (
                                    <motion.rect
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.6 }}
                                        exit={{ opacity: 0 }}
                                        width="160" height="4" rx="2"
                                        fill="url(#sunroofGlow)"
                                        className="cinematic-glow"
                                    />
                                )}
                            </AnimatePresence>
                        </motion.g>

                        {/* Rail Guides */}
                        <rect width="160" height="0.5" y="3.5" fill="rgba(255,255,255,0.05)" />
                    </g>

                    {/* Side Body Crease (Aerodynamics) */}
                    <path
                        d="M130 210 Q400 205 740 215"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                    />

                    {/* Door Handle Details */}
                    <rect x="420" y="195" width="40" height="4" rx="2" fill="#080808" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

                    {/* Fuel Cap */}
                    <circle cx="680" cy="205" r="8" fill="#080808" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

                    {/* Windows - More realistic glass */}
                    <g>
                        {/* Front Side Window */}
                        <path
                            d="M325 130 L435 130 L435 174 L325 174 Z"
                            fill={carState.interiorLight ? "url(#interiorGlow)" : (theme === 'dark' ? "#05070a" : "#e2e8f0")}
                            stroke={theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.2)"}
                            className="transition-all duration-700"
                        />
                        {/* Rear Side Window */}
                        <path
                            d="M450 130 L545 130 L600 174 L450 174 Z"
                            fill={carState.interiorLight ? "url(#interiorGlow)" : (theme === 'dark' ? "#05070a" : "#e2e8f0")}
                            stroke={theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.2)"}
                            className="transition-all duration-700"
                        />
                        {/* Glass Reflection streak */}
                        <path d="M330 135 L400 135 L330 170 Z" fill={theme === 'dark' ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.4)"} />
                    </g>

                    {/* Front Headlights - High Detail Beam */}
                    <g>
                        <rect x="65" y="215" width="25" height="18" rx="2" fill={theme === 'dark' ? "#151719" : "#cbd5e1"} />
                        <AnimatePresence>
                            {carState.externalLight && (
                                <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {/* Light Flare */}
                                    <circle cx="77" cy="224" r="10" fill="#00f2ff" filter="blur(5px)" />
                                    {/* Beam */}
                                    <path
                                        d="M65 215 L-200 160 L-200 300 L65 233 Z"
                                        fill="url(#headlightBeam)"
                                        opacity={theme === 'dark' ? 0.4 : 0.2}
                                    />
                                </motion.g>
                            )}
                        </AnimatePresence>

                        {/* Tactical AC Vents - Dynamic Pulses */}
                        <AnimatePresence>
                            {carState.ac && (
                                <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <circle cx="280" cy="185" r="3" fill="#00f2ff">
                                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="300" cy="182" r="3" fill="#00f2ff">
                                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="0.5s" />
                                        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" begin="0.5s" />
                                    </circle>
                                    <path d="M270 185 Q290 170 310 185" fill="none" stroke="#00f2ff" strokeWidth="0.5" opacity="0.3" strokeDasharray="2,2" />
                                </motion.g>
                            )}
                        </AnimatePresence>
                    </g>

                    {/* Tail Lights - Glowing LED strip */}
                    <rect x="745" y="210" width="15" height="30" rx="2" fill={theme === 'dark' ? "#1a0505" : "#334155"} />
                    <rect
                        x="750" y="215" width="10" height="20" rx="1"
                        fill={carState.engine ? "#ff0000" : (theme === 'dark' ? "#440000" : "#64748b")}
                        className="transition-all duration-500 shadow-[0_0_15px_red]"
                    />
                    {carState.engine && (
                        <circle cx="755" cy="225" r="12" fill="rgba(255,0,0,0.3)" filter="blur(4px)" className="animate-pulse" />
                    )}

                    {/* Rims & Tyres - Detailed alloys */}
                    <g>
                        {/* Front Wheel */}
                        <circle cx="180" cy="260" r="42" fill="#08090a" /> {/* Tyre */}
                        <circle cx="180" cy="260" r="30" fill="#121416" stroke="#222" strokeWidth="2" /> {/* Rim Edge */}
                        {/* Spoke pattern */}
                        <g opacity="0.6">
                            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                                <line
                                    key={deg}
                                    x1="180" y1="260"
                                    x2={180 + 25 * Math.cos(deg * Math.PI / 180)}
                                    y2={260 + 25 * Math.sin(deg * Math.PI / 180)}
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="2"
                                />
                            ))}
                        </g>
                        <motion.circle
                            animate={carState.engine ? { opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            cx="180" cy="260" r="8" fill={carState.engine ? "#00f2ff" : "#1a1c1e"}
                        />

                        {/* Rear Wheel */}
                        <circle cx="620" cy="260" r="42" fill="#08090a" />
                        <circle cx="620" cy="260" r="30" fill="#121416" stroke="#222" strokeWidth="2" />
                        <g opacity="0.6">
                            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                                <line
                                    key={deg}
                                    x1="620" y1="260"
                                    x2={620 + 25 * Math.cos(deg * Math.PI / 180)}
                                    y2={260 + 25 * Math.sin(deg * Math.PI / 180)}
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="2"
                                />
                            ))}
                        </g>
                        <motion.circle
                            animate={carState.engine ? { opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            cx="620" cy="260" r="8" fill={carState.engine ? "#00f2ff" : "#1a1c1e"}
                        />
                    </g>
                </svg>

                {/* Tactical Status Floating Display */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full flex justify-between px-10">
                    <div className="flex flex-col items-center">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-1">Stability</span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 1].map((v, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 h-3 bg-primary/20 rounded-full"
                                    animate={carState.engine ? { height: [4, 12, 4], opacity: [0.2, 1, 0.2] } : {}}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-1">Aero Drag</span>
                        <div className="text-[10px] font-black text-primary font-mono tracking-tighter">0.29 CD</div>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-1">G-Force</span>
                        <div className="text-[10px] font-black text-secondary font-mono tracking-tighter">1.02 G</div>
                    </div>
                </div>
            </div>

            {/* AC Flow Effect - Dynamic Reflection */}
            <AnimatePresence>
                {carState.ac && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute w-[400px] h-[150px] bg-primary/5 blur-[60px] top-[15%] rounded-full z-0 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* Interior Light Leakage - Extra Realism */}
            <AnimatePresence>
                {carState.interiorLight && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute w-[300px] h-[100px] bg-primary/10 blur-[50px] top-[40%] rounded-full z-0"
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CarVisualizer;
