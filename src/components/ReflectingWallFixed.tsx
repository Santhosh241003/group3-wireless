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
        <svg ref={canvasRef} viewBox="0 0 500 200" className="w-full h-[400px]">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Reflecting Wall - positioned to the right of the receiver */}
          <line x1="400" y1="0" x2="400" y2="200" stroke="#ef4444" strokeWidth="4" />

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
          <line
            x1="106"
            y1="100"
            x2="300"
            y2="100"
            stroke="rgba(59,130,246,0.8)"
            strokeWidth="3"
            strokeDasharray="5,5"
          />



          {/* Secondary reflected path (lower path) */}
          <path
            d="M 300 100 L 400 100 L 400 110 L 310 110"
            fill="none"
            stroke="rgba(246,82,3,0.7)"
            strokeWidth="3"
            strokeDasharray="7,3"
          />
        </svg>
      </div>
      <div className="mt-4 text-gray-300">
        <div className="p-2 bg-gray-800 rounded">
          <p>Transmitted Signal:</p>
          <code className="block text-sm bg-gray-900 p-2 rounded">
            Ef(t) = cos(2πft)
          </code>
        </div>

        <div className="p-2 bg-gray-800 rounded">
          <p>Received Signal:</p>
          <code className="block text-sm bg-gray-900 p-2 rounded">
            Er(t) = ((G(f)/r) * cos(2πf(t - r/c))) + ((G(f)/(2d - r)) * cos(2πf(t - ((2d - r)/c)))
          </code>
        </div>

        <div className="p-2 bg-gray-800 rounded">
          <p>Where:</p>
          <ul className="list-disc list-inside text-sm">
            <li><strong>r</strong>: Distance between transmitter and receiver (meters)</li>
            <li><strong>d</strong>: Distance between transmitter and Wall (meters)</li>
            <li><strong>f</strong>: Frequency of the transmitted signal (hertz)</li>
            <li><strong>c</strong>: Speed of light in a vacuum (approx 3 × 10<sup>8</sup> m/s)</li>
          </ul>
        </div>

        <div className="p-2 bg-gray-800 rounded">
          <p>Phase Difference Between Direct and Reflected Waves:</p>
          <p className="text-sm">The phase difference Δϕ between the two waves is:</p>
          <code className="block text-sm bg-gray-900 p-2 rounded">
            Δϕ = (4πf/c)(d - r) + π
          </code>
          <p className="text-sm mt-2">Interpretation:</p>
          <ul className="list-disc list-inside text-sm">
            <li>When Δϕ is an integer multiple of 2π, the waves interfere constructively, resulting in a strong received signal.</li>
            <li>When Δϕ is an odd integer multiple of π, the waves interfere destructively, resulting in a weak received signal.</li>
          </ul>
        </div>

        <div className="p-2 bg-gray-800 rounded">
          <p className="font-semibold">Constructive and Destructive Interference (Coherence Distance):</p>
          <ul className="list-disc list-inside text-sm">
            <li><strong>Spatial Interference Pattern:</strong> Due to the superposition of direct and reflected waves, there is a pattern of constructive and destructive interference as the receive antenna moves.</li>
            <li><strong>Coherence Distance xc:</strong> xc = λ/4, where λ = c/f is the wavelength of the transmitted signal. Over distances smaller than xc, the received signal remains nearly constant.</li>
          </ul>
        </div>

        <div className="p-2 bg-gray-800 rounded">
          <p className="font-semibold">Frequency Dependence (Coherence Bandwidth):</p>
          <ul className="list-disc list-inside text-sm">
            <li>For a fixed distance r, changing the frequency f slightly can shift the signal from a peak to a valley in the interference pattern.</li>
            <li><strong>Coherence Bandwidth Bc:</strong> The frequency range over which the interference pattern does not change appreciably is inversely related to the delay spread Td.</li>
            <li><strong>Delay Spread Td:</strong> Td = (2d - r)/c - r/c, the difference in propagation delays between paths.</li>
            <li>Coherence Bandwidth Bc: Bc ≈ 1/Td. If the frequency changes by less than Bc, the interference pattern remains stable.</li>
          </ul>
        </div>

        <div className="p-2 bg-gray-800 rounded">
          <p className="font-semibold">Key Points:</p>
          <ul className="list-disc list-inside text-sm">
            <li><strong>Two-Path Interference:</strong> The received signal is a sum of the direct and reflected paths, with constructive or destructive interference based on phase differences.</li>
            <li><strong>Coherence Distance xc:</strong> Defines the spatial range over which the received signal does not vary significantly.</li>
            <li><strong>Delay Spread Td:</strong> Time difference between direct and reflected paths, determining the coherence bandwidth.</li>
            <li><strong>Coherence Bandwidth Bc:</strong> Defines the range of frequencies over which the interference pattern remains stable.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReflectingWallFixed;
