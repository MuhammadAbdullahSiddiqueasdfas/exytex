import React, { useEffect, useRef, useState } from 'react';

interface LaserBeam {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  opacity: number;
  width: number;
}

export const LaserEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [laserBeams, setLaserBeams] = useState<LaserBeam[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = ['#00ffff', '#ff0080', '#8000ff', '#00ff80', '#ff8000'];

    const createLaserBeam = (): LaserBeam => ({
      id: Math.random(),
      x1: Math.random() * canvas.width,
      y1: Math.random() * canvas.height,
      x2: Math.random() * canvas.width,
      y2: Math.random() * canvas.height,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.2,
      width: Math.random() * 3 + 1,
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update laser beams
      setLaserBeams(prev => {
        const updated = prev.map(beam => ({
          ...beam,
          opacity: beam.opacity - 0.005,
          x2: beam.x2 + (Math.random() - 0.5) * 2,
          y2: beam.y2 + (Math.random() - 0.5) * 2,
        })).filter(beam => beam.opacity > 0);

        // Add new beams occasionally
        if (Math.random() < 0.02 && updated.length < 8) {
          updated.push(createLaserBeam());
        }

        return updated;
      });

      // Draw laser beams
      laserBeams.forEach(beam => {
        ctx.save();
        ctx.globalAlpha = beam.opacity;
        ctx.strokeStyle = beam.color;
        ctx.lineWidth = beam.width;
        ctx.shadowColor = beam.color;
        ctx.shadowBlur = 20;
        
        ctx.beginPath();
        ctx.moveTo(beam.x1, beam.y1);
        ctx.lineTo(beam.x2, beam.y2);
        ctx.stroke();
        
        // Add glow effect
        ctx.shadowBlur = 40;
        ctx.stroke();
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [laserBeams]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
