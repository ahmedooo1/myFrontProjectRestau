import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function GoogleLoginButton({ onSuccess, onFailure }) {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onFailure={onFailure}
      buttonText="Se connecter avec Google"
    />
  );
}

export default GoogleLoginButton;
