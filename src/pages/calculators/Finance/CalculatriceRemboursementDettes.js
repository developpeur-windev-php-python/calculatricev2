import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../../components/Layout';
import { Slider, Typography, Paper, Grid } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title as ChartTitle,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, ChartTitle);

function CalculatriceRemboursementDettes() {
  const [montantDette, setMontantDette] = useState(50000);
  const [tauxInteret, setTauxInteret] = useState(5);
  const [paiementMensuel, setPaiementMensuel] = useState(1000);
  const [tempsRemboursement, setTempsRemboursement] = useState(0);
  const [interetsTotal, setInteretsTotal] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const currentYear = new Date().getFullYear();

  const calculate = useCallback(() => {
    const tauxMensuel = tauxInteret / 100 / 12;
    let soldeRestant = montantDette;
    let mois = 0;
    let interetsTotalAcc = 0;

    if (paiementMensuel <= soldeRestant * tauxMensuel) {
      setTempsRemboursement('Paiement mensuel insuffisant');
      setInteretsTotal('N/A');
      setChartData({
        labels: [],
        datasets: [],
      });
      return;
    }

    while (soldeRestant > 0 && mois < 360) {
      const interetsMensuel = soldeRestant * tauxMensuel;
      interetsTotalAcc += interetsMensuel;
      soldeRestant = soldeRestant + interetsMensuel - paiementMensuel;
      if (soldeRestant < 0) {
        interetsTotalAcc += soldeRestant; // Ajuster les intérêts totaux si le dernier paiement dépasse le solde
        soldeRestant = 0;
      }
      mois++;
    }

    const tempsRemboursementResult = mois < 360 ? mois : 'Plus de 30 ans';
    setTempsRemboursement(tempsRemboursementResult);
    setInteretsTotal(interetsTotalAcc.toFixed(2));

    setChartData({
      labels: ['Principal', 'Intérêts'],
      datasets: [
        {
          label: 'Répartition du remboursement',
          data: [montantDette, interetsTotalAcc],
          backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
        },
      ],
    });
  }, [montantDette, tauxInteret, paiementMensuel]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <Layout
      title={`[${currentYear}] Calculatrice de Remboursement de Dettes - Planifiez Votre Stratégie de Paiement`}
      description="Utilisez notre calculatrice de remboursement de dettes pour estimer le temps nécessaire pour rembourser votre dette et le montant total des intérêts. Prenez le contrôle de vos finances en élaborant un plan de remboursement efficace."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteneur principal */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-700 border-b-4 border-blue-500 pb-3 inline-block">
            Calculez le Remboursement de Votre Dette
          </h1>

          <p className="mb-8 text-justify">
            Utilisez notre calculatrice de remboursement de dettes pour estimer rapidement le temps nécessaire pour rembourser votre dette et le montant total des intérêts que vous paierez. Comprendre l'impact des taux d'intérêt et des paiements mensuels sur votre dette vous aide à élaborer un plan efficace pour vous libérer de vos dettes.
          </p>

          <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography gutterBottom>Montant total de la dette: {montantDette} €</Typography>
                <Slider
                  value={montantDette}
                  onChange={(e, newValue) => setMontantDette(newValue)}
                  min={0}
                  max={1000000}
                  step={1000}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Taux d'intérêt annuel: {tauxInteret}%</Typography>
                <Slider
                  value={tauxInteret}
                  onChange={(e, newValue) => setTauxInteret(newValue)}
                  min={0}
                  max={30}
                  step={0.1}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Paiement mensuel: {paiementMensuel} €</Typography>
                <Slider
                  value={paiementMensuel}
                  onChange={(e, newValue) => setPaiementMensuel(newValue)}
                  min={0}
                  max={10000}
                  step={100}
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Temps de remboursement: {tempsRemboursement} mois | Intérêts totaux: {interetsTotal} €
            </Typography>
          </Paper>

          {/* Graphique */}
          {chartData.labels.length > 0 && (
            <div className="mt-8">
              <Pie data={chartData} options={{ responsive: true }} />
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Première partie : Explication du fonctionnement */}
          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Comment Utiliser Cette Calculatrice de Remboursement de Dettes
          </h2>

          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Montant total de la dette :</strong> Entrez le montant total que vous devez.
            </li>
            <li>
              <strong>Taux d'intérêt annuel :</strong> Indiquez le taux d'intérêt annuel appliqué à votre dette.
            </li>
            <li>
              <strong>Paiement mensuel :</strong> Entrez le montant que vous pouvez payer chaque mois pour rembourser votre dette.
            </li>
          </ul>

          {/* Deuxième partie : Texte SEO sur "remboursement dettes" */}
          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Planifiez Votre Stratégie de Remboursement de Dettes
          </h2>
          <p className="mb-4">
            Le <strong>remboursement des dettes</strong> est une étape cruciale pour améliorer votre santé financière. En comprenant combien de temps il vous faudra pour rembourser vos dettes et le montant total des intérêts que vous paierez, vous pouvez élaborer une stratégie efficace pour vous libérer de vos obligations financières.
          </p>
          <p className="mb-4">
            Différentes approches peuvent être adoptées pour le <strong>remboursement des dettes</strong>, telles que la méthode de la boule de neige (rembourser d'abord les petites dettes) ou la méthode de l'avalanche (rembourser d'abord les dettes avec les taux d'intérêt les plus élevés). Choisir la bonne stratégie peut vous aider à économiser sur les intérêts et à réduire le temps de remboursement.
          </p>
          <p className="mb-4">
            Utilisez notre calculatrice pour simuler différents scénarios de <strong>remboursement des dettes</strong>. En ajustant vos paiements mensuels et en comprenant l'impact des taux d'intérêt, vous pouvez prendre des décisions éclairées pour accélérer votre chemin vers la liberté financière.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Besoin d'aide ?
          </h2>
          <p>
            Si vous avez des questions sur la gestion de vos dettes ou besoin de conseils personnalisés, n'hésitez pas à{' '}
            <a href="#" className="text-blue-500 underline">
              nous contacter
            </a>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default CalculatriceRemboursementDettes;
