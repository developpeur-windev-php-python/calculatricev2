import React from 'react';
import GenericCalculatorPage from '../../../components/GenericCalculatorPage';

const CalculatricePlanificateurBudget = () => {
  const inputs = [
    { name: 'revenuMensuel', label: 'Revenu mensuel (€)', min: 0, max: 10000, step: 100, defaultValue: 2500 },
    { name: 'depensesFixes', label: 'Dépenses fixes (€)', min: 0, max: 5000, step: 50, defaultValue: 1000 },
    { name: 'depensesVariables', label: 'Dépenses variables (€)', min: 0, max: 5000, step: 50, defaultValue: 800 },
    { name: 'epargneObjectif', label: 'Objectif d\'épargne (%)', min: 0, max: 50, step: 1, defaultValue: 20 },
  ];

  const calculate = (values) => {
    const { revenuMensuel, depensesFixes, depensesVariables, epargneObjectif } = values;
    const depensesTotales = depensesFixes + depensesVariables;
    const epargneReelle = revenuMensuel - depensesTotales;
    const epargneObjectifMontant = revenuMensuel * (epargneObjectif / 100);
    const difference = epargneReelle - epargneObjectifMontant;

    return {
      text: `Épargne réelle: ${epargneReelle.toFixed(2)}€ | Objectif d'épargne: ${epargneObjectifMontant.toFixed(2)}€ | Différence: ${difference.toFixed(2)}€`,
      chartData: {
        labels: ['Dépenses fixes', 'Dépenses variables', 'Épargne réelle'],
        datasets: [{
          label: 'Répartition du budget',
          data: [depensesFixes, depensesVariables, epargneReelle],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)'],
        }],
      },
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Répartition du budget' },
    },
  };

  return (
    <GenericCalculatorPage
      title="Calculatrice de planification budgétaire"
      description="Planifiez votre budget mensuel et visualisez la répartition de vos dépenses"
      inputs={inputs}
      calculate={calculate}
      chartOptions={chartOptions}
    />
  );
};

export default CalculatricePlanificateurBudget;