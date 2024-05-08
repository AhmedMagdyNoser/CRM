import { useState } from 'react';
import { periodOptions } from '../../../utils/utils';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import DashboardHeaderSection from './components/header-section/Section';
import GlobalStatistics from './components/GlobalStatistics';
import SalesStats from './components/SalesStats';
import Loading from './components/status/Loading';

function Dashboard() {
  useDocumentTitle('Manager Dashboard');

  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);

  return (
    <div className="flex h-full flex-col gap-5">
      <DashboardHeaderSection selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />

      <p>Under construction...</p>

      <GlobalStatistics period={selectedPeriod} />
      <SalesStats period={selectedPeriod} />
    </div>
  );
}

export default Dashboard;
