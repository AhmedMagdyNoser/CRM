import useAuth from './useAuth';
import axios from '../api/axios';

function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
    localStorage.removeItem('persist');
    await axios({ method: 'POST', url: '/Auth/RevokeToken', withCredentials: true });
    setAuth({});
  };

  return logout;
}

export default useLogout;
