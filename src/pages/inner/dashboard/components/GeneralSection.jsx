import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useOnLoadFetch from '../../../../hooks/useOnLoadFetch';
import icons from '../../../../utils/faIcons';

export default function GeneralSection() {
  let { data, loading, error } = useOnLoadFetch('reports/global-statistics');

  return loading ? (
    <div className={`flex-center flex-col gap-3 rounded-xl bg-gray-100 py-10 text-gray-500 shadow sm:rounded-3xl sm:p-12`}>
      <FontAwesomeIcon icon={icons.spinner} spin />
      <span className="text-center">Loading Statistics..</span>
    </div>
  ) : error ? (
    <div className={`flex-center flex-col gap-3 rounded-xl bg-red-100 py-10 text-red-500 shadow sm:rounded-3xl sm:p-12`}>
      <FontAwesomeIcon icon={icons.exclamationCircle} />
      <span className="text-center">Failed to load statistics</span>
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
      <StatSquare
        title="Customers"
        total={data.customers.total}
        thisWeek={data.customers.thisWeek}
        gradient="from-violet-200 to-pink-200"
      />
      <StatSquare
        title="Actions"
        total={data.actions.total}
        thisWeek={data.actions.thisWeek}
        gradient="from-green-200 to-lime-200"
      />
      <StatSquare
        title="Deals"
        total={data.deals.total}
        thisWeek={data.deals.thisWeek}
        gradient="from-yellow-200 to-red-200"
      />
      <StatSquare
        title="Revenue"
        total={`$${formatPrice(data.revenue.total)}`}
        thisWeek={`${formatPrice(data.revenue.thisWeek)}`}
        gradient="from-blue-200 to-green-200"
      />
    </div>
  );
}

function StatSquare({ title, total, thisWeek, gradient }) {
  return (
    <div
      className={`animate-fade-in-fast rounded-xl bg-gradient-to-r sm:rounded-3xl ${gradient} p-4 text-gray-800 shadow sm:p-6`}
    >
      <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{title}</h3>
      <div className="mt-8 flex flex-col flex-wrap gap-2 md:flex-row md:items-end">
        <span className="text-xl font-semibold sm:text-2xl lg:text-3xl">{total}</span>
        <span className="text-xs sm:text-sm">+{thisWeek} this week</span>
      </div>
    </div>
  );
}

function formatPrice(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
}
