import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './pages/routes/Layout';
import NotFound from './pages/routes/NotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Home from './pages/users/Home';
import Authentication from './pages/routes/Authentication';
import PersistUser from './pages/routes/PersistUser';
import CompanyInfo from './pages/users/CompanyInfo';
import Roles from './pages/users/manager/Roles';
import Reports from './pages/users/manager/Reports';
import Profile from './pages/users/Profile';
import Authorization from './pages/routes/Authorization';
import AddNewCustomer from './pages/users/moderator/AddNewCustomer';
import { roles } from './utils/utils';

function App() {
  console.log('Rendering App');

  return (
    <Router>
      <Routes>
        <Route element={<PersistUser />}>
          <Route path="/" element={<Layout />}>
            <Route element={<Authentication />}>
              <Route index element={<Home />} />
              <Route path="/company-info" element={<CompanyInfo />} />
              <Route path="/profile" element={<Profile />} />

              <Route element={<Authorization allowedRole={roles.manager} />}>
                <Route path="/roles" element={<Roles />} />
                <Route path="/reports" element={<Reports />} />
              </Route>

              <Route element={<Authorization allowedRole={roles.moderator} />}>
                <Route path="/add-new-customer" element={<AddNewCustomer />} />
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
