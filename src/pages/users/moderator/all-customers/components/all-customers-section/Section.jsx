import { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import InputField from '../../../../../../components/ui/InputField';
import CustomerRowSkeleton from './CustomerRowSkeleton';
import CustomerRow from './CustomerRow';
import useOnLoadFetch from '../../../../../../hooks/useOnLoadFetch';
import usePrivateAxios from '../../../../../../hooks/usePrivateAxios';
import Pagination from '../../../../../../components/ui/Pagination';

const ITEMS_PER_PAGE = 15;

function AllCustomersSection() {
  const [search, setSearch] = useState('');
  const privateAxios = usePrivateAxios();

  const { loading, data, setLoading, setData } = useOnLoadFetch(`/moderator/getCustomers?page=1&size=${ITEMS_PER_PAGE}`);

  let customers = [];

  if (!loading) customers = data.items;

  async function getCustomers(page, query) {
    try {
      setLoading(true);
      const { data } = await privateAxios({
        url: `/moderator/getCustomers?page=${page}&size=${ITEMS_PER_PAGE}&query=${query || ''}`,
      });
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

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
            onChange={(e) => {
              setSearch(e.target.value);
              getCustomers(1, e.target.value);
            }}
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
          ) : customers.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="4" className="px-6 py-4 text-gray-500">
                  No customers found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white">
              {customers.map((customer) => (
                <CustomerRow key={customer.id} customer={customer} />
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex scale-90 justify-center sm:scale-100 sm:justify-end">
        <Pagination
          getPage={(page) => getCustomers(page)}
          currentPage={data.currentPage}
          totalPages={data.pages}
          className={`gap-1 ${data.pages === 1 || loading ? 'hidden' : ''}`}
        />
      </div>
    </>
  );
}

export default AllCustomersSection;
