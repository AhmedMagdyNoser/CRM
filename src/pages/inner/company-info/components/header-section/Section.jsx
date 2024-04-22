import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { roles } from '../../../../../utils/utils';
import useAuth from '../../../../../hooks/useAuth';
import icons from '../../../../../utils/faIcons';

export default function CompanyInfoHeaderSection({ editMode, setEditMode, loading }) {
  const { auth } = useAuth();

  return (
    <section className="flex justify-between">
      <h1>Company Info</h1>
      {auth.roles.includes(roles.manager) &&
        (editMode ? (
          <div className="flex gap-2">
            <button
              onClick={() => setEditMode(false)}
              className="btn-primary flex-center gap-2 rounded-xl p-3 px-5 text-xs sm:text-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={icons.spinner} spin />
                  <span>Updating</span>
                </>
              ) : (
                <span>Update</span>
              )}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="flex-center gap-2 rounded-xl bg-gray-100 p-3 px-5 text-xs transition-colors hover:bg-gray-200 sm:text-sm"
            >
              <span>Cancel</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="btn-primary flex-center gap-2 rounded-xl p-3 px-5 text-xs sm:text-sm"
          >
            <FontAwesomeIcon icon={icons.edit} />
            <span>Update Info</span>
          </button>
        ))}
    </section>
  );
}
