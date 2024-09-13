// Fonction pour calculer le paiement mensuel d'un prêt
export const calculateMonthlyPayment = (principal, annualRate, termInYears) => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = termInYears * 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );
};

// Fonction pour calculer les intérêts composés
export const calculateCompoundInterest = (principal, annualRate, years, monthlyContribution = 0) => {
  const monthlyRate = annualRate / 100 / 12;
  let total = principal;
  for (let i = 0; i < years * 12; i++) {
    total = total * (1 + monthlyRate) + monthlyContribution;
  }
  return total;
};

// Fonction pour formater les montants en euros
export const formatEuro = (amount) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
};