import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRoleName, permissions } from '../../utils';
import Modal from '../../../../../components/ui/Modal';
import icons from '../../../../../utils/faIcons';
import { useState } from 'react';
import { breakboints } from '../../../../../utils/utils';
import Alert from '../../../../../components/ui/Alert';

export default function ChangeRoleModal({ user, setChangeRoleModaleOpen }) {
  const [roles, setRoles] = useState(user.roles.length);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <Modal title="Change User Role" setOpen={setChangeRoleModaleOpen} className="modal-height">
      <div className="flex flex-col gap-4 p-5">
        <p className="text-sm">
          {user.firstName} is now a <b>{getRoleName(user.roles.length)}</b>. You can change their role by selecting one of
          the following options.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <RoleButton
            name="Manager"
            icon={icons.manager}
            isSelected={roles === 3}
            onClick={() => {
              setRoles(3);
            }}
          />
          <RoleButton
            name="Marketing Moderator"
            icon={icons.moderator}
            isSelected={roles === 2}
            onClick={() => {
              setRoles(2);
            }}
          />
          <RoleButton
            name="Sales Representative"
            icon={icons.sales}
            isSelected={roles === 1}
            onClick={() => {
              setRoles(1);
            }}
          />
          <RoleButton
            name="Revoke Role"
            icon={icons.xCircle}
            isSelected={roles === 0}
            onClick={() => {
              setRoles(0);
            }}
          />
        </div>
        <div className="h-[185px] rounded-xl bg-gray-50 p-4 text-gray-500">
          <span className="mb-2 block font-semibold">{getRoleName(roles)} Permissions</span>
          <ul className="list-disc pl-5">
            {permissions[roles === 3 ? 'manager' : roles === 2 ? 'moderator' : roles === 1 ? 'sales' : 'noRoles'].map(
              (state) => (
                <li>{state}</li>
              ),
            )}
          </ul>
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <div className="min-w-56 flex-1">
            {success && <Alert.Success message="Role changed successfully." />}
            {error && <Alert.Error message={error} />}
          </div>
          <div className="flex justify-end">
            <button disabled={loading} className="btn-primary flex-center gap-1 rounded-xl px-4 py-3 text-sm">
              {loading ? (
                <>
                  <FontAwesomeIcon icon={icons.spinner} spin className="mr-1" />
                  <span>Changing</span>
                </>
              ) : (
                'Change'
              )}
              <span>Role</span>
            </button>
          </div>
        </div>
      </div>
      <style>
        {`
          @media (min-width: ${breakboints.sm}) {
            .modal-height {
              height: auto !important;
            }
          }
        `}
      </style>
    </Modal>
  );
}

function RoleButton({ name, icon, isSelected, onClick }) {
  return (
    <button
      className={`flex-center h-28 flex-col gap-3 rounded-xl p-2 text-xs font-semibold sm:text-sm ${
        isSelected ? 'bg-pro-300 text-white' : 'bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className="text-xl" />
      {name}
    </button>
  );
}
