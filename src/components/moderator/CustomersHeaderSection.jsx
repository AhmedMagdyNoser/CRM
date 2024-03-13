import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddNewCustomerPopup from './AddNewCustomerPopup';

function CustomersHeaderSection() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className="flex items-center justify-between">
      <h1>Custormers</h1>
      <button className="btn-primary flex-center gap-2 p-3 px-5 text-xs sm:text-sm" onClick={() => setShowPopup(true)}>
        <FontAwesomeIcon icon={faPlus} />
        <span className="capitalize ">New customer</span>
      </button>
      {showPopup && <AddNewCustomerPopup closePopup={() => setShowPopup(false)} />}
    </section>
  );
}

export default CustomersHeaderSection;
