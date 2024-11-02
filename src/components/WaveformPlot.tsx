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

    // Function to scale and shift the waveform for canvas
    const scaleAndShift = (y: number) => {
      return (y * height / 4) + centerY; // Scale by height/4 and shift to center
    };

    // Draw transmitted waveform
    ctx.strokeStyle = '#3B82F6'; // Transmitted color
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const t = x / width * (distance / c);
      const transmittedField = Math.cos(omega * t);
      const yTransmitted = scaleAndShift(transmittedField);
      ctx.lineTo(x, yTransmitted);
    }
    ctx.stroke();

    // Draw received waveform
    ctx.strokeStyle = '#10B981'; // Received color
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const t = x / width * (distance / c);
      const receivedField = Math.cos(omega * (t - distance / c)); // Time delayed for reception
      const yReceived = scaleAndShift(receivedField);
      ctx.lineTo(x, yReceived);
    }
    ctx.stroke();

    // Draw reflected waveform if applicable
    if (hasReflection) {
      ctx.strokeStyle = '#FBBF24'; // Reflected color
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const t = x / width * (distance / c);
        const reflectedField = 0.5 * Math.cos(omega * (t - 2 * distance / c)); // Adjust phase for reflection
        const yReflected = scaleAndShift(reflectedField);
        ctx.lineTo(x, yReflected);
      }
      ctx.stroke();
    }

    // Draw combined waveform
    ctx.strokeStyle = '#C084FC'; // Combined color
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const t = x / width * (distance / c);
      const combinedField = Math.cos(omega * t) + (hasReflection ? 0.5 * Math.cos(omega * (t - 2 * distance / c)) : 0);
      const yCombined = scaleAndShift(combinedField);
      ctx.lineTo(x, yCombined);
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
