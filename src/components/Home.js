import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'tailwindcss/tailwind.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

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
      <section className="p-12 bg-cover" style={{ backgroundImage: 'url("/images/bgMenu.jpg")' }}>
        <h2 className="text-4xl font-bold text-center text-white mb-8">Nos Plats</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {dishes.map((dish) => (
            <div key={dish.id} className="bg-gray-800 text-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl" style={{ width: '250px' }}>
              <img src={dish.image} alt={dish.name} className="w-full h-32 object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-bold mb-3">{dish.name}</h3>
              <p className="mb-2">{dish.description}</p>
              <p className="mt-2 font-semibold">Prix: {dish.price} €</p>
              <Link to={`/dishes/${dish.id}`} className="mt-4 inline-block bg-yellow-500 text-black py-2 px-6 rounded-full hover:bg-yellow-700 transition duration-300 shadow-md">
                Voir Détails
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="p-12 bg-gradient-to-r from-black via-gray-900 to-black text-white">
        <h2 className="text-4xl font-bold text-center mb-8">À Propos de Nous</h2>
        <p className="text-center text-lg">Nous sommes un restaurant moderne offrant une expérience culinaire unique. Notre mission est de fournir des plats de haute qualité avec un service exceptionnel. Venez découvrir notre menu varié et nos spécialités du chef.</p>
      </section>

      <section className="p-12 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white">
        <h2 className="text-4xl font-bold text-center mb-8">Nos Services</h2>
        <p className="text-center text-lg">Nous offrons des services de restauration sur place, des plats à emporter et des livraisons à domicile. Profitez de nos offres spéciales et de nos événements culinaires exclusifs.</p>
      </section>

      <section className="p-12 bg-gradient-to-r from-black via-gray-900 to-black text-white">
        <h2 className="text-4xl font-bold text-center mb-8">Contactez-Nous</h2>
        <p className="text-center text-lg">Pour toute question, veuillez nous contacter à <a href="mailto:contact@restaurantmoderne.com" className="text-yellow-500 underline">contact@restaurantmoderne.com</a> ou appelez-nous au <a href="tel:+123456789" className="text-yellow-500 underline">+123 456 789</a>.</p>
        <div className="flex justify-center mt-6">
          <FaPhone className="mx-4 text-yellow-500 text-2xl" />
          <FaEnvelope className="mx-4 text-yellow-500 text-2xl" />
          <FaMapMarkerAlt className="mx-4 text-yellow-500 text-2xl" />
        </div>
      </section>

      <footer className="bg-gray-900 text-white p-8 text-center">
        <p className="text-lg">&copy; 2023 Restaurant Moderne. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default Home;

