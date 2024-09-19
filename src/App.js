import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';

// Importations des calculatrices financières existantes
import CalculatriceHypotheque from './pages/calculators/Finance/CalculatriceHypotheque';
import CalculatriceRemboursementPret from './pages/calculators/Finance/CalculatriceRemboursementPret';
import CalculatriceInteretsComposes from './pages/calculators/Finance/CalculatriceInteretsComposes';
import CalculatriceRendementInvestissement from './pages/calculators/Finance/CalculatriceRendementInvestissement';
import CalculatriceEpargneRetraite from './pages/calculators/Finance/CalculatriceEpargneRetraite';
import CalculatriceConversionDevises from './pages/calculators/Finance/CalculatriceConversionDevises';
import CalculatriceInteretsCartesCredit from './pages/calculators/Finance/CalculatriceInteretsCartesCredit';
import CalculatricePlanificateurBudget from './pages/calculators/Finance/CalculatricePlanificateurBudget';
import CalculatriceRemboursementDettes from './pages/calculators/Finance/CalculatriceRemboursementDettes';
import CalculatriceObjectifsEpargne from './pages/calculators/Finance/CalculatriceObjectifsEpargne';

// Importations des nouvelles calculatrices de santé
import CalculatriceIMC from './pages/calculators/Sante/CalculatriceIMC';
import CalculatriceApportCalorique from './pages/calculators/Sante/CalculatriceApportCalorique';
import CalculatricePourcentageGraisseCorporelle from './pages/calculators/Sante/CalculatricePourcentageGraisseCorporelle';
import CalculatriceTauxMetaboliqueBase from './pages/calculators/Sante/CalculatriceTauxMetaboliqueBase';
import CalculatriceMacronutriments from './pages/calculators/Sante/CalculatriceMacronutriments';
import CalculatriceAllureCourse from './pages/calculators/Sante/CalculatriceAllureCourse';
import CalculatricePoidIdeal from './pages/calculators/Sante/CalculatricePoidIdeal';
import CalculatriceApportEau from './pages/calculators/Sante/CalculatriceApportEau';
import CalculatriceFrequenceCardiaque from './pages/calculators/Sante/CalculatriceFrequenceCardiaque';
import CalculatriceAgeConditionPhysique from './pages/calculators/Sante/CalculatriceAgeConditionPhysique';

import './styles/global.css';

const financeCalculators = [
  { name: "Calculatrice d'hypothèque", path: "/finance/hypotheque" },
  { name: "Calculatrice de remboursement de prêt", path: "/finance/remboursement-pret" },
  { name: "Calculatrice d'intérêts composés", path: "/finance/interets-composes" },
  { name: "Calculatrice de rendement d'investissement", path: "/finance/rendement-investissement" },
  { name: "Calculatrice d'épargne retraite", path: "/finance/epargne-retraite" },
  { name: "Calculatrice de conversion de devises", path: "/finance/conversion-devises" },
  { name: "Calculatrice des intérêts de cartes de crédit", path: "/finance/interets-cartes-credit" },
  { name: "Calculatrice de planification budgétaire", path: "/finance/planificateur-budget" },
  { name: "Calculatrice de remboursement de dettes", path: "/finance/remboursement-dettes" },
  { name: "Calculatrice d'objectifs d'épargne", path: "/finance/objectifs-epargne" },
];

const santeCalculators = [
  { name: "Calculatrice de l'IMC", path: "/sante/imc" },
  { name: "Calculatrice de l'apport calorique", path: "/sante/apport-calorique" },
  { name: "Calculatrice du pourcentage de graisse corporelle", path: "/sante/graisse-corporelle" },
  { name: "Calculatrice du taux métabolique de base (BMR)", path: "/sante/bmr" },
  { name: "Calculatrice des macronutriments", path: "/sante/macronutriments" },
  { name: "Calculatrice de l'allure de course", path: "/sante/allure-course" },
  { name: "Calculatrice du poids idéal", path: "/sante/poids-ideal" },
  { name: "Calculatrice de l'apport en eau", path: "/sante/apport-eau" },
  { name: "Calculatrice des zones de fréquence cardiaque", path: "/sante/frequence-cardiaque" },
  { name: "Calculateur de l'âge de la condition physique", path: "/sante/age-condition-physique" },
];

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/finance" element={<CategoryPage category="Finance" calculators={financeCalculators} />} />
              <Route path="/sante" element={<CategoryPage category="Santé" calculators={santeCalculators} />} />
              
              {/* Routes pour les calculatrices financières */}
              <Route path="/finance/hypotheque" element={<CalculatriceHypotheque />} />
              <Route path="/finance/remboursement-pret" element={<CalculatriceRemboursementPret />} />
              <Route path="/finance/interets-composes" element={<CalculatriceInteretsComposes />} />
              <Route path="/finance/rendement-investissement" element={<CalculatriceRendementInvestissement />} />
              <Route path="/finance/epargne-retraite" element={<CalculatriceEpargneRetraite />} />
              <Route path="/finance/conversion-devises" element={<CalculatriceConversionDevises />} />
              <Route path="/finance/interets-cartes-credit" element={<CalculatriceInteretsCartesCredit />} />
              <Route path="/finance/planificateur-budget" element={<CalculatricePlanificateurBudget />} />
              <Route path="/finance/remboursement-dettes" element={<CalculatriceRemboursementDettes />} />
              <Route path="/finance/objectifs-epargne" element={<CalculatriceObjectifsEpargne />} />
              
              {/* Routes pour les calculatrices de santé */}
              <Route path="/sante/imc" element={<CalculatriceIMC />} />
              <Route path="/sante/apport-calorique" element={<CalculatriceApportCalorique />} />
              <Route path="/sante/graisse-corporelle" element={<CalculatricePourcentageGraisseCorporelle />} />
              <Route path="/sante/bmr" element={<CalculatriceTauxMetaboliqueBase />} />
              <Route path="/sante/macronutriments" element={<CalculatriceMacronutriments />} />
              <Route path="/sante/allure-course" element={<CalculatriceAllureCourse />} />
              <Route path="/sante/poids-ideal" element={<CalculatricePoidIdeal />} />
              <Route path="/sante/apport-eau" element={<CalculatriceApportEau />} />
              <Route path="/sante/frequence-cardiaque" element={<CalculatriceFrequenceCardiaque />} />
              <Route path="/sante/age-condition-physique" element={<CalculatriceAgeConditionPhysique />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;