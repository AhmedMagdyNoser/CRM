import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function AllCustomersHeaderSection() {
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-between">
      <h1>All Customers</h1>
      <button
        className="btn-primary flex-center gap-2 p-3 px-5 text-xs sm:text-sm"
        onClick={() => navigate('/add-new-customer')}
      >
        <FontAwesomeIcon icon={faPlus} />
        <span className="capitalize ">New customer</span>
      </button>
    </section>
  );
}

export default AllCustomersHeaderSection;
