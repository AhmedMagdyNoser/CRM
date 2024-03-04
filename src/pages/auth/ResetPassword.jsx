import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { globalErrorMessage, validationRegex } from '../../utils/utils';
import axios from '../../api/axios';
import InputField from '../../components/global/InputField';
import success from '../../assets/success.svg';
import AuthMiniBox from '../../components/auth/AuthMiniBox';
import CaptionCard from '../../components/global/CaptionCard';
import Form from '../../components/global/Form';

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

  console.log('Rendering ResetPassword', { loading, error });

  if (!location.state?.email || !location.state?.token) return <Navigate to="/login" replace={true} />;

  async function handleSubmit(e) {
    e.preventDefault();
    if (validPassword && validConfirmPassword) {
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
      setError('Please fill all the fields correctly');
    }
  }

  return success ? (
    <SuccessMessage />
  ) : (
    <AuthMiniBox>
      <CaptionCard title="Hello again!" paragraph="Please choose your new password." />
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitButtonLabel="Reset"
        submitButtonDisabled={!validPassword || !validConfirmPassword}
      >
        <InputField.Password
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isValid={validPassword}
          required
          autoFocus
        />
        <InputField.ConfirmPassword
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          isValid={validConfirmPassword}
          required
        />
      </Form>
    </AuthMiniBox>
  );
}

export default ResetPassword;

function SuccessMessage() {
  return (
    <AuthMiniBox>
      <CaptionCard
        image={success}
        title="Password reset successfully"
        paragraph="Now you can login with your new password."
        className="px-8"
      />
    </AuthMiniBox>
  );
}
