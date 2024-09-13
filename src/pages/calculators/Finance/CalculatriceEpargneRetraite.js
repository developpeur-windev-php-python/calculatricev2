import React from 'react';
import GenericCalculatorPage from '../../../components/GenericCalculatorPage';

const CalculatriceEpargneRetraite = () => {
  const inputs = [
    { name: 'ageActuel', label: 'Âge actuel', min: 18, max: 65, step: 1, defaultValue: 30 },
    { name: 'ageRetraite', label: 'Âge de retraite souhaité', min: 55, max: 75, step: 1, defaultValue: 65 },
    { name: 'epargneActuelle', label: 'Épargne actuelle (€)', min: 0, max: 1000000, step: 1000, defaultValue: 50000 },
    { name: 'cotisationMensuelle', label: 'Cotisation mensuelle (€)', min: 0, max: 5000, step: 50, defaultValue: 500 },
    { name: 'tauxRendement', label: 'Taux de rendement annuel (%)', min: 0, max: 10, step: 0.1, defaultValue: 5 },
  ];

  const calculate = (values) => {
    const { ageActuel, ageRetraite, epargneActuelle, cotisationMensuelle, tauxRendement } = values;
    const annees = ageRetraite - ageActuel;
    const tauxMensuel = tauxRendement / 100 / 12;
    let epargneFinale = epargneActuelle;

    for (let i = 0; i < annees * 12; i++) {
      epargneFinale = epargneFinale * (1 + tauxMensuel) + cotisationMensuelle;
    }

    return {
      text: `Épargne estimée à la retraite: ${epargneFinale.toFixed(2)}€`,
      chartData: {
        labels: Array.from({ length: annees }, (_, i) => ageActuel + i + 1),
        datasets: [{
          label: 'Épargne cumulée',
          data: Array.from({ length: annees }, (_, i) => {
            let epargne = epargneActuelle;
            for (let j = 0; j < (i + 1) * 12; j++) {
              epargne = epargne * (1 + tauxMensuel) + cotisationMensuelle;
            }
            return epargne;
          }),
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
      title: { display: true, text: 'Évolution de l\'épargne retraite' },
    },
  };

  return (
    <GenericCalculatorPage
      title="Calculatrice d'épargne retraite"
      description="Estimez votre épargne à la retraite"
      inputs={inputs}
      calculate={calculate}
      chartOptions={chartOptions}
    />
  );
};

export default CalculatriceEpargneRetraite;