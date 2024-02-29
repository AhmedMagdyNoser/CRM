import axios from '../api/axios';
import useAuth from './useAuth';

function useRefresh() {
  const { setAuth } = useAuth();

  const refreshAccessToken = async () => {
    const { data } = await axios({ url: '/Auth/RefreshToken', withCredentials: true });
    setAuth(data);
    return data.accessToken;
  };

  return refreshAccessToken;
}

export default useRefresh;
