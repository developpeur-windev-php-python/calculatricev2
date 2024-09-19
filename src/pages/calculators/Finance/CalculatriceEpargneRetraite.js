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

function CalculatriceEpargneRetraite() {
  const [ageActuel, setAgeActuel] = useState(30);
  const [ageRetraite, setAgeRetraite] = useState(65);
  const [epargneActuelle, setEpargneActuelle] = useState(50000);
  const [cotisationMensuelle, setCotisationMensuelle] = useState(500);
  const [tauxRendement, setTauxRendement] = useState(5);
  const [epargneFinale, setEpargneFinale] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const currentYear = new Date().getFullYear();

  const calculate = useCallback(() => {
    const annees = ageRetraite - ageActuel;
    const tauxMensuel = tauxRendement / 100 / 12;
    let epargne = epargneActuelle;
    let dataPoints = [];

    for (let i = 0; i < annees * 12; i++) {
      epargne = epargne * (1 + tauxMensuel) + cotisationMensuelle;
      if ((i + 1) % 12 === 0) {
        dataPoints.push(epargne.toFixed(2));
      }
    }

    setEpargneFinale(epargne.toFixed(2));

    const labels = Array.from({ length: annees }, (_, i) => `Âge ${ageActuel + i + 1}`);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Épargne cumulée',
          data: dataPoints,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    });
  }, [ageActuel, ageRetraite, epargneActuelle, cotisationMensuelle, tauxRendement]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <Layout
      title={`[${currentYear}] Calculatrice d'Épargne Retraite - Planifiez Votre Avenir Financier`}
      description="Utilisez notre calculatrice d'épargne retraite pour estimer le montant que vous aurez accumulé à la retraite en fonction de votre épargne actuelle, de vos cotisations mensuelles et du taux de rendement. Préparez votre avenir dès aujourd'hui."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteneur principal */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-700 border-b-4 border-blue-500 pb-3 inline-block">
            Calculez Votre Épargne Retraite
          </h1>

          <p className="mb-8 text-justify">
            Utilisez notre calculatrice d'épargne retraite pour estimer rapidement le montant que vous aurez accumulé au moment de la retraite en fonction de votre épargne actuelle, de vos cotisations mensuelles, de votre âge actuel et du taux de rendement attendu. Planifiez dès maintenant pour assurer votre sécurité financière future.
          </p>

          <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography gutterBottom>Âge actuel: {ageActuel} ans</Typography>
                <Slider
                  value={ageActuel}
                  onChange={(e, newValue) => setAgeActuel(newValue)}
                  min={18}
                  max={65}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Âge de retraite souhaité: {ageRetraite} ans</Typography>
                <Slider
                  value={ageRetraite}
                  onChange={(e, newValue) => setAgeRetraite(newValue)}
                  min={ageActuel + 1}
                  max={75}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Épargne actuelle: {epargneActuelle} €</Typography>
                <Slider
                  value={epargneActuelle}
                  onChange={(e, newValue) => setEpargneActuelle(newValue)}
                  min={0}
                  max={1000000}
                  step={1000}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Cotisation mensuelle: {cotisationMensuelle} €</Typography>
                <Slider
                  value={cotisationMensuelle}
                  onChange={(e, newValue) => setCotisationMensuelle(newValue)}
                  min={0}
                  max={5000}
                  step={50}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Taux de rendement annuel: {tauxRendement}%</Typography>
                <Slider
                  value={tauxRendement}
                  onChange={(e, newValue) => setTauxRendement(newValue)}
                  min={0}
                  max={10}
                  step={0.1}
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Épargne estimée à la retraite: {epargneFinale} €
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
            Comment Utiliser Cette Calculatrice d'Épargne Retraite
          </h2>

          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Âge actuel :</strong> Indiquez votre âge actuel.
            </li>
            <li>
              <strong>Âge de retraite souhaité :</strong> Sélectionnez l'âge auquel vous souhaitez prendre votre retraite.
            </li>
            <li>
              <strong>Épargne actuelle :</strong> Entrez le montant que vous avez déjà épargné pour la retraite.
            </li>
            <li>
              <strong>Cotisation mensuelle :</strong> Indiquez le montant que vous prévoyez d'épargner chaque mois.
            </li>
            <li>
              <strong>Taux de rendement annuel :</strong> Estimez le taux de rendement annuel moyen de vos investissements.
            </li>
          </ul>

          {/* Deuxième partie : Texte SEO sur "épargne retraite" */}
          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Optimisez Votre Épargne Retraite pour un Avenir Serein
          </h2>
          <p className="mb-4">
            L'<strong>épargne retraite</strong> est essentielle pour assurer votre indépendance financière lors de vos années de retraite. En commençant à épargner tôt et régulièrement, vous pouvez profiter de l'effet des intérêts composés et maximiser votre capital accumulé.
          </p>
          <p className="mb-4">
            Il est important d'évaluer vos besoins futurs afin de déterminer le montant nécessaire pour maintenir votre niveau de vie. Notre calculatrice d'<strong>épargne retraite</strong> vous aide à estimer le montant que vous pourriez accumuler en fonction de vos cotisations et du rendement attendu.
          </p>
          <p className="mb-4">
            N'attendez pas pour commencer à planifier votre <strong>épargne retraite</strong>. Plus vous commencez tôt, plus vous aurez le temps de faire fructifier vos investissements. Adaptez vos cotisations et vos choix d'investissement pour atteindre vos objectifs financiers à long terme.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Besoin d'aide ?
          </h2>
          <p>
            Si vous avez des questions sur la planification de votre épargne retraite ou besoin de conseils personnalisés, n'hésitez pas à{' '}
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

export default CalculatriceEpargneRetraite;
