import React from 'react';
import GenericCalculatorPage from '../../components/GenericCalculatorPage';

const CalculatriceHypotheque = () => {
  const inputs = [
    { name: 'montantPret', label: 'Montant du prêt (€)', min: 10000, max: 1000000, step: 1000, defaultValue: 200000 },
    { name: 'tauxInteret', label: 'Taux d\'intérêt annuel (%)', min: 0.1, max: 10, step: 0.1, defaultValue: 2.5 },
    { name: 'duree', label: 'Durée du prêt (années)', min: 5, max: 30, step: 1, defaultValue: 25 },
  ];

  const calculate = (values) => {
    const { montantPret, tauxInteret, duree } = values;
    const tauxMensuel = tauxInteret / 100 / 12;
    const nombrePaiements = duree * 12;
    const paiementMensuel = (montantPret * tauxMensuel * Math.pow(1 + tauxMensuel, nombrePaiements)) / (Math.pow(1 + tauxMensuel, nombrePaiements) - 1);
    const coutTotal = paiementMensuel * nombrePaiements;
    const interetsTotal = coutTotal - montantPret;

    const labels = Array.from({ length: duree }, (_, i) => `Année ${i + 1}`);
    const capitalRembourse = labels.map((_, i) => montantPret * (i + 1) / duree);
    const interetsPayes = labels.map((_, i) => (coutTotal * (i + 1) / duree) - capitalRembourse[i]);

    return {
      text: `Paiement mensuel: ${paiementMensuel.toFixed(2)}€ | Coût total: ${coutTotal.toFixed(2)}€ | Intérêts totaux: ${interetsTotal.toFixed(2)}€`,
      chartData: {
        labels,
        datasets: [
          {
            label: 'Capital remboursé',
            data: capitalRembourse,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
          {
            label: 'Intérêts payés',
            data: interetsPayes,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
          },
        ],
      },
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Évolution du remboursement',
      },
    },
  };

  return (
    <GenericCalculatorPage
      title="Calculatrice d'hypothèque"
      description="Calculez vos mensualités et le coût total de votre prêt immobilier"
      inputs={inputs}
      calculate={calculate}
      chartOptions={chartOptions}
    />
  );
};

export default CalculatriceHypotheque;