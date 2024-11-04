import React, { useEffect, useRef, useState } from 'react';
import { Radio } from 'lucide-react';

const ReflectingWallMoving = () => {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [receiverPosX, setReceiverPosX] = useState(106);
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
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
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
          <g transform={`translate(${(receiverPosX >= wallPositionX - 10 ? 106 : receiverPosX)}, 100)`}>
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
              x2={receiverPosX + 10}
              y2="110"
              stroke="rgba(246,82,3,0.7)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )}
        </svg>
      </div>
      <div className="mt-4 text-gray-300">
        <div className="p-2 bg-gray-800 rounded">
          <p><strong>Transmitted Signal:</strong></p>
          <code className="block text-sm bg-gray-900 p-2 rounded">
            Ef(t) = cos(2πft)
          </code>
        </div>

        <div className="p-2 bg-gray-800 rounded">
          <p><strong>Received Signal:</strong></p>
          <code className="block text-sm bg-gray-900 p-2 rounded">
            Er(t) = ((G(f) / (r₀ + vt)) * cos(2πf(t - (r₀ + vt)/c))) + ((G(f) / (2d - (r₀ + vt))) * cos(2πf(t - ((2d - (r₀ + vt)) / c)))
          </code>
        </div>

        <div className="p-2 bg-gray-800 rounded">
          <p><strong>Where:</strong></p>
          <ul className="list-disc list-inside text-sm">
            <li><strong>r₀</strong>: Initial distance between transmitter and receiver (meters)</li>
            <li><strong>v</strong>: Velocity of the receiver (m/s)</li>
            <li><strong>d</strong>: Distance between transmitter and reflector (meters)</li>
            <li><strong>f</strong>: Frequency of the transmitted signal (hertz)</li>
            <li><strong>c</strong>: Speed of light in a vacuum (approx 3 × 10<sup>8</sup> m/s)</li>
          </ul>
        </div>

        <div className="p-2 bg-gray-800 rounded">
          <p className=""><strong>Doppler Shifts in the Direct and Reflected Waves:</strong></p>
          <ul className="list-disc list-inside text-sm">
          <code className="block text-sm bg-gray-900 p-2 rounded">
              Ds = D2 - D1 = 2f * (v / c)
            </code>
            <li>When the antenna moves, each path experiences a Doppler shift due to the relative velocity.</li>
            <li><strong>Direct Path Doppler Shift D1:</strong> D1 = -f * (v / c)</li>
            <li><strong>Reflected Path Doppler Shift D2:</strong> D2 = +f * (v / c)</li>
            <li><strong>Doppler Spread Ds:</strong> The difference between the Doppler shifts of the two paths.</li>
            <p className="text-sm mt-2">The Doppler spread Ds describes the range of frequency shifts and is inversely proportional to the coherence time Tc.</p>
          </ul>
        </div>

        <div className="p-2 bg-gray-800 rounded">
          <p className=""><strong>Coherence Time Tc:</strong></p>
          <p className="text-sm">It is the time taken for the antenna to move from a peak to a valley.</p>
          <code className="block text-sm bg-gray-900 p-2 rounded">
            Tc = c / (4 * f * v)
          </code>
        </div>

        <div className="p-2 bg-gray-800 rounded">
          <p className="font-semibold">Key Points:</p>
          <ul className="list-disc list-inside text-sm">
            <li><strong>Coherence Time Tc:</strong> Time interval for stable signal fading, depending on the velocity v.</li>
            <li><strong>Doppler Spread Ds:</strong> Frequency shift range due to movement; determines the rate of fading.</li>
            <li><strong>Multipath Fading:</strong> Result of interference pattern (constructive and destructive interference) as the antenna moves.</li>
          </ul>
        </div>

        <div className="p-2 bg-gray-800 rounded">
          <p className="font-semibold">Doppler Shift:</p>
          <code className="block text-sm bg-gray-900 p-2 rounded">
            -f * (v / c)
          </code>
        </div>
      </div>
    </div>
  );
};

export default ReflectingWallMoving;
