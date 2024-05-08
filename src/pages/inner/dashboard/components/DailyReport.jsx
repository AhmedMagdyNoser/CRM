import useOnLoadFetch from '../../../../hooks/useOnLoadFetch';
import Alert from '../../../../components/ui/Alert';

export default function DailyReport() { 
  // Fetch the data from the server
  const { data, loading, error } = useOnLoadFetch('/Reports/main-report');

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-[350px] px-5 py-10 ">
          <Alert.Error message="An error occurred while fetching data." />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-7 mt-7 text-2xl font-bold">Daily Report</h1>

      <table className="min-w-full divide-y divide-gray-200 ">
        <thead >
          <tr>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black">
              First Name
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black">
              Last Name
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider text-black">
              Customers
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider text-black">
              Messages
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider text-black">Deals</th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider text-black">
              Online Meetings
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider text-black">
              Offline Meetings
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider text-black">
              Completed Calls
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider text-black">
              Missed Calls
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider text-black">
              Cancelled Calls
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider text-black">
              Busy Calls
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider text-black">
              Failed Calls
            </th>{' '}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-2 py-7 text-sm font-medium text-gray-200 lg:py-4">
                    <div className="h-2 animate-pulse rounded-xl bg-gray-200"></div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-7 text-sm font-medium text-gray-200 lg:py-4">
                    <div className="h-2 animate-pulse rounded-xl bg-gray-200"></div>
                  </td>{' '}
                  <td className="whitespace-nowrap px-2 py-7 text-sm font-medium text-gray-200 lg:py-4">
                    <div className="h-2 animate-pulse rounded-xl bg-gray-200"></div>
                  </td>{' '}
                  <td className="whitespace-nowrap px-2 py-7 text-sm font-medium text-gray-200 lg:py-4">
                    <div className="h-2 animate-pulse rounded-xl bg-gray-200"></div>
                  </td>{' '}
                  <td className="whitespace-nowrap px-2 py-7 text-sm font-medium text-gray-200 lg:py-4">
                    <div className="h-2 animate-pulse rounded-xl bg-gray-200"></div>
                  </td>{' '}
                  <td className="whitespace-nowrap px-2 py-7 text-sm font-medium text-gray-200 lg:py-4">
                    <div className="h-2 animate-pulse  rounded-xl bg-gray-200"></div>
                  </td>{' '}
                  <td className="whitespace-nowrap px-2 py-7 text-sm font-medium text-gray-200 lg:py-4">
                    <div className="h-2 animate-pulse rounded-xl bg-gray-200"></div>
                  </td>{' '}
                  <td className="whitespace-nowrap px-2 py-7 text-sm font-medium text-gray-200 lg:py-4">
                    <div className="h-2 animate-pulse rounded-xl bg-gray-200"></div>
                  </td>{' '}
                  <td className="whitespace-nowrap px-2 py-7 text-sm font-medium text-gray-200 lg:py-4">
                    <div className="h-2 animate-pulse rounded-xl bg-gray-200"></div>
                  </td>{' '}
                  <td className="whitespace-nowrap px-2 py-7 text-sm font-medium text-gray-200 lg:py-4">
                    <div className="h-2 animate-pulse rounded-xl bg-gray-200"></div>
                  </td>{' '}
                  <td className="whitespace-nowrap px-2 py-7 text-sm font-medium text-gray-200 lg:py-4">
                    <div className="h-2 animate-pulse rounded-xl bg-gray-200"></div>
                  </td>{' '}
                  <td className="whitespace-nowrap px-2 py-7 text-sm font-medium text-gray-200 lg:py-4">
                    <div className="h-2 animate-pulse rounded-xl bg-gray-200"></div>
                  </td>{' '}
                </tr>
              ))
            : data && data.salesReports && data.salesReports.items && data.salesReports.items.length > 0
              ? data.salesReports.items.map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-2 py-7 text-sm font-medium text-gray-900 lg:py-4">
                      {item.firstName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.lastName}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.customers}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.messages}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.deals}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.meetings.online}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.meetings.offline}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.calls.completed}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.calls.missed}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.calls.cancelled}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.calls.busy}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.calls.failed}</td>{' '}
                  </tr>
                ))
              : null}
        </tbody>
      </table>
    </div>
  );

}
