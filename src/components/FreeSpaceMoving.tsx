import React, { useEffect, useRef, useState } from 'react';
import { Radio } from 'lucide-react';

const FreeSpaceMoving = () => {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [receiverPos, setReceiverPos] = useState(0);
  const initialPosition = 0;   // Starting position
  const targetPosition = 200;  // Target position in the x direction

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
        // Move receiver towards the target; reset to start position if it reaches the target
        if (prev >= targetPosition) {
          return initialPosition; // Reset to initial position
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
          <g transform={`translate(${100 + receiverPos}, 100)`}>
            <Radio className="w-6 h-6 text-green-500" />
          </g>

          {/* Direct path */}
          <line 
            x1="106" 
            y1="100" 
            x2={100 + receiverPos} 
            y2="100" 
            stroke="rgba(59,130,246,0.5)" 
            strokeWidth="2" 
            strokeDasharray="5,5" 
          />

          {/* Movement path */}
          <line 
            x1="100" 
            y1="100" 
            x2={100 + receiverPos} 
            y2="100" 
            stroke="rgba(34,197,94,0.2)" 
            strokeWidth="2" 
          />
        </svg>
      </div>
      <div className="mt-4 text-gray-300">
        {/* Explanation of Concepts */}
        <h3 className="text-lg font-semibold">Key Concepts:</h3>
        
        {/* Position of the Receiver */}
        <h4 className="text-md font-semibold mt-4">1. Position of the Moving Receiver:</h4>
        <p className="mb-2">
          The receiver moves with speed \( v \) away from the transmitter. Its position \( u(t) = (r(t), θ, φ) \) depends on:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>r(t) = r₀ + vt</strong>: Distance from the transmitter, where \( r₀ \) is the initial distance.</li>
          <li><strong>θ, φ</strong>: Fixed vertical and horizontal angles, assuming constant antenna orientation.</li>
        </ul>

        {/* Electric Field at Moving Point */}
        <h4 className="text-md font-semibold mt-4">2. Electric Field at the Moving Point:</h4>
        <p className="mb-2">
          The electric field \( E_f(t, u(t)) \) at this moving observation point is influenced by the time delays:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>S(θ, φ, f)</strong>: Radiation pattern of the transmitting antenna at frequency \( f \).</li>
          <li><strong>cos(2πf(t - (r₀/c) - (vt/c)))</strong>: Includes initial delay \( r₀/c \) and delay from motion \( vt/c \).</li>
        </ul>

        {/* Doppler Shift */}
        <h4 className="text-md font-semibold mt-4">3. Doppler Shift:</h4>
        <p className="mb-2">
          Due to motion, the frequency observed by the receiver changes, showing a Doppler shift:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><String>f' = f(1 - (v/c))</String>: The effective observed frequency.</li>
          <li><strong>Doppler shift = -f(v/c)</strong>: The shift amount due to the receiver's velocity.</li>
        </ul>
      </div>
    </div>
  );
};

export default FreeSpaceMoving;
