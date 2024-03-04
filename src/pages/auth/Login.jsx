import { useState } from 'react';
import { globalErrorMessage } from '../../utils/utils';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import FormBox from '../../components/auth/FormBox';
import login from '../../assets/login.svg';
import InputField from '../../components/global/InputField';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '../../components/global/Checkbox';

function Login() {
  const { setAuth } = useAuth();

  const [identity, setIdentity] = useState(''); // username or email
  const [password, setPassword] = useState('');
  const [persist, setPersist] = useState(true);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Rendering Login', { loading, error });

  async function handleSubmit() {
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
    <FormBox
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      image={login}
      fixedHeightOnXLScreen
      title="Welcome back!"
      submitButtonLabel="Login"
      submitButtonDisabled={!identity || !password}
      leave={{ hint: "Don't have an account?", link: '/register', label: 'Register Here' }}
    >
      <InputField
        type="text"
        placeholder="Username or Email"
        icon={faUser}
        value={identity}
        onChange={(e) => setIdentity(e.target.value)}
        maxLength={50}
        autoFocus
        required
      />
      <InputField
        type="password"
        placeholder="Password"
        icon={faLock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        maxLength={32}
        required
      />
      <div className="flex flex-wrap justify-between gap-2 px-1">
        <Checkbox label="Remember me" checked={persist} onClick={() => setPersist(!persist)} />
        <Link to="/forgot-password" className="hover:text-pro-200">
          Forgot your password?
        </Link>
      </div>
    </FormBox>
  );
}

export default Login;
