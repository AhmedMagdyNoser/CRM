import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import { paths } from '../../../../utils/utils';
import useOnLoadFetch from '../../../../hooks/useOnLoadFetch';
import icons from '../../../../utils/faIcons';

export default function EmployeeStats() {
  const id = useParams().id;

  const { data, loading, error } = useOnLoadFetch(`reports/sales-reprot/${id}`);

  return (
    <div className="flex h-full flex-col gap-5">
      <h1>Employee Report</h1>
      <Link
        to={`/${paths.dashboard}/${paths.employees}`}
        className="w-fit rounded-xl bg-gray-100 px-4 py-3 text-xs text-gray-500 transition-colors hover:bg-gray-200 sm:text-sm"
      >
        <FontAwesomeIcon icon={icons.back} className="mr-2" />
        Back to Employees
      </Link>
    </div>
  );
}
