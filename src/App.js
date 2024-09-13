import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';  // Ajoutez cette ligne
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
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
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;