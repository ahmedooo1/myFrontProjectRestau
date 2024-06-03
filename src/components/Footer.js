import React from 'react';
import { FaTwitter, FaFacebookSquare, FaDribbble, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="block bg-gray-900 pt-8 pb-6 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold">Restons en contact!</h4>
            <h5 className="text-lg mt-0 mb-2">
              Retrouvez-nous sur ces plateformes, nous répondons sous 1-2 jours ouvrables.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6 flex justify-start">
              <button className="bg-white text-blue-400 shadow-none font-normal h-12 w-12 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2 hover:shadow-lg" type="button">
                <FaTwitter className="text-4xl" />
              </button>
              <button className="bg-white text-blue-600 shadow-none font-normal h-12 w-12 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2 hover:shadow-lg" type="button">
                <FaFacebookSquare className="text-4xl" />
              </button>
              <button className="bg-white text-pink-400 shadow-none font-normal h-12 w-12 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2 hover:shadow-lg" type="button">
                <FaDribbble className="text-4xl" />
              </button>
              <button className="bg-white text-gray-800 shadow-none font-normal h-12 w-12 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2 hover:shadow-lg" type="button">
                <FaGithub className="text-4xl" />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-gray-500 text-sm font-semibold mb-2">Liens Utiles</span>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-gray-600 hover:text-gray-300 font-semibold block pb-2 text-sm" href="/about">À Propos</a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-gray-300 font-semibold block pb-2 text-sm" href="/blog">Blog</a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-gray-300 font-semibold block pb-2 text-sm" href="https://github.com/your-github">Github</a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-gray-300 font-semibold block pb-2 text-sm" href="/free-products">Produits Gratuits</a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-gray-500 text-sm font-semibold mb-2">Autres Ressources</span>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-gray-600 hover:text-gray-300 font-semibold block pb-2 text-sm" href="/license">Licence MIT</a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-gray-300 font-semibold block pb-2 text-sm" href="/terms">Termes & Conditions</a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-gray-300 font-semibold block pb-2 text-sm" href="/privacy">Politique de Confidentialité</a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-gray-300 font-semibold block pb-2 text-sm" href="/contact">Contactez-Nous</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024</span>
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
