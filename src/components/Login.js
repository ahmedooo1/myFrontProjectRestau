import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { setCookie } from '../utils/cookieUtils'; // Add this import

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setCookie('token', response.data.token); // Set cookie
      toast.success('Connexion réussie!');
      navigate('/profile');
    } catch (error) {
      toast.error('Erreur lors de la connexion. Veuillez réessayer.');
      console.error('Erreur lors de la connexion', error);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/google-callback?code=${response.code}`);
      localStorage.setItem('token', res.data.token);
      setCookie('token', res.data.token); // Set cookie
      toast.success('Authentification Google réussie!');
      navigate('/profile');
    } catch (error) {
      toast.error('Erreur lors de l\'authentification Google. Veuillez réessayer.');
      console.error('Erreur lors de l\'authentification Google', error);
    }
  };

  const handleGoogleFailure = (error) => {
    toast.error('Erreur lors de l\'authentification Google. Veuillez réessayer.');
    console.error('Erreur lors de l\'authentification Google', error);
  };

  return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
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
          <div className="mt-4">
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              buttonText="Se connecter avec Google"
            />
                </GoogleOAuthProvider>

          </div>
          <p className="text-center text-gray-600 mt-4">
            Pas encore de compte? <Link to="/register" className="text-blue-500 hover:underline">Inscrivez-vous</Link>
          </p>
        </div>
      </div>
  );
}

export default Login;
