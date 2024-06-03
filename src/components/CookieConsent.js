import React, { useState, useEffect } from 'react';
import { getCookie, setCookie } from '../utils/cookieUtils';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = getCookie('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie('cookieConsent', 'true', 365); // Set cookie for 1 year
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
      <p>Nous utilisons des cookies pour améliorer votre expérience sur notre site. En utilisant notre site, vous consentez à l'utilisation des cookies.</p>
      <button onClick={handleAccept} className="bg-yellow-500 text-black py-2 px-4 rounded-lg">
        Accepter
      </button>
    </div>
  );
};

export default CookieConsent;
