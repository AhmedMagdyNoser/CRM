import { useLocation, useNavigate } from 'react-router-dom';
import { globalErrorMessage } from '../../utils/utils';
import { useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

function EmailVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [code, setCode] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Rendering EmailVerification', { loading, error, state: location.state });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (error) setError('');
      setLoading(true);
      if (location.state?.goal === 'register') {
        let response = await axios({
          method: 'POST',
          url: '/Auth/ConfirmEmail',
          data: { email: location.state.email, code },
          // withCredentials: true, // CORS block
        });
        setAuth(response.data); // rerender and navigate to the home page
      } else if (location.state?.goal === 'forgot-password') {
        let response = await axios({
          method: 'POST',
          url: '/Auth/VerifyCode',
          data: { email: location.state.email, code },
        });
        navigate('/reset-password', { state: { email: location.state.email, token: response.data.token } });
      }
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  return (
    <section>
      <p>{String.fromCharCode(9993)}</p>
      <h1>Check your email</h1>
      <p>We sent a verification code to your email address. Please enter the code below to verify your email address.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required autoFocus />
        <div>
          <button type="submit" disabled={!code || loading}>
            {loading ? 'Loading...' : 'Verify'}
          </button>
        </div>
      </form>
      {error && <div>{error}</div>}
      <button onClick={() => navigate(-1)}>← Back</button>
    </section>
  );
}

export default EmailVerification;
