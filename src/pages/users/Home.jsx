import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import AddNewCustomerPopup from '../../components/moderator/AddNewCustomerPopup';


function Home() {
  const { auth } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section>
      <h1>Home</h1>
      <p className="my-2">Hello {auth.firstName}! Welcome to your dashboard.</p>
      <button className="btn-primary px-5 py-3 text-sm" onClick={() => setShowPopup(true)}>
        New Customer
      </button>
      {showPopup && <AddNewCustomerPopup closePopup={() => setShowPopup(false)} />}
    </section>
  );
}

export default Home;
