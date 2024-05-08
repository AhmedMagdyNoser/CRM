import { useState } from 'react';
import { periodOptions } from '../../../utils/utils';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import DashboardHeaderSection from './components/header-section/Section';
import GlobalStatistics from './components/GlobalStatistics';
import DailyReport from './components/DailyReport';

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

      <GlobalStatistics period={selectedPeriod} />
      <DailyReport />
    </div>
  );
}

export default Dashboard;
