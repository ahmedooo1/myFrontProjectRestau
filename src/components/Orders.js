import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No auth token found');
        }

        const response = await axios.get('http://localhost:8000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes', error);
        toast.error('Erreur lors de la récupération des commandes.');
      }
    };
    fetchOrders();
  }, []);

  const handleOrderClick = (id) => {
    navigate(`/orders/${id}`);
  };



  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Commandes</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition duration-300 cursor-pointer">
            <div onClick={() => handleOrderClick(order.id)}>
              {order.name}
            </div>
          
          </li>
        ))}
      </ul>

     
    </div>
  );
}

export default Orders;

