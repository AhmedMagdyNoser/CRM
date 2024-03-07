import { Link } from 'react-router-dom';
import { navBarDimension } from '../../utils/utils';
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
  const navDimentionsClasses = ` h-[${navBarDimension}] w-full px-4 sm:h-auto sm:w-[${navBarDimension}] sm:px-0 sm:py-4`;

  return (
    <aside
      className={
        'fixed bottom-0 left-0 flex items-center justify-between gap-3 overflow-auto border-t bg-white sm:relative sm:flex-col sm:border-r sm:border-t-0' +
        navDimentionsClasses
      }
      style={{ boxShadow: '0px 0px 15px #e5e5e5' }}
    >
      <div className="hidden sm:block">
        <div className="flex-center h-12 w-12 rounded-md bg-pro-300 font-bold text-pro-50 shadow">PRO</div>
      </div>
      <div className="flex flex-1 justify-between gap-2 sm:flex-grow-0 sm:flex-col">
        <NavLink icon={faHome} />
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

function NavLink({ to, icon }) {
  return (
    <Link
      to={to}
      className="flex-center h-[50px] w-[50px] rounded-lg text-progray-200 transition-colors duration-300 hover:bg-pro-300 hover:text-pro-50"
    >
      <FontAwesomeIcon icon={icon} />
    </Link>
  );
}

function LogoutButton({ className }) {
  return (
    <button
      className={
        'flex-center h-[50px] w-[50px] rounded-lg text-progray-200 transition-colors duration-300 hover:bg-pro-300 hover:text-pro-50 ' +
        className
      }
    >
      <FontAwesomeIcon icon={faRightFromBracket} className="sm:rotate-180" />
    </button>
  );
}
