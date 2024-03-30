import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import AllCustomersHeaderSection from './components/header-section/Section';
import LastWeekCustomersSection from './components/last-week-customers-section/Section';
import AllCustomersSection from './components/all-customers-section/Section';

function AllCustomers() {
  useDocumentTitle('All Customers');

  return (
    <section className="flex flex-col gap-3">
      <AllCustomersHeaderSection />
      <LastWeekCustomersSection />
      <AllCustomersSection />
    </section>
  );
}

export default AllCustomers;
