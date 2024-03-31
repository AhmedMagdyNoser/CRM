import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';
import { layoutDimensions, roles } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import NavIcon from './NavIcon';

function Navbar({ className = '', navbarExpanded, setNavbarExpanded }) {
  const { auth } = useAuth();
  return (
    <aside
      className={`
        fixed bottom-0 left-0 z-30 flex justify-between gap-3 border-t bg-white sm:flex-col sm:border-r sm:border-t-0 
        ${className} ${navbarExpanded ? 'overflow-hidden' : 'overflow-auto'}
        `}
      style={{ transition: `width ${layoutDimensions.navbarExpandingDuration}s` }}
    >
      <div
        onClick={() => setNavbarExpanded(!navbarExpanded)}
        className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent transition-colors hover:bg-pro-200"
      ></div>

      <div>
        <img src={logo} alt="Logo" className="h-6 w-6 sm:h-10 sm:w-10" />
      </div>

      <nav className="flex flex-1 justify-between gap-3 sm:flex-grow-0 sm:flex-col">
        {auth.roles.includes(roles.manager) && (
          <>
            <NavbarLink navbarExpaned={navbarExpanded} label="Dashboard" to="/dashboard" icon={<NavIcon.Dashboard />} />
            <NavbarLink navbarExpaned={navbarExpanded} label="Roles" to="/roles" icon={<NavIcon.Roles />} />
          </>
        )}
        {auth.roles.includes(roles.moderator) && (
          <NavbarLink
            navbarExpaned={navbarExpanded}
            label="All Customers"
            to="/all-customers"
            icon={<NavIcon.AllCustomers />}
          />
        )}
        {auth.roles.includes(roles.sales) && (
          <NavbarLink
            navbarExpaned={navbarExpanded}
            label="Assigned Customers"
            to="/assigned-customers"
            icon={<NavIcon.AssignedCustomers />}
          />
        )}
        {auth.roles.length === 0 && (
          <NavbarLink navbarExpaned={navbarExpanded} label="Locked" to="/locked" icon={<NavIcon.Locked />} />
        )}
        <NavbarLink navbarExpaned={navbarExpanded} label="Company Info" to="/company-info" icon={<NavIcon.CompanyInfo />} />
        <NavbarLink navbarExpaned={navbarExpanded} label="Profile" to="/profile" icon={<NavIcon.Profile />} />
        <LogoutButton className="block sm:hidden" />
      </nav>
      
      <LogoutButton className="hidden sm:block" />
    </aside>
  );
}

export default Navbar;

function NavbarLink({ label, to, icon, navbarExpaned }) {
  const constClasses = `flex h-12 rounded-2xl transition-colors ${navbarExpaned ? 'flex-1 mx-3 items-center gap-2 px-3' : 'w-12 flex-center'}`;
  const className = ({ isActive }) =>
    isActive ? constClasses + ' fill-pro-300 bg-pro-50' : constClasses + ' btn-light fill-gray-500';

  return (
    <div className="flex w-full justify-center">
      <NavLink to={to} className={className}>
        {icon && <div className="w-6">{icon}</div>}
        <span className={`text-nowrap ${navbarExpaned ? 'block' : 'hidden'}`}>{label}</span>
      </NavLink>
    </div>
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
      className={'nav-link btn-light text-gray-500 ' + className}
    >
      <FontAwesomeIcon icon={faRightFromBracket} className="sm:rotate-180" />
    </button>
  );
}
