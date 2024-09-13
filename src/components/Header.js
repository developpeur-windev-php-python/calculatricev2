import React from 'react';

const Header = ({ title, description }) => {
  return (
    <header className="bg-primary text-white py-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2">{description}</p>
      </div>
    </header>
  );
};

export default Header;