import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../../components/Layout';
import { Slider, Typography, Paper, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

function CalculatriceRendementInvestissement() {
  const [investissementInitial, setInvestissementInitial] = useState(10000);
  const [valeurFinale, setValeurFinale] = useState(15000);
  const [duree, setDuree] = useState(5);
  const [rendementTotal, setRendementTotal] = useState(0);
  const [rendementAnnuel, setRendementAnnuel] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const currentYear = new Date().getFullYear();

  const calculate = useCallback(() => {
    const totalReturn = ((valeurFinale / investissementInitial - 1) * 100).toFixed(2);
    const annualReturn = ((Math.pow(valeurFinale / investissementInitial, 1 / duree) - 1) * 100).toFixed(2);

    setRendementTotal(totalReturn);
    setRendementAnnuel(annualReturn);

    const labels = Array.from({ length: duree }, (_, i) => `Année ${i + 1}`);
    const dataPoints = labels.map((_, i) => {
      return (investissementInitial * Math.pow(1 + annualReturn / 100, i + 1)).toFixed(2);
    });

    setChartData({
      labels,
      datasets: [
        {
          label: "Valeur de l'investissement",
          data: dataPoints,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    });
  }, [investissementInitial, valeurFinale, duree]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <Layout
      title={`[${currentYear}] Calculatrice de Rendement d'Investissement - Estimez Vos Gains Potentiels`}
      description="Utilisez notre calculatrice de rendement d'investissement pour estimer le rendement total et annuel de vos placements en fonction de votre investissement initial, de la valeur finale et de la durée. Prenez des décisions éclairées pour optimiser vos investissements."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteneur principal */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-700 border-b-4 border-blue-500 pb-3 inline-block">
            Calculez le Rendement de Votre Investissement
          </h1>

          <p className="mb-8 text-justify">
            Utilisez notre calculatrice de rendement d'investissement pour estimer rapidement le rendement total et annuel de vos placements en fonction de votre investissement initial, de la valeur finale et de la durée. Que vous planifiiez un nouvel investissement ou évaluiez la performance d'un placement existant, notre outil vous offre une estimation claire pour vous aider à optimiser vos décisions financières.
          </p>

          <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography gutterBottom>Investissement initial: {investissementInitial} €</Typography>
                <Slider
                  value={investissementInitial}
                  onChange={(e, newValue) => setInvestissementInitial(newValue)}
                  min={0}
                  max={1000000}
                  step={100}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Valeur finale: {valeurFinale} €</Typography>
                <Slider
                  value={valeurFinale}
                  onChange={(e, newValue) => setValeurFinale(newValue)}
                  min={0}
                  max={2000000}
                  step={100}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Durée: {duree} ans</Typography>
                <Slider
                  value={duree}
                  onChange={(e, newValue) => setDuree(newValue)}
                  min={1}
                  max={50}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Rendement total: {rendementTotal}% | Rendement annuel: {rendementAnnuel}%
            </Typography>
          </Paper>

          {/* Graphique */}
          <div className="mt-8">
            <Line data={chartData} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Première partie : Explication du fonctionnement */}
          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Comment Utiliser Cette Calculatrice de Rendement d'Investissement
          </h2>

          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Investissement initial :</strong> Entrez le montant que vous avez investi au départ.
            </li>
            <li>
              <strong>Valeur finale :</strong> Indiquez la valeur de votre investissement à la fin de la période.
            </li>
            <li>
              <strong>Durée :</strong> Sélectionnez la durée totale de l'investissement en années.
            </li>
          </ul>

          {/* Deuxième partie : Texte SEO sur "rendement investissement" */}
          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Maximisez Votre Rendement d'Investissement
          </h2>
          <p className="mb-4">
            Le <strong>rendement investissement</strong> est un indicateur clé pour évaluer la performance de vos placements. Il vous permet de comprendre combien votre investissement a rapporté sur une période donnée. En optimisant vos stratégies, vous pouvez augmenter votre rendement et atteindre vos objectifs financiers plus rapidement.
          </p>
          <p className="mb-4">
            Différents facteurs influencent le <strong>rendement investissement</strong>, tels que le type d'actif, les frais associés, et les conditions du marché. Il est essentiel de diversifier votre portefeuille et de rester informé des tendances économiques pour minimiser les risques et maximiser les gains potentiels.
          </p>
          <p className="mb-4">
            Utiliser une calculatrice de <strong>rendement investissement</strong> vous aide à simuler différents scénarios et à prendre des décisions éclairées. En ajustant les paramètres tels que l'investissement initial, la valeur finale, et la durée, vous pouvez planifier vos investissements de manière stratégique pour obtenir le meilleur rendement possible.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Besoin d'aide ?
          </h2>
          <p>
            Si vous avez des questions sur vos investissements ou besoin de conseils personnalisés, n'hésitez pas à{' '}
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

export default CalculatriceRendementInvestissement;
