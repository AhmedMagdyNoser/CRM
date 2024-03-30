import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import useOnLoadFetch from '../../../../hooks/useOnLoadFetch';
import DetailsSection from './components/details-section/Section';
import ActionsSection from './components/actions-section/Section';
import ErrorAlert from '../../../../components/ui/ErrorAlert';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { roles } from '../../../../utils/utils';
import useAuth from '../../../../hooks/useAuth';

function Customer() {
  useDocumentTitle('Customer Details');

  // const params = useParams();

  const { auth } = useAuth();
  const [editingMode, setEditingMode] = useState(false);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1>Customer Details</h1>
        {auth.roles.includes(roles.moderator) && (
          <button
            onClick={() => setEditingMode(!editingMode)}
            className={`btn-primary flex-center animate-fade-in-medium gap-1 rounded-xl px-4 py-2 text-sm font-semibold sm:text-base`}
          >
            <FontAwesomeIcon icon={faEdit} />
            {editingMode ? 'Cancel Editing' : 'Edit'}
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <DetailsSection editingMode={editingMode} setEditingMode={setEditingMode} />
        <ActionsSection />
      </div>
    </div>
  );
}

export default Customer;
