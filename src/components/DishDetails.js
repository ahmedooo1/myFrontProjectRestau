import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function DishDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchDishDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/restaurateur/dishes/${id}`);
        setDish(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du plat', error);
        toast.error('Erreur lors de la récupération des détails du plat.');
      }
    };
    fetchDishDetails();
  }, [id]);

  const handleAddToCart = () => {
    setCart([...cart, { ...dish, quantity: 1 }]);
    toast.success('Plat ajouté au panier.');
  };

  const handleViewCart = () => {
    navigate('/panier', { state: { cart } });
  };

  if (!dish) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-700 text-white rounded-lg shadow-lg overflow-hidden mt-14">
        <img src={dish.image} alt={dish.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-4xl font-extrabold mb-6 text-yellow-400">{dish.name}</h1>
          <p className="text-lg mb-4">{dish.description}</p>
          <p className="text-lg font-semibold mb-4">Prix: <span className="text-yellow-300">${dish.price}</span></p>
          <p className="text-lg">Type: <span className="text-yellow-300">{dish.type}</span></p>
          <p className="text-lg">Disponible jusqu'à: <span className="text-yellow-300">{dish.available_until}</span></p>
          <button
            onClick={handleAddToCart}
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Ajouter au panier
          </button>
          <button
            onClick={handleViewCart}
            className="mt-4 ml-4 p-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
          >
            Voir le panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default DishDetails;
