import React from 'react';
import GenericCalculatorPage from '../../../components/GenericCalculatorPage';

const CalculatriceRemboursementDettes = () => {
  const inputs = [
    { name: 'montantDette', label: 'Montant total de la dette (€)', min: 0, max: 1000000, step: 1000, defaultValue: 50000 },
    { name: 'tauxInteret', label: 'Taux d\'intérêt annuel (%)', min: 0, max: 30, step: 0.1, defaultValue: 5 },
    { name: 'paiementMensuel', label: 'Paiement mensuel (€)', min: 0, max: 10000, step: 100, defaultValue: 1000 },
  ];

  const calculate = (values) => {
    const { montantDette, tauxInteret, paiementMensuel } = values;
    const tauxMensuel = tauxInteret / 100 / 12;
    let soldeRestant = montantDette;
    let mois = 0;
    let interetsTotal = 0;

    while (soldeRestant > 0 && mois < 360) {
      const interetsMensuel = soldeRestant * tauxMensuel;
      interetsTotal += interetsMensuel;
      soldeRestant = soldeRestant + interetsMensuel - paiementMensuel;
      mois++;
    }

    const tempsRemboursement = mois < 360 ? mois : "Plus de 30 ans";

    return {
      text: `Temps de remboursement: ${tempsRemboursement} mois | Intérêts totaux: ${interetsTotal.toFixed(2)}€`,
      chartData: {
        labels: ['Principal', 'Intérêts'],
        datasets: [{
          label: 'Répartition du remboursement',
          data: [montantDette, interetsTotal],
          backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
        }],
      },
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Répartition du remboursement' },
    },
  };

  return (
    <GenericCalculatorPage
      title="Calculatrice de remboursement de dettes"
      description="Calculez le temps nécessaire pour rembourser votre dette et les intérêts totaux"
      inputs={inputs}
      calculate={calculate}
      chartOptions={chartOptions}
    />
  );
};

export default CalculatriceRemboursementDettes;