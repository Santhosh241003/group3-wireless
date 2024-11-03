import React, { useEffect, useRef, useState } from 'react';
import { Radio } from 'lucide-react';
import MathJax from 'react-mathjax';

const SignalEquations = () => (
  <MathJax.Provider>
    <div className="mt-4 text-gray-300">
      <h3 className="text-lg font-semibold mt-4">Key Equations:</h3>
      {/* Explanation of Variables */}
      <div className="mt-4">
        <h4 className="text-md font-semibold">Variable Explanations:</h4>
        <p><strong>r</strong>: Distance from transmitter to receiver (meters)</p>
        <p><strong>f</strong>: Frequency of the transmitted signal (hertz)</p>
        <p><strong>A</strong>: Amplitude of the transmitted signal</p>
        <p><strong>c</strong>: Speed of light in a vacuum (approximately 3 × 10<sup>8</sup> m/s)</p>
        
        {/* Transmitted and Received Signal Equations */}

        <MathJax.Node formula={`\\text{Transmitted Signal: } E_{\\text{transmit}}(t) = A \\cdot \\cos(2 \\pi f t)`} />
        <MathJax.Node formula={`\\text{Received Signal: } E_{\\text{receive}}(t, r) = \\frac{A \\cdot \\cos\\left(2 \\pi f \\left(t - \\frac{r}{c}\\right)\\right)}{r}`} />
        <MathJax.Node formula={`\\text{Power Density: } P \\propto \\frac{1}{r^2}`} />
      </div>

    </div>
  </MathJax.Provider>
);

const FreeSpaceFixed = () => {
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
      <h2 className="text-xl font-semibold mb-4">Free Space, Fixed Transmit and Receive Antennas</h2>
      <div className="bg-gray-900 rounded-lg p-4">
        <svg ref={canvasRef} viewBox="0 0 400 200" className="w-full h-[400px]">
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
          <line x1="106" y1="100" x2="294" y2="100" stroke="rgba(59,130,246,0.5)" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
      </div>
      <SignalEquations />
    </div>
  );
};

export default FreeSpaceFixed;
