import React from 'react';
import GenericCalculatorPage from '../../../components/GenericCalculatorPage';

const CalculatriceConversionDevises = () => {
  const inputs = [
    { name: 'montant', label: 'Montant', min: 0, max: 1000000, step: 1, defaultValue: 100 },
    { name: 'tauxChange', label: 'Taux de change', min: 0, max: 10, step: 0.0001, defaultValue: 1.1 },
  ];

  const calculate = (values) => {
    const { montant, tauxChange } = values;
    const resultat = montant * tauxChange;

    return {
      text: `Résultat de la conversion: ${resultat.toFixed(2)}`,
      chartData: {
        labels: ['Montant initial', 'Montant converti'],
        datasets: [{
          label: 'Conversion',
          data: [montant, resultat],
          backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
        }],
      },
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Conversion de devises' },
    },
  };

  return (
    <GenericCalculatorPage
      title="Calculatrice de conversion de devises"
      description="Convertissez un montant d'une devise à une autre"
      inputs={inputs}
      calculate={calculate}
      chartOptions={chartOptions}
    />
  );
};

export default CalculatriceConversionDevises;