import React, { useEffect, useRef, useState } from 'react';
import { Radio } from 'lucide-react';

const ReflectingWallMoving = () => {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [receiverPosX, setReceiverPosX] = useState(0);
  const wallPositionX = 400; // Wall's x-position

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

        const reflectedWaves = canvasRef.current.querySelectorAll('.reflected-wave');
        reflectedWaves.forEach((wave) => {
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
      setReceiverPosX((prev) => {
        // Move receiver towards the target; reset to start position if it reaches the target
        if (prev >= wallPositionX) {
          return 106; // Reset to initial position
        }
        return prev + 2; // Move to the right
      });
    }, 50);

    return () => {
      clearInterval(waveInterval);
      clearInterval(moveInterval);
    };
  }, []);

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4">Reflecting Wall, Moving Antenna</h2>
      <div className="bg-gray-900 rounded-lg p-4">
        <svg ref={canvasRef} viewBox="0 0 500 200" className="w-full h-[400px]">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Reflecting Wall - positioned to the right */}
          <line x1={wallPositionX} y1="0" x2={wallPositionX} y2="200" stroke="#ef4444" strokeWidth="4" />
          
          {/* Transmitter */}
          <g transform="translate(100,100)">
            <Radio className="w-6 h-6 text-blue-500" />
            <circle className="wave" r="30" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="1" />
            <circle className="wave" r="50" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.8" />
            <circle className="wave" r="70" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
            <circle className="wave" r="90" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.4" />
          </g>

          {/* Moving Receiver */}
          <g transform={`translate(${(receiverPosX >= wallPositionX -10 ?  106 : receiverPosX)}, 100)`}>
            <Radio className="w-6 h-6 text-green-500" />
          </g>


          {/* Direct path */}
          <line 
            x1="106" 
            y1="100" 
            x2={receiverPosX} 
            y2="100" 
            stroke="rgba(59,130,246,0.5)" 
            strokeWidth="2" 
            strokeDasharray="5,5" 
          />
          
          {/* Reflected Ray */}
          {(
            <line 
              x1={wallPositionX} 
              y1="100" 
              x2={receiverPosX} 
              y2="100" 
              stroke="rgba(246,82,3,0.7)" 
              strokeWidth="2" 
              strokeDasharray="5,5"
            />
          )}
          {(
            <line 
              x1={wallPositionX} 
              y1="110" 
              x2={receiverPosX+12} 
              y2="110" 
              stroke="rgba(246,82,3,0.7)" 
              strokeWidth="2" 
              strokeDasharray="5,5"
            />
          )}
        </svg>
      </div>
      <div className="mt-4 text-gray-300">
        <p>This scenario combines reflection and horizontal motion effects:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Dynamic multipath propagation</li>
          <li>Time-varying Doppler shifts</li>
          <li>Changing interference patterns</li>
          <li>Complex fading characteristics due to horizontal motion</li>
        </ul>
      </div>
    </div>
  );
};

export default ReflectingWallMoving;
