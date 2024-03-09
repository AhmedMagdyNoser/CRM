import { useEffect } from 'react';
import axios from '../api/axios';
import useAuth from './useAuth';
import useRefresh from './useRefresh';
import useLogout from './useLogout';

const privateAxios = axios.create();

/**
 *
 * @returns a new instance of axios with the Authorization header set to the access token.
 *
 * If the access token is expired, It sends a request to the server to refresh the token.
 *
 * If the refresh token is expired, it logs out the user.
 *
 */

function usePrivateAxios() {
  const { auth } = useAuth();
  const logout = useLogout();
  const refreshAccessToken = useRefresh();

  useEffect(() => {
    const requestInterceptor = privateAxios.interceptors.request.use((originalRequest) => {
      !originalRequest.headers.Authorization && (originalRequest.headers.Authorization = `Bearer ${auth.accessToken}`);
      return originalRequest;
    });

    const responseInterceptor = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // _retry is a custom property to prevent infinite loops of requests when the refresh token is expired
          try {
            const newAccessToken = await refreshAccessToken();
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return privateAxios(originalRequest); // This returns a new promise of the original request with the new access token. This request also goes through the interceptors.
          } catch (error) {
            logout();
          }
        }
        return Promise.reject(error); // If the refresh token is expired (or it isn't 401 at all), simply reject the error.
      },
    );

    return () => {
      privateAxios.interceptors.request.eject(requestInterceptor);
      privateAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [auth.accessToken, logout, refreshAccessToken]);

  return privateAxios;
}

export default usePrivateAxios;
