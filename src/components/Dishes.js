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
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-16">
      <h1 className="text-3xl font-bold mb-6">Plats</h1>
      <ul className="flex flex-wrap gap-6">
        {dishes.map((dish) => (
          <li key={dish.id} className="bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer" style={{ width: '350px', maxHeight: '500px', overflow: 'hidden' }}>
            <div onClick={() => handleDishClick(dish.id)} className="flex flex-col items-center p-4">
              <div className="w-full">
                {dish.image && <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover rounded-t-lg" />}
              </div>
              <div className="w-full p-4">
                <h2 className="text-gray-100 text-xl font-bold mb-2">{dish.name}</h2>
                <p className="text-gray-100 mb-2 truncate">{dish.description}</p>
                <p className="text-gray-100 font-semibold">Prix: {dish.price} €</p>
                <p className="text-gray-100">Type: {dish.type}</p>
                <p className="text-gray-100">Disponible jusqu'à: {dish.available_until}</p>
                {dish.category && <p className="text-gray-100">Catégorie: {dish.category.name}</p>}
              </div>
            </div>
            <button
              onClick={() => handleAddToCart(dish)}
              className="w-full p-2 bg-green-500 text-white rounded-b-lg hover:bg-green-700 transition duration-300"
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
