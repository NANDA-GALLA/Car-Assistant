import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ControlsPanel from './components/ControlsPanel';
import AssistantPanel from './components/AssistantPanel';
import InfoPanel from './components/InfoPanel';
import CarVisualizer from './components/CarVisualizer';
import LoadingScreen from './components/LoadingScreen';
import { CarProvider } from './context/CarContext';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <CarProvider>
      <div className="min-h-screen bg-background text-white font-sans selection:bg-primary/30 selection:text-primary">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LoadingScreen onComplete={() => setIsLoading(false)} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative h-screen overflow-hidden"
            >
              {/* Background Grid/HUD Effect */}
              <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 hud-grid opacity-20"></div>
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, transparent, rgba(8, 9, 10, 0.8))'
                  }}
                ></div>
              </div>

              <Navbar />

              <main className="flex w-full h-full overflow-hidden pt-16">
                {/* Left Side: Controls */}
                <aside className="w-80 flex-shrink-0">
                  <ControlsPanel />
                </aside>

                {/* Center: Hero/Visualizer + Assistant */}
                <div className="flex-1 flex flex-col items-center min-w-0 px-4">
                  <div className="w-full max-w-5xl flex flex-col h-full gap-4 pb-4">
                    <div className="flex-1 min-h-0 bg-black/20 rounded-3xl border border-white/5 overflow-hidden">
                      <CarVisualizer />
                    </div>
                    <div className="flex-1 min-h-0 bg-black/20 rounded-3xl border border-white/5 overflow-hidden">
                      <AssistantPanel />
                    </div>
                  </div>
                </div>

                {/* Right Side: History & Analytics */}
                <aside className="w-80 flex-shrink-0">
                  <InfoPanel />
                </aside>
              </main>

              {/* Footer info */}
              <div className="fixed bottom-4 right-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold pointer-events-none">
                <span>Neural Engine Active</span>
                <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
                <span>System Version 2.0.4-H</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CarProvider>
  );
}

export default App;
