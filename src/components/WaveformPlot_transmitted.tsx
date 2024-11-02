// WaveformPlot_transmitted.tsx

import React from 'react';
import Plot from 'react-plotly.js';

interface WaveformPlotProps {
  frequency: number; // in MHz
  velocity: number; // in m/s
  distance: number; // in meters
  isMoving: boolean;
}

const WaveformPlot_transmitted: React.FC<WaveformPlotProps> = ({
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
  const x = Array.from({ length: numPoints }, (_, i) => i / (10*100*1e6)); // Time array from 0 to distance/c
  const y = x.map((t) => Math.cos(omega * t)); // Transmitted signal values

  return (
    <Plot
      data={[
        {
          x: x,
          y: y,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: '#3B82F6' },
          name: 'Transmitted Signal',
        },
      ]}
      layout={{
        title: 'Transmitted Signal Waveform',
        xaxis: {
          title: 'Time (s)',
          showgrid: true,
          zeroline: false,
        },
        yaxis: {
          title: 'Amplitude',
          showgrid: true,
          zeroline: false,
        },
        hovermode: 'closest',
      }}
      style={{ width: '100%', height: '100%' }}
      config={{ responsive: true }}
    />
  );
};

export default WaveformPlot_transmitted;
