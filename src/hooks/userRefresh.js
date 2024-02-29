import axios from '../api/axios';
import useAuth from './useAuth';

function useRefresh() {
  const { setAuth } = useAuth();

  const refreshAccessToken = async () => {
    try {
      const { data } = await axios({ url: '/refresh', withCredentials: true });
      setAuth(data);
      return data.accessToken;
    } catch (error) {
      return Promise.reject(error); // rejected promise is caught in the response interceptor
    }
  };

  return refreshAccessToken;
}

export default useRefresh;
