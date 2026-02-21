import React, { useState, useRef, useEffect } from 'react';
import { useCar } from '../context/CarContext';
import { Mic, Send, Bot, User, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AssistantPanel = () => {
    const { messages, addMessage, toggleControl, updateControl, clearMessages } = useCar();
    const [inputText, setInputText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;
        processCommand(inputText);
        setInputText("");
    };

    const processCommand = (text) => {
        addMessage("user", text);

        // Simulate NLP Intent Detection
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let response = "Neural engine recognized the input, but no specific tactical command was detected. Please use English or common regional variations.";
            let actionTaken = false;

            // Pattern Matching Logic (Key combinations for natural language)
            const hasAC = (lowerText.includes("ac") && !lowerText.includes("ace")) || lowerText.includes("clima") || lowerText.includes("aire") || lowerText.includes("klimaanlage");
            const hasLight = lowerText.includes("light") || lowerText.includes("bulb") || lowerText.includes("luces") || lowerText.includes("lumiere") || lowerText.includes("licht");
            const hasSunroof = lowerText.includes("sunroof") || lowerText.includes("techo") || lowerText.includes("toit") || lowerText.includes("schiebedach");
            const hasEngine = lowerText.includes("engine") || lowerText.includes("motor") || lowerText.includes("moteur") || lowerText.includes("gaadi");

            const isOn = lowerText.includes("on") || lowerText.includes("chalao") || lowerText.includes("start") || lowerText.includes("encender") || lowerText.includes("an") || lowerText.includes("jalao") || lowerText.includes("open") || lowerText.includes("kholo") || lowerText.includes("activate");
            const isOff = lowerText.includes("off") || lowerText.includes("band") || lowerText.includes("stop") || lowerText.includes("apagar") || lowerText.includes("aus") || lowerText.includes("close") || lowerText.includes("zu") || lowerText.includes("shut") || lowerText.includes("deactivate");

            if (hasAC && isOn) {
                updateControl('ac', true);
                response = "Neural link confirmed. Activating climate control system.";
                actionTaken = true;
            } else if (hasAC && isOff) {
                updateControl('ac', false);
                response = "Received. Deactivating air conditioning unit.";
                actionTaken = true;
            } else if (hasLight && isOn) {
                updateControl('interiorLight', true);
                response = "Acknowledged. Interior photon array is now online.";
                actionTaken = true;
            } else if (hasLight && isOff) {
                updateControl('interiorLight', false);
                response = "Dark mode engaged. Switching off internal lighting.";
                actionTaken = true;
            } else if (hasSunroof && isOn) {
                updateControl('sunroof', 'open');
                response = "Opening the tactical sunroof. Depressurizing cabin.";
                actionTaken = true;
            } else if (hasSunroof && isOff) {
                updateControl('sunroof', 'closed');
                response = "Securing sunroof module. Cabin is now sealed.";
                actionTaken = true;
            } else if (hasEngine && isOn) {
                updateControl('engine', true);
                response = "V8 Ignition confirmed. All systems at optimal status.";
                actionTaken = true;
            } else if (hasEngine && isOff) {
                updateControl('engine', false);
                response = "Terminating drive core. Powering down systems.";
                actionTaken = true;
            }

            // Temperature Detection
            const tempMatch = lowerText.match(/\d+/);
            if (lowerText.includes("temp") && tempMatch) {
                const newTemp = parseInt(tempMatch[0]);
                if (newTemp >= 16 && newTemp <= 30) {
                    updateControl('temperature', newTemp);
                    response = `Setting the cabin temperature to ${newTemp}°C.`;
                    actionTaken = true;
                } else {
                    response = "I can only set the temperature between 16°C and 30°C.";
                    actionTaken = true;
                }
            }

            // Navigation Detection
            if (lowerText.includes("navigation to") || lowerText.includes("route to") || lowerText.includes("maps to") || (lowerText.includes("navigation") && lowerText.includes("set")) || (lowerText.includes("maps") && lowerText.includes("set"))) {
                let destination = "HOME BASE";
                if (lowerText.includes("to")) {
                    destination = lowerText.split("to")[1].trim().toUpperCase();
                } else if (lowerText.includes("maps")) {
                    const parts = lowerText.split("maps");
                    if (parts[1]) destination = parts[1].trim().toUpperCase();
                } else {
                    const parts = lowerText.split("navigation");
                    if (parts[1]) destination = parts[1].trim().toUpperCase();
                }

                if (destination) {
                    updateControl('navigation', true);
                    updateControl('destination', destination);
                    response = `Neural Pathing engaged. Navigating to ${destination}.`;
                    actionTaken = true;
                }
            } else if (lowerText.includes("navigation on") || lowerText.includes("navigation chalao")) {
                updateControl('navigation', true);
                response = "Neural Navigation is now online.";
                actionTaken = true;
            } else if (lowerText.includes("navigation off") || lowerText.includes("navigation band")) {
                updateControl('navigation', false);
                response = "Navigation system has been deactivated.";
                actionTaken = true;
            } else if (lowerText.includes("help") || lowerText.includes("commands") || lowerText.includes("madad") || lowerText.includes("ayuda") || lowerText.includes("aide")) {
                response = "Neural Universal Translation is active. I recognize commands in English, Spanish, French, Hindi, and more globally. I will only reply in English for tactical clarity.";
                actionTaken = true;
            }

            addMessage("assistant", response);
            speak(response);
        }, 1000);
    };

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.pitch = 1;
            utterance.rate = 1;
            window.speechSynthesis.speak(utterance);
        }
    };

    const toggleVoice = () => {
        if (!isListening) {
            startListening();
        } else {
            stopListening();
        }
    };

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN'; // Supports Indlish/Code-mixed better
        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            processCommand(transcript);
            setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);
    };

    return (
        <div className="flex-1 flex flex-col h-full min-h-0 pb-6">
            {/* Messages Display */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-2 custom-scrollbar">
                {messages.map((msg, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-primary/20 border border-primary/40' : 'bg-secondary/20 border border-secondary/40'
                                }`}>
                                {msg.role === 'user' ? <User className="w-4 h-4 text-primary" /> : <Bot className="w-4 h-4 text-secondary" />}
                            </div>
                            <div className={`p-3 rounded-2xl ${msg.role === 'user'
                                ? 'bg-primary/10 border border-primary/20 rounded-tr-none'
                                : 'bg-white/5 border border-white/10 rounded-tl-none'
                                }`}>
                                <p className="text-sm leading-relaxed text-white/90">{msg.text}</p>
                                <p className="text-[10px] text-white/30 mt-1 uppercase">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Tactical Input Console - Integrated Redesign */}
            <div className="relative group mt-auto">
                {/* Visual Oscillator when listening */}
                <AnimatePresence>
                    {isListening && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: 10 }}
                            className="absolute -top-20 left-4 right-4 h-16 flex items-center justify-center gap-1.5 backdrop-blur-2xl bg-primary/10 rounded-2xl border border-primary/30 z-20 shadow-[0_-20px_40px_-15px_rgba(0,242,255,0.15)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
                            {[...Array(30)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 rounded-full bg-primary"
                                    animate={{
                                        height: [8, Math.random() * 40 + 8, 8],
                                        opacity: [0.3, 1, 0.3]
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        repeat: Infinity,
                                        delay: i * 0.03
                                    }}
                                />
                            ))}
                            <span className="absolute bottom-1.5 text-[7px] font-black text-primary uppercase tracking-[0.4em] animate-pulse">Neural Audio Scan Active</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={`relative transition-all duration-700 ${isListening ? 'scale-[1.02]' : ''}`}>
                    {/* Integrated Frame with Custom Angles */}
                    <div className={`relative hud-glass p-1 rounded-2xl border-2 transition-all duration-500 overflow-hidden ${isListening ? 'border-primary shadow-[0_0_50px_rgba(0,242,255,0.2)]' : 'border-white/10'
                        }`}>
                        <div className="flex items-center space-x-1 relative z-10">
                            {/* 1. Tactical Mic Pod - Integrated */}
                            <button
                                onClick={toggleVoice}
                                className={`group/mic relative w-16 h-16 flex items-center justify-center transition-all duration-500 rounded-xl overflow-hidden ${isListening ? 'bg-red-500/20' : 'bg-white/5 hover:bg-primary/10'
                                    }`}
                            >
                                <div className={`absolute inset-0 transition-opacity duration-500 ${isListening ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="absolute inset-0 bg-red-500/20 animate-pulse"></div>
                                </div>
                                <Mic className={`w-6 h-6 z-10 transition-all duration-500 ${isListening ? 'text-red-500 scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-white/40 group-hover/mic:text-primary'
                                    }`} />

                                {/* Micro-animations for mic */}
                                <div className="absolute bottom-2 w-1 h-1 rounded-full bg-current opacity-40"></div>
                            </button>

                            {/* 2. Unified Command Field */}
                            <div className="flex-1 relative flex items-center h-16 transition-all group/field">
                                <div className="absolute inset-0 bg-black/60 rounded-xl border border-white/5 group-hover/field:border-primary/20 group-focus-within/field:border-primary transition-all duration-500"></div>

                                <div className="relative flex items-center w-full px-5">
                                    <Terminal className="w-4 h-4 text-primary/30 mr-4 group-focus-within/field:text-primary transition-colors" />
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                            placeholder="ENGAGE NEURAL INTERFACE..."
                                            className="w-full bg-transparent border-none focus:ring-0 text-xs font-black tracking-[0.1em] text-white placeholder:text-white/10 uppercase"
                                        />
                                        {/* Dynamic Underline */}
                                        <div className="absolute -bottom-1 left-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent transition-all duration-700 group-focus-within/field:w-full w-0"></div>
                                    </div>

                                    {/* Link Status Info */}
                                    <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/5">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[6px] font-black text-white/20 tracking-tighter uppercase whitespace-nowrap">Command Auth</span>
                                            <span className="text-[9px] font-black text-primary/60 tracking-tighter uppercase whitespace-nowrap">Secure Link</span>
                                        </div>
                                        <div className="relative w-2 h-2">
                                            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                                            <div className="relative w-full h-full bg-green-500 rounded-full border border-green-400"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Execution Pod */}
                            <button
                                onClick={handleSend}
                                disabled={!inputText.trim()}
                                className={`group/send relative w-20 h-16 flex flex-col items-center justify-center transition-all duration-500 rounded-xl overflow-hidden ${!inputText.trim()
                                    ? 'bg-white/5 opacity-20'
                                    : 'bg-primary/20 hover:bg-primary border border-primary/20 hover:border-white shadow-[0_0_30px_rgba(0,242,255,0.1)]'
                                    }`}
                            >
                                <div className="relative z-10 flex flex-col items-center">
                                    <Send className={`w-5 h-5 transition-all duration-500 ${!inputText.trim() ? 'text-white' : 'text-primary group-hover/send:text-black group-hover/send:-translate-y-0.5 group-hover/send:translate-x-0.5'
                                        }`} />
                                    <span className={`text-[7px] font-black uppercase tracking-widest mt-1.5 transition-colors ${!inputText.trim() ? 'text-white/20' : 'text-primary group-hover/send:text-black'
                                        }`}>Execute</span>
                                </div>

                                {/* Background Sweep Effect */}
                                <div className="absolute inset-x-0 bottom-0 h-0 group-hover/send:h-full bg-primary transition-all duration-500 ease-out"></div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer status line */}
                <div className="flex justify-between items-center px-6 mt-3">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 font-black text-[7px] text-white/20 uppercase tracking-[0.2em]">
                            <div className="w-1 h-1 rounded-full bg-primary/40"></div>
                            Input Active
                        </div>
                        <div className="flex items-center gap-1.5 font-black text-[7px] text-white/20 uppercase tracking-[0.2em]">
                            <div className="w-1 h-1 rounded-full bg-white/10"></div>
                            V-Link Standby
                        </div>
                        <button
                            onClick={clearMessages}
                            className="flex items-center gap-1.5 font-black text-[7px] text-primary/40 hover:text-red-500 transition-colors uppercase tracking-[0.2em] ml-2"
                        >
                            [ RELINK_SYSTEM ]
                        </button>
                    </div>
                    <span className="text-[7px] font-black text-white/10 uppercase tracking-[0.5em]">Command_Port_01</span>
                </div>
            </div>
        </div>
    );
};

export default AssistantPanel;
