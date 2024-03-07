import { Outlet } from 'react-router-dom';
import Navbar from '../../components/global/Navbar';
import useAuth from '../../hooks/useAuth';

function Layout() {
  const { auth } = useAuth();
  return (
    <div className="flex text-pro-300">
      {auth.accessToken && <Navbar />}
      <div className={'min-h-screen w-full ' + (auth.accessToken ? 'pb-20 sm:pb-0' : '')}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
