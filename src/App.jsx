import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { roles } from './utils/utils';
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
import CompanyInfo from './pages/users/CompanyInfo';
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

              <Route path="/locked" element={<Locked />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/company-info" element={<CompanyInfo />} />

              <Route element={<Authorization allowedRole={roles.manager} />}>
                <Route path="/roles" element={<Roles />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

              <Route element={<Authorization allowedRole={roles.moderator} />}>
                <Route path="/add-new-customer" element={<AddNewCustomer />} />
                <Route path="/all-customers" element={<AllCustomers />} />
              </Route>

              <Route element={<Authorization allowedRole={roles.sales} />}>
                <Route path="/assigned-customers" element={<AssignedCustomers />} />
                <Route path="/customer/:id" element={<Customer />} />
              </Route>
            </Route>

            <Route element={<Authentication requireUnauthenticated />}>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="verify-email" element={<VerifyEmail />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
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
