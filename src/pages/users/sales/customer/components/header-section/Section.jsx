import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { roles } from '../../../../../../utils/utils';
import useAuth from '../../../../../../hooks/useAuth';
import icons from '../../../../../../utils/faIcons';
import DeleteCustomerPopup from './DeleteCustomerPopup';

function CustomerHeaderSection({ editingMode, setEditingMode, deletePopupOpen, setDeletePopupOpen, error }) {
  const { auth } = useAuth();

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h1>Customer Details</h1>
      {!error && auth.roles.includes(roles.moderator) && (
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
            <FontAwesomeIcon icon={icons.edit} />
            {editingMode ? 'Cancel Editing' : 'Edit'}
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomerHeaderSection;
