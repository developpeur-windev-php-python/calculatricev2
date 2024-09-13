import React from 'react';
import GenericCalculatorPage from '../../../components/GenericCalculatorPage';

const CalculatriceInteretsComposes = () => {
  const inputs = [
    { name: 'capitalInitial', label: 'Capital initial (€)', min: 0, max: 1000000, step: 100, defaultValue: 10000 },
    { name: 'tauxInteret', label: 'Taux d\'intérêt annuel (%)', min: 0, max: 20, step: 0.1, defaultValue: 5 },
    { name: 'duree', label: 'Durée (années)', min: 1, max: 50, step: 1, defaultValue: 10 },
    { name: 'versementRegulier', label: 'Versement régulier (€)', min: 0, max: 10000, step: 100, defaultValue: 0 },
  ];

  const calculate = (values) => {
    const { capitalInitial, tauxInteret, duree, versementRegulier } = values;
    const tauxMensuel = tauxInteret / 100 / 12;
    const nombreMois = duree * 12;
    
    let montantFinal = capitalInitial;
    for (let i = 0; i < nombreMois; i++) {
      montantFinal = montantFinal * (1 + tauxMensuel) + versementRegulier;
    }
    
    const interetsGagnes = montantFinal - capitalInitial - (versementRegulier * nombreMois);

    return {
      text: `Montant final: ${montantFinal.toFixed(2)}€ | Intérêts gagnés: ${interetsGagnes.toFixed(2)}€`,
      chartData: {
        labels: Array.from({ length: duree }, (_, i) => `Année ${i + 1}`),
        datasets: [{
          label: 'Montant total',
          data: Array.from({ length: duree }, (_, i) => {
            let montant = capitalInitial;
            for (let j = 0; j < (i + 1) * 12; j++) {
              montant = montant * (1 + tauxMensuel) + versementRegulier;
            }
            return montant;
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
      title: { display: true, text: 'Évolution du capital' },
    },
  };

  return (
    <GenericCalculatorPage
      title="Calculatrice d'intérêts composés"
      description="Calculez la croissance de votre capital avec les intérêts composés"
      inputs={inputs}
      calculate={calculate}
      chartOptions={chartOptions}
    />
  );
};

export default CalculatriceInteretsComposes;