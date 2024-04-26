import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../../../../components/ui/Modal';
import icons from '../../../../../utils/faIcons';

export default function ChangeRoleModal({ user, setChangeRoleModaleOpen }) {
  return (
    <Modal title="Change User Role" setOpen={setChangeRoleModaleOpen}>
      <div className="flex flex-col gap-4 p-5">
        <p className="text-sm">
          {user.firstName} is now a{' '}
          <span className="font-bold">
            {user.roles.length === 3
              ? 'Manager'
              : user.roles.length === 2
                ? 'Marketing Moderator'
                : user.roles.length === 1
                  ? 'Sales Representative'
                  : 'No Role'}
          </span>
          . You can change their role by selecting one of the following options.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <RoleButton name="Manager" icon={icons.manager} isSelected={user.roles.length === 3} onClick={() => {}} />
          <RoleButton
            name="Marketing Moderator"
            icon={icons.moderator}
            isSelected={user.roles.length === 2}
            onClick={() => {}}
          />
          <RoleButton
            name="Sales Representative"
            icon={icons.sales}
            isSelected={user.roles.length === 1}
            onClick={() => {}}
          />
          <RoleButton name="Revoke Role" icon={icons.xCircle} isSelected={user.roles.length === 0} onClick={() => {}} />
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
