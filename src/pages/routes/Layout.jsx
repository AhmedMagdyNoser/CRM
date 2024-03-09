import { Outlet } from 'react-router-dom';
import Navbar from '../../components/global/Navbar';
import useAuth from '../../hooks/useAuth';

function Layout() {
  const { auth } = useAuth();
  return (
    <div className="flex text-pro-300">
      {auth.accessToken && <Navbar />}
      <div className={'min-h-screen w-full ' + (auth.accessToken ? 'p-6 pb-28 sm:p-8 sm:pl-28' : '')}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
