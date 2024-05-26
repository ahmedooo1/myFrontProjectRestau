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
    const formData = new FormData();
    formData.append('name', newDish.name);
    formData.append('description', newDish.description);
    formData.append('price', newDish.price);
    formData.append('type', newDish.type);
    formData.append('available_until', newDish.available_until);
    if (newDish.image) {
      formData.append('image', newDish.image);
    }

    try {
      await axios.post('http://localhost:8000/api/restaurateur/dishes', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
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
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      toast.error('Vous devez être connecté pour supprimer un plat.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8000/api/restaurateur/dishes/${dishId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Dish deleted', response.data);
      toast.success('Plat supprimé avec succès.');
      setDishes(dishes.filter(dish => dish.id !== dishId));
    } catch (error) {
      console.error('Erreur lors de la suppression du plat', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 409) {
        toast.error('Impossible de supprimer le plat car il est référencé par d\'autres enregistrements.');
      } else {
        toast.error('Erreur lors de la suppression du plat.');
      }
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
          <label className="block text-gray-700">Disponible jusqu'au:</label>
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
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Ajouter un plat
        </button>
      </form>
      <ul className="mt-8 space-y-4">
        {dishes.map((dish) => (
          <li key={dish.id} className="p-4 bg-white rounded-lg shadow">
            {dish.image && (
              <img src={dish.image} alt={dish.name} className="w-32 h-32 object-cover mb-4" />
            )}
            <div>
              <strong>{dish.name}</strong> - {dish.description} - {dish.price}€ - {dish.type} - Disponible jusqu'au {dish.available_until}
            </div>
            <button
              onClick={() => handleDeleteDish(dish.id)}
              className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDishes;
