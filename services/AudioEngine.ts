
export class AudioEngine {
  private ctx: AudioContext;
  private osc: OscillatorNode;
  private gain: GainNode;
  private lfo: OscillatorNode;
  private filter: BiquadFilterNode;

  constructor() {
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    this.osc = this.ctx.createOscillator();
    this.osc.type = 'sine';
    
    this.lfo = this.ctx.createOscillator();
    this.lfo.type = 'square';
    this.lfo.frequency.setValueAtTime(0.5, this.ctx.currentTime);
    
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(10, this.ctx.currentTime);

    this.gain = this.ctx.createGain();
    this.gain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.osc.connect(this.filter);
    this.filter.connect(this.gain);
    this.gain.connect(this.ctx.destination);

    this.osc.start();
    this.lfo.start();
  }

  public resume() {
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    // Start base hum
    this.gain.gain.setTargetAtTime(0.02, this.ctx.currentTime, 0.5);
  }

  public updateSpeed(speed: number) {
    const freq = 40 + (speed * 10);
    this.osc.frequency.setTargetAtTime(Math.min(freq, 120), this.ctx.currentTime, 0.1);
    
    // Crackle effect on high speed
    if (speed > 5) {
      const g = Math.random() * 0.05;
      this.gain.gain.setTargetAtTime(g, this.ctx.currentTime, 0.01);
    } else {
      this.gain.gain.setTargetAtTime(0.02, this.ctx.currentTime, 0.2);
    }
  }

  public playTransition() {
    const now = this.ctx.currentTime;
    const transitionOsc = this.ctx.createOscillator();
    const transitionGain = this.ctx.createGain();

    transitionOsc.type = 'sawtooth';
    transitionOsc.frequency.setValueAtTime(20, now);
    transitionOsc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
    transitionOsc.frequency.exponentialRampToValueAtTime(1, now + 0.5);

    transitionGain.gain.setValueAtTime(0, now);
    transitionGain.gain.linearRampToValueAtTime(0.05, now + 0.05);
    transitionGain.gain.linearRampToValueAtTime(0, now + 0.5);

    transitionOsc.connect(transitionGain);
    transitionGain.connect(this.ctx.destination);

    transitionOsc.start(now);
    transitionOsc.stop(now + 0.5);
  }
}
