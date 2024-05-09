import { Link } from 'react-router-dom';
import { paths, roles } from '../../../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useOnLoadFetch from '../../../../hooks/useOnLoadFetch';
import EmployeeCard from './components/UserCard';
import icons from '../../../../utils/faIcons';



export default function EmployeesStats() {
  const { data, loading, error } = useOnLoadFetch('manager/get-all-users');

  const employees = data.filter((user) => user.roles.length > 0 && !user.roles.includes(roles.manager));

  return (
    <div className="flex h-full flex-col gap-5">
      <h1>Employees Stats</h1>
      <Link
        to={`/${paths.dashboard}`}
        className="w-fit rounded-xl bg-gray-100 px-4 py-3 text-xs text-gray-500 transition-colors hover:bg-gray-200 sm:text-sm"
      >
        <FontAwesomeIcon icon={icons.back} className="mr-2" />
        Back to Dashboard
      </Link>
      {loading ? (
        <div className="flex-center h-full flex-col gap-4 rounded-xl bg-gray-100 text-gray-500">
          <FontAwesomeIcon icon={icons.spinner} className="animate-spin-slow text-3xl" />
          <span>Loading Employees</span>
        </div>
      ) : error ? (
        <div className="flex-center h-full flex-col gap-4 rounded-xl bg-gray-100 text-gray-500">
          <FontAwesomeIcon icon={icons.exclamationCircle} className="text-3xl" />
          <span>Error Loading Employees</span>
        </div>
      ) : employees.length === 0 ? (
        <div className="flex-center h-full flex-col gap-4 rounded-xl bg-gray-100 text-gray-500">
          <FontAwesomeIcon icon={icons.exclamationCircle} className="text-3xl" />
          <span>No Employees Found</span>
        </div>
      ) : (
        <div className="grid-col-1 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4">
          {employees.map((user) => (
            <EmployeeCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
