import React, { useState, useCallback, useEffect } from 'react';
import Layout from '../../../components/Layout';
import { Slider, Typography, Paper, Grid } from '@mui/material';

function CalculatriceHypotheque() {
  const [principal, setPrincipal] = useState(200000);
  const [interestRate, setInterestRate] = useState(3);
  const [term, setTerm] = useState(25);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const currentYear = new Date().getFullYear();

  const calculateMortgage = useCallback(() => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = term * 12;
    const mortgage = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    setMonthlyPayment(mortgage.toFixed(2));
  }, [principal, interestRate, term]);

  useEffect(() => {
    calculateMortgage();
  }, [calculateMortgage]);

  return (
    <Layout 
      title={`[${currentYear}] Calculatrice d'Hypothèque en Ligne - Calculez Vos Paiements en Quelques Clics`}
      description="Utilisez notre calculatrice d'hypothèque pour estimer vos paiements mensuels en fonction du montant du prêt, du taux d'intérêt et de la durée. Simplifiez vos décisions financières avec nos outils intuitifs et faciles à utiliser."
    >
     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Conteneur principal */}
     
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700 border-b-4 border-blue-500 pb-3 inline-block">
        Calculez Votre Prêt Hypothécaire Facilement
      </h1>
      
      <p className="mb-8 text-justify">
        Utilisez notre calculatrice d'hypothèque pour estimer rapidement vos paiements mensuels en fonction du montant du prêt, du taux d'intérêt et de la durée du prêt. Que vous envisagiez d'acheter une nouvelle maison ou de refinancer un prêt existant, notre outil vous offre une estimation claire et simple pour vous aider à prendre des décisions financières éclairées.
      </p>
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography gutterBottom>Montant du prêt: {principal} €</Typography>
            <Slider
              value={principal}
              onChange={(e, newValue) => setPrincipal(newValue)}
              min={50000}
              max={1000000}
              step={1000}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Taux d'intérêt: {interestRate}%</Typography>
            <Slider
              value={interestRate}
              onChange={(e, newValue) => setInterestRate(newValue)}
              min={0.1}
              max={10}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Durée du prêt: {term} ans</Typography>
            <Slider
              value={term}
              onChange={(e, newValue) => setTerm(newValue)}
              min={5}
              max={30}
              step={1}
              valueLabelDisplay="auto"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Paiement mensuel: {monthlyPayment} €
        </Typography>
      </Paper>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">Comment Utiliser Cette Calculatrice d'Hypothèque</h2>
     
    <ul>
        <li><strong>Montant du prêt :</strong> Entrez le montant total que vous souhaitez emprunter pour votre prêt hypothécaire.</li>
        <li><strong>Taux d'intérêt :</strong> Ajustez le taux d'intérêt annuel appliqué à votre prêt.</li>
        <li><strong>Durée du prêt :</strong> Choisissez la période de remboursement du prêt en années.</li>
    </ul>

    <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">Conseils pour Réduire Vos Paiements</h2>
    <p>
        Envisagez d'augmenter vos paiements mensuels ou de réduire la durée de votre prêt pour économiser sur les intérêts à long terme. 
        Un taux d'intérêt plus bas ou un remboursement anticipé peut également réduire le coût total de votre hypothèque.
    </p>

    

    <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">Besoin d'aide ?</h2>
    <p>
        Si vous avez des questions sur votre prêt hypothécaire ou besoin d'une assistance personnalisée, n'hésitez pas à <a href="#">nous contacter</a>.
    </p>
    </div>
    </div>
    </Layout>
    
  );
}

export default CalculatriceHypotheque;