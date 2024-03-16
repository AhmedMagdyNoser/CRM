import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../../utils/utils';
import CustomerPropertiesSkeleton from './CustomerPropertiesSkeleton';
import CustomerProperties from './CustomerProperties';

function CustomerFullCard({ customer, loading }) {
  return (
    <div className="flex min-h-full w-[450px] flex-col items-center overflow-hidden border shadow-md">
      <div className="relative mb-14 h-32 w-full rounded-none bg-pro-50">
        <div className="flex-center absolute left-1/2 top-full -mt-[50px] h-[100px] w-[100px] -translate-x-1/2 rounded-full border-4 border-white bg-pro-100">
          <FontAwesomeIcon icon={icons.user} className="text-3xl text-pro-300" />
        </div>
      </div>
      <h1 className="text-2xl">Customer Details</h1>
      {loading ? <CustomerPropertiesSkeleton /> : <CustomerProperties customer={customer} />}
    </div>
  );
}

export default CustomerFullCard;