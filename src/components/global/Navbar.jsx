import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faRightFromBracket,
  faUserGroup,
  faBuilding,
  faChartSimple,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const navDimentionsClasses = ` h-20 w-full px-4 sm:h-auto sm:w-20 sm:px-0 sm:py-4`;

  return (
    <aside
      className={
        `fixed bottom-0 left-0 flex items-center justify-between gap-3 overflow-auto border-t bg-white sm:relative sm:flex-col sm:border-r sm:border-t-0` +
        navDimentionsClasses
      }
      style={{ boxShadow: '0px 0px 15px #EAEAEA' }}
    >
      <div className="hidden sm:block">
        <div className="flex-center h-12 w-12 rounded-xl bg-pro-300 font-bold text-pro-50">PRO</div>
      </div>
      <div className="flex flex-1 justify-between gap-2 sm:flex-grow-0 sm:flex-col">
        <NavLink icon={faHome} active />
        <NavLink icon={faBuilding} />
        <NavLink icon={faUserGroup} />
        <NavLink icon={faChartSimple} />
        <NavLink icon={faUserCircle} />
        <LogoutButton className="block sm:hidden" />
      </div>
      <div className="hidden sm:block">
        <LogoutButton />
      </div>
    </aside>
  );
}

export default Navbar;

function NavLink({ to, icon, active }) {
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
  return (
    <button
      className={
        'flex-center text-progray-150 h-[50px] w-[50px] rounded-xl transition-colors duration-300 hover:text-pro-300 ' +
        className
      }
    >
      <FontAwesomeIcon icon={faRightFromBracket} className="sm:rotate-180" />
    </button>
  );
}
