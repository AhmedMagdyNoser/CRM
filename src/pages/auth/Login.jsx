import { useState } from 'react';
import { globalErrorMessage } from '../../utils/utils';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

function Login() {
  const { setAuth } = useAuth();
  const [identity, setIdentity] = useState(''); // username or email
  const [password, setPassword] = useState('');
  const [persist, setPersist] = useState(false);

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
          // withCredentials: true, // CORS block
        });
        setAuth(response.data); // rerender and navigate to the home page
        // Save the persist state in the local storage
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
    <section>
      <h2>Welcome back!</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="identity">Username or Email</label>
          <input
            type="text"
            id="identity"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>
        <div>
          <label htmlFor="persist">
            <input type="checkbox" id="persist" checked={persist} onChange={(e) => setPersist(e.target.checked)} />
            Remember me
          </label>
        </div>
        <button type="submit" disabled={!identity || !password || loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        {error && <div>{error}</div>}
      </form>
      <div>
        <p>
          Don't have an account? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
