import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({
    name: '',
    description: '',
    price: '',
    type: '',
    available_until: '',
    image: null
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDishes = async () => {
      if (!token) {
        toast.error('Vous devez être connecté pour voir les plats.');
        return;
      }
      try {
        const response = await axios.get('http://localhost:8000/api/restaurateur/dishes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDishes(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des plats', error);
        toast.error('Erreur lors de la récupération des plats.');
      }
    };
    fetchDishes();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish({ ...newDish, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewDish({ ...newDish, image: e.target.files[0] });
  };

  const handleAddDish = async () => {
    if (!token) {
      toast.error('Vous devez être connecté pour ajouter un plat.');
      return;
    }

    const dishData = {
      name: newDish.name,
      description: newDish.description,
      price: newDish.price,
      type: newDish.type,
      available_until: newDish.available_until
    };

    console.log(dishData); // Vérifiez les données avant de les envoyer

    try {
      await axios.post('http://localhost:8000/api/restaurateur/dishes', dishData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success('Plat ajouté avec succès.');
      setNewDish({
        name: '',
        description: '',
        price: '',
        type: '',
        available_until: '',
        image: null
      });
      // Re-fetch dishes
      const response = await axios.get('http://localhost:8000/api/restaurateur/dishes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDishes(response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du plat', error);
      toast.error('Erreur lors de l\'ajout du plat.');
    }
  };

  const handleDeleteDish = async (dishId) => {
    if (!token) {
      toast.error('Vous devez être connecté pour supprimer un plat.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/restaurateur/dishes/${dishId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Plat supprimé avec succès.');
      setDishes(dishes.filter(dish => dish.id !== dishId));
    } catch (error) {
      console.error('Erreur lors de la suppression du plat', error);
      toast.error('Erreur lors de la suppression du plat.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Gestion des plats</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Nom:</label>
          <input
            type="text"
            value={newDish.name}
            onChange={handleInputChange}
            name="name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={newDish.description}
            onChange={handleInputChange}
            name="description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Prix:</label>
          <input
            type="number"
            value={newDish.price}
            onChange={handleInputChange}
            name="price"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Type:</label>
          <input
            type="text"
            value={newDish.type}
            onChange={handleInputChange}
            name="type"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Disponible jusqu'à:</label>
          <input
            type="datetime-local"
            value={newDish.available_until}
            onChange={handleInputChange}
            name="available_until"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            name="image"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="button"
          onClick={handleAddDish}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md"
        >
          Ajouter le plat
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Liste des plats</h2>
        <ul>
          {dishes.map(dish => (
            <li key={dish.id} className="mb-4 p-4 border border-gray-300 rounded-md">
              <h3 className="text-xl font-bold">{dish.name}</h3>
              <p>{dish.description}</p>
              <p>Prix: {dish.price}€</p>
              <p>Type: {dish.type}</p>
              <p>Disponible jusqu'au: {dish.available_until}</p>
              <button
                onClick={() => handleDeleteDish(dish.id)}
                className="mt-2 bg-red-500 text-white p-2 rounded-md"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDishes;
