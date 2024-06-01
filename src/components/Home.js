import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'tailwindcss/tailwind.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaSmile, FaCalendarAlt, FaStar, FaUtensils, FaHome, FaConciergeBell } from 'react-icons/fa';

function Home() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/restaurateur/dishes');
        setDishes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des plats', error);
        toast.error('Erreur lors de la récupération des plats.');
        setLoading(false);
      }
    };
    fetchDishes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <header className="relative text-center text-white h-[600px]">
        <img src="/images/Falafel.jpg" width={300} height={600} alt="Restaurant Background" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-7xl font-extrabold animate__animated animate__fadeInDown">Bienvenue au THE-CHEF 76</h1>
          <p className="mt-4 text-4xl animate__animated animate__fadeInUp">Découvrez nos plats délicieux et notre service exceptionnel</p>
          <Link to="/dishes" className="mt-6 bg-yellow-500 text-black py-3 px-8 rounded-full text-lg font-semibold hover:bg-yellow-700 transition duration-300 shadow-lg">
            Voir Nos Plats
          </Link>
        </div>
      </header>
      <section className="p-12 bg-contain bg-no-repeat bg-center h-[800px] m-16" style={{ backgroundImage: 'url("/images/bgMenu.jpg")' }}>
        <h2 className="text-4xl font-bold text-center text-white mb-8">Nos Plats</h2>
        <div className="flex flex-col items-center gap-8">
          {dishes.map((dish) => (
            <div key={dish.id} className="bg-gray-800 text-white rounded-full shadow-lg p-4 transform transition duration-500 hover:scale-105 hover:shadow-2xl flex items-center" style={{ width: '450px' }}>
              <img src={dish.image} alt={dish.name} className="w-20 h-20 object-cover rounded-full mr-4" />
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-1">{dish.name}</h3>
                <p className="mb-1 text-sm">{dish.description.split(' ').slice(0, 5).join(' ')}...</p>
                <p className="mt-1 font-semibold text-sm">Prix: {dish.price} €</p>
              </div>
              <div className="flex justify-end mt-3">
                <Link to={`/dishes/${dish.id}`} className="inline-block bg-yellow-500 text-black py-1 px-4 rounded-full hover:bg-yellow-700 transition duration-300 shadow-md text-sm">
                  Voir Détails
                </Link>
              </div>
            </div>
          ))}
        </div>
     
      </section>
      <section className="p-12 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
        <h2 className="text-4xl font-bold text-center mb-8">Pourquoi Nous Choisir</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <FaSmile className="text-yellow-500 text-6xl mb-4" />
            <h3 className="text-2xl font-bold mb-3">Satisfaction des Clients</h3>
            <p className="text-center">Nous nous engageons à offrir une expérience culinaire exceptionnelle à chaque visite.</p>
          </div>
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <FaCalendarAlt className="text-yellow-500 text-6xl mb-4" />
            <h3 className="text-2xl font-bold mb-3">Ouvert 7/7</h3>
            <p className="text-center">Nous sommes ouverts tous les jours de la semaine pour mieux vous servir.</p>
          </div>
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <FaStar className="text-yellow-500 text-6xl mb-4" />
            <h3 className="text-2xl font-bold mb-3">Service de Qualité</h3>
            <p className="text-center">Notre équipe est dédiée à fournir un service de qualité supérieure à chaque client.</p>
          </div>
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <FaUtensils className="text-yellow-500 text-6xl mb-4" />
            <h3 className="text-2xl font-bold mb-3">Cuisine Exquise</h3>
            <p className="text-center">Découvrez une variété de plats délicieux préparés avec des ingrédients frais.</p>
          </div>
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <FaHome className="text-yellow-500 text-6xl mb-4" />
            <h3 className="text-2xl font-bold mb-3">Ambiance Conviviale</h3>
            <p className="text-center">Profitez d'une ambiance chaleureuse et accueillante à chaque visite.</p>
            </div>
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <FaConciergeBell className="text-yellow-500 text-6xl mb-4" />
            <h3 className="text-2xl font-bold mb-3">Service Rapide</h3>
            <p className="text-center">Profitez d'un service rapide et efficace sans compromettre la qualité.</p>
          </div>
        </div>
      </section>
      <section className="p-12 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white">
        <h2 className="text-4xl font-bold text-center mb-8">Notre Équipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img src="/images/ahmad.jpg" alt="Chef 1" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h3 className="text-2xl font-bold mb-3">Chef Ahmad Ahmad</h3>
            <p className="text-center">Chef exécutif avec plus de 10 ans d'expérience dans la cuisine française, kurde, turc, orientale.</p>
          </div>
          <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img src="/images/marie.jpg" alt="Chef 2" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h3 className="text-2xl font-bold mb-3">Chef Marie Curie</h3>
            <p className="text-center">Spécialiste en pâtisserie et desserts gourmands.</p>
          </div>
          <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img src="/images/pierre.jpg" alt="Chef 3" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h3 className="text-2xl font-bold mb-3">Chef Pierre Martin</h3>
            <p className="text-center">Expert en cuisine fusion et plats innovants.</p>
          </div>
        </div>
      </section>

    
      <section className="p-12 bg-gradient-to-r from-black via-gray-900 to-black text-white">
        <h2 className="text-4xl font-bold text-center mb-8">Contactez-Nous</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <FaPhone className="text-yellow-500 text-6xl mb-4" />
            <h3 className="text-2xl font-bold mb-3">Appelez-Nous</h3>
            <p className="text-center text-lg">
              <a href="tel:+123456789" className="text-yellow-500 underline hover:text-yellow-400 transition duration-300">+123 456 789</a>
            </p>
          </div>
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <FaEnvelope className="text-yellow-500 text-6xl mb-4" />
            <h3 className="text-2xl font-bold mb-3">Envoyez un Email</h3>
            <p className="text-center text-lg">
              <a href="mailto:contact@restaurantmoderne.com" className="text-yellow-500 underline hover:text-yellow-400 transition duration-300">contact@restaurantmoderne.com</a>
            </p>
          </div>
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <FaMapMarkerAlt className="text-yellow-500 text-6xl mb-4" />
            <h3 className="text-2xl font-bold mb-3">Visitez-Nous</h3>
            <p className="text-center text-lg">123 Rue de la Gastronomie, Paris, France</p>
          </div>
        </div>
      </section>

     
    </div>
  );
}

export default Home;


