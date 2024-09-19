import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../../components/Layout';
import { Slider, Typography, Paper, Grid } from '@mui/material';

function CalculatricePlanificateurBudget() {
  const [revenuMensuel, setRevenuMensuel] = useState(2500);
  const [depensesFixes, setDepensesFixes] = useState(1000);
  const [depensesVariables, setDepensesVariables] = useState(800);
  const [epargneObjectif, setEpargneObjectif] = useState(20);
  const [epargneReelle, setEpargneReelle] = useState(0);
  const [epargneObjectifMontant, setEpargneObjectifMontant] = useState(0);
  const [difference, setDifference] = useState(0);
  const currentYear = new Date().getFullYear();

  const calculate = useCallback(() => {
    const depensesTotales = depensesFixes + depensesVariables;
    const epargne = revenuMensuel - depensesTotales;
    const objectifEpargne = revenuMensuel * (epargneObjectif / 100);
    const diff = epargne - objectifEpargne;

    setEpargneReelle(epargne.toFixed(2));
    setEpargneObjectifMontant(objectifEpargne.toFixed(2));
    setDifference(diff.toFixed(2));
  }, [revenuMensuel, depensesFixes, depensesVariables, epargneObjectif]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <Layout
      title={`[${currentYear}] Calculatrice de Planification Budgétaire - Gérez Votre Budget Efficacement`}
      description="Utilisez notre calculatrice de planification budgétaire pour organiser vos finances mensuelles en fonction de vos revenus, dépenses fixes, dépenses variables et objectif d'épargne. Prenez le contrôle de votre budget dès aujourd'hui."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteneur principal */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-700 border-b-4 border-blue-500 pb-3 inline-block">
            Planifiez Votre Budget Mensuel
          </h1>

          <p className="mb-8 text-justify">
            Utilisez notre calculatrice de planification budgétaire pour organiser efficacement vos finances. En entrant vos revenus, vos dépenses et votre objectif d'épargne, vous pouvez visualiser votre situation financière et ajuster vos dépenses pour atteindre vos objectifs financiers.
          </p>

          <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography gutterBottom>Revenu mensuel: {revenuMensuel} €</Typography>
                <Slider
                  value={revenuMensuel}
                  onChange={(e, newValue) => setRevenuMensuel(newValue)}
                  min={0}
                  max={10000}
                  step={100}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Dépenses fixes: {depensesFixes} €</Typography>
                <Slider
                  value={depensesFixes}
                  onChange={(e, newValue) => setDepensesFixes(newValue)}
                  min={0}
                  max={5000}
                  step={50}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Dépenses variables: {depensesVariables} €</Typography>
                <Slider
                  value={depensesVariables}
                  onChange={(e, newValue) => setDepensesVariables(newValue)}
                  min={0}
                  max={5000}
                  step={50}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Objectif d'épargne: {epargneObjectif}%</Typography>
                <Slider
                  value={epargneObjectif}
                  onChange={(e, newValue) => setEpargneObjectif(newValue)}
                  min={0}
                  max={50}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Épargne réelle: {epargneReelle} € | Objectif d'épargne: {epargneObjectifMontant} € | Différence: {difference} €
            </Typography>
          </Paper>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Première partie : Explication du fonctionnement */}
          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Comment Utiliser Cette Calculatrice de Planification Budgétaire
          </h2>

          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Revenu mensuel :</strong> Entrez votre revenu total mensuel après impôts.
            </li>
            <li>
              <strong>Dépenses fixes :</strong> Indiquez le total de vos dépenses fixes mensuelles (loyer, factures, etc.).
            </li>
            <li>
              <strong>Dépenses variables :</strong> Entrez le total de vos dépenses variables mensuelles (alimentation, loisirs, etc.).
            </li>
            <li>
              <strong>Objectif d'épargne :</strong> Sélectionnez le pourcentage de votre revenu que vous souhaitez épargner chaque mois.
            </li>
          </ul>

          {/* Deuxième partie : Texte SEO sur "planification budgétaire" */}
          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Optimisez Votre Planification Budgétaire pour Atteindre Vos Objectifs Financiers
          </h2>
          <p className="mb-4">
            La <strong>planification budgétaire</strong> est essentielle pour gérer efficacement vos finances personnelles. En établissant un budget clair, vous pouvez contrôler vos dépenses, augmenter votre épargne et travailler vers vos objectifs financiers à long terme.
          </p>
          <p className="mb-4">
            Une bonne <strong>planification budgétaire</strong> vous permet de visualiser où va votre argent chaque mois. Cela vous aide à identifier les domaines où vous pouvez réduire les dépenses et à réaffecter ces fonds pour atteindre vos objectifs d'épargne ou rembourser des dettes.
          </p>
          <p className="mb-4">
            Utilisez notre calculatrice pour faciliter votre <strong>planification budgétaire</strong>. En ajustant vos dépenses et votre objectif d'épargne, vous pouvez créer un plan financier réaliste qui vous aidera à atteindre vos objectifs financiers.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
            Besoin d'aide ?
          </h2>
          <p>
            Si vous avez des questions sur la gestion de votre budget ou besoin de conseils personnalisés, n'hésitez pas à{' '}
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

export default CalculatricePlanificateurBudget;
