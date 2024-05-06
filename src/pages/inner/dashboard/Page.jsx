import { useState } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import DashboardHeaderSection from './components/header-section/Section';
import GeneralSection from './components/GeneralSection';
import DailyReport from './components/DailyReport';

const periodOptions = [
  { value: '', label: 'Total' },
  { value: 'Daily', label: 'Today' },
  { value: 'Weekly', label: 'Last Week' },
  { value: 'Monthly', label: 'Last Month' },
];

function Dashboard() {
  useDocumentTitle('Manager Dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeaderSection
        periodOptions={periodOptions}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />

      <p>Under construction...</p>

      <GeneralSection />
      <DailyReport />
    </div>
  );
}

export default Dashboard;
