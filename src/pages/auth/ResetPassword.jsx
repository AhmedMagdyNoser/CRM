import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { globalErrorMessage, inputFieldsInstructions, validationRegex } from '../../utils/utils';
import axios from '../../api/axios';
import RegisterInputField from '../../components/auth/RegisterInputField';

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validPassword = validationRegex.password.test(password);
  const validConfirmPassword = confirmPassword === password;

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
        setLoading(false);
        setSuccess(true);
        setTimeout(() => navigate('/login', { state: null }), 3500);
      } catch (error) {
        setLoading(false);
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please fill all the fields');
    }
  }

  return success ? (
    <SuccessMessage />
  ) : (
    <section>
      <h1>Hello Ahmed</h1>
      <p>Please choose your new password</p>
      <form onSubmit={handleSubmit}>
        <RegisterInputField
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          instructions={inputFieldsInstructions.password}
          isValid={validPassword}
          maxLength={32}
          required
        />
        <RegisterInputField
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          instructions={inputFieldsInstructions.confirmPassword}
          isValid={validConfirmPassword}
          maxLength={32}
          required
        />
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

function SuccessMessage() {
  return (
    <section>
      <p>{String.fromCharCode(10003)}</p>
      <h1>Password reset successful</h1>
      <p>You can now login with your new password</p>
    </section>
  );
}
