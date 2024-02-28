import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/routes/Layout';
import NotFound from './pages/routes/NotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/users/Home';

function App() {
  console.log('Rendering App');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
