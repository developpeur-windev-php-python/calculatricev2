import React from 'react';
import Header from '../components/Header';

const HomePage = () => {
  return (
    <div>
      <Header 
        title="Bienvenue sur Calculatrices App" 
        description="Découvrez nos calculatrices pour la finance, la santé et le SEO/Marketing"
      />
      <main className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Nos catégories de calculatrices</h2>
        <ul className="list-disc list-inside">
          <li>Finance</li>
          <li>Santé</li>
          <li>SEO/Marketing</li>
        </ul>
      </main>
    </div>
  );
};

export default HomePage;