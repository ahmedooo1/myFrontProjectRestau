import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newDish, setNewDish] = useState({
    name: '',
    description: '',
    price: '',
    type: '',
    available_until: '',
    image: null,
    category_id: ''
  });
  const [editingDish, setEditingDish] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
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

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories', error);
        toast.error('Erreur lors de la récupération des catégories.');
      }
    };

    fetchDishes();
    fetchCategories();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish({ ...newDish, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewDish({ ...newDish, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSelectedImage = () => {
    setNewDish({ ...newDish, image: null });
    setSelectedImage(null);
  };

  const handleAddDish = async () => {
    const formData = new FormData();
    formData.append('name', newDish.name);
    formData.append('description', newDish.description);
    formData.append('price', newDish.price);
    formData.append('type', newDish.type);
    formData.append('available_until', newDish.available_until);
    formData.append('category_id', newDish.category_id);
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
        image: null,
        category_id: ''
      });
      setSelectedImage(null);
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
  console.log(newDish);
  const handleUpdateDish = async (dishId) => {
    try {
      const formData = new FormData();
      formData.append('name', newDish.name);
      formData.append('description', newDish.description);
      formData.append('price', newDish.price);
      formData.append('type', newDish.type);
      formData.append('available_until', newDish.available_until);
      formData.append('category_id', newDish.category_id);
      if (newDish.image) {
        formData.append('image', newDish.image);
      }

      console.log(`Updating dish with ID: ${dishId}`);
      console.log('FormData:', formData);

      await axios.put(`http://localhost:8000/api/restaurateur/dishes/${dishId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Plat mis à jour avec succès.');
      setNewDish({
        name: '',
        description: '',
        price: '',
        type: '',
        available_until: '',
        image: null,
        category_id: ''
      });
      setSelectedImage(null);
      setEditingDish(null); // Reset editing state
      // Re-fetch dishes
      const response = await axios.get('http://localhost:8000/api/restaurateur/dishes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDishes(response.data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du plat', error);
      toast.error('Erreur lors de la mise à jour du plat.');
    }
  };

  const handleDeleteDish = async (dishId) => {
    try {
      await axios.delete(`http://localhost:8000/api/restaurateur/dishes/${dishId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Plat supprimé avec succès.');
      // Re-fetch dishes
      const response = await axios.get('http://localhost:8000/api/restaurateur/dishes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDishes(response.data);
    } catch (error) {
      console.error('Erreur lors de la suppression du plat', error);
      toast.error('Erreur lors de la suppression du plat.');
    }
  };

  const handleDeleteImage = async (dishId) => {
    try {
      await axios.delete(`http://localhost:8000/api/restaurateur/dishes/${dishId}/image`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Image supprimée avec succès.');
      // Re-fetch dishes
      const response = await axios.get('http://localhost:8000/api/restaurateur/dishes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDishes(response.data);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image', error);
      toast.error('Erreur lors de la suppression de l\'image.');
    }
  };

  const handleAddImage = async (dishId) => {
    const formData = new FormData();
    if (newDish.image) {
      formData.append('image', newDish.image);
    }

    try {
      await axios.post(`http://localhost:8000/api/restaurateur/dishes/${dishId}/image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Image ajoutée avec succès.');
      setNewDish({
        ...newDish,
        image: null
      });
      setSelectedImage(null);
      // Re-fetch dishes
      const response = await axios.get('http://localhost:8000/api/restaurateur/dishes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDishes(response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'image', error);
      toast.error('Erreur lors de l\'ajout de l\'image.');
    }
  };

  const startEditingDish = (dish) => {
    setNewDish({
      name: dish.name,
      description: dish.description,
      price: dish.price,
      type: dish.type,
      available_until: dish.available_until,
      image: null,
      category_id: dish.category_id
    });
    setEditingDish(dish.id);
  };

  const handleSaveDish = () => {
    if (editingDish) {
      handleUpdateDish(editingDish);
    } else {
      handleAddDish();
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
          {editingDish && dishes.find(dish => dish.id === editingDish).image ? (
            <div className="flex flex-col items-center">
              <img src={dishes.find(dish => dish.id === editingDish).image} alt={` actuelle du plat ${dishes.find(dish => dish.id === editingDish).name}`} className="w-32 h-32 object-cover mb-4 rounded-md border border-gray-300" />
              <button
                type="button"
                onClick={() => handleDeleteImage(editingDish)}
                className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
              >
                Supprimer l'image
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <input
                type="file"
                onChange={(e) => {
                  handleFileChange(e);
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const imgElement = document.getElementById('selected-image');
                      imgElement.src = event.target.result;
                      imgElement.style.display = 'block';
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                name="image"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              <img id="selected-image" alt="sélectionnée" className="w-32 h-32 object-cover mt-4 rounded-md border border-gray-300" style={{ display: selectedImage ? 'block' : 'none' }} />
              {selectedImage && (
                <button
                  type="button"
                  onClick={handleRemoveSelectedImage}
                  className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                >
                  Retirer l'image
                </button>
              )}
              <button
                type="button"
                onClick={() => handleAddImage(editingDish)}
                className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
              >
                Ajouter une image
              </button>
            </div>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Catégorie:</label>
          <select
            value={newDish.category_id}
            onChange={handleInputChange}
            name="category_id"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleSaveDish}
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          {editingDish ? 'Mettre à jour le plat' : 'Ajouter un plat'}
        </button>
      </form>
      <ul className="mt-8 space-y-4">
        {dishes.map((dish) => (
          <li key={dish.id} className="p-4 bg-white rounded-lg shadow">
            {dish.image && (
              <img src={dish.image} alt={`plat ${dish.name}`} className="w-32 h-32 object-cover mb-4 rounded-md border border-gray-300" />
            )}
            <div>
              <strong>{dish.name}</strong> - {dish.description} - {dish.price}€ - {dish.type} - Disponible jusqu'au {dish.available_until}
            </div>
            <div className="mt-2">
              <span className="font-bold">Catégorie:</span> {dish.category ? dish.category.name : 'Non catégorisé'}
            </div>
            <button
              onClick={() => startEditingDish(dish)}
              className="m-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-800 transition duration-300 shadow-md"
            >
              Modifier
            </button>
            <button
              onClick={() => handleDeleteDish(dish.id)}
              className="m-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-800 transition duration-300 shadow-md"
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
