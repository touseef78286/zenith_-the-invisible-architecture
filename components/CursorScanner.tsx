
import React from 'react';
import { MouseState } from '../types';

interface CursorScannerProps {
  mouse: MouseState;
}

const CursorScanner: React.FC<CursorScannerProps> = ({ mouse }) => {
  return (
    <div 
      className="fixed pointer-events-none z-[999] transition-transform duration-75 ease-out"
      style={{ 
        transform: `translate(${mouse.x}px, ${mouse.y}px)`,
        left: -150,
        top: -150
      }}
    >
      <div className="w-[300px] h-[300px] relative">
        {/* Crosshair */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10"></div>
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/10"></div>
        
        {/* Scanning Rings */}
        <div className="absolute inset-0 border border-white/5 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-10 border border-white/10 rounded-full animate-spin [animation-duration:10s]"></div>
        
        {/* Coordinates */}
        <div className="absolute top-4 left-4 font-['Space+Mono'] text-[8px] text-white/40">
          X: {Math.round(mouse.x)}<br/>
          Y: {Math.round(mouse.y)}<br/>
          SPD: {mouse.speed.toFixed(2)}
        </div>
        
        {/* Focus Corner Markers */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20"></div>
      </div>
    </div>
  );
};

export default CursorScanner;
