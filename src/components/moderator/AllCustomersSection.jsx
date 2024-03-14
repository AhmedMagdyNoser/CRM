import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import InterestBadge from '../../components/global/InterestBadge';

function AllCustomersSection({ customers, loading }) {
  return (
    <>
      <span className="my-4 w-fit rounded-full bg-pro-300 px-4 py-2 text-sm capitalize text-white">All customers</span>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-progray-50">
            <tr className="text-left text-xs uppercase tracking-wider text-progray-300">
              <th className="rounded-none px-6 py-3">Name</th>
              <th className="rounded-none px-6 py-3">Phone</th>
              <th className="rounded-none px-6 py-3">Interests</th>
              <th className="rounded-none px-6 py-3">Added On</th>
            </tr>
          </thead>
          {loading ? (
            <TableSkeleton />
          ) : customers.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="4" className="px-6 py-4 text-progray-200">
                  No customers found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white">
              {customers.map((customer) => (
                <TableRow key={customer.customerId} customer={customer} />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default AllCustomersSection;

function TableSkeleton() {
  const row = (
    <tr className="animate-pulse">
      <td className="px-6 py-4 text-progray-200">
        <div className="h-4 bg-progray-50 "></div>
      </td>
      <td className="px-6 py-4 text-progray-200">
        <div className="h-4 bg-progray-50 "></div>
      </td>
      <td className="px-6 py-4 text-progray-200">
        <div className="h-4 bg-progray-50 "></div>
      </td>
      <td className="px-6 py-4 text-progray-200">
        <div className="h-4 bg-progray-50 "></div>
      </td>
    </tr>
  );

  return (
    <tbody>
      {Array.from({ length: 5 }).map((_, index) => (
        <Fragment key={index}>{row}</Fragment>
      ))}
    </tbody>
  );
}

function TableRow({ customer }) {
  return (
    <tr key={customer.customerId} className="border-b transition hover:bg-progray-50">
      <td className="flex items-center gap-2 whitespace-nowrap px-6 py-4 font-bold text-progray-300">
        <div className="flex-center h-10 w-10 rounded-full bg-pro-100">
          <FontAwesomeIcon icon={faUser} className="text-pro-200" />
        </div>
        <span>
          {customer.firstName} {customer.lastName}
        </span>
      </td>
      <td className="whitespace-nowrap rounded-none px-6 py-4 text-progray-200">{customer.phone}</td>
      <td className="flex flex-wrap gap-2 whitespace-nowrap px-6 py-4">
        {customer.userInterests.map((interest) => (
          <InterestBadge key={interest.name} interest={interest.name} />
        ))}
      </td>
      <td className="whitespace-nowrap rounded-none px-6 py-4 text-progray-200">
        {new Date(customer.additionDate).toDateString()}
      </td>
    </tr>
  );
}
