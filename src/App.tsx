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
  const [velocity, setVelocity] = useState(10); // m/s
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

  // Doppler Shift
  const calculateDopplerShift = (velocity: number, frequency: number) => {
    if (velocity && frequency > 0) {
      return ((frequency * 1e6 * velocity) / 3e8).toFixed(2) + ' Hz';
    }
    return '0.00 Hz';
  };
  const calculateDopplerSpread = (velocity: number, frequency: number) => {
    if (velocity && frequency > 0) {
      return (2*(frequency * 1e6 * velocity) / 3e8).toFixed(2) + ' Hz';
    }
    return '0.00 Hz';
  };

  // Coherence Time
  

  // Coherence Bandwidth
  const calculateCoherenceBandwidth = (distance :number) => {

      return (3e8 / (4 * (300 - distance))/1e6).toFixed(2) + ' MHz';
  };

  const calculateCoherenceDistance = (frequency: number) => {
    if (velocity > 0 && frequency > 0) {
      const coherenceDistance = 3e8/(4*frequency*1e6); // in meters
      return coherenceDistance.toFixed(2) + ' m';
    }
    return 'N/A m';
  };

  // Delay Spread
  const calculateDelaySpread = (distance: number) => {
    // Assuming delay spread based on environment (example values in microseconds)
    
    const delaySpread = (2*(300-distance))/3e8; // Default 1 μs if unknown
    return (delaySpread * 1e6).toFixed(2) + 'μs';
  };
  const calculatecoherenceTime_case4 = (velocity: number,frequency:number) => {
    // Assuming delay spread based on environment (example values in microseconds)
    
    const coherenceTime_4 = 3e8/(4*frequency*1e6*velocity); // Default 1 μs if unknown
    return coherenceTime_4.toFixed(2) + ' s';
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
            isMoving={isMoving} />
        </div>

        {/* Waveform Plots for Transmitted, Received, Reflected, and Combined Signals */}
        <div className="flex flex-wrap justify-between">
          {renderWaveformPlots()}
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-xl mb-8">
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm max-w-6xl mx-auto text-gray-300">

            {/* Doppler Shift */}
            {isMoving && !hasReflection && (
            <div>
              <div className="font-medium mb-1">Doppler Shift:</div>
              <div className="bg-gray-700 rounded p-2 text-center">
                {calculateDopplerShift(velocity, frequency)} 
              </div>
            </div>
            )
            
            }

            {/* Coherence Bandwidth */}
            {hasReflection && !isMoving &&(
            <div>
              <div className="font-medium mb-1">Coherence Bandwidth:</div>
              <div className="bg-gray-700 rounded p-2 text-center">
                {calculateCoherenceBandwidth(distance)} 
              </div>
            </div>
            )
            }

            {hasReflection && !isMoving &&(
            <div>
              <div className="font-medium mb-1">Coherence distance:</div>
              <div className="bg-gray-700 rounded p-2 text-center">
                {calculateCoherenceDistance(frequency)} 
              </div>
            </div>
            )
            }

            {/* Delay Spread */}
            {hasReflection && !isMoving && (
            <div>
              <div className="font-medium mb-1">Delay Spread:</div>
              <div className="bg-gray-700 rounded p-2 text-center">
                {calculateDelaySpread(distance)} 
              </div>
            </div>
            )
            }
            {hasReflection && isMoving && (
            <div>
              <div className="font-medium mb-1">Coherence Time:</div>
              <div className="bg-gray-700 rounded p-2 text-center">
                {calculatecoherenceTime_case4(velocity,frequency)} 
              </div>
            </div>
            )
            }
            {hasReflection && isMoving && (
            <div>
              <div className="font-medium mb-1">Doppler Spread:</div>
              <div className="bg-gray-700 rounded p-2 text-center">
                {calculateDopplerSpread(velocity,frequency)} 
              </div>
            </div>
            )
            }
            
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;