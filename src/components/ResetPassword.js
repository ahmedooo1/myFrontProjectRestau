import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const { token } = useParams();
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
            const params = new URLSearchParams();
            params.append('password', password);

            const response = await axios.post(`http://localhost:8000/api/reset-password/${token}`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            toast.success(response.data.message);
            navigate('/login');
        } catch (error) {
            console.error('Error resetting password', error);
            toast.error('Erreur lors de la réinitialisation du mot de passe. Veuillez réessayer.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Réinitialiser le mot de passe</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Nouveau mot de passe</label>
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
                        Réinitialiser le mot de passe
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    <a href="/login" className="text-blue-500 hover:underline">Retour à la connexion</a>
                </p>
            </div>
        </div>
    );
}

export default ResetPassword;
