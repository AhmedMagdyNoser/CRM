import Card from './Card';

export default function UserSection({ users }) {
  return (
    <div className="flex flex-col gap-3">
      {users.map((user) => (
        <Card key={user.id} user={user} />
      ))}
    </div>
  );
}
