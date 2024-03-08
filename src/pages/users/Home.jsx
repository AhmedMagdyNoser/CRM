import useAuth from '../../hooks/useAuth';

function Home() {
  const { auth } = useAuth();

  return (
    <section>
      <h1 className="border-b pb-2">Home</h1>
      <p className="my-2">Hello {auth.firstName}! Welcome to your dashboard.</p>
    </section>
  );
}

export default Home;
