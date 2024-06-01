import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Commande supprimée avec succès.');
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la commande', error.response ? error.response.data : error.message);
      toast.error('Erreur lors de la suppression de la commande.');
    }
  };

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data); // Store orders in state
      console.log('Orders:', response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes', error);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

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
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <h1 className="text-3xl font-bold mt-8">Commandes</h1>
      <ul className="space-y-4">
        {orders.map((order, index) => (
          <li key={index} className="p-4 bg-white text-black rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Commande #{order.id}</h2>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.dish_name} - Quantité: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              {user && user.roles.includes('ROLE_ADMIN') && (
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                >
                  Supprimer
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {user && user.roles.includes('ROLE_ADMIN') && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Gestion des plats</h2>
          <button
            onClick={() => navigate('/admin/dishes')}
            className="mt-4 p-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Gérer les plats
          </button>
        </div>
      )}
    </div>
  );
}

export default Orders;

