import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import InterestBadge from '../../../../../../components/global/InterestBadge';

function CustomerRow({ customer }) {
  return (
    <tr className="border-b text-xs transition hover:bg-gray-50 sm:text-sm">
      <td className="flex items-center gap-3 whitespace-nowrap px-6 py-4 font-bold text-gray-800">
        <div className="flex-center h-10 w-10 rounded-full bg-pro-100">
          <FontAwesomeIcon icon={faUser} className="text-sm text-pro-200" />
        </div>
        <span>
          {customer.firstName} {customer.lastName}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-gray-500">{customer.phone}</td>
      <td className="flex flex-wrap gap-2 whitespace-nowrap px-6 py-4">
        {customer.userInterests.map((interest) => (
          <InterestBadge key={interest.name} interest={interest.name} />
        ))}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-gray-500">
        {new Date(customer.additionDate).toDateString()} {/* Task: formatDate */}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <Link
          to={`/customer/${customer.customerId}`}
          className="rounded-xl px-4 py-2 text-pro-300 transition-colors hover:bg-pro-300 hover:text-white"
        >
          View
        </Link>
      </td>
    </tr>
  );
}

export default CustomerRow;
