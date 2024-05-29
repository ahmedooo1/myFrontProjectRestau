import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function DishDetails() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);

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

  if (!dish) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white text-black rounded-lg shadow-lg overflow-hidden mt-14">
        <img src={dish.image} alt={dish.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{dish.name}</h1>
          <p className="text-gray-700 mb-4">{dish.description}</p>
          <p className="text-gray-900 font-semibold mb-4">Prix: ${dish.price}</p>
          <p className="text-gray-600">Type: {dish.type}</p>
          <p className="text-gray-600">Disponible jusqu'à: {dish.available_until}</p>
        </div>
      </div>
    </div>
  );
}

export default DishDetails;