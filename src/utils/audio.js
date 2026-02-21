let engineIdleAudio = null;
let audioCtx = null;

const initAudio = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
};

export const playSystemSound = (type) => {
    console.log(`[Neural Audio] Mode: ${type}`);
    initAudio();

    if (type === 'ignition') {
        // 1. STARTUP SOUND
        const startup = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-car-ignition-1535.mp3');
        startup.volume = 0.8;
        startup.play().catch(e => console.log("Startup blocked", e));

        // 2. CONTINUOUS IDLE (Starts after startup finishes or overlaps)
        if (!engineIdleAudio) {
            engineIdleAudio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-car-engine-idle-loop-2533.mp3');
            engineIdleAudio.loop = true;
            engineIdleAudio.volume = 0.3;
            // Delay idle slightly for realism
            setTimeout(() => {
                if (engineIdleAudio) engineIdleAudio.play().catch(e => console.log("Idle blocked", e));
            }, 2000);
        }
    } else if (type === 'terminate') {
        // 1. STOP CONTINUOUS IDLE
        if (engineIdleAudio) {
            engineIdleAudio.pause();
            engineIdleAudio.currentTime = 0;
            engineIdleAudio = null;
        }

        // 2. SHUTDOWN SOUND
        const shutdown = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-truck-engine-shut-down-1627.mp3');
        shutdown.volume = 0.6;
        shutdown.play().catch(e => console.log("Shutdown blocked", e));

    } else if (type === 'beep') {
        const ctx = initAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }
};
