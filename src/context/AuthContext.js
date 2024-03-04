import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({}); // { firstName, lastName, username, email, roles, accessToken }

  console.log('Rendering AuthProvider', { auth });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
