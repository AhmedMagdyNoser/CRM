import { faCalendarAlt, faCommentDots, faEdit, faHandshake, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import useHover from '../../../../../../hooks/useHover';

function getActionIcon(type) {
  const iconClasses = `flex-center h-10 w-10 rounded-full`;
  switch (type) {
    case 'call':
      return (
        <div className={`${iconClasses} bg-blue-50 text-blue-300`}>
          <FontAwesomeIcon icon={faPhone} />
        </div>
      );
    case 'message':
      return (
        <div className={`${iconClasses} bg-red-50 text-red-300`}>
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
      );
    case 'meeting':
      return (
        <div className={`${iconClasses} bg-indigo-50 text-indigo-300`}>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </div>
      );
    case 'deal':
      return (
        <div className={`${iconClasses} bg-green-50 text-green-300`}>
          <FontAwesomeIcon icon={faHandshake} />
        </div>
      );
    default:
      return <div className={`${iconClasses} bg-gray-50 text-gray-300`}></div>;
  }
}

// Task: This component needs to be refactored
// - To read all data according to the action type
// - To allow editing of the action
// - To allow deleting of the action

function Action({ action: { type, date, summary } }) {
  const [showEdit, setShowEdit] = useState(false);
  const element = useRef(null);

  useHover(
    element,
    () => setShowEdit(true),
    () => setShowEdit(false),
  );

  return (
    <div ref={element} className="mb-10 flex gap-4">
      <div className="relative">
        {getActionIcon(type)}
        <div className="absolute left-1/2 h-full w-0 -translate-x-1/2 transform border border-dashed"></div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base">
              {type === 'call' ? 'Call' : type === 'message' ? 'Message' : type === 'meeting' ? 'Meeting' : 'Deal'}
            </h3>
            <p className="text-xs sm:text-sm">{new Date(date).toDateString()}</p>
          </div>
          <div>
            {false && // Remove this
              showEdit && (
                <button className="btn-light flex-center animate-fade-in-medium gap-2 rounded-xl px-4 py-2 text-sm">
                  <FontAwesomeIcon icon={faEdit} />
                  <span>Edit</span>
                </button>
              )}
          </div>
        </div>
        <p className="mt-4 rounded-xl bg-gray-50 p-3 px-4">{summary}</p>
      </div>
    </div>
  );
}

export default Action;
