import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Register() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/register', { username, email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Registration response:', response.data); // Added this line to log the registration response
      toast.success('Inscription réussie!');
      navigate('/login'); // Navigate to the login page after registration
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('L\'email ou le nom d\'utilisateur est déjà utilisé.');
      } else {
        toast.error('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
      console.error('Erreur lors de l\'inscription', error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Inscription</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nom</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
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
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Confirmer le mot de passe</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Inscription
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Déjà un compte? <Link to="/login" className="text-blue-500 hover:underline">Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;


