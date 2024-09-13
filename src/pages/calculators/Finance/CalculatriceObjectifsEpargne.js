import React from 'react';
import GenericCalculatorPage from '../../../components/GenericCalculatorPage';

const CalculatriceObjectifsEpargne = () => {
  const inputs = [
    { name: 'objectif', label: 'Objectif d\'épargne (€)', min: 0, max: 1000000, step: 1000, defaultValue: 50000 },
    { name: 'epargneInitiale', label: 'Épargne initiale (€)', min: 0, max: 1000000, step: 1000, defaultValue: 5000 },
    { name: 'epargneReguliere', label: 'Épargne mensuelle (€)', min: 0, max: 10000, step: 100, defaultValue: 500 },
    { name: 'tauxInteret', label: 'Taux d\'intérêt annuel (%)', min: 0, max: 10, step: 0.1, defaultValue: 2 },
  ];

  const calculate = (values) => {
    const { objectif, epargneInitiale, epargneReguliere, tauxInteret } = values;
    const tauxMensuel = tauxInteret / 100 / 12;
    let epargneActuelle = epargneInitiale;
    let mois = 0;

    while (epargneActuelle < objectif && mois < 600) {
      epargneActuelle = epargneActuelle * (1 + tauxMensuel) + epargneReguliere;
      mois++;
    }

    const tempsNecessaire = mois < 600 ? mois : "Plus de 50 ans";

    return {
      text: `Temps nécessaire pour atteindre l'objectif: ${tempsNecessaire} mois`,
      chartData: {
        labels: Array.from({ length: Math.min(mois, 60) }, (_, i) => `Mois ${i + 1}`),
        datasets: [{
          label: 'Progression de l\'épargne',
          data: Array.from({ length: Math.min(mois, 60) }, (_, i) => {
            let epargne = epargneInitiale;
            for (let j = 0; j <= i; j++) {
              epargne = epargne * (1 + tauxMensuel) + epargneReguliere;
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
      title: { display: true, text: 'Progression de l\'épargne' },
    },
  };

  return (
    <GenericCalculatorPage
      title="Calculatrice d'objectifs d'épargne"
      description="Calculez le temps nécessaire pour atteindre votre objectif d'épargne"
      inputs={inputs}
      calculate={calculate}
      chartOptions={chartOptions}
    />
  );
};

export default CalculatriceObjectifsEpargne;