import React from 'react';
import useRefresh from '../../hooks/useRefresh';
import useLogout from '../../hooks/useLogout';
import useAuth from '../../hooks/useAuth';

function Home() {
  const refresh = useRefresh();
  const logout = useLogout();
  const { auth } = useAuth();

  return (
    <section>
      <h1>Home</h1>
      <p>Hello {auth.firstName}! Welcome to your dashboard.</p>
      <button onClick={logout}>Logout</button>
      <button onClick={refresh}>Refresh (For Testing)</button>
    </section>
  );
}

export default Home;
