import { Outlet } from 'react-router-dom';
import Navbar from '../../components/global/Navbar';
import useAuth from '../../hooks/useAuth';
import OnlineStatueAlert from '../../components/global/OnlineStatusAlert';
import { layoutDimensions as dimensions } from '../../utils/utils';
import useNavbar from '../../hooks/useNavbar';

function Layout() {
  const { auth } = useAuth();
  const { navbarExpanded } = useNavbar();

  return (
    <div className="flex text-pro-300">
      <OnlineStatueAlert />
      {auth.accessToken && <Navbar className="navbar" />}
      {auth.accessToken ? (
        <div className={'layout-padding min-h-screen w-full'}>
          <div
            className="layout-padding-when-navbar-expanded"
            style={{ transition: `padding-left ${dimensions.navbarExpandingDuration}s` }}
          >
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full">
          <Outlet />
        </div>
      )}
      <style>
        {`
          .navbar {
            height: ${dimensions.navbarSize}px;
            width: 100%;
            padding: 0 ${dimensions.navbarPadding}px;
          }

          @media (min-width: 612px) {
            .navbar {
              height: 100vh;
              width: ${navbarExpanded ? dimensions.navbarExpanedSize : dimensions.navbarSize}px;
              padding: ${dimensions.navbarPadding}px 0;
            }
          }

          .layout-padding {
            padding: ${dimensions.mobileLayoutPadding}px ${dimensions.mobileLayoutPadding}px ${dimensions.mobileLayoutPadding + dimensions.navbarSize}px ${dimensions.mobileLayoutPadding}px;
          }

          @media (min-width: 612px) {
            .layout-padding {
              padding: ${dimensions.layoutPadding}px;
            }
            .layout-padding-when-navbar-expanded {
              padding-left: ${navbarExpanded ? dimensions.navbarExpanedSize : dimensions.navbarSize}px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Layout;
