import { useLocation, useNavigate } from 'react-router-dom';
import { globalErrorMessage } from '../../utils/utils';
import { useState } from 'react';

function EmailVerification() {
  const location = useLocation();
  const navigate = useNavigate();

  const [code, setCode] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Rendering EmailVerification', { loading, error, state: location.state });

  function handleSubmit(e) {
    e.preventDefault();

    try {
      if (error) setError('');
      setLoading(true);
      if (location.state?.goal === 'register') {
        // send { email, code } to the /ConfirmEmail
        // Save the token in memory which rerender and navigate to the home page
      } else if (location.state?.goal === 'forgot-password') {
        // send { email, code } to the /VerifyCode
        // Navigate to the reset password page and pass the email and token to it
        navigate('/reset-password', { state: { email: location.state.email, token:'abc123' } });
      }
    } catch (error) {
      setLoading(false);
      setError(globalErrorMessage);
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
