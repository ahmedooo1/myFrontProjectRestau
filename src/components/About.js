import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-800 min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">À Propos de Notre Restaurant</h1>
          <p className="text-lg text-gray-700 mb-4">
            Bienvenue sur notre site de réservation de restaurant en ligne! Nous sommes ravis de vous accueillir dans notre établissement et de vous offrir une expérience culinaire inoubliable.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Notre restaurant est dédié à offrir une cuisine fraîche et savoureuse, préparée avec amour et soin par notre équipe de chefs expérimentés. Nous utilisons uniquement les ingrédients les plus frais et de haute qualité pour créer des plats délicieux qui raviront vos papilles.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Nous sommes fiers de notre ambiance chaleureuse et conviviale, idéale pour les repas en famille, les sorties entre amis ou les soirées romantiques. Notre équipe d'accueil est toujours prête à vous accueillir avec un sourire et à vous offrir un service exceptionnel.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Nous sommes également engagés envers l'environnement et la communauté locale. Nous nous efforçons de réduire notre impact écologique en utilisant des pratiques durables et en soutenant les producteurs locaux.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Merci de nous avoir choisis pour votre prochaine expérience culinaire. Nous sommes impatients de vous servir et de vous offrir une soirée inoubliable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

