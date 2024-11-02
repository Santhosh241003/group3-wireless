import React, { useEffect, useRef } from 'react';

interface WaveformPlotProps {
  frequency: number;
  velocity: number;
  distance: number;
  isMoving: boolean;
}

const WaveformPlot_received: React.FC<WaveformPlotProps> = ({
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

    // Draw received waveform
    ctx.strokeStyle = '#10B981'; // Received color
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const t = x / width * (distance / c); // Calculate time based on x position
      const receivedField = Math.cos(omega * (t - distance / c)); // Time delayed for reception
      const yReceived = scaleAndShift(receivedField);
      ctx.lineTo(x, yReceived);
    }
    ctx.stroke();
  }, [frequency, velocity, distance, isMoving]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={200} // Adjust height as necessary
      className="w-full bg-gray-900 rounded-lg"
    />
  );
};

export default WaveformPlot_received;
