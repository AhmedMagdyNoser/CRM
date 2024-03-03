import { useState } from 'react';
import { globalErrorMessage } from '../../utils/utils';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import ImageFormBox from '../../components/auth/ImageFormBox';
import login from '../../assets/login.svg';
import RegisterInputField from '../../components/global/InputField';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import FormSubmitButton from '../../components/global/SubmitButton';
import ErrorAlert from '../../components/global/ErrorAlert';
import Checkbox from '../../components/global/Checkbox';

function Login() {
  const { setAuth } = useAuth();

  const [identity, setIdentity] = useState(''); // username or email
  const [password, setPassword] = useState('');
  const [persist, setPersist] = useState(true);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Rendering Login', { loading, error });

  async function handleSubmit(e) {
    e.preventDefault();
    if (identity && password) {
      try {
        if (error) setError('');
        setLoading(true);
        let response = await axios({
          method: 'POST',
          url: '/auth/login',
          data: { loginIdentifier: identity, password },
          withCredentials: true,
        });
        setAuth(response.data);
        persist && localStorage.setItem('persist', 'true');
      } catch (error) {
        setLoading(false);
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please fill all the fields');
    }
  }

  return (
    <ImageFormBox image={login}>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex h-full w-full flex-col justify-between gap-3 p-6 sm:w-[600px] sm:p-12 xl:h-[600px]"
      >
        <div className="flex flex-1 flex-col gap-3 overflow-auto">
          <h1 className="text-progray-300 mb-3 text-2xl font-bold capitalize sm:text-3xl">Welcome back!</h1>
          <RegisterInputField
            type="text"
            placeholder="Username or Email"
            icon={faUser}
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            maxLength={50}
            autoFocus
            required
          />
          <RegisterInputField
            type="password"
            placeholder="Password"
            icon={faLock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={32}
            required
          />
          <div className="flex justify-between px-1">
            <Checkbox label="Remember me" checked={persist} onClick={() => setPersist(!persist)} />
            <Link to="/forgot-password" className="hover:text-pro-200">
              Forgot your password?
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {error && <ErrorAlert message={error} />}
          <FormSubmitButton label="Login" loading={loading} disabled={!identity || !password || loading} />
          <div className="flex justify-center gap-1">
            <span className="text-progray-300">Don't have an account?</span>
            <Link className="font-bold text-pro-200 transition-colors hover:text-pro-300" to="/register">
              Register Here
            </Link>
          </div>
        </div>
      </form>
    </ImageFormBox>
  );
}

export default Login;
