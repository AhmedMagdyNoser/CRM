import { useState } from 'react';
import { globalErrorMessage, validationRegex } from '../../utils/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validPassword = validationRegex.password.test(password);
  const validConfirmPassword = confirmPassword === password;

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password && confirmPassword) {
      try {
        if (error) setError('');
        setLoading(true);
        await axios({
          method: 'POST',
          url: '/Auth/ResetPassword',
          data: {
            token: location.state?.token,
            email: location.state?.email,
            password,
            confirmPassword,
          },
        });
        // display a success message
        navigate('/login', { state: null });
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
      <h1>Hello Ahmed</h1>
      <p>Please choose your new password</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={!validPassword || !validConfirmPassword || loading}>
            {loading ? 'Loading...' : 'Reset'}
          </button>
        </div>
        {error && <div>{error}</div>}
      </form>
    </section>
  );
}

export default ResetPassword;
