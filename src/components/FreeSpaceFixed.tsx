import React, { useEffect, useRef, useState } from 'react';
import { Radio } from 'lucide-react';
import Controls from './controls';
import WaveformPlot from './WaveformPlot_transmitted';
import { BlockMath } from 'react-katex'; // Importing BlockMath for LaTeX rendering

const FreeSpaceFixed = () => {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [frequency, setFrequency] = useState(2);
  const [velocity, setVelocity] = useState(0);
  const [distance, setDistance] = useState(100);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (canvasRef.current) {
        const waves = canvasRef.current.querySelectorAll('.wave');
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
      <h2 className="text-xl font-semibold mb-4">Free Space, Fixed Transmit and Receive Antennas</h2>
      <div className="bg-gray-900 rounded-lg p-4">
        <svg ref={canvasRef} viewBox="0 0 400 200" className="w-full h-[400px]">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
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
          <line x1="106" y1="100" x2="294" y2="100" stroke="rgba(59,130,246,0.5)" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
      </div>
      <div className="mt-4 text-gray-300">
        <p>In this scenario, both transmitter and receiver antennas are fixed in free space:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Direct line-of-sight propagation</li>
          <li>No reflections or obstacles</li>
          <li>Ideal propagation conditions</li>
          <li>Signal strength follows inverse square law</li>
        </ul>
        <h3 className="text-lg font-semibold mt-4">Key Equations:</h3>
        <div className="mt-2">
          <BlockMath>{`E_f(t, r, \\theta, \\phi) = \\frac{S(\\theta, \\phi, f) \\cdot \\cos(2\\pi f(t - \\frac{r}{c}))}{r}`}</BlockMath>
          <BlockMath>{`P \\propto \\frac{1}{r^2}`}</BlockMath>
        </div>
        <h3 className="text-lg font-semibold mt-4">Path Loss Calculation:</h3>
        <div className="mt-2">
          <BlockMath>{`L(d) = 10 \\log_{10}\\left(\\frac{P_t}{P_r}\\right) = 20 \\log_{10}(d) + 20 \\log_{10}(f) + K`}</BlockMath>
          <p className="text-sm text-gray-400">
            Where \(P_t\) is the transmitted power, \(P_r\) is the received power, \(d\) is the distance, \(f\) is the frequency, and \(K\) is a constant that accounts for system losses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FreeSpaceFixed;
