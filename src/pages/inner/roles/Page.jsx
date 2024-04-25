import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useOnLoadFetch from '../../../hooks/useOnLoadFetch';
import UserSection from './components/users-secion/Section';

export default function Roles() {
  useDocumentTitle('Roles');

  const { data: users } = useOnLoadFetch('/manager/get-all-users');

  return (
    <div className="flex flex-col gap-4">
      <h1>Roles</h1>
      <UserSection users={users} />
    </div>
  );
}
