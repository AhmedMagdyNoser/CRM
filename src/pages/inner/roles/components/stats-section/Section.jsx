import StatsCard from './StatsCard';

export default function StatsSection({ users, loading, error }) {
  let stats;

  if (users) stats = getUsersStats(users);

  return (
    !error && (
      <section className="flex flex-col gap-2 rounded-xl bg-gray-100 p-4">
        <p>Users Statistics</p>
        <div className="scrollbar-hide flex gap-3 overflow-x-auto py-1">
          <StatsCard title="Managers" value={stats.managers} loading={loading} />
          <StatsCard title="Marketing Moderators" value={stats.marketingModerators} loading={loading} />
          <StatsCard title="Sales Representatives" value={stats.salesRepresentatives} loading={loading} />
          <StatsCard title="Users Without Roles" value={stats.noRoles} loading={loading} />
          <StatsCard title="Unconfirmed Accounts" value={stats.unconfirmed} loading={loading} />
        </div>
      </section>
    )
  );
}

function getUsersStats(users) {
  const stats = {
    managers: 0,
    marketingModerators: 0,
    salesRepresentatives: 0,
    noRoles: 0,
    unconfirmed: 0,
  };

  users.forEach((user) => {
    if (!user.emailConfirmed) {
      stats.unconfirmed++;
    } else {
      const numRoles = user.roles ? user.roles.length : 0;
      switch (numRoles) {
        case 3:
          stats.managers++;
          break;
        case 2:
          stats.marketingModerators++;
          break;
        case 1:
          stats.salesRepresentatives++;
          break;
        default:
          stats.noRoles++;
      }
    }
  });

  return stats;
}
