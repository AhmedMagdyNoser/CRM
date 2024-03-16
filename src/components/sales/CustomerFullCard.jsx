import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../../utils/utils';
import CustomerPropertiesSkeleton from './CustomerPropertiesSkeleton';
import CustomerProperties from './CustomerProperties';
import { useRef, useState } from 'react';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import useHover from '../../hooks/useHover';

function CustomerFullCard({ customer, loading }) {
  const [showEdit, setShowEdit] = useState(false);
  const element = useRef(null);

  useHover(
    element,
    () => setShowEdit(true),
    () => setShowEdit(false),
  );
  
  return (
    <div ref={element} className="flex w-full flex-col items-center overflow-hidden border lg:w-[450px]">
      <div className="relative mb-14 h-32 w-full rounded-none bg-pro-50">
        <div className="flex-center absolute left-1/2 top-full -mt-[50px] h-[100px] w-[100px] -translate-x-1/2 rounded-full border-4 border-white bg-pro-100">
          <FontAwesomeIcon icon={icons.user} className="text-3xl text-pro-300" />
        </div>
        {showEdit && (
          <button className="btn-secondary flex-center absolute right-2 top-2 animate-fade-in-medium gap-1 px-4 py-2 text-sm font-semibold">
            <FontAwesomeIcon icon={faEdit} />
            <span>Edit</span>
          </button>
        )}
      </div>
      <h1 className="text-2xl">Customer Details</h1>
      <div className="flex w-full flex-col gap-3 px-5 py-5 sm:px-10">
        {loading ? <CustomerPropertiesSkeleton /> : <CustomerProperties customer={customer} />}
      </div>
    </div>
  );
}

export default CustomerFullCard;
