import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur', error);
        toast.error('Erreur lors de la récupération du profil utilisateur.');
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Déconnexion réussie.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Profil</h1>
        {user ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="text-gray-700 font-semibold">ID:</div>
              <div className="text-gray-900">{user.id}</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-gray-700 font-semibold">Email:</div>
              <div className="text-gray-900">{user.email}</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-gray-700 font-semibold">Nom:</div>
              <div className="text-gray-900">{user.name}</div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Chargement...</p>
        )}
        <button onClick={handleLogout} className="mt-6 w-full py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300">
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default Profile;
