import CustomerCard from './CustomerCard';
import CustomersCardSkeleton from './CustomerCardSkeleton';
import { lastWeekCustomers } from '../../testingStaticData';
import { useEffect, useState } from 'react';

function LastWeekCustomersSection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex flex-col gap-2 bg-pro-50 p-4 rounded-xl">
      <p>New customers this week</p>
      {loading ? (
        <div className="scrollbar-hide flex gap-3 overflow-x-auto py-1">
          <CustomersCardSkeleton length={3} />
        </div>
      ) : lastWeekCustomers.length === 0 ? (
        <p className="text-gray-800">No new customers this week</p>
      ) : (
        <div className="scrollbar-hide flex gap-3 overflow-x-auto py-1">
          {lastWeekCustomers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>
      )}
    </section>
  );
}

export default LastWeekCustomersSection;
