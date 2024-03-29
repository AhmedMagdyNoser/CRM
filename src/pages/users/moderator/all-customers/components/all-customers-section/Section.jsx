import { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import InputField from '../../../../../../components/global/InputField';
import CustomerRowSkeleton from './CustomerRowSkeleton';
import CustomerRow from './CustomerRow';

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
            <CustomerRowSkeleton />
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
                <CustomerRow key={customer.customerId} customer={customer} />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default AllCustomersSection;
