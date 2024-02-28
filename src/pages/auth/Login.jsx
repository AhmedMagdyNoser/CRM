import { useState } from 'react';
import { globalErrorMessages } from '../../utils/utils';

function Login() {
  const [identity, setIdentity] = useState(''); // username or email
  const [password, setPassword] = useState('');
  // needs persist state

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Rendering Login', { loading, error });

  function handleSubmit(e) {
    e.preventDefault();
    if (identity && password) {
      try {
        if (error) setError('');
        setLoading(true);
        // Send the data to the server
        // Save the token in memory which rerender and navigate to the home page
        // Save the persist state in the local storage
      } catch (error) {
        setLoading(false);
        setError(error.response?.data || globalErrorMessages);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please fill all the fields');
    }
  }

  return (
    <section>
      <h2>Welcome back!</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={!identity || !password || loading}>
          Login
        </button>
        {error ? <div>{error}</div> : loading ? <div>Loading...</div> : null}
      </form>
    </section>
  );
}

export default Login;
