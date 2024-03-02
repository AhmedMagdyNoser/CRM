import React from 'react';
import useLogout from '../../hooks/useLogout';
import useAuth from '../../hooks/useAuth';

function Home() {
  const logout = useLogout();
  const { auth } = useAuth();

  return (
    <section className="p-4">
      <h1 className="text-progray-300 border-b pb-2 text-2xl font-bold">Home</h1>
      <p className="text-progray-200 my-2">Hello {auth.firstName}! Welcome to your dashboard.</p>
      <p className="text-progray-200 mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi consequuntur eaque officiis libero,
        praesentium porro consequatur explicabo nostrum vero. Consequuntur accusantium ut dolorem? Cupiditate unde soluta
        fugit ipsum est.
      </p>
      <button
        onClick={logout}
        className="text-pro-50 flex h-12 w-32 items-center justify-center rounded bg-pro-300 font-bold transition hover:bg-pro-200"
      >
        Logout
      </button>
    </section>
  );
}

export default Home;
