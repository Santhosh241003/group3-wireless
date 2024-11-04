import React, { useState } from 'react';
import { Radio, Waves } from 'lucide-react';
import FreeSpaceFixed from './components/FreeSpaceFixed';
import FreeSpaceMoving from './components/FreeSpaceMoving';
import ReflectingWallFixed from './components/ReflectingWallFixed';
import ReflectingWallMoving from './components/ReflectingWallMoving';
import Controls from './components/controls';
import WaveformPlot_transmitted from './components/WaveformPlot_transmitted';
import WaveformPlot_received from './components/WaveformPlot_received';
import WaveformPlot_received_wall from './components/WaveformPlot_received_wall';

type ScenarioType = 'freeFixed' | 'freeMoving' | 'wallFixed' | 'wallMoving';

function App() {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('freeFixed');
  const [frequency, setFrequency] = useState(10); // 10 GHz default
  const [velocity, setVelocity] = useState(0); // m/s
  const [distance, setDistance] = useState(100); // meters

  const scenarios = [
    { id: 'freeFixed', title: 'Free Space, Fixed Transmitter and Fixed Receiver' },
    { id: 'freeMoving', title: 'Free Space, Fixed Transmitter and Moving Receiver' },
    { id: 'wallFixed', title: 'Reflecting Wall, Fixed Transmitter and Fixed Receiver' },
    { id: 'wallMoving', title: 'Reflecting Wall, Fixed Transmitter and Moving Receiver' },
  ];

  // Determine if the scenario involves moving antennas
  const isMoving = activeScenario === 'freeMoving' || activeScenario === 'wallMoving';

  const hasReflection = activeScenario === 'wallFixed' || activeScenario === 'wallMoving';

  const calculatePathLoss = (distance: number, frequency: number) => {
    if (distance > 0 && frequency > 0) {
      return (20 * Math.log10((4 * Math.PI * distance * frequency * 1e6) / 3e8)).toFixed(2);
    }
    return 'N/A';
  };

  const calculateDopplerShift = (velocity: number, frequency: number) => {
    if (isMoving && velocity && frequency > 0) {
      return (frequency * 1e6 * velocity / 3e8).toFixed(2);
    }

    return '0.00 Hz';
  };

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
      default:
        return null;
    }
  };

  const renderWaveformPlots = () => {
    if (activeScenario === 'freeFixed' || activeScenario === 'freeMoving') {
      return (
        <>
          <div className="bg-gray-800 rounded-xl p-6 w-[50%] min-h-[500px] shadow-xl">
            <h2 className="text-xl font-semibold pb-4 text-center">Transmitted Signal Waveform</h2>
            <div>
              <WaveformPlot_transmitted
                frequency={frequency}
                velocity={velocity}
                distance={distance}
                isMoving={isMoving}
              />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 w-[50%] min-h-[500px] shadow-xl">
            <h2 className="text-xl font-semibold pb-4 text-center">Received Signal Waveform</h2>
            <div>
              <WaveformPlot_received
                frequency={frequency}
                velocity={velocity}
                distance={distance}
                isMoving={isMoving}
              />
            </div>
          </div>
        </>
      );
    } else if (hasReflection) {
      return (
        <>
          <div className="bg-gray-800 rounded-xl p-6 w-[50%] min-h-[500px] shadow-xl">
            <h2 className="text-xl font-semibold pb-4 text-center">Transmitted Signal Waveform</h2>
            <div>
              <WaveformPlot_transmitted
                frequency={frequency}
                velocity={velocity}
                distance={distance}
                isMoving={isMoving}
              />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 w-[50%] min-h-[500px] shadow-xl">
            <h2 className="text-xl font-semibold pb-4 text-center">Reflected Signal Waveform</h2>
            <div>
              <WaveformPlot_received_wall
                frequency={frequency}
                velocity={velocity}
                distance={distance}
                isMoving={isMoving}
              />
            </div>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Radio className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">Ray Tracing Model</h1>
            <Waves className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-gray-300">Interactive visualization and calculation of Transmitted and Receiver signal in different cases</p>
        </header>

        {/* Row 1: Scenario Selection Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario.id as ScenarioType)}
              className={`p-4 rounded-lg transition-all duration-300 ${activeScenario === scenario.id
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
            velocity={isMoving ? velocity : 0} // Set velocity to 0 if the scenario is not moving
            setVelocity={setVelocity}
            distance={distance}
            setDistance={setDistance} 
            isMoving={isMoving}          />
        </div>

        {/* Waveform Plots for Transmitted, Received, Reflected, and Combined Signals */}
        <div className="flex flex-wrap justify-between">
          {renderWaveformPlots()}
        </div>

        {/* Path Loss and Doppler Shift Info */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl mb-8">
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm max-w-6xl mx-auto text-gray-300">
            <div>
              <div className="font-medium mb-1">Path Loss:</div>
              <div className="bg-gray-700 rounded p-2 text-center">
                {calculatePathLoss(distance, frequency)} dB
              </div>
            </div>
            <div>
              <div className="font-medium mb-1">Doppler Shift:</div>
              <div className="bg-gray-700 rounded p-2 text-center">
                {calculateDopplerShift(velocity, frequency)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;