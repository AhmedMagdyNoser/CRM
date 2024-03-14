import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react';
import InterestBadge from '../global/InterestBadge';

function LastWeekCustomersSection({ customers, loading }) {
  return (
    <section className="flex flex-col gap-2 bg-pro-50 p-4">
      <p>New customers this week</p>
      {loading ? (
        <div className="scrollbar-hide flex gap-3 overflow-x-auto rounded-none py-1">
          <CustomersSkeleton />
        </div>
      ) : customers.length === 0 ? (
        <p className="text-progray-300">No new customers this week</p>
      ) : (
        <div className="scrollbar-hide flex gap-3 overflow-x-auto rounded-none py-1">
          {customers.map((customer) => (
            <CustomerCard key={customer.customerId} customer={customer} />
          ))}
        </div>
      )}
    </section>
  );
}

export default LastWeekCustomersSection;

function CustomersSkeleton({ length = 3 }) {
  const customerCardSkeleton = (
    <div className="flex max-w-[300px] flex-1 animate-pulse items-center gap-3 bg-white p-4 pb-12 shadow">
      <div className="flex-center h-10 w-10 rounded-full bg-pro-100"></div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-4 w-full bg-pro-100"></div>
        <div className="h-3 w-20 bg-pro-100"></div>
      </div>
    </div>
  );

  return Array.from({ length }).map((_, index) => <Fragment key={index}>{customerCardSkeleton}</Fragment>);
}

function CustomerCard({ customer }) {
  return (
    <div className="flex min-w-[300px] flex-col gap-6 bg-white p-4 shadow">
      <div className="flex items-center gap-3">
        <div className="flex-center h-10 w-10 rounded-full bg-pro-100">
          <FontAwesomeIcon icon={faUser} className="text-pro-200" />
        </div>
        <div>
          <h3>{customer.firstName + ' ' + customer.lastName}</h3>
          <p>{customer.phone}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {customer.userInterests.map((interest) => (
          <InterestBadge key={interest.name} interest={interest.name} />
        ))}
      </div>
    </div>
  );
}
