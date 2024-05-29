import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('email', email);
      await axios.post('http://localhost:8000/api/request-reset-password', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      toast.success('Un email de réinitialisation a été envoyé.');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
      console.error('Erreur lors de l\'envoi de l\'email de réinitialisation', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Réinitialiser le mot de passe</h1>
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
          <button 
            type="submit" 
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Envoyer l'email de réinitialisation
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          <a href="/login" className="text-blue-500 hover:underline">Retour à la connexion</a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;



