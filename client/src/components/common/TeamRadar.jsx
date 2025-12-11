import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const TeamRadar = ({ statsA, statsB, nameA, nameB }) => {
  const data = {
    labels: ['Attack', 'Midfield', 'Defense', 'Physicality', 'Technique', 'OVR'],
    datasets: [
      {
        label: nameA,
        data: [
          statsA.attack, 
          statsA.midfield, 
          statsA.defense, 
          (statsA.defense + statsA.attack)/2, 
          (statsA.midfield + statsA.attack)/2, 
          statsA.overall 
        ],
        backgroundColor: 'rgba(19, 236, 109, 0.2)',
        borderColor: '#13ec6d',
        borderWidth: 2,
      },
      {
        label: nameB,
        data: [
          statsB.attack, 
          statsB.midfield, 
          statsB.defense, 
          (statsB.defense + statsB.attack)/2, 
          (statsB.midfield + statsB.attack)/2,
          statsB.overall
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: '#ff6384',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: 'white', font: { size: 10, family: 'sans-serif' } },
        ticks: { display: false, backdropColor: 'transparent' },
        suggestedMin: 50,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: { labels: { color: 'white' } }
    }
  };

  return <Radar data={data} options={options} />;
};

export default TeamRadar;