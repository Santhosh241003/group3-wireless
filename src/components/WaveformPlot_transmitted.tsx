import React, { useEffect, useRef } from 'react';

interface WaveformPlotProps {
  frequency: number;
  velocity: number;
  distance: number;
  isMoving: boolean;
}

const WaveformPlot_transmitted: React.FC<WaveformPlotProps> = ({
  frequency,
  velocity,
  distance,
  isMoving,
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
    const omega = 2 * Math.PI * frequency * 1e6; // Use MHz if necessary

    // Calculate wavelength
    const c = 3e8; // speed of light

    // Draw axes
    ctx.strokeStyle = '#4B5563';
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Function to scale and shift the waveform for canvas
    const scaleAndShift = (y: number) => {
      return (y * height / 4) + centerY; // Scale by height/4 and shift to center
    };

    // Draw transmitted waveform
    ctx.strokeStyle = '#3B82F6'; // Transmitted color
    ctx.beginPath();

    const sampling_freq=5*frequency*1e6
    for (let x = 0; x < width; x++) {
      const t = x / sampling_freq; // Calculate time based on x position
      const transmittedField = Math.cos(omega * t); // Transmitted signal calculation
      const yTransmitted = scaleAndShift(transmittedField);
      ctx.lineTo(x, yTransmitted);
    }
    ctx.stroke();
  }, [frequency, velocity, distance, isMoving]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={200}
      className="w-full bg-gray-900 rounded-lg"
    />
  );
};

export default WaveformPlot_transmitted;
