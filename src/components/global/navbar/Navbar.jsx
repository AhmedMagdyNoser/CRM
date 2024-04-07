import { applicationName, layoutDimensions, roles } from '../../../utils/utils';
import logo from '../../../assets/logo.png';
import useAuth from '../../../hooks/useAuth';
import useNavbar from '../../../hooks/useNavbar';
import NavIcon from './NavIcon';
import NavbarLink, { LogoutButton } from './NavbarLink';

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

      <div className={`relative hidden w-full items-center sm:flex`}>
        <img src={logo} alt="Logo" className="relative left-0 top-0 mx-4 h-10 w-10" />
        <div className={'flex flex-col ' + (!navbarExpanded && 'opacity-0')}>
          <p className="text-sm font-bold text-pro-300">{applicationName}</p>
          <p className="text-nowrap text-sm text-gray-500">Company Name</p>
        </div>
      </div>

      <nav className="flex flex-1 justify-between gap-1 sm:flex-grow-0 sm:flex-col">
        {auth.roles.includes(roles.manager) && (
          <>
            <NavbarLink label="Dashboard" to="/dashboard" icon={<NavIcon.Dashboard />} />
            <NavbarLink label="Roles" to="/roles" icon={<NavIcon.Roles />} />
          </>
        )}
        {auth.roles.includes(roles.moderator) && (
          <>
            <NavbarLink label="All customers" to="/all-customers" icon={<NavIcon.AllCustomers />} />
            <NavbarLink label="New customer" to="/add-new-customer" icon={<NavIcon.NewCustomer />} />
          </>
        )}
        {auth.roles.includes(roles.sales) && !auth.roles.includes(roles.manager) && (
          <NavbarLink label="Assigned to me" to="/assigned-customers" icon={<NavIcon.AssignedCustomers />} />
        )}
        {auth.roles.length === 0 && <NavbarLink label="Locked" to="/locked" icon={<NavIcon.Locked />} />}
        <NavbarLink label="Company info" to="/company-info" icon={<NavIcon.CompanyInfo />} />
        <NavbarLink label="Profile" to="/profile" icon={<NavIcon.Profile />} />

        <div className="flex sm:hidden">
          <LogoutButton />
        </div>
      </nav>

      <div className="hidden sm:block">
        <LogoutButton />
      </div>
    </aside>
  );
}

export default Navbar;
