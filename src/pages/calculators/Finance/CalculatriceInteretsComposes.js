import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../../components/Layout';
import { Slider, Typography, Paper, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';

function CalculatriceInteretsComposes() {
  const [capitalInitial, setCapitalInitial] = useState(10000);
  const [tauxInteret, setTauxInteret] = useState(5);
  const [duree, setDuree] = useState(10);
  const [versementRegulier, setVersementRegulier] = useState(0);
  const [montantFinal, setMontantFinal] = useState(0);
  const [interetsGagnes, setInteretsGagnes] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const currentYear = new Date().getFullYear();

  const calculate = useCallback(() => {
    const tauxMensuel = tauxInteret / 100 / 12;
    const nombreMois = duree * 12;

    let montant = capitalInitial;
    let dataPoints = [];

    for (let i = 0; i < nombreMois; i++) {
      montant = montant * (1 + tauxMensuel) + versementRegulier;
      if ((i + 1) % 12 === 0) {
        dataPoints.push(montant.toFixed(2));
      }
    }

    const totalVersements = capitalInitial + versementRegulier * nombreMois;
    const interets = montant - totalVersements;

    setMontantFinal(montant.toFixed(2));
    setInteretsGagnes(interets.toFixed(2));

    setChartData({
      labels: Array.from({ length: duree }, (_, i) => `Année ${i + 1}`),
      datasets: [
        {
          label: 'Montant total',
          data: dataPoints,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    });
  }, [capitalInitial, tauxInteret, duree, versementRegulier]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <Layout
      title={`[${currentYear}] Calculatrice d'Intérêts Composés en Ligne - Simulez la Croissance de Votre Épargne`}
      description="Utilisez notre calculatrice d'intérêts composés pour estimer la croissance de votre capital en fonction du montant initial, du taux d'intérêt, de la durée et des versements réguliers. Prenez des décisions financières éclairées avec nos outils intuitifs."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteneur principal */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-700 border-b-4 border-blue-500 pb-3 inline-block">
            Calculez Vos Intérêts Composés Facilement
          </h1>

          <p className="mb-8 text-justify">
            Utilisez notre calculatrice d'intérêts composés pour estimer rapidement la croissance de votre capital en fonction du montant initial, du taux d'intérêt, de la durée et des versements réguliers. Que vous épargniez pour l'avenir ou planifiiez un investissement, notre outil vous offre une estimation claire et simple pour vous aider à optimiser vos finances.
          </p>

          <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography gutterBottom>Capital initial: {capitalInitial} €</Typography>
                <Slider
                  value={capitalInitial}
                  onChange={(e, newValue) => setCapitalInitial(newValue)}
                  min={0}
                  max={1000000}
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
                  max={20}
                  step={0.1}
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
              <Grid item xs={12}>
                <Typography gutterBottom>Versement régulier mensuel: {versementRegulier} €</Typography>
                <Slider
                  value={versementRegulier}
                  onChange={(e, newValue) => setVersementRegulier(newValue)}
                  min={0}
                  max={10000}
                  step={100}
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Montant final: {montantFinal} € | Intérêts gagnés: {interetsGagnes} €
            </Typography>
          </Paper>

          {/* Graphique */}
          <div className="mt-8">
            <Line data={chartData} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Comment Utiliser Cette Calculatrice d'Intérêts Composés
          </h2>

          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Capital initial :</strong> Entrez le montant de départ de votre investissement ou épargne.
            </li>
            <li>
              <strong>Taux d'intérêt annuel :</strong> Ajustez le taux d'intérêt annuel attendu.
            </li>
            <li>
              <strong>Durée :</strong> Sélectionnez la période sur laquelle vous souhaitez calculer la croissance.
            </li>
            <li>
              <strong>Versement régulier mensuel :</strong> Indiquez le montant que vous prévoyez d'ajouter chaque mois.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Optimisez Vos Investissements
          </h2>
          <p className="mb-4">
            Les intérêts composés peuvent significativement augmenter vos gains sur le long terme. En augmentant vos versements réguliers ou en choisissant un taux d'intérêt plus élevé, vous pouvez maximiser la croissance de votre capital.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Besoin d'aide ?
          </h2>
          <p>
            Si vous avez des questions sur l'investissement ou besoin de conseils personnalisés, n'hésitez pas à{' '}
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

export default CalculatriceInteretsComposes;
