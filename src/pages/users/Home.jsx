import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Form from '../../components/global/Form';
import { layoutDimensions } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import InputField from '../../components/global/InputField';

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

function PopupBox({ title, closePopup, children }) {
  return (
    <div className="popup-screen flex-center fixed top-0 animate-fade-in-fast rounded-none bg-[#00000035]">
      <div className="flex h-full w-full flex-col rounded-none bg-white shadow-md sm:h-[550px] sm:w-[500px] sm:rounded-md lg:w-[600px]">
        <header className="flex items-center justify-between rounded-none border-b p-5">
          <h2 className="capitalize">{title}</h2>
          <button className="btn-light flex-center h-8 w-8" onClick={closePopup}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </header>
        {children}
      </div>
      <style>
        {`
          .popup-screen {
            left: 0;
            width: 100%;
            height: calc(100% - ${layoutDimensions.navbarSize}px);
          }

          @media (min-width: 612px) {
            .popup-screen {
              left: ${layoutDimensions.navbarSize}px;
              width: calc(100% - ${layoutDimensions.navbarSize}px);
              height: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}
