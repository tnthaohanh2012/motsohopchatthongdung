import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  type: 'confetti' | 'star' | 'sparkle';
  rotation: number;
  rotationSpeed: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
}

class CelebrationSystem {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private rockets: Rocket[] = [];
  private animId: number | null = null;
  private colors = [
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#F43F5E', '#FCD34D'
  ];

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(x?: number, y?: number) {
    if (!this.canvas || !this.ctx) return;
    const originX = x ?? this.canvas.width / 2;
    const originY = y ?? this.canvas.height / 3;

    // Confetti particles
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 9;
      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        size: 5 + Math.random() * 6,
        alpha: 1,
        life: 0,
        maxLife: 60 + Math.random() * 40,
        type: Math.random() > 0.4 ? 'confetti' : 'star',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2
      });
    }

    // Launch side firework rockets
    this.launchRockets();

    if (!this.animId) {
      this.animate();
    }
  }

  private launchRockets() {
    if (!this.canvas) return;
    for (let i = 0; i < 4; i++) {
      const x = (this.canvas.width * (i + 1)) / 5 + (Math.random() - 0.5) * 80;
      this.rockets.push({
        x,
        y: this.canvas.height,
        targetY: this.canvas.height * (0.2 + Math.random() * 0.3),
        vy: -11 - Math.random() * 4,
        color: this.colors[Math.floor(Math.random() * this.colors.length)]
      });
    }
  }

  private explodeRocket(r: Rocket) {
    for (let i = 0; i < 60; i++) {
      const angle = (Math.PI * 2 * i) / 60 + (Math.random() - 0.5) * 0.2;
      const speed = 2 + Math.random() * 7;
      this.particles.push({
        x: r.x,
        y: r.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: r.color,
        size: 3 + Math.random() * 4,
        alpha: 1,
        life: 0,
        maxLife: 50 + Math.random() * 30,
        type: 'sparkle',
        rotation: 0,
        rotationSpeed: 0
      });
    }
  }

  private animate = () => {
    if (!this.canvas || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update & draw rockets
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.y += r.vy;

      // Rocket trail
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = r.color;
      this.ctx.fill();

      // Sparkle sparks falling behind rocket
      this.ctx.beginPath();
      this.ctx.arc(r.x + (Math.random() - 0.5) * 4, r.y + 6, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = '#FBBF24';
      this.ctx.fill();

      if (r.y <= r.targetY) {
        this.explodeRocket(r);
        this.rockets.splice(i, 1);
      }
    }

    // Update & draw particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.16; // gravity
      p.vx *= 0.98; // drag
      p.rotation += p.rotationSpeed;
      p.alpha = Math.max(0, 1 - p.life / p.maxLife);

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;

      if (p.type === 'confetti') {
        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.type === 'star') {
        // Star shape
        this.ctx.beginPath();
        for (let s = 0; s < 5; s++) {
          this.ctx.lineTo(Math.cos(((18 + s * 72) * Math.PI) / 180) * p.size, -Math.sin(((18 + s * 72) * Math.PI) / 180) * p.size);
          this.ctx.lineTo(Math.cos(((54 + s * 72) * Math.PI) / 180) * (p.size / 2), -Math.sin(((54 + s * 72) * Math.PI) / 180) * (p.size / 2));
        }
        this.ctx.closePath();
        this.ctx.fill();
      } else {
        // Glowing sparkle
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();

      if (p.life >= p.maxLife || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length > 0 || this.rockets.length > 0) {
      this.animId = requestAnimationFrame(this.animate);
    } else {
      this.animId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  };
}

export const celebration = new CelebrationSystem();

export const CelebrationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      celebration.setCanvas(canvasRef.current);
    }
    const handleResize = () => celebration.resize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
