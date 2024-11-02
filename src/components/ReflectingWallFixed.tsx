import React, { useEffect, useRef } from 'react';
import { Radio } from 'lucide-react';

const ReflectingWallFixed = () => {
  const canvasRef = useRef<SVGSVGElement>(null);
  
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
      <h2 className="text-xl font-semibold mb-4">Reflecting Wall, Fixed Antenna</h2>
      <div className="bg-gray-900 rounded-lg p-4">
        <svg ref={canvasRef} viewBox="0 0 400 200" className="w-full h-[400px]">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Reflecting Wall */}
          <line x1="200" y1="0" x2="200" y2="200" stroke="#ef4444" strokeWidth="4" />
          
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
          <line x1="106" y1="100" x2="200" y2="100" stroke="rgba(59,130,246,0.5)" strokeWidth="2" strokeDasharray="5,5" />
          
          {/* Reflected path */}
          <path 
            d="M 106 100 L 200 100 L 294 100" 
            fill="none"
            stroke="rgba(59,130,246,0.3)" 
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="mt-4 text-gray-300">
        <p>In this scenario, a reflecting wall creates multipath propagation:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Direct and reflected signal paths</li>
          <li>Phase differences between paths</li>
          <li>Potential constructive/destructive interference</li>
          <li>Signal strength affected by reflection coefficient</li>
        </ul>
      </div>
    </div>
  );
};

export default ReflectingWallFixed;