
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Waves } from "lucide-react";

const WaterAnimation: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = 200;
      }
    };

    // Create resize observer
    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    resizeCanvas();

    // Wave properties
    let waves: {
      amplitude: number;
      frequency: number;
      speed: number;
      color: string;
      offset: number;
    }[] = [
      { amplitude: 15, frequency: 0.02, speed: 0.05, color: 'rgba(14, 165, 233, 0.3)', offset: 0 },
      { amplitude: 10, frequency: 0.03, speed: 0.07, color: 'rgba(14, 165, 233, 0.5)', offset: 2 },
      { amplitude: 5, frequency: 0.04, speed: 0.09, color: 'rgba(14, 165, 233, 0.7)', offset: 4 }
    ];

    // Droplet properties
    const droplets: {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
    }[] = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 40,
      size: 2 + Math.random() * 3,
      speed: 1 + Math.random() * 2,
      opacity: 0.5 + Math.random() * 0.5,
    }));

    // Leak spots
    const leakSpots = [
      { x: canvas.width * 0.25, y: canvas.height * 0.7, active: true },
      { x: canvas.width * 0.75, y: canvas.height * 0.5, active: false },
    ];

    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw pipes
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.7);
      ctx.lineTo(canvas.width, canvas.height * 0.7);
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#38bdf8';
      ctx.stroke();

      // Draw vertical pipe
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.75, canvas.height * 0.3);
      ctx.lineTo(canvas.width * 0.75, canvas.height * 0.7);
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#38bdf8';
      ctx.stroke();

      // Draw waves
      waves.forEach(wave => {
        wave.offset += wave.speed;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.7 - wave.amplitude * 1.5);
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = canvas.height * 0.7 - 
            wave.amplitude * Math.sin((x * wave.frequency) + wave.offset);
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height * 0.7 + wave.amplitude * 1.5);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      // Draw droplets
      droplets.forEach((droplet, index) => {
        ctx.beginPath();
        ctx.arc(droplet.x, droplet.y, droplet.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${droplet.opacity})`;
        ctx.fill();

        // Move droplet
        droplet.y += droplet.speed;

        // Reset when out of view
        if (droplet.y > canvas.height) {
          droplet.y = -10;
          droplet.x = Math.random() * canvas.width;
        }
      });

      // Draw leak spots with pulsing animation
      leakSpots.forEach((leak, i) => {
        if (leak.active) {
          const pulseSize = 5 + 3 * Math.sin(Date.now() * 0.005);
          ctx.beginPath();
          ctx.arc(leak.x, leak.y, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
          ctx.fill();

          // Ripples
          const now = Date.now();
          for (let j = 0; j < 3; j++) {
            const rippleSize = ((now % 2000) / 2000 + j / 3) % 1;
            const size = rippleSize * 20;
            const opacity = 1 - rippleSize;
            
            ctx.beginPath();
            ctx.arc(leak.x, leak.y, size, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(239, 68, 68, ${opacity * 0.5})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          // Small droplets emanating from leak
          for (let j = 0; j < 2; j++) {
            const angle = (Date.now() / 1000 + j) % (Math.PI * 2);
            const distance = 5 + 5 * Math.sin(Date.now() * 0.003);
            
            ctx.beginPath();
            ctx.arc(
              leak.x + Math.cos(angle) * distance,
              leak.y + Math.sin(angle) * distance,
              1.5,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
            ctx.fill();
          }
        }
      });

      // Draw sensor indicators
      ctx.beginPath();
      ctx.arc(canvas.width * 0.25, canvas.height * 0.7 - 8, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(canvas.width * 0.75, canvas.height * 0.7 - 8, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();

      if (isAnimating) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Toggle animation for the first leak spot every 5 seconds
    const leakToggle = setInterval(() => {
      leakSpots[0].active = !leakSpots[0].active;
    }, 5000);

    // Start animation
    if (isAnimating) {
      animationRef.current = requestAnimationFrame(animate);
    }

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
      clearInterval(leakToggle);
    };
  }, [isAnimating]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          Water Flow Simulation
        </CardTitle>
        <div className="flex items-center">
          <Waves className="h-4 w-4 mr-1 text-primary" />
          <span className="text-xs text-muted-foreground">Live Monitoring</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[200px] bg-accent/30 rounded-md overflow-hidden">
          <canvas 
            ref={canvasRef}
            className="w-full h-full"
          />
          <div className="absolute bottom-2 right-2 bg-white/80 text-xs px-2 py-1 rounded-md flex items-center">
            <Droplet className="h-3 w-3 mr-1 text-water-600" />
            <span>Water leak detection active</span>
          </div>
        </div>
        <div className="flex justify-between mt-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-alert-high mr-1"></div>
            <span>Active leak</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-alert-low mr-1"></div>
            <span>Normal pressure</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-alert-medium mr-1"></div>
            <span>Warning pressure</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterAnimation;
