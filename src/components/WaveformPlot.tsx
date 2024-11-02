import React, { useEffect, useRef } from 'react';

interface WaveformPlotProps {
  frequency: number;
  velocity: number;
  distance: number;
  isMoving: boolean;
  hasReflection: boolean;
}

const WaveformPlot: React.FC<WaveformPlotProps> = ({
  frequency,
  velocity,
  distance,
  isMoving,
  hasReflection,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up plotting parameters
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    
    // Convert frequency to angular frequency
    const omega = 2 * Math.PI * frequency * 1e9;
    
    // Calculate wavelength
    const c = 3e8; // speed of light
    const lambda = c / (frequency * 1e9);
    
    // Calculate Doppler shift if moving
    const dopplerShift = isMoving ? (frequency * velocity / c) : 0;
    const omegaDoppler = 2 * Math.PI * dopplerShift;
    
    // Draw axes
    ctx.strokeStyle = '#4B5563';
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Draw waveform
    ctx.strokeStyle = '#3B82F6';
    ctx.beginPath();
    ctx.moveTo(0, centerY);

    for (let x = 0; x < width; x++) {
      const t = x / width * (distance / c);
      let y = Math.sin(omega * t - (2 * Math.PI * x / width));
      
      if (isMoving) {
        y *= Math.cos(omegaDoppler * t);
      }
      
      if (hasReflection) {
        const reflectedPhase = 2 * Math.PI * (2 * distance) / lambda;
        y += 0.5 * Math.sin(omega * t - reflectedPhase);
      }
      
      // Scale and shift the waveform
      y = y * height / 4 + centerY;
      
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
  }, [frequency, velocity, distance, isMoving, hasReflection]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={200}
      className="w-full bg-gray-900 rounded-lg"
    />
  );
};

export default WaveformPlot;