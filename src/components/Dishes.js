import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cart from './Cart';

function Dishes() {
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/restaurateur/dishes');
        setDishes(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des plats', error);
        toast.error('Erreur lors de la récupération des plats.');
      }
    };
    fetchDishes();
  }, []);

  const handleDishClick = (id) => {
    navigate(`/dishes/${id}`);
  };

  const handleAddToCart = (dish) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === dish.id);
    if (index !== -1) {
      newCart[index].quantity += 1;
    } else {
      newCart.push({ ...dish, quantity: 1 });
    }
    setCart(newCart);
    toast.success(`${dish.name} a été ajouté au panier.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Plats</h1>
      <ul className="space-y-4">
        {dishes.map((dish) => (
          <li key={dish.id} className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition duration-300 cursor-pointer">
            <div onClick={() => handleDishClick(dish.id)}>
              <h2 className="text-xl font-bold">{dish.name}</h2>
              <p>{dish.description}</p>
              <p>Prix: {dish.price} €</p>
              <p>Type: {dish.type}</p>
              <p>Disponible jusqu'à: {dish.available_until}</p>
            </div>
            <button
              onClick={() => handleAddToCart(dish)}
              className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Commander
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-8">Panier</h2>
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
}

export default Dishes;
