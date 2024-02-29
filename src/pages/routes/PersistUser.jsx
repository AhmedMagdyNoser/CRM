import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefresh from "../../hooks/useRefresh";
import useLogout from "../../hooks/useLogout";

/**
 * @description This component is responsible for getting the user's authentication state when the app is loaded.
 *
 * if (!accessToken && persist) => this component will try to refresh the accessToken:
 *   - if the refreshToken is valid, the auth state will be updated (with the new accessToken) and thus the component will re-render.
 *   - else, the logout() will be called and it will:
 *     1. revoke the refreshToken
 *     2. remove the persist flag from the local storage
 *     3. reset the auth state. Thus, the component will re-render.
 *
 * else => the component will render the children.
 *
 */

function PersistUser() {
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const persist = JSON.parse(localStorage.getItem("persist")) ?? false;
  const refreshAccessToken = useRefresh();
  const logout = useLogout();

  console.log("Rendering PersistUser", { authenticated: !!auth.accessToken, persist });

  useEffect(() => {
    if (!accessToken && persist) {
      (async () => {
        try {
          await refreshAccessToken();
        } catch (error) {
          logout();
        }
      })();
    }
  }, [accessToken, persist]);

  return !accessToken && persist ? <p>Verifying.. </p> : <Outlet />;
}

export default PersistUser;
