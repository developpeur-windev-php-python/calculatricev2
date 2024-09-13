import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const CategoryPage = ({ category, calculators }) => {
  return (
    <div>
      <Header 
        title={`Calculatrices ${category}`} 
        description={`Découvrez nos calculatrices pour ${category}`}
      />
      <main className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Nos calculatrices {category}</h2>
        <ul className="list-disc list-inside">
          {calculators.map((calc, index) => (
            <li key={index}>
              <Link to={calc.path} className="text-primary hover:text-secondary">{calc.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default CategoryPage;