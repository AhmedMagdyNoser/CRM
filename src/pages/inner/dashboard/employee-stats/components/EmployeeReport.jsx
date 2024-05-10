import InterestsStats from '../../../assigned-customers/InterestsStats';
import SourcesStats from '../../components/SourcesStats';

// IMPORTANT NOTES
// I have displayed the doneDeals and sources data in section element blow. Don't remove it.
// Your task is to display the employee other data like name, bestDeal, etc.

export default function EmployeeReport({ employee }) {
  console.log(employee); // See the data in console, then remove this line
  
  return (
    <div>
      {/* Display employee data here*/}

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <InterestsStats data={employee.doneDeals} />
        </div>
        <div className="xl:col-span-2">
          <SourcesStats data={employee.sources} />
        </div>
      </section>

      {/* Or display it data here, or both*/}
    </div>
  );
}
