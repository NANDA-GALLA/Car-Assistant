import React, { createContext, useContext, useState, useEffect } from 'react';
import { playSystemSound } from '../utils/audio';
import { supabase } from '../lib/supabase';

const CarContext = createContext();

export const useCar = () => useContext(CarContext);

export const CarProvider = ({ children }) => {
    const [carState, setCarState] = useState({
        ac: false,
        fan: 0,
        interiorLight: false,
        externalLight: false,
        sunroof: "closed", // "closed", "partial", "open"
        engine: false,
        generalLight: false,
        temperature: 22,
        navigation: false,
        destination: "HOME BASE",
        driveMode: "NEURAL", // "STEALTH", "COMFORT", "NEURAL", "SPORT"
    });

    const [history, setHistory] = useState([]);

    const [messages, setMessages] = useState([
        { role: "assistant", text: "Welcome back, Nanduu. How can I assist you today?", timestamp: new Date() }
    ]);

    // Fetch history and chat from Supabase on mount
    useEffect(() => {
        const fetchData = async () => {
            // 1. Fetch Logs
            const { data: logs } = await supabase
                .from('system_logs')
                .select('*')
                .order('timestamp', { ascending: false });
            if (logs) setHistory(logs);

            // 2. Fetch Chat
            const { data: chats } = await supabase
                .from('chat_history')
                .select('*')
                .order('timestamp', { ascending: true });

            if (chats && chats.length > 0) {
                setMessages(chats.map(m => ({
                    role: m.role,
                    text: m.content,
                    timestamp: m.timestamp
                })));
            } else {
                setMessages([{
                    role: "assistant",
                    text: "Welcome back, Nanduu. Neural systems online. How can I help?",
                    timestamp: new Date()
                }]);
            }
        };

        fetchData();
    }, []);

    const toggleControl = (control) => {
        setCarState(prev => {
            const newState = !prev[control];

            // Play engine sounds
            if (control === 'engine') {
                playSystemSound(newState ? 'ignition' : 'terminate');
            }

            return {
                ...prev,
                [control]: newState
            };
        });

        // Add to history
        addHistory(`Toggled ${control}`, "success");
    };

    const updateControl = (control, value) => {
        setCarState(prev => {
            // Play engine sound if updateControl sets engine state
            if (control === 'engine' && prev.engine !== value) {
                playSystemSound(value ? 'ignition' : 'terminate');
            }
            return {
                ...prev,
                [control]: value
            };
        });
        addHistory(`Updated ${control} to ${value}`, "success");
    };

    const addHistory = async (action, status) => {
        const newLog = {
            command: action,
            status,
            timestamp: new Date().toISOString()
        };

        // Update Local State
        setHistory(prev => [newLog, ...prev]);

        // Persist to Supabase
        const { error } = await supabase
            .from('system_logs')
            .insert([newLog]);

        if (error) console.error('Failed to sync with Supabase:', error);
    };

    const addMessage = async (role, text) => {
        const timestamp = new Date().toISOString();
        const newMessage = { role, text, timestamp };

        setMessages(prev => [...prev, newMessage]);

        // Persist to Supabase
        await supabase
            .from('chat_history')
            .insert([{ role, content: text, timestamp }]);
    };

    const clearHistory = async () => {
        setHistory([]);
        // Delete all from Supabase
        const { error } = await supabase
            .from('system_logs')
            .delete()
            .neq('id', 0); // Hack to delete all rows

        if (error) console.error('Failed to purge Supabase logs:', error);
    };

    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleDriveMode = () => {
        const modes = ["STEALTH", "COMFORT", "NEURAL", "SPORT"];
        setCarState(prev => {
            const currentIndex = modes.indexOf(prev.driveMode);
            const nextIndex = (currentIndex + 1) % modes.length;
            const nextMode = modes[nextIndex];
            addHistory(`Drive Mode shifted to ${nextMode}`, "success");
            return { ...prev, driveMode: nextMode };
        });
    };

    const clearMessages = async () => {
        setMessages([
            { role: "assistant", text: "Neural link reset. Systems standby.", timestamp: new Date() }
        ]);
        await supabase.from('chat_history').delete().neq('id', 0);
    };

    return (
        <CarContext.Provider value={{
            carState,
            toggleControl,
            updateControl,
            history,
            messages,
            addMessage,
            addHistory,
            clearHistory,
            clearMessages,
            theme,
            toggleTheme,
            toggleDriveMode
        }}>
            {children}
        </CarContext.Provider>
    );
};
