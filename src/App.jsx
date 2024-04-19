import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { roles, paths } from './utils/utils';
import Layout from './pages/routes/Layout';
import Home from './pages/routes/Home';
import NotFound from './pages/routes/NotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import PersistUser from './pages/routes/PersistUser';
import Authentication from './pages/routes/Authentication';
import Authorization from './pages/routes/Authorization';
import Dashboard from './pages/users/manager/dashboard/Page';
import Roles from './pages/users/manager/roles/Page';
import AddNewCustomer from './pages/users/moderator/add-new-customer/Page';
import AllCustomers from './pages/users/moderator/all-customers/Page';
import AssignedCustomers from './pages/users/sales/assigned-customers/Page';
import Customer from './pages/users/sales/customer/Page';
import CompanyInfo from './pages/users/company-info/Page';
import Profile from './pages/users/Profile';
import Locked from './pages/users/Locked';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PersistUser />}>
          <Route element={<Layout />}>
            <Route element={<Authentication />}>
              <Route index element={<Home />} />

              <Route path={paths.locked} element={<Locked />} />
              <Route path={paths.profile} element={<Profile />} />
              <Route path={paths.companyInfo} element={<CompanyInfo />} />

              <Route element={<Authorization allowedRole={roles.manager} />}>
                <Route path={paths.dashboard} element={<Dashboard />} />
                <Route path={paths.roles} element={<Roles />} />
              </Route>

              <Route element={<Authorization allowedRole={roles.moderator} />}>
                <Route path={paths.customers} element={<AllCustomers />} />
                <Route path={paths.addNewCustomer} element={<AddNewCustomer />} />
              </Route>

              <Route element={<Authorization allowedRole={roles.sales} />}>
                <Route path={`${paths.customers}/:id`} element={<Customer />} />
                <Route path={paths.assignedCustomers} element={<AssignedCustomers />} />
              </Route>
            </Route>

            <Route element={<Authentication requireUnauthenticated />}>
              <Route path={paths.login} element={<Login />} />
              <Route path={paths.register} element={<Register />} />
              <Route path={paths.verifyEmail} element={<VerifyEmail />} />
              <Route path={paths.forgotPassword} element={<ForgotPassword />} />
              <Route path={paths.resetPassword} element={<ResetPassword />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

// To scroll to top on routing
// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scroll({ top: 0, behavior: 'instant' });
//   }, [pathname]);

//   return null;
// }
