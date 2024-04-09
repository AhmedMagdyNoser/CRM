import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import DetailsSection from './components/details-section/Section';
import ActionsSection from './components/actions-section/Section';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { roles } from '../../../../utils/utils';
import useAuth from '../../../../hooks/useAuth';
import DeleteCustomerPopup from './components/DeleteCustomerPopup';
import icons from '../../../../utils/faIcons';

function Customer() {
  useDocumentTitle('Customer Details');

  const { auth } = useAuth();

  const [editingMode, setEditingMode] = useState(false);

  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1>Customer Details</h1>
        {auth.roles.includes(roles.moderator) && (
          <div className="flex gap-2">
            {editingMode && (
              <>
                <button
                  className="btn-danger flex-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold sm:text-base"
                  onClick={() => setDeletePopupOpen(true)}
                >
                  <FontAwesomeIcon icon={icons.trash} />
                  Delete Customer
                </button>
                {deletePopupOpen && <DeleteCustomerPopup setDeletePopupOpen={setDeletePopupOpen} />}
              </>
            )}
            <button
              onClick={() => setEditingMode(!editingMode)}
              className={`btn-primary flex-center animate-fade-in-medium gap-1 rounded-xl px-4 py-2 text-sm font-semibold sm:text-base`}
            >
              <FontAwesomeIcon icon={faEdit} />
              {editingMode ? 'Cancel Editing' : 'Edit'}
            </button>
          </div>
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
