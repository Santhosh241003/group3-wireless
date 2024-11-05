
import React, { useEffect, useRef, useState } from 'react';
import { Radio } from 'lucide-react';

const FreeSpaceFixed = () => {
  // Properly type the ref as an SVGSVGElement
  const canvasRef = useRef<SVGSVGElement>(null);
  const [frequency, setFrequency] = useState(2);
  const [velocity, setVelocity] = useState(0);
  const [distance, setDistance] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      if (canvasRef.current) {
        // Type assertion to ensure TypeScript knows we're working with an SVGElement
        const waves = Array.from(canvasRef.current.getElementsByClassName('wave')).filter(
          (element): element is SVGCircleElement => element instanceof SVGCircleElement
        );

        waves.forEach((wave) => {
          const currentOpacity = parseFloat(wave.getAttribute('opacity') || '1');
          if (currentOpacity <= 0.1) {
            wave.setAttribute('r', '30');
            wave.setAttribute('opacity', '1');
          } else {
            wave.setAttribute('r', `${parseFloat(wave.getAttribute('r') || '30') + 2}`);
            wave.setAttribute('opacity', `${currentOpacity - 0.02}`);
          }
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4">Free Space, Fixed Transmitter and Fixed Receiver</h2>
      <div className="bg-gray-900 rounded-lg p-4">
        <svg ref={canvasRef} viewBox="0 0 400 200" className="w-full h-96">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Transmitter */}
          <g transform="translate(100,100)">
            <Radio className="w-6 h-6 text-blue-500" />
            <circle className="wave" r="30" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="1" />
            <circle className="wave" r="50" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.8" />
            <circle className="wave" r="70" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
            <circle className="wave" r="90" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.4" />
          </g>

          {/* Receiver */}
          <g transform="translate(300,100)">
            <Radio className="w-6 h-6 text-green-500" />
          </g>

          {/* Direct path */}
          <line x1="106" y1="100" x2="300" y2="100" stroke="rgba(59,130,246,0.5)" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
      </div>

      {/* Key Points Section */}
      <div className="mt-4 space-y-4 text-gray-300">
        <h3 className="text-lg font-semibold">Key Points:</h3>
        <div className="space-y-2">
          <div className="p-2 bg-gray-800 rounded">
            <p><strong>Transmitted Signal:</strong></p>
            <code className="block text-sm bg-gray-900 p-2 rounded">
            Ef(t) = cos(2πft)
            </code>
          </div>

          <div className="p-2 bg-gray-800 rounded">
            <p><strong>Received Signal:</strong></p>
            <code className="block text-sm bg-gray-900 p-2 rounded">
            Er(t) = (G/r) ·cos(2πf(t - r/c))
            </code>
          </div>

          <div className="p-2 bg-gray-800 rounded">
            <p><strong>Where:</strong></p>
            <ul className="list-disc list-inside text-sm">
              <li><strong>r</strong>: Distance from transmitter to receiver (meters)</li>
              <li><strong>f</strong>: Frequency of the transmitted signal (hertz)</li>
              <li><strong>c</strong>: Speed of light in a vacuum (approx 3 × 10<sup>8</sup> m/s)</li>
              <li><strong>G</strong>: Antenna Gain, Here we consider G = 1</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeSpaceFixed;