import React from 'react';
import GenericCalculatorPage from '../../../components/GenericCalculatorPage';

const CalculatriceInteretsCartesCredit = () => {
  const inputs = [
    { name: 'solde', label: 'Solde actuel (€)', min: 0, max: 50000, step: 100, defaultValue: 5000 },
    { name: 'tauxInteret', label: 'Taux d\'intérêt annuel (%)', min: 0, max: 30, step: 0.1, defaultValue: 18 },
    { name: 'paiementMensuel', label: 'Paiement mensuel (€)', min: 0, max: 5000, step: 50, defaultValue: 200 },
  ];

  const calculate = (values) => {
    const { solde, tauxInteret, paiementMensuel } = values;
    const tauxMensuel = tauxInteret / 100 / 12;
    let soldeRestant = solde;
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
        labels: ['Solde initial', 'Intérêts payés'],
        datasets: [{
          label: 'Répartition du remboursement',
          data: [solde, interetsTotal],
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
      title="Calculatrice des intérêts de cartes de crédit"
      description="Calculez le temps de remboursement et les intérêts totaux de votre carte de crédit"
      inputs={inputs}
      calculate={calculate}
      chartOptions={chartOptions}
    />
  );
};

export default CalculatriceInteretsCartesCredit;