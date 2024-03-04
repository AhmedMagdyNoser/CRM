import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/routes/Layout';
import NotFound from './pages/routes/NotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgetPassword from './pages/auth/ForgetPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Home from './pages/users/Home';
import Authentication from './pages/routes/Authentication';
import PersistUser from './pages/routes/PersistUser';

function App() {
  console.log('Rendering App');

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistUser />}>
          <Route path="/" element={<Layout />}>
            <Route element={<Authentication />}>
              <Route index element={<Home />} />
            </Route>

            <Route element={<Authentication requireUnauthenticated />}>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="verify-email" element={<VerifyEmail />} />
              <Route path="forgot-password" element={<ForgetPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
