import { Outlet } from 'react-router-dom';
import Navbar from '../../components/global/Navbar';
import useAuth from '../../hooks/useAuth';
import { navBarDimension } from '../../utils/utils';

function Layout() {
  const { auth } = useAuth();
  return (
    <div className="flex text-pro-300">
      {auth.accessToken && <Navbar />}
      <div
        className={'min-h-screen w-full bg-progray-50 ' + (auth.accessToken ? 'pb-[' + navBarDimension + '] sm:pb-0' : '')}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
