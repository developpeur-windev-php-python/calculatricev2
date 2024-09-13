import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-secondary text-white py-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Calculatrices App</Link>
        <div>
          <Link to="/finance" className="mx-2">Finance</Link>
          <Link to="/sante" className="mx-2">Santé</Link>
          <Link to="/seo-marketing" className="mx-2">SEO/Marketing</Link>
          <Link to="/immobilier" className="mx-2">Immobilier</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;