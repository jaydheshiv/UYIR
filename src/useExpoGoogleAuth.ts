import { useState } from 'react';

export function useExpoGoogleAuth() {
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    // Implement Google sign-in logic here
    // setUser({ ...userData });
  };

  return { user, signInWithGoogle };
}