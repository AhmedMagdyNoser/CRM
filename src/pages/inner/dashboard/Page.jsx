import { useEffect, useState } from 'react';
import { periodOptions } from '../../../utils/utils';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import DashboardHeaderSection from './components/header-section/Section';
import GlobalStatistics from './components/GlobalStatistics';
import SalesStats from './components/SalesStats';
import Loading from './components/status/Loading';
import usePrivateAxios from '../../../hooks/usePrivateAxios';
import Error from './components/status/Error';

function Dashboard() {
  useDocumentTitle('Manager Dashboard');

  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);

  const privateAxios = usePrivateAxios();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let controller = new AbortController();
    let canceled = false;

    (async function fetchData() {
      try {
        setLoading(true);
        const results = {};
        await Promise.all([
          privateAxios({ url: '/reports/global-statistics', signal: controller.signal }).then(
            (response) => (results.globalStatistics = response.data),
          ),
          privateAxios({ url: `/reports/main-report?within=${selectedPeriod.value}`, signal: controller.signal }).then(
            (response) => (results.salesStats = response.data),
          ),
        ]);
        if (!canceled) setData(results);
      } catch (error) {
        if (!canceled) setError(true);
      } finally {
        if (!canceled) setLoading(false);
      }
    })();

    return () => {
      canceled = true;
      controller.abort();
    };
  }, [privateAxios, selectedPeriod.value]);

  return (
    <div className="flex h-full flex-col gap-5">
      <DashboardHeaderSection selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />

      <p>Under construction...</p>

      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <>
          <GlobalStatistics data={data.globalStatistics} period={selectedPeriod} />
          <SalesStats data={data.salesStats} />
        </>
      )}
    </div>
  );
}

export default Dashboard;
