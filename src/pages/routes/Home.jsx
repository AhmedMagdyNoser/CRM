import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { roles } from '../../utils/utils';

/**
 * This component is not an actual page, but a director to the homepage according to the user's role.
 * If the user is a manager, they are redirected to the dashboard.
 * If the user is a moderator, they are redirected to the all customers page.
 * If the user is a sales representative, they are redirected to the assigned customers page.
 * If the user does not have a recognized role, they are redirected to the locked page.
 */

function Home() {
  const { auth } = useAuth();
  return auth.roles.includes(roles.manager) ? (
    <Navigate to="/dashboard" replace={true} />
  ) : auth.roles.includes(roles.moderator) ? (
    <Navigate to="/all-customers" replace={true} />
  ) : auth.roles.includes(roles.sales) ? (
    <Navigate to="/assigned-customers" replace={true} />
  ) : (
    <Navigate to="/locked" replace={true} />
  );
}

export default Home;
