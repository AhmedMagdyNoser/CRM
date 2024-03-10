import { Outlet } from 'react-router-dom';
import Navbar from '../../components/global/Navbar';
import useAuth from '../../hooks/useAuth';
import OnlineStatueAlert from '../../components/global/OnlineStatusAlert';

function Layout() {
  const { auth } = useAuth();

  return (
    <div className="flex text-pro-300">
      {auth.accessToken && <Navbar dimentions="h-20 w-full px-4 sm:h-screen sm:w-20 sm:px-0 sm:py-4" />}
      <div className={'relative min-h-screen w-full ' + (auth.accessToken ? 'p-6 pb-28 sm:p-8 sm:pl-28' : '')}>
        <Outlet />
        <OnlineStatueAlert />
      </div>
    </div>
  );
}

export default Layout;
