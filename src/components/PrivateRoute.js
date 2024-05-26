import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import named export

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  let isValidToken = false;
  if (token) {
    try {
      // Vérifiez que le token est bien formé
      const parts = token.split('.');
      if (parts.length === 3) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          isValidToken = true;
        }
      } else {
        console.error('Invalid token format');
      }
    } catch (error) {
      console.error('Invalid token', error);
    }
  }

  return isValidToken ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
