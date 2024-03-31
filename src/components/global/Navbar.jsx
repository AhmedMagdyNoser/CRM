import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useNavbar from '../../hooks/useNavbar';
import useLogout from '../../hooks/useLogout';
import { breakboints, layoutDimensions, roles } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import NavIcon from './NavIcon';

function Navbar({ className = '' }) {
  const { auth } = useAuth();
  const { navbarExpanded, setNavbarExpanded } = useNavbar();

  return (
    <aside
      className={`
        scrollbar-hide fixed bottom-0 left-0 z-30 flex justify-between gap-3 border-t bg-white sm:flex-col sm:border-r sm:border-t-0 
        ${className} ${navbarExpanded ? 'overflow-hidden' : 'overflow-auto'}
        `}
      style={{ transition: `width ${layoutDimensions.navbarExpandingDuration}s` }}
    >
      <div
        onClick={() => setNavbarExpanded(!navbarExpanded)}
        className="absolute right-0 top-0 hidden h-full w-1 cursor-col-resize bg-transparent transition-colors hover:bg-pro-200 sm:block"
      ></div>

      <img src={logo} alt="Logo" className="hidden h-10 w-10 sm:block" />

      <nav className="flex flex-1 justify-between gap-1 sm:flex-grow-0 sm:flex-col">
        {auth.roles.includes(roles.manager) && (
          <>
            <NavbarLink label="Dashboard" to="/dashboard" icon={<NavIcon.Dashboard />} />
            <NavbarLink label="Roles" to="/roles" icon={<NavIcon.Roles />} />
          </>
        )}
        {auth.roles.includes(roles.moderator) && (
          <NavbarLink label="All customers" to="/all-customers" icon={<NavIcon.AllCustomers />} />
        )}
        {auth.roles.includes(roles.sales) && (
          <NavbarLink label="Assigned to me" to="/assigned-customers" icon={<NavIcon.AssignedCustomers />} />
        )}
        {auth.roles.length === 0 && <NavbarLink label="Locked" to="/locked" icon={<NavIcon.Locked />} />}
        <NavbarLink label="Company info" to="/company-info" icon={<NavIcon.CompanyInfo />} />
        <NavbarLink label="Profile" to="/profile" icon={<NavIcon.Profile />} />
        <LogoutButton className="block sm:hidden" />
      </nav>

      <LogoutButton className="hidden sm:block" />
    </aside>
  );
}

export default Navbar;

function NavbarLink({ label, to, icon }) {
  const { navbarExpanded } = useNavbar();

  const height = layoutDimensions.navbarSize - (layoutDimensions.navbarSize / 7) * 2;
  const marginX = layoutDimensions.navbarSize / 7;
  const iconPosition = layoutDimensions.navbarSize / 5;
  const labelPosition = layoutDimensions.navbarSize / 1.65;

  const constClasses = `relative flex flex-1 rounded-2xl transition-colors flex-center nav-link-width`;
  const className = ({ isActive }) =>
    isActive ? constClasses + ' fill-pro-300 bg-pro-50' : constClasses + ' btn-light fill-gray-500';

  return (
    <div className={`nav-link-margin flex self-center sm:self-auto`}>
      <NavLink to={to} className={className} style={{ height: `${height}px` }}>
        {icon && (
          <div className={`w-5 sm:absolute sm:top-1/2 sm:-translate-y-1/2`} style={{ left: `${iconPosition}px` }}>
            {icon}
          </div>
        )}
        {navbarExpanded && (
          <span
            className={`absolute top-1/2 hidden -translate-y-1/2 transform animate-fade-in-fast text-nowrap text-sm capitalize sm:block`}
            style={{ left: `${labelPosition}px` }}
          >
            {label}
          </span>
        )}
      </NavLink>
      <style>
        {`
            @media (min-width: ${breakboints.sm}) {
              .nav-link-margin {
                margin: 0 ${marginX}px;
              }
            }
            @media (max-width: ${breakboints.sm}) {
             .nav-link-width {
                width: ${height}px;
              }
            }
          `}
      </style>
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
