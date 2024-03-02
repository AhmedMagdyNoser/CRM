import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="text-pro-300">
      <Outlet />
    </div>
  );
}

export default Layout;
