import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { roles } from '../../../../../utils/utils';
import usePrivateAxios from '../../../../../hooks/usePrivateAxios';
import icons from '../../../../../utils/faIcons';
import ChangeRoleModal from './ChangeRoleModal';
import { useState } from 'react';
import { getRoleName } from '../../utils';

export default function Card({ user }) {
  const privateAxios = usePrivateAxios();
  const [changeRoleModaleOpen, setChangeRoleModaleOpen] = useState(false);

  function updateRole(roles) {
    try {
      privateAxios({
        method: 'PUT',
        url: '/manager/update-user-roles',
        data: { id: user.id, roles: roles },
      });
    } catch (error) {
      console.error(error);
    }
  }

  function makeManager() {
    updateRole([
      { name: roles.manager, isSelected: true },
      { name: roles.moderator, isSelected: true },
      { name: roles.sales, isSelected: true },
    ]);
  }

  function makeModerator() {
    updateRole([
      { name: roles.manager, isSelected: false },
      { name: roles.moderator, isSelected: true },
      { name: roles.sales, isSelected: true },
    ]);
  }

  function makeSales() {
    updateRole([
      { name: roles.manager, isSelected: false },
      { name: roles.moderator, isSelected: false },
      { name: roles.sales, isSelected: true },
    ]);
  }

  function revokeRole() {
    updateRole([
      { name: roles.manager, isSelected: false },
      { name: roles.moderator, isSelected: false },
      { name: roles.sales, isSelected: false },
    ]);
  }

  return (
    <div className="flex flex-col items-center gap-8 rounded-xl bg-gray-100 px-4 py-10 shadow-sm">
      <div className="flex flex-col items-center gap-2">
        <div className="flex-center h-20 w-20 rounded-full bg-pro-100">
          <FontAwesomeIcon icon={icons.user} className="text-3xl" />
        </div>
        <p className="text-xl text-gray-800">
          {user.firstName} {user.lastName}
        </p>
        <p>{user.username}</p>
        <p>{user.email}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span
          className={`flex-center rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold ${user.emailConfirmed ? 'text-gray-500' : 'text-red-500'}`}
        >
          {!user.emailConfirmed ? 'Unconfirmed Account' : getRoleName(user)}
        </span>
        <button onClick={() => setChangeRoleModaleOpen(true)} className="btn-primary rounded-full px-5 py-3">
          Change Role
        </button>
      </div>

      <div className="hidden flex-wrap gap-2">
        <button className="btn-primary px-4 py-2" onClick={makeManager}>
          Make a Manger
        </button>
        <button className="btn-primary px-4 py-2" onClick={makeModerator}>
          Make a Moderator
        </button>
        <button className="btn-primary px-4 py-2" onClick={makeSales}>
          Make a Sales
        </button>
        <button className="btn-primary px-4 py-2" onClick={revokeRole}>
          Revoke Role
        </button>
      </div>
      {changeRoleModaleOpen && (
        <ChangeRoleModal user={user} setChangeRoleModaleOpen={() => setChangeRoleModaleOpen(false)} />
      )}
    </div>
  );
}
