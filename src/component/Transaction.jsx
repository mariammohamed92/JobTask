import React from 'react';
import { Line } from 'react-chartjs-2';

const TransactionChart = ({ transactions }) => {
  
  const Chart = {
    labels: transactions.map(transaction => transaction.date),
    datasets: [
      {
        label: 'Transaction Amount',
        data: transactions.map(transaction => transaction.amount),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div>
    <h2>{transactions.name}</h2>
      <Line data={Chart} />
    </div>
  );
};

export default TransactionChart;
