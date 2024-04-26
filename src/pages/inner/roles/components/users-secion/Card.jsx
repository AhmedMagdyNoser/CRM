import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRoleName } from '../../utils';
import ChangeRoleModal from './ChangeRoleModal';
import icons from '../../../../../utils/faIcons';

export default function Card({ user }) {
  const [changeRoleModaleOpen, setChangeRoleModaleOpen] = useState(false);

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
          {!user.emailConfirmed ? 'Unconfirmed Account' : getRoleName(user.roles.length)}
        </span>
        <button onClick={() => setChangeRoleModaleOpen(true)} className="btn-primary rounded-full px-5 py-3">
          Change Role
        </button>
      </div>

      {changeRoleModaleOpen && (
        <ChangeRoleModal user={user} setChangeRoleModaleOpen={() => setChangeRoleModaleOpen(false)} />
      )}
    </div>
  );
}
