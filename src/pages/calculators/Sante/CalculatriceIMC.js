import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../../components/Layout';
import {
  Slider,
  Typography,
  Paper,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function CalculatriceIMC() {
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
  const [weight, setWeight] = useState(70); // kg or lbs
  const [height, setHeight] = useState(170); // cm or inches
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(7);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState('');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [message, setMessage] = useState('');

  const currentYear = new Date().getFullYear();

  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) {
      setUnit(newUnit);
      // Reset height when switching units
      if (newUnit === 'metric') {
        setHeight(170);
      } else {
        setHeightFeet(5);
        setHeightInches(7);
      }
    }
  };

  const calculateBMI = useCallback(() => {
    let calculatedBmi = 0;

    if (unit === 'metric') {
      // BMI = weight (kg) / (height (m))^2
      calculatedBmi = weight / Math.pow(height / 100, 2);
    } else {
      // BMI = (weight (lbs) / (height (in))^2) * 703
      const totalInches = heightFeet * 12 + heightInches;
      calculatedBmi = (weight / Math.pow(totalInches, 2)) * 703;
    }

    calculatedBmi = parseFloat(calculatedBmi.toFixed(2));
    setBmi(calculatedBmi);

    // Déterminer la catégorie IMC
    let bmiCategory = '';
    if (calculatedBmi < 18.5) {
      bmiCategory = 'Sous-poids';
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      bmiCategory = 'Poids normal';
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      bmiCategory = 'Surpoids';
    } else {
      bmiCategory = 'Obésité';
    }
    setCategory(bmiCategory);

    // Préparer les données pour le graphique
    const categories = ['Sous-poids', 'Poids normal', 'Surpoids', 'Obésité'];
    const categoryColors = {
      'Sous-poids': 'rgb(54, 162, 235)', // Bleu
      'Poids normal': 'rgb(75, 192, 192)', // Vert
      'Surpoids': 'rgb(255, 159, 64)', // Orange
      'Obésité': 'rgb(255, 99, 132)', // Rouge
    };

    setChartData({
      labels: categories,
      datasets: [
        {
          label: 'Votre IMC',
          data: categories.map((cat) => {
            if (cat === 'Sous-poids') return bmi < 18.5 ? bmi : null;
            if (cat === 'Poids normal') return bmi >= 18.5 && bmi < 25 ? bmi : null;
            if (cat === 'Surpoids') return bmi >= 25 && bmi < 30 ? bmi : null;
            if (cat === 'Obésité') return bmi >= 30 ? bmi : null;
            return null;
          }),
          backgroundColor: categories.map((cat) => categoryColors[cat]),
        },
      ],
    });

    // Définir le message basé sur la catégorie IMC avec couleur
    let bmiMessage = '';
    let messageColor = 'green'; // Par défaut pour 'Poids normal'

    switch (bmiCategory) {
      case 'Sous-poids':
        bmiMessage = 'Vous êtes en sous-poids. Il est conseillé de consulter un professionnel de santé.';
        messageColor = 'blue';
        break;
      case 'Poids normal':
        bmiMessage = 'Votre poids est normal. Continuez ainsi pour maintenir votre santé.';
        messageColor = 'green';
        break;
      case 'Surpoids':
        bmiMessage = 'Vous êtes en surpoids. Envisagez de modifier votre alimentation et d\'augmenter votre activité physique.';
        messageColor = 'orange';
        break;
      case 'Obésité':
        bmiMessage = 'Vous êtes en obésité. Il est fortement recommandé de consulter un professionnel de santé pour des conseils personnalisés.';
        messageColor = 'red';
        break;
      default:
        bmiMessage = '';
    }
    setMessage({ text: bmiMessage, color: messageColor });
  }, [unit, weight, height, heightFeet, heightInches, bmi]);

  useEffect(() => {
    calculateBMI();
  }, [calculateBMI]);

  const handleWeightChange = (event, newValue) => {
    if (newValue > 0) {
      setWeight(newValue);
    }
  };

  const handleHeightChange = (event, newValue) => {
    if (newValue > 0) {
      setHeight(newValue);
    }
  };

  const handleHeightFeetChange = (event, newValue) => {
    if (newValue > 0) {
      setHeightFeet(newValue);
    }
  };

  const handleHeightInchesChange = (event, newValue) => {
    if (newValue >= 0 && newValue < 12) {
      setHeightInches(newValue);
    }
  };

  return (
    <Layout
      title={`[${currentYear}] Calculatrice d'IMC - Suivez Votre Santé`}
      description="Calculez votre Indice de Masse Corporelle (IMC) et visualisez votre catégorie de poids pour mieux gérer votre santé."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteneur principal */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-700 border-b-4 border-blue-500 pb-3 inline-block">
            Calculatrice d'Indice de Masse Corporelle (IMC)
          </h1>

          <p className="mb-8 text-justify">
            Utilisez cette <strong>calculatrice d'IMC</strong> pour déterminer votre Indice de Masse Corporelle en fonction de votre poids et de votre taille.
            L'IMC est un indicateur utilisé pour évaluer votre santé générale et déterminer si vous avez un poids insuffisant, normal, en surpoids ou obèse.
          </p>

          <Paper elevation={3} className="p-6">
            <Grid container spacing={3} alignItems="center">
              {/* Sélecteur d'unités */}
              <Grid item xs={12} className="text-center">
                <ToggleButtonGroup
                  value={unit}
                  exclusive
                  onChange={handleUnitChange}
                  aria-label="unit selection"
                >
                  <ToggleButton value="metric" aria-label="metric units">
                    Métrique (kg, cm)
                  </ToggleButton>
                  <ToggleButton value="imperial" aria-label="imperial units">
                    Impérial (lbs, ft/in)
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              {/* Poids */}
              <Grid item xs={12} md={6}>
                <Typography gutterBottom>
                  Poids: {unit === 'metric' ? `${weight} kg` : `${weight} lbs`}
                </Typography>
                <Slider
                  value={weight}
                  onChange={handleWeightChange}
                  min={10}
                  max={500}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </Grid>

              {/* Taille */}
              <Grid item xs={12} md={6}>
                {unit === 'metric' ? (
                  <>
                    <Typography gutterBottom>
                      Taille: {height} cm
                    </Typography>
                    <Slider
                      value={height}
                      onChange={handleHeightChange}
                      min={50}
                      max={300}
                      step={1}
                      valueLabelDisplay="auto"
                    />
                  </>
                ) : (
                  <>
                    <Typography gutterBottom>
                      Taille: {heightFeet} ft {heightInches} in
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Slider
                          value={heightFeet}
                          onChange={handleHeightFeetChange}
                          min={1}
                          max={8}
                          step={1}
                          valueLabelDisplay="auto"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Slider
                          value={heightInches}
                          onChange={handleHeightInchesChange}
                          min={0}
                          max={11}
                          step={1}
                          valueLabelDisplay="auto"
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>

              {/* Affichage de l'IMC */}
              <Grid item xs={12}>
                <Typography variant="h6" className="text-center">
                  Votre IMC: {bmi}
                </Typography>
                <Typography variant="h6" className="text-center">
                  Catégorie: {category}
                </Typography>
                {message.text && (
                  <Typography
                    variant="body1"
                    className="text-center mt-2"
                    style={{ color: message.color }}
                  >
                    {message.text}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>

          {/* Graphique */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <Typography variant="h6" className="mb-4 text-center">
              Votre Positionnement par Rapport aux Catégories d'IMC
            </Typography>
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 5,
                    },
                  },
                },
              }}
            />
          </div>

          {/* Informations supplémentaires */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            {/* Première partie : Explication du fonctionnement */}
            <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
              Comment Utiliser Cette Calculatrice d'IMC
            </h2>

            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Sélectionnez l'unité de mesure :</strong> Choisissez entre les unités métriques (kg, cm) ou impériales (lbs, ft/in).
              </li>
              <li>
                <strong>Entrez votre poids :</strong> Utilisez le curseur pour ajuster votre poids dans l'unité sélectionnée.
              </li>
              <li>
                <strong>Entrez votre taille :</strong> Utilisez les curseurs pour ajuster votre taille dans l'unité sélectionnée.
              </li>
              <li>
                <strong>Visualisez votre IMC :</strong> Le calcul de l'IMC est effectué en temps réel, affichant votre valeur IMC et sa catégorie correspondante.
              </li>
            </ul>

            {/* Deuxième partie : Texte SEO sur "objectifs épargne" */}
            <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
              Comprendre Votre Indice de Masse Corporelle (IMC)
            </h2>
            <p className="mb-4">
              L'<strong>Indice de Masse Corporelle (IMC)</strong> est un outil utilisé pour évaluer si votre poids est adapté à votre taille. En calculant votre IMC, vous pouvez identifier si vous êtes en sous-poids, à un poids normal, en surpoids ou obèse.
            </p>
            <p className="mb-4">
              Comprendre votre IMC est essentiel pour <strong>gérer votre santé</strong> et prévenir les risques associés à un poids inadéquat. Un IMC élevé peut augmenter le risque de maladies cardiovasculaires, de diabète et d'autres problèmes de santé, tandis qu'un IMC trop bas peut également entraîner des complications.
            </p>
            <p className="mb-4">
              Utilisez notre calculatrice d'IMC pour <strong>suivre votre progression</strong> et ajuster vos habitudes alimentaires et votre activité physique en conséquence. En maintenant un IMC dans la plage recommandée, vous contribuez à une meilleure qualité de vie et à une santé optimale.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">
              Besoin d'aide ?
            </h2>
            <p>
              Si vous avez des questions sur le calcul de votre IMC ou besoin de conseils personnalisés pour atteindre vos objectifs de santé, n'hésitez pas à{' '}
              <a href="/contact" className="text-blue-500 underline">
                nous contacter
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CalculatriceIMC;
