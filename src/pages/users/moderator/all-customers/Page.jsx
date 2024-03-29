import { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import usePrivateAxios from '../../../../hooks/usePrivateAxios';
import { roles } from '../../../../utils/utils';
import AllCustomersHeaderSection from './components/header-section/Section';
import LastWeekCustomersSection from './components/last-week-customers-section/Section';
import AllCustomersSection from './components/all-customers-section/Section';

function AllCustomers() {
  useDocumentTitle('All Customers');
  const { auth } = useAuth();
  const privateAxios = usePrivateAxios();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let controller = new AbortController();
    let canceled = false;

    if (auth.roles.includes(roles.moderator)) {
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
    }

    return () => {
      canceled = true;
      controller.abort();
    };
  }, [privateAxios, auth.roles]);

  return (
    auth.roles.includes(roles.moderator) && (
      <section className="flex flex-col gap-3">
        <AllCustomersHeaderSection />
        <LastWeekCustomersSection customers={customers} loading={loading} />
        <AllCustomersSection customers={customers} loading={loading} />
      </section>
    )
  );
}

export default AllCustomers;
