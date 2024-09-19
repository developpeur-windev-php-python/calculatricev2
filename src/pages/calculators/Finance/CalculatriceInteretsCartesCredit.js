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

function CalculatriceInteretsCartesCredit() {
  const [solde, setSolde] = useState(5000);
  const [tauxInteret, setTauxInteret] = useState(18);
  const [paiementMensuel, setPaiementMensuel] = useState(200);
  const [tempsRemboursement, setTempsRemboursement] = useState(0);
  const [interetsTotal, setInteretsTotal] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const currentYear = new Date().getFullYear();

  const calculate = useCallback(() => {
    const tauxMensuel = tauxInteret / 100 / 12;
    let soldeRestant = solde;
    let mois = 0;
    let interetsTotalAcc = 0;

    if (paiementMensuel <= solde * tauxMensuel) {
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
      labels: ['Solde initial', 'Intérêts payés'],
      datasets: [
        {
          label: 'Répartition du remboursement',
          data: [solde, interetsTotalAcc],
          backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
        },
      ],
    });
  }, [solde, tauxInteret, paiementMensuel]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <Layout
      title={`[${currentYear}] Calculatrice des Intérêts de Cartes de Crédit - Gérez Vos Dettes Efficacement`}
      description="Utilisez notre calculatrice des intérêts de cartes de crédit pour estimer le temps de remboursement et les intérêts totaux en fonction de votre solde actuel, du taux d'intérêt et de votre paiement mensuel. Prenez le contrôle de vos finances dès aujourd'hui."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteneur principal */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-700 border-b-4 border-blue-500 pb-3 inline-block">
            Calculez les Intérêts de Votre Carte de Crédit
          </h1>

          <p className="mb-8 text-justify">
            Utilisez notre calculatrice des intérêts de cartes de crédit pour estimer rapidement le temps nécessaire pour rembourser votre solde et le montant total des intérêts que vous paierez. Comprendre l'impact des taux d'intérêt et des paiements mensuels sur votre dette vous aide à élaborer un plan efficace pour vous libérer de vos dettes.
          </p>

          <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography gutterBottom>Solde actuel: {solde} €</Typography>
                <Slider
                  value={solde}
                  onChange={(e, newValue) => setSolde(newValue)}
                  min={0}
                  max={50000}
                  step={100}
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
                  max={5000}
                  step={50}
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
            Comment Utiliser Cette Calculatrice des Intérêts de Cartes de Crédit
          </h2>

          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Solde actuel :</strong> Entrez le montant total que vous devez sur votre carte de crédit.
            </li>
            <li>
              <strong>Taux d'intérêt annuel :</strong> Indiquez le taux d'intérêt annuel appliqué à votre carte.
            </li>
            <li>
              <strong>Paiement mensuel :</strong> Entrez le montant que vous pouvez payer chaque mois.
            </li>
          </ul>

          {/* Deuxième partie : Texte SEO sur "intérêts cartes de crédit" */}
          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Maîtrisez Vos Finances en Comprenant les Intérêts des Cartes de Crédit
          </h2>
          <p className="mb-4">
            Les <strong>intérêts cartes de crédit</strong> peuvent rapidement s'accumuler et rendre la dette difficile à rembourser si elle n'est pas gérée correctement. Les taux d'intérêt élevés associés aux cartes de crédit signifient que plus vous prenez de temps pour rembourser votre solde, plus vous payez d'intérêts.
          </p>
          <p className="mb-4">
            En calculant les <strong>intérêts cartes de crédit</strong>, vous pouvez comprendre l'impact financier de vos paiements mensuels actuels. Augmenter vos paiements mensuels, même légèrement, peut réduire considérablement le temps de remboursement et le montant total des intérêts payés.
          </p>
          <p className="mb-4">
            Utilisez notre calculatrice pour planifier une stratégie de remboursement efficace. En connaissant vos <strong>intérêts cartes de crédit</strong>, vous pouvez prendre des mesures pour réduire votre dette plus rapidement, économiser de l'argent et améliorer votre santé financière globale.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Besoin d'aide ?
          </h2>
          <p>
            Si vous avez des questions sur la gestion de votre dette de carte de crédit ou besoin de conseils personnalisés, n'hésitez pas à{' '}
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

export default CalculatriceInteretsCartesCredit;
