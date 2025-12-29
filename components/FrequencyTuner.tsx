
import React from 'react';
import { FrequencyLayer } from '../types';

interface FrequencyTunerProps {
  current: FrequencyLayer;
}

const FrequencyTuner: React.FC<FrequencyTunerProps> = ({ current }) => {
  const labels = ['VISION', 'TECH', 'CORE'];
  const symbols = ['Ω', 'Φ', 'Σ'];

  return (
    <div className="fixed left-12 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-8 z-50">
      <div className="h-64 w-[1px] bg-white/10 relative">
        <div 
          className="absolute w-2 h-2 bg-white rounded-full -left-[3.5px] transition-all duration-700 ease-in-out shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          style={{ top: `${(current / 2) * 100}%` }}
        />
      </div>
      <div className="flex flex-col space-y-4 font-['Space+Mono'] text-[8px] tracking-[0.3em] text-white/30 text-center">
        {labels.map((l, i) => (
          <div 
            key={l} 
            className={`transition-all duration-500 ${current === i ? 'text-white scale-125' : ''}`}
          >
            <div className="text-sm mb-1">{symbols[i]}</div>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequencyTuner;
