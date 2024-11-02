import React, { useState } from 'react';
import { Radio, Waves } from 'lucide-react';
import FreeSpaceFixed from './components/FreeSpaceFixed';
import FreeSpaceMoving from './components/FreeSpaceMoving';
import ReflectingWallFixed from './components/ReflectingWallFixed';
import ReflectingWallMoving from './components/ReflectingWallMoving';

type ScenarioType = 'freeFixed' | 'freeMoving' | 'wallFixed' | 'wallMoving';

function App() {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('freeFixed');

  const scenarios = [
    { id: 'freeFixed', title: 'Free Space, Fixed Antennas' },
    { id: 'freeMoving', title: 'Free Space, Moving Antenna' },
    { id: 'wallFixed', title: 'Reflecting Wall, Fixed Antenna' },
    { id: 'wallMoving', title: 'Reflecting Wall, Moving Antenna' },
  ];

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
            <h1 className="text-3xl font-bold">Radio Wave Propagation Scenarios</h1>
            <Waves className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-gray-300">Interactive visualization of different radio wave propagation scenarios</p>
        </header>

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

        <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
          {renderScenario()}
        </div>
      </div>
    </div>
  );
}

export default App;