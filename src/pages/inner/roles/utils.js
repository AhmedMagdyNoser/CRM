export function getUsersStats(users) {
  const stats = {
    managers: 0,
    marketingModerators: 0,
    salesRepresentatives: 0,
    noRoles: 0,
    unconfirmed: 0,
  };

  users.forEach((user) => {
    if (!user.emailConfirmed) stats.unconfirmed++;
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
  });

  return stats;
}

export function getRoleName(user) {
  const numRoles = user.roles ? user.roles.length : 0;
  switch (numRoles) {
    case 3:
      return 'Manager';
    case 2:
      return 'Marketing Moderator';
    case 1:
      return 'Sales Representative';
    default:
      return 'No Role';
  }
}
