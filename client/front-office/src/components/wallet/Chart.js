import React from 'react';

import { Doughnut } from 'react-chartjs-2';

const Chart = ({ array }) => {
  const filterLabels = array.filter((x) => x.status === true);
  console.log(array);
  const data = {
    labels: filterLabels.slice(0, 10).map((x) => x.name.slice(0, 4)),
    datasets: [
      {
        label: '# of votes',
        data: array.slice(0, 10).map((el) => (el.status ? el.balance : '')),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    responsive: false,
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };
  return <Doughnut width={300} height={250} data={data} options={options} />;
};

export default Chart;
