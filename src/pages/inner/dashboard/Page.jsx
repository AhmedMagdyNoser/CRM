import useDocumentTitle from '../../../hooks/useDocumentTitle';
import DailyReport from './components/DailyReport';
import GeneralSection from './components/GeneralSection';

function Dashboard() {
  useDocumentTitle('Manager Dashboard');

  return (
    <div className="flex flex-col gap-5">
      <h1>Manager Dashboard</h1>
      <p>Under construction...</p>

      <GeneralSection />
      <DailyReport />
    </div>
  );
}

export default Dashboard;
