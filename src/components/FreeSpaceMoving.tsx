import React, { useEffect, useRef, useState } from 'react';
import { Radio } from 'lucide-react';

const FreeSpaceMoving = () => {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [receiverPos, setReceiverPos] = useState(0);
  const [direction, setDirection] = useState(1);
  
  useEffect(() => {
    const waveInterval = setInterval(() => {
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

    const moveInterval = setInterval(() => {
      setReceiverPos((prev) => {
        if (prev >= 100) setDirection(-1);
        if (prev <= -100) setDirection(1);
        return prev + direction * 2;
      });
    }, 50);

    return () => {
      clearInterval(waveInterval);
      clearInterval(moveInterval);
    };
  }, [direction]);

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4">Free Space, Moving Antenna</h2>
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

          {/* Moving Receiver */}
          <g transform={`translate(300,${100 + receiverPos})`}>
            <Radio className="w-6 h-6 text-green-500" />
          </g>

          {/* Direct path */}
          <line 
            x1="106" 
            y1="100" 
            x2={300 + receiverPos} 
            y2="100"  
            stroke="rgba(59,130,246,0.5)" 
            strokeWidth="2" 
            strokeDasharray="5,5" 
          />

          {/* Movement path */}
          <line 
            x1="200" 
            y1="100" 
            x2="400" 
            y2="100" 
            stroke="rgba(34,197,94,0.2)" 
            strokeWidth="2" 
          />
        </svg>
      </div>
      <div className="mt-4 text-gray-300">
        <p>In this scenario, the receiver antenna moves vertically while the transmitter remains fixed:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Doppler effect due to relative motion</li>
          <li>Varying signal strength based on distance</li>
          <li>Dynamic path loss changes</li>
          <li>Frequency shifts in received signal</li>
        </ul>
      </div>
    </div>
  );
};

export default FreeSpaceMoving;