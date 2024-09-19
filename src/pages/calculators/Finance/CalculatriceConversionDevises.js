import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../../components/Layout';
import { Slider, Typography, Paper, Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

function CalculatriceConversionDevises() {
  const [montant, setMontant] = useState(100);
  const [tauxChange, setTauxChange] = useState(1.1);
  const [resultat, setResultat] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const currentYear = new Date().getFullYear();

  const calculate = useCallback(() => {
    const conversionResult = montant * tauxChange;
    setResultat(conversionResult.toFixed(2));

    setChartData({
      labels: ['Montant initial', 'Montant converti'],
      datasets: [
        {
          label: 'Conversion',
          data: [montant, conversionResult],
          backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
        },
      ],
    });
  }, [montant, tauxChange]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <Layout
      title={`[${currentYear}] Calculatrice de Conversion de Devises - Convertissez Vos Montants Facilement`}
      description="Utilisez notre calculatrice de conversion de devises pour convertir rapidement des montants d'une devise à une autre en fonction du taux de change actuel. Simplifiez vos transactions internationales avec notre outil intuitif."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteneur principal */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-700 border-b-4 border-blue-500 pb-3 inline-block">
            Convertissez Vos Devises Facilement
          </h1>

          <p className="mb-8 text-justify">
            Utilisez notre calculatrice de conversion de devises pour convertir rapidement des montants d'une devise à une autre en fonction du taux de change actuel. Que vous planifiiez un voyage, fassiez des affaires à l'étranger ou suiviez les marchés financiers, notre outil vous offre une estimation claire et simple pour vous aider dans vos transactions internationales.
          </p>

          <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography gutterBottom>Montant: {montant} €</Typography>
                <Slider
                  value={montant}
                  onChange={(e, newValue) => setMontant(newValue)}
                  min={0}
                  max={1000000}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Taux de change: {tauxChange}</Typography>
                <Slider
                  value={tauxChange}
                  onChange={(e, newValue) => setTauxChange(newValue)}
                  min={0}
                  max={10}
                  step={0.0001}
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Résultat de la conversion: {resultat} €
            </Typography>
          </Paper>

          {/* Graphique */}
          <div className="mt-8">
            <Bar data={chartData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Première partie : Explication du fonctionnement */}
          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Comment Utiliser Cette Calculatrice de Conversion de Devises
          </h2>

          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Montant :</strong> Entrez le montant que vous souhaitez convertir.
            </li>
            <li>
              <strong>Taux de change :</strong> Indiquez le taux de change actuel entre les deux devises.
            </li>
          </ul>

          {/* Deuxième partie : Texte SEO sur "conversion devises" */}
          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Facilitez Vos Transactions avec la Conversion de Devises
          </h2>
          <p className="mb-4">
            La <strong>conversion de devises</strong> est une étape cruciale dans les transactions internationales, que ce soit pour le commerce, le voyage ou l'investissement. Comprendre le taux de change et son impact sur le montant converti vous aide à planifier et à budgétiser efficacement.
          </p>
          <p className="mb-4">
            Les taux de change fluctuent constamment en fonction des conditions du marché. Utiliser une calculatrice de <strong>conversion de devises</strong> vous permet d'obtenir des estimations précises en temps réel, vous aidant ainsi à prendre des décisions éclairées lors de vos transactions financières.
          </p>
          <p className="mb-4">
            Que vous soyez un particulier ou un professionnel, maîtriser la <strong>conversion de devises</strong> est essentiel pour optimiser vos opérations financières à l'étranger. Notre outil convivial vous offre une solution rapide et fiable pour toutes vos conversions monétaires.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Besoin d'aide ?
          </h2>
          <p>
            Si vous avez des questions sur la conversion de devises ou besoin d'assistance, n'hésitez pas à{' '}
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

export default CalculatriceConversionDevises;
