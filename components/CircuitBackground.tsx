'use client';

import React, { useEffect, useRef } from 'react';

interface Pulse {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  color: string;
}

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const gridSize = 50;
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);

    const pulses: Pulse[] = [];
    const colors = ['rgba(16, 185, 129, ', 'rgba(56, 189, 248, ', 'rgba(168, 85, 247, '];

    for (let i = 0; i < 28; i++) {
      pulses.push({
        x: Math.floor(Math.random() * cols) * gridSize,
        y: Math.floor(Math.random() * rows) * gridSize,
        targetX: Math.floor(Math.random() * cols) * gridSize,
        targetY: Math.floor(Math.random() * rows) * gridSize,
        progress: 0,
        speed: 0.006 + Math.random() * 0.012,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      for (let x = gridSize; x < width; x += gridSize * 2) {
        for (let y = gridSize; y < height; y += gridSize * 2) {
          const distToMouse = Math.hypot(x - mouseX, y - mouseY);
          const isNearMouse = distToMouse < 160;

          ctx.fillStyle = isNearMouse
            ? 'rgba(56, 189, 248, 0.5)'
            : 'rgba(255, 255, 255, 0.08)';
          ctx.beginPath();
          ctx.arc(x, y, isNearMouse ? 3.5 : 2, 0, Math.PI * 2);
          ctx.fill();

          if (isNearMouse) {
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      pulses.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.x = p.targetX;
          p.y = p.targetY;
          const dx = (Math.random() > 0.5 ? 1 : -1) * gridSize * (1 + Math.floor(Math.random() * 2));
          const dy = (Math.random() > 0.5 ? 1 : -1) * gridSize * (1 + Math.floor(Math.random() * 2));
          p.targetX = Math.max(0, Math.min(width, p.x + dx));
          p.targetY = Math.max(0, Math.min(height, p.y + dy));
        }

        const currentX = p.x + (p.targetX - p.x) * p.progress;
        const currentY = p.y + (p.targetY - p.y) * p.progress;

        ctx.strokeStyle = p.color + '0.25)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        ctx.fillStyle = p.color + '0.9)';
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 10);
        gradient.addColorStop(0, p.color + '0.4)');
        gradient.addColorStop(1, p.color + '0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 10, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      style={{ background: 'transparent' }}
    />
  );
}
