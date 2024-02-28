import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalErrorMessage } from '../../utils/utils';
import { validationRegex } from '../../utils/utils';

function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const validEmail = validationRegex.email.test(email);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  console.log('Rendering ForgetPassword', { loading, error });

  function handleSubmit(e) {
    e.preventDefault();
    if (email) {
      try {
        if (error) setError('');
        setLoading(true);
        // Send the data to the server
        // Navigate to the email verification page
        navigate('/verify-email', { state: { email, goal: 'forgot-password' } });
      } catch (error) {
        setLoading(false);
        setError(globalErrorMessage);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please enter a valid email');
    }
  }
  return (
    <section>
      <h1>Forgot password</h1>
      <p>Please enter the details below</p>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
        </div>
        <div>
          <button type="submit" disabled={!validEmail || loading}>
            {loading ? 'Loading...' : 'Continue'}
          </button>
        </div>
        {error && <div>{error}</div>}
      </form>
      <button onClick={() => navigate(-1)}>← Back</button>
    </section>
  );
}

export default ForgetPassword;
