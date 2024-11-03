// WaveformPlot_received.tsx

import React from 'react';
import Plot from 'react-plotly.js';

interface WaveformPlotProps {
  frequency: number; // in MHz
  velocity: number; // in m/s
  distance: number; // in meters
  isMoving: boolean;
}

const WaveformPlot_received: React.FC<WaveformPlotProps> = ({
  frequency,
  velocity,
  distance,
  isMoving,
}) => {
  // Constants
  const c = 3e8; // Speed of light in m/s
  const omega = 2 * Math.PI * frequency * 1e6; // Angular frequency in rad/s

  // Adjusted frequency due to Doppler effect (if isMoving is true)
  const adjustedFrequency = isMoving ? frequency * ((c - velocity) / c) : frequency;
  const adjustedOmega = 2 * Math.PI * adjustedFrequency * 1e6; // Adjusted angular frequency

  // Generate data points
  const numPoints = 200; // Number of points for the plot
  const x = Array.from({ length: numPoints }, (_, i) => i / (10*100*1e6)); // Time array
  const y = x.map((t) => Math.cos(adjustedOmega * (t - distance / c))); // Received signal values with delay

  return (
    <Plot
      data={[
        {
          x: x,
          y: y,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: '#10B981' },
          name: 'Received Signal',
        },
      ]}
      layout={{
        title: 'Received Signal Waveform',
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

export default WaveformPlot_received;