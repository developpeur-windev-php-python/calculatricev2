import React from 'react';
import GenericCalculatorPage from '../../../components/GenericCalculatorPage';

const CalculatriceRendementInvestissement = () => {
  const inputs = [
    { name: 'investissementInitial', label: 'Investissement initial (€)', min: 0, max: 1000000, step: 100, defaultValue: 10000 },
    { name: 'valeurFinale', label: 'Valeur finale (€)', min: 0, max: 2000000, step: 100, defaultValue: 15000 },
    { name: 'duree', label: 'Durée (années)', min: 1, max: 50, step: 1, defaultValue: 5 },
  ];

  const calculate = (values) => {
    const { investissementInitial, valeurFinale, duree } = values;
    const rendementTotal = (valeurFinale / investissementInitial - 1) * 100;
    const rendementAnnuel = (Math.pow(valeurFinale / investissementInitial, 1 / duree) - 1) * 100;

    return {
      text: `Rendement total: ${rendementTotal.toFixed(2)}% | Rendement annuel: ${rendementAnnuel.toFixed(2)}%`,
      chartData: {
        labels: Array.from({ length: duree }, (_, i) => `Année ${i + 1}`),
        datasets: [{
          label: 'Valeur de l\'investissement',
          data: Array.from({ length: duree }, (_, i) => investissementInitial * Math.pow(1 + rendementAnnuel / 100, i + 1)),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        }],
      },
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Évolution de l\'investissement' },
    },
  };

  return (
    <GenericCalculatorPage
      title="Calculatrice de rendement d'investissement"
      description="Calculez le rendement de votre investissement"
      inputs={inputs}
      calculate={calculate}
      chartOptions={chartOptions}
    />
  );
};

export default CalculatriceRendementInvestissement;