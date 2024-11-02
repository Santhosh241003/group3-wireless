import React, { useEffect, useRef, useState } from 'react';

interface WaveformPlotProps {
  frequency: number;
  velocity: number;
  distance: number;
  isMoving: boolean;
  hasReflection: boolean;
}

interface WaveformData {
  time: number[];
  direct_wave: number[];
  reflected_wave: number[] | null;
  combined_wave: number[];
}

const WaveformPlot = ({ frequency, velocity, distance, isMoving, hasReflection }: WaveformPlotProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [waveformData, setWaveformData] = useState<WaveformData | null>(null);

  useEffect(() => {
    const fetchWaveformData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/calculate-waveform', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            frequency,
            velocity,
            distance,
            is_moving: isMoving,
            has_reflection: hasReflection,
            time_points: 1000,
          }),
        });

        if (!response.ok) throw new Error('Failed to fetch waveform data');
        const data = await response.json();
        setWaveformData(data);
      } catch (error) {
        console.error('Error fetching waveform data:', error);
      }
    };

    fetchWaveformData();
  }, [frequency, velocity, distance, isMoving, hasReflection]);

  useEffect(() => {
    if (!canvasRef.current || !waveformData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawWaveform = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = '#2d374850';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const scaleX = canvas.width / waveformData.time.length;
      const scaleY = canvas.height / 4;
      const centerY = canvas.height / 2;

      // Draw direct wave
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      waveformData.direct_wave.forEach((y, i) => {
        const x = i * scaleX;
        const scaledY = y * scaleY + centerY;
        if (i === 0) ctx.moveTo(x, scaledY);
        else ctx.lineTo(x, scaledY);
      });
      ctx.stroke();

      // Draw reflected wave if available
      if (waveformData.reflected_wave) {
        ctx.strokeStyle = '#3b82f680';
        ctx.beginPath();
        waveformData.reflected_wave.forEach((y, i) => {
          const x = i * scaleX;
          const scaledY = y * scaleY + centerY;
          if (i === 0) ctx.moveTo(x, scaledY);
          else ctx.lineTo(x, scaledY);
        });
        ctx.stroke();
      }

      // Draw combined wave
      if (hasReflection) {
        ctx.strokeStyle = '#10b98180';
        ctx.beginPath();
        waveformData.combined_wave.forEach((y, i) => {
          const x = i * scaleX;
          const scaledY = y * scaleY + centerY;
          if (i === 0) ctx.moveTo(x, scaledY);
          else ctx.lineTo(x, scaledY);
        });
        ctx.stroke();
      }
    };

    drawWaveform();
  }, [waveformData, hasReflection]);

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