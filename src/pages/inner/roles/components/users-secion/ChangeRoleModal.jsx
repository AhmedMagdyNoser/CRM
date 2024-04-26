import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRoleName } from '../../utils';
import Modal from '../../../../../components/ui/Modal';
import icons from '../../../../../utils/faIcons';
import { useState } from 'react';

export default function ChangeRoleModal({ user, setChangeRoleModaleOpen }) {
  const [roles, setRoles] = useState(user.roles.length);

  return (
    <Modal title="Change User Role" setOpen={setChangeRoleModaleOpen}>
      <div className="flex flex-col gap-4 p-5">
        <p className="text-sm">
          {user.firstName} is now a <b>{getRoleName(user)}</b>. You can change their role by selecting one of the following
          options.
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
      </div>
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
