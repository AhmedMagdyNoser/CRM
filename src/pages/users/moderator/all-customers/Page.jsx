import { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import usePrivateAxios from '../../../../hooks/usePrivateAxios';
import { roles } from '../../../../utils/utils';
import AllCustomersHeaderSection from './components/header-section/Section';
import LastWeekCustomersSection from './components/last-week-customers-section/Section';
import AllCustomersSection from './components/all-customers-section/Section';
import useOnLoadFetch from '../../../../hooks/useOnLoadFetch';

function AllCustomers() {
  useDocumentTitle('All Customers');

  const { auth } = useAuth();

  const { data: customers, loading } = useOnLoadFetch(`/moderator/get-all-customers`);

  return (
    <section className="flex flex-col gap-3">
      <AllCustomersHeaderSection />
      <LastWeekCustomersSection customers={customers} loading={loading} />
      <AllCustomersSection customers={customers} loading={loading} />
    </section>
  );
}

export default AllCustomers;
