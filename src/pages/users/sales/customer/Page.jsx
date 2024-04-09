import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import DetailsSection from './components/details-section/Section';
import ActionsSection from './components/actions-section/Section';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { globalErrorMessage, paths, roles } from '../../../../utils/utils';
import useAuth from '../../../../hooks/useAuth';
import usePrivateAxios from '../../../../hooks/usePrivateAxios';
import { useNavigate, useParams } from 'react-router-dom';
import icons from '../../../../utils/faIcons';

function Customer() {
  useDocumentTitle('Customer Details');

  const privateAxios = usePrivateAxios();
  const params = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [editingMode, setEditingMode] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  async function handleDelete() {
    try {
      setDeleting(true);
      await privateAxios({ url: `/moderator/delete-customer/${params.id}`, method: 'Delete' });
      navigate(`/${paths.customers}`);
    } catch (error) {
      setDeleting(false);
      setDeleteError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1>Customer Details</h1>
        {auth.roles.includes(roles.moderator) && (
          <div className="flex gap-2">
            {editingMode && (
              <button
                className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-100 sm:text-base"
                onClick={handleDelete}
              >
                <FontAwesomeIcon icon={faTrashCan} className="mr-2" />
                Delete Customer
              </button>
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
