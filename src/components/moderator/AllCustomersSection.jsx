import { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import InterestBadge from '../../components/global/InterestBadge';
import InputField from '../global/InputField';
import { Link } from 'react-router-dom';

// Task: This component needs to be refactored with the new data structure

function AllCustomersSection({ customers, loading }) {
  const [search, setSearch] = useState('');

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search) ||
      (customer.email && customer.email.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <span className="my-4 rounded-full bg-pro-300 px-4 py-2 text-sm capitalize text-white">All customers</span>
        <div className="w-full sm:w-[375px]">
          <InputField
            type="text"
            icon={faSearch}
            placeholder="Search by name, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-progray-50">
            <tr className="text-left text-xs uppercase tracking-wider text-progray-300">
              <th className="rounded-none px-6 py-3">Name</th>
              <th className="rounded-none px-6 py-3">Phone</th>
              <th className="rounded-none px-6 py-3">Interests</th>
              <th className="rounded-none px-6 py-3">Added On</th>
              <th className="rounded-none px-6 py-3"></th>
            </tr>
          </thead>
          {loading ? (
            <TableSkeleton />
          ) : filteredCustomers.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="4" className="px-6 py-4 text-progray-200">
                  No customers found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white">
              {filteredCustomers.map((customer) => (
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
    <tr className="border-b text-xs transition hover:bg-progray-50 sm:text-sm">
      <td className="flex items-center gap-3 whitespace-nowrap px-6 py-4 font-bold text-progray-300">
        <div className="flex-center h-10 w-10 rounded-full bg-pro-100">
          <FontAwesomeIcon icon={faUser} className="text-sm text-pro-200" />
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
        {new Date(customer.additionDate).toDateString()} {/* Task: formatDate */}
      </td>
      <td className="whitespace-nowrap rounded-none px-6 py-4">
        <Link
          to={`/customer/${customer.customerId}`}
          className="px-4 py-2 text-pro-300 transition-colors hover:bg-pro-300 hover:text-white"
        >
          View
        </Link>
      </td>
    </tr>
  );
}
