import useDocumentTitle from '../../../hooks/useDocumentTitle';
import DailyReport from './components/DailyReport';

function Dashboard() {
  useDocumentTitle('Manager Dashboard');

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <p className='my-3'>Under construction...</p>
      
      <DailyReport />
    </div>
  );
}

export default Dashboard;
