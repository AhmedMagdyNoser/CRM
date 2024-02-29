import React from 'react';
import useRefresh from '../../hooks/useRefresh';
import useLogout from '../../hooks/useLogout';

function Home() {
  const refresh = useRefresh();
  const logout = useLogout();

  return (
    <div>
      <header>
        <button onClick={logout}>Logout</button>
        <hr />
      </header>
      <h1>Home</h1>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
}

export default Home;
