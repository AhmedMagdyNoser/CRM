import useAuth from '../../hooks/useAuth';

function Home() {
  const { auth } = useAuth();

  return (
    <section className="p-6 sm:px-8">
      <h1 className="border-b pb-2 text-2xl font-bold text-progray-300">Home</h1>
      <p className="my-2 text-progray-200">Hello {auth.firstName}! Welcome to your dashboard.</p>
    </section>
  );
}

export default Home;
