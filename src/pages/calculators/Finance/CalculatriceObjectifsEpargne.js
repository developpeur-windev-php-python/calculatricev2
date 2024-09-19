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

function CalculatriceObjectifsEpargne() {
  const [objectif, setObjectif] = useState(50000);
  const [epargneInitiale, setEpargneInitiale] = useState(5000);
  const [epargneReguliere, setEpargneReguliere] = useState(500);
  const [tauxInteret, setTauxInteret] = useState(2);
  const [tempsNecessaire, setTempsNecessaire] = useState(0);
  const [message, setMessage] = useState('');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const currentYear = new Date().getFullYear();

  const calculate = useCallback(() => {
    const tauxMensuel = tauxInteret / 100 / 12;
    let epargneActuelle = epargneInitiale;
    let mois = 0;
    let dataPoints = [];
    let labels = [];
    let objectifAtteint = false;

    if (epargneActuelle >= objectif) {
      // L'objectif est déjà atteint
      setTempsNecessaire(0);
      setMessage("Félicitations ! Votre épargne actuelle atteint déjà votre objectif.");
      // Pour assurer que le graphique ait au moins deux points
      dataPoints = [epargneInitiale, epargneInitiale];
      labels = ['Début', 'Objectif atteint'];
      objectifAtteint = true;
    } else {
      while (epargneActuelle < objectif && mois < 600) {
        epargneActuelle = epargneActuelle * (1 + tauxMensuel) + epargneReguliere;
        mois++;
        if (mois <= 60) {
          dataPoints.push(epargneActuelle);
          labels.push(`Mois ${mois}`);
        }
      }
      const tempsNecessaireResult = mois < 600 ? mois : 'Plus de 50 ans';
      setTempsNecessaire(tempsNecessaireResult);

      if (mois === 1) {
        setMessage("Félicitations ! Vous atteignez votre objectif d'épargne en 1 mois.");
        objectifAtteint = true;
      } else if (mois >= 600) {
        setMessage("Avec les paramètres actuels, il faudra plus de 50 ans pour atteindre votre objectif. Envisagez d'augmenter votre épargne mensuelle ou votre taux d'intérêt.");
      } else {
        setMessage('');
      }
    }

    if (dataPoints.length > 0) {
      setChartData({
        labels,
        datasets: [
          {
            label: "Progression de l'épargne",
            data: dataPoints,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      });
    } else {
      setChartData({
        labels: [],
        datasets: [],
      });
    }
  }, [objectif, epargneInitiale, epargneReguliere, tauxInteret]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <Layout
      title={`[${currentYear}] Calculatrice d'Objectifs d'Épargne - Atteignez Vos Objectifs Financiers`}
      description="Utilisez notre calculatrice d'objectifs d'épargne pour estimer le temps nécessaire pour atteindre votre objectif financier en fonction de votre épargne initiale, de vos dépôts réguliers et du taux d'intérêt. Planifiez votre épargne dès aujourd'hui."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteneur principal */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-700 border-b-4 border-blue-500 pb-3 inline-block">
            Calculez le Temps Nécessaire pour Atteindre Votre Objectif d'Épargne
          </h1>

          <p className="mb-8 text-justify">
            Utilisez notre calculatrice d'objectifs d'épargne pour estimer rapidement le temps qu'il vous faudra pour atteindre votre objectif financier en fonction de votre épargne initiale, de vos dépôts mensuels et du taux d'intérêt. Que vous épargniez pour un achat important ou pour votre avenir, notre outil vous aide à planifier efficacement.
          </p>

          <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography gutterBottom>Objectif d'épargne: {objectif} €</Typography>
                <Slider
                  value={objectif}
                  onChange={(e, newValue) => setObjectif(newValue)}
                  min={0}
                  max={1000000}
                  step={1000}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Épargne initiale: {epargneInitiale} €</Typography>
                <Slider
                  value={epargneInitiale}
                  onChange={(e, newValue) => setEpargneInitiale(newValue)}
                  min={0}
                  max={1000000}
                  step={1000}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Épargne mensuelle: {epargneReguliere} €</Typography>
                <Slider
                  value={epargneReguliere}
                  onChange={(e, newValue) => setEpargneReguliere(newValue)}
                  min={0}
                  max={10000}
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
                  max={10}
                  step={0.1}
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>
            {message && (
              <Typography variant="h6" style={{ marginTop: '20px', color: 'green' }}>
                {message}
              </Typography>
            )}
            {!message && (
              <Typography variant="h6" style={{ marginTop: '20px' }}>
                Temps nécessaire pour atteindre l'objectif: {tempsNecessaire} mois
              </Typography>
            )}
          </Paper>

          {/* Graphique */}
          {chartData.labels.length > 1 && (
            <div className="mt-8">
              <Line data={chartData} options={{ responsive: true }} />
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Première partie : Explication du fonctionnement */}
          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Comment Utiliser Cette Calculatrice d'Objectifs d'Épargne
          </h2>

          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Objectif d'épargne :</strong> Entrez le montant que vous souhaitez atteindre.
            </li>
            <li>
              <strong>Épargne initiale :</strong> Indiquez le montant que vous avez déjà épargné.
            </li>
            <li>
              <strong>Épargne mensuelle :</strong> Entrez le montant que vous pouvez épargner chaque mois.
            </li>
            <li>
              <strong>Taux d'intérêt annuel :</strong> Estimez le taux d'intérêt annuel moyen de votre compte d'épargne ou investissement.
            </li>
          </ul>

          {/* Deuxième partie : Texte SEO sur "objectifs épargne" */}
          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Atteignez Vos Objectifs d'Épargne Plus Rapidement
          </h2>
          <p className="mb-4">
            Fixer des <strong>objectifs d'épargne</strong> clairs est essentiel pour réaliser vos projets financiers, qu'il s'agisse d'acheter une maison, de financer des études ou de préparer votre retraite. Une planification efficace vous aide à rester motivé et à suivre vos progrès.
          </p>
          <p className="mb-4">
            En utilisant notre calculatrice, vous pouvez estimer le temps nécessaire pour atteindre vos <strong>objectifs d'épargne</strong> en fonction de vos dépôts réguliers et du taux d'intérêt. Cela vous permet d'ajuster vos contributions mensuelles ou de rechercher des options d'investissement avec un meilleur rendement pour accélérer votre épargne.
          </p>
          <p className="mb-4">
            N'oubliez pas que chaque petite contribution compte. En augmentant légèrement votre épargne mensuelle ou en trouvant des moyens d'obtenir un meilleur taux d'intérêt, vous pouvez atteindre vos <strong>objectifs d'épargne</strong> plus rapidement et réaliser vos rêves financiers.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Besoin d'aide ?
          </h2>
          <p>
            Si vous avez des questions sur la planification de votre épargne ou besoin de conseils personnalisés, n'hésitez pas à{' '}
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

export default CalculatriceObjectifsEpargne;
