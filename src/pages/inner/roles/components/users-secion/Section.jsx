import Card from './Card';

export default function UserSection({ users }) {
  return (
    <div className="grid-col-1 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4">
      {users.map((user) => (
        <Card key={user.id} user={user} />
      ))}
    </div>
  );
}
