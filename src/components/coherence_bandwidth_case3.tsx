// WaveformPlot_received.tsx

import React from 'react';
import Plot from 'react-plotly.js';

interface WaveformPlotProps {
  frequency: number; // in MHz
  velocity: number; // in m/s
  distance: number; // in meters
  isMoving: boolean;
  hasReflection:boolean
}

const coherence_bandwidth_case3: React.FC<WaveformPlotProps> = ({

}) => {
   

  // Generate data points
  const numPoints = 500; // Number of points for the plot
  const x = Array.from({ length: numPoints }, (_, i) => i / (100)); // Time array

  // Calculate received signal values
  const y = x.map((distance) => {
    return (3e8 / (4 * (300 - distance))/1e6).toFixed(2) + ' MHz';; // Received signal calculation
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
          name: 'Coherence Bandwidth (MHz)',
        },
      ]}
      layout={{
        title: 'Coherence Bandwidth Plot',
        xaxis: {
          title: 'distance (m)',
          showgrid: true,
          zeroline: false,
        },
        yaxis: {
          title: 'Coherence Bandwidth (MHz)',
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

export default coherence_bandwidth_case3;
