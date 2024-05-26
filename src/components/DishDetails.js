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
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">{dish.name}</h1>
      <p>{dish.description}</p>
      <p>Prix: ${dish.price}</p>
      {/* Ajouter plus de détails si nécessaire */}
    </div>
  );
}

export default DishDetails;