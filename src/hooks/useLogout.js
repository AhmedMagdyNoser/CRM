import useAuth from './useAuth';
import axios from '../api/axios';

function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
    await axios({ method: 'POST', url: '/Auth/RevokeToken', withCredentials: true });
    localStorage.removeItem('persist');
    setAuth({});
  };

  return logout;
}

export default useLogout;
