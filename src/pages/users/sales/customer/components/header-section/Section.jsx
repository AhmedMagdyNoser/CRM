import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from '../../../../../../hooks/useAuth';
import { roles } from '../../../../../../utils/utils';
import DeleteCustomerPopup from './DeleteCustomerPopup';
import icons from '../../../../../../utils/faIcons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

function CustomerHeaderSection({ editingMode, setEditingMode, deletePopupOpen, setDeletePopupOpen }) {
  const { auth } = useAuth();

  return (
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
            className={`flex-center animate-fade-in-medium gap-1 rounded-xl px-4 py-2 text-sm font-semibold sm:text-base ${editingMode ? 'btn-secondary' : 'btn-primary '}`}
          >
            <FontAwesomeIcon icon={faEdit} />
            {editingMode ? 'Cancel Editing' : 'Edit'}
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomerHeaderSection;
