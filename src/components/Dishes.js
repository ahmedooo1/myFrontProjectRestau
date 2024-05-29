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
    <div className="min-h-screen bg-gray-800 text-white p-8 pt-16">
      <h1 className="text-3xl font-bold mb-6">Plats</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <li key={dish.id} className="bg-white  rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer">
            <div onClick={() => handleDishClick(dish.id)} className="flex flex-col items-center p-4">
              <div className="w-full">
                <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover rounded-t-lg"/>
              </div>
              <div className="w-full p-4">
                <h2 className="text-xl font-bold mb-2">{dish.name}</h2>
                <p className="text-gray-700 mb-2">{dish.description}</p>
                <p className="text-gray-900 font-semibold">Prix: {dish.price} €</p>
                <p className="text-gray-600">Type: {dish.type}</p>
                <p className="text-gray-600">Disponible jusqu'à: {dish.available_until}</p>
              </div>
            </div>
            <button
              onClick={() => handleAddToCart(dish)}
              className="w-full p-2 bg-blue-500 text-white rounded-b-lg hover:bg-blue-700 transition duration-300"
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