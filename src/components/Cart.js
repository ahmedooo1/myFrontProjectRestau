import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Cart({ cart, setCart }) {
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotal = () => {
      const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotal(total);
    };
    calculateTotal();
  }, [cart]);

  const handleQuantityChange = (index, quantity) => {
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    toast.success('Plat retiré du panier.');
  };

  const handleOrder = async () => {
    const token = localStorage.getItem('token');
    const orderData = {
      items: cart.map(item => ({
        dish_id: item.id, // Assuming each item has an `id` field
        quantity: item.quantity
      }))
    };

    try {
      const response = await axios.post('http://localhost:8000/api/orders', orderData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Order created', response.data);
      toast.success('Commande passée avec succès.');
      setCart([]);
    } catch (error) {
      console.error('Erreur lors de la passation de la commande', error.response ? error.response.data : error.message);
      toast.error('Erreur lors de la passation de la commande.');
    }
  };

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
      toast.error('Erreur lors de la récupération des commandes.');
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
        toast.error('Erreur lors de la récupération du profil utilisateur.');
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <h1 className="text-3xl font-bold mb-6">Panier</h1>
      <ul className="space-y-4">
        {cart.map((item, index) => (
          <li key={index} className="p-4 bg-white text-black rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>Prix: ${item.price}</p>
              </div>
              <div>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                  className="w-16 p-1 border rounded"
                />
                <button
                  onClick={() => handleRemoveFromCart(index)}
                  className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                >
                  Retirer
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-8">Total: ${total}</h2>
      <button
        onClick={handleOrder}
        className="mt-4 p-4 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
      >
        Passer la commande
      </button>

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

export default Cart;
