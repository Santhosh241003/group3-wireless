import React, { useState } from 'react';
import { Radio, Waves } from 'lucide-react';
import FreeSpaceFixed from './components/FreeSpaceFixed';
import FreeSpaceMoving from './components/FreeSpaceMoving';
import ReflectingWallFixed from './components/ReflectingWallFixed';
import ReflectingWallMoving from './components/ReflectingWallMoving';
import Controls from './components/controls';
import WaveformPlot_transmitted from './components/WaveformPlot_transmitted';
import WaveformPlot_received from './components/WaveformPlot_received';

type ScenarioType = 'freeFixed' | 'freeMoving' | 'wallFixed' | 'wallMoving';

function App() {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('freeFixed');
  const [frequency, setFrequency] = useState(10); // 10 GHz default
  const [velocity, setVelocity] = useState(0); // m/s
  const [distance, setDistance] = useState(100); // meters

  const scenarios = [
    { id: 'freeFixed', title: 'Free Space, Fixed Antennas' },
    { id: 'freeMoving', title: 'Free Space, Moving Antenna' },
    { id: 'wallFixed', title: 'Reflecting Wall, Fixed Antenna' },
    { id: 'wallMoving', title: 'Reflecting Wall, Moving Antenna' },
  ];

  const isMoving = activeScenario === 'freeMoving' || activeScenario === 'wallMoving';
  const hasReflection = activeScenario === 'wallFixed' || activeScenario === 'wallMoving';

  const renderScenario = () => {
    switch (activeScenario) {
      case 'freeFixed':
        return <FreeSpaceFixed />;
      case 'freeMoving':
        return <FreeSpaceMoving />;
      case 'wallFixed':
        return <ReflectingWallFixed />;
      case 'wallMoving':
        return <ReflectingWallMoving />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Radio className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">Radio Wave Propagation Calculator</h1>
            <Waves className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-gray-300">Interactive visualization and calculation of radio wave propagation scenarios</p>
        </header>

        {/* Row 1: Scenario Selection Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario.id as ScenarioType)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                activeScenario === scenario.id
                  ? 'bg-blue-600 shadow-lg shadow-blue-500/50'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <span className="text-sm font-medium">{scenario.title}</span>
            </button>
          ))}
        </div>

        {/* Row 2: Selected Scenario Visualization */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl mb-8">
          {renderScenario()}
        </div>

        {/* Row 3: Controls for Frequency, Velocity, and Distance */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl mb-8">
          <Controls
            frequency={frequency}
            setFrequency={setFrequency}
            velocity={velocity}
            setVelocity={setVelocity}
            distance={distance}
            setDistance={setDistance}
          />
        {/* Row 4: Waveform Plots for Transmitted and Received Signals */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Transmitted Signal Waveform */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-center">Transmitted Signal Waveform</h2>
            <WaveformPlot_transmitted
              frequency={frequency}
              velocity={velocity}
              distance={distance}
              isMoving={isMoving}
            />
          </div>

          {/* Received Signal Waveform */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-center">Received Signal Waveform</h2>
            <WaveformPlot_received
              frequency={frequency}
              velocity={velocity}
              distance={distance}
              isMoving={isMoving}
            />
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <div className="font-medium mb-1">Path Loss:</div>
              <div className="bg-gray-700 rounded p-2">
                {(20 * Math.log10(4 * Math.PI * distance * frequency * 1e9 / 3e8)).toFixed(2)} dB
              </div>
            </div>
            <div>
              <div className="font-medium mb-1">Doppler Shift:</div>
              <div className="bg-gray-700 rounded p-2">
                {isMoving ? (frequency * velocity / 3e8).toFixed(2) : '0.00'} Hz
              </div>
            </div>
          </div>
        </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
