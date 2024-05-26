import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setFormData({
          email: response.data.email,
          name: response.data.name
        });
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur', error);
        toast.error('Erreur lors de la récupération du profil utilisateur.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8000/api/user/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Profil mis à jour avec succès.');
      setEditMode(false);
      setUser({ ...user, ...formData });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil', error);
      toast.error('Erreur lors de la mise à jour du profil.');
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8000/api/user/profile/password', passwordData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Mot de passe mis à jour avec succès.');
      setPasswordMode(false);
      setPasswordData({
        current_password: '',
        new_password: ''
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe', error);
      toast.error('Erreur lors de la mise à jour du mot de passe.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Déconnexion réussie.');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Chargement...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
      <div className="bg-white p-12 rounded-lg shadow-2xl max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">Profil</h1>
        {user ? (
          <div className="space-y-6">
            <div className="text-center text-gray-700">
              <p className="text-xl"><strong>Email:</strong> {user.email}</p>
              <p className="text-xl"><strong>Nom:</strong> {user.name}</p>
            </div>
            {editMode ? (
              <>
                <div className="flex items-center space-x-6">
                  <div className="text-gray-700 font-semibold">Email:</div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="text-gray-900 border rounded p-3"
                  />
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-gray-700 font-semibold">Nom:</div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-gray-900 border rounded p-3"
                  />
                </div>
                <button
                  onClick={handleUpdateProfile}
                  className="mt-6 bg-blue-600 text-white p-3 rounded-lg"
                >
                  Mettre à jour le profil
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="mt-6 bg-blue-600 text-white p-3 rounded-lg"
              >
                Modifier le profil
              </button>
            )}
            {passwordMode ? (
              <>
                <div className="flex items-center space-x-6">
                  <div className="text-gray-700 font-semibold">Mot de passe actuel:</div>
                  <input
                    type="password"
                    name="current_password"
                    value={passwordData.current_password}
                    onChange={handlePasswordChange}
                    className="text-gray-900 border rounded p-3"
                  />
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-gray-700 font-semibold">Nouveau mot de passe:</div>
                  <input
                    type="password"
                    name="new_password"
                    value={passwordData.new_password}
                    onChange={handlePasswordChange}
                    className="text-gray-900 border rounded p-3"
                  />
                </div>
                <button
                  onClick={handleUpdatePassword}
                  className="mt-6 bg-blue-600 text-white p-3 rounded-lg"
                >
                  Mettre à jour le mot de passe
                </button>
              </>
            ) : (
              <button
                onClick={() => setPasswordMode(true)}
                className="mt-6 bg-blue-600 text-white p-3 rounded-lg"
              >
                Modifier le mot de passe
              </button>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600">Chargement...</p>
        )}
        <button onClick={handleLogout} className="mt-8 w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-800 transition duration-300">
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default Profile;



