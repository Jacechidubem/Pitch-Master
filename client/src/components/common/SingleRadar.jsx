import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const SingleRadar = ({ stats, name }) => {
  // Guard clause: If stats are missing, don't crash, just return null
  if (!stats) return null;

  const data = {
    labels: ['Attack', 'Midfield', 'Defense', 'Physical', 'Technique', 'OVR'],
    datasets: [
      {
        label: name,
        data: [
          stats.attack, 
          stats.midfield, 
          stats.defense, 
          (stats.defense + stats.attack)/2, 
          (stats.midfield + stats.attack)/2, 
          stats.overall 
        ],
        backgroundColor: 'rgba(19, 236, 109, 0.2)', // Neon Green Transparent
        borderColor: '#13ec6d',
        borderWidth: 2,
        pointBackgroundColor: '#13ec6d',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: 'white', font: { size: 10 } },
        ticks: { display: false, backdropColor: 'transparent' },
        suggestedMin: 40,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: { display: false }
    },
    maintainAspectRatio: false // <--- IMPORTANT: Allows us to resize it with CSS
  };

  return <Radar data={data} options={options} />;
};

export default SingleRadar;