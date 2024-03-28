import { NavLink, useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import NavIcon from './NavIcon';

function Navbar({ className = '' }) {
  return (
    <aside
      className={
        'fixed bottom-0 left-0 z-30 flex items-center justify-between gap-3 overflow-auto rounded-none border-t bg-white sm:flex-col sm:border-r sm:border-t-0 ' +
        className
      }
    >
      <div className="sm:flex-center hidden h-10 font-bold text-pro-300">Pro</div>
      <div className="flex flex-1 justify-between gap-3 sm:flex-grow-0 sm:flex-col sm:gap-2">
        <NavbarLink label="Dashboard" to="/dashboard" icon={<NavIcon.Dashboard />} />
        <NavbarLink label="Roles" to="/roles" icon={<NavIcon.Roles />} />
        <NavbarLink label="All Customers" to="/all-customers" icon={<NavIcon.AllCustomers />} />
        <NavbarLink label="Assigned Customers" to="/assigned-customers" icon={<NavIcon.AssignedCustomers />} />
        <NavbarLink label="Locked" to="/locked" icon={<NavIcon.Locked />} />
        <NavbarLink label="Company Info" to="/company-info" icon={<NavIcon.CompanyInfo />} />
        <NavbarLink label="Profile" to="/profile" icon={<NavIcon.Profile />} />
        <LogoutButton className="block sm:hidden" />
      </div>
      <LogoutButton className="hidden sm:block" />
    </aside>
  );
}

export default Navbar;

function NavbarLink({ label, to, icon }) {
  const constClasses = 'nav-link';
  const className = ({ isActive }) =>
    isActive
      ? constClasses + ' text-pro-300 fill-pro-300 bg-pro-50'
      : constClasses + ' btn-light fill-gray-500 text-progray-100';

  return (
    <NavLink to={to} className={className}>
      {icon && <div className="w-6">{icon}</div>}
    </NavLink>
  );
}

function LogoutButton({ className }) {
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        logout();
        navigate('/login'); // Redirect to login page without providing a state in the location object
      }}
      className={'nav-link btn-light ' + className}
    >
      <FontAwesomeIcon icon={faRightFromBracket} className="sm:rotate-180" />
    </button>
  );
}
