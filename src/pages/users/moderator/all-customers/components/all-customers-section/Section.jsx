import { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import InputField from '../../../../../../components/ui/InputField';
import CustomerRowSkeleton from './CustomerRowSkeleton';
import CustomerRow from './CustomerRow';
import useOnLoadFetch from '../../../../../../hooks/useOnLoadFetch';

// Task: Pagination + Search

function AllCustomersSection() {
  const [search, setSearch] = useState('');

  const { loading, data } = useOnLoadFetch('/moderator/getCustomers');

  let filteredCustomers = [];

  if (!loading)
    filteredCustomers = data.items.filter(
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

      <div className="overflow-x-auto rounded-t-xl">
        <table className="w-full">
          <thead className="border-b bg-gray-100">
            <tr className="text-left text-xs uppercase tracking-wider text-gray-800">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Interests</th>
              <th className="text-nowrap px-6 py-3">Last Action</th>
              <th className="px-6 py-3">Added On</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <CustomerRowSkeleton length={5} />
            </tbody>
          ) : filteredCustomers.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="4" className="px-6 py-4 text-gray-500">
                  No customers found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white">
              {filteredCustomers.map((customer) => (
                <CustomerRow key={customer.id} customer={customer} />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default AllCustomersSection;
