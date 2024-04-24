import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useHover from '../../../../../hooks/useHover';
import icons from '../../../../../utils/faIcons';
import useAuth from '../../../../../hooks/useAuth';
import { roles } from '../../../../../utils/utils';

export default function InterestCard({ interest }) {
  const { auth } = useAuth();

  const [showEdit, setShowEdit] = useState(false);
  const element = useRef(null);

  useHover(
    element,
    () => setShowEdit(true),
    () => setShowEdit(false),
  );

  return (
    <div
      ref={element}
      className={`flex h-[75px] animate-fade-in-fast items-center justify-between rounded-xl bg-white text-lg font-bold -tracking-wider shadow-sm ${interest.isDisabled ? 'text-gray-500' : 'text-gray-800'}`}
    >
      <div className="flex w-full items-center justify-between p-3">
        <span className="px-3">{interest.name}</span>
        {auth.roles.includes(roles.manager) && showEdit && (
          <div className="flex animate-fade-in-fast gap-2 px-1">
            <button className="btn-danger flex-center h-10 w-10 rounded-xl">
              <FontAwesomeIcon icon={icons.trash} />
            </button>
            <button className="btn-secondary flex-center h-10 w-10 rounded-xl">
              <FontAwesomeIcon icon={icons.edit} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
