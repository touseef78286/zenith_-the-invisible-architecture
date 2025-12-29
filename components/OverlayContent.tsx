
import React from 'react';
import { FrequencyLayer, MouseState } from '../types';

interface OverlayContentProps {
  frequency: FrequencyLayer;
  mouse: MouseState;
}

const OverlayContent: React.FC<OverlayContentProps> = ({ frequency }) => {
  const renderVision = () => (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-20">
      <h1 className="font-['Syncopate'] text-8xl font-bold tracking-[0.2em] ghost-type uppercase mb-4">
        Zenith
      </h1>
      <p className="font-['Space+Mono'] text-white/40 text-sm tracking-[0.5em] uppercase">
        Level: Ω (The Omega State by Orewa_Zenith)
      </p>
      <div className="mt-20 max-w-2xl">
        <p className="font-['Space+Mono'] text-white/80 text-xl leading-relaxed tracking-wider ghost-type">
          REALITY IS A CONSTRUCTION OF THE OBSERVER. THE INTERFACE IS A QUANTUM SUPERPOSITION. CONTENT DOES NOT EXIST UNLESS OBSERVED.
        </p>
      </div>
    </div>
  );

  const renderTechnical = () => (
    <div className="flex flex-col items-start justify-center min-h-screen p-24">
      <div className="grid grid-cols-2 gap-20 w-full">
        <div className="space-y-12">
          <h2 className="font-['Syncopate'] text-4xl text-white/60 tracking-widest border-l-4 border-white/20 pl-6">
            STRUCTURAL_SCHEMA
          </h2>
          <div className="space-y-4 font-['Space+Mono'] text-xs text-white/40 uppercase">
            {['Vibrational Displacement', 'Buffer Geometry Hash', 'Fragment Shader V3.2', 'Foveated UX Mapping'].map((item, i) => (
              <div key={i} className="flex items-center space-x-4">
                <span className="w-8 h-[1px] bg-white/20"></span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
            <div className="w-64 h-64 border border-white/10 relative animate-pulse">
                <div className="absolute inset-0 border border-white/5 rotate-45"></div>
                <div className="absolute inset-4 border border-white/20 -rotate-12"></div>
                <div className="absolute inset-10 border border-white/40 rotate-180"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Space+Mono'] text-[10px] text-white/20">
                    GEOMETRIC_CORE
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  const renderCore = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-10">
      <div className="w-full max-w-4xl font-['Space+Mono'] text-[10px] text-white/60 leading-tight whitespace-pre-wrap opacity-50">
        {`
// ZENITH_CORE_DECONSTRUCTION
const reality = (observer) => {
  const probabilityField = new Field(Math.PI * 2);
  while(observer.isObserving) {
    probabilityField.collapse();
    yield probabilityField.render();
  }
}

class Tesseract {
  constructor(dimensions = 4) {
    this.nodes = Array.from({length: 16}, (_, i) => new Node(i));
    this.edges = connectHypercube(this.nodes);
  }

  project(freq) {
    return this.nodes.map(n => n.rotate(freq * Math.SQRT2));
  }
}

// EOF: THE_INVISIBLE_ARCHITECTURE
        `.trim()}
      </div>
      <div className="mt-20 font-['Syncopate'] text-white/20 text-xs tracking-[1em]">
        ACCESSING_RAW_CODE_STREAM...
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-full">
      {frequency === FrequencyLayer.VISION && renderVision()}
      {frequency === FrequencyLayer.TECHNICAL && renderTechnical()}
      {frequency === FrequencyLayer.CORE && renderCore()}
    </div>
  );
};

export default OverlayContent;
