import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react';
import InterestBadge from '../global/InterestBadge';
import { Link } from 'react-router-dom';

// Task: This component needs to be refactored with the new data structure and new endpoint

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
    <div className="flex h-[135px] min-w-[300px] animate-pulse gap-3 bg-white p-5 shadow">
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
    <Link
      to={`/customer/${customer.customerId}`}
      className="flex h-[135px] min-w-[300px] flex-col justify-between bg-white p-4 shadow hover:bg-gray-50"
    >
      <div className="flex items-center gap-3">
        <div className="flex-center h-10 w-10 rounded-full bg-pro-100">
          <FontAwesomeIcon icon={faUser} className="text-pro-200" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg">{customer.firstName + ' ' + customer.lastName}</h3>
          <p className="text-sm">{customer.phone}</p>
        </div>
      </div>
      <div className="scrollbar-hide flex gap-2 overflow-auto py-1">
        {customer.userInterests.map((interest) => (
          <InterestBadge key={interest.name} interest={interest.name} />
        ))}
      </div>
    </Link>
  );
}
