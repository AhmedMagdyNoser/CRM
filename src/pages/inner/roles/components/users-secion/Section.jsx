import { useState } from 'react';
import Card from './Card';
import Alert from '../../../../../components/ui/Alert';
import CardSkeleton from './CardSkeleton';

export default function UserSection({ users, loading, error }) {
  const [selectedRole, setSelectedRole] = useState('All Users');

  const roles = [
    'All Users',
    'Managers',
    'Marketing Moderators',
    'Sales Representatives',
    'Users Without Roles',
    'Unconfirmed Accounts',
  ];

  const filteredUsers =
    selectedRole === 'All Users'
      ? users
      : users.filter((user) =>
          selectedRole === 'Unconfirmed Accounts'
            ? !user.emailConfirmed
            : user.roles.length ===
              (selectedRole === 'Managers'
                ? 3
                : selectedRole === 'Marketing Moderators'
                  ? 2
                  : selectedRole === 'Sales Representatives'
                    ? 1
                    : 0),
        );

  return (
    <div className="flex flex-col gap-6">
      <div className="scrollbar-hide flex gap-2 overflow-x-auto py-1">
        {roles.map((role) => (
          <button
            key={role}
            className={`${role === selectedRole ? 'bg-pro-300 text-white' : 'bg-gray-100 text-gray-500'} text-nowrap rounded-full px-4 py-2 text-xs transition-colors sm:text-sm`}
            onClick={() => setSelectedRole(role)}
          >
            {role}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid-col-1 xxl:grid-cols-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton length={3} />
        </div>
      ) : error ? (
        <Alert.Error message={error} />
      ) : filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="grid-col-1 xxl:grid-cols-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <Card key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
