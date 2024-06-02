import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEnvelope } from 'react-icons/fa'; // Import FaEnvelope

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const contactData = {
      name,
      email,
      message,
    };

    console.log('Sending contact data:', contactData); // Log the data being sent

    try {
      const response = await axios.post('http://localhost:8000/contact/submit', contactData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response from server:', response.data); // Log the response from the server
      if (response.data === 'Message sent successfully') {
        toast.success('Message sent successfully');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast.error('Unexpected response from server');
      }
    } catch (error) {
      console.error('Error sending message', error);
      toast.error('Error sending message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <div className="max-w-2xl mx-auto bg-gray-700 text-white rounded-lg shadow-lg p-6 mt-16">
      <FaEnvelope className="mx-auto text-yellow-500 text-7xl" />
        <h1 className="text-3xl font-bold mb-6 flex items-center">

          <span>Contactez-nous</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold">Nom:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-gray-700 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-700 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold">Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full bg-gray-700 p-2 border rounded h-32"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-4 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
