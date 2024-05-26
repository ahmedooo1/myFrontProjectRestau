import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      toast.success('Connexion réussie!');
      navigate('/profile');
    } catch (error) {
      toast.error('Erreur lors de la connexion. Veuillez réessayer.');
      console.error('Erreur lors de la connexion', error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Connexion</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Mot de passe</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Link to="/ForgotPassword" className="text-blue-500 hover:underline">Mot de passe oublié?</Link>
          </div>
          <button 
            type="submit" 
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Connexion
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Pas encore de compte? <Link to="/register" className="text-blue-500 hover:underline">Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

