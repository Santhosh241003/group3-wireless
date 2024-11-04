import React from 'react';

interface ControlsProps {
    frequency: number;
    setFrequency: (value: number) => void;
    velocity: number;
    setVelocity: (value: number) => void;
    distance: number;
    setDistance: (value: number) => void;
    isMoving: boolean; // New prop to determine if the scenario is moving
}

const Controls = ({
    frequency,
    setFrequency,
    velocity,
    setVelocity,
    distance,
    setDistance,
    isMoving, // Receive the isMoving prop
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
                        {/* Slider for frequency */}
                        <input
                            type="range"
                            min="10"
                            max="100"
                            step="1"
                            value={frequency}
                            onChange={(e) => {
                                const newFrequency = parseFloat(e.target.value);
                                setFrequency(newFrequency);
                            }}
                            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />

                        {/* Number input for frequency */}
                        <input
                            type="number"
                            min="10"
                            max="100"
                            step="1"
                            value={frequency}
                            onChange={(e) => {
                                const newFrequency = parseFloat(e.target.value);
                                if (newFrequency >= 10 && newFrequency <= 100) {
                                    setFrequency(newFrequency);
                                }
                            }}
                            className="w-20 h-10 p-2 border border-gray-300 bg-gray-700 rounded-lg text-white"
                            placeholder="MHz"
                        />
                    </div>
                </div>
                {isMoving  && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Velocity (m/s)
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                min="0"
                                max="300000000"
                                step="100"
                                value={velocity}
                                onChange={(e) => setVelocity(parseFloat(e.target.value))}
                                className="flex-1 h-10 p-2 border border-gray-300 bg-gray-700 rounded-lg text-white"
                                placeholder="Enter velocity (m/s)"
                            />
                            <span className="w-32 text-right text-sm bg-gray-700 rounded px-2 py-1 text-white">
                                {velocity >= 1e6
                                    ? `${(velocity / 1e6).toFixed(2)}e6 m/s`
                                    : `${velocity} m/s`}
                            </span>
                        </div>
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Distance (m)
                    </label>
                    <div className="flex items-center gap-4">
                        {/* Slider for distance */}
                        <input
                            type="range"
                            min="10"
                            max="300"
                            step="10"
                            value={distance}
                            onChange={(e) => {
                                const newDistance = parseFloat(e.target.value);
                                setDistance(newDistance);
                            }}
                            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />

                        {/* Number input for distance */}
                        <input
                            type="number"
                            min="10"
                            max="300"
                            step="10"
                            value={distance}
                            onChange={(e) => {
                                const newDistance = parseFloat(e.target.value);
                                if (newDistance >= 10 && newDistance <= 300) {
                                    setDistance(newDistance);
                                }
                            }}
                            className="w-20 h-10 p-2 border border-gray-300 bg-gray-700 rounded-lg text-white"
                            placeholder="m"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controls;