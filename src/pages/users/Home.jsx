import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Form from '../../components/global/Form';
import InputField from '../../components/global/InputField';
import PopupBox from '../../components/global/PopupBox';

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
      {showPopup && <NewCustomerPopup closePopup={() => setShowPopup(false)} />}
    </section>
  );
}

export default Home;

function NewCustomerPopup({ closePopup }) {
  return (
    <PopupBox title="Add new customer" closePopup={closePopup}>
      <Form submitLabel="Add" className="h-auto flex-1 overflow-auto p-5">
        <InputField.FirstName />
        <InputField.LastName />
        <InputField.Email />
      </Form>
    </PopupBox>
  );
}


