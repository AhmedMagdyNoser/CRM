import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../../../../../utils/faIcons';
import InterestsStats from '../../../components/InterestsStats';
import SourcesStats from '../../../components/SourcesStats';

export default function EmployeeReport({ employee }) {
  console.log(employee); // See the data in console, then remove this line

  return (
    <div className="flex flex-col gap-4">
      {/* Employee Name */}
      <div className="flex items-center gap-5 rounded-xl bg-pro-50 p-5">
        <div className="flex-center h-20 w-20 rounded-full border-2 border-white bg-white">
          <FontAwesomeIcon icon={icons.user} className="text-3xl" />
        </div>
        <div>
          <h1>
            {employee.firstName} {employee.lastName}
          </h1>
          <p className="mt-1">Assigned Customers: {employee.customers}</p>
        </div>
      </div>

      {/* Employee Charts */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <InterestsStats data={employee.doneDeals} />
        </div>
        <div className="xl:col-span-2">
          <SourcesStats data={employee.sources} />
        </div>
      </section>
    </div>
  );
}
