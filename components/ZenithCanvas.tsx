
import React, { useEffect, useRef } from 'react';
import { MouseState, FrequencyLayer } from '../types';

interface ZenithCanvasProps {
  mouse: MouseState;
  frequency: FrequencyLayer;
}

const ZenithCanvas: React.FC<ZenithCanvasProps> = ({ mouse, frequency }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let particles: Particle[] = [];
    const particleCount = 200;

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 1.5 + 0.5;
        this.density = (Math.random() * 30) + 1;
      }

      draw() {
        ctx!.fillStyle = `rgba(255, 255, 255, ${0.1 + (frequency * 0.1)})`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      update(mx: number, my: number) {
        // Simple physics for the probability field
        let dx = mx - this.x;
        let dy = my - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 300;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < maxDistance) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 20;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 20;
          }
        }
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update(mouse.x, mouse.y);
        p.draw();
      });

      // Add "Atomic" noise lines
      if (Math.random() > 0.95) {
          ctx.strokeStyle = `rgba(255,255,255,${0.05 * (frequency + 1)})`;
          ctx.beginPath();
          ctx.moveTo(0, Math.random() * canvas.height);
          ctx.lineTo(canvas.width, Math.random() * canvas.height);
          ctx.stroke();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouse.x, mouse.y, frequency]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none opacity-40"
    />
  );
};

export default ZenithCanvas;
