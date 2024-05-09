import { Link } from 'react-router-dom';
import { paths } from '../../../../utils/utils';

export default function EmployeesStats() {
  return (
    <div>
      <h1>Employees Stats</h1>
      <Link to={`/${paths.dashboard}`}>Back to Dashboard</Link>
    </div>
  );
}
