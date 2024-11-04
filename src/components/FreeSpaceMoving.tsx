import React, { useEffect, useRef, useState } from 'react';
import { Radio } from 'lucide-react';

const FreeSpaceMoving = () => {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [frequency, setFrequency] = useState(2);
  const [velocity, setVelocity] = useState(1); // Speed of the receiver
  const [receiverPosition, setReceiverPosition] = useState(300); // Initial position of the receiver

  useEffect(() => {
    const interval = setInterval(() => {
      if (canvasRef.current) {
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

        // Update receiver position to move towards the right
        setReceiverPosition((prev) => {
          const newPosition = prev + 2;
          // Stop at the SVG boundary (400) or wrap around
          return newPosition > 300 ? 106 : newPosition;
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [velocity]);

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4">Free Space, Fixed Transmitter and Moving Receiver </h2>
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

          {/* Receiver (moving to the right) */}
          <g transform={`translate(${receiverPosition},100)`}>
            <Radio className="w-6 h-6 text-green-500" />
          </g>

          {/* Direct path */}
          <line x1="106" y1="100" x2={receiverPosition} y2="100" stroke="rgba(59,130,246,0.5)" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
      </div>

      {/* Key Points Section */}
      <div className="mt-4 space-y-4 text-gray-300">
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
              Er(t) = (G(f) / (r₀ + vt)) * cos(2πf(t – ((r₀ - vt) / c)))
            </code>
          </div>

          <div className="p-2 bg-gray-800 rounded">
            <p>Where:</p>
            <ul className="list-disc list-inside text-sm">
              <li><strong>r₀</strong>: Initial distance between transmitter and receiver (meters)</li>
              <li><strong>v</strong>: Velocity of the receiver</li>
              <li><strong>f</strong>: Frequency of the transmitted signal (hertz)</li>
              <li><strong>c</strong>: Speed of light in a vacuum (approx 3 × 10<sup>8</sup> m/s)</li>
            </ul>
          </div>

          <div className="p-2 bg-gray-800 rounded">
            <p>Doppler Shift:</p>
            <p className="text-sm">Rewriting f(t - (r₀/c) - (vt/c)) as:</p>
            <code className="block text-sm bg-gray-900 p-2 rounded">
              f((1 - (v/c))t - (r₀/c))
            </code>
            <p className="text-sm mt-2">This shows a Doppler shift in frequency due to motion. The effective frequency observed at the moving antenna becomes:</p>
            <code className="block text-sm bg-gray-900 p-2 rounded">
              f' = f(1 - (v/c))
            </code>
            <p className="text-sm mt-2">Doppler shift:</p>
            <code className="block text-sm bg-gray-900 p-2 rounded">
              -f(v/c)
            </code>
          </div>
          <div className="p-2 bg-gray-800 rounded">
          <h2 className="text-lg font-semibold">Key Points:</h2>
            <ul className="list-disc list-inside text-sm">
              <li>Doppler Shift: Occurs due to relative motion and changes the observed frequency, f' = f(1 - (v/c)).</li>
              <li>Time-varying Attenuation: Due to r(t) = r₀ + vt, leading to a changing 1/(r₀ + vt) factor in signal strength.</li>
              <li>Relative Motion: The same equations apply if either the transmitter or receiver is moving, as long as r(t) is the distance between them and antenna orientations are constant.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeSpaceMoving;
