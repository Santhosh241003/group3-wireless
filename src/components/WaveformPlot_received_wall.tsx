import React from 'react';
import Plot from 'react-plotly.js';

interface WaveformPlotProps {
  frequency: number; // in MHz
  velocity: number; // in m/s
  distance: number; // distance to the wall in meters
  isMoving: boolean; // indicates if the antenna is moving
}

const WaveformPlot_received_wall: React.FC<WaveformPlotProps> = ({
  frequency,
  velocity,
  distance,
  isMoving,
}) => {
  // Constants
  const c = 3e8; // Speed of light in m/s
  const omega = 2 * Math.PI * frequency * 1e6; // Angular frequency in rad/s

  // Generate data points
  const numPoints = 200; // Number of points for the plot
  const x = Array.from({ length: numPoints }, (_, i) => i / (10 * 100 * 1e6)); // Time array
  // Calculate received signal values
  const y = x.map((t) => {
    const r0 = distance; // Initial distance to the wall
    const d = 300; // Distance of reflection from the wall

    // Use the velocity value only if the antenna is moving
    const effectiveVelocity = isMoving ? velocity : 0;

    // Calculate each term in the equation
    const term1 = Math.cos(omega * ((1 - effectiveVelocity / c) * t - r0 / c)) / (r0 + effectiveVelocity * t);
    const term2 = Math.cos(omega * ((1 + effectiveVelocity / c) * t + (r0 - 2 * d) / c)) / (2 * d - r0 - effectiveVelocity * t);

    // Combine terms, ensuring division is applied correctly
    return term1 - term2; // Amplitude calculation based on divided terms
  });

  return (
    <Plot
      data={[
        {
          x: x,
          y: y,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: '#10B981' },
          name: 'Received Signal with Wall',
        },
      ]}
      layout={{
        title: 'Received Signal Waveform with Wall Reflection',
        xaxis: {
          title: 'Time (s)',
          showgrid: true,
          zeroline: false,
        },
        yaxis: {
          title: 'Amplitude',
          showgrid: true,
          zeroline: false,
          range:[0,1],
        },
        hovermode: 'closest',
      }}
      style={{ width: '100%', height: '100%' }}
      config={{ responsive: true }}
    />
  );
};

export default WaveformPlot_received_wall;
