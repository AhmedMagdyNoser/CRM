import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { roles } from '../../../../../utils/utils';
import useHover from '../../../../../hooks/useHover';
import useAuth from '../../../../../hooks/useAuth';
import icons from '../../../../../utils/faIcons';
import EditMode from './EditMode';

export default function InterestCard({ interest }) {
  const { auth } = useAuth();

  const [editMode, setEditMode] = useState(false);
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
      <div className="flex w-full items-center justify-between gap-2 p-3">
        {editMode ? (
          <EditMode interest={interest} setEditMode={setEditMode} />
        ) : (
          <>
            <span className="px-3">{interest.name}</span>
            {auth.roles.includes(roles.manager) && showEdit && (
              <div className="flex animate-fade-in-fast gap-2 px-1">
                <button className="btn-danger flex-center h-10 w-10 rounded-xl">
                  <FontAwesomeIcon icon={icons.trash} />
                </button>
                <button onClick={() => setEditMode(true)} className="btn-secondary flex-center h-10 w-10 rounded-xl">
                  <FontAwesomeIcon icon={icons.edit} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
