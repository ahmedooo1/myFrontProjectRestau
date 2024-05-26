import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bienvenue dans le Système de Gestion de Restaurant</h1>
      <Link to="/login">Connexion</Link>
    </div>
  );
}

export default Home;
