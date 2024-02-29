import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Authentication({ requireUnauthenticated }) {
  const { auth } = useAuth();
  const location = useLocation();

  console.log('Rendering Authentication', { authenticated: Boolean(auth.accessToken) });

  if (requireUnauthenticated) {
    return !auth.accessToken ? <Outlet /> : <Navigate to={location.state?.from || '/'} replace={true} />;
  }

  return auth.accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location.pathname }} replace={true} />;
}

export default Authentication;
