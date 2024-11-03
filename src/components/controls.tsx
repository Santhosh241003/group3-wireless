import React from 'react';

interface ControlsProps {
  frequency: number;
  setFrequency: (value: number) => void;
  velocity: number;
  setVelocity: (value: number) => void;
  distance: number;
  setDistance: (value: number) => void;
}

const Controls = ({ 
  frequency, 
  setFrequency, 
  velocity, 
  setVelocity, 
  distance, 
  setDistance 
}: ControlsProps) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Signal Parameters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Frequency (MHz)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="10"
              max="100"
              step="0.1"
              value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="w-16 text-right text-sm bg-gray-700 rounded px-2 py-1">
              {frequency.toFixed(1)}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Velocity (m/s)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={velocity}
              onChange={(e) => setVelocity(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="w-16 text-right text-sm bg-gray-700 rounded px-2 py-1">
              {velocity}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Distance (m)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="10"
              max="300"
              step="10"
              value={distance}
              onChange={(e) => setDistance(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="w-16 text-right text-sm bg-gray-700 rounded px-2 py-1">
              {distance}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;