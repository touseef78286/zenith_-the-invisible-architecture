
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FrequencyLayer, MouseState } from './types';
import ZenithCanvas from './components/ZenithCanvas';
import OverlayContent from './components/OverlayContent';
import FrequencyTuner from './components/FrequencyTuner';
import CursorScanner from './components/CursorScanner';
import { AudioEngine } from './services/AudioEngine';

const App: React.FC = () => {
  const [frequency, setFrequency] = useState<FrequencyLayer>(FrequencyLayer.VISION);
  const [mouse, setMouse] = useState<MouseState>({ x: 0, y: 0, speed: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  
  const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });
  const audioEngine = useRef<AudioEngine | null>(null);

  // Initialize Audio and State
  const initialize = useCallback(() => {
    if (isInitialized) return;
    audioEngine.current = new AudioEngine();
    audioEngine.current.resume();
    setIsInitialized(true);
  }, [isInitialized]);

  // Handle Mouse Movements
  const handleMouseMove = useCallback((e: React.MouseEvent | MouseEvent) => {
    const now = Date.now();
    const dt = now - lastMousePos.current.time;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = dt > 0 ? distance / dt : 0;

    setMouse({ x: e.clientX, y: e.clientY, speed });

    lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };

    // Update Audio Pitch based on speed
    if (audioEngine.current) {
      audioEngine.current.updateSpeed(speed);
    }
  }, []);

  // Handle Navigation (Wheel)
  const handleWheel = useCallback((e: WheelEvent) => {
    setFrequency((prev) => {
      const delta = e.deltaY > 0 ? 1 : -1;
      const next = prev + delta;
      if (next < 0) return FrequencyLayer.VISION;
      if (next > 2) return FrequencyLayer.CORE;
      
      // Trigger atomic transition sound
      if (audioEngine.current) {
        audioEngine.current.playTransition();
      }
      return next as FrequencyLayer;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('click', initialize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('click', initialize);
    };
  }, [handleMouseMove, handleWheel, initialize]);

  return (
    <div className="relative w-screen h-screen bg-black select-none cursor-none overflow-hidden">
      {/* Background Noise Field (The Probability Field) */}
      <ZenithCanvas mouse={mouse} frequency={frequency} />

      {/* The Foveated Masked Content Layer */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, black 0px, black 120px, transparent 240px)`,
          WebkitMaskImage: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, black 0px, black 120px, transparent 240px)`
        }}
      >
        <OverlayContent frequency={frequency} mouse={mouse} />
      </div>

      {/* UI Elements (Only visible via scanner) */}
      <FrequencyTuner current={frequency} />
      <CursorScanner mouse={mouse} />

      {/* Startup Overlay */}
      {!isInitialized && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black">
          <button 
            onClick={initialize}
            className="text-white/20 font-['Syncopate'] text-xs tracking-[1em] hover:text-white/80 transition-all duration-1000"
          >
            OBSERVE TO COLLAPSE REALITY
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
