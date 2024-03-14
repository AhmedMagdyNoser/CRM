import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { roles } from '../../utils/utils';
import CustomersHeaderSection from '../../components/moderator/CustomersHeaderSection';
import LastWeekCustomersSection from '../../components/moderator/LastWeekCustomersSection';
import AllCustomersSection from '../../components/moderator/AllCustomersSection';

function Home() {
  const { auth } = useAuth();
  const privateAxios = usePrivateAxios();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Home Dashboard';
    return () => (document.title = 'Pro Sales');
  }, []);

  useEffect(() => {
    let controller = new AbortController();
    let canceled = false;

    (async function getAllCustomers() {
      try {
        const { data } = await privateAxios({ url: '/moderator/get-all-customers', signal: controller.signal });
        if (!canceled) setCustomers(data);
      } catch (error) {
        if (!canceled) console.dir(error);
      } finally {
        if (!canceled) setLoading(false);
      }
    })();

    return () => {
      canceled = true;
      controller.abort();
    };
  }, [privateAxios]);

  return (
    auth.roles.includes(roles.moderator) && (
      <section className="flex flex-col gap-3">
        <CustomersHeaderSection />
        <LastWeekCustomersSection customers={customers} loading={loading} />
        <AllCustomersSection customers={customers} loading={loading} />
      </section>
    )
  );
}

export default Home;
