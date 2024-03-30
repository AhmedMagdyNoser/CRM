import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InterestBadge from '../../../../../../components/global/InterestBadge';

function CustomerCard({ customer }) {
  return (
    <Link
      to={`/customer/${customer.id}`}
      className="flex h-[135px] min-w-[300px] flex-col justify-between rounded-xl bg-white p-4 shadow hover:bg-gray-50"
    >
      <div className="flex items-center gap-3">
        <div className="flex-center h-10 w-10 rounded-full bg-pro-100">
          <FontAwesomeIcon icon={faUser} className="text-pro-200" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg">{customer.firstName + ' ' + customer.lastName}</h3>
          <p className="text-sm">{customer.phone}</p>
        </div>
      </div>
      <div className="scrollbar-hide flex gap-2 overflow-auto py-1">
        {customer.interests.map((interest) => (
          <InterestBadge key={interest.id} interest={interest.name} />
        ))}
      </div>
    </Link>
  );
}

export default CustomerCard;
