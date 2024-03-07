import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faRightFromBracket,
  faUserGroup,
  faBuilding,
  faChartSimple,
  faUserCircle,
  faAngleRight,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const navDimentionsClasses = ` h-20 w-full px-4 sm:h-auto sm:w-20 sm:px-0 sm:py-4`;

  return (
    <aside
      className={
        `fixed bottom-0 left-0 flex items-center justify-between gap-3 overflow-auto border-t bg-pro-50 sm:relative sm:flex-col sm:overflow-visible sm:border-r sm:border-t-0` +
        navDimentionsClasses
      }
    >
      {/* Expand */}
      <div className="sm:flex-center btn-secondary absolute -right-3 top-6 z-10 hidden h-6 w-6 cursor-pointer rounded-full border-r bg-inherit">
        <FontAwesomeIcon icon={faAngleRight} className="text-sm" />
      </div>
      <div className="sm:flex-center hidden h-10 font-bold text-pro-300">Pro</div>
      <div className="flex flex-1 justify-between gap-2 sm:flex-grow-0 sm:flex-col">
        <NavLink label="Home" icon={faHome} active />
        <NavLink label="Company Info" icon={faBuilding} />
        <NavLink label="Roles" icon={faUserGroup} />
        <NavLink label="Reports" icon={faChartSimple} />
        <NavLink label="Profile" icon={faUserCircle} />
        <LogoutButton className="block sm:hidden" />
      </div>
      <LogoutButton className="hidden sm:block" />
    </aside>
  );
}

export default Navbar;

function NavLink({ to, icon, active, label }) {
  return (
    <Link
      to={to}
      className={
        'flex-center h-[50px] w-[50px] rounded-xl transition-colors hover:text-pro-300 ' +
        (active ? 'text-pro-300' : 'text-progray-150')
      }
    >
      <FontAwesomeIcon icon={icon} />
    </Link>
  );
}

function LogoutButton({ className }) {
  const [loading, setLoading] = useState(false);
  const logout = useLogout();

  const handleClick = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      className={
        'flex-center text-progray-150 h-[50px] w-[50px] rounded-xl transition-colors duration-300 hover:text-progray-300 ' +
        className
      }
    >
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow" />
      ) : (
        <FontAwesomeIcon icon={faRightFromBracket} className="sm:rotate-180" />
      )}
    </button>
  );
}
