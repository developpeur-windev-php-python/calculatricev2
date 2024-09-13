import React, { useState, useCallback, useEffect } from 'react';
import Layout from '../../../components/Layout';
import { Slider, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function CalendrierRemboursement() {
  const [principal, setPrincipal] = useState(200000);
  const [interestRate, setInterestRate] = useState(3);
  const [term, setTerm] = useState(25);
  const [schedule, setSchedule] = useState([]);

  const calculateRepaymentSchedule = useCallback(() => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = term * 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    let balance = principal;
    const schedule = [];

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month: i,
        payment: monthlyPayment.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: balance.toFixed(2),
      });
    }

    setSchedule(schedule);
  }, [principal, interestRate, term]);

  useEffect(() => {
    calculateRepaymentSchedule();
  }, [calculateRepaymentSchedule]);

  return (
    <Layout 
      title="Calendrier de Remboursement - Planifiez Vos Paiements de Prêt"
      description="Générez un calendrier de remboursement complet pour visualiser comment vos paiements sont répartis entre le capital et les intérêts sur la durée de votre prêt."
    >
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"> 
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700 border-b-4 border-blue-500 pb-3 inline-block">
          Planifiez Votre Calendrier de Remboursement de Prêt
        </h1>
        <p className="mb-8 text-justify">
        Cette <strong>calculatrice de remboursement de prêt</strong> est un outil interactif conçu pour vous aider à 
    <strong>planifier et visualiser votre échéancier de paiement</strong> de manière claire et précise. En saisissant les 
    détails de votre prêt, tels que le montant emprunté, le taux d'intérêt et la durée du prêt, vous pouvez voir immédiatement 
    comment chaque paramètre affecte vos <strong>paiements mensuels</strong>, la <strong>répartition entre le principal et les intérêts</strong>, 
    et le <strong>solde restant</strong>. Les curseurs intuitifs vous permettent d'ajuster facilement les valeurs et de visualiser 
    les résultats en temps réel. Utilisez cette calculatrice pour simuler différents scénarios et identifier l'option de remboursement 
    la plus avantageuse pour vos besoins financiers. Que vous souhaitiez anticiper vos futures mensualités ou explorer des stratégies 
    pour rembourser plus rapidement, cet outil vous offre une vision complète et personnalisée de votre <strong>plan de remboursement de prêt</strong>.

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
        </Paper>

        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mois</TableCell>
                <TableCell>Paiement (€)</TableCell>
                <TableCell>Principal (€)</TableCell>
                <TableCell>Intérêt (€)</TableCell>
                <TableCell>Solde (€)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{row.payment}</TableCell>
                  <TableCell>{row.principal}</TableCell>
                  <TableCell>{row.interest}</TableCell>
                  <TableCell>{row.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">Qu'est-ce qu'un échéancier de prêt ?</h2>
          <p>
              Un <strong>échéancier de prêt</strong> est un tableau détaillé qui montre comment vos paiements sont répartis entre le 
              remboursement du principal et les intérêts au fil du temps. Il est essentiel pour toute personne ayant un crédit, car il 
              permet de <strong>visualiser l'impact des paiements mensuels</strong> sur le solde du prêt et d'optimiser la gestion de son budget.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">Pourquoi utiliser un échéancier de prêt ?</h2>
          <p>
              Utiliser un échéancier de prêt vous aide à mieux <strong>planifier votre budget</strong> et à comprendre comment chaque 
              paiement affecte le solde de votre prêt. Avec un échéancier précis, vous pouvez <strong>anticiper les coûts totaux</strong>, 
              ajuster vos paiements en fonction de vos capacités financières, et même explorer des options pour <strong>raccourcir la durée du prêt</strong> 
              ou réduire le montant total des intérêts payés.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">Comment créer un échéancier de prêt personnalisé ?</h2>
          <p>
              Grâce à notre calculatrice de prêt, vous pouvez <strong>personnaliser votre échéancier</strong> en fonction de vos besoins spécifiques. 
              En ajustant des variables telles que le montant du prêt, le taux d'intérêt, et la durée de remboursement, l'outil génère un tableau 
              détaillé qui montre exactement combien vous payez en principal et en intérêts chaque mois. Cet outil est non seulement pratique, 
              mais il vous offre également une <strong>flexibilité</strong> et un <strong>contrôle total sur votre plan de remboursement</strong>.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">Optimisez votre gestion financière avec notre calculatrice</h2>
          <p>
              En utilisant cette calculatrice, vous accédez à un outil puissant pour <strong>optimiser la gestion de vos finances personnelles</strong>. 
              Que vous soyez en train de planifier un nouvel emprunt ou de refinancer un prêt existant, un bon échéancier vous permet de 
              <strong>prendre des décisions financières éclairées</strong> et d'améliorer votre stratégie de remboursement. Ne laissez rien au hasard 
              et utilisez notre calculatrice pour créer un échéancier de prêt qui vous guide vers la réussite financière.
          </p>
    </div>
      
    </div>
    </Layout>
  );
}

export default CalendrierRemboursement;
