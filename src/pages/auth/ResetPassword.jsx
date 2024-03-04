import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { globalErrorMessage, inputFieldsInstructions, validationRegex } from '../../utils/utils';
import axios from '../../api/axios';
import MiniFormBox from '../../components/auth/MiniFormBox';
import InputField from '../../components/global/InputField';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import success from '../../assets/success.svg';

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

  if (!location.state?.email || !location.state?.token) return <Navigate to="/login" replace={true} />;

  console.log('Rendering ResetPassword', { loading, error });

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
    <MiniFormBox
      onSubmit={handleSubmit}
      title="Hello again!"
      paragraph="Please choose your new password."
      submitButtonLabel="Reset"
      submitButtonDisabled={!validPassword || !validConfirmPassword}
      loading={loading}
      error={error}
    >
      <InputField
        type="password"
        placeholder="New Password"
        icon={faLock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        instructions={inputFieldsInstructions.password}
        isValid={validPassword}
        maxLength={32}
        autoFocus
        required
      />
      <InputField
        type="password"
        placeholder="Confirm New Password"
        icon={faLock}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        instructions={inputFieldsInstructions.confirmPassword}
        isValid={validConfirmPassword}
        maxLength={32}
        required
      />
    </MiniFormBox>
  );
}

export default ResetPassword;

function SuccessMessage() {
  return (
    <div className="flex h-screen items-center justify-center bg-progray-50">
      <div className="flex h-full w-full animate-fade-in-fast flex-col items-center gap-3 bg-white p-6 sm:h-fit sm:w-[500px] sm:rounded-xl sm:p-12 sm:shadow-lg lg:w-[650px]">
        <div className="h-[215px] w-[215px]">
          <img className="h-full" src={success} alt="Password reset successfully" />
        </div>
        <h1 className="text-center text-2xl font-bold capitalize text-progray-300 sm:text-3xl">
          Password reset successfully
        </h1>
        <p className="text-center text-progray-200">Now you can login with your new password.</p>
      </div>
    </div>
  );
}
